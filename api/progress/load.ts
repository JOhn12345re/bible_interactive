// API Route Vercel pour charger la progression utilisateur
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb, verifyToken } from '../lib/db';

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  try {
    // Vérifier le token d'authentification
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token d\'authentification manquant'
      });
    }

    const token = authHeader.substring(7);
    const decoded = await verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Token invalide ou expiré'
      });
    }

    const userId = decoded.userId;
    const db = await getDb();

    // Charger la progression générale
    const progressResult = await db.query(
      `SELECT xp, level, coins, streak_days, last_activity_date, 
              total_lessons_completed, total_quizzes_completed, total_games_played, updated_at 
       FROM user_progress 
       WHERE user_id = $1`,
      [userId]
    );

    // Charger les badges
    const badgesResult = await db.query(
      `SELECT badge_id, badge_name, earned_at 
       FROM user_badges 
       WHERE user_id = $1`,
      [userId]
    );
    const badges = badgesResult.rows.map((b: any) => ({
      id: b.badge_id,
      name: b.badge_name,
      earnedAt: b.earned_at
    }));

    // Charger les leçons complétées
    const lessonsResult = await db.query(
      `SELECT lesson_id, completed_at, score 
       FROM completed_lessons 
       WHERE user_id = $1`,
      [userId]
    );
    const completedLessons = lessonsResult.rows.map((l: any) => ({
      id: l.lesson_id,
      completedAt: l.completed_at,
      score: l.score
    }));

    // Charger les achievements
    const achievementsResult = await db.query(
      `SELECT achievement_id, achievement_name, progress, completed, completed_at 
       FROM user_achievements 
       WHERE user_id = $1`,
      [userId]
    );
    const achievements = achievementsResult.rows.map((a: any) => ({
      id: a.achievement_id,
      name: a.achievement_name,
      progress: a.progress,
      completed: a.completed,
      completedAt: a.completed_at
    }));

    const progress = progressResult.rows[0] || {
      xp: 0,
      level: 1,
      coins: 0,
      streak_days: 0,
      total_lessons_completed: 0,
      total_quizzes_completed: 0,
      total_games_played: 0
    };

    return res.status(200).json({
      success: true,
      progress: {
        userId,
        xp: progress.xp,
        level: progress.level,
        coins: progress.coins,
        streakDays: progress.streak_days,
        lastActivityDate: progress.last_activity_date,
        totalLessonsCompleted: progress.total_lessons_completed,
        totalQuizzesCompleted: progress.total_quizzes_completed,
        totalGamesPlayed: progress.total_games_played,
        updatedAt: progress.updated_at
      },
      badges,
      completedLessons,
      achievements
    });

  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('❌ Erreur chargement progression:', error);
    }
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur lors du chargement'
    });
  }
}
