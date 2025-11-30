# 📦 Guide de Déploiement & Optimisation - Bible Interactive

## 🚀 Déploiement sur Vercel

### Prérequis
- Compte Vercel connecté à GitHub
- Variables d'environnement configurées
- Build local testé et fonctionnel

### Processus de déploiement

#### Option 1: Interface Vercel (Recommandé)
1. Connectez-vous sur [vercel.com](https://vercel.com)
2. Cliquez sur "Import Project"
3. Sélectionnez le repository GitHub `bible_interactive`
4. Vercel détecte automatiquement Vite
5. Configurez les variables d'environnement (si nécessaire)
6. Cliquez sur "Deploy"

#### Option 2: CLI Vercel
```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer en production
vercel --prod
```

### Variables d'environnement

**Locales (.env.local - NON COMMITÉ)**
```.env
NODE_ENV=development
VITE_API_URL=http://localhost:3002
```

**Production (Vercel Dashboard)**
```
NODE_ENV=production
VITE_API_URL=https://votre-api.vercel.app
```

## 🔒 Sécurité

### Headers HTTP implémentés
✅ `Content-Security-Policy` - Protection XSS
✅ `X-Frame-Options: DENY` - Protection clickjacking
✅ `X-Content-Type-Options: nosniff` - Protection MIME sniffing
✅ `Strict-Transport-Security` - Force HTTPS
✅ `Referrer-Policy` - Contrôle des referrers
✅ `Permissions-Policy` - Désactivation API sensibles

### Protection DDoS & Rate Limiting

**Local (server.js)**
- Rate limit: 100 requêtes/minute par IP
- Implémentation simple avec Map

**Production (Vercel + Cloudflare)**
- Utiliser Cloudflare pour rate limiting avancé
- Configuration dans le dashboard Cloudflare:
  1. Security → WAF → Rate Limiting Rules
  2. Créer règle: Max 200 req/min par IP
  3. Action: Block pour 1 minute

### CORS Configuration
```javascript
// server.js - Production
cors({
  origin: ['https://votredomaine.vercel.app'],
  credentials: true
})
```

## ⚡ Optimisations Performances

### React Optimizations

#### 1. Lazy Loading (✅ Implémenté)
Tous les composants lourds utilisent `React.lazy()`:
```tsx
const CompleteTimeline = lazy(() => import('./components/CompleteTimeline'));
const BibleExplorer = lazy(() => import('./pages/BibleExplorer'));
```

#### 2. Code Splitting (✅ Configuré)
`vite.config.ts` - manualChunks:
- `react-vendor` - React + React-DOM
- `router` - React Router
- `phaser-core` - Phaser game engine
- `media` - HLS.js video player

#### 3. React.memo & useMemo (À implémenter)
**Composants à optimiser:**
- `SermonSection.tsx` - Liste de sermons
- `BibleExplorer.tsx` - Navigation Bible
- `CompleteTimeline.tsx` - Timeline complète

**Exemple d'implémentation:**
```tsx
import React, { memo, useMemo, useCallback } from 'react';

const SermonSection = memo(() => {
  // Mémoiser les calculs coûteux
  const filtered = useMemo(() => {
    return catalog.items.filter(item => 
      item.category === category && 
      item.title.includes(query)
    );
  }, [catalog, category, query]);

  // Mémoiser les callbacks
  const handleClick = useCallback((id) => {
    setActive(items.find(i => i.id === id));
  }, [items]);

  return (/* JSX */);
});

export default SermonSection;
```

### Assets Optimization

#### Images
- ✅ Loading lazy sur images sermon (`loading="lazy"`)
- ⏳ TODO: Convertir en WebP pour -30% taille
- ⏳ TODO: Responsive images avec srcset

```tsx
<img 
  src="/images/sermon.jpg"
  srcSet="/images/sermon-400.webp 400w,
          /images/sermon-800.webp 800w"
  sizes="(max-width: 600px) 400px, 800px"
  loading="lazy"
  decoding="async"
  alt="Sermon title"
/>
```

#### Fonts
- ✅ OpenDyslexic chargé via @fontsource
- Optimisation: preload fonts critiques

```html
<!-- index.html -->
<link rel="preload" href="/fonts/opendyslexic.woff2" as="font" type="font/woff2" crossorigin>
```

### PWA & Cache

#### Service Worker (✅ Configuré)
- Stratégie CacheFirst pour Bible JSON
- NetworkFirst pour API
- Précache assets critiques (54 fichiers)

#### Cache Headers (✅ Implémenté)
```
Bible JSON: public, max-age=86400 (24h)
Images: public, max-age=604800 (7 jours)
Videos HLS: public, max-age=3600 (1h)
```

## 📊 Monitoring & Logs

### Error Tracking

#### Error Boundary (✅ Implémenté)
- Capture erreurs React sans crash complet
- UI de fallback conviviale
- Logs en développement

#### TODO: Intégration Sentry
```bash
npm install @sentry/react @sentry/tracing
```

```tsx
// src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

### Logging Structuré

**Development:**
```javascript
console.log('[BibleAPI]', 'Fetching verse:', book, chapter);
```

**Production:**
```javascript
// TODO: Utiliser service comme LogRocket ou Datadog
window.logger?.info('verse_fetch', { book, chapter, timestamp: Date.now() });
```

## 🔄 CI/CD Process

### GitHub Actions (À configurer)

**`.github/workflows/deploy.yml`**
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
          vercel-args: '--prod'
```

### Rollback Procedure

**Via Vercel Dashboard:**
1. Deployments → Historique
2. Trouver le déploiement stable précédent
3. Cliquer "⋮" → "Promote to Production"

**Via CLI:**
```bash
# Lister déploiements
vercel ls

# Promouvoir un déploiement spécifique
vercel promote [deployment-url]
```

## 📈 Performance Benchmarks

### Objectifs
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.5s
- **Cumulative Layout Shift:** < 0.1
- **Total Bundle Size:** < 500KB (gzipped)

### Outils de mesure
```bash
# Lighthouse
npm install -g lighthouse
lighthouse https://votresite.vercel.app --view

# Bundle Analyzer
npm run build:analyze
```

### Résultats actuels (à mesurer)
- Bundle principal: ~108 KB
- Phaser chunk: ~323 KB (gzipped)
- Total précache PWA: ~3.8 MB

## 🛠️ Commandes Utiles

```bash
# Développement
npm run dev              # Frontend seul
npm run api              # API seule
npm run dev:full         # Frontend + API

# Production
npm run build            # Build pour production
npm run preview          # Prévisualiser build local

# Qualité du code
npm run lint             # Linter ESLint
npm run lint:check       # Check sans fix
npm run format           # Prettier format
npm run type-check       # TypeScript check

# Sécurité
npm run security:audit   # Audit vulnérabilités
npm run security:update  # Fix automatiques
npm audit                # npm audit

# Déploiement
vercel                   # Deploy preview
vercel --prod            # Deploy production
```

## 📋 Checklist Pré-Déploiement

### Code Quality
- [ ] `npm run lint:check` sans erreur
- [ ] `npm run type-check` passe
- [ ] `npm run build` réussit
- [ ] Pas de `console.log` en production
- [ ] Pas de TODO critiques non résolus

### Sécurité
- [ ] Headers de sécurité configurés
- [ ] CORS limité aux domaines autorisés
- [ ] Pas de secrets dans le code
- [ ] Variables d'environnement configurées
- [ ] Rate limiting activé

### Performance
- [ ] Lazy loading sur composants lourds
- [ ] Images optimisées (WebP, lazy)
- [ ] Bundle size < 500KB (gzipped)
- [ ] PWA service worker fonctionnel
- [ ] Cache headers correctement configurés

### Tests
- [ ] Test navigation principale
- [ ] Test jeux interactifs (1 de chaque)
- [ ] Test lecture Bible
- [ ] Test sur mobile
- [ ] Test accessibilité (contraste)

## 🐛 Troubleshooting

### Erreur 401 sur Vercel
**Cause:** Protection Vercel activée
**Solution:** Settings → Deployment Protection → Disable

### Erreur React useState undefined
**Cause:** Duplication de React dans le bundle
**Solution:** `resolve.dedupe: ['react', 'react-dom']` dans vite.config.ts (✅ Corrigé)

### Build timeout Vercel
**Cause:** Build trop long (>15min gratuit)
**Solution:** 
- Réduire taille bundle
- Optimiser imports
- Upgrade plan Vercel

### Cache Vercel obsolète
**Solution:**
```bash
# Forcer rebuild sans cache
vercel --prod --force
```

## 📚 Resources

- [Vite Documentation](https://vitejs.dev/)
- [Vercel Documentation](https://vercel.com/docs)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Web Vitals](https://web.dev/vitals/)
- [CSP Generator](https://report-uri.com/home/generate)

---

**Dernière mise à jour:** 10 novembre 2025
**Version:** 1.0.0
**Auteur:** Bible Interactive Team
