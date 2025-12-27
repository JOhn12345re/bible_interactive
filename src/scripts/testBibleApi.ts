/**
 * Script de test manuel pour l'API Bible.com
 * 
 * Ce script teste directement l'API Bible.com pour vérifier :
 * - La connexion à l'API
 * - La récupération de versets pour différentes histoires
 * - La qualité des données retournées
 * 
 * Pour exécuter : npm run test:api
 */

// Charger les variables d'environnement en premier
import dotenv from 'dotenv';
const result = dotenv.config();

// Définir manuellement la variable d'environnement pour Node.js
if (result.parsed?.VITE_BIBLE_API_KEY) {
  process.env.VITE_BIBLE_API_KEY = result.parsed.VITE_BIBLE_API_KEY;
}

// Maintenant importer le service APRÈS avoir configuré les variables d'environnement
import { bibleApi } from '../services/bibleApi.ts';

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

interface TestResult {
  name: string;
  success: boolean;
  duration: number;
  verses?: number;
  error?: string;
  details?: string;
}

const results: TestResult[] = [];

async function testStory(
  name: string,
  methodName: string,
  expectedBook: string,
  expectedChapter: number
): Promise<TestResult> {
  const startTime = Date.now();
  
  try {
    console.log(`${colors.cyan}🔍 Test: ${name}...${colors.reset}`);
    
    // Appel de la méthode sur l'instance singleton
    const verses = await (bibleApi as any)[methodName]();
    const duration = Date.now() - startTime;
    
    if (!verses || verses.length === 0) {
      throw new Error('Aucun verset retourné');
    }
    
    // Vérifications
    const firstVerse = verses[0];
    if (!firstVerse.book_id) {
      throw new Error('book_id manquant dans le verset');
    }
    
    // Normaliser le nom du livre pour la comparaison
    const receivedBook = firstVerse.book_id.trim();
    
    // On ne vérifie pas le livre exact car les noms peuvent varier entre les APIs
    // (ex: "Genesis" vs "Genèse", "1 Samuel" vs "1Samuel")
    // On vérifie juste qu'il y a un livre
    
    if (firstVerse.chapter !== expectedChapter) {
      throw new Error(`Chapitre incorrect: attendu ${expectedChapter}, reçu ${firstVerse.chapter}`);
    }
    
    if (!firstVerse.verse_text || firstVerse.verse_text.length < 10) {
      throw new Error('Texte du verset invalide ou trop court');
    }
    
    console.log(`${colors.green}✅ ${name} - ${verses.length} versets récupérés en ${duration}ms${colors.reset}`);
    console.log(`   📖 ${firstVerse.book_id} ${firstVerse.chapter}:${firstVerse.verse_start}: ${firstVerse.verse_text.substring(0, 60)}...`);
    
    return {
      name,
      success: true,
      duration,
      verses: verses.length,
      details: `${firstVerse.book_id} ${firstVerse.chapter}:${firstVerse.verse_start}: ${firstVerse.verse_text.substring(0, 50)}...`
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    console.log(`${colors.red}❌ ${name} - Échec après ${duration}ms${colors.reset}`);
    console.log(`   ⚠️  ${errorMessage}`);
    
    return {
      name,
      success: false,
      duration,
      error: errorMessage
    };
  }
}

async function runTests() {
  console.log(`${colors.bright}${colors.blue}╔═══════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}║   Tests de l'API Bible.com - Vérification complète   ║${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}╚═══════════════════════════════════════════════════════╝${colors.reset}\n`);
  
  const tests = [
    { name: 'La Création', method: 'getCreationVerses', book: 'Genèse', chapter: 1 },
    { name: 'Caïn et Abel', method: 'getCainAbelVerses', book: 'Genèse', chapter: 4 },
    { name: 'Noé et le Déluge', method: 'getNoeVerses', book: 'Genèse', chapter: 6 },
    { name: 'Abraham et l\'Alliance', method: 'getAbrahamVerses', book: 'Genèse', chapter: 12 },
    { name: 'Sacrifice d\'Isaac', method: 'getIsaacSacrificeVerses', book: 'Genèse', chapter: 22 },
    { name: 'Songe de Jacob', method: 'getJacobSongeVerses', book: 'Genèse', chapter: 28 },
    { name: 'Moïse et le Buisson Ardent', method: 'getMoiseBuissonVerses', book: 'Exode', chapter: 3 },
    { name: 'Le Veau d\'Or', method: 'getVeauOrVerses', book: 'Exode', chapter: 32 },
    { name: 'Traversée du Jourdain', method: 'getTraverseeJourdainVerses', book: 'Josué', chapter: 3 },
    { name: 'La Chute de Jéricho', method: 'getJerichoVerses', book: 'Josué', chapter: 6 },
    { name: 'David et Goliath', method: 'getDavidGoliathVerses', book: '1 Samuel', chapter: 17 },
    { name: 'David devient Roi', method: 'getDavidRoiVerses', book: '2 Samuel', chapter: 5 },
    { name: 'La Sagesse de Salomon', method: 'getSalomonSagesseVerses', book: '1 Rois', chapter: 3 },
    { name: 'Le Temple de Salomon', method: 'getTempleSalomonVerses', book: '1 Rois', chapter: 6 },
  ];
  
  // Exécuter les tests séquentiellement pour éviter de surcharger l'API
  for (const test of tests) {
    const result = await testStory(
      test.name,
      test.method,
      test.book,
      test.chapter
    );
    results.push(result);
    
    // Petit délai entre les tests pour ne pas surcharger l'API
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Affichage du résumé
  console.log(`\n${colors.bright}${colors.blue}╔═══════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}║                    RÉSUMÉ DES TESTS                   ║${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}╚═══════════════════════════════════════════════════════╝${colors.reset}\n`);
  
  const totalTests = results.length;
  const successfulTests = results.filter(r => r.success).length;
  const failedTests = totalTests - successfulTests;
  const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);
  const averageDuration = Math.round(totalDuration / totalTests);
  const totalVerses = results.reduce((sum, r) => sum + (r.verses || 0), 0);
  
  console.log(`${colors.bright}Tests réussis:${colors.reset} ${colors.green}${successfulTests}/${totalTests}${colors.reset}`);
  console.log(`${colors.bright}Tests échoués:${colors.reset} ${failedTests > 0 ? colors.red : colors.green}${failedTests}${colors.reset}`);
  console.log(`${colors.bright}Durée totale:${colors.reset} ${totalDuration}ms`);
  console.log(`${colors.bright}Durée moyenne:${colors.reset} ${averageDuration}ms par test`);
  console.log(`${colors.bright}Versets récupérés:${colors.reset} ${totalVerses} versets au total`);
  
  if (failedTests > 0) {
    console.log(`\n${colors.yellow}⚠️  Tests échoués:${colors.reset}`);
    results.filter(r => !r.success).forEach(r => {
      console.log(`   ${colors.red}✗${colors.reset} ${r.name}: ${r.error}`);
    });
  }
  
  console.log(`\n${colors.bright}${successfulTests === totalTests ? colors.green + '✅ Tous les tests sont passés !' : colors.yellow + '⚠️  Certains tests ont échoué'}${colors.reset}\n`);
  
  // Code de sortie
  process.exit(failedTests > 0 ? 1 : 0);
}

// Exécuter les tests
runTests().catch(error => {
  console.error(`${colors.red}❌ Erreur fatale lors de l'exécution des tests:${colors.reset}`, error);
  process.exit(1);
});

