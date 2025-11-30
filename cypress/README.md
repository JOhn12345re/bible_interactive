# Tests Cypress - Bible Interactive

## 📋 Vue d'ensemble

Cette suite de tests Cypress couvre toutes les fonctionnalités principales du site Bible Interactive.

## 🚀 Installation

Les dépendances Cypress sont déjà installées. Si ce n'est pas le cas :

```bash
npm install
```

## 🧪 Exécution des tests

### Mode interactif (recommandé pour le développement)
```bash
npm run test:open
```

### Mode headless (pour CI/CD)
```bash
npm test
# ou
npm run test:headless
```

### Tests sur navigateurs spécifiques
```bash
npm run test:chrome
npm run test:firefox
```

## 📂 Structure des tests

```
cypress/
├── e2e/                          # Tests end-to-end
│   ├── 01-home.cy.ts            # Page d'accueil et navigation
│   ├── 02-authentication.cy.ts  # Connexion et inscription
│   ├── 03-dashboard.cy.ts       # Dashboard et profil
│   ├── 04-lessons.cy.ts         # Leçons et éditeurs
│   ├── 05-games.cy.ts           # Tous les jeux
│   ├── 06-bible-timeline.cy.ts  # Bible, Timeline, Topics, Sermons
│   ├── 07-coptic-features.cy.ts # Fonctionnalités coptes
│   └── 08-accessibility-features.cy.ts # Accessibilité et fonctionnalités diverses
├── fixtures/                     # Données de test
│   ├── users.json
│   ├── lessons.json
│   └── example.json
├── support/                      # Configuration et commandes
│   ├── commands.ts              # Commandes personnalisées
│   ├── e2e.ts                   # Configuration E2E
│   └── component.ts             # Configuration composants
└── README.md                     # Ce fichier
```

## 🎯 Couverture des tests

### 1. Page d'accueil (01-home.cy.ts)
- ✅ Affichage de la page d'accueil
- ✅ Fonctionnalités principales
- ✅ Statistiques
- ✅ Citations bibliques
- ✅ Navigation
- ✅ Responsivité

### 2. Authentification (02-authentication.cy.ts)
- ✅ Page de connexion
- ✅ Page d'inscription
- ✅ Validation des formulaires
- ✅ Protection des routes
- ✅ Déconnexion

### 3. Dashboard (03-dashboard.cy.ts)
- ✅ Affichage du dashboard
- ✅ Navigation rapide
- ✅ Profil utilisateur
- ✅ Statistiques de progression
- ✅ Achievements/badges

### 4. Leçons (04-lessons.cy.ts)
- ✅ Liste des leçons
- ✅ Filtres par catégorie
- ✅ Contenu des leçons
- ✅ Jeux de timeline
- ✅ Éditeurs de leçons

### 5. Jeux (05-games.cy.ts)
- ✅ Verse Memory
- ✅ Temple Builder
- ✅ Miracle Race
- ✅ Bible Quiz
- ✅ Verse Memory Cards
- ✅ Ark Puzzle
- ✅ Treasure Hunt
- ✅ Serpent d'Airain
- ✅ Progression et scores

### 6. Bible et Timeline (06-bible-timeline.cy.ts)
- ✅ Explorateur de la Bible
- ✅ Navigation entre livres/chapitres
- ✅ Recherche de versets
- ✅ Timeline complète
- ✅ Topics Explorer
- ✅ Sermons

### 7. Fonctionnalités Coptes (07-coptic-features.cy.ts)
- ✅ Histoire de l'Église Copte
- ✅ Saints coptes
- ✅ Icônes coptes
- ✅ Dates importantes
- ✅ Histoire chrétienne
- ✅ Présentateur orthodoxe
- ✅ Katameros

### 8. Accessibilité et Autres (08-accessibility-features.cy.ts)
- ✅ Contrôles d'accessibilité
- ✅ Navigation au clavier
- ✅ ARIA et sémantique
- ✅ Contrôles audio
- ✅ Journal spirituel
- ✅ Lectures quotidiennes
- ✅ Verset du jour
- ✅ Défis spirituels
- ✅ Mémorisation de versets

## 🛠 Commandes personnalisées

### Authentification
```javascript
cy.login('email@example.com', 'password123');
cy.register('John Doe', 'email@example.com', 'password123');
```

### Navigation
```javascript
cy.goToLesson('adam_eve_01');
cy.goToGame('verse-memory');
```

### Accessibilité
```javascript
cy.checkAccessibility();
cy.testAudioControls();
```

### Utilitaires
```javascript
cy.completeLesson('adam_eve_01');
cy.waitForElement('[data-testid="lesson-card"]', 15000);
```

## 📝 Bonnes pratiques

### 1. Avant de lancer les tests
- Assurez-vous que le serveur de développement est lancé (`npm run dev`)
- Le serveur doit être accessible sur `http://localhost:5173`

### 2. Écriture de tests
- Utilisez des sélecteurs stables (data-testid, classes, etc.)
- Ajoutez des attentes explicites (`cy.wait()` quand nécessaire)
- Testez la responsivité sur mobile et tablette
- Vérifiez l'accessibilité (ARIA, navigation clavier)

### 3. Débogage
- Utilisez `cy.pause()` pour mettre en pause un test
- Utilisez `cy.debug()` pour afficher des informations
- Les vidéos et screenshots sont générés automatiquement en cas d'échec

## 🔧 Configuration

La configuration se trouve dans `cypress.config.ts` :

```typescript
{
  baseUrl: 'http://localhost:5173',
  viewportWidth: 1280,
  viewportHeight: 720,
  video: true,
  screenshotOnRunFailure: true,
  retries: {
    runMode: 2,
    openMode: 0
  }
}
```

## 📊 Rapports de tests

Après l'exécution des tests :
- Les vidéos sont dans `cypress/videos/`
- Les screenshots sont dans `cypress/screenshots/`

## 🐛 Résolution de problèmes

### Le serveur n'est pas accessible
```bash
# Lancez le serveur de développement
npm run dev
```

### Les tests sont lents
- Réduisez les `cy.wait()` si possible
- Utilisez des sélecteurs plus spécifiques
- Augmentez les timeouts dans la configuration

### Les tests échouent de manière intermittente
- Augmentez les timeouts
- Ajoutez des attentes explicites
- Vérifiez les animations/transitions

## 📚 Ressources

- [Documentation Cypress](https://docs.cypress.io/)
- [Meilleures pratiques Cypress](https://docs.cypress.io/guides/references/best-practices)
- [API Cypress](https://docs.cypress.io/api/table-of-contents)

## 🤝 Contribution

Pour ajouter de nouveaux tests :

1. Créez un nouveau fichier dans `cypress/e2e/`
2. Suivez la structure existante
3. Utilisez les commandes personnalisées quand possible
4. Testez la responsivité
5. Vérifiez l'accessibilité
6. Documentez les nouveaux tests dans ce README

## 📝 Notes

- Les tests utilisent TypeScript pour une meilleure autocomplétion
- Les tests sont numérotés pour un ordre d'exécution logique
- Chaque test est conçu pour être indépendant
- Les données de test sont dans `cypress/fixtures/`

