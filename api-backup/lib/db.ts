// Helper pour connexion base de données Vercel Postgres
// Utilise @vercel/postgres pour Vercel, ou pg pour local

let db: any;

// Fonction pour obtenir la connexion DB
export async function getDb() {
  if (db) return db;

  // En production sur Vercel, utiliser @vercel/postgres
  if (process.env.VERCEL || process.env.POSTGRES_URL) {
    try {
      const { sql } = await import('@vercel/postgres');
      db = sql;
      console.log('✅ Connexion Vercel Postgres établie');
      return db;
    } catch (error) {
      console.error('❌ Erreur @vercel/postgres:', error);
    }
  }

  // Fallback : en local ou si Vercel Postgres non configuré
  // On utilise un stockage en mémoire temporaire
  console.warn('⚠️ Pas de base de données configurée - utilisation mémoire temporaire');
  db = createInMemoryDb();
  return db;
}

// Base de données en mémoire pour développement/fallback
function createInMemoryDb() {
  const users: any[] = [];
  const progress: any[] = [];
  const badges: any[] = [];
  const lessons: any[] = [];
  const quizzes: any[] = [];
  const achievements: any[] = [];

  return {
    query: async (text: string, params: any[] = []) => {
      // Simuler les requêtes SQL en mémoire
      console.log('🔍 Query:', text.substring(0, 50) + '...');
      
      // INSERT INTO users
      if (text.includes('INSERT INTO users')) {
        const [email, password_hash, username] = params;
        const user = { 
          id: users.length + 1, 
          email, 
          password_hash, 
          username,
          created_at: new Date(),
          is_active: true
        };
        users.push(user);
        return { rows: [user], rowCount: 1 };
      }

      // SELECT FROM users WHERE email
      if (text.includes('SELECT') && text.includes('users') && text.includes('email')) {
        const user = users.find(u => u.email === params[0]);
        return { rows: user ? [user] : [], rowCount: user ? 1 : 0 };
      }

      // SELECT FROM users WHERE id
      if (text.includes('SELECT') && text.includes('users') && text.includes('id')) {
        const user = users.find(u => u.id === params[0]);
        return { rows: user ? [user] : [], rowCount: user ? 1 : 0 };
      }

      // INSERT INTO user_progress
      if (text.includes('INSERT INTO user_progress')) {
        const prog = { id: progress.length + 1, ...params };
        progress.push(prog);
        return { rows: [prog], rowCount: 1 };
      }

      // SELECT progress
      if (text.includes('SELECT') && text.includes('user_progress')) {
        const prog = progress.find(p => p.user_id === params[0]);
        return { rows: prog ? [prog] : [], rowCount: prog ? 1 : 0 };
      }

      return { rows: [], rowCount: 0 };
    }
  };
}

// Fonction utilitaire pour hash de password (simple pour démo)
export async function hashPassword(password: string): Promise<string> {
  // En production, utiliser bcrypt
  // Pour l'instant, hash simple avec crypto
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Fonction pour vérifier password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const newHash = await hashPassword(password);
  return newHash === hash;
}

// Fonction pour générer JWT token
export function generateToken(userId: number, email: string): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    userId,
    email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24h
  };

  const secret = process.env.JWT_SECRET || 'bible-interactive-secret-key-change-in-production';
  
  // JWT simple (en production, utiliser jsonwebtoken)
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = Buffer.from(secret + encodedHeader + encodedPayload).toString('base64url');
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Fonction pour vérifier JWT token
export function verifyToken(token: string): { userId: number; email: string } | null {
  try {
    const [header, payload, signature] = token.split('.');
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString());
    
    // Vérifier expiration
    if (decodedPayload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return {
      userId: decodedPayload.userId,
      email: decodedPayload.email
    };
  } catch (error) {
    return null;
  }
}
