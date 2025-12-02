// API Route Vercel pour l'inscription utilisateur
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb, hashPassword, generateToken } from '../lib/db';

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

// Rate limiting pour les inscriptions
const registerAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_REGISTER_PER_HOUR = 3;
const REGISTER_WINDOW = 60 * 60 * 1000; // 1 heure

function isRegisterRateLimited(ip: string): boolean {
  const now = Date.now();
  const attempts = registerAttempts.get(ip);
  
  if (!attempts) return false;
  
  // Réinitialiser après 1 heure
  if (now - attempts.lastAttempt > REGISTER_WINDOW) {
    registerAttempts.delete(ip);
    return false;
  }
  
  return attempts.count >= MAX_REGISTER_PER_HOUR;
}

function recordRegisterAttempt(ip: string): void {
  const now = Date.now();
  const attempts = registerAttempts.get(ip);
  
  if (attempts) {
    attempts.count++;
    attempts.lastAttempt = now;
  } else {
    registerAttempts.set(ip, { count: 1, lastAttempt: now });
  }
}

function getCorsOrigin(requestOrigin: string | undefined): string | null {
  if (!requestOrigin) return null;
  return ALLOWED_ORIGINS.includes(requestOrigin) ? requestOrigin : null;
}

// Validation du mot de passe
function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins 8 caractères' };
  }
  if (password.length > 128) {
    return { valid: false, message: 'Le mot de passe est trop long' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins une majuscule' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins une minuscule' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Le mot de passe doit contenir au moins un chiffre' };
  }
  return { valid: true };
}

// Sanitize username
function sanitizeUsername(username: string): string {
  return username
    .trim()
    .slice(0, 50)
    .replace(/[<>'"&]/g, ''); // Supprimer caractères dangereux
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
  if (isRegisterRateLimited(clientIp)) {
    return res.status(429).json({
      success: false,
      message: 'Trop d\'inscriptions. Réessayez plus tard.'
    });
  }

  try {
    const { email, password, username } = req.body;

    // Validation stricte des entrées
    if (!email || !password || !username || 
        typeof email !== 'string' || 
        typeof password !== 'string' || 
        typeof username !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Email, mot de passe et nom d\'utilisateur requis'
      });
    }

    // Validation du mot de passe renforcée
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.message
      });
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email.toLowerCase().trim();
    if (!emailRegex.test(cleanEmail) || cleanEmail.length > 255) {
      return res.status(400).json({
        success: false,
        message: 'Email invalide'
      });
    }

    // Sanitize et validation username
    const cleanUsername = sanitizeUsername(username);
    if (cleanUsername.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Le nom d\'utilisateur doit contenir au moins 2 caractères'
      });
    }

    const db = await getDb();

    // Vérifier si l'email existe déjà
    const existingUser = await db.query(
      'SELECT id FROM users WHERE email = $1',
      [cleanEmail]
    );

    if (existingUser.rowCount > 0) {
      // Ne pas révéler si l'email existe (protection contre l'énumération)
      recordRegisterAttempt(clientIp);
      return res.status(409).json({
        success: false,
        message: 'Inscription impossible. Vérifiez vos informations.'
      });
    }

    // Hash du password sécurisé avec salt
    const passwordHash = await hashPassword(password);

    // Créer l'utilisateur
    const result = await db.query(
      'INSERT INTO users (email, password_hash, username, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, email, username, created_at, is_active',
      [cleanEmail, passwordHash, cleanUsername]
    );

    const user = result.rows[0];

    // Créer la progression initiale
    await db.query(
      'INSERT INTO user_progress (user_id, xp, level, coins, streak_days) VALUES ($1, 0, 1, 0, 0)',
      [user.id]
    );

    // Enregistrer la tentative d'inscription
    recordRegisterAttempt(clientIp);

    // Générer token JWT sécurisé
    const token = await generateToken(user.id, user.email);

    return res.status(201).json({
      success: true,
      message: 'Compte créé avec succès !',
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
      console.error('❌ Erreur inscription:', error);
    }
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de l\'inscription'
    });
  }
}
