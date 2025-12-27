# 🧪 Guide de Tests - API Bible.com

Ce document explique comment tester l'intégration de l'API Bible.com et vérifier que tous les versets s'affichent correctement.

## 📋 Types de Tests Disponibles

### 1. Tests Unitaires (Vitest)
Tests automatisés pour vérifier la logique de l'API et des composants.

```bash
# Exécuter tous les tests
npm test

# Exécuter les tests avec l'interface UI
npm run test:ui

# Exécuter les tests en mode watch (surveillance)
npm test -- --watch
```

### 2. Tests Manuels de l'API
Script interactif qui teste directement l'API Bible.com pour toutes les histoires de la timeline.

```bash
npm run test:api
```

Ce script va :
- ✅ Tester chaque histoire de la timeline
- ✅ Vérifier que les versets sont récupérés correctement
- ✅ Valider le livre et le chapitre
- ✅ Afficher un résumé coloré des résultats
- ✅ Indiquer les erreurs éventuelles

**Exemple de sortie :**
```
╔═══════════════════════════════════════════════════════╗
║   Tests de l'API Bible.com - Vérification complète   ║
╚═══════════════════════════════════════════════════════╝

🔍 Test: La Création...
✅ La Création - 31 versets récupérés en 234ms
   📖 Genèse 1:1: Au commencement, Dieu créa les cieux et la terre...

🔍 Test: Caïn et Abel...
✅ Caïn et Abel - 16 versets récupérés en 189ms
   📖 Genèse 4:1: Adam connut Eve, sa femme; elle conçut...

[... autres tests ...]

╔═══════════════════════════════════════════════════════╗
║                    RÉSUMÉ DES TESTS                   ║
╚═══════════════════════════════════════════════════════╝

Tests réussis: 14/14
Tests échoués: 0
Durée totale: 3256ms
Durée moyenne: 232ms par test
Versets récupérés: 487 versets au total

✅ Tous les tests sont passés !
```

### 3. Tests E2E (Cypress)
Tests d'intégration bout-en-bout pour vérifier l'interface utilisateur.

```bash
# Exécuter les tests E2E en mode headless
npm run test:e2e

# Ouvrir l'interface Cypress
npm run test:e2e:open
```

## 🎯 Ce que Testent les Tests

### Tests de l'API (`bibleApi.test.ts`)

1. **Intégration API Bible.com**
   - ✅ Connexion à l'API avec la clé API
   - ✅ Récupération de versets pour différents livres
   - ✅ Format correct des données retournées

2. **Méthodes spécifiques pour chaque histoire**
   - ✅ `getCreationVerses()` - Genèse 1
   - ✅ `getCainAbelVerses()` - Genèse 4
   - ✅ `getMoiseBuissonVerses()` - Exode 3
   - ✅ `getVeauOrVerses()` - Exode 32
   - ✅ `getJerichoVerses()` - Josué 6
   - ✅ `getDavidGoliathVerses()` - 1 Samuel 17
   - ... et toutes les autres histoires

3. **Gestion des erreurs**
   - ✅ Fallback vers les données mockées si l'API échoue
   - ✅ Gestion des références invalides
   - ✅ Timeout approprié

4. **Structure des données**
   - ✅ Présence de tous les champs requis (book, chapter, verse, text, reference)
   - ✅ Types de données corrects

### Tests du Composant (`BibleVerse.test.tsx`)

1. **Affichage des versets**
   - ✅ Les versets s'affichent pour chaque `lessonId`
   - ✅ Le texte correct est affiché
   - ✅ La référence biblique est correcte

2. **États du composant**
   - ✅ État de chargement initial
   - ✅ Affichage des erreurs éventuelles

## 🐛 Debugging

### Si un test échoue

1. **Vérifier la clé API**
   ```bash
   # Assurez-vous que le fichier .env contient :
   VITE_BIBLE_API_KEY=e0d8e2de2f0db84705a6b02c2286d733
   ```

2. **Vérifier la connexion Internet**
   Les tests de l'API nécessitent une connexion active.

3. **Vérifier les logs**
   Les tests affichent des logs détaillés dans la console.

4. **Exécuter un test spécifique**
   ```bash
   npm test -- -t "devrait récupérer des versets pour Genèse"
   ```

### Logs de debug

Les services utilisent `console.log` et `console.warn` pour le debug :
- ✅ `✅` = Versets récupérés depuis Bible.com
- ⚠️ `⚠️` = Fallback vers les données mockées
- ❌ `❌` = Erreur

## 📊 Couverture de Code

Pour générer un rapport de couverture :

```bash
npm test -- --coverage
```

Le rapport sera généré dans `coverage/index.html`.

## 🔄 Tests de Non-Régression

Avant chaque déploiement, exécutez :

```bash
# 1. Tests unitaires
npm test

# 2. Tests API manuels
npm run test:api

# 3. Tests E2E
npm run test:e2e

# 4. Vérification TypeScript
npm run type-check

# 5. Linting
npm run lint:check
```

## ✅ Checklist de Validation

- [ ] Tous les tests unitaires passent (`npm test`)
- [ ] Le script de test API affiche 14/14 tests réussis
- [ ] Aucune erreur dans la console du navigateur
- [ ] Les versets s'affichent correctement dans l'interface
- [ ] Le texte correspond bien à l'histoire sélectionnée
- [ ] Pas d'erreur "Leçon non supportée par l'API"
- [ ] Les références bibliques sont correctes (ex: "Genèse 1:1" et non "Exode 1:1" pour la création)

## 🚀 Prochaines Étapes

Si tous les tests passent :
1. ✅ L'intégration de l'API Bible.com est fonctionnelle
2. ✅ Tous les versets de la timeline sont disponibles
3. ✅ Les fallbacks fonctionnent correctement
4. ✅ L'application est prête pour le déploiement

Si des tests échouent :
1. Vérifier les logs d'erreur
2. Consulter `API_BIBLE_COM_INTEGRATION.md` pour la configuration
3. Vérifier que la clé API est valide
4. Contacter le support si nécessaire

## 📚 Ressources

- [Documentation Vitest](https://vitest.dev/)
- [Documentation Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Documentation API Bible.com](https://scripture.api.bible/)
- [Documentation Cypress](https://docs.cypress.io/)

---

**Note :** Ces tests ont été créés pour garantir la qualité et la fiabilité de l'intégration de l'API Bible.com.

