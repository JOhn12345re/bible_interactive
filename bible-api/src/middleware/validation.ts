import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ApiResponse } from '../types';

// Schémas de validation
export const searchSchema = z.object({
  q: z.string().min(1, 'Le terme de recherche est requis').max(100, 'Le terme de recherche est trop long'),
  limit: z.coerce.number().min(1).max(50).optional().default(10),
  offset: z.coerce.number().min(0).optional().default(0)
});

export const verseParamsSchema = z.object({
  bookId: z.string().min(1, 'L\'ID du livre est requis'),
  chapter: z.coerce.number().min(1, 'Le numéro de chapitre doit être positif'),
  verse: z.coerce.number().min(1, 'Le numéro de verset doit être positif').optional()
});

export const chapterParamsSchema = z.object({
  bookId: z.string().min(1, 'L\'ID du livre est requis'),
  chapter: z.coerce.number().min(1, 'Le numéro de chapitre doit être positif')
});

export const topicParamsSchema = z.object({
  slug: z.string().min(1, 'Le slug du thème est requis').regex(/^[a-z-]+$/, 'Le slug doit contenir uniquement des lettres minuscules et des tirets')
});

// Middleware de validation générique
export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Valider les paramètres de la route
      if (req.params && Object.keys(req.params).length > 0) {
        req.params = schema.parse(req.params);
      }
      
      // Valider les paramètres de requête
      if (req.query && Object.keys(req.query).length > 0) {
        req.query = schema.parse(req.query);
      }
      
      // Valider le corps de la requête
      if (req.body && Object.keys(req.body).length > 0) {
        req.body = schema.parse(req.body);
      }
      
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorResponse: ApiResponse<null> = {
          success: false,
          error: 'Erreur de validation',
          message: error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')
        };
        
        return res.status(400).json(errorResponse);
      }
      
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'Erreur de validation inattendue'
      };
      
      return res.status(500).json(errorResponse);
    }
  };
};

// Middleware de validation pour les paramètres de recherche
export const validateSearch = validateRequest(searchSchema);

// Middleware de validation pour les paramètres de verset
export const validateVerseParams = validateRequest(verseParamsSchema);

// Middleware de validation pour les paramètres de chapitre
export const validateChapterParams = validateRequest(chapterParamsSchema);

// Middleware de validation pour les paramètres de thème
export const validateTopicParams = validateRequest(topicParamsSchema);

// Fonction utilitaire pour valider un ID de livre
export const isValidBookId = (bookId: string): boolean => {
  const validBookIds = [
    'genese', 'exode', 'levitique', 'nombres', 'deuteronome',
    'josue', 'juges', 'ruth', '1-samuel', '2-samuel',
    '1-rois', '2-rois', '1-chroniques', '2-chroniques',
    'esdras', 'nehemie', 'esther', 'job', 'psaumes',
    'proverbes', 'ecclesiaste', 'cantique', 'esaie',
    'jeremie', 'lamentations', 'ezechiel', 'daniel',
    'osee', 'joel', 'amos', 'abdias', 'jonas',
    'michee', 'nahum', 'habacuc', 'sophonie',
    'aggee', 'zacharie', 'malachie', 'matthieu',
    'marc', 'luc', 'jean', 'actes', 'romains',
    '1-corinthiens', '2-corinthiens', 'galates',
    'ephesiens', 'philippiens', 'colossiens',
    '1-thessaloniciens', '2-thessaloniciens',
    '1-timothee', '2-timothee', 'tite', 'philemon',
    'hebreux', 'jacques', '1-pierre', '2-pierre',
    '1-jean', '2-jean', '3-jean', 'jude', 'apocalypse'
  ];
  
  return validBookIds.includes(bookId.toLowerCase());
};

// Fonction utilitaire pour valider un numéro de chapitre
export const isValidChapter = (bookId: string, chapter: number): boolean => {
  const chapterLimits: { [key: string]: number } = {
    'genese': 50, 'exode': 40, 'levitique': 27, 'nombres': 36, 'deuteronome': 34,
    'josue': 24, 'juges': 21, 'ruth': 4, '1-samuel': 31, '2-samuel': 24,
    '1-rois': 22, '2-rois': 25, '1-chroniques': 29, '2-chroniques': 36,
    'esdras': 10, 'nehemie': 13, 'esther': 10, 'job': 42, 'psaumes': 150,
    'proverbes': 31, 'ecclesiaste': 12, 'cantique': 8, 'esaie': 66,
    'jeremie': 52, 'lamentations': 5, 'ezechiel': 48, 'daniel': 12,
    'osee': 14, 'joel': 3, 'amos': 9, 'abdias': 1, 'jonas': 4,
    'michee': 7, 'nahum': 3, 'habacuc': 3, 'sophonie': 3,
    'aggee': 2, 'zacharie': 14, 'malachie': 4, 'matthieu': 28,
    'marc': 16, 'luc': 24, 'jean': 21, 'actes': 28, 'romains': 16,
    '1-corinthiens': 16, '2-corinthiens': 13, 'galates': 6,
    'ephesiens': 6, 'philippiens': 4, 'colossiens': 4,
    '1-thessaloniciens': 5, '2-thessaloniciens': 3,
    '1-timothee': 6, '2-timothee': 4, 'tite': 3, 'philemon': 1,
    'hebreux': 13, 'jacques': 5, '1-pierre': 5, '2-pierre': 3,
    '1-jean': 5, '2-jean': 1, '3-jean': 1, 'jude': 1, 'apocalypse': 22
  };
  
  const maxChapters = chapterLimits[bookId.toLowerCase()];
  return maxChapters ? chapter <= maxChapters : false;
};
