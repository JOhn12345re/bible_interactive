#!/usr/bin/env node

/**
 * Script de monitoring de sécurité pour Bible Interactive
 */

const fs = require('fs');
const path = require('path');

console.log('📊 MONITORING DE SÉCURITÉ - BIBLE INTERACTIVE\n');

// Vérifier les logs d'erreur
function checkErrorLogs() {
  const logFiles = [
    '/var/log/apache2/error.log',
    '/var/log/nginx/error.log',
    'logs/error.log'
  ];
  
  console.log('🔍 Vérification des logs d\'erreur...');
  
  logFiles.forEach(logFile => {
    if (fs.existsSync(logFile)) {
      const stats = fs.statSync(logFile);
      const sizeKB = Math.round(stats.size / 1024);
      console.log(`📄 ${logFile}: ${sizeKB} KB`);
      
      if (sizeKB > 1024) { // Plus de 1MB
        console.log(`⚠️  Log volumineux détecté: ${logFile}`);
      }
    }
  });
}

// Vérifier les permissions des fichiers
function checkFilePermissions() {
  console.log('\n🔐 Vérification des permissions...');
  
  const sensitiveFiles = [
    '.env',
    'api/profile.php',
    'database/setup.sql'
  ];
  
  sensitiveFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const stats = fs.statSync(file);
      const mode = stats.mode.toString(8);
      console.log(`📄 ${file}: ${mode}`);
      
      // Vérifier que le fichier .env n'est pas lisible par tous
      if (file === '.env' && mode.includes('4')) {
        console.log(`⚠️  Fichier .env accessible en lecture par tous`);
      }
    }
  });
}

// Vérifier les dépendances
function checkDependencies() {
  console.log('\n📦 Vérification des dépendances...');
  
  if (fs.existsSync('package-lock.json')) {
    const packageLock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));
    const depCount = Object.keys(packageLock.dependencies || {}).length;
    console.log(`📊 ${depCount} dépendances installées`);
  }
}

// Exécuter le monitoring
function runMonitoring() {
  checkErrorLogs();
  checkFilePermissions();
  checkDependencies();
  
  console.log('\n✅ Monitoring de sécurité terminé !');
  console.log('\n💡 Recommandations:');
  console.log('- Vérifiez régulièrement les logs d\'erreur');
  console.log('- Mettez à jour les dépendances mensuellement');
  console.log('- Surveillez les tentatives d\'accès suspectes');
}

runMonitoring();
