# 🔒 Guide de Sécurité - Bible Interactive

**Dernière mise à jour:** 2 décembre 2025  
**Version:** 2.1.0

## 🛡️ Score de Sécurité Estimé: A+

## 🚨 Mesures de sécurité implémentées

### ✅ Headers HTTP sécurisés (Netlify + Vercel + Local)

**Configurés dans:** `netlify.toml`, `vercel.json`, `public/_headers`

| Header | Valeur | Protection |
|--------|--------|------------|
| `Content-Security-Policy` | Restrictif | XSS, injection de code |
| `X-Content-Type-Options` | nosniff | MIME sniffing |
| `X-Frame-Options` | DENY | Clickjacking |
| `X-XSS-Protection` | 1; mode=block | XSS (navigateurs anciens) |
| `Strict-Transport-Security` | max-age=31536000; includeSubDomains; preload | Force HTTPS |
| `Referrer-Policy` | strict-origin-when-cross-origin | Fuite de données |
| `Permissions-Policy` | Désactive tout | Accès non autorisé |
| `X-Download-Options` | noopen | Téléchargements malveillants |
| `Cross-Origin-Opener-Policy` | same-origin | Attaques cross-origin |
| `Cross-Origin-Resource-Policy` | same-origin | Lecture cross-origin |

### ✅ Authentification sécurisée

**Fichiers:** `api/lib/db.ts`, `api/auth/login.ts`, `api/auth/register.ts`

| Fonctionnalité | Implémentation | Protection |
|----------------|----------------|------------|
| Hash de mots de passe | PBKDF2 avec 100,000 itérations + salt aléatoire | Attaques par dictionnaire |
| Tokens JWT | HMAC-SHA256 avec secret en variable d'environnement | Falsification de tokens |
| Rate limiting login | 5 tentatives max, verrouillage 15 min | Attaques brute-force |
| Rate limiting register | 3 inscriptions/heure par IP | Spam/abus |
| Validation mot de passe | Min 8 chars, majuscule, minuscule, chiffre | Mots de passe faibles |
| Timing-safe comparison | Comparaison à temps constant | Timing attacks |

### ✅ CORS sécurisé

**Configuration dans toutes les API:**

```javascript
// Seules les origines autorisées peuvent accéder à l'API
const ALLOWED_ORIGINS = [
  'https://bible-interactive.vercel.app',
  'https://bible-interactive.netlify.app',
  process.env.ALLOWED_ORIGIN
];

// En développement uniquement
if (process.env.NODE_ENV !== 'production') {
  ALLOWED_ORIGINS.push('http://localhost:3000', 'http://localhost:5173');
}
```

### ✅ Content Security Policy (CSP) détaillée

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com data:;
img-src 'self' data: https: blob:;
connect-src 'self' https://api.getbible.net https://*.netlify.app https://*.vercel.app https://katameros-api.onrender.com;
frame-ancestors 'none';
base-uri 'self';
form-action 'self'
```

### ✅ Sanitization du contenu

**Fichier:** `src/utils/security.ts`

- `sanitizeHtml()` - Nettoie le HTML contre XSS
- `escapeHtml()` - Échappe les caractères spéciaux
- `sanitizeUrl()` - Valide les URLs
- `sanitizeInput()` - Nettoie les entrées utilisateur
- `sanitizeFilename()` - Valide les noms de fichiers
- `containsDangerousContent()` - Détecte le contenu malveillant

### ✅ Validation des entrées API

**Implémenté dans:** `api/progress/save.ts`

```typescript
// Validation stricte des données de progression
function validateProgressData(data: any): boolean {
  if (data.xp !== undefined && (typeof data.xp !== 'number' || data.xp < 0 || data.xp > 10000000)) {
    return false;
  }
  // ... autres validations
}

// Sanitization des chaînes
function sanitizeString(str: string, maxLength: number = 255): string {
  return str.slice(0, maxLength).replace(/[<>'"]/g, '');
}
```

### ✅ Gestion des erreurs sécurisée

- **Pas de logs sensibles en production**: `console.log` conditionnel sur `NODE_ENV`
- **Messages d'erreur génériques**: Pas d'exposition de détails internes
- **ErrorBoundary React**: Capture les erreurs sans crash

### ✅ Protection de l'Éditeur Universel

- 🔐 **Mot de passe requis** pour accéder à l'éditeur
- ⏳ **Verrouillage automatique** après 5 tentatives échouées (15 min)
- 💾 **Session storage** - Déconnexion à la fermeture de l'onglet
- 🚫 **Sauvegarde désactivée** en production

## 🛡️ Configuration de production

### 1. Variables d'environnement OBLIGATOIRES

```bash
# Copier le fichier exemple
cp env.example .env

# Variables CRITIQUES à configurer:
JWT_SECRET=<clé-64-caractères-minimum>
ALLOWED_ORIGIN=https://votre-domaine.vercel.app
NODE_ENV=production
```

**Générer un JWT_SECRET sécurisé:**
```bash
openssl rand -base64 64
```

### 2. Configuration Vercel

Dans le dashboard Vercel → Settings → Environment Variables:

| Variable | Valeur |
|----------|--------|
| `JWT_SECRET` | Votre clé secrète de 64+ caractères |
| `ALLOWED_ORIGIN` | `https://votre-domaine.vercel.app` |
| `NODE_ENV` | `production` |

### 3. Base de données

```sql
-- Créer un utilisateur dédié (pas root)
CREATE USER 'bible_app'@'localhost' IDENTIFIED BY 'mot_de_passe_tres_complexe';
GRANT SELECT, INSERT, UPDATE ON bible_interactive.* TO 'bible_app'@'localhost';
FLUSH PRIVILEGES;
```

### 4. HTTPS obligatoire

Le HSTS est configuré avec preload. Pour les serveurs personnalisés:
```bash
sudo certbot --apache -d votre-domaine.com
```

## 🔍 Audit de sécurité

### Vérifications automatiques
```bash
# Audit des dépendances
npm audit

# Vérification des vulnérabilités critiques
npm audit --audit-level=critical
```

### Checklist de sécurité

- [x] JWT_SECRET configuré et secret
- [x] CORS limité aux origines autorisées
- [x] Rate limiting activé sur l'authentification
- [x] Mots de passe hashés avec PBKDF2 + salt
- [x] Validation stricte des entrées
- [x] Headers de sécurité HTTP configurés
- [x] Pas de logs sensibles en production
- [x] HTTPS forcé via HSTS

## 🚨 Réponse aux incidents

### En cas de compromission
1. **Isoler** le serveur compromis
2. **Révoquer** tous les tokens JWT (changer JWT_SECRET)
3. **Analyser** les logs d'accès
4. **Changer** tous les mots de passe
5. **Mettre à jour** les certificats SSL
6. **Restaurer** depuis une sauvegarde propre
7. **Notifier** les utilisateurs si nécessaire

## 📋 Historique des améliorations de sécurité

### Version 2.1.0 (Décembre 2025)
- ✅ Implémentation PBKDF2 avec 100,000 itérations pour les mots de passe
- ✅ JWT signé avec HMAC-SHA256 (au lieu de signature faible)
- ✅ Rate limiting sur login (5 tentatives) et register (3/heure)
- ✅ CORS restrictif (plus de wildcard `*`)
- ✅ Validation renforcée des mots de passe (8+ chars, majuscule, minuscule, chiffre)
- ✅ Comparaison timing-safe pour éviter les timing attacks
- ✅ Suppression des logs sensibles en production
- ✅ Suppression du fichier de test API exposé
- ✅ Validation et sanitization de toutes les entrées API

---

**⚠️ IMPORTANT** : Ce guide doit être adapté à votre environnement spécifique. Consultez un expert en sécurité pour les déploiements critiques.
