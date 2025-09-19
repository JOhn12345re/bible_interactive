import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { 
  corsOptions, 
  helmetOptions, 
  securityMiddleware, 
  requestLogger, 
  errorHandler, 
  notFoundHandler 
} from './middleware/security';
import { ApiResponse, ApiStats } from './types';

// Routes
import booksRouter from './routes/books';
import chaptersRouter from './routes/chapters';
import versesRouter from './routes/verses';
import searchRouter from './routes/search';
import topicsRouter from './routes/topics';
import verseOfTheDayRouter from './routes/verse-of-the-day';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env['PORT'] || 3002;

// Middleware de sécurité
app.use(helmet(helmetOptions));
app.use(cors(corsOptions));
app.use(securityMiddleware);
app.use(requestLogger);

// Middleware pour parser le JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Route de santé
app.get('/health', (_req, res) => {
  const healthResponse: ApiResponse<{ status: string; timestamp: string; uptime: number }> = {
    success: true,
    data: {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    },
    message: 'API Bible en fonctionnement'
  };
  
  res.json(healthResponse);
});

// Route d'informations sur l'API
app.get('/api', (_req, res) => {
  const apiInfo: ApiResponse<{
    name: string;
    version: string;
    description: string;
    endpoints: string[];
    stats: ApiStats;
  }> = {
    success: true,
    data: {
      name: 'Bible API',
      version: '1.0.0',
      description: 'API REST pour la Bible Louis Segond 1910 avec thèmes et recherche',
      endpoints: [
        'GET /api/books - Liste des livres bibliques',
        'GET /api/books/:bookId - Informations sur un livre',
        'GET /api/books/:bookId/chapters/:chapter - Chapitre spécifique',
        'GET /api/books/:bookId/chapters/:chapter/verses - Tous les versets d\'un chapitre',
        'GET /api/books/:bookId/chapters/:chapter/verses/:verse - Verset spécifique',
        'GET /api/search?q= - Recherche dans le texte biblique',
        'GET /api/search/advanced?q= - Recherche avancée',
        'GET /api/topics - Liste des thèmes',
        'GET /api/topics/:slug - Versets d\'un thème',
        'GET /api/topics/:slug/random - Verset aléatoire d\'un thème',
        'GET /api/topics/search?q= - Recherche dans les thèmes',
        'GET /api/verse-of-the-day - Verset du jour',
        'GET /api/verse-of-the-day/:theme - Verset du jour par thème'
      ],
      stats: {
        totalStories: 5,
        totalVerses: 0, // Sera calculé dynamiquement
        totalTopics: 18,
        lastUpdated: new Date().toISOString()
      }
    },
    message: 'Bienvenue sur l\'API Bible !'
  };
  
  res.json(apiInfo);
});

// Routes API
app.use('/api/books', booksRouter);
app.use('/api/books', chaptersRouter);
app.use('/api/books', versesRouter);
app.use('/api/search', searchRouter);
app.use('/api/topics', topicsRouter);
app.use('/api/verse-of-the-day', verseOfTheDayRouter);

// Route racine
app.get('/', (_req, res) => {
  const welcomeResponse: ApiResponse<{
    message: string;
    documentation: string;
    health: string;
  }> = {
    success: true,
    data: {
      message: 'Bienvenue sur l\'API Bible !',
      documentation: '/api',
      health: '/health'
    },
    message: 'API Bible Louis Segond 1910'
  };
  
  res.json(welcomeResponse);
});

// Middleware de gestion des erreurs
app.use(notFoundHandler);
app.use(errorHandler);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 API Bible démarrée sur le port ${PORT}`);
  console.log(`📖 Version: 1.0.0`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📚 Documentation: http://localhost:${PORT}/api`);
  console.log(`❤️ Santé: http://localhost:${PORT}/health`);
  console.log(`🔒 Mode: ${process.env['NODE_ENV'] || 'development'}`);
  
  if (process.env['NODE_ENV'] === 'production') {
    console.log(`🛡️ Sécurité: Activée`);
    console.log(`⚡ Rate Limiting: Activé`);
  }
});

// Gestion gracieuse de l'arrêt
process.on('SIGTERM', () => {
  console.log('🛑 Signal SIGTERM reçu, arrêt gracieux...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Signal SIGINT reçu, arrêt gracieux...');
  process.exit(0);
});

export default app;
