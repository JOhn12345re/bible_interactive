// API Route Vercel pour sauvegarder la progression utilisateur
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

// Validation des données de progression
function validateProgressData(data: any): boolean {
  if (data.xp !== undefined && (typeof data.xp !== 'number' || data.xp < 0 || data.xp > 10000000)) {
    return false;
  }
  if (data.level !== undefined && (typeof data.level !== 'number' || data.level < 1 || data.level > 1000)) {
    return false;
  }
  if (data.coins !== undefined && (typeof data.coins !== 'number' || data.coins < 0 || data.coins > 10000000)) {
    return false;
  }
  if (data.streakDays !== undefined && (typeof data.streakDays !== 'number' || data.streakDays < 0 || data.streakDays > 10000)) {
    return false;
  }
  return true;
}

// Sanitize string pour éviter les injections
function sanitizeString(str: string, maxLength: number = 255): string {
  if (typeof str !== 'string') return '';
  return str.slice(0, maxLength).replace(/[<>'"]/g, '');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS sécurisé
  const origin = getCorsOrigin(req.headers.origin);
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
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
    const {
      xp,
      level,
      coins,
      streakDays,
      completedLesson,
      completedQuiz,
      newBadge,
      achievement
    } = req.body;

    // Validation des données
    if (!validateProgressData(req.body)) {
      return res.status(400).json({
        success: false,
        message: 'Données de progression invalides'
      });
    }

    const db = await getDb();

    // Mettre à jour la progression générale
    if (xp !== undefined || level !== undefined || coins !== undefined || streakDays !== undefined) {
      const updates: string[] = [];
      const values: any[] = [];
      let paramIndex = 1;

      if (xp !== undefined) {
        updates.push(`xp = $${paramIndex++}`);
        values.push(Math.max(0, Math.min(xp, 10000000))); // Limiter les valeurs
      }
      if (level !== undefined) {
        updates.push(`level = $${paramIndex++}`);
        values.push(Math.max(1, Math.min(level, 1000)));
      }
      if (coins !== undefined) {
        updates.push(`coins = $${paramIndex++}`);
        values.push(Math.max(0, Math.min(coins, 10000000)));
      }
      if (streakDays !== undefined) {
        updates.push(`streak_days = $${paramIndex++}`);
        values.push(Math.max(0, Math.min(streakDays, 10000)));
      }

      updates.push(`last_activity_date = CURRENT_DATE`);
      updates.push(`updated_at = NOW()`);
      values.push(userId);

      await db.query(
        `UPDATE user_progress SET ${updates.join(', ')} WHERE user_id = $${paramIndex}`,
        values
      );
    }

    // Enregistrer une leçon complétée
    if (completedLesson && typeof completedLesson === 'string') {
      const sanitizedLessonId = sanitizeString(completedLesson, 255);
      await db.query(
        `INSERT INTO completed_lessons (user_id, lesson_id, completed_at) 
         VALUES ($1, $2, NOW()) 
         ON CONFLICT (user_id, lesson_id) DO NOTHING`,
        [userId, sanitizedLessonId]
      );

      await db.query(
        `UPDATE user_progress 
         SET total_lessons_completed = total_lessons_completed + 1 
         WHERE user_id = $1`,
        [userId]
      );
    }

    // Enregistrer un quiz complété
    if (completedQuiz && typeof completedQuiz === 'object') {
      const sanitizedQuizId = sanitizeString(completedQuiz.quizId || '', 255);
      const score = Math.max(0, Math.min(Number(completedQuiz.score) || 0, 1000));
      const maxScore = Math.max(1, Math.min(Number(completedQuiz.maxScore) || 100, 1000));
      
      await db.query(
        `INSERT INTO completed_quizzes (user_id, quiz_id, score, max_score, completed_at) 
         VALUES ($1, $2, $3, $4, NOW())`,
        [userId, sanitizedQuizId, score, maxScore]
      );

      await db.query(
        `UPDATE user_progress 
         SET total_quizzes_completed = total_quizzes_completed + 1 
         WHERE user_id = $1`,
        [userId]
      );
    }

    // Enregistrer un nouveau badge
    if (newBadge && typeof newBadge === 'object') {
      const sanitizedBadgeId = sanitizeString(newBadge.badgeId || '', 100);
      const sanitizedBadgeName = sanitizeString(newBadge.badgeName || '', 255);
      
      await db.query(
        `INSERT INTO user_badges (user_id, badge_id, badge_name, earned_at) 
         VALUES ($1, $2, $3, NOW()) 
         ON CONFLICT (user_id, badge_id) DO NOTHING`,
        [userId, sanitizedBadgeId, sanitizedBadgeName]
      );
    }

    // Mettre à jour un achievement
    if (achievement && typeof achievement === 'object') {
      const sanitizedAchievementId = sanitizeString(achievement.achievementId || '', 100);
      const sanitizedAchievementName = sanitizeString(achievement.achievementName || '', 255);
      const progress = Math.max(0, Math.min(Number(achievement.progress) || 0, 100));
      const completed = Boolean(achievement.completed);
      
      await db.query(
        `INSERT INTO user_achievements (user_id, achievement_id, achievement_name, progress, completed, completed_at) 
         VALUES ($1, $2, $3, $4, $5, ${completed ? 'NOW()' : 'NULL'}) 
         ON CONFLICT (user_id, achievement_id) 
         DO UPDATE SET progress = $4, completed = $5, completed_at = ${completed ? 'NOW()' : 'user_achievements.completed_at'}`,
        [userId, sanitizedAchievementId, sanitizedAchievementName, progress, completed]
      );
    }

    return res.status(200).json({
      success: true,
      message: 'Progression sauvegardée avec succès'
    });

  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('❌ Erreur sauvegarde progression:', error);
    }
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la sauvegarde'
    });
  }
}
