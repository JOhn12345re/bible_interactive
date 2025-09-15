// Service pour l'API Digital Bible Platform
// Documentation: https://4.dbt.io/open-api-4.json

interface BibleVersion {
  id: string;
  name: string;
  abbreviation: string;
  language: {
    code: string;
    name: string;
  };
  description?: string;
}

interface BibleFileset {
  id: string;
  type: string;
  size: string;
}

interface BibleVerse {
  book_id: string;
  chapter: number;
  verse_start: number;
  verse_end?: number;
  verse_text: string;
}

interface BibleText {
  data: BibleVerse[];
}

class BibleApiService {
  private baseUrl = 'https://4.dbt.io/api';
  private apiKey: string | null = null;
  private cache = new Map<string, any>();
  private defaultLanguage: string = 'fra';
  private defaultFilesetId: string = 'LSGF';
  private frenchToEnglishBookMap: Record<string, string> = {
    // Ancien Testament
    'genèse': 'Genesis', 'genese': 'Genesis', 'genesis': 'Genesis',
    'exode': 'Exodus', 'exodus': 'Exodus',
    'lévitique': 'Leviticus', 'levitique': 'Leviticus', 'leviticus': 'Leviticus',
    'nombres': 'Numbers', 'numbers': 'Numbers',
    'deutéronome': 'Deuteronomy', 'deuteronome': 'Deuteronomy', 'deuteronomy': 'Deuteronomy',
    'josué': 'Joshua', 'josue': 'Joshua', 'joshua': 'Joshua',
    'juges': 'Judges', 'judges': 'Judges',
    'ruth': 'Ruth',
    '1 samuel': '1 Samuel', '2 samuel': '2 Samuel',
    '1 rois': '1 Kings', '2 rois': '2 Kings', '1 rois.': '1 Kings', '2 rois.': '2 Kings',
    '1 chroniques': '1 Chronicles', '2 chroniques': '2 Chronicles',
    'esdras': 'Ezra', 'néhémie': 'Nehemiah', 'nehemie': 'Nehemiah',
    'esther': 'Esther', 'job': 'Job',
    'psaumes': 'Psalms', 'psaume': 'Psalms', 'psalms': 'Psalms',
    'proverbes': 'Proverbs', 'proverbs': 'Proverbs',
    'ecclésiaste': 'Ecclesiastes', 'ecclesiaste': 'Ecclesiastes', 'ecclesiastes': 'Ecclesiastes',
    'cantique des cantiques': 'Song of Solomon', 'cantique': 'Song of Solomon', 'cantiques': 'Song of Solomon',
    'esaïe': 'Isaiah', 'esaie': 'Isaiah', 'isaïe': 'Isaiah', 'isaie': 'Isaiah', 'isaiah': 'Isaiah',
    'jérémie': 'Jeremiah', 'jeremie': 'Jeremiah', 'jeremiah': 'Jeremiah',
    'lamentations': 'Lamentations',
    'ézéchiel': 'Ezekiel', 'ezechiel': 'Ezekiel', 'ezekiel': 'Ezekiel',
    'daniel': 'Daniel',
    'osée': 'Hosea', 'osee': 'Hosea', 'hosea': 'Hosea',
    'joël': 'Joel', 'joel': 'Joel',
    'amos': 'Amos', 'abdias': 'Obadiah', 'jonas': 'Jonah', 'jonah': 'Jonah',
    'michée': 'Micah', 'michee': 'Micah', 'micah': 'Micah',
    'nahum': 'Nahum', 'habacuc': 'Habakkuk', 'sophonie': 'Zephaniah',
    'aggée': 'Haggai', 'aggee': 'Haggai', 'haggai': 'Haggai',
    'zacharie': 'Zechariah', 'malachie': 'Malachi',
    // Nouveau Testament
    'matthieu': 'Matthew', 'matthew': 'Matthew',
    'marc': 'Mark', 'mark': 'Mark',
    'luc': 'Luke', 'luke': 'Luke',
    'jean': 'John', 'john': 'John',
    'actes': 'Acts', 'romains': 'Romans', '1 corinthiens': '1 Corinthians', '2 corinthiens': '2 Corinthians',
    'galates': 'Galatians', 'éphésiens': 'Ephesians', 'ephesiens': 'Ephesians',
    'philippiens': 'Philippians', 'colossiens': 'Colossians',
    '1 thessaloniciens': '1 Thessalonians', '2 thessaloniciens': '2 Thessalonians',
    '1 timothée': '1 Timothy', '1 timothee': '1 Timothy', '2 timothée': '2 Timothy', '2 timothee': '2 Timothy',
    'tite': 'Titus', 'philemon': 'Philemon', 'hébreux': 'Hebrews', 'hebreux': 'Hebrews',
    'jacques': 'James', '1 pierre': '1 Peter', '2 pierre': '2 Peter',
    '1 jean': '1 John', '2 jean': '2 John', '3 jean': '3 John',
    'jude': 'Jude', 'apocalypse': 'Revelation', 'révélation': 'Revelation'
  };

  constructor() {
    // En production, cette clé devrait venir d'une variable d'environnement
    // Pour le développement, nous utiliserons une version de démonstration
    this.apiKey = import.meta.env.VITE_BIBLE_API_KEY || null;
    this.defaultLanguage = import.meta.env.VITE_BIBLE_LANGUAGE || 'fra';
    // Par défaut, utiliser le fileset LSGF (Louis Segond 1910 - texte)
    // Vous pouvez surcharger avec VITE_BIBLE_DEFAULT_VERSION=LSGF
    this.defaultFilesetId = import.meta.env.VITE_BIBLE_DEFAULT_VERSION || 'LSGF';
  }

  private normalizeBookName(book: string): string {
    if (!book) return book;
    const key = book.trim().toLowerCase();
    // Essayer clé directe
    if (this.frenchToEnglishBookMap[key]) return this.frenchToEnglishBookMap[key];
    // Gérer préfixes numériques séparés (ex: "1 Jean", "2 Rois")
    const numericMatch = key.match(/^(\d)\s+(.+)$/);
    if (numericMatch) {
      const num = numericMatch[1];
      const rest = numericMatch[2];
      const mapped = this.frenchToEnglishBookMap[rest] || rest;
      // Capitaliser première lettre si besoin
      const capitalized = mapped.charAt(0).toUpperCase() + mapped.slice(1);
      return `${num} ${capitalized}`;
    }
    // Par défaut, capitaliser et renvoyer tel quel
    return book.charAt(0).toUpperCase() + book.slice(1);
  }

  private getHeaders() {
    if (!this.apiKey) {
      console.warn('Clé API Bible manquante. Utilisation de données locales de démonstration.');
      return undefined;
    }
    const headers: Record<string, string> = {
      'api-key': this.apiKey,
      'Content-Type': 'application/json',
    };
    return headers;
  }

  private async fetchWithCache<T>(url: string, cacheKey: string): Promise<T | null> {
    // Vérifier le cache d'abord
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    if (!this.apiKey) {
      // Retourner des données de démonstration si pas de clé API
      return this.getMockData(cacheKey);
    }

    try {
      const response = await fetch(url, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      
      // Mettre en cache pour 1 heure
      this.cache.set(cacheKey, data);
      setTimeout(() => this.cache.delete(cacheKey), 60 * 60 * 1000);

      return data;
    } catch (error) {
      console.error('Erreur lors de l\'appel API Bible:', error);
      return this.getMockData(cacheKey);
    }
  }

  private getMockData(cacheKey: string): any {
    // Données de démonstration pour le développement
    const mockData: Record<string, any> = {
      'bibles_french': {
        data: [
          {
            id: 'LSGF',
            name: 'Louis Segond 1910',
            abbreviation: 'LSG',
            language: { code: 'fra', name: 'Français' },
            description: 'Version française classique'
          }
        ]
      },
      'jonas_1_1-3': {
        data: [
          {
            book_id: 'JON',
            chapter: 1,
            verse_start: 1,
            verse_text: 'La parole de l\'Éternel fut adressée à Jonas, fils d\'Amitthaï, en ces mots:'
          },
          {
            book_id: 'JON',
            chapter: 1,
            verse_start: 2,
            verse_text: 'Lève-toi, va à Ninive, la grande ville, et crie contre elle! car sa méchanceté est montée jusqu\'à moi.'
          },
          {
            book_id: 'JON',
            chapter: 1,
            verse_start: 3,
            verse_text: 'Et Jonas se leva pour s\'enfuir à Tarsis, loin de la face de l\'Éternel. Il descendit à Japho, et il trouva un navire qui allait à Tarsis; il paya le prix du transport, et s\'embarqua pour aller avec les passagers à Tarsis, loin de la face de l\'Éternel.'
          }
        ]
      },
      'genesis_1_1-3': {
        data: [
          {
            book_id: 'GEN',
            chapter: 1,
            verse_start: 1,
            verse_text: 'Au commencement, Dieu créa les cieux et la terre.'
          },
          {
            book_id: 'GEN',
            chapter: 1,
            verse_start: 2,
            verse_text: 'La terre était informe et vide: il y avait des ténèbres à la surface de l\'abîme, et l\'esprit de Dieu se mouvait au-dessus des eaux.'
          },
          {
            book_id: 'GEN',
            chapter: 1,
            verse_start: 3,
            verse_text: 'Dieu dit: Que la lumière soit! Et la lumière fut.'
          }
        ]
      },
      'luke_2_8-14': {
        data: [
          {
            book_id: 'LUK',
            chapter: 2,
            verse_start: 8,
            verse_text: 'Il y avait, dans cette même contrée, des bergers qui passaient dans les champs les veilles de la nuit pour garder leurs troupeaux.'
          },
          {
            book_id: 'LUK',
            chapter: 2,
            verse_start: 9,
            verse_text: 'Et voici, un ange du Seigneur leur apparut, et la gloire du Seigneur resplendit autour d\'eux. Ils furent saisis d\'une grande frayeur.'
          },
          {
            book_id: 'LUK',
            chapter: 2,
            verse_start: 10,
            verse_text: 'Mais l\'ange leur dit: Ne craignez point; car je vous annonce une bonne nouvelle, qui sera pour tout le peuple le sujet d\'une grande joie:'
          },
          {
            book_id: 'LUK',
            chapter: 2,
            verse_start: 11,
            verse_text: 'c\'est qu\'aujourd\'hui, dans la ville de David, il vous est né un Sauveur, qui est le Christ, le Seigneur.'
          },
          {
            book_id: 'LUK',
            chapter: 2,
            verse_start: 12,
            verse_text: 'Et voici à quel signe vous le reconnaîtrez: vous trouverez un enfant emmailloté et couché dans une crèche.'
          },
          {
            book_id: 'LUK',
            chapter: 2,
            verse_start: 13,
            verse_text: 'Et soudain il se joignit à l\'ange une multitude de l\'armée céleste, louant Dieu et disant:'
          },
          {
            book_id: 'LUK',
            chapter: 2,
            verse_start: 14,
            verse_text: 'Gloire à Dieu dans les lieux très hauts, Et paix sur la terre aux hommes qu\'il agrée!'
          }
        ]
      }
    };

    return mockData[cacheKey] || null;
  }

  async getBibles(languageCode: string = this.defaultLanguage): Promise<BibleVersion[]> {
    const url = `${this.baseUrl}/bibles?language_code=${languageCode}`;
    const cacheKey = `bibles_${languageCode}`;
    
    const response = await this.fetchWithCache<{ data: BibleVersion[] }>(url, cacheKey);
    return response?.data || [];
  }

  async getFilesets(bibleId: string): Promise<BibleFileset[]> {
    const url = `${this.baseUrl}/bibles/${bibleId}/filesets`;
    const cacheKey = `filesets_${bibleId}`;
    
    const response = await this.fetchWithCache<{ data: BibleFileset[] }>(url, cacheKey);
    return response?.data || [];
  }

  async getVerses(
    filesetId: string,
    book: string,
    chapter: number,
    verseStart?: number,
    verseEnd?: number
  ): Promise<BibleVerse[]> {
    const normalizedBook = this.normalizeBookName(book);
    let url = `${this.baseUrl}/bibles/filesets/${filesetId}/${normalizedBook}/${chapter}`;
    let cacheKey = `${book.toLowerCase()}_${chapter}`;
    
    if (verseStart) {
      url += `?verse_start=${verseStart}`;
      cacheKey += `_${verseStart}`;
      
      if (verseEnd) {
        url += `&verse_end=${verseEnd}`;
        cacheKey += `-${verseEnd}`;
      }
    }

    const response = await this.fetchWithCache<BibleText>(url, cacheKey);
    return response?.data || [];
  }

  // Version pratique qui utilise le fileset par défaut (LSGF)
  async getVersesDefault(
    book: string,
    chapter: number,
    verseStart?: number,
    verseEnd?: number
  ): Promise<BibleVerse[]> {
    return this.getVerses(this.defaultFilesetId, book, chapter, verseStart, verseEnd);
  }

  // Méthodes utilitaires pour les leçons existantes
  async getJonasVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Jonas', 1, 1, 3);
  }

  async getCreationVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Genesis', 1, 1, 3);
  }

  async getNativityVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Luke', 2, 8, 14);
  }

  // Méthode pour obtenir un verset spécifique par référence
  async getVerseByReference(reference: string): Promise<BibleVerse | null> {
    const match = reference.match(/(\w+)\s+(\d+):(\d+)(?:-(\d+))?/);
    if (!match) return null;

    const [, rawBook, ch, vStart, vEnd] = match;
    const verses = await this.getVersesDefault(
      this.normalizeBookName(rawBook), 
      parseInt(ch), 
      parseInt(vStart), 
      vEnd ? parseInt(vEnd) : undefined
    );

    return verses[0] || null;
  }
}

// Instance singleton
export const bibleApi = new BibleApiService();
export type { BibleVersion, BibleVerse, BibleFileset };
