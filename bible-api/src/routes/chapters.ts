import { Router, Request, Response } from 'express';
import { ApiResponse, ChapterInfo, BibleVerse } from '../types';
import { generalRateLimit } from '../middleware/rate-limit';
import { validateChapterParams } from '../middleware/validation';
import { isValidBookId, isValidChapter } from '../middleware/validation';
import bibleData from '../db/bible.json';

const router = Router();

// Appliquer le rate limiting et la validation
router.use(generalRateLimit);

// GET /api/books/:bookId/chapters/:chapter - Récupère un chapitre spécifique
router.get('/:bookId/chapters/:chapter', validateChapterParams, (req: Request, res: Response) => {
  try {
    const { bookId, chapter } = req.params;
    
    // Valider l'ID du livre
    if (!isValidBookId(bookId)) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'Livre invalide',
        message: `Le livre "${bookId}" n'existe pas`
      };
      return res.status(400).json(errorResponse);
    }
    
    // Valider le numéro de chapitre
    if (!isValidChapter(bookId, chapter)) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'Chapitre invalide',
        message: `Le chapitre ${chapter} n'existe pas dans le livre ${bookId}`
      };
      return res.status(400).json(errorResponse);
    }
    
    // Récupérer les données de la Bible
    const bible = bibleData as any;
    const bookName = getBookName(bookId);
    
    if (!bible[bookName] || !bible[bookName][chapter.toString()]) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'Chapitre non trouvé',
        message: `Le chapitre ${chapter} du livre ${bookName} n'existe pas`
      };
      return res.status(404).json(errorResponse);
    }
    
    // Convertir les versets au format attendu
    const verses: BibleVerse[] = Object.entries(bible[bookName][chapter.toString()])
      .map(([verseNumber, text]) => ({
        verset: `${bookName} ${chapter}:${verseNumber}`,
        texte: text as string
      }))
      .sort((a, b) => {
        const verseA = parseInt(a.verset.split(':')[1]);
        const verseB = parseInt(b.verset.split(':')[1]);
        return verseA - verseB;
      });
    
    const chapterInfo: ChapterInfo = {
      book: bookName,
      chapter: chapter,
      verses: verses
    };
    
    const response: ApiResponse<ChapterInfo> = {
      success: true,
      data: chapterInfo,
      message: `Chapitre ${chapter} du livre ${bookName} (${verses.length} versets)`
    };
    
    res.json(response);
  } catch (error) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Erreur lors de la récupération du chapitre',
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    };
    
    res.status(500).json(errorResponse);
  }
});

// Fonction utilitaire pour convertir l'ID du livre en nom
function getBookName(bookId: string): string {
  const bookNames: { [key: string]: string } = {
    'genese': 'Genèse',
    'exode': 'Exode',
    'levitique': 'Lévitique',
    'nombres': 'Nombres',
    'deuteronome': 'Deutéronome',
    'josue': 'Josué',
    'juges': 'Juges',
    'ruth': 'Ruth',
    '1-samuel': '1 Samuel',
    '2-samuel': '2 Samuel',
    '1-rois': '1 Rois',
    '2-rois': '2 Rois',
    '1-chroniques': '1 Chroniques',
    '2-chroniques': '2 Chroniques',
    'esdras': 'Esdras',
    'nehemie': 'Néhémie',
    'esther': 'Esther',
    'job': 'Job',
    'psaumes': 'Psaumes',
    'proverbes': 'Proverbes',
    'ecclesiaste': 'Ecclésiaste',
    'cantique': 'Cantique des Cantiques',
    'esaie': 'Ésaïe',
    'jeremie': 'Jérémie',
    'lamentations': 'Lamentations',
    'ezechiel': 'Ézéchiel',
    'daniel': 'Daniel',
    'osee': 'Osée',
    'joel': 'Joël',
    'amos': 'Amos',
    'abdias': 'Abdias',
    'jonas': 'Jonas',
    'michee': 'Michée',
    'nahum': 'Nahum',
    'habacuc': 'Habacuc',
    'sophonie': 'Sophonie',
    'aggee': 'Aggée',
    'zacharie': 'Zacharie',
    'malachie': 'Malachie',
    'matthieu': 'Matthieu',
    'marc': 'Marc',
    'luc': 'Luc',
    'jean': 'Jean',
    'actes': 'Actes',
    'romains': 'Romains',
    '1-corinthiens': '1 Corinthiens',
    '2-corinthiens': '2 Corinthiens',
    'galates': 'Galates',
    'ephesiens': 'Éphésiens',
    'philippiens': 'Philippiens',
    'colossiens': 'Colossiens',
    '1-thessaloniciens': '1 Thessaloniciens',
    '2-thessaloniciens': '2 Thessaloniciens',
    '1-timothee': '1 Timothée',
    '2-timothee': '2 Timothée',
    'tite': 'Tite',
    'philemon': 'Philémon',
    'hebreux': 'Hébreux',
    'jacques': 'Jacques',
    '1-pierre': '1 Pierre',
    '2-pierre': '2 Pierre',
    '1-jean': '1 Jean',
    '2-jean': '2 Jean',
    '3-jean': '3 Jean',
    'jude': 'Jude',
    'apocalypse': 'Apocalypse'
  };
  
  return bookNames[bookId.toLowerCase()] || bookId;
}

export default router;
