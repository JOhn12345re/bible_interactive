# Guide des Sermons - Système de Vidéos Auto-hébergées

## 📋 Vue d'ensemble

Ce système permet de diffuser des sermons en vidéo directement depuis votre serveur, sans dépendre de services externes comme YouTube ou Vimeo. Il supporte les formats HLS (recommandé) et MP4, avec des fonctionnalités avancées comme les sous-titres, chapitres, et mémorisation de la progression.

## 🎯 Fonctionnalités

- **Lecteur vidéo HTML5** avec support HLS via hls.js
- **Fallback MP4** pour les navigateurs non compatibles
- **Sous-titres WebVTT** multilingues
- **Chapitres cliquables** pour navigation rapide
- **Vitesse de lecture** ajustable (0.75x à 2x)
- **Mémorisation de la progression** (localStorage)
- **Raccourcis clavier** (Espace, flèches, F pour plein écran)
- **Interface responsive** avec Tailwind CSS
- **Recherche** par titre, prédicateur, description, tags

## 📁 Structure des fichiers

```
/public/sermons/
├── sermons.json                    # Catalogue des sermons
├── la_vie_en_christ/
│   ├── master.m3u8                # Playlist HLS principale
│   ├── master_0.m3u8              # Playlist pour qualité 0
│   ├── master_1.m3u8              # Playlist pour qualité 1
│   ├── master_2.m3u8              # Playlist pour qualité 2
│   ├── segment_0_000.ts           # Segments vidéo
│   ├── segment_0_001.ts
│   ├── ...
│   ├── video.mp4                  # Fallback MP4
│   ├── poster.jpg                 # Image d'affiche
│   └── subtitles.vtt              # Sous-titres français
├── esperance/
│   ├── master.m3u8
│   ├── video.mp4
│   ├── poster.jpg
│   └── subtitles.vtt
└── ...
```

## 🎬 Préparation des vidéos avec FFmpeg

### 1. HLS Multi-bitrates (Recommandé)

```bash
# Créer un dossier pour le sermon
mkdir -p public/sermons/mon_sermon

# Encoder en HLS avec 3 qualités
ffmpeg -i input.mp4 -filter_complex \
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
 -hls_segment_filename "segment_%v_%03d.ts" \
 -master_pl_name master.m3u8 -var_stream_map "v:0,a:0 v:1,a:1 v:2,a:2" master_%v.m3u8

# Déplacer les fichiers dans le bon dossier
mv master.m3u8 public/sermons/mon_sermon/
mv master_*.m3u8 public/sermons/mon_sermon/
mv segment_*.ts public/sermons/mon_sermon/
```

### 2. MP4 Fallback

```bash
# Encoder un MP4 optimisé pour le web
ffmpeg -i input.mp4 \
  -c:v libx264 -preset slow -crf 20 \
  -c:a aac -b:a 160k \
  -movflags +faststart \
  public/sermons/mon_sermon/video.mp4
```

### 3. Image d'affiche (Poster)

```bash
# Extraire une image à 10 secondes
ffmpeg -i input.mp4 -ss 00:00:10 -vframes 1 -q:v 2 \
  public/sermons/mon_sermon/poster.jpg
```

### 4. Sous-titres WebVTT

```bash
# Si vous avez un fichier .srt
ffmpeg -i subtitles.srt public/sermons/mon_sermon/subtitles.vtt

# Ou créer manuellement un fichier .vtt
cat > public/sermons/mon_sermon/subtitles.vtt << 'EOF'
WEBVTT

00:00:00.000 --> 00:00:05.000
Bienvenue dans ce sermon sur la vie en Christ.

00:00:05.000 --> 00:00:10.000
Nous allons explorer ensemble les Écritures.
EOF
```

## 📝 Configuration du catalogue

Éditez `public/sermons/sermons.json` pour ajouter vos sermons :

```json
{
  "items": [
    {
      "id": "mon_sermon",
      "title": "Mon Sermon",
      "preacher": "Père Jean",
      "date": "2024-12-20",
      "duration": 2700,
      "description": "Description du sermon...",
      "poster": "/sermons/mon_sermon/poster.jpg",
      "hls": "/sermons/mon_sermon/master.m3u8",
      "mp4": "/sermons/mon_sermon/video.mp4",
      "subtitles": [
        { "lang": "fr", "label": "Français", "src": "/sermons/mon_sermon/subtitles.vtt" }
      ],
      "chapters": [
        { "start": 0, "title": "Introduction" },
        { "start": 300, "title": "Première partie" },
        { "start": 1200, "title": "Deuxième partie" },
        { "start": 2400, "title": "Conclusion" }
      ],
      "tags": ["foi", "espérance", "amour"]
    }
  ]
}
```

## ⚙️ Configuration du serveur

### Headers HTTP requis

Assurez-vous que votre serveur web configure les bons types MIME :

```apache
# Apache (.htaccess)
AddType application/vnd.apple.mpegurl .m3u8
AddType video/mp2t .ts
AddType text/vtt .vtt
AddType video/mp4 .mp4

# Activer les Range Requests pour la reprise
Header set Accept-Ranges bytes
```

```nginx
# Nginx
location ~* \.(m3u8)$ {
    add_header Content-Type application/vnd.apple.mpegurl;
    add_header Cache-Control "public, max-age=3600";
}

location ~* \.(ts)$ {
    add_header Content-Type video/mp2t;
    add_header Cache-Control "public, max-age=86400";
}

location ~* \.(vtt)$ {
    add_header Content-Type text/vtt;
    add_header Cache-Control "public, max-age=3600";
}

location ~* \.(mp4)$ {
    add_header Content-Type video/mp4;
    add_header Cache-Control "public, max-age=86400";
}
```

## 🎮 Utilisation

### Navigation
- **Espace** : Play/Pause
- **←/→** : Reculer/Avancer de 5 secondes
- **F** : Plein écran
- **Clic sur la barre de progression** : Aller à une position

### Fonctionnalités
- **Chapitres** : Clic pour naviguer directement
- **Vitesse** : Menu déroulant pour ajuster (0.75x à 2x)
- **Sous-titres** : Activation via les contrôles vidéo
- **Progression** : Sauvegardée automatiquement

## 🔧 Développement

### Ajout d'un nouveau sermon

1. Préparer les fichiers vidéo avec FFmpeg
2. Créer le dossier dans `/public/sermons/`
3. Ajouter l'entrée dans `sermons.json`
4. Tester la lecture

### Personnalisation

- **Styles** : Modifier `src/styles/sermon.css`
- **Composants** : `src/components/SermonPlayer.tsx` et `SermonSection.tsx`
- **Types** : `src/types/sermon.ts`

## 🚀 Déploiement

1. Construire l'application : `npm run build`
2. S'assurer que les fichiers vidéo sont dans `/dist/sermons/`
3. Configurer les headers HTTP sur le serveur
4. Tester la lecture sur différents navigateurs

## 🐛 Dépannage

### Problèmes courants

**Vidéo ne se charge pas**
- Vérifier les types MIME
- Vérifier les permissions des fichiers
- Vérifier les chemins dans `sermons.json`

**HLS ne fonctionne pas**
- Vérifier que hls.js est chargé
- Tester avec le fallback MP4
- Vérifier la console pour les erreurs

**Sous-titres ne s'affichent pas**
- Vérifier le format WebVTT
- Vérifier les chemins des fichiers .vtt
- Tester avec un navigateur différent

### Logs utiles

```javascript
// Dans la console du navigateur
console.log('HLS support:', Hls.isSupported());
console.log('Native HLS:', video.canPlayType('application/vnd.apple.mpegurl'));
```

## 📱 Compatibilité

- **Chrome/Edge** : HLS via hls.js
- **Firefox** : HLS via hls.js
- **Safari** : HLS natif
- **Mobile** : Support complet sur iOS/Android

## 🔒 Sécurité

- Les vidéos sont servies depuis votre domaine
- Pas de dépendance à des services tiers
- Contrôle total sur le contenu
- Possibilité d'ajouter une authentification si nécessaire
