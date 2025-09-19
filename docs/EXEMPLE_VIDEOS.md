# Exemples de Vidéos pour Tester le Système

## 🎬 Vidéos de Démonstration

Pour tester le système de sermons, vous pouvez utiliser ces vidéos d'exemple :

### 1. Vidéo de Test Simple

```bash
# Créer une vidéo de test de 30 secondes
ffmpeg -f lavfi -i testsrc=duration=30:size=1280x720:rate=30 -f lavfi -i sine=frequency=1000:duration=30 -c:v libx264 -c:a aac -shortest test-video.mp4
```

### 2. Vidéo avec Texte

```bash
# Créer une vidéo avec du texte
ffmpeg -f lavfi -i color=c=blue:size=1280x720:duration=60 -vf "drawtext=text='Sermon de Test':fontsize=60:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2" -c:a aac -f lavfi -i sine=frequency=440:duration=60 test-sermon.mp4
```

### 3. Vidéo Plus Longue (pour tester les chapitres)

```bash
# Créer une vidéo de 5 minutes avec différents segments
ffmpeg -f lavfi -i color=c=red:size=1280x720:duration=60 -f lavfi -i color=c=green:size=1280x720:duration=60 -f lavfi -i color=c=blue:size=1280x720:duration=60 -f lavfi -i color=c=yellow:size=1280x720:duration=60 -f lavfi -i color=c=purple:size=1280x720:duration=60 -filter_complex "[0:v][1:v][2:v][3:v][4:v]concat=n=5:v=1:a=0[outv]" -map "[outv]" -c:v libx264 -f lavfi -i sine=frequency=440:duration=300 long-test.mp4
```

## 📝 Sous-titres d'Exemple

Créez un fichier `subtitles.vtt` :

```vtt
WEBVTT

00:00:00.000 --> 00:00:05.000
Bienvenue dans ce sermon de test

00:00:05.000 --> 00:00:10.000
Nous allons explorer les Écritures

00:00:10.000 --> 00:00:15.000
Première partie : Introduction

00:00:15.000 --> 00:00:20.000
Deuxième partie : Développement

00:00:20.000 --> 00:00:25.000
Troisième partie : Application

00:00:25.000 --> 00:00:30.000
Conclusion et bénédiction
```

## 🖼️ Images d'Affiche

```bash
# Créer une image d'affiche simple
ffmpeg -f lavfi -i color=c=navy:size=1280x720 -vf "drawtext=text='Sermon de Test':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2" -frames:v 1 poster.jpg
```

## 🧪 Test Complet

1. **Créer les fichiers de test** :
```bash
# Créer le dossier
mkdir -p public/sermons/test-sermon

# Générer la vidéo
ffmpeg -f lavfi -i color=c=blue:size=1280x720:duration=30 -vf "drawtext=text='Sermon de Test':fontsize=60:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2" -c:a aac -f lavfi -i sine=frequency=440:duration=30 public/sermons/test-sermon/video.mp4

# Extraire l'affiche
ffmpeg -i public/sermons/test-sermon/video.mp4 -ss 00:00:05 -vframes 1 -q:v 2 public/sermons/test-sermon/poster.jpg

# Créer les sous-titres
cat > public/sermons/test-sermon/subtitles.vtt << 'EOF'
WEBVTT

00:00:00.000 --> 00:00:10.000
Bienvenue dans ce sermon de test

00:00:10.000 --> 00:00:20.000
Nous explorons les Écritures

00:00:20.000 --> 00:00:30.000
Conclusion et bénédiction
EOF
```

2. **Ajouter à sermons.json** :
```json
{
  "id": "test-sermon",
  "title": "Sermon de Test",
  "preacher": "Testeur",
  "date": "2024-12-20",
  "duration": 30,
  "description": "Un sermon de test pour vérifier le fonctionnement du système.",
  "poster": "/sermons/test-sermon/poster.jpg",
  "mp4": "/sermons/test-sermon/video.mp4",
  "subtitles": [
    { "lang": "fr", "label": "Français", "src": "/sermons/test-sermon/subtitles.vtt" }
  ],
  "chapters": [
    { "start": 0, "title": "Introduction" },
    { "start": 10, "title": "Développement" },
    { "start": 20, "title": "Conclusion" }
  ],
  "tags": ["test", "démonstration"]
}
```

## 🔍 Vérifications

1. **Vérifier les types MIME** :
```bash
curl -I http://localhost:5173/sermons/test-sermon/video.mp4
# Devrait retourner : Content-Type: video/mp4
```

2. **Vérifier les Range Requests** :
```bash
curl -I -H "Range: bytes=0-1023" http://localhost:5173/sermons/test-sermon/video.mp4
# Devrait retourner : Accept-Ranges: bytes
```

3. **Tester dans le navigateur** :
   - Aller sur `/sermons`
   - Vérifier que la vidéo se charge
   - Tester les contrôles (play/pause, vitesse, chapitres)
   - Vérifier les sous-titres
   - Tester la mémorisation de la progression

## 🐛 Dépannage

### Problèmes courants

**Vidéo ne se charge pas** :
- Vérifier que le fichier existe dans `public/sermons/`
- Vérifier les permissions (lecture)
- Vérifier les types MIME dans `.htaccess`

**Sous-titres ne s'affichent pas** :
- Vérifier le format WebVTT
- Vérifier les chemins dans `sermons.json`
- Tester avec un navigateur différent

**Chapitres ne fonctionnent pas** :
- Vérifier les timestamps dans `chapters`
- Vérifier que la vidéo est chargée
- Vérifier la console pour les erreurs

### Logs utiles

```javascript
// Dans la console du navigateur
console.log('Vidéo chargée:', video.readyState);
console.log('Durée:', video.duration);
console.log('Sous-titres:', video.textTracks);
```
