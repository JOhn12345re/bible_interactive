// Service pour la Bible Louis Segond 1910 uniquement
export interface FrenchBible {
  id: string;
  name: string;
  year: string;
  description: string;
}

// Données de la Bible Louis Segond 1910 uniquement
export const frenchBibles: FrenchBible[] = [
  {
    id: 'segond_1910',
    name: 'Louis Segond 1910',
    year: '1910',
    description: 'Traduction classique et respectée de la Bible'
  }
];

// Données bibliques Louis Segond 1910
export const segond1910Data = {
  "Genèse": {
    "1": {
      "1": "Au commencement, Dieu créa les cieux et la terre.",
      "2": "La terre était informe et vide ; il y avait des ténèbres à la surface de l'abîme, et l'Esprit de Dieu se mouvait au-dessus des eaux.",
      "3": "Dieu dit : Que la lumière soit ! Et la lumière fut.",
      "4": "Dieu vit que la lumière était bonne ; et Dieu sépara la lumière d'avec les ténèbres.",
      "5": "Dieu appela la lumière jour, et il appela les ténèbres nuit. Ainsi, il y eut un soir, et il y eut un matin : ce fut le premier jour."
    },
    "3": {
      "1": "Or le serpent était le plus rusé de tous les animaux des champs que l'Éternel Dieu avait faits. Il dit à la femme : Dieu a-t-il réellement dit : Vous ne mangerez pas de tous les arbres du jardin ?",
      "6": "La femme vit que l'arbre était bon à manger, agréable à regarder, et que l'arbre était précieux pour ouvrir l'intelligence. Elle prit de son fruit, et en mangea ; elle en donna aussi à son mari, qui était avec elle, et il en mangea."
    }
  },
  "Exode": {
    "3": {
      "1": "Moïse faisait paître le troupeau de Jéthro, son beau-père, sacrificateur de Madian ; et il mena le troupeau derrière le désert, et vint à la montagne de Dieu, à Horeb.",
      "2": "L'ange de l'Éternel lui apparut dans une flamme de feu, au milieu d'un buisson. Moïse regarda ; et voici, le buisson était tout en feu, et le buisson ne se consumait point."
    }
  },
  "Psaumes": {
    "23": {
      "1": "Cantique de David. L'Éternel est mon berger : je ne manquerai de rien.",
      "2": "Il me fait reposer dans de verts pâturages, Il me dirige près des eaux paisibles."
    }
  },
  "Matthieu": {
    "5": {
      "1": "Voyant la foule, Jésus monta sur la montagne ; et, après qu'il se fut assis, ses disciples s'approchèrent de lui.",
      "2": "Puis, ayant ouvert la bouche, il les enseigna, et dit :",
      "3": "Heureux les pauvres en esprit, car le royaume des cieux est à eux !"
    }
  },
  "Jean": {
    "3": {
      "16": "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle."
    }
  },
  "Luc": {
    "2": {
      "7": "et elle enfanta son fils premier-né. Elle l'emmaillota, et le coucha dans une crèche, parce qu'il n'y avait pas de place pour eux dans l'hôtellerie.",
      "10": "Mais l'ange leur dit : Ne craignez point ; car je vous annonce une bonne nouvelle, qui sera pour tout le peuple le sujet d'une grande joie :"
    }
  }
};

class FrenchBibleService {
  private cache: Map<string, any> = new Map();

  constructor() {
    console.log('📖 Service Bible Louis Segond 1910 initialisé');
  }

  // Obtenir la liste des Bibles françaises disponibles
  getAvailableBibles(): FrenchBible[] {
    return frenchBibles;
  }

  // Obtenir un verset spécifique
  getVerse(book: string, chapter: number, verse: number): string | null {
    const cacheKey = `segond-${book}-${chapter}-${verse}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    let verseText: string | null = null;

    if (segond1910Data[book]) {
      const chapterData = segond1910Data[book][chapter.toString()];
      if (chapterData && chapterData[verse.toString()]) {
        verseText = chapterData[verse.toString()];
      }
    }

    if (verseText) {
      this.cache.set(cacheKey, verseText);
    }

    return verseText;
  }

  // Obtenir la liste des livres disponibles
  getBooks(): string[] {
    return Object.keys(segond1910Data);
  }

  // Obtenir les chapitres d'un livre
  getChapters(book: string): number[] {
    if (segond1910Data[book]) {
      return Object.keys(segond1910Data[book]).map(ch => parseInt(ch)).sort((a, b) => a - b);
    }
    return [];
  }

  // Obtenir les versets d'un chapitre
  getVerses(book: string, chapter: number): number[] {
    if (segond1910Data[book]) {
      const chapterData = segond1910Data[book][chapter.toString()];
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

    Object.keys(segond1910Data).forEach(book => {
      Object.keys(segond1910Data[book]).forEach(chapterStr => {
        const chapter = parseInt(chapterStr);
        Object.keys(segond1910Data[book][chapterStr]).forEach(verseStr => {
          const verse = parseInt(verseStr);
          const text = segond1910Data[book][chapterStr][verseStr];
          if (text.toLowerCase().includes(searchTerm)) {
            results.push({ book, chapter, verse, text });
          }
        });
      });
    });

    return results.slice(0, 20); // Limiter à 20 résultats
  }

  // Vider le cache
  clearCache(): void {
    this.cache.clear();
    console.log('🗑️ Cache Bible Louis Segond 1910 vidé');
  }
}

// Instance singleton
export const frenchBibleService = new FrenchBibleService();
