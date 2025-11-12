// API Route Vercel pour charger la progression utilisateur
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb, verifyToken } from '../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

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
    const decoded = verifyToken(token);

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
      `SELECT id, badge_id, badge_name, earned_at 
       FROM user_badges 
       WHERE user_id = $1 
       ORDER BY earned_at DESC`,
      [userId]
    );

    // Charger les leçons complétées
    const lessonsResult = await db.query(
      `SELECT id, lesson_id, completed_at, score 
       FROM completed_lessons 
       WHERE user_id = $1 
       ORDER BY completed_at DESC`,
      [userId]
    );

    // Charger les achievements
    const achievementsResult = await db.query(
      `SELECT id, achievement_id, achievement_name, progress, completed, completed_at 
       FROM user_achievements 
       WHERE user_id = $1 
       ORDER BY completed_at DESC NULLS LAST`,
      [userId]
    );

    const progress = progressResult.rows[0] || {
      xp: 0,
      level: 1,
      coins: 0,
      streak_days: 0,
      total_lessons_completed: 0,
      total_quizzes_completed: 0,
      total_games_played: 0
    };

    console.log('✅ Progression chargée pour user:', userId);

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
      badges: badgesResult.rows.map(b => ({
        id: b.id,
        userId,
        badgeId: b.badge_id,
        badgeName: b.badge_name,
        earnedAt: b.earned_at
      })),
      completedLessons: lessonsResult.rows.map(l => ({
        id: l.id,
        userId,
        lessonId: l.lesson_id,
        completedAt: l.completed_at,
        score: l.score
      })),
      achievements: achievementsResult.rows.map(a => ({
        id: a.id,
        userId,
        achievementId: a.achievement_id,
        achievementName: a.achievement_name,
        progress: a.progress,
        completed: a.completed,
        completedAt: a.completed_at
      }))
    });

  } catch (error) {
    console.error('❌ Erreur chargement progression:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur lors du chargement'
    });
  }
}
