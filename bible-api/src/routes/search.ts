import { Router, Request, Response } from 'express';
import { ApiResponse, SearchResult, SearchParams } from '../types';
import { searchRateLimit } from '../middleware/rate-limit';
import { validateSearch } from '../middleware/validation';
import bibleData from '../db/bible.json';

const router = Router();

// Appliquer le rate limiting et la validation
router.use(searchRateLimit);

// GET /api/search?q= - Recherche dans le texte biblique
router.get('/', validateSearch, (req: Request, res: Response) => {
  try {
    const { q, limit = 10, offset = 0 } = req.query as SearchParams;
    
    if (!q || q.trim().length === 0) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'Terme de recherche requis',
        message: 'Veuillez fournir un terme de recherche avec le paramètre "q"'
      };
      return res.status(400).json(errorResponse);
    }
    
    const searchTerm = q.toLowerCase().trim();
    const results: SearchResult[] = [];
    
    // Parcourir tous les livres de la Bible
    const bible = bibleData as any;
    
    for (const [bookName, chapters] of Object.entries(bible)) {
      if (typeof chapters !== 'object' || chapters === null) continue;
      
      for (const [chapterNumber, verses] of Object.entries(chapters as any)) {
        if (typeof verses !== 'object' || verses === null) continue;
        
        for (const [verseNumber, text] of Object.entries(verses as any)) {
          if (typeof text !== 'string') continue;
          
          const verseText = text.toLowerCase();
          
          // Recherche simple (contient le terme)
          if (verseText.includes(searchTerm)) {
            results.push({
              verset: `${bookName} ${chapterNumber}:${verseNumber}`,
              texte: text as string,
              reference: `${bookName} ${chapterNumber}:${verseNumber}`
            });
          }
        }
      }
    }
    
    // Trier les résultats par pertinence (versets plus courts en premier)
    results.sort((a, b) => {
      const aLength = a.texte.length;
      const bLength = b.texte.length;
      
      // Si les longueurs sont similaires, trier par livre
      if (Math.abs(aLength - bLength) < 50) {
        return a.verset.localeCompare(b.verset);
      }
      
      return aLength - bLength;
    });
    
    // Appliquer la pagination
    const totalResults = results.length;
    const paginatedResults = results.slice(offset, offset + limit);
    
    const response: ApiResponse<{
      results: SearchResult[];
      total: number;
      limit: number;
      offset: number;
      hasMore: boolean;
    }> = {
      success: true,
      data: {
        results: paginatedResults,
        total: totalResults,
        limit: limit,
        offset: offset,
        hasMore: offset + limit < totalResults
      },
      message: `${totalResults} résultat(s) trouvé(s) pour "${q}"`
    };
    
    res.json(response);
  } catch (error) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Erreur lors de la recherche',
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    };
    
    res.status(500).json(errorResponse);
  }
});

// GET /api/search/advanced?q= - Recherche avancée avec options
router.get('/advanced', validateSearch, (req: Request, res: Response) => {
  try {
    const { q, limit = 10, offset = 0, book, chapter } = req.query as any;
    
    if (!q || q.trim().length === 0) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'Terme de recherche requis',
        message: 'Veuillez fournir un terme de recherche avec le paramètre "q"'
      };
      return res.status(400).json(errorResponse);
    }
    
    const searchTerm = q.toLowerCase().trim();
    const results: SearchResult[] = [];
    
    // Parcourir tous les livres de la Bible
    const bible = bibleData as any;
    
    for (const [bookName, chapters] of Object.entries(bible)) {
      // Filtrer par livre si spécifié
      if (book && bookName.toLowerCase() !== book.toLowerCase()) {
        continue;
      }
      
      if (typeof chapters !== 'object' || chapters === null) continue;
      
      for (const [chapterNumber, verses] of Object.entries(chapters as any)) {
        // Filtrer par chapitre si spécifié
        if (chapter && chapterNumber !== chapter.toString()) {
          continue;
        }
        
        if (typeof verses !== 'object' || verses === null) continue;
        
        for (const [verseNumber, text] of Object.entries(verses as any)) {
          if (typeof text !== 'string') continue;
          
          const verseText = text.toLowerCase();
          
          // Recherche avec correspondance exacte de mot
          const words = searchTerm.split(/\s+/);
          const verseWords = verseText.split(/\s+/);
          
          let matchScore = 0;
          for (const word of words) {
            if (verseWords.some(vWord => vWord.includes(word))) {
              matchScore++;
            }
          }
          
          if (matchScore > 0) {
            results.push({
              verset: `${bookName} ${chapterNumber}:${verseNumber}`,
              texte: text as string,
              reference: `${bookName} ${chapterNumber}:${verseNumber}`
            });
          }
        }
      }
    }
    
    // Trier par score de correspondance
    results.sort((a, b) => {
      const aScore = calculateMatchScore(a.texte.toLowerCase(), searchTerm);
      const bScore = calculateMatchScore(b.texte.toLowerCase(), searchTerm);
      
      if (aScore !== bScore) {
        return bScore - aScore; // Score plus élevé en premier
      }
      
      return a.verset.localeCompare(b.verset);
    });
    
    // Appliquer la pagination
    const totalResults = results.length;
    const paginatedResults = results.slice(offset, offset + limit);
    
    const response: ApiResponse<{
      results: SearchResult[];
      total: number;
      limit: number;
      offset: number;
      hasMore: boolean;
      searchTerm: string;
      filters: any;
    }> = {
      success: true,
      data: {
        results: paginatedResults,
        total: totalResults,
        limit: limit,
        offset: offset,
        hasMore: offset + limit < totalResults,
        searchTerm: q,
        filters: { book, chapter }
      },
      message: `${totalResults} résultat(s) trouvé(s) pour "${q}" avec filtres appliqués`
    };
    
    res.json(response);
  } catch (error) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Erreur lors de la recherche avancée',
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    };
    
    res.status(500).json(errorResponse);
  }
});

// Fonction pour calculer le score de correspondance
function calculateMatchScore(text: string, searchTerm: string): number {
  const words = searchTerm.split(/\s+/);
  const textWords = text.split(/\s+/);
  let score = 0;
  
  for (const word of words) {
    for (const textWord of textWords) {
      if (textWord.includes(word)) {
        score++;
        // Bonus pour correspondance exacte
        if (textWord === word) {
          score += 2;
        }
      }
    }
  }
  
  return score;
}

export default router;
