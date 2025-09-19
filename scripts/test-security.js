#!/usr/bin/env node

/**
 * Script de test de sécurité pour Bible Interactive
 */

import https from 'https';
import http from 'http';

console.log('🔍 TEST DE SÉCURITÉ - BIBLE INTERACTIVE\n');

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
          console.log(`✅ ${header}: ${headers[header]}`);
        } else {
          console.log(`❌ ${header}: manquant`);
        }
      });
      
      resolve();
    }).on('error', (err) => {
      console.log(`❌ Erreur de connexion: ${err.message}`);
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
        console.log(`❌ CORS mal configuré: ${corsHeader}`);
      }
      
      resolve();
    });
    
    req.on('error', (err) => {
      console.log(`❌ Erreur CORS: ${err.message}`);
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
  
  console.log('\n🌐 Test de la configuration CORS...');
  await testCORS(apiUrl);
  
  console.log('\n✅ Tests de sécurité terminés !');
}

runTests();
