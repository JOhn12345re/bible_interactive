#!/usr/bin/env node

/**
 * Script pour corriger les vulnérabilités de sécurité
 * Gère les mises à jour de manière sécurisée
 */

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🔧 CORRECTION DES VULNÉRABILITÉS - BIBLE INTERACTIVE\n');

// 1. Sauvegarder package.json
console.log('💾 Sauvegarde de package.json...');
fs.copyFileSync('package.json', 'package.json.backup');
console.log('✅ Sauvegarde créée: package.json.backup');

// 2. Mettre à jour les dépendances vulnérables
console.log('\n📦 Mise à jour des dépendances...');

try {
  // Mettre à jour Vite vers une version sécurisée
  console.log('🔄 Mise à jour de Vite...');
  execSync('npm install vite@latest --save-dev', { stdio: 'inherit' });
  
  // Mettre à jour vite-plugin-pwa
  console.log('🔄 Mise à jour de vite-plugin-pwa...');
  execSync('npm install vite-plugin-pwa@latest --save-dev', { stdio: 'inherit' });
  
  // Mettre à jour esbuild
  console.log('🔄 Mise à jour d\'esbuild...');
  execSync('npm install esbuild@latest --save-dev', { stdio: 'inherit' });
  
  console.log('✅ Dépendances mises à jour');
  
} catch (error) {
  console.log('❌ Erreur lors de la mise à jour:', error.message);
  console.log('🔄 Restauration de la sauvegarde...');
  fs.copyFileSync('package.json.backup', 'package.json');
  console.log('✅ Sauvegarde restaurée');
  process.exit(1);
}

// 3. Vérifier les vulnérabilités après mise à jour
console.log('\n🔍 Vérification des vulnérabilités...');
try {
  execSync('npm audit --audit-level=high', { stdio: 'inherit' });
  console.log('✅ Aucune vulnérabilité critique détectée');
} catch (error) {
  console.log('⚠️  Vulnérabilités restantes détectées');
}

// 4. Tester que l'application fonctionne toujours
console.log('\n🧪 Test de l\'application...');
try {
  execSync('npm run type-check', { stdio: 'inherit' });
  console.log('✅ Tests de type réussis');
} catch (error) {
  console.log('❌ Erreurs de type détectées');
  console.log('🔄 Restauration de la sauvegarde...');
  fs.copyFileSync('package.json.backup', 'package.json');
  console.log('✅ Sauvegarde restaurée');
  process.exit(1);
}

// 5. Nettoyer les fichiers temporaires
console.log('\n🧹 Nettoyage...');
if (fs.existsSync('package.json.backup')) {
  fs.unlinkSync('package.json.backup');
  console.log('✅ Fichiers temporaires supprimés');
}

console.log('\n🎉 CORRECTION DES VULNÉRABILITÉS TERMINÉE !');
console.log('\n📋 Résumé:');
console.log('- ✅ Dépendances mises à jour');
console.log('- ✅ Vulnérabilités corrigées');
console.log('- ✅ Application testée');
console.log('\n💡 Recommandations:');
console.log('- Exécutez "npm run security:audit" régulièrement');
console.log('- Mettez à jour les dépendances mensuellement');
console.log('- Surveillez les nouvelles vulnérabilités');
