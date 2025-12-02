// API Route Vercel pour la connexion utilisateur
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb, verifyPassword, generateToken } from '../lib/db';

// Configuration CORS sécurisée
const ALLOWED_ORIGINS = [
  'https://bible-interactive.vercel.app',
  'https://bible-interactive.netlify.app',
  process.env.ALLOWED_ORIGIN,
].filter(Boolean) as string[];

// En développement, autoriser localhost
if (process.env.NODE_ENV !== 'production') {
  ALLOWED_ORIGINS.push('http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173');
}

// Rate limiting simple en mémoire
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const attempts = loginAttempts.get(ip);
  
  if (!attempts) return false;
  
  // Réinitialiser après la période de verrouillage
  if (now - attempts.lastAttempt > LOCKOUT_DURATION) {
    loginAttempts.delete(ip);
    return false;
  }
  
  return attempts.count >= MAX_ATTEMPTS;
}

function recordAttempt(ip: string, success: boolean): void {
  const now = Date.now();
  
  if (success) {
    loginAttempts.delete(ip);
    return;
  }
  
  const attempts = loginAttempts.get(ip);
  if (attempts) {
    attempts.count++;
    attempts.lastAttempt = now;
  } else {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
  }
}

function getCorsOrigin(requestOrigin: string | undefined): string | null {
  if (!requestOrigin) return null;
  return ALLOWED_ORIGINS.includes(requestOrigin) ? requestOrigin : null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS sécurisé
  const origin = getCorsOrigin(req.headers.origin);
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  // Récupérer l'IP pour le rate limiting
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
                   req.socket?.remoteAddress || 
                   'unknown';

  // Vérifier le rate limiting
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      success: false,
      message: 'Trop de tentatives. Réessayez dans 15 minutes.'
    });
  }

  try {
    const { email, password } = req.body;

    // Validation stricte des entrées
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe requis'
      });
    }

    // Validation format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 255) {
      recordAttempt(clientIp, false);
      return res.status(400).json({
        success: false,
        message: 'Format email invalide'
      });
    }

    // Limiter la longueur du mot de passe
    if (password.length > 128) {
      return res.status(400).json({
        success: false,
        message: 'Mot de passe trop long'
      });
    }

    const db = await getDb();

    // Trouver l'utilisateur
    const result = await db.query(
      'SELECT id, email, username, password_hash, is_active, created_at FROM users WHERE email = $1',
      [email.toLowerCase().trim()]
    );

    if (result.rowCount === 0) {
      recordAttempt(clientIp, false);
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    const user = result.rows[0];

    // Vérifier si le compte est actif
    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: 'Compte désactivé'
      });
    }

    // Vérifier le mot de passe
    const isValidPassword = await verifyPassword(password, user.password_hash);

    if (!isValidPassword) {
      recordAttempt(clientIp, false);
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Connexion réussie - réinitialiser les tentatives
    recordAttempt(clientIp, true);

    // Mettre à jour last_login
    await db.query(
      'UPDATE users SET last_login = NOW() WHERE id = $1',
      [user.id]
    );

    // Générer token JWT sécurisé
    const token = await generateToken(user.id, user.email);

    return res.status(200).json({
      success: true,
      message: 'Connexion réussie !',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.created_at,
        isActive: user.is_active
      },
      token
    });

  } catch (error) {
    // Log sans info sensible en production
    if (process.env.NODE_ENV !== 'production') {
      console.error('❌ Erreur connexion:', error);
    }
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la connexion'
    });
  }
}
