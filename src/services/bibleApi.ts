import { getLocalVerse } from '../data/bibleVerses';

// Service pour la Bible Louis Segond
// Utilise l'API GetBible.net (gratuite, sans clé API)
// Fallback vers données minimales intégrées si l'API est indisponible

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

interface LocalBibleData {
  metadata: {
    name: string;
    shortname: string;
    module: string;
    year: string;
    description: string;
    lang_short: string;
  };
  verses: Array<{
    book_name: string;
    book: number;
    chapter: number;
    verse: number;
    text: string;
  }>;
}

// API GetBible.net interfaces
interface GetBibleVerse {
  verse: string;
  text: string;
  book_nr: number;
  book_name: string;
  chapter: number;
  name: string;
}

interface GetBibleResponse {
  book: string;
  chapter: number;
  verses: GetBibleVerse[];
}

class BibleApiService {
  private cache = new Map<string, any>();
  private bibleData: LocalBibleData | null = null;
  private defaultLanguage: string = 'fra';
  private defaultTranslation: string = 'lsg'; // Louis Segond pour GetBible API
  private apiBaseUrl: string = 'https://getbible.net/json'; // API gratuite GetBible.net
  private useExternalApi: boolean = true; // Utiliser l'API externe par défaut
  private frenchToEnglishBookMap: Record<string, string> = {
    // Ancien Testament
    genèse: 'Genesis',
    genese: 'Genesis',
    genesis: 'Genesis',
    exode: 'Exodus',
    exodus: 'Exodus',
    lévitique: 'Leviticus',
    levitique: 'Leviticus',
    leviticus: 'Leviticus',
    nombres: 'Numbers',
    numbers: 'Numbers',
    deutéronome: 'Deuteronomy',
    deuteronome: 'Deuteronomy',
    deuteronomy: 'Deuteronomy',
    josué: 'Joshua',
    josue: 'Joshua',
    joshua: 'Joshua',
    juges: 'Judges',
    judges: 'Judges',
    ruth: 'Ruth',
    '1 samuel': '1 Samuel',
    '2 samuel': '2 Samuel',
    '1 rois': '1 Kings',
    '2 rois': '2 Kings',
    '1 rois.': '1 Kings',
    '2 rois.': '2 Kings',
    '1 chroniques': '1 Chronicles',
    '2 chroniques': '2 Chronicles',
    esdras: 'Ezra',
    néhémie: 'Nehemiah',
    nehemie: 'Nehemiah',
    esther: 'Esther',
    job: 'Job',
    psaumes: 'Psalms',
    psaume: 'Psalms',
    psalms: 'Psalms',
    proverbes: 'Proverbs',
    proverbs: 'Proverbs',
    ecclésiaste: 'Ecclesiastes',
    ecclesiaste: 'Ecclesiastes',
    ecclesiastes: 'Ecclesiastes',
    'cantique des cantiques': 'Song of Solomon',
    cantique: 'Song of Solomon',
    cantiques: 'Song of Solomon',
    esaïe: 'Isaiah',
    esaie: 'Isaiah',
    isaïe: 'Isaiah',
    isaie: 'Isaiah',
    isaiah: 'Isaiah',
    jérémie: 'Jeremiah',
    jeremie: 'Jeremiah',
    jeremiah: 'Jeremiah',
    lamentations: 'Lamentations',
    ézéchiel: 'Ezekiel',
    ezechiel: 'Ezekiel',
    ezekiel: 'Ezekiel',
    daniel: 'Daniel',
    osée: 'Hosea',
    osee: 'Hosea',
    hosea: 'Hosea',
    joël: 'Joel',
    joel: 'Joel',
    amos: 'Amos',
    abdias: 'Obadiah',
    jonas: 'Jonah',
    jonah: 'Jonah',
    michée: 'Micah',
    michee: 'Micah',
    micah: 'Micah',
    nahum: 'Nahum',
    habacuc: 'Habakkuk',
    sophonie: 'Zephaniah',
    aggée: 'Haggai',
    aggee: 'Haggai',
    haggai: 'Haggai',
    zacharie: 'Zechariah',
    malachie: 'Malachi',
    // Nouveau Testament
    matthieu: 'Matthew',
    matthew: 'Matthew',
    marc: 'Mark',
    mark: 'Mark',
    luc: 'Luke',
    luke: 'Luke',
    jean: 'John',
    john: 'John',
    actes: 'Acts',
    romains: 'Romans',
    '1 corinthiens': '1 Corinthians',
    '2 corinthiens': '2 Corinthians',
    galates: 'Galatians',
    éphésiens: 'Ephesians',
    ephesiens: 'Ephesians',
    philippiens: 'Philippians',
    colossiens: 'Colossians',
    '1 thessaloniciens': '1 Thessalonians',
    '2 thessaloniciens': '2 Thessalonians',
    '1 timothée': '1 Timothy',
    '1 timothee': '1 Timothy',
    '2 timothée': '2 Timothy',
    '2 timothee': '2 Timothy',
    tite: 'Titus',
    philemon: 'Philemon',
    hébreux: 'Hebrews',
    hebreux: 'Hebrews',
    jacques: 'James',
    '1 pierre': '1 Peter',
    '2 pierre': '2 Peter',
    '1 jean': '1 John',
    '2 jean': '2 John',
    '3 jean': '3 John',
    jude: 'Jude',
    apocalypse: 'Revelation',
    révélation: 'Revelation',
  };

  constructor() {
    // Configuration pour l'API Bible externe (GetBible.net)
    this.defaultLanguage = import.meta.env.VITE_BIBLE_LANGUAGE || 'fra';
    this.defaultTranslation = 'lsg'; // Louis Segond pour GetBible.net

    console.log('✅ Service Bible initialisé - API externe GetBible.net');
    console.log('📖 Traduction: Louis Segond (LSG)');
    
    // Plus besoin de charger un fichier de 7.5 MB !
    // Les versets seront chargés à la demande via l'API
  }

  // Méthode désactivée - utilisation de l'API externe GetBible.net
  private async loadBibleData(): Promise<void> {
    console.log('⏭️  API externe activée - pas de chargement local nécessaire');
    this.bibleData = null; // Pas de données locales
  }

  // Méthode pour obtenir les traductions disponibles
  async getAvailableTranslations(): Promise<BibleVersion[]> {
    return this.getDefaultFrenchTranslations();
  }

  // Méthode pour vérifier si l'API est accessible
  private isApiAccessible(): boolean {
    return localStorage.getItem('bible_api_accessible') !== 'false';
  }

  // Méthode pour marquer l'API comme accessible ou non
  private setApiAccessible(accessible: boolean): void {
    localStorage.setItem('bible_api_accessible', accessible.toString());
  }

  // Méthode pour obtenir les traductions françaises par défaut
  private getDefaultFrenchTranslations(): BibleVersion[] {
    return [
      {
        id: 'lsg',
        name: 'Louis Segond',
        abbreviation: 'LSG',
        language: { code: 'fra', name: 'Français' },
        description: 'Traduction française classique - API GetBible.net',
      },
    ];
  }

  // Méthode pour obtenir les versets depuis les données locales
  async getVersesFromLocalData(
    book: string,
    chapter: number,
    startVerse?: number,
    endVerse?: number
  ): Promise<BibleVerse[]> {
    if (!this.bibleData) {
      console.warn(
        '📖 Données de la Bible non chargées, utilisation des données mockées'
      );
      return this.getVersesDefault(book, chapter, startVerse, endVerse);
    }

    const cacheKey = `local_${book.toLowerCase()}_${chapter}_${startVerse || 'all'}_${endVerse || 'all'}`;

    // Vérifier le cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // Normaliser le nom du livre
      const normalizedBook = this.normalizeBookName(book);

      console.log(
        `🔍 Recherche: livre="${book}", normalisé="${normalizedBook}", chapitre=${chapter}`
      );
      console.log(
        `📊 Total de versets dans les données: ${this.bibleData.verses.length}`
      );

      // Afficher quelques exemples de noms de livres pour debug
      const uniqueBooks = [
        ...new Set(this.bibleData.verses.map((v) => v.book_name)),
      ];
      console.log(`📚 Livres disponibles:`, uniqueBooks.slice(0, 10));

      // Filtrer les versets selon les critères
      const filteredVerses = this.bibleData.verses.filter((verse) => {
        const bookMatch =
          verse.book_name
            .toLowerCase()
            .includes(normalizedBook.toLowerCase()) ||
          verse.book_name.toLowerCase().includes(book.toLowerCase()) ||
          normalizedBook
            .toLowerCase()
            .includes(verse.book_name.toLowerCase()) ||
          book.toLowerCase().includes(verse.book_name.toLowerCase());
        const chapterMatch = verse.chapter === chapter;
        const verseMatch =
          !startVerse ||
          (verse.verse >= startVerse && (!endVerse || verse.verse <= endVerse));

        if (bookMatch && chapterMatch) {
          console.log(
            `✅ Verset trouvé: ${verse.book_name} ${verse.chapter}:${verse.verse}`
          );
        }

        return bookMatch && chapterMatch && verseMatch;
      });

      console.log(`📋 ${filteredVerses.length} versets trouvés après filtrage`);

      // Convertir vers notre format
      const verses: BibleVerse[] = filteredVerses.map((verse) => ({
        book_id: verse.book_name.toUpperCase(),
        chapter: verse.chapter,
        verse_start: verse.verse,
        verse_text: verse.text.replace(/^¶\s*/, '').trim(), // Nettoyer le texte
      }));

      // Mettre en cache
      this.cache.set(cacheKey, verses);

      console.log(
        `✅ ${verses.length} versets récupérés depuis les données locales: ${book} ${chapter}`
      );
      return verses;
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des versets locaux:',
        error
      );
      return this.getVersesDefault(book, chapter, startVerse, endVerse);
    }
  }

  // Méthode pour changer la traduction
  setTranslation(translationId: string): void {
    this.defaultTranslation = translationId;
    console.log(`📚 Traduction changée vers: ${translationId}`);
    // Vider le cache pour forcer le rechargement avec la nouvelle traduction
    this.cache.clear();
  }

  // Méthode pour réinitialiser le statut de l'API
  resetApiStatus(): void {
    this.setApiAccessible(true);
    this.cache.clear();
    console.log("🔄 Statut de l'API réinitialisé");
  }

  // Méthode pour obtenir la traduction actuelle
  getCurrentTranslation(): string {
    return this.defaultTranslation;
  }

  // Méthode de test automatique pour tous les versets populaires
  async testAllPopularVerses(): Promise<void> {
    console.log('🧪 === TEST AUTOMATIQUE DE TOUS LES VERSETS POPULAIRES ===');

    const testVerses = [
      'Genèse 1:1',
      'Exode 3:14',
      'Psaume 23:1',
      'Psaume 91:1',
      'Proverbes 3:5-6',
      'Ésaïe 40:31',
      'Jérémie 29:11',
      'Jonas 2:9',
      'Matthieu 5:3-4',
      'Matthieu 6:9-10',
      'Matthieu 28:19-20',
      'Marc 16:15',
      'Luc 2:11',
      'Jean 3:16',
      'Jean 14:6',
      'Actes 1:8',
      'Romains 8:28',
      'Romains 10:9-10',
      '1 Corinthiens 13:4-5',
      'Galates 5:22-23',
      'Éphésiens 2:8-9',
      'Philippiens 4:13',
      'Colossiens 3:23',
      '1 Thessaloniciens 5:16-18',
      '2 Timothée 3:16-17',
      'Hébreux 11:1',
      'Jacques 1:2-3',
      '1 Pierre 5:7',
      '1 Jean 4:8',
      'Apocalypse 21:4',
    ];

    let successCount = 0;
    let failCount = 0;
    const failedVerses: string[] = [];

    // Utiliser Promise.all avec un délai pour éviter de bloquer l'UI
    const testPromises = testVerses.map(async (verse, index) => {
      // Ajouter un petit délai entre les tests pour éviter de surcharger
      await new Promise((resolve) => setTimeout(resolve, index * 10));

      console.log(`\n🔍 Test de: ${verse}`);
      try {
        const result = await this.getVerseByReference(verse);
        if (result) {
          console.log(`✅ SUCCÈS: ${verse} trouvé`);
          return { success: true, verse };
        } else {
          console.log(`❌ ÉCHEC: ${verse} non trouvé`);
          return { success: false, verse, error: 'Non trouvé' };
        }
      } catch (error) {
        console.log(`❌ ERREUR: ${verse} - ${error}`);
        return { success: false, verse, error: String(error) };
      }
    });

    // Attendre tous les tests en parallèle
    const results = await Promise.all(testPromises);

    // Compter les résultats
    results.forEach((result) => {
      if (result.success) {
        successCount++;
      } else {
        failCount++;
        failedVerses.push(result.verse);
      }
    });

    console.log('\n📊 === RÉSULTATS DU TEST ===');
    console.log(`✅ Versets trouvés: ${successCount}`);
    console.log(`❌ Versets non trouvés: ${failCount}`);
    console.log(
      `📈 Taux de réussite: ${((successCount / testVerses.length) * 100).toFixed(1)}%`
    );

    if (failedVerses.length > 0) {
      console.log('\n❌ Versets qui ont échoué:');
      failedVerses.forEach((verse) => console.log(`   - ${verse}`));
    }

    console.log('\n🔍 === ANALYSE DES LIVRES DISPONIBLES ===');
    this.debugBibleData();
  }

  // Méthode de debug pour analyser les données
  debugBibleData(): void {
    if (!this.bibleData) {
      console.log('❌ Aucune donnée de Bible chargée');
      return;
    }

    console.log('🔍 Analyse des données de la Bible:');
    console.log(`📊 Total de versets: ${this.bibleData.verses.length}`);

    // Analyser les livres disponibles
    const books = [...new Set(this.bibleData.verses.map((v) => v.book_name))];
    console.log(`📚 Livres disponibles (${books.length}):`, books);

    // Chercher spécifiquement les psaumes
    const psalmBooks = books.filter(
      (book) =>
        book.toLowerCase().includes('psaume') ||
        book.toLowerCase().includes('psalm')
    );
    console.log(`🎵 Livres de psaumes trouvés:`, psalmBooks);

    // Rechercher spécifiquement Romains
    const romainsBooks = books.filter(
      (book) =>
        book.toLowerCase().includes('romain') ||
        book.toLowerCase().includes('roman')
    );
    console.log(`📖 Livres contenant "romain/roman":`, romainsBooks);

    // Chercher des versets de Romains 8
    const romains8Verses = this.bibleData.verses.filter(
      (v) =>
        (v.book_name.toLowerCase().includes('romain') ||
          v.book_name.toLowerCase().includes('roman')) &&
        v.chapter === 8
    );
    console.log(`📋 Versets de Romains 8 trouvés: ${romains8Verses.length}`);
    if (romains8Verses.length > 0) {
      console.log(
        '📖 Exemples de versets Romains 8:',
        romains8Verses.slice(0, 3)
      );
    }

    // Rechercher spécifiquement Jean
    const jeanBooks = books.filter(
      (book) =>
        book.toLowerCase().includes('jean') ||
        book.toLowerCase().includes('john')
    );
    console.log(`📖 Livres contenant "jean/john":`, jeanBooks);

    // Chercher des versets de Jean 3
    const jean3Verses = this.bibleData.verses.filter(
      (v) =>
        (v.book_name.toLowerCase().includes('jean') ||
          v.book_name.toLowerCase().includes('john')) &&
        v.chapter === 3
    );
    console.log(`📋 Versets de Jean 3 trouvés: ${jean3Verses.length}`);
    if (jean3Verses.length > 0) {
      console.log('📖 Exemples de versets Jean 3:', jean3Verses.slice(0, 3));
    }

    // Rechercher spécifiquement Matthieu
    const matthieuBooks = books.filter(
      (book) =>
        book.toLowerCase().includes('matthieu') ||
        book.toLowerCase().includes('matthew')
    );
    console.log(`📖 Livres contenant "matthieu/matthew":`, matthieuBooks);

    // Chercher des versets de Matthieu 28
    const matthieu28Verses = this.bibleData.verses.filter(
      (v) =>
        (v.book_name.toLowerCase().includes('matthieu') ||
          v.book_name.toLowerCase().includes('matthew')) &&
        v.chapter === 28
    );
    console.log(
      `📋 Versets de Matthieu 28 trouvés: ${matthieu28Verses.length}`
    );
    if (matthieu28Verses.length > 0) {
      console.log(
        '📖 Exemples de versets Matthieu 28:',
        matthieu28Verses.slice(0, 3)
      );
    }

    // Rechercher spécifiquement Jonas
    const jonasBooks = books.filter(
      (book) =>
        book.toLowerCase().includes('jonas') ||
        book.toLowerCase().includes('jonah')
    );
    console.log(`📖 Livres contenant "jonas/jonah":`, jonasBooks);

    // Chercher des versets de Jonas 2
    const jonas2Verses = this.bibleData.verses.filter(
      (v) =>
        (v.book_name.toLowerCase().includes('jonas') ||
          v.book_name.toLowerCase().includes('jonah')) &&
        v.chapter === 2
    );
    console.log(`📋 Versets de Jonas 2 trouvés: ${jonas2Verses.length}`);
    if (jonas2Verses.length > 0) {
      console.log('📖 Exemples de versets Jonas 2:', jonas2Verses.slice(0, 3));
    }

    // Rechercher spécifiquement Philippiens
    const philippiensBooks = books.filter(
      (book) =>
        book.toLowerCase().includes('philippiens') ||
        book.toLowerCase().includes('philippians')
    );
    console.log(
      `📖 Livres contenant "philippiens/philippians":`,
      philippiensBooks
    );

    // Chercher des versets de Philippiens 4
    const philippiens4Verses = this.bibleData.verses.filter(
      (v) =>
        (v.book_name.toLowerCase().includes('philippiens') ||
          v.book_name.toLowerCase().includes('philippians')) &&
        v.chapter === 4
    );
    console.log(
      `📋 Versets de Philippiens 4 trouvés: ${philippiens4Verses.length}`
    );
    if (philippiens4Verses.length > 0) {
      console.log(
        '📖 Exemples de versets Philippiens 4:',
        philippiens4Verses.slice(0, 3)
      );
    }

    // Analyser la structure d'un verset
    if (this.bibleData.verses.length > 0) {
      const sampleVerse = this.bibleData.verses[0];
      console.log('📖 Exemple de verset:', sampleVerse);
    }
  }

  // Méthode pour obtenir le psaume du jour
  async getPsalmOfTheDay(): Promise<BibleVerse[]> {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    // Calculer le psaume du jour (1-150, en boucle)
    const psalmNumber = (dayOfYear % 150) + 1;

    console.log(
      `📅 Psaume du jour (${today.toLocaleDateString('fr-FR')}): Psaume ${psalmNumber}`
    );

    // Essayer différents noms possibles pour les Psaumes
    const possibleNames = ['Psaumes', 'Psaume', 'Psalms', 'Psalm'];

    for (const name of possibleNames) {
      const verses = await this.getVersesFromLocalData(name, psalmNumber);
      if (verses.length > 0) {
        console.log(`✅ Psaume trouvé avec le nom: ${name}`);
        return verses;
      }
    }

    console.warn(`⚠️ Aucun psaume trouvé pour le numéro ${psalmNumber}`);
    return [];
  }

  // Méthode pour obtenir un psaume spécifique
  async getPsalm(psalmNumber: number): Promise<BibleVerse[]> {
    if (psalmNumber < 1 || psalmNumber > 150) {
      throw new Error('Le numéro du psaume doit être entre 1 et 150');
    }

    console.log(`📖 Récupération du Psaume ${psalmNumber}`);

    // Essayer différents noms possibles pour les Psaumes
    const possibleNames = ['Psaumes', 'Psaume', 'Psalms', 'Psalm'];

    for (const name of possibleNames) {
      const verses = await this.getVersesFromLocalData(name, psalmNumber);
      if (verses.length > 0) {
        console.log(`✅ Psaume ${psalmNumber} trouvé avec le nom: ${name}`);
        return verses;
      }
    }

    console.warn(`⚠️ Aucun psaume trouvé pour le numéro ${psalmNumber}`);
    return [];
  }

  // Méthode pour obtenir les psaumes de la semaine
  async getPsalmsOfTheWeek(): Promise<
    { day: string; psalm: number; verses: BibleVerse[] }[]
  > {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    const days = [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
    ];
    const psalms = [];

    for (let i = 0; i < 7; i++) {
      const psalmNumber = ((dayOfYear + i) % 150) + 1;
      const verses = await this.getVersesFromLocalData('Psaumes', psalmNumber);

      psalms.push({
        day: days[i],
        psalm: psalmNumber,
        verses: verses,
      });
    }

    return psalms;
  }

  private normalizeBookName(book: string): string {
    if (!book) return book;
    const key = book.trim().toLowerCase();
    // Essayer clé directe
    if (this.frenchToEnglishBookMap[key])
      return this.frenchToEnglishBookMap[key];
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
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    return headers;
  }

  private async fetchWithCache<T>(
    url: string,
    cacheKey: string
  ): Promise<T | null> {
    // Vérifier le cache d'abord
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Mode offline : utiliser directement les données mockées
    console.log(
      `📖 Mode offline - Utilisation des données mockées pour: ${cacheKey}`
    );
    const mockData = this.getMockData(cacheKey);

    if (mockData) {
      // Mettre en cache pour 1 heure
      this.cache.set(cacheKey, mockData);
      setTimeout(() => this.cache.delete(cacheKey), 60 * 60 * 1000);
      return mockData;
    }

    console.warn(`📖 Aucune donnée mockée trouvée pour: ${cacheKey}`);
    return null;
  }

  // Méthode pour générer automatiquement des versets de fallback pour tous les livres bibliques
  private generateFallbackVerse(
    bookName: string,
    chapter: number,
    verse: number
  ): any {
    // Dictionnaire des premiers versets de chaque livre biblique
    const fallbackVerses: Record<string, string> = {
      // Ancien Testament
      genese: 'Au commencement, Dieu créa les cieux et la terre.',
      exode:
        "Voici les noms des fils d'Israël, venus en Égypte avec Jacob et la famille de chacun d'eux:",
      levitique:
        "L'Éternel appela Moïse; de la tente d'assignation, il lui parla et dit:",
      nombres:
        "L'Éternel parla à Moïse dans le désert de Sinaï, dans la tente d'assignation, le premier jour du second mois, la seconde année après leur sortie du pays d'Égypte. Il dit:",
      deuteronome:
        "Voici les paroles que Moïse adressa à tout Israël, de l'autre côté du Jourdain, dans le désert, dans la plaine, vis-à-vis de Suph, entre Paran, Tophel, Laban, Hatséroth et Di-Zahab.",
      josue:
        "Après la mort de Moïse, serviteur de l'Éternel, l'Éternel dit à Josué, fils de Nun, serviteur de Moïse:",
      juges:
        "Après la mort de Josué, les enfants d'Israël consultèrent l'Éternel, en disant: Qui de nous montera le premier contre les Cananéens, pour les attaquer?",
      ruth: 'Du temps des juges, il y eut une famine dans le pays. Un homme de Bethléhem de Juda partit, avec sa femme et ses deux fils, pour faire un séjour dans le pays de Moab.',
      '1 samuel':
        "Il y avait un homme de Ramathaïm-Tsophim, de la montagne d'Éphraïm, nommé Elkana, fils de Jeroham, fils d'Élihu, fils de Thohu, fils de Tsuph, Éphratien.",
      '2 samuel':
        'Après la mort de Saül, David, de retour de sa victoire sur les Amalécites, demeura deux jours à Tsiklag.',
      '1 rois':
        'Le roi David était vieux, avancé en âge; on le couvrait de vêtements, et il ne pouvait se réchauffer.',
      '2 rois': "Moab se révolta contre Israël, après la mort d'Achab.",
      '1 chroniques': 'Adam, Seth, Énosch,',
      '2 chroniques':
        "Salomon, fils de David, s'affermit dans son royaume. L'Éternel, son Dieu, était avec lui, et l'éleva à un haut degré.",
      esdras:
        "La première année de Cyrus, roi de Perse, afin que s'accomplît la parole de l'Éternel prononcée par la bouche de Jérémie, l'Éternel réveilla l'esprit de Cyrus, roi de Perse, qui fit faire de vive voix et par écrit cette publication dans tout son royaume:",
      nehemie:
        "Paroles de Néhémie, fils de Hacalia. Au mois de Kisleu, la vingtième année, comme j'étais à Suse, dans la citadelle,",
      esther:
        "C'était du temps d'Assuérus, de cet Assuérus qui régnait depuis l'Inde jusqu'en Éthiopie sur cent vingt-sept provinces.",
      job: "Il y avait dans le pays d'Uts un homme qui s'appelait Job. Et cet homme était intègre et droit; il craignait Dieu, et se détournait du mal.",
      psaumes:
        "Heureux l'homme qui ne marche pas selon le conseil des méchants, Qui ne s'arrête pas sur la voie des pécheurs, Et qui ne s'assied pas en compagnie des moqueurs,",
      proverbes: "Proverbes de Salomon, fils de David, roi d'Israël,",
      ecclesiaste: "Paroles de l'Ecclésiaste, fils de David, roi de Jérusalem.",
      'cantique des cantiques': 'Le cantique des cantiques, de Salomon.',
      esaie:
        "Prophétie d'Esaïe, fils d'Amots, sur Juda et Jérusalem, au temps d'Ozias, de Jotham, d'Achaz, d'Ézéchias, rois de Juda.",
      jeremie:
        "Paroles de Jérémie, fils de Hilkija, l'un des sacrificateurs d'Anathoth, dans le pays de Benjamin.",
      lamentations:
        'Eh quoi! elle est assise solitaire, cette ville si peuplée! Elle est comme une veuve, celle qui était grande entre les nations!',
      ezechiel:
        "La trentième année, le cinquième jour du quatrième mois, comme j'étais parmi les captifs du fleuve du Kebar, les cieux s'ouvrirent, et j'eus des visions divines.",
      daniel:
        'La troisième année du règne de Jojakim, roi de Juda, Nebucadnetsar, roi de Babylone, vint assiéger Jérusalem.',
      osee: "La parole de l'Éternel qui fut adressée à Osée, fils de Beéri, au temps d'Ozias, de Jotham, d'Achaz, d'Ézéchias, rois de Juda, et au temps de Jéroboam, fils de Joas, roi d'Israël.",
      joel: "La parole de l'Éternel qui fut adressée à Joël, fils de Pethuel.",
      amos: "Paroles d'Amos, l'un des bergers de Tekoa, visions qu'il eut sur Israël, au temps d'Ozias, roi de Juda, et au temps de Jéroboam, fils de Joas, roi d'Israël, deux ans avant le tremblement de terre.",
      abdias:
        "Prophétie d'Abdias. Ainsi parle le Seigneur, l'Éternel, sur Édom: -Nous avons appris une nouvelle de la part de l'Éternel, Et un messager a été envoyé parmi les nations: Levez-vous, marchons contre Édom pour lui faire la guerre!",
      jonas:
        "La parole de l'Éternel fut adressée à Jonas, fils de Amitthaï, en ces mots:",
      michee:
        "La parole de l'Éternel qui fut adressée à Michée, de Moréscheth, au temps de Jotham, d'Achaz, d'Ézéchias, rois de Juda, prophétie sur Samarie et Jérusalem.",
      nahum: "Oracle sur Ninive. Livre de la prophétie de Nahum, d'Elkosch.",
      habacuc: 'Oracle révélé à Habacuc, le prophète.',
      sophonie:
        "La parole de l'Éternel qui fut adressée à Sophonie, fils de Cuschi, fils de Guedalia, fils d'Amaria, fils d'Ézéchias, au temps de Josias, fils d'Amon, roi de Juda.",
      aggee:
        "La seconde année du roi Darius, le premier jour du sixième mois, la parole de l'Éternel fut adressée par Aggée, le prophète, à Zorobabel, fils de Schealthiel, gouverneur de Juda, et à Josué, fils de Jotsadak, le souverain sacrificateur, en ces mots:",
      zacharie:
        "Le huitième mois, la seconde année de Darius, la parole de l'Éternel fut adressée à Zacharie, fils de Bérékia, fils d'Iddo, le prophète, en ces mots:",
      malachie: "Oracle, parole de l'Éternel à Israël par Malachie.",

      // Nouveau Testament
      matthieu: "Généalogie de Jésus-Christ, fils de David, fils d'Abraham.",
      marc: "Commencement de l'Évangile de Jésus-Christ, Fils de Dieu.",
      luc: 'Plusieurs ayant entrepris de composer un récit des événements qui se sont accomplis parmi nous,',
      jean: 'Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.',
      actes:
        "Théophile, j'ai parlé, dans mon premier livre, de tout ce que Jésus a commencé de faire et d'enseigner dès le commencement",
      romains:
        "Paul, serviteur de Jésus-Christ, appelé à être apôtre, mis à part pour annoncer l'Évangile de Dieu,",
      '1 corinthiens':
        'Paul, appelé à être apôtre de Jésus-Christ par la volonté de Dieu, et le frère Sosthène,',
      '2 corinthiens':
        "Paul, apôtre de Jésus-Christ par la volonté de Dieu, et le frère Timothée, à l'Église de Dieu qui est à Corinthe, et à tous les saints qui sont dans toute l'Achaïe:",
      galates:
        "Paul, apôtre, non de la part des hommes, ni par un homme, mais par Jésus-Christ et Dieu le Père, qui l'a ressuscité des morts,",
      éphésiens:
        'Paul, apôtre de Jésus-Christ par la volonté de Dieu, aux saints qui sont à Éphèse et aux fidèles en Jésus-Christ:',
      philippiens:
        'Paul et Timothée, serviteurs de Jésus-Christ, à tous les saints en Jésus-Christ qui sont à Philippes, aux évêques et aux diacres:',
      colossiens:
        'Paul, apôtre de Jésus-Christ par la volonté de Dieu, et le frère Timothée,',
      '1 thessaloniciens':
        "Paul, Silvain et Timothée, à l'Église des Thessaloniciens, qui est en Dieu le Père et en Jésus-Christ le Seigneur:",
      '2 thessaloniciens':
        "Paul, Silvain et Timothée, à l'Église des Thessaloniciens, qui est en Dieu notre Père et en Jésus-Christ le Seigneur:",
      '1 timothée':
        'Paul, apôtre de Jésus-Christ, par ordre de Dieu notre Sauveur et de Jésus-Christ notre espérance,',
      '2 timothée':
        'Paul, apôtre de Jésus-Christ par la volonté de Dieu, pour annoncer la promesse de la vie qui est en Jésus-Christ,',
      tite: 'Paul, serviteur de Dieu, et apôtre de Jésus-Christ pour la foi des élus de Dieu et la connaissance de la vérité qui est selon la piété,',
      philémon:
        "Paul, prisonnier de Jésus-Christ, et le frère Timothée, à Philémon, notre bien-aimé et notre compagnon d'œuvre,",
      hebreux:
        'Après avoir autrefois, à plusieurs reprises et de plusieurs manières, parlé à nos pères par les prophètes, Dieu,',
      jacques:
        'Jacques, serviteur de Dieu et du Seigneur Jésus-Christ, aux douze tribus qui sont dans la dispersion, salut!',
      '1 pierre':
        "Pierre, apôtre de Jésus-Christ, à ceux qui sont étrangers et dispersés dans le Pont, la Galatie, la Cappadoce, l'Asie et la Bithynie,",
      '2 pierre':
        'Simon Pierre, serviteur et apôtre de Jésus-Christ, à ceux qui ont reçu en partage une foi du même prix que la nôtre, par la justice de notre Dieu et du Sauveur Jésus-Christ:',
      '1 jean':
        'Ce qui était dès le commencement, ce que nous avons entendu, ce que nous avons vu de nos yeux, ce que nous avons contemplé et que nos mains ont touché, concernant la parole de vie,',
      '2 jean':
        "L'ancien, à Kyria l'élue et à ses enfants, que j'aime dans la vérité, et ce n'est pas moi seul qui les aime, mais aussi tous ceux qui ont connu la vérité,",
      '3 jean': "L'ancien, à Gaïus, le bien-aimé, que j'aime dans la vérité.",
      jude: 'Jude, serviteur de Jésus-Christ, et frère de Jacques, à ceux qui ont été appelés, qui sont aimés en Dieu le Père, et gardés pour Jésus-Christ:',
      apocalypse:
        "Révélation de Jésus-Christ, que Dieu lui a donnée pour montrer à ses serviteurs les choses qui doivent arriver bientôt, et qu'il a fait connaître, par l'envoi de son ange, à son serviteur Jean,",
    };

    // Correspondance anglais → français pour les noms de livres
    const englishToFrench: Record<string, string> = {
      genesis: 'genese',
      exodus: 'exode',
      leviticus: 'levitique',
      numbers: 'nombres',
      deuteronomy: 'deuteronome',
      joshua: 'josue',
      judges: 'juges',
      ruth: 'ruth',
      '1 samuel': '1 samuel',
      '2 samuel': '2 samuel',
      '1 kings': '1 rois',
      '2 kings': '2 rois',
      '1 chronicles': '1 chroniques',
      '2 chronicles': '2 chroniques',
      ezra: 'esdras',
      nehemiah: 'nehemie',
      esther: 'esther',
      job: 'job',
      psalms: 'psaumes',
      proverbs: 'proverbes',
      ecclesiastes: 'ecclesiaste',
      'song of solomon': 'cantique des cantiques',
      isaiah: 'esaie',
      jeremiah: 'jeremie',
      lamentations: 'lamentations',
      ezekiel: 'ezechiel',
      daniel: 'daniel',
      hosea: 'osee',
      joel: 'joel',
      amos: 'amos',
      obadiah: 'abdias',
      jonah: 'jonas',
      micah: 'michee',
      nahum: 'nahum',
      habakkuk: 'habacuc',
      zephaniah: 'sophonie',
      haggai: 'aggee',
      zechariah: 'zacharie',
      malachi: 'malachie',
      matthew: 'matthieu',
      mark: 'marc',
      luke: 'luc',
      john: 'jean',
      acts: 'actes',
      romans: 'romains',
      '1 corinthians': '1 corinthiens',
      '2 corinthians': '2 corinthiens',
      galatians: 'galates',
      ephesians: 'ephesiens',
      philippians: 'philippiens',
      colossians: 'colossiens',
      '1 thessalonians': '1 thessaloniciens',
      '2 thessalonians': '2 thessaloniciens',
      '1 timothy': '1 timothee',
      '2 timothy': '2 timothee',
      titus: 'tite',
      philemon: 'philemon',
      hebrews: 'hebreux',
      james: 'jacques',
      '1 peter': '1 pierre',
      '2 peter': '2 pierre',
      '1 john': '1 jean',
      '2 john': '2 jean',
      '3 john': '3 jean',
      jude: 'jude',
      revelation: 'apocalypse',
    };

    // Normaliser le nom du livre
    let normalizedBookName = bookName
      .toLowerCase()
      .replace(/[àáâäã]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôöõ]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/ç/g, 'c')
      .replace(/ñ/g, 'n')
      .trim();

    // Convertir de l'anglais au français si nécessaire
    if (englishToFrench[normalizedBookName]) {
      normalizedBookName = englishToFrench[normalizedBookName];
    }

    // 1. Essayer d'abord de trouver le verset exact dans notre base de données locale
    const specificVerse = getLocalVerse(normalizedBookName, chapter, verse);
    if (specificVerse) {
      return {
        success: true,
        data: [
          {
            id: Math.floor(Math.random() * 10000) + 3000,
            book_id: Math.floor(Math.random() * 66) + 1,
            chapter_id: chapter,
            verse_number: verse,
            text: specificVerse,
            created_at: new Date().toISOString(),
          },
        ],
        message: `${bookName} ${chapter}:${verse}`,
      };
    }

    // 2. Si pas trouvé, chercher le verset de fallback (premier verset du livre)
    let fallbackText = fallbackVerses[normalizedBookName];

    // Si pas trouvé, essayer quelques variantes
    if (!fallbackText) {
      const variants = [
        normalizedBookName.replace(/s$/, ''), // enlever le 's' final
        normalizedBookName + 's', // ajouter 's'
        normalizedBookName.replace('_', ' '), // remplacer _ par espace
        normalizedBookName.replace(' ', '_'), // remplacer espace par _
      ];

      for (const variant of variants) {
        if (fallbackVerses[variant]) {
          fallbackText = fallbackVerses[variant];
          break;
        }
      }
    }

    // Si toujours pas trouvé, utiliser un texte générique
    if (!fallbackText) {
      fallbackText = `Voici le début du livre de ${bookName}. Ce livre fait partie de la Bible et contient la parole de Dieu.`;
    }

    return {
      success: true,
      data: [
        {
          id: Math.floor(Math.random() * 10000) + 3000,
          book_id: Math.floor(Math.random() * 66) + 1,
          chapter_id: chapter,
          verse_number: verse,
          text: fallbackText,
          created_at: new Date().toISOString(),
        },
      ],
      message: `${bookName} ${chapter}:${verse}`,
    };
  }

  private getMockData(cacheKey: string): any {
    // Données de démonstration qui simulent l'API locale
    const mockData: Record<string, any> = {
      books_fra: {
        success: true,
        data: [
          {
            id: 1,
            name: 'Genèse',
            abbreviation: 'Gen',
            testament: 'ancien',
            chapter_count: 50,
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            name: 'Exode',
            abbreviation: 'Ex',
            testament: 'ancien',
            chapter_count: 40,
            created_at: new Date().toISOString(),
          },
          {
            id: 19,
            name: 'Psaumes',
            abbreviation: 'Ps',
            testament: 'ancien',
            chapter_count: 150,
            created_at: new Date().toISOString(),
          },
          {
            id: 32,
            name: 'Jonas',
            abbreviation: 'Jon',
            testament: 'ancien',
            chapter_count: 4,
            created_at: new Date().toISOString(),
          },
          {
            id: 40,
            name: 'Matthieu',
            abbreviation: 'Mt',
            testament: 'nouveau',
            chapter_count: 28,
            created_at: new Date().toISOString(),
          },
          {
            id: 42,
            name: 'Luc',
            abbreviation: 'Lc',
            testament: 'nouveau',
            chapter_count: 24,
            created_at: new Date().toISOString(),
          },
          {
            id: 43,
            name: 'Jean',
            abbreviation: 'Jn',
            testament: 'nouveau',
            chapter_count: 21,
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Livres de la Bible',
      },
      books_ancien: {
        success: true,
        data: [
          {
            id: 1,
            name: 'Genèse',
            abbreviation: 'Gen',
            testament: 'ancien',
            chapter_count: 50,
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            name: 'Exode',
            abbreviation: 'Ex',
            testament: 'ancien',
            chapter_count: 40,
            created_at: new Date().toISOString(),
          },
          {
            id: 19,
            name: 'Psaumes',
            abbreviation: 'Ps',
            testament: 'ancien',
            chapter_count: 150,
            created_at: new Date().toISOString(),
          },
          {
            id: 32,
            name: 'Jonas',
            abbreviation: 'Jon',
            testament: 'ancien',
            chapter_count: 4,
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Ancien Testament',
      },
      books_nouveau: {
        success: true,
        data: [
          {
            id: 40,
            name: 'Matthieu',
            abbreviation: 'Mt',
            testament: 'nouveau',
            chapter_count: 28,
            created_at: new Date().toISOString(),
          },
          {
            id: 42,
            name: 'Luc',
            abbreviation: 'Lc',
            testament: 'nouveau',
            chapter_count: 24,
            created_at: new Date().toISOString(),
          },
          {
            id: 43,
            name: 'Jean',
            abbreviation: 'Jn',
            testament: 'nouveau',
            chapter_count: 21,
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Nouveau Testament',
      },
      'verses_32_1_1-3': {
        success: true,
        data: [
          {
            id: 1,
            book_id: 32,
            chapter_id: 1,
            verse_number: 1,
            text: "La parole de l'Éternel fut adressée à Jonas, fils d'Amitthaï, en ces mots:",
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            book_id: 32,
            chapter_id: 1,
            verse_number: 2,
            text: "Lève-toi, va à Ninive, la grande ville, et crie contre elle! car sa méchanceté est montée jusqu'à moi.",
            created_at: new Date().toISOString(),
          },
          {
            id: 3,
            book_id: 32,
            chapter_id: 1,
            verse_number: 3,
            text: "Et Jonas se leva pour s'enfuir à Tarsis, loin de la face de l'Éternel. Il descendit à Japho, et il trouva un navire qui allait à Tarsis; il paya le prix du transport, et s'embarqua pour aller avec les passagers à Tarsis, loin de la face de l'Éternel.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Jonas 1:1-3',
      },
      'verses_1_1_1-3': {
        success: true,
        data: [
          {
            id: 1,
            book_id: 1,
            chapter_id: 1,
            verse_number: 1,
            text: 'Au commencement, Dieu créa les cieux et la terre.',
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            book_id: 1,
            chapter_id: 1,
            verse_number: 2,
            text: "La terre était informe et vide: il y avait des ténèbres à la surface de l'abîme, et l'esprit de Dieu se mouvait au-dessus des eaux.",
            created_at: new Date().toISOString(),
          },
          {
            id: 3,
            book_id: 1,
            chapter_id: 1,
            verse_number: 3,
            text: 'Dieu dit: Que la lumière soit! Et la lumière fut.',
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Genèse 1:1-3',
      },
      genèse_1_1_10: {
        success: true,
        data: [
          {
            id: 2010,
            book_id: 1,
            chapter_id: 1,
            verse_number: 1,
            text: 'Au commencement, Dieu créa les cieux et la terre.',
            created_at: new Date().toISOString(),
          },
          {
            id: 2011,
            book_id: 1,
            chapter_id: 1,
            verse_number: 2,
            text: "La terre était informe et vide: il y avait des ténèbres à la surface de l'abîme, et l'esprit de Dieu se mouvait au-dessus des eaux.",
            created_at: new Date().toISOString(),
          },
          {
            id: 2012,
            book_id: 1,
            chapter_id: 1,
            verse_number: 3,
            text: 'Dieu dit: Que la lumière soit! Et la lumière fut.',
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Genèse 1:1-10',
      },
      '2 chroniques_1_1_10': {
        success: true,
        data: [
          {
            id: 2013,
            book_id: 14,
            chapter_id: 1,
            verse_number: 1,
            text: "Salomon, fils de David, s'affermit dans son royaume. L'Éternel, son Dieu, était avec lui, et l'éleva à un haut degré.",
            created_at: new Date().toISOString(),
          },
        ],
        message: '2 Chroniques 1:1-10',
      },
      'verses_42_2_8-14': {
        success: true,
        data: [
          {
            id: 1,
            book_id: 42,
            chapter_id: 2,
            verse_number: 8,
            text: 'Il y avait, dans cette même contrée, des bergers qui passaient dans les champs les veilles de la nuit pour garder leurs troupeaux.',
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            book_id: 42,
            chapter_id: 2,
            verse_number: 9,
            text: "Et voici, un ange du Seigneur leur apparut, et la gloire du Seigneur resplendit autour d'eux. Ils furent saisis d'une grande frayeur.",
            created_at: new Date().toISOString(),
          },
          {
            id: 3,
            book_id: 42,
            chapter_id: 2,
            verse_number: 10,
            text: "Mais l'ange leur dit: Ne craignez point; car je vous annonce une bonne nouvelle, qui sera pour tout le peuple le sujet d'une grande joie:",
            created_at: new Date().toISOString(),
          },
          {
            id: 4,
            book_id: 42,
            chapter_id: 2,
            verse_number: 11,
            text: "c'est qu'aujourd'hui, dans la ville de David, il vous est né un Sauveur, qui est le Christ, le Seigneur.",
            created_at: new Date().toISOString(),
          },
          {
            id: 5,
            book_id: 42,
            chapter_id: 2,
            verse_number: 12,
            text: 'Et voici à quel signe vous le reconnaîtrez: vous trouverez un enfant emmailloté et couché dans une crèche.',
            created_at: new Date().toISOString(),
          },
          {
            id: 6,
            book_id: 42,
            chapter_id: 2,
            verse_number: 13,
            text: "Et soudain il se joignit à l'ange une multitude de l'armée céleste, louant Dieu et disant:",
            created_at: new Date().toISOString(),
          },
          {
            id: 7,
            book_id: 42,
            chapter_id: 2,
            verse_number: 14,
            text: "Gloire à Dieu dans les lieux très hauts, Et paix sur la terre aux hommes qu'il agrée!",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Luc 2:8-14',
      },
      search_amour_10: {
        success: true,
        data: [
          {
            id: 1,
            book_id: 43,
            chapter_id: 3,
            verse_number: 16,
            text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            book_id: 40,
            chapter_id: 22,
            verse_number: 37,
            text: 'Jésus lui répondit: Tu aimeras le Seigneur, ton Dieu, de tout ton cœur, de toute ton âme, et de toute ta pensée.',
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Recherche pour: amour',
      },
      genesis_3_1_15: {
        success: true,
        data: [
          {
            id: 1,
            book_id: 1,
            chapter_id: 3,
            verse_number: 1,
            text: "Le serpent était le plus rusé de tous les animaux des champs, que l'Éternel Dieu avait faits. Il dit à la femme: Dieu a-t-il réellement dit: Vous ne mangerez pas de tous les arbres du jardin?",
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            book_id: 1,
            chapter_id: 3,
            verse_number: 2,
            text: 'La femme répondit au serpent: Nous mangeons du fruit des arbres du jardin.',
            created_at: new Date().toISOString(),
          },
          {
            id: 3,
            book_id: 1,
            chapter_id: 3,
            verse_number: 3,
            text: "Mais quant au fruit de l'arbre qui est au milieu du jardin, Dieu a dit: Vous n'en mangerez point et vous n'y toucherez point, de peur que vous ne mouriez.",
            created_at: new Date().toISOString(),
          },
          {
            id: 4,
            book_id: 1,
            chapter_id: 3,
            verse_number: 4,
            text: 'Alors le serpent dit à la femme: Vous ne mourrez point;',
            created_at: new Date().toISOString(),
          },
          {
            id: 5,
            book_id: 1,
            chapter_id: 3,
            verse_number: 5,
            text: "mais Dieu sait que, le jour où vous en mangerez, vos yeux s'ouvriront, et que vous serez comme des dieux, connaissant le bien et le mal.",
            created_at: new Date().toISOString(),
          },
          {
            id: 6,
            book_id: 1,
            chapter_id: 3,
            verse_number: 6,
            text: "La femme vit que l'arbre était bon à manger et agréable à la vue, et qu'il était précieux pour ouvrir l'intelligence; elle prit de son fruit, et en mangea; elle en donna aussi à son mari, qui était auprès d'elle, et il en mangea.",
            created_at: new Date().toISOString(),
          },
          {
            id: 7,
            book_id: 1,
            chapter_id: 3,
            verse_number: 7,
            text: "Les yeux de l'un et de l'autre s'ouvrirent, ils connurent qu'ils étaient nus, et ayant cousu des feuilles de figuier, ils s'en firent des ceintures.",
            created_at: new Date().toISOString(),
          },
          {
            id: 8,
            book_id: 1,
            chapter_id: 3,
            verse_number: 8,
            text: "Alors ils entendirent la voix de l'Éternel Dieu, qui parcourait le jardin vers le soir, et l'homme et sa femme se cachèrent loin de la face de l'Éternel Dieu, au milieu des arbres du jardin.",
            created_at: new Date().toISOString(),
          },
          {
            id: 9,
            book_id: 1,
            chapter_id: 3,
            verse_number: 9,
            text: "Mais l'Éternel Dieu appela l'homme, et lui dit: Où es-tu?",
            created_at: new Date().toISOString(),
          },
          {
            id: 10,
            book_id: 1,
            chapter_id: 3,
            verse_number: 10,
            text: "Il répondit: J'ai entendu ta voix dans le jardin, et j'ai eu peur, parce que je suis nu, et je me suis caché.",
            created_at: new Date().toISOString(),
          },
          {
            id: 11,
            book_id: 1,
            chapter_id: 3,
            verse_number: 11,
            text: "Et l'Éternel Dieu dit: Qui t'a appris que tu es nu? Est-ce que tu as mangé de l'arbre dont je t'avais défendu de manger?",
            created_at: new Date().toISOString(),
          },
          {
            id: 12,
            book_id: 1,
            chapter_id: 3,
            verse_number: 12,
            text: "L'homme répondit: La femme que tu as mise auprès de moi m'a donné de l'arbre, et j'en ai mangé.",
            created_at: new Date().toISOString(),
          },
          {
            id: 13,
            book_id: 1,
            chapter_id: 3,
            verse_number: 13,
            text: "Et l'Éternel Dieu dit à la femme: Pourquoi as-tu fait cela? La femme répondit: Le serpent m'a séduite, et j'en ai mangé.",
            created_at: new Date().toISOString(),
          },
          {
            id: 14,
            book_id: 1,
            chapter_id: 3,
            verse_number: 14,
            text: "L'Éternel Dieu dit au serpent: Puisque tu as fait cela, tu seras maudit entre tout le bétail et entre tous les animaux des champs, tu marcheras sur ton ventre, et tu mangeras de la poussière tous les jours de ta vie.",
            created_at: new Date().toISOString(),
          },
          {
            id: 15,
            book_id: 1,
            chapter_id: 3,
            verse_number: 15,
            text: "Je mettrai inimitié entre toi et la femme, entre ta postérité et sa postérité: celle-ci t'écrasera la tête, et tu lui blesseras le talon.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Genèse 3:1-15 (Adam et Ève)',
      },
      genesis_6_9: {
        data: [
          {
            id: 100,
            book_id: 1,
            chapter_id: 6,
            verse_number: 9,
            text: 'Voici la postérité de Noé. Noé était un homme juste et intègre dans son temps; Noé marchait avec Dieu.',
            created_at: new Date().toISOString(),
          },
          {
            id: 101,
            book_id: 1,
            chapter_id: 6,
            verse_number: 8,
            text: "Mais Noé trouva grâce aux yeux de l'Éternel.",
            created_at: new Date().toISOString(),
          },
          {
            id: 102,
            book_id: 1,
            chapter_id: 6,
            verse_number: 14,
            text: "Fais-toi une arche de bois de gopher; tu disposeras cette arche en cellules, et tu l'enduiras de poix en dedans et en dehors.",
            created_at: new Date().toISOString(),
          },
          {
            id: 103,
            book_id: 1,
            chapter_id: 7,
            verse_number: 12,
            text: 'La pluie tomba sur la terre quarante jours et quarante nuits.',
            created_at: new Date().toISOString(),
          },
          {
            id: 104,
            book_id: 1,
            chapter_id: 9,
            verse_number: 13,
            text: "J'ai placé mon arc dans la nue, et il servira de signe d'alliance entre moi et la terre.",
            created_at: new Date().toISOString(),
          },
        ],
        message: "Genèse 6-9 (Noé et l'Arche)",
      },
      genesis_11: {
        data: [
          {
            id: 200,
            book_id: 1,
            chapter_id: 11,
            verse_number: 1,
            text: 'Toute la terre avait une seule langue et les mêmes mots.',
            created_at: new Date().toISOString(),
          },
          {
            id: 201,
            book_id: 1,
            chapter_id: 11,
            verse_number: 4,
            text: 'Ils dirent encore: Allons! bâtissons-nous une ville et une tour dont le sommet touche au ciel, et faisons-nous un nom, afin que nous ne soyons pas dispersés sur la face de toute la terre.',
            created_at: new Date().toISOString(),
          },
          {
            id: 202,
            book_id: 1,
            chapter_id: 11,
            verse_number: 6,
            text: "Et l'Éternel dit: Voici, ils sont un seul peuple et ils ont tous une même langue, et c'est là ce qu'ils ont entrepris; maintenant rien ne les empêcherait de faire tout ce qu'ils auraient projeté.",
            created_at: new Date().toISOString(),
          },
          {
            id: 203,
            book_id: 1,
            chapter_id: 11,
            verse_number: 7,
            text: "Allons! descendons, et là confondons leur langage, afin qu'ils n'entendent plus la langue, les uns des autres.",
            created_at: new Date().toISOString(),
          },
          {
            id: 204,
            book_id: 1,
            chapter_id: 11,
            verse_number: 9,
            text: "C'est pourquoi on l'appela du nom de Babel, car c'est là que l'Éternel confondit le langage de toute la terre, et c'est de là que l'Éternel les dispersa sur la face de toute la terre.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Genèse 11 (La Tour de Babel)',
      },
      genesis_12_25: {
        data: [
          {
            id: 300,
            book_id: 1,
            chapter_id: 12,
            verse_number: 1,
            text: "L'Éternel dit à Abram: Va-t-en de ton pays, et de ta patrie, et de la maison de ton père, vers le pays que je te montrerai.",
            created_at: new Date().toISOString(),
          },
          {
            id: 301,
            book_id: 1,
            chapter_id: 12,
            verse_number: 2,
            text: 'Je ferai de toi une grande nation, et je te bénirai; je rendrai ton nom grand, et tu seras une source de bénédiction.',
            created_at: new Date().toISOString(),
          },
          {
            id: 302,
            book_id: 1,
            chapter_id: 15,
            verse_number: 5,
            text: "Et après l'avoir conduit dehors, il dit: Regarde vers le ciel, et compte les étoiles, si tu peux les compter. Et il lui dit: Telle sera ta postérité.",
            created_at: new Date().toISOString(),
          },
          {
            id: 303,
            book_id: 1,
            chapter_id: 17,
            verse_number: 5,
            text: "Ton nom ne sera plus Abram, mais ton nom sera Abraham; car je te rends père d'une multitude de nations.",
            created_at: new Date().toISOString(),
          },
          {
            id: 304,
            book_id: 1,
            chapter_id: 21,
            verse_number: 2,
            text: 'Sara devint enceinte, et elle enfanta un fils à Abraham dans sa vieillesse, au temps fixé dont Dieu lui avait parlé.',
            created_at: new Date().toISOString(),
          },
        ],
        message: "Genèse 12-25 (Abraham et l'Alliance)",
      },
      genesis_24_26: {
        data: [
          {
            id: 400,
            book_id: 1,
            chapter_id: 24,
            verse_number: 3,
            text: "Je te ferai jurer par l'Éternel, le Dieu du ciel et le Dieu de la terre, de ne pas prendre pour mon fils une femme parmi les filles des Cananéens au milieu desquels j'habite.",
            created_at: new Date().toISOString(),
          },
          {
            id: 401,
            book_id: 1,
            chapter_id: 24,
            verse_number: 4,
            text: 'Mais tu iras dans mon pays et dans ma patrie prendre une femme pour mon fils Isaac.',
            created_at: new Date().toISOString(),
          },
          {
            id: 402,
            book_id: 1,
            chapter_id: 24,
            verse_number: 12,
            text: "Il dit: Éternel, Dieu de mon seigneur Abraham, fais-moi, je te prie, rencontrer aujourd'hui ce que je désire, et use de bonté envers mon seigneur Abraham!",
            created_at: new Date().toISOString(),
          },
          {
            id: 403,
            book_id: 1,
            chapter_id: 24,
            verse_number: 19,
            text: "Quand elle eut achevé de lui donner à boire, elle dit: Je puiserai aussi pour tes chameaux, jusqu'à ce qu'ils aient assez bu.",
            created_at: new Date().toISOString(),
          },
          {
            id: 404,
            book_id: 1,
            chapter_id: 25,
            verse_number: 21,
            text: "Isaac implora l'Éternel pour sa femme, car elle était stérile, et l'Éternel l'exauça: Rebecca, sa femme, devint enceinte.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Genèse 24-26 (Isaac et Rebecca)',
      },
      genesis_25_33: {
        data: [
          {
            id: 500,
            book_id: 1,
            chapter_id: 25,
            verse_number: 25,
            text: "Le premier sortit entièrement roux, comme un manteau de poil; et on lui donna le nom d'Ésaü.",
            created_at: new Date().toISOString(),
          },
          {
            id: 501,
            book_id: 1,
            chapter_id: 25,
            verse_number: 26,
            text: "Ensuite sortit son frère, dont la main tenait le talon d'Ésaü; et on lui donna le nom de Jacob.",
            created_at: new Date().toISOString(),
          },
          {
            id: 502,
            book_id: 1,
            chapter_id: 25,
            verse_number: 29,
            text: 'Comme Jacob faisait cuire un potage, Ésaü revint des champs, accablé de fatigue.',
            created_at: new Date().toISOString(),
          },
          {
            id: 503,
            book_id: 1,
            chapter_id: 25,
            verse_number: 30,
            text: "Ésaü dit à Jacob: Laisse-moi, je te prie, manger de ce roux, de ce roux-là, car je suis fatigué. C'est pour cela qu'on a donné à Ésaü le nom d'Édom.",
            created_at: new Date().toISOString(),
          },
          {
            id: 504,
            book_id: 1,
            chapter_id: 33,
            verse_number: 4,
            text: "Ésaü courut à sa rencontre; il l'embrassa, se jeta à son cou, et le baisa. Et ils pleurèrent.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Genèse 25-33 (Jacob et Ésaü)',
      },
      genesis_37_50: {
        data: [
          {
            id: 600,
            book_id: 1,
            chapter_id: 37,
            verse_number: 3,
            text: "Israël aimait Joseph plus que tous ses autres fils, parce qu'il était le fils de sa vieillesse; et il lui fit une tunique de plusieurs couleurs.",
            created_at: new Date().toISOString(),
          },
          {
            id: 601,
            book_id: 1,
            chapter_id: 37,
            verse_number: 28,
            text: "Au passage des marchands madianites, ils tirèrent et firent remonter Joseph hors de la citerne, et ils le vendirent pour vingt sicles d'argent aux Ismaélites, qui l'emmenèrent en Égypte.",
            created_at: new Date().toISOString(),
          },
          {
            id: 602,
            book_id: 1,
            chapter_id: 41,
            verse_number: 16,
            text: "Joseph répondit à Pharaon, en disant: Ce n'est pas moi! c'est Dieu qui donnera une réponse favorable à Pharaon.",
            created_at: new Date().toISOString(),
          },
          {
            id: 603,
            book_id: 1,
            chapter_id: 45,
            verse_number: 5,
            text: "Maintenant, ne vous affligez pas, et ne soyez pas fâchés de m'avoir vendu pour être conduit ici, car c'est pour vous sauver la vie que Dieu m'a envoyé devant vous.",
            created_at: new Date().toISOString(),
          },
          {
            id: 604,
            book_id: 1,
            chapter_id: 50,
            verse_number: 20,
            text: "Vous aviez médité de me faire du mal: Dieu l'a changé en bien, pour accomplir ce qui arrive aujourd'hui, pour sauver la vie à un peuple nombreux.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Genèse 37-50 (Joseph en Égypte)',
      },
      exode_20: {
        data: [
          {
            id: 700,
            book_id: 2,
            chapter_id: 20,
            verse_number: 1,
            text: 'Alors Dieu prononça toutes ces paroles, en disant:',
            created_at: new Date().toISOString(),
          },
          {
            id: 701,
            book_id: 2,
            chapter_id: 20,
            verse_number: 2,
            text: "Je suis l'Éternel, ton Dieu, qui t'ai fait sortir du pays d'Égypte, de la maison de servitude.",
            created_at: new Date().toISOString(),
          },
          {
            id: 702,
            book_id: 2,
            chapter_id: 20,
            verse_number: 3,
            text: "Tu n'auras pas d'autres dieux devant ma face.",
            created_at: new Date().toISOString(),
          },
          {
            id: 703,
            book_id: 2,
            chapter_id: 20,
            verse_number: 7,
            text: "Tu ne prendras point le nom de l'Éternel, ton Dieu, en vain; car l'Éternel ne laissera point impuni celui qui prendra son nom en vain.",
            created_at: new Date().toISOString(),
          },
          {
            id: 704,
            book_id: 2,
            chapter_id: 20,
            verse_number: 12,
            text: "Honore ton père et ta mère, afin que tes jours se prolongent dans le pays que l'Éternel, ton Dieu, te donne.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Exode 20 (Les Dix Commandements)',
      },
      juges_6_8: {
        data: [
          {
            id: 800,
            book_id: 7,
            chapter_id: 6,
            verse_number: 12,
            text: "L'ange de l'Éternel lui apparut, et lui dit: L'Éternel est avec toi, vaillant héros!",
            created_at: new Date().toISOString(),
          },
          {
            id: 801,
            book_id: 7,
            chapter_id: 7,
            verse_number: 2,
            text: "L'Éternel dit à Gédéon: Le peuple que tu as avec toi est trop nombreux pour que je livre Madian entre ses mains; il pourrait en tirer gloire contre moi.",
            created_at: new Date().toISOString(),
          },
          {
            id: 802,
            book_id: 7,
            chapter_id: 7,
            verse_number: 7,
            text: "L'Éternel dit à Gédéon: C'est par les trois cents hommes qui ont lapé que je vous sauverai et que je livrerai Madian entre tes mains.",
            created_at: new Date().toISOString(),
          },
          {
            id: 803,
            book_id: 7,
            chapter_id: 7,
            verse_number: 20,
            text: 'Les trois corps sonnèrent de la trompette, et brisèrent les cruches; ils saisirent de la main gauche les torches, et de la main droite les trompettes pour sonner.',
            created_at: new Date().toISOString(),
          },
          {
            id: 804,
            book_id: 7,
            chapter_id: 7,
            verse_number: 22,
            text: "Les trois cents hommes sonnèrent encore de la trompette; et, dans tout le camp, l'Éternel fit tourner l'épée les uns contre les autres.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Juges 6-8 (Gédéon et les 300 hommes)',
      },
      exode_3: {
        data: [
          {
            id: 900,
            book_id: 2,
            chapter_id: 3,
            verse_number: 2,
            text: "L'ange de l'Éternel lui apparut dans une flamme de feu, au milieu d'un buisson. Moïse regarda; et voici, le buisson était tout en feu, et le buisson ne se consumait point.",
            created_at: new Date().toISOString(),
          },
          {
            id: 901,
            book_id: 2,
            chapter_id: 3,
            verse_number: 4,
            text: "L'Éternel vit qu'il se détournait pour voir; et Dieu l'appela du milieu du buisson, et dit: Moïse! Moïse! Et il répondit: Me voici!",
            created_at: new Date().toISOString(),
          },
          {
            id: 902,
            book_id: 2,
            chapter_id: 3,
            verse_number: 5,
            text: "Dieu dit: N'approche pas d'ici, ôte tes souliers de tes pieds, car le lieu sur lequel tu te tiens est une terre sainte.",
            created_at: new Date().toISOString(),
          },
          {
            id: 903,
            book_id: 2,
            chapter_id: 3,
            verse_number: 6,
            text: "Et il ajouta: Je suis le Dieu de ton père, le Dieu d'Abraham, le Dieu d'Isaac et le Dieu de Jacob. Moïse se cacha le visage, car il craignait de regarder Dieu.",
            created_at: new Date().toISOString(),
          },
          {
            id: 904,
            book_id: 2,
            chapter_id: 3,
            verse_number: 14,
            text: "Dieu dit à Moïse: Je suis celui qui suis. Et il ajouta: C'est ainsi que tu répondras aux enfants d'Israël: Celui qui s'appelle 'je suis' m'a envoyé vers vous.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Exode 3 (Moïse et le buisson ardent)',
      },
      exode_7_12: {
        data: [
          {
            id: 950,
            book_id: 2,
            chapter_id: 7,
            verse_number: 17,
            text: "Ainsi parle l'Éternel: À ceci tu connaîtras que je suis l'Éternel. Je vais frapper les eaux du fleuve avec la verge qui est dans ma main; et elles seront changées en sang.",
            created_at: new Date().toISOString(),
          },
          {
            id: 951,
            book_id: 2,
            chapter_id: 8,
            verse_number: 2,
            text: 'Si tu refuses de laisser partir le peuple, je vais frapper tout ton territoire par des grenouilles.',
            created_at: new Date().toISOString(),
          },
          {
            id: 952,
            book_id: 2,
            chapter_id: 8,
            verse_number: 16,
            text: "L'Éternel dit à Moïse: Dis à Aaron: Étends ta verge, et frappe la poussière de la terre. Elle se changera en moustiques dans tout le pays d'Égypte.",
            created_at: new Date().toISOString(),
          },
          {
            id: 953,
            book_id: 2,
            chapter_id: 12,
            verse_number: 29,
            text: "Au milieu de la nuit, l'Éternel frappa tous les premiers-nés dans le pays d'Égypte, depuis le premier-né de Pharaon assis sur son trône, jusqu'au premier-né du captif dans sa prison, et tous les premiers-nés des animaux.",
            created_at: new Date().toISOString(),
          },
          {
            id: 954,
            book_id: 2,
            chapter_id: 12,
            verse_number: 31,
            text: "Pharaon appela Moïse et Aaron, et dit: Levez-vous, sortez du milieu de mon peuple, vous et les enfants d'Israël. Allez, servez l'Éternel, comme vous l'avez dit.",
            created_at: new Date().toISOString(),
          },
        ],
        message: "Exode 7-12 (Les dix plaies d'Égypte)",
      },
      exode_14: {
        data: [
          {
            id: 1000,
            book_id: 2,
            chapter_id: 14,
            verse_number: 10,
            text: "Pharaon approchait. Les enfants d'Israël levèrent les yeux, et voici, les Égyptiens étaient en marche derrière eux. Et les enfants d'Israël eurent une grande frayeur, et crièrent à l'Éternel.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1001,
            book_id: 2,
            chapter_id: 14,
            verse_number: 13,
            text: "Moïse répondit au peuple: Ne craignez rien, restez en place, et vous verrez la délivrance que l'Éternel va vous accorder aujourd'hui; car les Égyptiens que vous voyez aujourd'hui, vous ne les verrez plus jamais.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1002,
            book_id: 2,
            chapter_id: 14,
            verse_number: 21,
            text: "Moïse étendit sa main sur la mer. Et l'Éternel refoula la mer par un vent d'orient, qui souffla avec impétuosité toute la nuit; il mit la mer à sec, et les eaux se fendirent.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1003,
            book_id: 2,
            chapter_id: 14,
            verse_number: 22,
            text: "Les enfants d'Israël entrèrent au milieu de la mer à pied sec, et les eaux formaient comme une muraille à leur droite et à leur gauche.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1004,
            book_id: 2,
            chapter_id: 14,
            verse_number: 28,
            text: "Les eaux revinrent, et couvrirent les chars, les cavaliers et toute l'armée de Pharaon, qui étaient entrés dans la mer après les enfants d'Israël; et il n'en échappa pas un seul.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Exode 14 (La traversée de la mer Rouge)',
      },
      juges_13_16: {
        data: [
          {
            id: 1050,
            book_id: 7,
            chapter_id: 13,
            verse_number: 5,
            text: 'Car tu vas devenir enceinte et tu enfanteras un fils. Le rasoir ne passera point sur sa tête, parce que cet enfant sera consacré à Dieu dès le ventre de sa mère.',
            created_at: new Date().toISOString(),
          },
          {
            id: 1051,
            book_id: 7,
            chapter_id: 14,
            verse_number: 6,
            text: "L'Esprit de l'Éternel saisit Samson, et, sans avoir rien à la main, Samson déchira le lion comme on déchire un chevreau.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1052,
            book_id: 7,
            chapter_id: 15,
            verse_number: 15,
            text: "Il trouva une mâchoire d'âne fraîche, étendit la main, la saisit, et tua mille hommes avec cette mâchoire.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1053,
            book_id: 7,
            chapter_id: 16,
            verse_number: 17,
            text: "Il lui dit tout ce qu'il avait dans le cœur, et lui dit: Le rasoir n'a jamais passé sur ma tête, car je suis naziréen de Dieu dès le ventre de ma mère.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1054,
            book_id: 7,
            chapter_id: 16,
            verse_number: 30,
            text: "Samson dit: Que je meure avec les Philistins! Il se pencha fortement, et la maison tomba sur les princes et sur tout le peuple qui s'y trouvait.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Juges 13-16 (Samson et Dalila)',
      },
      rois_3_8: {
        data: [
          {
            id: 1100,
            book_id: 11,
            chapter_id: 3,
            verse_number: 9,
            text: 'Donne donc à ton serviteur un cœur intelligent pour juger ton peuple, pour discerner le bien du mal! Car qui pourrait juger ton peuple, ce peuple si nombreux?',
            created_at: new Date().toISOString(),
          },
          {
            id: 1101,
            book_id: 11,
            chapter_id: 3,
            verse_number: 12,
            text: "Voici, je fais selon ta parole. Je te donne un cœur sage et intelligent, de telle sorte qu'il n'y aura eu personne avant toi et qu'on ne verra jamais personne de semblable à toi.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1102,
            book_id: 11,
            chapter_id: 6,
            verse_number: 7,
            text: "La maison que le roi Salomon bâtit à l'Éternel avait soixante coudées de longueur, vingt de largeur, et trente de hauteur.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1103,
            book_id: 11,
            chapter_id: 8,
            verse_number: 10,
            text: "Dès que les sacrificateurs furent sortis du lieu saint, la nuée remplit la maison de l'Éternel.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1104,
            book_id: 11,
            chapter_id: 8,
            verse_number: 29,
            text: 'Que tes yeux soient ouverts nuit et jour sur cette maison, sur le lieu dont tu as dit: Là sera mon nom! Écoute la prière que ton serviteur fait en ce lieu.',
            created_at: new Date().toISOString(),
          },
        ],
        message: '1 Rois 3-8 (Salomon et le Temple)',
      },
      rois_18: {
        data: [
          {
            id: 1150,
            book_id: 11,
            chapter_id: 18,
            verse_number: 21,
            text: "Élie s'approcha de tout le peuple, et dit: Jusqu'à quand clocherez-vous des deux côtés? Si l'Éternel est Dieu, allez après lui; si c'est Baal, allez après lui! Le peuple ne lui répondit rien.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1151,
            book_id: 11,
            chapter_id: 18,
            verse_number: 24,
            text: "Puis invoquez le nom de votre dieu; et moi, j'invoquerai le nom de l'Éternel. Le dieu qui répondra par le feu, c'est celui-là qui sera Dieu. Tout le peuple répondit, en disant: C'est bien!",
            created_at: new Date().toISOString(),
          },
          {
            id: 1152,
            book_id: 11,
            chapter_id: 18,
            verse_number: 26,
            text: "Ils prirent le taureau qu'on leur donna, et le préparèrent; et ils invoquèrent le nom de Baal depuis le matin jusqu'à midi, en disant: Baal, réponds-nous! Mais il n'y eut ni voix ni réponse.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1153,
            book_id: 11,
            chapter_id: 18,
            verse_number: 36,
            text: "L'heure où l'on présente l'offrande, le prophète Élie s'approcha et dit: Éternel, Dieu d'Abraham, d'Isaac et d'Israël! que l'on sache aujourd'hui que tu es Dieu en Israël.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1154,
            book_id: 11,
            chapter_id: 18,
            verse_number: 38,
            text: "Et le feu de l'Éternel tomba, et il consuma l'holocauste, le bois, les pierres et la terre, et absorba l'eau qui était dans le fossé.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1155,
            book_id: 11,
            chapter_id: 18,
            verse_number: 39,
            text: "Quand tout le peuple vit cela, ils tombèrent sur leur visage et dirent: C'est l'Éternel qui est Dieu! C'est l'Éternel qui est Dieu!",
            created_at: new Date().toISOString(),
          },
        ],
        message: '1 Rois 18 (Élie et les prophètes de Baal)',
      },
      ezechiel_37: {
        data: [
          {
            id: 1200,
            book_id: 26,
            chapter_id: 37,
            verse_number: 1,
            text: "La main de l'Éternel fut sur moi, et l'Éternel me transporta en esprit, et me déposa au milieu d'une vallée remplie d'ossements.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1201,
            book_id: 26,
            chapter_id: 37,
            verse_number: 3,
            text: "Il me dit: Fils de l'homme, ces os pourront-ils revivre? Je répondis: Seigneur Éternel, tu le sais.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1202,
            book_id: 26,
            chapter_id: 37,
            verse_number: 5,
            text: 'Ainsi parle le Seigneur Éternel à ces os: Voici, je vais faire entrer en vous un esprit, et vous vivrez.',
            created_at: new Date().toISOString(),
          },
          {
            id: 1203,
            book_id: 26,
            chapter_id: 37,
            verse_number: 7,
            text: "Je prophétisai, selon l'ordre qui m'avait été donné. Et comme je prophétisais, il y eut un bruit, et voici, il se fit un mouvement, et les os se rapprochèrent les uns des autres.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1204,
            book_id: 26,
            chapter_id: 37,
            verse_number: 10,
            text: "Je prophétisai, selon l'ordre qu'il m'avait donné. Et l'esprit entra en eux, et ils reprirent vie, et ils se tinrent sur leurs pieds: c'était une armée nombreuse, très nombreuse.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1205,
            book_id: 26,
            chapter_id: 37,
            verse_number: 11,
            text: "Il me dit: Fils de l'homme, ces os, c'est toute la maison d'Israël. Voici, ils disent: Nos os sont desséchés, notre espérance est détruite, nous sommes perdus!",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Ézéchiel 37 (Ézéchiel et les ossements desséchés)',
      },
      luc_2: {
        data: [
          {
            id: 1300,
            book_id: 42,
            chapter_id: 2,
            verse_number: 1,
            text: 'En ce temps-là parut un édit de César Auguste, ordonnant un recensement de toute la terre.',
            created_at: new Date().toISOString(),
          },
          {
            id: 1301,
            book_id: 42,
            chapter_id: 2,
            verse_number: 4,
            text: 'Joseph aussi monta de la Galilée, de la ville de Nazareth, pour se rendre en Judée, dans la ville de David, appelée Bethléhem.',
            created_at: new Date().toISOString(),
          },
          {
            id: 1302,
            book_id: 42,
            chapter_id: 2,
            verse_number: 6,
            text: "Pendant qu'ils étaient là, le temps où Marie devait accoucher arriva.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1303,
            book_id: 42,
            chapter_id: 2,
            verse_number: 7,
            text: "Elle accoucha de son fils premier-né, l'emmaillota et le coucha dans une mangeoire, parce qu'il n'y avait pas de place pour eux dans l'hôtellerie.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1304,
            book_id: 42,
            chapter_id: 2,
            verse_number: 8,
            text: 'Il y avait, dans cette même contrée, des bergers qui passaient dans les champs les veilles de la nuit pour garder leurs troupeaux.',
            created_at: new Date().toISOString(),
          },
          {
            id: 1305,
            book_id: 42,
            chapter_id: 2,
            verse_number: 10,
            text: "Mais l'ange leur dit: Ne craignez point; car je vous annonce une bonne nouvelle, qui sera pour tout le peuple le sujet d'une grande joie.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Luc 2 (La naissance de Jésus)',
      },
      luc_2_41_52: {
        data: [
          {
            id: 1400,
            book_id: 42,
            chapter_id: 2,
            verse_number: 41,
            text: 'Les parents de Jésus allaient chaque année à Jérusalem, à la fête de Pâque.',
            created_at: new Date().toISOString(),
          },
          {
            id: 1401,
            book_id: 42,
            chapter_id: 2,
            verse_number: 42,
            text: "Lorsqu'il fut âgé de douze ans, ils y montèrent, selon la coutume de la fête.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1402,
            book_id: 42,
            chapter_id: 2,
            verse_number: 43,
            text: "Puis, quand les jours furent écoulés, et qu'ils s'en retournèrent, l'enfant Jésus resta à Jérusalem.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1403,
            book_id: 42,
            chapter_id: 2,
            verse_number: 46,
            text: 'Au bout de trois jours, ils le trouvèrent dans le temple, assis au milieu des docteurs, les écoutant et les interrogeant.',
            created_at: new Date().toISOString(),
          },
          {
            id: 1404,
            book_id: 42,
            chapter_id: 2,
            verse_number: 47,
            text: "Tous ceux qui l'entendaient étaient frappés de son intelligence et de ses réponses.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1405,
            book_id: 42,
            chapter_id: 2,
            verse_number: 49,
            text: "Il leur dit: Pourquoi me cherchiez-vous? Ne saviez-vous pas qu'il faut que je m'occupe des affaires de mon Père?",
            created_at: new Date().toISOString(),
          },
        ],
        message: "Luc 2:41-52 (L'enfance de Jésus)",
      },
      matthieu_3: {
        data: [
          {
            id: 1500,
            book_id: 40,
            chapter_id: 3,
            verse_number: 1,
            text: 'En ce temps-là parut Jean Baptiste, prêchant dans le désert de Judée.',
            created_at: new Date().toISOString(),
          },
          {
            id: 1501,
            book_id: 40,
            chapter_id: 3,
            verse_number: 2,
            text: 'Il disait: Repentez-vous, car le royaume des cieux est proche.',
            created_at: new Date().toISOString(),
          },
          {
            id: 1502,
            book_id: 40,
            chapter_id: 3,
            verse_number: 6,
            text: 'Et ils se faisaient baptiser par lui dans le fleuve du Jourdain, en confessant leurs péchés.',
            created_at: new Date().toISOString(),
          },
          {
            id: 1503,
            book_id: 40,
            chapter_id: 3,
            verse_number: 13,
            text: 'Alors Jésus vint de la Galilée au Jourdain vers Jean, pour être baptisé par lui.',
            created_at: new Date().toISOString(),
          },
          {
            id: 1504,
            book_id: 40,
            chapter_id: 3,
            verse_number: 14,
            text: "Mais Jean s'y opposait, en disant: C'est moi qui ai besoin d'être baptisé par toi, et tu viens à moi!",
            created_at: new Date().toISOString(),
          },
          {
            id: 1505,
            book_id: 40,
            chapter_id: 3,
            verse_number: 15,
            text: 'Jésus lui répondit: Laisse faire maintenant, car il est convenable que nous accomplissions ainsi tout ce qui est juste. Et Jean ne lui résista plus.',
            created_at: new Date().toISOString(),
          },
          {
            id: 1506,
            book_id: 40,
            chapter_id: 3,
            verse_number: 16,
            text: "Dès que Jésus eut été baptisé, il sortit de l'eau. Et voici, les cieux s'ouvrirent, et il vit l'Esprit de Dieu descendre comme une colombe et venir sur lui.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1507,
            book_id: 40,
            chapter_id: 3,
            verse_number: 17,
            text: "Et voici, une voix fit entendre des cieux ces paroles: Celui-ci est mon Fils bien-aimé, en qui j'ai mis toute mon affection.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Matthieu 3 (Le baptême de Jésus)',
      },
      matthieu_4: {
        data: [
          {
            id: 1600,
            book_id: 40,
            chapter_id: 4,
            verse_number: 1,
            text: "Alors Jésus fut emmené par l'Esprit dans le désert, pour être tenté par le diable.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1601,
            book_id: 40,
            chapter_id: 4,
            verse_number: 2,
            text: 'Après avoir jeûné quarante jours et quarante nuits, il eut faim.',
            created_at: new Date().toISOString(),
          },
          {
            id: 1602,
            book_id: 40,
            chapter_id: 4,
            verse_number: 3,
            text: "Le tentateur, s'étant approché, lui dit: Si tu es Fils de Dieu, ordonne que ces pierres deviennent des pains.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1603,
            book_id: 40,
            chapter_id: 4,
            verse_number: 4,
            text: "Jésus répondit: Il est écrit: L'homme ne vivra pas de pain seulement, mais de toute parole qui sort de la bouche de Dieu.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1604,
            book_id: 40,
            chapter_id: 4,
            verse_number: 5,
            text: 'Le diable le transporta dans la ville sainte, le plaça sur le haut du temple.',
            created_at: new Date().toISOString(),
          },
          {
            id: 1605,
            book_id: 40,
            chapter_id: 4,
            verse_number: 6,
            text: 'Et lui dit: Si tu es Fils de Dieu, jette-toi en bas; car il est écrit: Il donnera des ordres à ses anges à ton sujet; Et ils te porteront sur les mains, De peur que ton pied ne heurte contre une pierre.',
            created_at: new Date().toISOString(),
          },
          {
            id: 1606,
            book_id: 40,
            chapter_id: 4,
            verse_number: 7,
            text: 'Jésus lui dit: Il est aussi écrit: Tu ne tenteras point le Seigneur, ton Dieu.',
            created_at: new Date().toISOString(),
          },
          {
            id: 1607,
            book_id: 40,
            chapter_id: 4,
            verse_number: 8,
            text: 'Le diable le transporta encore sur une montagne très élevée, lui montra tous les royaumes du monde et leur gloire.',
            created_at: new Date().toISOString(),
          },
          {
            id: 1608,
            book_id: 40,
            chapter_id: 4,
            verse_number: 9,
            text: "Et lui dit: Je te donnerai toutes ces choses, si tu te prosternes et m'adores.",
            created_at: new Date().toISOString(),
          },
          {
            id: 1609,
            book_id: 40,
            chapter_id: 4,
            verse_number: 10,
            text: 'Jésus lui dit: Retire-toi, Satan! Car il est écrit: Tu adoreras le Seigneur, ton Dieu, et tu le serviras lui seul.',
            created_at: new Date().toISOString(),
          },
          {
            id: 1610,
            book_id: 40,
            chapter_id: 4,
            verse_number: 11,
            text: 'Alors le diable le laissa. Et voici, des anges vinrent auprès de Jésus, et le servirent.',
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Matthieu 4:1-11 (Les tentations de Jésus)',
      },
      jean_3_16_all: {
        success: true,
        data: [
          {
            id: 2000,
            book_id: 43,
            chapter_id: 3,
            verse_number: 16,
            text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Jean 3:16',
      },
      john_3_16_all: {
        success: true,
        data: [
          {
            id: 2001,
            book_id: 43,
            chapter_id: 3,
            verse_number: 16,
            text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Jean 3:16',
      },
      matthieu_28_19_20: {
        success: true,
        data: [
          {
            id: 2002,
            book_id: 40,
            chapter_id: 28,
            verse_number: 19,
            text: 'Allez, faites de toutes les nations des disciples, les baptisant au nom du Père, du Fils et du Saint-Esprit,',
            created_at: new Date().toISOString(),
          },
          {
            id: 2003,
            book_id: 40,
            chapter_id: 28,
            verse_number: 20,
            text: "et enseignez-leur à observer tout ce que je vous ai prescrit. Et voici, je suis avec vous tous les jours, jusqu'à la fin du monde.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Matthieu 28:19-20',
      },
      matthew_28_19_20: {
        success: true,
        data: [
          {
            id: 2004,
            book_id: 40,
            chapter_id: 28,
            verse_number: 19,
            text: 'Allez, faites de toutes les nations des disciples, les baptisant au nom du Père, du Fils et du Saint-Esprit,',
            created_at: new Date().toISOString(),
          },
          {
            id: 2005,
            book_id: 40,
            chapter_id: 28,
            verse_number: 20,
            text: "et enseignez-leur à observer tout ce que je vous ai prescrit. Et voici, je suis avec vous tous les jours, jusqu'à la fin du monde.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Matthieu 28:19-20',
      },
      psaumes_23_all_all: {
        success: true,
        data: [
          {
            id: 2006,
            book_id: 19,
            chapter_id: 23,
            verse_number: 1,
            text: "L'Éternel est mon berger: je ne manquerai de rien.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Psaume 23:1',
      },
      psaume_23_all_all: {
        success: true,
        data: [
          {
            id: 2007,
            book_id: 19,
            chapter_id: 23,
            verse_number: 1,
            text: "L'Éternel est mon berger: je ne manquerai de rien.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Psaume 23:1',
      },
      psalms_23_all_all: {
        success: true,
        data: [
          {
            id: 2008,
            book_id: 19,
            chapter_id: 23,
            verse_number: 1,
            text: "L'Éternel est mon berger: je ne manquerai de rien.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Psaume 23:1',
      },
      psalm_23_all_all: {
        success: true,
        data: [
          {
            id: 2009,
            book_id: 19,
            chapter_id: 23,
            verse_number: 1,
            text: "L'Éternel est mon berger: je ne manquerai de rien.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Psaume 23:1',
      },
      daniel_1_1_10: {
        success: true,
        data: [
          {
            id: 2010,
            book_id: 27,
            chapter_id: 1,
            verse_number: 1,
            text: 'La troisième année du règne de Jojakim, roi de Juda, Nebucadnetsar, roi de Babylone, vint assiéger Jérusalem.',
            created_at: new Date().toISOString(),
          },
          {
            id: 2011,
            book_id: 27,
            chapter_id: 1,
            verse_number: 2,
            text: 'Le Seigneur livra entre ses mains Jojakim, roi de Juda, et une partie des ustensiles de la maison de Dieu. Nebucadnetsar emporta les ustensiles au pays de Schinear, dans la maison de son dieu, il les mit dans la maison du trésor de son dieu.',
            created_at: new Date().toISOString(),
          },
          {
            id: 2012,
            book_id: 27,
            chapter_id: 1,
            verse_number: 3,
            text: "Le roi donna l'ordre à Aschpenaz, chef de ses eunuques, d'amener quelques-uns des enfants d'Israël de race royale ou de famille noble,",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Daniel 1:1-10',
      },
      sophonie_1_1_10: {
        success: true,
        data: [
          {
            id: 2013,
            book_id: 36,
            chapter_id: 1,
            verse_number: 1,
            text: "La parole de l'Éternel qui fut adressée à Sophonie, fils de Cuschi, fils de Guedalia, fils d'Amaria, fils d'Ézéchias, au temps de Josias, fils d'Amon, roi de Juda.",
            created_at: new Date().toISOString(),
          },
          {
            id: 2014,
            book_id: 36,
            chapter_id: 1,
            verse_number: 2,
            text: "Je détruirai tout sur la face de la terre, Dit l'Éternel.",
            created_at: new Date().toISOString(),
          },
          {
            id: 2015,
            book_id: 36,
            chapter_id: 1,
            verse_number: 3,
            text: "Je détruirai les hommes et les bêtes, Les oiseaux du ciel et les poissons de la mer, Les objets de scandale, et les méchants avec eux; J'exterminerai les hommes de la face de la terre, Dit l'Éternel.",
            created_at: new Date().toISOString(),
          },
        ],
        message: 'Sophonie 1:1-10',
      },
    };

    // Si on trouve dans mockData, on retourne
    if (mockData[cacheKey]) {
      return mockData[cacheKey];
    }

    // Sinon, essayons de générer automatiquement un fallback
    // Format attendu: "livre_chapitre_verset1_verset2" ou "livre_chapitre_all_all"
    const parts = cacheKey.split('_');
    if (parts.length >= 4) {
      const bookName = parts.slice(0, -3).join(' '); // Tout sauf les 3 derniers éléments
      const chapter = parseInt(parts[parts.length - 3]);
      const startVerse = parts[parts.length - 2];

      if (!isNaN(chapter) && startVerse) {
        console.log(
          `🔧 Génération automatique de fallback pour: ${bookName} ${chapter}:${startVerse}`
        );
        return this.generateFallbackVerse(
          bookName,
          chapter,
          parseInt(startVerse) || 1
        );
      }
    }

    return null;
  }

  async getBibles(
    languageCode: string = this.defaultLanguage
  ): Promise<BibleVersion[]> {
    // L'API Bible gratuite ne fournit pas de liste de Bibles
    // Retourner une version par défaut
    const defaultBible: BibleVersion = {
      id: 'kjv',
      name: 'King James Version',
      abbreviation: 'KJV',
      language: {
        code: 'eng',
        name: 'English',
      },
      description: 'Classic English Bible translation',
    };

    return [defaultBible];
  }

  async getFilesets(bibleId: string): Promise<BibleFileset[]> {
    // L'API Bible gratuite ne fournit pas de filesets
    // Retourner un fileset par défaut
    const defaultFileset: BibleFileset = {
      id: 'kjv',
      type: 'text',
      size: 'full',
    };

    return [defaultFileset];
  }

  async getVerses(
    filesetId: string,
    book: string,
    chapter: number,
    verseStart?: number,
    verseEnd?: number
  ): Promise<BibleVerse[]> {
    // Utiliser directement les données mockées pour éviter la boucle infinie
    return this.getVersesDefault(book, chapter, verseStart, verseEnd);
  }

  // Version pratique qui utilise la traduction par défaut
  async getVersesDefault(
    book: string,
    chapter: number,
    verseStart?: number,
    verseEnd?: number
  ): Promise<BibleVerse[]> {
    // Essayer d'abord les données locales
    if (this.bibleData) {
      return this.getVersesFromLocalData(book, chapter, verseStart, verseEnd);
    }

    // Fallback vers les données mockées si les données locales ne sont pas disponibles
    const normalizedBook = this.normalizeBookName(book);
    const cacheKey = `${book.toLowerCase()}_${chapter}_${verseStart || 'all'}_${verseEnd || 'all'}`;

    const mockData = this.getMockData(cacheKey);
    if (mockData && mockData.data) {
      return mockData.data.map((verse: any) => ({
        book_id: normalizedBook.toUpperCase(),
        chapter: chapter,
        verse_start: verse.verse_number,
        verse_text: verse.text,
      }));
    }

    console.warn(`📖 Aucune donnée trouvée pour: ${cacheKey}`);
    return [];
  }

  // Méthodes utilitaires pour les leçons existantes
  async getJonasVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Jonas', 1, 1, 3);
  }

  async getCreationVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Genèse', 1, 1, 3);
  }

  async getAdamEveVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Genèse', 3, 1, 15);
  }

  async getCainAbelVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Genèse', 4, 1, 16);
  }

  async getNoeVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Genèse', 6, 1, 9);
  }

  async getBabelVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Genèse', 11, 1, 9);
  }

  async getAbrahamVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Genèse', 12, 1, 25);
  }

  async getIsaacVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Genèse', 24, 1, 26);
  }

  async getIsaacSacrificeVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Genèse', 22, 1, 19);
  }

  async getJacobVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Genèse', 25, 1, 33);
  }

  async getJacobSongeVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Genèse', 28, 10, 22);
  }

  async getJosephVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Genèse', 37, 1, 50);
  }

  async getCommandementsVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Exode', 20, 1, 17);
  }

  async getTabernacleVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Exode', 25, 1, 40);
  }

  async getTerrePromiseVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Deutéronome', 34, 1, 12);
  }

  async getJosueVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Josué', 6, 1, 27);
  }

  async getGedeonVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Juges', 6, 1, 8);
  }

  async getMoiseBuissonVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Exode', 3, 1, 22);
  }

  async getPlaiesEgypteVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Exode', 7, 1, 12);
  }

  async getMerRougeVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Exode', 14, 1, 31);
  }

  async getSamsonVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Juges', 13, 1, 16);
  }

  async getSalomonVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('1 Rois', 3, 1, 8);
  }

  async getElieVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('1 Rois', 18, 1, 40);
  }

  async getEzechielVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Ézéchiel', 37, 1, 14);
  }

  async getDanielVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Daniel', 6, 1, 28);
  }

  async getNaissanceJesusVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Luc', 2, 1, 20);
  }

  async getEnfanceJesusVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Luc', 2, 41, 52);
  }

  async getBaptemeJesusVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Matthieu', 3, 1, 17);
  }

  async getTentationsJesusVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Matthieu', 4, 1, 11);
  }

  async getNativityVerses(): Promise<BibleVerse[]> {
    return this.getVersesDefault('Luc', 2, 8, 14);
  }

  // Méthode pour obtenir un verset spécifique par référence
  async getVerseByReference(reference: string): Promise<BibleVerse | null> {
    console.log(`🔍 Recherche de verset par référence: "${reference}"`);

    // Regex amélioré pour capturer les noms de livres avec accents et espaces
    const match = reference.match(/^([^\d]+?)\s+(\d+):(\d+)(?:-(\d+))?$/);
    if (!match) {
      console.log('❌ Format de référence invalide');
      return null;
    }

    const [, rawBook, ch, vStart, vEnd] = match;
    const bookName = rawBook.trim(); // Nettoyer les espaces
    console.log(
      `📖 Livre: "${bookName}", Chapitre: ${ch}, Verset: ${vStart}${vEnd ? `-${vEnd}` : ''}`
    );

    // Gestion spéciale pour les psaumes
    if (bookName.toLowerCase().includes('psaume')) {
      console.log(
        "🎵 Détection d'un psaume, utilisation de la méthode spécialisée"
      );
      const psalmNumber = parseInt(ch);
      const verses = await this.getPsalm(psalmNumber);

      // Filtrer le verset spécifique si demandé
      if (vStart) {
        const specificVerse = verses.find(
          (v) => v.verse_start === parseInt(vStart)
        );
        console.log(
          `📋 Verset spécifique trouvé: ${specificVerse ? 'Oui' : 'Non'}`
        );
        return specificVerse || null;
      }

      console.log(`📋 ${verses.length} versets du psaume trouvés`);
      return verses[0] || null;
    }

    // Gestion spéciale pour Romains (debug)
    if (bookName.toLowerCase().includes('romains')) {
      console.log('📖 Détection de Romains, debug spécial activé');
      console.log('🔍 Recherche avec différents noms possibles...');

      // Essayer différents noms possibles
      const possibleNames = ['Romains', 'Romans', 'ROMAINS', 'ROMANS'];

      for (const name of possibleNames) {
        console.log(`🔄 Test avec le nom: "${name}"`);
        const verses = await this.getVersesFromLocalData(
          name,
          parseInt(ch),
          parseInt(vStart),
          vEnd ? parseInt(vEnd) : undefined
        );

        if (verses.length > 0) {
          console.log(`✅ Versets trouvés avec "${name}": ${verses.length}`);
          return verses[0];
        } else {
          console.log(`❌ Aucun verset trouvé avec "${name}"`);
        }
      }

      console.log('⚠️ Aucun verset trouvé avec aucun nom testé');
      return null;
    }

    // Gestion spéciale pour Jean (debug)
    if (bookName.toLowerCase().includes('jean')) {
      console.log('📖 Détection de Jean, debug spécial activé');
      console.log('🔍 Recherche avec différents noms possibles...');

      // Essayer différents noms possibles
      const possibleNames = ['Jean', 'John', 'JEAN', 'JOHN'];

      for (const name of possibleNames) {
        console.log(`🔄 Test avec le nom: "${name}"`);
        const verses = await this.getVersesFromLocalData(
          name,
          parseInt(ch),
          parseInt(vStart),
          vEnd ? parseInt(vEnd) : undefined
        );

        if (verses.length > 0) {
          console.log(`✅ Versets trouvés avec "${name}": ${verses.length}`);
          return verses[0];
        } else {
          console.log(`❌ Aucun verset trouvé avec "${name}"`);
        }
      }

      console.log('⚠️ Aucun verset trouvé avec aucun nom testé');
      return null;
    }

    // Gestion spéciale pour Matthieu (debug)
    if (bookName.toLowerCase().includes('matthieu')) {
      console.log('📖 Détection de Matthieu, debug spécial activé');
      console.log('🔍 Recherche avec différents noms possibles...');

      // Essayer différents noms possibles
      const possibleNames = ['Matthieu', 'Matthew', 'MATTHIEU', 'MATTHEW'];

      for (const name of possibleNames) {
        console.log(`🔄 Test avec le nom: "${name}"`);
        const verses = await this.getVersesFromLocalData(
          name,
          parseInt(ch),
          parseInt(vStart),
          vEnd ? parseInt(vEnd) : undefined
        );

        if (verses.length > 0) {
          console.log(`✅ Versets trouvés avec "${name}": ${verses.length}`);
          return verses[0];
        } else {
          console.log(`❌ Aucun verset trouvé avec "${name}"`);
        }
      }

      console.log('⚠️ Aucun verset trouvé avec aucun nom testé');
      return null;
    }

    // Gestion spéciale pour Jonas (debug)
    if (bookName.toLowerCase().includes('jonas')) {
      console.log('📖 Détection de Jonas, debug spécial activé');
      console.log('🔍 Recherche avec différents noms possibles...');

      // Essayer différents noms possibles
      const possibleNames = ['Jonas', 'Jonah', 'JONAS', 'JONAH'];

      for (const name of possibleNames) {
        console.log(`🔄 Test avec le nom: "${name}"`);
        const verses = await this.getVersesFromLocalData(
          name,
          parseInt(ch),
          parseInt(vStart),
          vEnd ? parseInt(vEnd) : undefined
        );

        if (verses.length > 0) {
          console.log(`✅ Versets trouvés avec "${name}": ${verses.length}`);
          return verses[0];
        } else {
          console.log(`❌ Aucun verset trouvé avec "${name}"`);
        }
      }

      console.log('⚠️ Aucun verset trouvé avec aucun nom testé');
      return null;
    }

    // Gestion spéciale pour Philippiens (debug)
    if (bookName.toLowerCase().includes('philippiens')) {
      console.log('📖 Détection de Philippiens, debug spécial activé');
      console.log('🔍 Recherche avec différents noms possibles...');

      // Essayer différents noms possibles
      const possibleNames = [
        'Philippiens',
        'Philippians',
        'PHILIPPIENS',
        'PHILIPPIANS',
      ];

      for (const name of possibleNames) {
        console.log(`🔄 Test avec le nom: "${name}"`);
        const verses = await this.getVersesFromLocalData(
          name,
          parseInt(ch),
          parseInt(vStart),
          vEnd ? parseInt(vEnd) : undefined
        );

        if (verses.length > 0) {
          console.log(`✅ Versets trouvés avec "${name}": ${verses.length}`);
          return verses[0];
        } else {
          console.log(`❌ Aucun verset trouvé avec "${name}"`);
        }
      }

      console.log('⚠️ Aucun verset trouvé avec aucun nom testé');
      return null;
    }

    const normalizedBook = this.normalizeBookName(bookName);
    console.log(`🔄 Livre normalisé: "${normalizedBook}"`);

    const verses = await this.getVersesDefault(
      normalizedBook,
      parseInt(ch),
      parseInt(vStart),
      vEnd ? parseInt(vEnd) : undefined
    );

    console.log(`📋 ${verses.length} versets trouvés`);
    if (verses.length > 0) {
      console.log(
        `✅ Premier verset: ${verses[0].book_id} ${verses[0].chapter}:${verses[0].verse_start}`
      );
    }

    return verses[0] || null;
  }
}

// Instance singleton
export const bibleApi = new BibleApiService();
export type { BibleVersion, BibleVerse, BibleFileset };
