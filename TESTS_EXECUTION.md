# 🚀 Guide d'Exécution des Tests Cypress

## ⚡ Démarrage Rapide

### 1. Prérequis
Assurez-vous que les dépendances sont installées :
```bash
npm install
```

### 2. Lancer le serveur de développement
Dans un terminal, lancez :
```bash
npm run dev
```
Le serveur devrait démarrer sur `http://localhost:5173`

### 3. Lancer les tests

#### Option A : Mode Interactif (Recommandé pour le développement)
Dans un NOUVEAU terminal (pendant que le serveur tourne) :
```bash
npm run test:open
```

Cela va :
1. Ouvrir l'interface Cypress
2. Vous permettre de voir tous les fichiers de tests
3. Cliquer sur un fichier pour le lancer
4. Observer les tests en temps réel

#### Option B : Mode Headless (Pour CI/CD ou tests rapides)
```bash
npm test
```
Ou :
```bash
npm run test:headless
```

Cela va :
1. Exécuter tous les tests en arrière-plan
2. Générer des vidéos et screenshots
3. Afficher les résultats dans le terminal

## 📊 Résultats Attendus

### Si tout fonctionne bien :
```
✓ 01-home.cy.ts (12 tests) - ✅ Tous passent
✓ 02-authentication.cy.ts (18 tests) - ✅ Tous passent
✓ 03-dashboard.cy.ts (11 tests) - ✅ Tous passent
✓ 04-lessons.cy.ts (35 tests) - ✅ Tous passent
✓ 05-games.cy.ts (42 tests) - ✅ Tous passent
✓ 06-bible-timeline.cy.ts (28 tests) - ✅ Tous passent
✓ 07-coptic-features.cy.ts (26 tests) - ✅ Tous passent
✓ 08-accessibility-features.cy.ts (30 tests) - ✅ Tous passent

Total: 202 tests passés ✅
```

### Si certains tests échouent :
C'est normal ! Certains tests peuvent échouer si :
- Le contenu n'est pas encore chargé (ajoutez des `data-testid`)
- Les délais sont trop courts (augmentez les `cy.wait()`)
- Le contenu a changé (adaptez les tests)

## 🎯 Exécution de Tests Spécifiques

### Lancer un seul fichier de tests
En mode interactif, cliquez simplement sur le fichier dans l'interface Cypress.

En mode headless :
```bash
npx cypress run --spec "cypress/e2e/01-home.cy.ts"
```

### Lancer plusieurs fichiers
```bash
npx cypress run --spec "cypress/e2e/01-home.cy.ts,cypress/e2e/02-authentication.cy.ts"
```

### Lancer sur un navigateur spécifique
```bash
npm run test:chrome
# ou
npm run test:firefox
```

## 🔍 Analyse des Résultats

### Vidéos
Après l'exécution, les vidéos sont dans :
```
cypress/videos/
```
Chaque fichier de test aura sa propre vidéo.

### Screenshots
En cas d'échec, les screenshots sont dans :
```
cypress/screenshots/
```
Organisés par fichier de test et nom du test.

### Rapports dans le Terminal
```
Running:  01-home.cy.ts

  Page d'Accueil
    ✓ devrait afficher la page d'accueil correctement (2345ms)
    ✓ devrait afficher les fonctionnalités principales (1234ms)
    ✓ devrait afficher les statistiques (890ms)
    ...

  12 passing (15s)
```

## 🐛 Débogage

### Un test spécifique échoue

1. **Mode Interactif** (recommandé) :
```bash
npm run test:open
```
- Cliquez sur le test qui échoue
- Observez chaque étape
- Utilisez le sélecteur d'éléments (icône cible)
- Inspectez les éléments avec les DevTools

2. **Ajouter des logs** :
```typescript
cy.get('button').then($btn => {
  cy.log('Bouton trouvé:', $btn.text());
});
```

3. **Pause le test** :
```typescript
cy.pause(); // Le test s'arrête ici
```

### Tous les tests échouent

Vérifiez que :
1. Le serveur dev tourne (`npm run dev`)
2. Le port est correct (`http://localhost:5173`)
3. Pas de problème de CORS
4. Les dépendances sont installées

### Les tests sont lents

1. Réduisez les `cy.wait()` :
```typescript
// Avant
cy.wait(5000);

// Après
cy.wait(1000);
```

2. Utilisez des attentes plus précises :
```typescript
// Au lieu de
cy.wait(2000);
cy.get('.button');

// Utilisez
cy.get('.button', { timeout: 10000 });
```

## 📈 Optimisation

### Exécution Parallèle (CI/CD)
```bash
# Installer cypress-parallel
npm install --save-dev cypress-parallel

# Dans package.json
"test:parallel": "cypress-parallel -s cypress run -t 4 -d cypress/e2e"
```

### Ignorer certains tests temporairement
```typescript
// Ignorer un test
it.skip('devrait faire quelque chose', () => {
  // Ce test sera ignoré
});

// Ignorer une suite
describe.skip('Suite à ignorer', () => {
  // Tous les tests ici seront ignorés
});
```

### Exécuter seulement certains tests
```typescript
// Exécuter seulement ce test
it.only('devrait faire quelque chose', () => {
  // Seulement ce test sera exécuté
});
```

## 🔧 Configuration Avancée

### Changer le baseUrl
Dans `cypress.config.ts` :
```typescript
{
  e2e: {
    baseUrl: 'http://localhost:3000', // Changez selon votre port
  }
}
```

### Augmenter les timeouts
```typescript
{
  e2e: {
    defaultCommandTimeout: 15000,  // Défaut: 10000
    pageLoadTimeout: 90000,        // Défaut: 60000
  }
}
```

### Désactiver les vidéos (plus rapide)
```typescript
{
  e2e: {
    video: false,
  }
}
```

## 📝 Commandes Utiles

### Nettoyer les artifacts
```bash
# Windows PowerShell
Remove-Item -Recurse -Force cypress\videos, cypress\screenshots

# Bash/Mac/Linux
rm -rf cypress/videos cypress/screenshots
```

### Ouvrir les résultats
```bash
# Ouvrir le dossier des vidéos
start cypress\videos        # Windows
open cypress/videos         # Mac
xdg-open cypress/videos     # Linux
```

### Informations sur Cypress
```bash
npx cypress info
npx cypress version
```

## 🚦 CI/CD

### GitHub Actions (exemple)
```yaml
name: Tests Cypress
on: [push]
jobs:
  cypress:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Cypress run
        uses: cypress-io/github-action@v5
        with:
          build: npm run build
          start: npm run dev
          wait-on: 'http://localhost:5173'
```

## 📞 Support

### Problèmes courants

1. **"Cannot find module 'cypress'"**
   ```bash
   npm install
   ```

2. **"baseUrl not configured"**
   - Vérifiez `cypress.config.ts`
   - Assurez-vous que le serveur tourne

3. **"Timed out waiting for"**
   - Augmentez les timeouts
   - Vérifiez que l'élément existe
   - Utilisez des sélecteurs plus précis

4. **Tests qui passent localement mais échouent en CI**
   - Augmentez les timeouts
   - Ajoutez plus de `cy.wait()`
   - Vérifiez les différences d'environnement

## 📚 Ressources

- [Documentation Cypress](https://docs.cypress.io)
- [Guide des Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [API Cypress](https://docs.cypress.io/api/table-of-contents)
- [Cypress Discord](https://discord.gg/cypress)

## 🎉 Prochaines Étapes

1. ✅ Exécuter les tests en mode interactif
2. ✅ Observer comment ils fonctionnent
3. ✅ Adapter les tests à votre contenu
4. ✅ Ajouter des `data-testid` (voir TESTS_AMELIORATIONS.md)
5. ✅ Intégrer dans votre workflow de développement
6. ✅ Ajouter à votre pipeline CI/CD

**Bonne chance avec vos tests ! 🚀**

