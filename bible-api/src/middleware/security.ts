import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { ApiResponse } from '../types';

// Configuration CORS
export const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Configuration du rate limiting
export const rateLimitOptions = {
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'), // 1 minute
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // 100 requêtes par minute
  message: {
    success: false,
    error: 'Trop de requêtes, veuillez réessayer plus tard',
    message: 'Limite de taux dépassée'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Trop de requêtes',
      message: 'Limite de taux dépassée. Veuillez réessayer plus tard.'
    };
    res.status(429).json(errorResponse);
  }
};

// Configuration Helmet pour la sécurité
export const helmetOptions = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
};

// Middleware de sécurité personnalisé
export const securityMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Désactiver l'en-tête X-Powered-By
  res.removeHeader('X-Powered-By');
  
  // Ajouter des en-têtes de sécurité personnalisés
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Log des requêtes suspectes
  const userAgent = req.get('User-Agent') || '';
  const suspiciousPatterns = [
    /script/i,
    /javascript/i,
    /vbscript/i,
    /onload/i,
    /onerror/i,
    /<script/i,
    /eval\(/i,
    /expression\(/i
  ];
  
  if (suspiciousPatterns.some(pattern => pattern.test(userAgent) || pattern.test(req.url))) {
    console.warn(`⚠️ Requête suspecte détectée: ${req.method} ${req.url} - IP: ${req.ip} - User-Agent: ${userAgent}`);
  }
  
  next();
};

// Middleware de validation de l'API key (optionnel)
export const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.get('X-API-Key') || req.get('Authorization')?.replace('Bearer ', '');
  const expectedApiKey = process.env.API_SECRET_KEY;
  
  // Si une clé API est configurée, la valider
  if (expectedApiKey && expectedApiKey !== 'your-secret-key-here') {
    if (!apiKey) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'Clé API manquante',
        message: 'Une clé API est requise pour accéder à cette ressource'
      };
      return res.status(401).json(errorResponse);
    }
    
    if (apiKey !== expectedApiKey) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'Clé API invalide',
        message: 'La clé API fournie n\'est pas valide'
      };
      return res.status(403).json(errorResponse);
    }
  }
  
  next();
};

// Middleware de logging des requêtes
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const originalSend = res.send;
  
  res.send = function(data) {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    };
    
    // Log seulement les erreurs et les requêtes lentes
    if (res.statusCode >= 400 || duration > 1000) {
      console.log(`📊 ${logData.method} ${logData.url} - ${logData.statusCode} - ${logData.duration} - IP: ${logData.ip}`);
    }
    
    return originalSend.call(this, data);
  };
  
  next();
};

// Middleware de gestion des erreurs
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Erreur non gérée:', err);
  
  const errorResponse: ApiResponse<null> = {
    success: false,
    error: 'Erreur interne du serveur',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Une erreur inattendue s\'est produite'
  };
  
  res.status(500).json(errorResponse);
};

// Middleware pour les routes non trouvées
export const notFoundHandler = (req: Request, res: Response) => {
  const errorResponse: ApiResponse<null> = {
    success: false,
    error: 'Route non trouvée',
    message: `La route ${req.method} ${req.url} n'existe pas`
  };
  
  res.status(404).json(errorResponse);
};
