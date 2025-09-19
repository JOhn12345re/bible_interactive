# 📖 API Bible - Louis Segond 1910

Une API REST complète pour la Bible Louis Segond 1910 avec recherche, thèmes et verset du jour.

## 🚀 Fonctionnalités

- **Bible complète** : Tous les livres, chapitres et versets de la Louis Segond 1910
- **Recherche intelligente** : Recherche dans le texte biblique avec filtres
- **Thèmes bibliques** : 18 thèmes avec versets correspondants
- **Verset du jour** : Rotation automatique basée sur la date
- **Sécurité** : Rate limiting, CORS, validation, headers de sécurité
- **Documentation** : API auto-documentée avec exemples

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn

## 🛠️ Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd bible-api
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration**
```bash
cp env.example .env
# Éditer .env avec vos paramètres
```

4. **Démarrer en développement**
```bash
npm run dev
```

5. **Démarrer en production**
```bash
npm run build
npm start
```

## 🔧 Configuration

### Variables d'environnement (.env)

```env
# Configuration de l'API Bible
PORT=3001
NODE_ENV=development

# Sécurité
API_SECRET_KEY=your-secret-key-here
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info

# Cache
CACHE_TTL=3600
```

## 📚 Endpoints API

### 📖 Livres

- `GET /api/books` - Liste tous les livres
- `GET /api/books/:bookId` - Informations sur un livre

### 📄 Chapitres

- `GET /api/books/:bookId/chapters/:chapter` - Chapitre spécifique

### 📝 Versets

- `GET /api/books/:bookId/chapters/:chapter/verses` - Tous les versets d'un chapitre
- `GET /api/books/:bookId/chapters/:chapter/verses/:verse` - Verset spécifique

### 🔍 Recherche

- `GET /api/search?q=terme` - Recherche simple
- `GET /api/search/advanced?q=terme&book=genese&chapter=1` - Recherche avancée

### 🏷️ Thèmes

- `GET /api/topics` - Liste des thèmes
- `GET /api/topics/:slug` - Versets d'un thème
- `GET /api/topics/:slug/random` - Verset aléatoire d'un thème
- `GET /api/topics/search?q=terme` - Recherche dans les thèmes

### ⭐ Verset du jour

- `GET /api/verse-of-the-day` - Verset du jour
- `GET /api/verse-of-the-day/:theme` - Verset du jour par thème

### 🏥 Santé

- `GET /health` - Statut de l'API
- `GET /api` - Documentation de l'API

## 📊 Exemples d'utilisation

### Recherche simple
```bash
curl "http://localhost:3001/api/search?q=amour"
```

### Verset spécifique
```bash
curl "http://localhost:3001/api/books/genese/chapters/1/verses/1"
```

### Thème
```bash
curl "http://localhost:3001/api/topics/foi"
```

### Verset du jour
```bash
curl "http://localhost:3001/api/verse-of-the-day"
```

## 🛡️ Sécurité

- **Rate Limiting** : 100 req/min par défaut
- **CORS** : Configuré pour votre domaine
- **Helmet** : Headers de sécurité
- **Validation** : Tous les paramètres validés
- **Logging** : Requêtes suspectes loggées

## 📁 Structure du projet

```
bible-api/
├── src/
│   ├── db/
│   │   ├── bible.json          # Données bibliques
│   │   └── topics.json         # Thèmes et versets
│   ├── routes/
│   │   ├── books.ts
│   │   ├── chapters.ts
│   │   ├── verses.ts
│   │   ├── search.ts
│   │   ├── topics.ts
│   │   └── verse-of-the-day.ts
│   ├── middleware/
│   │   ├── validation.ts
│   │   ├── security.ts
│   │   └── rate-limit.ts
│   ├── types/
│   │   └── index.ts
│   └── app.ts
├── package.json
├── tsconfig.json
├── env.example
└── README.md
```

## 🧪 Tests

```bash
npm test
```

## 📈 Performance

- **Cache** : Versets mis en cache
- **Pagination** : Recherches paginées
- **Compression** : Réponses compressées
- **Rate Limiting** : Protection contre le spam

## 🔄 Déploiement

### Docker
```bash
docker build -t bible-api .
docker run -p 3001:3001 bible-api
```

### PM2
```bash
npm install -g pm2
pm2 start dist/app.js --name bible-api
```

## 📝 Scripts disponibles

- `npm run dev` - Développement avec hot reload
- `npm run build` - Compilation TypeScript
- `npm start` - Démarrage en production
- `npm test` - Tests
- `npm run lint` - Linting
- `npm run lint:fix` - Correction automatique

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit (`git commit -am 'Ajouter nouvelle fonctionnalité'`)
4. Push (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.

## 🙏 Remerciements

- **Bible Louis Segond 1910** - Domaine public
- **Bible SuperSearch** - Données JSON
- **Express.js** - Framework web
- **TypeScript** - Typage statique

## 📞 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Consulter la documentation API : `/api`
- Vérifier le statut : `/health`

---

**Fait avec ❤️ pour la gloire de Dieu**
