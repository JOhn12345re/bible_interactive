import { Router, Request, Response } from 'express';
import { ApiResponse, TopicInfo, TopicVerse } from '../types';
import { topicsRateLimit } from '../middleware/rate-limit';
import { validateTopicParams } from '../middleware/validation';
import topicsData from '../db/topics.json';

const router = Router();

// Appliquer le rate limiting et la validation
router.use(topicsRateLimit);

// GET /api/topics - Liste tous les thèmes disponibles
router.get('/', (req: Request, res: Response) => {
  try {
    const topics: TopicInfo[] = Object.entries(topicsData).map(([slug, verses]) => ({
      name: formatTopicName(slug),
      slug: slug,
      verses: verses,
      count: verses.length
    }));
    
    // Trier par nom
    topics.sort((a, b) => a.name.localeCompare(b.name));
    
    const response: ApiResponse<TopicInfo[]> = {
      success: true,
      data: topics,
      message: `${topics.length} thèmes disponibles`
    };
    
    res.json(response);
  } catch (error) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Erreur lors de la récupération des thèmes',
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    };
    
    res.status(500).json(errorResponse);
  }
});

// GET /api/topics/:slug - Récupère les versets d'un thème spécifique
router.get('/:slug', validateTopicParams, (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    
    if (!topicsData[slug]) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'Thème non trouvé',
        message: `Le thème "${slug}" n'existe pas`
      };
      return res.status(404).json(errorResponse);
    }
    
    const topicInfo: TopicInfo = {
      name: formatTopicName(slug),
      slug: slug,
      verses: topicsData[slug],
      count: topicsData[slug].length
    };
    
    const response: ApiResponse<TopicInfo> = {
      success: true,
      data: topicInfo,
      message: `Thème "${topicInfo.name}" - ${topicInfo.count} verset(s)`
    };
    
    res.json(response);
  } catch (error) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Erreur lors de la récupération du thème',
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    };
    
    res.status(500).json(errorResponse);
  }
});

// GET /api/topics/:slug/random - Récupère un verset aléatoire d'un thème
router.get('/:slug/random', validateTopicParams, (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    
    if (!topicsData[slug]) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'Thème non trouvé',
        message: `Le thème "${slug}" n'existe pas`
      };
      return res.status(404).json(errorResponse);
    }
    
    const verses = topicsData[slug];
    const randomIndex = Math.floor(Math.random() * verses.length);
    const randomVerse = verses[randomIndex];
    
    const response: ApiResponse<TopicVerse & { theme: string }> = {
      success: true,
      data: {
        ...randomVerse,
        theme: formatTopicName(slug)
      },
      message: `Verset aléatoire du thème "${formatTopicName(slug)}"`
    };
    
    res.json(response);
  } catch (error) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Erreur lors de la récupération du verset aléatoire',
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    };
    
    res.status(500).json(errorResponse);
  }
});

// GET /api/topics/search?q= - Recherche dans les thèmes
router.get('/search', (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    
    if (!q || typeof q !== 'string' || q.trim().length === 0) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'Terme de recherche requis',
        message: 'Veuillez fournir un terme de recherche avec le paramètre "q"'
      };
      return res.status(400).json(errorResponse);
    }
    
    const searchTerm = q.toLowerCase().trim();
    const matchingTopics: TopicInfo[] = [];
    
    // Rechercher dans les noms des thèmes
    for (const [slug, verses] of Object.entries(topicsData)) {
      const topicName = formatTopicName(slug).toLowerCase();
      
      if (topicName.includes(searchTerm) || slug.includes(searchTerm)) {
        matchingTopics.push({
          name: formatTopicName(slug),
          slug: slug,
          verses: verses,
          count: verses.length
        });
      }
    }
    
    // Trier par nom
    matchingTopics.sort((a, b) => a.name.localeCompare(b.name));
    
    const response: ApiResponse<TopicInfo[]> = {
      success: true,
      data: matchingTopics,
      message: `${matchingTopics.length} thème(s) trouvé(s) pour "${q}"`
    };
    
    res.json(response);
  } catch (error) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Erreur lors de la recherche de thèmes',
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    };
    
    res.status(500).json(errorResponse);
  }
});

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
