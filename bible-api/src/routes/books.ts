import { Router, Request, Response } from 'express';
import { ApiResponse, BookInfo } from '../types';
import { generalRateLimit } from '../middleware/rate-limit';

const router = Router();

// Appliquer le rate limiting
router.use(generalRateLimit);

// Liste des livres bibliques disponibles
const books: BookInfo[] = [
  {
    id: 'genese',
    name: 'Genèse',
    chapters: 50,
    description: 'Le livre de la création et des origines'
  },
  {
    id: 'exode',
    name: 'Exode',
    chapters: 40,
    description: 'La sortie d\'Égypte et la loi'
  },
  {
    id: 'levitique',
    name: 'Lévitique',
    chapters: 27,
    description: 'Les lois et les sacrifices'
  },
  {
    id: 'nombres',
    name: 'Nombres',
    chapters: 36,
    description: 'Le voyage dans le désert'
  },
  {
    id: 'deuteronome',
    name: 'Deutéronome',
    chapters: 34,
    description: 'La seconde loi'
  },
  {
    id: 'josue',
    name: 'Josué',
    chapters: 24,
    description: 'La conquête de Canaan'
  },
  {
    id: 'juges',
    name: 'Juges',
    chapters: 21,
    description: 'Les juges d\'Israël'
  },
  {
    id: 'ruth',
    name: 'Ruth',
    chapters: 4,
    description: 'L\'histoire de Ruth'
  },
  {
    id: '1-samuel',
    name: '1 Samuel',
    chapters: 31,
    description: 'Samuel et Saül'
  },
  {
    id: '2-samuel',
    name: '2 Samuel',
    chapters: 24,
    description: 'Le règne de David'
  },
  {
    id: '1-rois',
    name: '1 Rois',
    chapters: 22,
    description: 'Salomon et la division du royaume'
  },
  {
    id: '2-rois',
    name: '2 Rois',
    chapters: 25,
    description: 'La fin des royaumes'
  },
  {
    id: '1-chroniques',
    name: '1 Chroniques',
    chapters: 29,
    description: 'L\'histoire d\'Israël'
  },
  {
    id: '2-chroniques',
    name: '2 Chroniques',
    chapters: 36,
    description: 'L\'histoire de Juda'
  },
  {
    id: 'esdras',
    name: 'Esdras',
    chapters: 10,
    description: 'Le retour de l\'exil'
  },
  {
    id: 'nehemie',
    name: 'Néhémie',
    chapters: 13,
    description: 'La reconstruction de Jérusalem'
  },
  {
    id: 'esther',
    name: 'Esther',
    chapters: 10,
    description: 'L\'histoire d\'Esther'
  },
  {
    id: 'job',
    name: 'Job',
    chapters: 42,
    description: 'La souffrance et la foi'
  },
  {
    id: 'psaumes',
    name: 'Psaumes',
    chapters: 150,
    description: 'Les chants et prières'
  },
  {
    id: 'proverbes',
    name: 'Proverbes',
    chapters: 31,
    description: 'La sagesse pratique'
  },
  {
    id: 'ecclesiaste',
    name: 'Ecclésiaste',
    chapters: 12,
    description: 'La vanité de la vie'
  },
  {
    id: 'cantique',
    name: 'Cantique des Cantiques',
    chapters: 8,
    description: 'Le cantique d\'amour'
  },
  {
    id: 'esaie',
    name: 'Ésaïe',
    chapters: 66,
    description: 'Le prophète de la rédemption'
  },
  {
    id: 'jeremie',
    name: 'Jérémie',
    chapters: 52,
    description: 'Le prophète des larmes'
  },
  {
    id: 'lamentations',
    name: 'Lamentations',
    chapters: 5,
    description: 'Les lamentations de Jérémie'
  },
  {
    id: 'ezechiel',
    name: 'Ézéchiel',
    chapters: 48,
    description: 'Le prophète de l\'exil'
  },
  {
    id: 'daniel',
    name: 'Daniel',
    chapters: 12,
    description: 'Les visions de Daniel'
  },
  {
    id: 'osee',
    name: 'Osée',
    chapters: 14,
    description: 'L\'amour de Dieu'
  },
  {
    id: 'joel',
    name: 'Joël',
    chapters: 3,
    description: 'Le jour de l\'Éternel'
  },
  {
    id: 'amos',
    name: 'Amos',
    chapters: 9,
    description: 'La justice sociale'
  },
  {
    id: 'abdias',
    name: 'Abdias',
    chapters: 1,
    description: 'Le jugement d\'Édom'
  },
  {
    id: 'jonas',
    name: 'Jonas',
    chapters: 4,
    description: 'La mission à Ninive'
  },
  {
    id: 'michee',
    name: 'Michée',
    chapters: 7,
    description: 'Le prophète de la justice'
  },
  {
    id: 'nahum',
    name: 'Nahum',
    chapters: 3,
    description: 'Le jugement de Ninive'
  },
  {
    id: 'habacuc',
    name: 'Habacuc',
    chapters: 3,
    description: 'La foi dans l\'épreuve'
  },
  {
    id: 'sophonie',
    name: 'Sophonie',
    chapters: 3,
    description: 'Le jour de l\'Éternel'
  },
  {
    id: 'aggee',
    name: 'Aggée',
    chapters: 2,
    description: 'La reconstruction du temple'
  },
  {
    id: 'zacharie',
    name: 'Zacharie',
    chapters: 14,
    description: 'Les visions de Zacharie'
  },
  {
    id: 'malachie',
    name: 'Malachie',
    chapters: 4,
    description: 'Le dernier prophète'
  },
  {
    id: 'matthieu',
    name: 'Matthieu',
    chapters: 28,
    description: 'L\'Évangile du royaume'
  },
  {
    id: 'marc',
    name: 'Marc',
    chapters: 16,
    description: 'L\'Évangile du serviteur'
  },
  {
    id: 'luc',
    name: 'Luc',
    chapters: 24,
    description: 'L\'Évangile du Fils de l\'homme'
  },
  {
    id: 'jean',
    name: 'Jean',
    chapters: 21,
    description: 'L\'Évangile du Fils de Dieu'
  },
  {
    id: 'actes',
    name: 'Actes des Apôtres',
    chapters: 28,
    description: 'L\'histoire de l\'Église primitive'
  },
  {
    id: 'romains',
    name: 'Romains',
    chapters: 16,
    description: 'L\'Évangile de la justification'
  },
  {
    id: '1-corinthiens',
    name: '1 Corinthiens',
    chapters: 16,
    description: 'L\'Église et ses problèmes'
  },
  {
    id: '2-corinthiens',
    name: '2 Corinthiens',
    chapters: 13,
    description: 'Le ministère de Paul'
  },
  {
    id: 'galates',
    name: 'Galates',
    chapters: 6,
    description: 'La liberté en Christ'
  },
  {
    id: 'ephesiens',
    name: 'Éphésiens',
    chapters: 6,
    description: 'L\'Église, corps de Christ'
  },
  {
    id: 'philippiens',
    name: 'Philippiens',
    chapters: 4,
    description: 'La joie en Christ'
  },
  {
    id: 'colossiens',
    name: 'Colossiens',
    chapters: 4,
    description: 'La prééminence de Christ'
  },
  {
    id: '1-thessaloniciens',
    name: '1 Thessaloniciens',
    chapters: 5,
    description: 'L\'espérance du retour de Christ'
  },
  {
    id: '2-thessaloniciens',
    name: '2 Thessaloniciens',
    chapters: 3,
    description: 'Le jour du Seigneur'
  },
  {
    id: '1-timothee',
    name: '1 Timothée',
    chapters: 6,
    description: 'L\'organisation de l\'Église'
  },
  {
    id: '2-timothee',
    name: '2 Timothée',
    chapters: 4,
    description: 'Le testament de Paul'
  },
  {
    id: 'tite',
    name: 'Tite',
    chapters: 3,
    description: 'L\'ordre dans l\'Église'
  },
  {
    id: 'philemon',
    name: 'Philémon',
    chapters: 1,
    description: 'L\'amour fraternel'
  },
  {
    id: 'hebreux',
    name: 'Hébreux',
    chapters: 13,
    description: 'La supériorité de Christ'
  },
  {
    id: 'jacques',
    name: 'Jacques',
    chapters: 5,
    description: 'La foi en action'
  },
  {
    id: '1-pierre',
    name: '1 Pierre',
    chapters: 5,
    description: 'L\'espérance dans la souffrance'
  },
  {
    id: '2-pierre',
    name: '2 Pierre',
    chapters: 3,
    description: 'La connaissance de Christ'
  },
  {
    id: '1-jean',
    name: '1 Jean',
    chapters: 5,
    description: 'L\'amour de Dieu'
  },
  {
    id: '2-jean',
    name: '2 Jean',
    chapters: 1,
    description: 'La vérité et l\'amour'
  },
  {
    id: '3-jean',
    name: '3 Jean',
    chapters: 1,
    description: 'L\'hospitalité chrétienne'
  },
  {
    id: 'jude',
    name: 'Jude',
    chapters: 1,
    description: 'La défense de la foi'
  },
  {
    id: 'apocalypse',
    name: 'Apocalypse',
    chapters: 22,
    description: 'La révélation de Jésus-Christ'
  }
];

// GET /api/books - Liste tous les livres
router.get('/', (req: Request, res: Response) => {
  try {
    const response: ApiResponse<BookInfo[]> = {
      success: true,
      data: books,
      message: `${books.length} livres bibliques disponibles`
    };
    
    res.json(response);
  } catch (error) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Erreur lors de la récupération des livres',
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    };
    
    res.status(500).json(errorResponse);
  }
});

// GET /api/books/:bookId - Informations sur un livre spécifique
router.get('/:bookId', (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const book = books.find(b => b.id === bookId.toLowerCase());
    
    if (!book) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'Livre non trouvé',
        message: `Le livre avec l'ID "${bookId}" n'existe pas`
      };
      
      return res.status(404).json(errorResponse);
    }
    
    const response: ApiResponse<BookInfo> = {
      success: true,
      data: book,
      message: `Informations sur le livre ${book.name}`
    };
    
    res.json(response);
  } catch (error) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Erreur lors de la récupération du livre',
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    };
    
    res.status(500).json(errorResponse);
  }
});

export default router;
