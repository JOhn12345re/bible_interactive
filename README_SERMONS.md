# 🎬 Système de Sermons - Vidéos Auto-hébergées

## ✨ Fonctionnalités

- **Lecteur vidéo HTML5** avec support HLS et MP4
- **Sous-titres WebVTT** multilingues
- **Chapitres cliquables** pour navigation rapide
- **Vitesse de lecture** ajustable (0.75x à 2x)
- **Mémorisation de la progression** automatique
- **Raccourcis clavier** (Espace, flèches, F pour plein écran)
- **Interface responsive** avec recherche
- **Aucune dépendance externe** (pas de YouTube/Vimeo)

## 🚀 Démarrage Rapide

### 1. Préparer une vidéo

```bash
# Utiliser le script d'automatisation
./scripts/prepare-sermon.sh input.mp4 "Mon Sermon" "Père Jean"

# Ou manuellement avec FFmpeg
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 20 -c:a aac -b:a 160k -movflags +faststart public/sermons/mon-sermon/video.mp4
```

### 2. Ajouter au catalogue

Éditez `public/sermons/sermons.json` :

```json
{
  "id": "mon-sermon",
  "title": "Mon Sermon",
  "preacher": "Père Jean",
  "date": "2024-12-20",
  "duration": 2700,
  "description": "Description du sermon...",
  "poster": "/sermons/mon-sermon/poster.jpg",
  "mp4": "/sermons/mon-sermon/video.mp4",
  "subtitles": [
    { "lang": "fr", "label": "Français", "src": "/sermons/mon-sermon/subtitles.vtt" }
  ],
  "chapters": [
    { "start": 0, "title": "Introduction" },
    { "start": 300, "title": "Première partie" },
    { "start": 1200, "title": "Deuxième partie" },
    { "start": 2400, "title": "Conclusion" }
  ],
  "tags": ["foi", "espérance", "amour"]
}
```

### 3. Tester

```bash
npm run dev
# Aller sur http://localhost:5173/sermons
```

## 📁 Structure des Fichiers

```
public/sermons/
├── sermons.json              # Catalogue des sermons
├── la-vie-en-christ/
│   ├── video.mp4            # Vidéo principale
│   ├── poster.jpg           # Image d'affiche
│   └── subtitles.vtt        # Sous-titres
└── esperance/
    ├── video.mp4
    ├── poster.jpg
    └── subtitles.vtt
```

## 🎮 Utilisation

### Navigation
- **Espace** : Play/Pause
- **←/→** : Reculer/Avancer de 5 secondes
- **F** : Plein écran
- **Clic sur la barre** : Aller à une position

### Fonctionnalités
- **Chapitres** : Clic pour naviguer directement
- **Vitesse** : Menu déroulant (0.75x à 2x)
- **Sous-titres** : Activation via contrôles vidéo
- **Progression** : Sauvegardée automatiquement

## 🔧 Configuration Serveur

### Apache (.htaccess)
```apache
AddType application/vnd.apple.mpegurl .m3u8
AddType video/mp2t .ts
AddType video/mp4 .mp4
AddType text/vtt .vtt
Header set Accept-Ranges bytes
```

### Nginx
```nginx
location ~* \.(m3u8)$ {
    add_header Content-Type application/vnd.apple.mpegurl;
}
location ~* \.(ts)$ {
    add_header Content-Type video/mp2t;
}
location ~* \.(mp4)$ {
    add_header Content-Type video/mp4;
    add_header Accept-Ranges bytes;
}
```

### Vercel
Configuration automatique dans `vercel.json`

## 📱 Compatibilité

- **Chrome/Edge** : HLS via hls.js
- **Firefox** : HLS via hls.js  
- **Safari** : HLS natif
- **Mobile** : Support complet iOS/Android

## 🐛 Dépannage

### Vidéo ne se charge pas
- Vérifier les types MIME
- Vérifier les permissions
- Vérifier les chemins dans `sermons.json`

### Sous-titres ne s'affichent pas
- Vérifier le format WebVTT
- Vérifier les chemins des fichiers .vtt

### HLS ne fonctionne pas
- Vérifier que hls.js est chargé
- Tester avec le fallback MP4

## 📚 Documentation Complète

- [Guide détaillé](docs/SERMONS_GUIDE.md)
- [Exemples de vidéos](docs/EXEMPLE_VIDEOS.md)
- [Script d'automatisation](scripts/prepare-sermon.sh)

## 🎯 Avantages

✅ **Contrôle total** sur le contenu  
✅ **Aucune dépendance** externe  
✅ **Performance optimisée** avec HLS  
✅ **Accessibilité** complète  
✅ **Responsive** sur tous les appareils  
✅ **Sécurisé** (pas de tracking externe)  
✅ **Économique** (pas de frais de service)  

## 🔒 Sécurité

- Vidéos servies depuis votre domaine
- Pas de dépendance à des services tiers
- Contrôle total sur le contenu
- Possibilité d'ajouter une authentification

---

**Prêt à diffuser vos sermons en toute autonomie !** 🎬✨
