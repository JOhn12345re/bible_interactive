import { Router, Request, Response } from 'express';
import { ApiResponse, VerseOfTheDay } from '../types';
import { verseOfTheDayRateLimit } from '../middleware/rate-limit';
import topicsData from '../db/topics.json';

const router = Router();

// Appliquer le rate limiting
router.use(verseOfTheDayRateLimit);

// GET /api/verse-of-the-day - Récupère le verset du jour
router.get('/', (req: Request, res: Response) => {
  try {
    const verseOfTheDay = getVerseOfTheDay();
    
    const response: ApiResponse<VerseOfTheDay> = {
      success: true,
      data: verseOfTheDay,
      message: `Verset du jour - ${verseOfTheDay.date}`
    };
    
    res.json(response);
  } catch (error) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Erreur lors de la récupération du verset du jour',
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    };
    
    res.status(500).json(errorResponse);
  }
});

// GET /api/verse-of-the-day/:theme - Récupère le verset du jour pour un thème spécifique
router.get('/:theme', (req: Request, res: Response) => {
  try {
    const { theme } = req.params;
    
    if (!topicsData[theme]) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'Thème non trouvé',
        message: `Le thème "${theme}" n'existe pas`
      };
      return res.status(404).json(errorResponse);
    }
    
    const verseOfTheDay = getVerseOfTheDayForTheme(theme);
    
    const response: ApiResponse<VerseOfTheDay> = {
      success: true,
      data: verseOfTheDay,
      message: `Verset du jour pour le thème "${formatTopicName(theme)}" - ${verseOfTheDay.date}`
    };
    
    res.json(response);
  } catch (error) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Erreur lors de la récupération du verset du jour',
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    };
    
    res.status(500).json(errorResponse);
  }
});

// Fonction pour obtenir le verset du jour
function getVerseOfTheDay(): VerseOfTheDay {
  const today = new Date();
  const dateString = today.toISOString().split('T')[0]; // Format YYYY-MM-DD
  
  // Utiliser la date comme seed pour la génération aléatoire
  const seed = getDateSeed(dateString);
  
  // Collecter tous les versets de tous les thèmes
  const allVerses: Array<{ ref: string; texte: string; theme: string }> = [];
  
  for (const [theme, verses] of Object.entries(topicsData)) {
    for (const verse of verses) {
      allVerses.push({
        ref: verse.ref,
        texte: verse.texte,
        theme: formatTopicName(theme)
      });
    }
  }
  
  // Sélectionner un verset basé sur la date
  const index = seed % allVerses.length;
  const selectedVerse = allVerses[index];
  
  return {
    verset: selectedVerse.ref,
    texte: selectedVerse.texte,
    reference: selectedVerse.ref,
    date: dateString,
    theme: selectedVerse.theme
  };
}

// Fonction pour obtenir le verset du jour pour un thème spécifique
function getVerseOfTheDayForTheme(theme: string): VerseOfTheDay {
  const today = new Date();
  const dateString = today.toISOString().split('T')[0]; // Format YYYY-MM-DD
  
  // Utiliser la date et le thème comme seed
  const seed = getDateSeed(dateString + theme);
  const verses = topicsData[theme];
  
  // Sélectionner un verset basé sur la date et le thème
  const index = seed % verses.length;
  const selectedVerse = verses[index];
  
  return {
    verset: selectedVerse.ref,
    texte: selectedVerse.texte,
    reference: selectedVerse.ref,
    date: dateString,
    theme: formatTopicName(theme)
  };
}

// Fonction pour générer un seed basé sur la date
function getDateSeed(dateString: string): number {
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convertir en entier 32-bit
  }
  return Math.abs(hash);
}

// Fonction utilitaire pour formater le nom du thème
function formatTopicName(slug: string): string {
  const nameMap: { [key: string]: string } = {
    'peur': 'Peur',
    'joie': 'Joie',
    'foi': 'Foi',
    'amour': 'Amour',
    'pardonner': 'Pardonner',
    'esperance': 'Espérance',
    'patience': 'Patience',
    'sagesse': 'Sagesse',
    'obeissance': 'Obéissance',
    'courage': 'Courage',
    'gratitude': 'Gratitude',
    'paix': 'Paix',
    'force': 'Force',
    'humilite': 'Humilité',
    'justice': 'Justice',
    'loyaute': 'Loyauté',
    'obeissance-a-dieu': 'Obéissance à Dieu',
    'esperance-eternelle': 'Espérance éternelle'
  };
  
  return nameMap[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
}

export default router;
