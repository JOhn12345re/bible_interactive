# 📖 Guide d'intégration de l'API Bible

## Vue d'ensemble

L'application Bible Interactive intègre l'[API Digital Bible Platform](https://dbt.io/) pour fournir des textes bibliques authentiques dans les leçons. Cette intégration enrichit l'expérience éducative avec des versets originaux.

## 🔧 Configuration

### 1. Obtenir une clé API

1. Rendez-vous sur [https://dbt.io/](https://dbt.io/)
2. Créez un compte développeur
3. Générez votre clé API gratuite
4. Notez votre clé pour la configuration

### 2. Configuration locale

Créez un fichier `.env.local` à la racine du projet :

```env
# API Bible - Digital Bible Platform
VITE_BIBLE_API_KEY=votre_cle_api_ici

# Configuration optionnelle
VITE_BIBLE_DEFAULT_VERSION=LSGF
VITE_BIBLE_LANGUAGE=fra
```

### 3. Redémarrage

Redémarrez votre serveur de développement pour prendre en compte les variables d'environnement.

## 📚 Fonctionnalités intégrées

### Dans les leçons

Chaque leçon affiche automatiquement :
- ✅ Les versets bibliques correspondants
- ✅ Références authentiques avec chapitres et versets
- ✅ Texte adapté à la tradition orthodoxe
- ✅ Fallback vers des données locales si l'API n'est pas disponible

### Recherche de versets

Accessible depuis la page d'accueil :
- 🔍 **Recherche par référence** : "Jean 3:16", "Psaume 23:1-3"
- 📝 **Versets populaires** : Accès rapide aux passages célèbres
- 📚 **Historique** : Mémorisation des recherches récentes
- 💡 **Suggestions** : Aide pour la syntaxe de recherche

## 🔄 Fallback et fiabilité

### Mode hors-ligne

Si l'API n'est pas disponible, l'application utilise :
- 📖 Textes bibliques pré-chargés pour les leçons principales
- 🔄 Cache intelligent pour réduire les appels API
- ⚡ Performance optimisée avec mise en cache locale

### Gestion d'erreurs

- **Erreurs réseau** : Basculement automatique vers les données locales
- **Limites API** : Messages informatifs à l'utilisateur
- **Versets introuvables** : Suggestions de recherche alternative

## 🎯 Leçons supportées

### Avec versets API intégrés

- **Jonas** : Série complète (Jonas 1-4)
- **Création** : Genèse 1:1-3
- **Naissance de Jésus** : Luc 2:8-14

### À venir

- **Moïse** : Exode (passages sélectionnés)
- **Noé** : Genèse 6-9
- **David** : 1 Samuel
- **Paraboles** : Matthieu, Luc

## 🔐 Sécurité et confidentialité

### Protection des données

- ✅ **Aucune donnée personnelle** envoyée à l'API
- ✅ **Cache local uniquement** pour les versets
- ✅ **Conformité RGPD-K** maintenue
- ✅ **Pas de tracking** des recherches

### Bonnes pratiques

- Les clés API sont gérées côté client uniquement
- Cache intelligent pour réduire les appels
- Limitation automatique des requêtes
- Fallback gracieux en cas d'indisponibilité

## 🚀 Développement

### Structure du code

```
src/
├── services/
│   └── bibleApi.ts         # Service principal API
├── hooks/
│   └── useBibleApi.ts      # Hooks React personnalisés
├── components/
│   ├── BibleVerse.tsx      # Affichage des versets
│   └── VerseSearch.tsx     # Composant de recherche
```

### Ajouter une nouvelle leçon

1. **Créer le fichier JSON** de la leçon
2. **Mapper la leçon** dans `useBibleApi.ts`
3. **Ajouter les versets** correspondants au service
4. **Tester** l'affichage avec et sans API

### Tests

```bash
# Tester avec API
npm run dev

# Tester sans API (simuler l'offline)
# Définir VITE_BIBLE_API_KEY="" dans .env.local
npm run dev
```

## 📞 Support

### En cas de problème

1. **Vérifiez la clé API** dans `.env.local`
2. **Consultez les logs** de la console navigateur
3. **Testez l'API directement** avec curl :

```bash
curl -H "api-key: VOTRE_CLE" "https://4.dbt.io/api/bibles?language_code=fra"
```

### Ressources

- [Documentation officielle API](https://4.dbt.io/open-api-4.json)
- [Support Digital Bible Platform](https://dbt.io/support)
- [Exemples d'usage](https://dbt.io/docs/examples)

---

*L'intégration de l'API Bible enrichit l'expérience éducative tout en préservant l'autonomie de l'application grâce aux fallbacks locaux.*
