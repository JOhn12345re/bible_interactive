# 🔒 Guide de Sécurité - Bible Interactive

**Dernière mise à jour:** 10 novembre 2025  
**Version:** 2.0.0

## 🚨 Mesures de sécurité implémentées

### ✅ Headers HTTP sécurisés (Vercel + Local)

**Production (vercel.json):**
- ✅ `Content-Security-Policy` - Protection contre XSS et injection de code
- ✅ `X-Content-Type-Options: nosniff` - Prévention MIME sniffing
- ✅ `X-Frame-Options: DENY` - Protection clickjacking
- ✅ `X-XSS-Protection: 1; mode=block` - Protection XSS navigateur
- ✅ `Strict-Transport-Security` - Force HTTPS (max-age=1 an)
- ✅ `Referrer-Policy: strict-origin-when-cross-origin` - Contrôle referrers
- ✅ `Permissions-Policy` - Désactivation APIs sensibles (camera, microphone, etc.)

**Local (server.js):**
- ✅ Headers identiques pour cohérence dev/prod
- ✅ CORS restreint aux origines localhost en dev
- ✅ CORS restreint au domaine Vercel en production

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
