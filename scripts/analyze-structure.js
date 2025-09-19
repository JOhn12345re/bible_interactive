// Script pour analyser la structure des fichiers bibliques
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const biblesPath = 'C:\\Users\\sheno\\OneDrive\\Bureau\\site  Biblique\\bibles_json_6.0\\FR-French';

console.log('🔍 Analyse de la structure des Bibles françaises...');

// Analyser le fichier Louis Segond 1910
const segondFile = path.join(biblesPath, 'segond_1910.json');

if (fs.existsSync(segondFile)) {
  try {
    const data = fs.readFileSync(segondFile, 'utf8');
    const bibleData = JSON.parse(data);
    
    console.log('\n📖 Structure de segond_1910.json:');
    console.log('Clés principales:', Object.keys(bibleData));
    
    if (bibleData.metadata) {
      console.log('\n📋 Métadonnées:');
      console.log(JSON.stringify(bibleData.metadata, null, 2));
    }
    
    if (bibleData.verses) {
      console.log('\n📚 Versets:');
      console.log('Type:', typeof bibleData.verses);
      console.log('Nombre d\'entrées:', Object.keys(bibleData.verses).length);
      
      // Afficher les premières clés
      const verseKeys = Object.keys(bibleData.verses).slice(0, 10);
      console.log('Premières clés:', verseKeys);
      
      // Afficher un exemple de verset
      if (verseKeys.length > 0) {
        const firstKey = verseKeys[0];
        console.log(`\nExemple de verset (${firstKey}):`);
        console.log(JSON.stringify(bibleData.verses[firstKey], null, 2));
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

console.log('\n✅ Analyse terminée');
