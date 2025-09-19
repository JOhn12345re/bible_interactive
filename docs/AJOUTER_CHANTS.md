# 🎵 Guide pour Ajouter des Chants et Psaumes

## 📋 Vue d'ensemble

Le système de sermons supporte maintenant les chants et psaumes en plus des sermons traditionnels. Vous pouvez organiser votre contenu en deux catégories :

- **Sermons** : Prédications et enseignements
- **Chants & Psaumes** : Musique sacrée, psaumes, hymnes

## 🎬 Ajout du Psaume 150 - Fête de Nayrouz

### ✅ Fichiers Créés

```
public/sermons/psaume-150-nayrouz/
├── video.mp4              # Vidéo du chant
├── poster.jpg             # Image d'affiche (à créer avec FFmpeg)
└── subtitles.vtt          # Sous-titres français
```

### 📝 Métadonnées Ajoutées

```json
{
  "id": "psaume-150-nayrouz",
  "title": "Psaume 150 - Fête de Nayrouz",
  "preacher": "Maître Ibrahim Ayyad",
  "date": "2024-09-11",
  "duration": 420,
  "description": "Le Psaume 150 interprété lors de la célébration de la Fête de Nayrouz (Nouvel An copte). Un chant de louange magnifique par le Maître Ibrahim Ayyad.",
  "poster": "/sermons/psaume-150-nayrouz/poster.jpg",
  "mp4": "/sermons/psaume-150-nayrouz/video.mp4",
  "subtitles": [
    { "lang": "fr", "label": "Français", "src": "/sermons/psaume-150-nayrouz/subtitles.vtt" }
  ],
  "chapters": [
    { "start": 0, "title": "Introduction" },
    { "start": 60, "title": "Louez l'Éternel dans son sanctuaire" },
    { "start": 120, "title": "Instruments de musique" },
    { "start": 240, "title": "Cymbales sonores" },
    { "start": 360, "title": "Que tout ce qui respire loue l'Éternel" }
  ],
  "tags": ["psaume", "nayrouz", "chant", "louange", "copte", "fête"]
}
```

## 🎯 Classification des Contenus

### Tags pour les Chants & Psaumes
- `"psaume"` - Pour les psaumes bibliques
- `"chant"` - Pour les chants liturgiques
- `"hymne"` - Pour les hymnes
- `"louange"` - Pour les chants de louange
- `"copte"` - Pour la tradition copte
- `"fête"` - Pour les célébrations spéciales

### Tags pour les Sermons
- `"sermon"` - Pour les prédications
- `"enseignement"` - Pour les enseignements
- `"foi"`, `"espérance"`, `"amour"` - Thèmes spirituels
- `"vie chrétienne"` - Application pratique

## 🔧 Interface Utilisateur

### Filtres Ajoutés
- **Tous** : Affiche tous les contenus
- **Sermons** : Affiche uniquement les sermons
- **Chants & Psaumes** : Affiche uniquement les chants et psaumes

### Navigation
- Le bouton dans la page d'accueil s'appelle maintenant **"Sermons & Chants"**
- La page s'intitule **"Sermons & Chants"**
- Les titres des sections s'adaptent selon le filtre sélectionné

## 📁 Structure Recommandée

```
public/sermons/
├── sermons.json                    # Catalogue principal
├── [sermon-id]/                    # Dossiers des sermons
│   ├── video.mp4
│   ├── poster.jpg
│   └── subtitles.vtt
├── [chant-id]/                     # Dossiers des chants
│   ├── video.mp4
│   ├── poster.jpg
│   └── subtitles.vtt
└── [psaume-id]/                    # Dossiers des psaumes
    ├── video.mp4
    ├── poster.jpg
    └── subtitles.vtt
```

## 🎵 Exemples de Chants à Ajouter

### Psaumes
- Psaume 23 (Le Seigneur est mon berger)
- Psaume 91 (Celui qui demeure sous l'abri du Très-Haut)
- Psaume 150 (Louez l'Éternel !)

### Chants Liturgiques
- Chants de Noël
- Chants de Pâques
- Chants de la Semaine Sainte
- Chants de la Fête de Nayrouz

### Hymnes
- Hymnes de louange
- Hymnes de repentance
- Hymnes de gratitude

## 🛠️ Script d'Automatisation

Pour ajouter facilement des chants, utilisez le script existant :

```bash
# Pour un chant
./scripts/prepare-sermon.sh "chant.mp4" "Nom du Chant" "Interprète"

# Pour un psaume
./scripts/prepare-sermon.sh "psaume.mp4" "Psaume 23" "Chœur"
```

Puis modifiez le fichier JSON pour ajouter les tags appropriés :
- `"psaume"` ou `"chant"` pour la classification
- Tags spécifiques selon le contenu

## 🎨 Personnalisation

### Couleurs et Styles
- Les chants utilisent les mêmes styles que les sermons
- Possibilité d'ajouter des icônes spécifiques (🎵, 🎶, 📿)
- Couleurs adaptées selon le type de contenu

### Sous-titres
- Support multilingue (français, arabe, copte)
- Synchronisation avec la musique
- Affichage des paroles et traductions

## 📱 Compatibilité

- **Mobile** : Lecture optimisée sur tous les appareils
- **Tablette** : Interface adaptée
- **Desktop** : Expérience complète
- **Accessibilité** : Raccourcis clavier et navigation

## 🔍 Recherche

La recherche fonctionne sur :
- **Titre** : "Psaume 150", "Nayrouz"
- **Interprète** : "Maître Ibrahim Ayyad"
- **Tags** : "psaume", "chant", "copte"
- **Description** : Mots-clés du contenu

## 🎯 Prochaines Étapes

1. **Ajouter plus de chants** : Psaumes, hymnes, chants liturgiques
2. **Organiser par saisons** : Noël, Pâques, fêtes spéciales
3. **Ajouter des playlists** : Groupements thématiques
4. **Support multilingue** : Sous-titres en arabe et copte
5. **Mode hors-ligne** : Cache pour lecture sans connexion

---

**Le système est maintenant prêt à accueillir vos chants et psaumes !** 🎵✨
