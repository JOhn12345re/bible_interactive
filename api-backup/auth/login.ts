// API Route Vercel pour la connexion utilisateur
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb, verifyPassword, generateToken } from '../lib/db';

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
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe requis'
      });
    }

    const db = await getDb();

    // Trouver l'utilisateur
    const result = await db.query(
      'SELECT id, email, username, password_hash, is_active, created_at FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (result.rowCount === 0) {
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
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Mettre à jour last_login
    await db.query(
      'UPDATE users SET last_login = NOW() WHERE id = $1',
      [user.id]
    );

    // Générer token JWT
    const token = generateToken(user.id, user.email);

    console.log('✅ Utilisateur connecté:', user.email);

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
    console.error('❌ Erreur connexion:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la connexion'
    });
  }
}
