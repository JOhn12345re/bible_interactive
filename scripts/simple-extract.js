// Script simplifié pour extraire les données bibliques françaises
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemin vers les fichiers bibliques
const biblesPath = 'C:\\Users\\sheno\\OneDrive\\Bureau\\site  Biblique\\bibles_json_6.0\\FR-French';

console.log('🚀 Début de l\'extraction des Bibles françaises...');

// Vérifier si le dossier existe
if (!fs.existsSync(biblesPath)) {
  console.error('❌ Dossier des Bibles françaises non trouvé:', biblesPath);
  process.exit(1);
}

// Lister les fichiers disponibles
const files = fs.readdirSync(biblesPath);
console.log('📁 Fichiers trouvés:', files);

// Traiter le fichier Louis Segond 1910
const segondFile = path.join(biblesPath, 'segond_1910.json');
if (fs.existsSync(segondFile)) {
  console.log('📖 Traitement de segond_1910.json...');
  
  try {
    const data = fs.readFileSync(segondFile, 'utf8');
    const bibleData = JSON.parse(data);
    
    console.log('✅ Fichier lu avec succès');
    console.log('📊 Structure:', Object.keys(bibleData));
    
    if (bibleData.books) {
      console.log('📚 Nombre de livres:', bibleData.books.length);
      
      // Afficher les premiers livres
      bibleData.books.slice(0, 5).forEach((book, index) => {
        console.log(`   ${index + 1}. ${book.name} (${book.chapters ? book.chapters.length : 0} chapitres)`);
      });
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du traitement:', error.message);
  }
} else {
  console.log('❌ Fichier segond_1910.json non trouvé');
}

console.log('✅ Extraction terminée');
