# 📖 Bible Interactive - Jeu Éducatif

Application web interactive pour faire découvrir la Bible aux enfants (6-12 ans) dans la tradition chrétienne orthodoxe, développée avec React, TypeScript, Phaser 3 et Tailwind CSS.

## 🌟 Fonctionnalités

### ✨ Interface utilisateur
- **Design adaptatif** : Interface moderne et accessible
- **Accessibilité** : Contraste élevé, police OpenDyslexic, navigation clavier
- **Réglages personnalisables** : Taille de police, thèmes, audio
- **PWA** : Installable et fonctionnelle hors-ligne

### 🎮 Jeux interactifs
- **Mini-jeux éducatifs** avec Phaser 3
- **"Remettre dans l'ordre"** : Glisser-déposer les événements
- **Système de récompenses** : Badges non-compétitifs
- **Progression sauvegardée** localement

### 📚 Contenu éducatif
- **Histoires bibliques** par modules JSON
- **Lectures guidées** avec versets clés
- **Vocabulaire** avec définitions adaptées
- **Journal personnel** avec progression et badges

### 🔒 Respect et sécurité
- **RGPD-K** : Aucune collecte de données, tout en local
- **Contenu respectueux** de la tradition orthodoxe
- **Pas de gamification** sur les éléments sacrés

## 🚀 Installation

### Prérequis
- Node.js (version 18+)
- npm ou pnpm

### Étapes
```bash
# Cloner le projet
git clone [url-du-repo]
cd site-biblique

# Installer les dépendances
npm install
# ou
pnpm install

# Lancer en développement
npm run dev
# ou  
pnpm dev

# Construire pour production
npm run build
# ou
pnpm build
```

## 🎯 Utilisation

1. **Page d'accueil** : Navigation entre les chemins bibliques
2. **Réglages** : Personnaliser l'accessibilité et l'interface
3. **Leçons** : Lecture + mini-jeu + obtention de badges
4. **Journal** : Consulter la progression et imprimer

### Premier pas
Commencez par l'histoire de **Jonas et le grand poisson** pour découvrir le système !

## 🛠️ Architecture technique

### Structure des dossiers
```
src/
  components/     # Composants React réutilisables
  phaser/         # Scènes et logique de jeu Phaser
  content/        # Données des leçons (JSON)
  state/          # Stores Zustand (réglages, progression)
  pages/          # Pages principales
  styles/         # CSS et Tailwind
assets/           # Images et ressources
public/           # Assets statiques et manifest PWA
```

### Technologies utilisées
- **React 18** + **TypeScript** : Interface utilisateur
- **Vite** : Build tool et dev server
- **Phaser 3** : Moteur de jeu 2D
- **Tailwind CSS** : Styles utilitaires
- **Zustand** : Gestion d'état
- **React Router** : Navigation
- **PWA** : Application installable

## 📋 Assets nécessaires

Le projet nécessite des images spécifiques (voir `public/README_assets.md`) :

- **Icônes PWA** : icon-192.png, icon-512.png  
- **Histoire Jonas** : jonas_1.png à jonas_4.png
- **Arrière-plan** : bg.jpg

En attendant ces assets, le jeu fonctionne avec des placeholders.

## 🎨 Personnalisation

### Ajouter une nouvelle leçon
1. Créer un fichier JSON dans `src/content/`
2. Suivre la structure de `jonas_01.json`
3. Ajouter la leçon au menu dans `src/components/Menu.tsx`
4. Créer les assets correspondants

### Exemple de structure JSON
```json
{
  "id": "nouvelle_lecon",
  "title": "Titre de la leçon",
  "path": "Ancien Testament",
  "reading": ["Paragraphe 1", "Paragraphe 2"],
  "key_verse": "Verset important",
  "vocab": [{"word": "mot", "hint": "définition"}],
  "quiz": [{"q": "Question?", "choices": ["A", "B"], "answer": 0}],
  "mini_games": ["order_events"],
  "assets": ["image1.png", "image2.png"]
}
```

## 🔧 Développement

### Scripts disponibles
```bash
npm run dev      # Serveur de développement
npm run build    # Build de production  
npm run preview  # Aperçu du build
npm run lint     # Vérification ESLint
npm run format   # Formatage Prettier
```

### Ajout de mini-jeux
1. Créer une nouvelle scène dans `src/phaser/scenes/`
2. Implémenter la logique de jeu
3. Émettre `lesson:completed` en cas de victoire
4. Ajouter au config Phaser dans `PhaserGame.tsx`

## 📱 PWA et installation

L'application est une PWA complète :
- **Installable** sur mobile et desktop
- **Cache intelligent** avec service worker
- **Fonctionne hors-ligne** une fois installée
- **Mise à jour automatique** du contenu

## ⚖️ Considérations légales

### RGPD-K (Protection des mineurs)
- ✅ Aucune collecte de données personnelles
- ✅ Progression stockée localement uniquement  
- ✅ Pas de publicité ciblée
- ✅ Pas de profilage comportemental

### Contenu biblique
- ✅ Textes du domaine public ou autorisés
- ✅ Respect de la tradition orthodoxe
- ✅ Iconographie appropriée et respectueuse

## 🤝 Contribution

Les contributions sont bienvenues ! Veuillez :
1. Respecter le code de conduite chrétien
2. Maintenir l'approche non-compétitive
3. Suivre les standards de code (ESLint/Prettier)
4. Tester l'accessibilité

## 📄 Licence

Ce projet est développé dans un esprit de partage éducatif chrétien. Voir le fichier LICENSE pour les détails.

## 🙏 Remerciements

Développé avec respect pour la tradition chrétienne orthodoxe et l'éducation des enfants.

---

*"La délivrance vient du Seigneur." - Jonas 2:9*
