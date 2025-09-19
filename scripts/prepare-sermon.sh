#!/bin/bash

# Script pour préparer un sermon avec FFmpeg
# Usage: ./prepare-sermon.sh input.mp4 "Titre du Sermon" "Prédicateur"

set -e

# Vérifier les arguments
if [ $# -lt 3 ]; then
    echo "Usage: $0 <input_video> <titre> <predicateur>"
    echo "Exemple: $0 sermon.mp4 \"La Vie en Christ\" \"Père Marc\""
    exit 1
fi

INPUT_VIDEO="$1"
TITRE="$2"
PREDICATEUR="$3"

# Créer un slug à partir du titre
SLUG=$(echo "$TITRE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')

# Dossier de destination
OUTPUT_DIR="public/sermons/$SLUG"

echo "🎬 Préparation du sermon: $TITRE"
echo "📁 Dossier de sortie: $OUTPUT_DIR"

# Créer le dossier
mkdir -p "$OUTPUT_DIR"

# Vérifier que FFmpeg est installé
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier que le fichier d'entrée existe
if [ ! -f "$INPUT_VIDEO" ]; then
    echo "❌ Le fichier $INPUT_VIDEO n'existe pas."
    exit 1
fi

echo "📹 Encodage HLS multi-bitrates..."

# Encoder en HLS avec 3 qualités
ffmpeg -i "$INPUT_VIDEO" -filter_complex \
"[v:0]split=3[v1080][v720][v480]; \
 [v1080]scale=-2:1080:flags=lanczos[v1080out]; \
 [v720]scale=-2:720:flags=lanczos[v720out]; \
 [v480]scale=-2:480:flags=lanczos[v480out]" \
 -map [v1080out] -c:v:0 libx264 -b:v:0 5000k -profile:v:0 high -preset veryfast -g 48 -keyint_min 48 \
 -map [v720out]  -c:v:1 libx264 -b:v:1 3000k -profile:v:1 main -preset veryfast -g 48 -keyint_min 48 \
 -map [a:0] -c:a:0 aac -b:a:0 128k -ac 2 \
 -map [v480out]  -c:v:2 libx264 -b:v:2 1500k -profile:v:2 baseline -preset veryfast -g 48 -keyint_min 48 \
 -map [a:0] -c:a:1 aac -b:a:1 128k -ac 2 \
 -map [a:0] -c:a:2 aac -b:a:2 96k -ac 2 \
 -f hls -hls_time 6 -hls_playlist_type vod \
 -hls_segment_filename "$OUTPUT_DIR/segment_%v_%03d.ts" \
 -master_pl_name master.m3u8 -var_stream_map "v:0,a:0 v:1,a:1 v:2,a:2" "$OUTPUT_DIR/master_%v.m3u8" \
 -y

echo "📱 Encodage MP4 fallback..."

# Encoder un MP4 optimisé pour le web
ffmpeg -i "$INPUT_VIDEO" \
  -c:v libx264 -preset slow -crf 20 \
  -c:a aac -b:a 160k \
  -movflags +faststart \
  "$OUTPUT_DIR/video.mp4" \
  -y

echo "🖼️ Extraction de l'image d'affiche..."

# Extraire une image à 10 secondes
ffmpeg -i "$INPUT_VIDEO" -ss 00:00:10 -vframes 1 -q:v 2 \
  "$OUTPUT_DIR/poster.jpg" \
  -y

echo "📝 Création du fichier de sous-titres exemple..."

# Créer un fichier de sous-titres exemple
cat > "$OUTPUT_DIR/subtitles.vtt" << EOF
WEBVTT

00:00:00.000 --> 00:00:05.000
Bienvenue dans ce sermon : $TITRE

00:00:05.000 --> 00:00:10.000
Présenté par $PREDICATEUR

00:00:10.000 --> 00:00:15.000
Nous allons explorer ensemble les Écritures.
EOF

echo "✅ Sermon préparé avec succès !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Éditez $OUTPUT_DIR/subtitles.vtt avec vos sous-titres"
echo "2. Ajoutez l'entrée dans public/sermons/sermons.json :"
echo ""
echo "{"
echo "  \"id\": \"$SLUG\","
echo "  \"title\": \"$TITRE\","
echo "  \"preacher\": \"$PREDICATEUR\","
echo "  \"date\": \"$(date +%Y-%m-%d)\","
echo "  \"duration\": $(ffprobe -v quiet -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$INPUT_VIDEO" | cut -d. -f1),"
echo "  \"description\": \"Description du sermon...\","
echo "  \"poster\": \"/sermons/$SLUG/poster.jpg\","
echo "  \"hls\": \"/sermons/$SLUG/master.m3u8\","
echo "  \"mp4\": \"/sermons/$SLUG/video.mp4\","
echo "  \"subtitles\": ["
echo "    { \"lang\": \"fr\", \"label\": \"Français\", \"src\": \"/sermons/$SLUG/subtitles.vtt\" }"
echo "  ],"
echo "  \"chapters\": ["
echo "    { \"start\": 0, \"title\": \"Introduction\" },"
echo "    { \"start\": 300, \"title\": \"Première partie\" },"
echo "    { \"start\": 1200, \"title\": \"Deuxième partie\" },"
echo "    { \"start\": 2400, \"title\": \"Conclusion\" }"
echo "  ],"
echo "  \"tags\": [\"foi\", \"espérance\", \"amour\"]"
echo "}"
echo ""
echo "3. Testez la lecture dans votre application"
