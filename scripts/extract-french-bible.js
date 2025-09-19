// Script pour extraire et intégrer les données bibliques françaises
const fs = require('fs');
const path = require('path');

// Chemin vers les fichiers bibliques
const biblesPath = 'C:\\Users\\sheno\\OneDrive\\Bureau\\site  Biblique\\bibles_json_6.0\\FR-French';

// Fonction pour lire un fichier JSON de Bible
function readBibleFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Erreur lors de la lecture de ${filePath}:`, error.message);
    return null;
  }
}

// Fonction pour extraire les données d'une Bible
function extractBibleData(bibleData, bibleName) {
  const extractedData = {};
  
  if (bibleData && bibleData.books) {
    bibleData.books.forEach(book => {
      if (book.name && book.chapters) {
        extractedData[book.name] = {};
        
        book.chapters.forEach(chapter => {
          if (chapter.chapter && chapter.verses) {
            extractedData[book.name][chapter.chapter.toString()] = {};
            
            chapter.verses.forEach(verse => {
              if (verse.verse && verse.text) {
                extractedData[book.name][chapter.chapter.toString()][verse.verse.toString()] = verse.text;
              }
            });
          }
        });
      }
    });
  }
  
  return extractedData;
}

// Fonction pour créer le fichier de service TypeScript
function createServiceFile(biblesData) {
  const serviceContent = `// Service pour les Bibles françaises - Généré automatiquement
export interface FrenchBible {
  id: string;
  name: string;
  year: string;
  description: string;
  books: BibleBook[];
}

export interface BibleBook {
  id: string;
  name: string;
  chapters: BibleChapter[];
}

export interface BibleChapter {
  id: string;
  verses: BibleVerse[];
}

export interface BibleVerse {
  id: string;
  text: string;
}

// Données des Bibles françaises disponibles
export const frenchBibles: FrenchBible[] = [
  {
    id: 'segond_1910',
    name: 'Louis Segond 1910',
    year: '1910',
    description: 'Traduction classique et respectée de la Bible',
    books: []
  },
  {
    id: 'martin',
    name: 'Martin 1744',
    year: '1744',
    description: 'Traduction française historique',
    books: []
  },
  {
    id: 'oster',
    name: 'Ostervald 1996',
    year: '1996',
    description: 'Traduction révisée et modernisée',
    books: []
  },
  {
    id: 'epee',
    name: 'La Bible de l\\'Épée 2005',
    year: '2005',
    description: 'Traduction contemporaine et accessible',
    books: []
  }
];

// Données bibliques étendues en français
export const frenchBibleData = {
${Object.keys(biblesData).map(bibleId => {
  const bible = biblesData[bibleId];
  return `  "${bibleId}": ${JSON.stringify(bible, null, 2)}`;
}).join(',\n')}
};

class FrenchBibleService {
  private currentBible: string = 'segond_1910';
  private cache: Map<string, any> = new Map();

  constructor() {
    console.log('📖 Service Bible Française initialisé');
  }

  // Obtenir la liste des Bibles françaises disponibles
  getAvailableBibles(): FrenchBible[] {
    return frenchBibles;
  }
  // Changer de traduction
  setBible(bibleId: string): void {
    if (frenchBibles.find(b => b.id === bibleId)) {
      this.currentBible = bibleId;
      this.cache.clear();
      console.log(`📚 Traduction changée vers: ${bibleId}`);
    }
  }

  // Obtenir la traduction actuelle
  getCurrentBible(): string {
    return this.currentBible;
  }

  // Obtenir un verset spécifique
  getVerse(book: string, chapter: number, verse: number): string | null {
    const cacheKey = `${this.currentBible}-${book}-${chapter}-${verse}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    let verseText: string | null = null;

    if (frenchBibleData[this.currentBible] && frenchBibleData[this.currentBible][book]) {
      const chapterData = frenchBibleData[this.currentBible][book][chapter.toString()];
      if (chapterData && chapterData[verse.toString()]) {
        verseText = chapterData[verse.toString()];
      }
    }

    if (verseText) {
      this.cache.set(cacheKey, verseText);
    }

    return verseText;
  }

  // Obtenir un chapitre complet
  getChapter(book: string, chapter: number): { [verse: number]: string } | null {
    const cacheKey = `${this.currentBible}-${book}-${chapter}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    let chapterData: { [verse: number]: string } | null = null;

    if (frenchBibleData[this.currentBible] && frenchBibleData[this.currentBible][book]) {
      const rawChapter = frenchBibleData[this.currentBible][book][chapter.toString()];
      if (rawChapter) {
        chapterData = {};
        Object.keys(rawChapter).forEach(verseNum => {
          chapterData![parseInt(verseNum)] = rawChapter[verseNum];
        });
      }
    }

    if (chapterData) {
      this.cache.set(cacheKey, chapterData);
    }

    return chapterData;
  }

  // Obtenir la liste des livres disponibles
  getBooks(): string[] {
    if (frenchBibleData[this.currentBible]) {
      return Object.keys(frenchBibleData[this.currentBible]);
    }
    return [];
  }

  // Obtenir les chapitres d'un livre
  getChapters(book: string): number[] {
    if (frenchBibleData[this.currentBible] && frenchBibleData[this.currentBible][book]) {
      return Object.keys(frenchBibleData[this.currentBible][book]).map(ch => parseInt(ch)).sort((a, b) => a - b);
    }
    return [];
  }

  // Obtenir les versets d'un chapitre
  getVerses(book: string, chapter: number): number[] {
    if (frenchBibleData[this.currentBible] && frenchBibleData[this.currentBible][book]) {
      const chapterData = frenchBibleData[this.currentBible][book][chapter.toString()];
      if (chapterData) {
        return Object.keys(chapterData).map(v => parseInt(v)).sort((a, b) => a - b);
      }
    }
    return [];
  }

  // Rechercher dans la Bible
  search(query: string): Array<{book: string, chapter: number, verse: number, text: string}> {
    const results: Array<{book: string, chapter: number, verse: number, text: string}> = [];
    const searchTerm = query.toLowerCase();

    if (frenchBibleData[this.currentBible]) {
      Object.keys(frenchBibleData[this.currentBible]).forEach(book => {
        Object.keys(frenchBibleData[this.currentBible][book]).forEach(chapterStr => {
          const chapter = parseInt(chapterStr);
          Object.keys(frenchBibleData[this.currentBible][book][chapterStr]).forEach(verseStr => {
            const verse = parseInt(verseStr);
            const text = frenchBibleData[this.currentBible][book][chapterStr][verseStr];
            if (text.toLowerCase().includes(searchTerm)) {
              results.push({ book, chapter, verse, text });
            }
          });
        });
      });
    }

    return results.slice(0, 50); // Limiter à 50 résultats
  }

  // Vider le cache
  clearCache(): void {
    this.cache.clear();
    console.log('🗑️ Cache Bible Française vidé');
  }
}

// Instance singleton
export const frenchBibleService = new FrenchBibleService();
`;

  return serviceContent;
}

// Fonction principale
function main() {
  console.log('🚀 Début de l\'extraction des Bibles françaises...');
  
  const biblesData = {};
  
  // Fichiers à traiter
  const bibleFiles = [
    { file: 'segond_1910.json', id: 'segond_1910' },
    { file: 'martin.json', id: 'martin' },
    { file: 'oster.json', id: 'oster' },
    { file: 'epee.json', id: 'epee' }
  ];
  
  bibleFiles.forEach(({ file, id }) => {
    const filePath = path.join(biblesPath, file);
    console.log(`📖 Traitement de ${file}...`);
    
    const bibleData = readBibleFile(filePath);
    if (bibleData) {
      const extractedData = extractBibleData(bibleData, id);
      biblesData[id] = extractedData;
      console.log(`✅ ${file} traité avec succès`);
    } else {
      console.log(`❌ Échec du traitement de ${file}`);
    }
  });
  
  // Créer le fichier de service
  console.log('📝 Création du fichier de service...');
  const serviceContent = createServiceFile(biblesData);
  
  // Écrire le fichier
  const outputPath = path.join(__dirname, '..', 'src', 'services', 'frenchBibleService.ts');
  fs.writeFileSync(outputPath, serviceContent, 'utf8');
  
  console.log('✅ Fichier de service créé avec succès !');
  console.log(`📊 Bibles traitées: ${Object.keys(biblesData).length}`);
  
  // Statistiques
  Object.keys(biblesData).forEach(bibleId => {
    const books = Object.keys(biblesData[bibleId]).length;
    console.log(`   - ${bibleId}: ${books} livres`);
  });
}

// Exécuter le script
if (require.main === module) {
  main();
}

module.exports = { extractBibleData, createServiceFile };
