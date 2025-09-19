#!/usr/bin/env node

/**
 * Script d'audit de sécurité pour le projet Bible Interactive
 * Vérifie les vulnérabilités des dépendances et les bonnes pratiques
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🔒 AUDIT DE SÉCURITÉ - BIBLE INTERACTIVE\n');

// 1. Audit des dépendances npm
console.log('📦 Vérification des vulnérabilités des dépendances...');
try {
    execSync('npm audit --audit-level=moderate', { stdio: 'inherit' });
    console.log('✅ Audit des dépendances terminé\n');
} catch (error) {
    console.log('⚠️  Vulnérabilités détectées dans les dépendances\n');
}

// 2. Vérification des fichiers sensibles
console.log('🔍 Vérification des fichiers sensibles...');
const sensitiveFiles = [
    '.env',
    '.env.local',
    '.env.production',
    'api/profile.php',
    'database/setup.sql'
];

sensitiveFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} trouvé`);
        
        // Vérifier le contenu pour des secrets hardcodés
        const content = fs.readFileSync(file, 'utf8');
        const secrets = [
            /password\s*=\s*['"][^'"]+['"]/gi,
            /api[_-]?key\s*=\s*['"][^'"]+['"]/gi,
            /secret\s*=\s*['"][^'"]+['"]/gi,
            /token\s*=\s*['"][^'"]+['"]/gi
        ];
        
        secrets.forEach(pattern => {
            if (pattern.test(content)) {
                console.log(`⚠️  Secret potentiel détecté dans ${file}`);
            }
        });
    } else {
        console.log(`❌ ${file} manquant`);
    }
});

// 3. Vérification des headers de sécurité
console.log('\n🛡️  Vérification des headers de sécurité...');
const phpFiles = fs.readdirSync('api').filter(f => f.endsWith('.php'));
phpFiles.forEach(file => {
    const content = fs.readFileSync(`api/${file}`, 'utf8');
    const securityHeaders = [
        'X-Content-Type-Options',
        'X-Frame-Options',
        'X-XSS-Protection',
        'Referrer-Policy'
    ];
    
    securityHeaders.forEach(header => {
        if (!content.includes(header)) {
            console.log(`⚠️  Header de sécurité manquant: ${header} dans ${file}`);
        }
    });
});

// 4. Vérification CORS
console.log('\n🌐 Vérification de la configuration CORS...');
phpFiles.forEach(file => {
    const content = fs.readFileSync(`api/${file}`, 'utf8');
    if (content.includes('Access-Control-Allow-Origin: *')) {
        console.log(`⚠️  CORS trop permissif dans ${file} - utiliser des domaines spécifiques`);
    }
});

// 5. Recommandations
console.log('\n📋 RECOMMANDATIONS DE SÉCURITÉ:');
console.log('1. ✅ Utiliser le fichier api/profile_secure.php au lieu de profile.php');
console.log('2. ✅ Créer un fichier .env avec vos secrets (copier env.example)');
console.log('3. ✅ Changer le mot de passe MySQL par défaut');
console.log('4. ✅ Activer HTTPS en production');
console.log('5. ✅ Configurer un firewall pour limiter l\'accès à la base de données');
console.log('6. ✅ Mettre en place une authentification pour l\'API');
console.log('7. ✅ Ajouter des logs de sécurité');
console.log('8. ✅ Configurer des sauvegardes automatiques de la base de données');
console.log('9. ✅ Utiliser un CDN avec protection DDoS');
console.log('10. ✅ Mettre à jour régulièrement les dépendances');

console.log('\n🔒 Audit de sécurité terminé !');
