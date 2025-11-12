// API Route Vercel pour l'inscription utilisateur
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb, hashPassword, generateToken } from '../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  try {
    const { email, password, username } = req.body;

    // Validation
    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: 'Email, mot de passe et nom d\'utilisateur requis'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Le mot de passe doit contenir au moins 6 caractères'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email invalide'
      });
    }

    const db = await getDb();

    // Vérifier si l'email existe déjà
    const existingUser = await db.query(
      'SELECT id FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (existingUser.rowCount > 0) {
      return res.status(409).json({
        success: false,
        message: 'Cet email est déjà utilisé'
      });
    }

    // Hash du password
    const passwordHash = await hashPassword(password);

    // Créer l'utilisateur
    const result = await db.query(
      'INSERT INTO users (email, password_hash, username, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, email, username, created_at, is_active',
      [email.toLowerCase(), passwordHash, username]
    );

    const user = result.rows[0];

    // Créer la progression initiale
    await db.query(
      'INSERT INTO user_progress (user_id, xp, level, coins, streak_days) VALUES ($1, 0, 1, 0, 0)',
      [user.id]
    );

    // Générer token JWT
    const token = generateToken(user.id, user.email);

    console.log('✅ Nouvel utilisateur créé:', user.email);

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
    console.error('❌ Erreur inscription:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de l\'inscription'
    });
  }
}
