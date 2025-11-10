# 🚀 Quick Start Guide - Bible Interactive

## 📋 Commandes essentielles

### Installation initiale
```bash
# Cloner le projet
git clone https://github.com/JOhn12345re/bible_interactive.git
cd bible_interactive

# Installer les dépendances
npm install

# Créer fichier d'environnement local
cp .env.example .env.local
```

### Développement local
```bash
# Option 1: Frontend seul (port 3000)
npm run dev

# Option 2: Frontend + API serveur (ports 3000 + 3002)
npm run dev:full

# Option 3: API seule (port 3002)
npm run api
```

### Build & Preview
```bash
# Build pour production
npm run build

# Prévisualiser le build localement
npm run preview

# Analyser la taille du bundle
npm run build:analyze
```

### Qualité du code
```bash
# Linter (fix automatique)
npm run lint

# Linter (check seulement)
npm run lint:check

# Formatter Prettier
npm run format

# TypeScript check
npm run type-check
```

### Sécurité
```bash
# Audit vulnérabilités
npm run security:audit

# Fix automatiques
npm run security:update

# npm audit simple
npm audit
```

### Déploiement Vercel

#### Via Interface Web
1. Allez sur [vercel.com](https://vercel.com)
2. Import Project → GitHub → bible_interactive
3. Deploy

#### Via CLI
```bash
# Installer Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy preview
vercel

# Deploy production
vercel --prod

# Forcer rebuild sans cache
vercel --prod --force
```

---

## 🔧 Configuration rapide

### Variables d'environnement locales (.env.local)
```bash
NODE_ENV=development
VITE_API_URL=http://localhost:3002
VITE_DEBUG=true
```

### Variables Vercel Dashboard
```
NODE_ENV=production
VITE_API_URL=https://votre-api.vercel.app
```

---

## 🐛 Troubleshooting rapide

### Erreur "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreur React useState undefined
```bash
# Déjà corrigé dans vite.config.ts avec resolve.dedupe
npm run build
```

### Erreur 401 sur Vercel
1. Settings → Deployment Protection
2. Disable protection
3. Redeploy

### Cache Vercel obsolète
```bash
vercel --prod --force
```

### Port 3000 déjà utilisé
```bash
# Vite détecte automatiquement et utilise 3001, 3002, etc.
npm run dev
# Ou spécifier un port:
PORT=3005 npm run dev
```

---

## 📂 Structure du projet

```
bible_interactive/
├── public/               # Assets statiques
│   ├── content/         # JSON leçons/histoires
│   ├── bibles_json_6.0/ # Bible Louis Segond
│   └── sermons/         # Vidéos HLS
├── src/
│   ├── components/      # Composants réutilisables
│   ├── pages/           # Pages routes
│   ├── services/        # API services
│   ├── state/           # Zustand stores
│   ├── hooks/           # Custom hooks
│   └── styles/          # CSS global
├── server.js            # API locale (dev only)
├── vite.config.ts       # Config build
├── vercel.json          # Config déploiement
└── package.json         # Dépendances
```

---

## 🎯 Workflows communs

### Ajouter une nouvelle leçon
1. Créer JSON dans `public/content/pentateuque/ma_lecon.json`
2. Suivre format existant (adam_eve_01.json)
3. Ajouter dans `src/components/Menu.tsx`
4. Commit et push

### Modifier contenu existant
1. **Via éditeur:** `/universal-editor` (localhost seulement)
2. **Manuellement:** Éditer JSON dans `public/content/`
3. Commit et push → Vercel redéploie

### Ajouter un nouveau jeu
1. Créer composant dans `src/pages/MonJeu.tsx`
2. Lazy load dans `src/App.tsx`:
   ```tsx
   const MonJeu = lazy(() => import('./pages/MonJeu'));
   ```
3. Ajouter route:
   ```tsx
   <Route path="/games/mon-jeu" element={<MonJeu />} />
   ```
4. Ajouter dans `src/pages/GamesPage.tsx`

### Mettre à jour la Bible
1. Remplacer fichiers dans `public/bibles_json_6.0/`
2. Format: `[Livre]_[Chapitre].json`
3. Commit et push

---

## ✅ Checklist avant commit

- [ ] `npm run lint:check` passe
- [ ] `npm run type-check` passe
- [ ] `npm run build` réussit
- [ ] Pas de `console.log` oubliés
- [ ] Messages de commit clairs

---

## 📚 Documentation complète

- **Déploiement:** Voir [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Sécurité:** Voir [SECURITY.md](./SECURITY.md)
- **Optimisations:** Voir [OPTIMIZATION_REPORT.md](./OPTIMIZATION_REPORT.md)
- **README:** Voir [README.md](./README.md)

---

## 🆘 Support

**Issues GitHub:** https://github.com/JOhn12345re/bible_interactive/issues
**Email:** support@example.com

---

**Bon développement ! 🎉**
