# 🚀 Guide de Déploiement - Version Beta

## 🎯 Option Recommandée : Vercel + PlanetScale

### Étape 1 : Préparer l'application

#### 1.1 Build de production
```bash
npm run build
```

#### 1.2 Variables d'environnement
Créer `.env.production` :
```
VITE_BIBLE_API_KEY=votre_cle_api
VITE_BIBLE_DEFAULT_VERSION=LSG
VITE_BIBLE_LANGUAGE=fr
```

### Étape 2 : Base de données (PlanetScale)

#### 2.1 Créer un compte PlanetScale
1. Aller sur [planetscale.com](https://planetscale.com)
2. Créer un compte gratuit
3. Créer une nouvelle base de données

#### 2.2 Exporter votre schéma
```sql
-- Copier le contenu de database/setup.sql
-- L'adapter pour PlanetScale (supprimer les contraintes CHECK)
```

#### 2.3 Obtenir la chaîne de connexion
- Host: `aws.connect.psdb.cloud`
- Username: `votre_username`
- Password: `votre_password`
- Database: `votre_database`

### Étape 3 : Déploiement Frontend (Vercel)

#### 3.1 Créer un compte Vercel
1. Aller sur [vercel.com](https://vercel.com)
2. Se connecter avec GitHub
3. Importer votre projet

#### 3.2 Configuration Vercel
- **Framework Preset** : Vite
- **Build Command** : `npm run build`
- **Output Directory** : `dist`
- **Install Command** : `npm install`

#### 3.3 Variables d'environnement
Dans Vercel Dashboard :
```
VITE_BIBLE_API_KEY=votre_cle_api
VITE_DATABASE_URL=mysql://user:pass@host:port/db
```

### Étape 4 : API Backend

#### 4.1 Vercel Serverless Functions
Créer `api/profile.js` :
```javascript
// API serverless pour Vercel
export default async function handler(req, res) {
  // Code de votre API PHP adapté en JavaScript
}
```

#### 4.2 Alternative : Railway/Render
- Déployer votre API PHP sur Railway ou Render
- Utiliser l'URL de l'API dans votre frontend

## 🔧 Configuration Spécifique

### Adapter le code pour la production

#### 1. URLs d'API
```typescript
// src/services/api.ts
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://votre-api.vercel.app/api'
  : '/api'
```

#### 2. Base de données
```typescript
// Adapter pour PlanetScale
const dbConfig = {
  host: import.meta.env.VITE_DB_HOST,
  user: import.meta.env.VITE_DB_USER,
  password: import.meta.env.VITE_DB_PASSWORD,
  database: import.meta.env.VITE_DB_NAME,
  ssl: { rejectUnauthorized: false }
}
```

## 📋 Checklist de déploiement

### Avant le déploiement
- [ ] Build local fonctionne (`npm run build`)
- [ ] Variables d'environnement configurées
- [ ] Base de données créée et testée
- [ ] API adaptée pour la production
- [ ] Tests de l'application complète

### Après le déploiement
- [ ] Site accessible via l'URL
- [ ] Formulaire de profil fonctionne
- [ ] Base de données connectée
- [ ] API Bible fonctionne
- [ ] Toutes les fonctionnalités testées

## 🌐 URLs de test

### Vercel
- **Production** : `https://votre-projet.vercel.app`
- **Preview** : `https://votre-projet-git-branch.vercel.app`

### PlanetScale
- **Dashboard** : `https://app.planetscale.com`
- **Connection** : Via chaîne de connexion

## 🚨 Points d'attention

### Sécurité
- Ne jamais commiter les clés API
- Utiliser les variables d'environnement
- Activer HTTPS (automatique sur Vercel)

### Performance
- Optimiser les images
- Utiliser le CDN de Vercel
- Minimiser les requêtes API

### Monitoring
- Activer les logs Vercel
- Surveiller les erreurs
- Tester régulièrement

## 📞 Support

### Vercel
- Documentation : [vercel.com/docs](https://vercel.com/docs)
- Support : Via dashboard

### PlanetScale
- Documentation : [planetscale.com/docs](https://planetscale.com/docs)
- Support : Via dashboard

## 🎉 Résultat attendu

Votre site sera accessible à l'adresse :
`https://votre-projet.vercel.app`

Avec toutes les fonctionnalités :
- ✅ Profils utilisateur
- ✅ Base de données MySQL
- ✅ API Bible
- ✅ Interface responsive
- ✅ HTTPS automatique
