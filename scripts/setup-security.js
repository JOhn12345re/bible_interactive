#!/usr/bin/env node

/**
 * Script de configuration de sécurité pour Bible Interactive
 * Configure automatiquement les variables d'environnement et la sécurité
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

console.log('🔒 CONFIGURATION DE SÉCURITÉ - BIBLE INTERACTIVE\n');

// 1. Générer des secrets sécurisés
function generateSecret(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

const secrets = {
  jwt: generateSecret(32),
  session: generateSecret(32),
  dbPass: 'BibleApp2024!SecurePass'
};

// 2. Créer le fichier .env
const envContent = `# Configuration de la base de données
DB_HOST=localhost
DB_NAME=bible_interactive
DB_USER=bible_app_user
DB_PASS=${secrets.dbPass}

# API Bible
VITE_BIBLE_API_KEY=
VITE_BIBLE_DEFAULT_VERSION=LSG
VITE_BIBLE_LANGUAGE=fr

# Configuration de production
NODE_ENV=development
VITE_APP_URL=http://localhost:3000

# Sécurité
JWT_SECRET=${secrets.jwt}
SESSION_SECRET=${secrets.session}

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
`;

// 3. Écrire le fichier .env
fs.writeFileSync('.env', envContent);
console.log('✅ Fichier .env créé avec des secrets sécurisés');

// 4. Créer le script SQL pour l'utilisateur de base de données
const sqlContent = `-- Script de création d'utilisateur sécurisé pour Bible Interactive
-- Exécuter ce script dans MySQL en tant qu'administrateur

-- Créer l'utilisateur dédié
CREATE USER IF NOT EXISTS 'bible_app_user'@'localhost' IDENTIFIED BY '${secrets.dbPass}';

-- Accorder les permissions minimales nécessaires
GRANT SELECT, INSERT, UPDATE ON bible_interactive.* TO 'bible_app_user'@'localhost';

-- Appliquer les changements
FLUSH PRIVILEGES;

-- Vérifier les permissions
SHOW GRANTS FOR 'bible_app_user'@'localhost';
`;

fs.writeFileSync('database/setup_secure_user.sql', sqlContent);
console.log('✅ Script SQL sécurisé créé dans database/setup_secure_user.sql');

// 5. Créer le fichier .htaccess pour Apache
const htaccessContent = `# Configuration de sécurité Apache pour Bible Interactive

# Headers de sécurité
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'"
</IfModule>

# Protéger les fichiers sensibles
<Files ".env">
    Order allow,deny
    Deny from all
</Files>

<Files "*.sql">
    Order allow,deny
    Deny from all
</Files>

<Files "*.log">
    Order allow,deny
    Deny from all
</Files>

# Désactiver l'affichage des erreurs PHP en production
<IfModule mod_php.c>
    php_flag display_errors Off
    php_flag log_errors On
    php_value error_log /var/log/php_errors.log
</IfModule>

# Limiter les méthodes HTTP
<LimitExcept GET POST PUT OPTIONS>
    Order allow,deny
    Deny from all
</LimitExcept>

# Protection contre les attaques de force brute
<IfModule mod_evasive.c>
    DOSHashTableSize    2048
    DOSPageCount        20
    DOSSiteCount        50
    DOSPageInterval     1
    DOSSiteInterval     1
    DOSBlockingPeriod   600
</IfModule>
`;

fs.writeFileSync('.htaccess', htaccessContent);
console.log('✅ Fichier .htaccess créé avec les headers de sécurité');

// 6. Créer un script de test de sécurité
const testScript = `#!/usr/bin/env node

/**
 * Script de test de sécurité pour Bible Interactive
 */

const https = require('https');
const http = require('http');

console.log('🔍 TEST DE SÉCURITÉ - BIBLE INTERACTIVE\\n');

// Test 1: Vérifier les headers de sécurité
function testSecurityHeaders(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      const headers = res.headers;
      const securityHeaders = [
        'x-content-type-options',
        'x-frame-options',
        'x-xss-protection',
        'referrer-policy'
      ];
      
      console.log('📋 Headers de sécurité:');
      securityHeaders.forEach(header => {
        if (headers[header]) {
          console.log(\`✅ \${header}: \${headers[header]}\`);
        } else {
          console.log(\`❌ \${header}: manquant\`);
        }
      });
      
      resolve();
    }).on('error', (err) => {
      console.log(\`❌ Erreur de connexion: \${err.message}\`);
      resolve();
    });
  });
}

// Test 2: Vérifier la configuration CORS
function testCORS(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    
    const options = {
      method: 'OPTIONS',
      headers: {
        'Origin': 'http://localhost:3000',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    };
    
    const req = client.request(url, options, (res) => {
      const corsHeader = res.headers['access-control-allow-origin'];
      
      if (corsHeader === 'http://localhost:3000') {
        console.log('✅ CORS configuré correctement');
      } else if (corsHeader === '*') {
        console.log('⚠️  CORS trop permissif (utilise *)');
      } else {
        console.log(\`❌ CORS mal configuré: \${corsHeader}\`);
      }
      
      resolve();
    });
    
    req.on('error', (err) => {
      console.log(\`❌ Erreur CORS: \${err.message}\`);
      resolve();
    });
    
    req.end();
  });
}

// Exécuter les tests
async function runTests() {
  const apiUrl = 'http://localhost/api/profile.php';
  
  console.log('🧪 Test des headers de sécurité...');
  await testSecurityHeaders(apiUrl);
  
  console.log('\\n🌐 Test de la configuration CORS...');
  await testCORS(apiUrl);
  
  console.log('\\n✅ Tests de sécurité terminés !');
}

runTests();
`;

fs.writeFileSync('scripts/test-security.js', testScript);
console.log('✅ Script de test de sécurité créé');

// 7. Créer un script de monitoring
const monitoringScript = `#!/usr/bin/env node

/**
 * Script de monitoring de sécurité pour Bible Interactive
 */

const fs = require('fs');
const path = require('path');

console.log('📊 MONITORING DE SÉCURITÉ - BIBLE INTERACTIVE\\n');

// Vérifier les logs d'erreur
function checkErrorLogs() {
  const logFiles = [
    '/var/log/apache2/error.log',
    '/var/log/nginx/error.log',
    'logs/error.log'
  ];
  
  console.log('🔍 Vérification des logs d\\'erreur...');
  
  logFiles.forEach(logFile => {
    if (fs.existsSync(logFile)) {
      const stats = fs.statSync(logFile);
      const sizeKB = Math.round(stats.size / 1024);
      console.log(\`📄 \${logFile}: \${sizeKB} KB\`);
      
      if (sizeKB > 1024) { // Plus de 1MB
        console.log(\`⚠️  Log volumineux détecté: \${logFile}\`);
      }
    }
  });
}

// Vérifier les permissions des fichiers
function checkFilePermissions() {
  console.log('\\n🔐 Vérification des permissions...');
  
  const sensitiveFiles = [
    '.env',
    'api/profile.php',
    'database/setup.sql'
  ];
  
  sensitiveFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const stats = fs.statSync(file);
      const mode = stats.mode.toString(8);
      console.log(\`📄 \${file}: \${mode}\`);
      
      // Vérifier que le fichier .env n'est pas lisible par tous
      if (file === '.env' && mode.includes('4')) {
        console.log(\`⚠️  Fichier .env accessible en lecture par tous\`);
      }
    }
  });
}

// Vérifier les dépendances
function checkDependencies() {
  console.log('\\n📦 Vérification des dépendances...');
  
  if (fs.existsSync('package-lock.json')) {
    const packageLock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));
    const depCount = Object.keys(packageLock.dependencies || {}).length;
    console.log(\`📊 \${depCount} dépendances installées\`);
  }
}

// Exécuter le monitoring
function runMonitoring() {
  checkErrorLogs();
  checkFilePermissions();
  checkDependencies();
  
  console.log('\\n✅ Monitoring de sécurité terminé !');
  console.log('\\n💡 Recommandations:');
  console.log('- Vérifiez régulièrement les logs d\\'erreur');
  console.log('- Mettez à jour les dépendances mensuellement');
  console.log('- Surveillez les tentatives d\\'accès suspectes');
}

runMonitoring();
`;

fs.writeFileSync('scripts/monitor-security.js', monitoringScript);
console.log('✅ Script de monitoring créé');

// 8. Mettre à jour package.json avec les nouveaux scripts
const packageJsonPath = 'package.json';
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

packageJson.scripts = {
  ...packageJson.scripts,
  'security:setup': 'node scripts/setup-security.js',
  'security:test': 'node scripts/test-security.js',
  'security:monitor': 'node scripts/monitor-security.js',
  'security:full': 'npm run security:audit && npm run security:check && npm run security:test'
};

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('✅ Scripts de sécurité ajoutés à package.json');

console.log('\n🎉 CONFIGURATION DE SÉCURITÉ TERMINÉE !');
console.log('\n📋 Prochaines étapes:');
console.log('1. Exécuter le script SQL: database/setup_secure_user.sql');
console.log('2. Tester la sécurité: npm run security:test');
console.log('3. Monitorer régulièrement: npm run security:monitor');
console.log('4. Audit complet: npm run security:full');
