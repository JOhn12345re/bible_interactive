# 🔒 Guide de Sécurité - Bible Interactive

**Dernière mise à jour:** 2 décembre 2025  
**Version:** 2.0.4

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

### ✅ Protection de l'Éditeur Universel

- 🔐 **Mot de passe requis** pour accéder à l'éditeur
- ⏳ **Verrouillage automatique** après 5 tentatives échouées (15 min)
- 💾 **Session storage** - Déconnexion à la fermeture de l'onglet
- 🚫 **Sauvegarde désactivée** en production

### ✅ Sanitization du contenu

**Fichier:** `src/utils/security.ts`

- `sanitizeHtml()` - Nettoie le HTML contre XSS
- `escapeHtml()` - Échappe les caractères spéciaux
- `sanitizeUrl()` - Valide les URLs
- `sanitizeInput()` - Nettoie les entrées utilisateur
- `sanitizeFilename()` - Valide les noms de fichiers
- `containsDangerousContent()` - Détecte le contenu malveillant

### ✅ Protection DDoS & Rate Limiting

**Local Development (server.js):**
```javascript
// Rate limiting simple
- 100 requêtes par minute par IP
- Réinitialisation automatique chaque minute
- Réponse 429 (Too Many Requests) si dépassé
```

**Production (Recommandé - Cloudflare):**
```
1. Ajouter site à Cloudflare
2. Security → WAF → Rate Limiting Rules
3. Configuration: 200 req/min par IP
4. Action: Challenge ou Block pour 60 secondes
```

### ✅ Gestion des erreurs React

**ErrorBoundary Component:**
- Capture erreurs React sans crash complet
- UI de fallback conviviale
- Logs détaillés en développement
- Prêt pour intégration Sentry/LogRocket
- Boutons de récupération (Retry, Home)

**Utilisation:**
```tsx
<ErrorBoundary>
  <YourApp />
</ErrorBoundary>
```

### ✅ Sécurisation API Locale

**server.js - Protections:**
1. **Validation des chemins:**
   - Accepte uniquement `/content/*` paths
   - Bloque accès hors du dossier autorisé
   - Normalisation des chemins (prévention path traversal)

2. **Limitation de taille:**
   - Payload max: 10 MB (réduit de 50 MB)
   - Prévention attaques par gros fichiers

3. **CORS restrictif:**
   ```javascript
   // Development
   origin: ['http://localhost:3000-3004']
   
   // Production  
   origin: ['https://votredomaine.vercel.app']
   ```

### ✅ Dépendances sécurisées
- **Audit automatique** : Script de vérification des vulnérabilités
- **Mise à jour régulière** : npm audit pour détecter les failles

## 🛡️ Configuration de production

### 1. Variables d'environnement
```bash
# Copier le fichier exemple
cp env.example .env

# Éditer avec vos valeurs sécurisées
nano .env
```

### 2. Base de données
```sql
-- Créer un utilisateur dédié (pas root)
CREATE USER 'bible_app'@'localhost' IDENTIFIED BY 'mot_de_passe_tres_complexe';
GRANT SELECT, INSERT, UPDATE ON bible_interactive.* TO 'bible_app'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Serveur web (Apache/Nginx)
```apache
# .htaccess pour Apache
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>

# Limiter l'accès aux fichiers sensibles
<Files ".env">
    Order allow,deny
    Deny from all
</Files>
```

### 4. HTTPS obligatoire
```bash
# Certificat SSL (Let's Encrypt)
sudo certbot --apache -d votre-domaine.com
```

## 🔍 Audit de sécurité

### Exécuter l'audit
```bash
# Audit des dépendances
npm audit

# Audit complet du projet
node scripts/security-audit.js
```

### Vérifications manuelles
- [ ] Aucun secret dans le code source
- [ ] HTTPS activé en production
- [ ] Firewall configuré
- [ ] Sauvegardes automatiques
- [ ] Logs de sécurité activés
- [ ] Mise à jour des dépendances

## 🚨 Réponse aux incidents

### En cas de compromission
1. **Isoler** le serveur compromis
2. **Analyser** les logs d'accès
3. **Changer** tous les mots de passe
4. **Mettre à jour** les certificats SSL
5. **Restaurer** depuis une sauvegarde propre
6. **Notifier** les utilisateurs si nécessaire

### Contacts d'urgence
- **Administrateur système** : [votre-email]
- **Hébergeur** : [support-hébergeur]
- **Certificat SSL** : [support-ssl]

## 📋 Checklist de déploiement sécurisé

### Avant la mise en production
- [ ] Variables d'environnement configurées
- [ ] Base de données sécurisée
- [ ] HTTPS activé
- [ ] Headers de sécurité configurés
- [ ] Rate limiting activé
- [ ] Logs de sécurité activés
- [ ] Sauvegardes configurées
- [ ] Firewall configuré
- [ ] Audit de sécurité passé
- [ ] Tests de pénétration effectués

### Après la mise en production
- [ ] Monitoring activé
- [ ] Alertes de sécurité configurées
- [ ] Plan de réponse aux incidents
- [ ] Documentation de sécurité
- [ ] Formation de l'équipe

## 🔄 Maintenance de sécurité

### Hebdomadaire
- Vérifier les logs de sécurité
- Mettre à jour les dépendances
- Vérifier les certificats SSL

### Mensuel
- Audit complet de sécurité
- Test de sauvegarde
- Révision des accès

### Trimestriel
- Test de pénétration
- Mise à jour des politiques
- Formation de l'équipe

---

**⚠️ IMPORTANT** : Ce guide doit être adapté à votre environnement spécifique. Consultez un expert en sécurité pour les déploiements critiques.
