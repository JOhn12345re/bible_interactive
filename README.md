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

### 🎯 **Histoires Disponibles**
- **Pentateuque** : Adam et Ève, Noé, Abraham, Isaac, Jacob, Joseph, Moïse
- **Historiques** : Gédéon, Samson, Salomon
- **Prophétiques** : Élie, Ézéchiel
- **Nouveau Testament** : Naissance de Jésus, Baptême, Tentations

### 📅 **Psaumes par Jour**
- Calcul automatique du psaume du jour
- Interface dédiée pour la lecture
- Psaumes de la semaine

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
├── pages/              # Pages de l'application
├── services/           # Services (API Bible, etc.)
├── state/              # Gestion d'état (Zustand)
├── styles/             # Styles CSS
├── types/              # Types TypeScript
└── utils/              # Utilitaires

public/
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

## 📖 Utilisation du Service Bible

### Exemples d'utilisation

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

## 📞 Support

Pour toute question ou problème, n'hésitez pas à ouvrir une issue sur GitHub.

---

**Bible Interactive** - Découvrir les histoires sacrées en s'amusant ! 🌟