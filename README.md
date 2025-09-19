# 📖 Bible Interactive

Une application web interactive pour découvrir les histoires bibliques à travers des jeux et des activités éducatives, spécialement conçue pour les enfants de 6-12 ans.

## ✨ Fonctionnalités

### 🎮 **Jeux Interactifs**
- Histoires bibliques adaptées aux enfants
- Activités éducatives et ludiques
- Système de badges et récompenses
- Interface adaptée aux enfants

### 📚 **Service Bible Louis Segond**
- **Traduction** : Louis Segond 1910 (français)
- **Source** : Données locales JSON
- **Fonctionnalités** :
  - Psaumes par jour
  - Recherche de versets
  - Méthodes spécialisées pour chaque histoire biblique
  - Interface de test intégrée

### 🎯 **Explorateur de Thèmes Bibliques**
- **20 thèmes bibliques** avec versets LSG 1910
- **Thèmes disponibles** :
  - Peur, Joie, Foi, Amour, Pardon
  - Espérance, Patience, Sagesse, Obéissance
  - Courage, Gratitude, Paix, Force
  - Humilité, Justice, Loyauté
  - Obéissance à Dieu, Espérance éternelle
- **Fonctionnalités** :
  - Verset du jour aléatoire
  - Recherche par mot-clé
  - Versets aléatoires par thème
  - Interface moderne et intuitive

### 🎯 **Histoires Disponibles**
- **Pentateuque** : Adam et Ève, Noé, Abraham, Isaac, Jacob, Joseph, Moïse
- **Historiques** : Gédéon, Samson, Salomon
- **Prophétiques** : Élie, Ézéchiel
- **Nouveau Testament** : Naissance de Jésus, Baptême, Tentations

### 📅 **Psaumes par Jour**
- Calcul automatique du psaume du jour
- Interface dédiée pour la lecture
- Psaumes de la semaine
- Debug intégré pour le diagnostic

### 🎨 **Interface Utilisateur**
- **Design moderne** : Gradients colorés et animations fluides
- **Responsive** : Adapté aux mobiles et tablettes
- **Accessibilité** : Mode contraste élevé et polices adaptées
- **Animations** : Transitions douces et effets interactifs

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation
```bash
# Cloner le dépôt
git clone git@github.com:JOhn12345re/bible_interactive.git

# Aller dans le dossier
cd bible_interactive

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 🛠️ Technologies Utilisées

- **Frontend** : React 18 + TypeScript
- **Styling** : Tailwind CSS
- **Build Tool** : Vite
- **Routing** : React Router
- **State Management** : Zustand
- **Animations** : CSS Animations

## 📁 Structure du Projet

```
src/
├── components/          # Composants React réutilisables
│   ├── TopicsExplorer.tsx    # Explorateur de thèmes bibliques
│   ├── PsalmOfTheDay.tsx     # Composant psaume du jour
│   └── ...
├── pages/              # Pages de l'application
│   ├── TestBible.tsx         # Page de test du service Bible
│   └── ...
├── services/           # Services (API Bible, etc.)
│   ├── bibleApi.ts           # Service Bible Louis Segond
│   ├── topicsService.ts      # Service des thèmes bibliques
│   └── ...
├── state/              # Gestion d'état (Zustand)
├── styles/             # Styles CSS avec animations
├── types/              # Types TypeScript
└── utils/              # Utilitaires

public/
├── api/                # API et données JSON
│   └── topics.json           # 20 thèmes bibliques
├── bibles_json_6.0/    # Données de la Bible Louis Segond
├── content/            # Contenu des leçons
└── sermons/            # Sermons et vidéos
```

## 🔧 Configuration

### Variables d'Environnement
Créez un fichier `.env` basé sur `.env.example` :

```env
VITE_BIBLE_LANGUAGE=fra
VITE_BIBLE_TRANSLATION=segond_1910
```

## 📖 Utilisation des Services

### Service Bible Louis Segond

```typescript
import { bibleApi } from './services/bibleApi';

// Obtenir le psaume du jour
const psalmOfTheDay = await bibleApi.getPsalmOfTheDay();

// Obtenir un psaume spécifique
const psalm23 = await bibleApi.getPsalm(23);

// Obtenir les versets de la création
const creationVerses = await bibleApi.getCreationVerses();

// Obtenir les versets d'Adam et Ève
const adamEveVerses = await bibleApi.getAdamEveVerses();

// Debug des données (pour diagnostic)
bibleApi.debugBibleData();
```

### Service des Thèmes Bibliques

```typescript
import { topicsService } from './services/topicsService';

// Obtenir tous les thèmes
const allTopics = await topicsService.getAllTopics();

// Obtenir un thème spécifique
const faithTopic = await topicsService.getTopicBySlug('foi');

// Obtenir le verset du jour
const verseOfTheDay = await topicsService.getVerseOfTheDay();

// Rechercher des thèmes
const searchResults = await topicsService.searchTopics('amour');
```

## 🎨 Personnalisation

### Thèmes et Accessibilité
- Mode contraste élevé
- Ajustement de la taille de police
- Police OpenDyslexic pour la dyslexie
- Interface adaptée aux enfants

### Ajout de Nouvelles Histoires
1. Créer un fichier JSON dans `public/content/`
2. Ajouter la méthode correspondante dans `bibleApi.ts`
3. Créer le composant de leçon

### Ajout de Nouveaux Thèmes Bibliques
1. Modifier le fichier `public/api/topics.json`
2. Ajouter le nouveau thème avec ses versets
3. Mettre à jour les noms et descriptions dans `topicsService.ts`

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm run build
vercel --prod
```

### Autres Plateformes
```bash
npm run build
# Déployer le dossier dist/
```

## 📝 Scripts Disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Prévisualisation du build
- `npm run lint` - Vérification du code

## 🌐 Pages Disponibles

- **`/`** - Page d'accueil avec navigation
- **`/test-bible`** - Test du service Bible avec debug
- **`/topics`** - Explorateur de thèmes bibliques
- **`/bible`** - Explorateur de la Bible
- **`/sermons`** - Section sermons et chants
- **`/timeline`** - Frise chronologique
- **`/lesson/:id`** - Leçons interactives

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- **Bible Louis Segond 1910** - Texte libre de droits
- **Communauté Open Source** - Pour les outils et bibliothèques utilisés
- **Contributors** - Pour les améliorations et corrections apportées

## 🆕 Dernières Mises à Jour

### Version Actuelle
- ✅ **Explorateur de Thèmes Bibliques** - 20 thèmes avec versets LSG 1910
- ✅ **Interface Utilisateur Améliorée** - Design moderne et responsive
- ✅ **Service Bible Optimisé** - Chargement local et debug intégré
- ✅ **Animations Fluides** - Transitions et effets interactifs
- ✅ **Accessibilité Renforcée** - Mode contraste et polices adaptées

## 📞 Support

Pour toute question ou problème, n'hésitez pas à ouvrir une issue sur GitHub.

---

**Bible Interactive** - Découvrir les histoires sacrées en s'amusant ! 🌟