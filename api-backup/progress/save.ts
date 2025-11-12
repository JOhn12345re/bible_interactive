// API Route Vercel pour sauvegarder la progression utilisateur
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb, verifyToken } from '../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

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
    const decoded = verifyToken(token);

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

    const db = await getDb();

    // Mettre à jour la progression générale
    if (xp !== undefined || level !== undefined || coins !== undefined || streakDays !== undefined) {
      const updates: string[] = [];
      const values: any[] = [];
      let paramIndex = 1;

      if (xp !== undefined) {
        updates.push(`xp = $${paramIndex++}`);
        values.push(xp);
      }
      if (level !== undefined) {
        updates.push(`level = $${paramIndex++}`);
        values.push(level);
      }
      if (coins !== undefined) {
        updates.push(`coins = $${paramIndex++}`);
        values.push(coins);
      }
      if (streakDays !== undefined) {
        updates.push(`streak_days = $${paramIndex++}`);
        values.push(streakDays);
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
    if (completedLesson) {
      await db.query(
        `INSERT INTO completed_lessons (user_id, lesson_id, completed_at) 
         VALUES ($1, $2, NOW()) 
         ON CONFLICT (user_id, lesson_id) DO NOTHING`,
        [userId, completedLesson]
      );

      // Incrémenter le compteur de leçons
      await db.query(
        `UPDATE user_progress 
         SET total_lessons_completed = total_lessons_completed + 1 
         WHERE user_id = $1`,
        [userId]
      );
    }

    // Enregistrer un quiz complété
    if (completedQuiz) {
      await db.query(
        `INSERT INTO completed_quizzes (user_id, quiz_id, score, max_score, completed_at) 
         VALUES ($1, $2, $3, $4, NOW())`,
        [userId, completedQuiz.quizId, completedQuiz.score, completedQuiz.maxScore]
      );

      // Incrémenter le compteur de quiz
      await db.query(
        `UPDATE user_progress 
         SET total_quizzes_completed = total_quizzes_completed + 1 
         WHERE user_id = $1`,
        [userId]
      );
    }

    // Enregistrer un nouveau badge
    if (newBadge) {
      await db.query(
        `INSERT INTO user_badges (user_id, badge_id, badge_name, earned_at) 
         VALUES ($1, $2, $3, NOW()) 
         ON CONFLICT (user_id, badge_id) DO NOTHING`,
        [userId, newBadge.badgeId, newBadge.badgeName]
      );
    }

    // Mettre à jour un achievement
    if (achievement) {
      await db.query(
        `INSERT INTO user_achievements (user_id, achievement_id, achievement_name, progress, completed, completed_at) 
         VALUES ($1, $2, $3, $4, $5, ${achievement.completed ? 'NOW()' : 'NULL'}) 
         ON CONFLICT (user_id, achievement_id) 
         DO UPDATE SET progress = $4, completed = $5, completed_at = ${achievement.completed ? 'NOW()' : 'user_achievements.completed_at'}`,
        [userId, achievement.achievementId, achievement.achievementName, achievement.progress, achievement.completed]
      );
    }

    console.log('✅ Progression sauvegardée pour user:', userId);

    return res.status(200).json({
      success: true,
      message: 'Progression sauvegardée avec succès'
    });

  } catch (error) {
    console.error('❌ Erreur sauvegarde progression:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la sauvegarde'
    });
  }
}
