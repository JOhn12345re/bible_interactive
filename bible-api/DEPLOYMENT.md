# 🚀 Guide de Déploiement - API Bible

## 📋 Prérequis

- Node.js 18+ installé
- npm ou yarn
- Compte Vercel (gratuit)
- Git configuré

## 🛠️ Déploiement Local

### 1. Installation
```bash
cd bible-api
npm install
```

### 2. Configuration
```bash
# Copier le fichier d'environnement
cp env.example .env

# Éditer les variables d'environnement
nano .env
```

### 3. Démarrage
```bash
# Mode développement
npm run dev

# Mode production
npm run build
npm start
```

### 4. Test
```bash
# Tester l'API
npm run test

# Tester manuellement
curl http://localhost:3002/health
```

## 🌐 Déploiement sur Vercel

### 1. Installation de Vercel CLI
```bash
npm install -g vercel
```

### 2. Connexion
```bash
vercel login
```

### 3. Déploiement
```bash
# Premier déploiement
vercel

# Déploiement en production
vercel --prod
```

### 4. Configuration des variables d'environnement
```bash
vercel env add NODE_ENV production
vercel env add PORT 3002
```

## 🔧 Configuration de Production

### Variables d'environnement requises
```env
NODE_ENV=production
PORT=3002
```

### Endpoints disponibles
- `GET /health` - Santé de l'API
- `GET /api/books` - Liste des livres
- `GET /api/topics` - Liste des thèmes
- `GET /api/verse-of-the-day` - Verset du jour
- `GET /api/topics/:slug` - Thème spécifique

## 📊 Monitoring

### Logs Vercel
```bash
vercel logs
```

### Métriques
- Accédez au dashboard Vercel
- Surveillez les performances
- Vérifiez les erreurs

## 🔄 Mise à jour

### Déploiement d'une nouvelle version
```bash
# Mettre à jour le code
git add .
git commit -m "Nouvelle version"
git push

# Redéployer
vercel --prod
```

## 🛡️ Sécurité

### Recommandations
- Utilisez HTTPS en production
- Configurez CORS correctement
- Limitez le rate limiting
- Surveillez les logs

### Headers de sécurité
L'API utilise déjà:
- Helmet.js pour les headers de sécurité
- CORS configuré
- Rate limiting activé

## 🆘 Dépannage

### Problèmes courants

#### Port déjà utilisé
```bash
# Tuer le processus
lsof -ti:3002 | xargs kill -9
```

#### Erreur de compilation
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

#### Erreur de déploiement Vercel
```bash
# Vérifier la configuration
vercel --debug
```

## 📞 Support

En cas de problème:
1. Vérifiez les logs: `vercel logs`
2. Testez localement: `npm run dev`
3. Consultez la documentation Vercel
4. Vérifiez les variables d'environnement

## 🎯 Prochaines étapes

- [ ] Ajouter la Bible complète Louis Segond 1910
- [ ] Implémenter la recherche avancée
- [ ] Ajouter l'authentification
- [ ] Créer une interface d'administration
- [ ] Ajouter des métriques avancées
