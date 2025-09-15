// Service pour les textes grecs de la Septante (LXX Rahlfs 1935)
// Basé sur le dépôt: https://github.com/eliranwong/LXX-Rahlfs-1935

interface LXXVerse {
  book_id: string;
  chapter: number;
  verse: number;
  greek_text: string;
  transliteration?: string;
  strong_numbers?: string[];
  morphology?: string;
}

interface LXXBook {
  id: string;
  name_french: string;
  name_greek: string;
  abbreviation: string;
  category: 'pentateuque' | 'historiques' | 'poetiques' | 'prophetiques';
}

class LXXApiService {
  private cache = new Map<string, any>();

  // Données de base pour les livres LXX
  private books: LXXBook[] = [
    { id: 'Gen', name_french: 'Genèse', name_greek: 'Γένεσις', abbreviation: 'Gn', category: 'pentateuque' },
    { id: 'Exod', name_french: 'Exode', name_greek: 'Ἔξοδος', abbreviation: 'Ex', category: 'pentateuque' },
    { id: 'Lev', name_french: 'Lévitique', name_greek: 'Λευιτικόν', abbreviation: 'Lv', category: 'pentateuque' },
    { id: 'Num', name_french: 'Nombres', name_greek: 'Ἀριθμοί', abbreviation: 'Nb', category: 'pentateuque' },
    { id: 'Deut', name_french: 'Deutéronome', name_greek: 'Δευτερονόμιον', abbreviation: 'Dt', category: 'pentateuque' },
    { id: 'Josh', name_french: 'Josué', name_greek: 'Ἰησοῦς', abbreviation: 'Jos', category: 'historiques' },
    { id: 'Judg', name_french: 'Juges', name_greek: 'Κριταί', abbreviation: 'Jg', category: 'historiques' },
    { id: 'Ruth', name_french: 'Ruth', name_greek: 'Ῥούθ', abbreviation: 'Rt', category: 'historiques' },
    { id: '1Sam', name_french: '1 Samuel', name_greek: 'Βασιλειῶν Αʹ', abbreviation: '1S', category: 'historiques' },
    { id: '2Sam', name_french: '2 Samuel', name_greek: 'Βασιλειῶν Βʹ', abbreviation: '2S', category: 'historiques' },
    { id: 'Jon', name_french: 'Jonas', name_greek: 'Ἰωνᾶς', abbreviation: 'Jon', category: 'prophetiques' }
  ];

  // Données de démonstration pour Genèse 1:1-3 (tirées des données LXX)
  private mockGreekVerses: Record<string, LXXVerse[]> = {
    'genesis_1_1-3': [
      {
        book_id: 'Gen',
        chapter: 1,
        verse: 1,
        greek_text: 'ἐν ἀρχῇ ἐποίησεν ὁ θεὸς τὸν οὐρανὸν καὶ τὴν γῆν',
        transliteration: 'en archē epoiēsen ho theos ton ouranon kai tēn gēn',
        strong_numbers: ['1722', '746', '4160', '2316', '3772', '1093'],
        morphology: 'P N.DSF V.AAI3S RA.NSM N.NSM RA.ASM N.ASM C RA.ASF N.ASF'
      },
      {
        book_id: 'Gen',
        chapter: 1,
        verse: 2,
        greek_text: 'ἡ δὲ γῆ ἦν ἀόρατος καὶ ἀκατασκεύαστος καὶ σκότος ἐπάνω τῆς ἀβύσσου καὶ πνεῦμα θεοῦ ἐπεφέρετο ἐπάνω τοῦ ὕδατος',
        transliteration: 'hē de gē ēn aoratos kai akataskeuastos kai skotos epanō tēs abyssou kai pneuma theou epephereto epanō tou hydatos',
        strong_numbers: ['3588', '1161', '1093', '1510', '517', '2532', '4655', '1883', '12', '4151', '2316', '2018', '5204'],
        morphology: 'RA.NSF X N.NSF V.IAI3S A.NSM C A.NSM C N.NSN P RA.GSF N.GSF C N.NSN N.GSM V.IMI3S P RA.GSN N.GSN'
      },
      {
        book_id: 'Gen',
        chapter: 1,
        verse: 3,
        greek_text: 'καὶ εἶπεν ὁ θεός γενηθήτω φῶς καὶ ἐγένετο φῶς',
        transliteration: 'kai eipen ho theos genēthētō phōs kai egeneto phōs',
        strong_numbers: ['2532', '2036', '3588', '2316', '1096', '5457', '1096'],
        morphology: 'C V.AAI3S RA.NSM N.NSM V.APD3S N.NSN C V.AMI3S N.NSN'
      }
    ],
    'jonas_1_1-3': [
      {
        book_id: 'Jon',
        chapter: 1,
        verse: 1,
        greek_text: 'καὶ ἐγένετο λόγος κυρίου πρὸς Ἰωναν υἱὸν Ἀμαθι λέγων',
        transliteration: 'kai egeneto logos kyriou pros Iōnan huion Amathi legōn',
        strong_numbers: ['2532', '1096', '3056', '2962', '4314', '2495', '5207'],
        morphology: 'C V.AMI3S N.NSM N.GSM P N.ASM N.ASM N.GSM V.PAPNSM'
      },
      {
        book_id: 'Jon',
        chapter: 1,
        verse: 2,
        greek_text: 'ἀνάστηθι καὶ πορεύθητι εἰς Νινευη τὴν πόλιν τὴν μεγάλην καὶ κήρυξον ἐν αὐτῇ ὅτι ἀνέβη ἡ κραυγὴ τῆς κακίας αὐτῆς πρὸς μέ',
        transliteration: 'anastēthi kai poreuthēti eis Nineuē tēn polin tēn megalēn kai kēryxon en autē hoti anebē hē kraugē tēs kakias autēs pros me',
        strong_numbers: ['450', '2532', '4198', '1519', '3535', '4172', '3173', '2784', '1722', '846', '3754', '305', '2906', '2549'],
        morphology: 'V.AMD2S C V.APD2S P N.ASF RA.ASF N.ASF RA.ASF A.ASF C V.AAD2S P RD.DSF C V.AAI3S RA.NSF N.NSF RA.GSF N.GSF RD.GSF P RP.AS'
      },
      {
        book_id: 'Jon',
        chapter: 1,
        verse: 3,
        greek_text: 'καὶ ἀνέστη Ἰωνας τοῦ φυγεῖν εἰς Θαρσις ἐκ προσώπου κυρίου καὶ κατέβη εἰς Ἰόππην καὶ εὗρεν πλοῖον πορευόμενον εἰς Θαρσις',
        transliteration: 'kai anestē Iōnas tou phygein eis Tharsis ek prosōpou kyriou kai katebē eis Ioppēn kai heuren ploion poreuomenon eis Tharsis',
        strong_numbers: ['2532', '450', '2495', '5343', '1519', '2659', '1537', '4383', '2962', '2597', '2445', '2147', '4143', '4198'],
        morphology: 'C V.AAI3S N.NSM RA.GSN V.PAN P N.ASF P N.GSN N.GSM C V.AAI3S P N.ASF C V.AAI3S N.ASN V.PAPASN P N.ASF'
      }
    ]
  };

  private parseGreekVerse(rawVerse: string): LXXVerse | null {
    // Parser pour les données du format LXX (colonnes: book_id, chapter, verse, text_with_morphology)
    const parts = rawVerse.split('\t');
    if (parts.length < 4) return null;

    const [bookNum, chapter, verse, greekData] = parts;
    
    // Extraire le texte grec simple (sans les annotations morphologiques)
    const greekText = greekData.replace(/<S>[^<]*<\/S>/g, '') // Supprimer Strong numbers
                               .replace(/<m>[^<]*<\/m>/g, '') // Supprimer morphologie
                               .replace(/\s+/g, ' ')         // Normaliser espaces
                               .trim();

    return {
      book_id: this.getBookIdFromNumber(parseInt(bookNum)),
      chapter: parseInt(chapter),
      verse: parseInt(verse),
      greek_text: greekText,
      transliteration: undefined, // À implémenter si nécessaire
      strong_numbers: this.extractStrongNumbers(greekData),
      morphology: this.extractMorphology(greekData)
    };
  }

  private getBookIdFromNumber(bookNum: number): string {
    // Mapping des numéros de livres LXX vers les IDs
    const bookMapping: Record<number, string> = {
      10: 'Gen',
      20: 'Exod',
      // ... mapping complet à implémenter
      360: 'Jon' // Jonas
    };
    return bookMapping[bookNum] || 'Unknown';
  }

  private extractStrongNumbers(greekData: string): string[] {
    const matches = greekData.match(/<S>([^<]*)<\/S>/g);
    if (!matches) return [];
    return matches.map(match => match.replace(/<\/?S>/g, ''));
  }

  private extractMorphology(greekData: string): string {
    const matches = greekData.match(/<m>([^<]*)<\/m>/g);
    if (!matches) return '';
    return matches.map(match => match.replace(/<\/?m>/g, '')).join(' ');
  }

  async getBooks(): Promise<LXXBook[]> {
    return this.books;
  }

  async getGreekVerses(
    book: string,
    chapter: number,
    verseStart?: number,
    verseEnd?: number
  ): Promise<LXXVerse[]> {
    const cacheKey = `${book.toLowerCase()}_${chapter}${verseStart ? `_${verseStart}` : ''}${verseEnd ? `-${verseEnd}` : ''}`;
    
    // Vérifier le cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Pour l'instant, utiliser les données de démonstration
    const mockKey = `${book.toLowerCase()}_${chapter}_${verseStart || 1}-${verseEnd || 3}`;
    const verses = this.mockGreekVerses[mockKey] || [];

    // Filtrer par verset si spécifié
    let filteredVerses = verses;
    if (verseStart) {
      filteredVerses = verses.filter(v => {
        if (verseEnd) {
          return v.verse >= verseStart && v.verse <= verseEnd;
        }
        return v.verse === verseStart;
      });
    }

    // Mettre en cache
    this.cache.set(cacheKey, filteredVerses);
    
    return filteredVerses;
  }

  // Méthodes utilitaires pour les leçons existantes
  async getCreationGreekVerses(): Promise<LXXVerse[]> {
    return this.getGreekVerses('genesis', 1, 1, 3);
  }

  async getJonasGreekVerses(): Promise<LXXVerse[]> {
    return this.getGreekVerses('jonas', 1, 1, 3);
  }

  // Méthode pour comparer grec/français
  async getParallelText(book: string, chapter: number, verse: number): Promise<{
    greek: LXXVerse | null;
    french: string | null;
  }> {
    const greekVerses = await this.getGreekVerses(book, chapter, verse, verse);
    const greekVerse = greekVerses[0] || null;

    // Ici on pourrait intégrer avec le service bibleApi existant pour le français
    const frenchVerse = null; // À implémenter

    return {
      greek: greekVerse,
      french: frenchVerse
    };
  }

  // Méthode pour obtenir la translittération d'un mot grec
  getTransliteration(greekWord: string): string {
    // Mapping de base grec vers latin (simplifié)
    const greekToLatin: Record<string, string> = {
      'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z',
      'η': 'ē', 'θ': 'th', 'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm',
      'ν': 'n', 'ξ': 'x', 'ο': 'o', 'π': 'p', 'ρ': 'r', 'σ': 's',
      'τ': 't', 'υ': 'y', 'φ': 'ph', 'χ': 'ch', 'ψ': 'ps', 'ω': 'ō',
      'ἀ': 'a', 'ἁ': 'ha', 'ἐ': 'e', 'ἑ': 'he', 'ἠ': 'ē', 'ἡ': 'hē',
      'ἰ': 'i', 'ἱ': 'hi', 'ὀ': 'o', 'ὁ': 'ho', 'ὐ': 'y', 'ὑ': 'hy',
      'ὠ': 'ō', 'ὡ': 'hō'
    };

    return greekWord.split('').map(char => greekToLatin[char] || char).join('');
  }
}

// Instance singleton
export const lxxApi = new LXXApiService();
export type { LXXVerse, LXXBook };
