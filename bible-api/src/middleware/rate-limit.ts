import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { ApiResponse } from '../types';

// Configuration du rate limiting général
export const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes par fenêtre
  message: {
    success: false,
    error: 'Trop de requêtes',
    message: 'Limite de taux dépassée. Veuillez réessayer dans 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Trop de requêtes',
      message: 'Limite de taux dépassée. Veuillez réessayer dans 15 minutes.'
    };
    res.status(429).json(errorResponse);
  }
});

// Configuration du rate limiting pour la recherche
export const searchRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // 20 recherches par minute
  message: {
    success: false,
    error: 'Trop de recherches',
    message: 'Limite de recherche dépassée. Veuillez réessayer dans 1 minute.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Trop de recherches',
      message: 'Limite de recherche dépassée. Veuillez réessayer dans 1 minute.'
    };
    res.status(429).json(errorResponse);
  }
});

// Configuration du rate limiting pour les thèmes
export const topicsRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 50, // 50 requêtes par fenêtre
  message: {
    success: false,
    error: 'Trop de requêtes pour les thèmes',
    message: 'Limite de taux dépassée pour les thèmes. Veuillez réessayer dans 5 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Trop de requêtes pour les thèmes',
      message: 'Limite de taux dépassée pour les thèmes. Veuillez réessayer dans 5 minutes.'
    };
    res.status(429).json(errorResponse);
  }
});

// Configuration du rate limiting pour le verset du jour
export const verseOfTheDayRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // 5 requêtes par minute
  message: {
    success: false,
    error: 'Trop de requêtes pour le verset du jour',
    message: 'Limite de taux dépassée pour le verset du jour. Veuillez réessayer dans 1 minute.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Trop de requêtes pour le verset du jour',
      message: 'Limite de taux dépassée pour le verset du jour. Veuillez réessayer dans 1 minute.'
    };
    res.status(429).json(errorResponse);
  }
});

// Configuration du rate limiting strict pour les endpoints sensibles
export const strictRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requêtes par fenêtre
  message: {
    success: false,
    error: 'Trop de requêtes',
    message: 'Limite de taux stricte dépassée. Veuillez réessayer dans 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Trop de requêtes',
      message: 'Limite de taux stricte dépassée. Veuillez réessayer dans 15 minutes.'
    };
    res.status(429).json(errorResponse);
  }
});

// Fonction pour créer un rate limit personnalisé
export const createCustomRateLimit = (windowMs: number, max: number, message: string) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      error: 'Limite de taux dépassée',
      message
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response) => {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'Limite de taux dépassée',
        message
      };
      res.status(429).json(errorResponse);
    }
  });
};
