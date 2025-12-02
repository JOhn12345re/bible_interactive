// Helper pour connexion base de données Vercel Postgres
// Utilise @vercel/postgres pour Vercel, ou pg pour local

let db: any;

// Configuration sécurisée
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY_HOURS = 24;

// Validation du secret JWT au démarrage
if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  console.error('⚠️ ATTENTION: JWT_SECRET non défini en production !');
}

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
  if (process.env.NODE_ENV !== 'production') {
    console.warn('⚠️ Mode développement - utilisation mémoire temporaire');
  }
  db = createInMemoryDb();
  return db;
}

// Base de données en mémoire pour développement/fallback
function createInMemoryDb() {
  const users: any[] = [];
  const progress: any[] = [];

  return {
    query: async (text: string, params: any[] = []) => {
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

/**
 * Hash sécurisé de mot de passe avec PBKDF2 et salt aléatoire
 * Format: salt:hash (hex)
 */
export async function hashPassword(password: string): Promise<string> {
  // Générer un salt cryptographiquement sécurisé (16 bytes)
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
  
  // Encoder le mot de passe
  const encoder = new TextEncoder();
  const passwordData = encoder.encode(password);
  
  // Importer la clé pour PBKDF2
  const baseKey = await crypto.subtle.importKey(
    'raw',
    passwordData,
    'PBKDF2',
    false,
    ['deriveBits']
  );
  
  // Dériver le hash avec PBKDF2 (100000 itérations, SHA-256)
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    baseKey,
    256
  );
  
  const hashHex = Array.from(new Uint8Array(derivedBits))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  // Retourner salt:hash
  return `${saltHex}:${hashHex}`;
}

/**
 * Vérification sécurisée du mot de passe
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    // Extraire salt et hash du format salt:hash
    const [saltHex, expectedHash] = storedHash.split(':');
    
    if (!saltHex || !expectedHash) {
      return false;
    }
    
    // Reconstruire le salt
    const salt = new Uint8Array(saltHex.match(/.{2}/g)!.map(byte => parseInt(byte, 16)));
    
    // Encoder le mot de passe
    const encoder = new TextEncoder();
    const passwordData = encoder.encode(password);
    
    // Importer la clé pour PBKDF2
    const baseKey = await crypto.subtle.importKey(
      'raw',
      passwordData,
      'PBKDF2',
      false,
      ['deriveBits']
    );
    
    // Dériver le hash avec les mêmes paramètres
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      baseKey,
      256
    );
    
    const computedHash = Array.from(new Uint8Array(derivedBits))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    // Comparaison en temps constant pour éviter les timing attacks
    return timingSafeEqual(computedHash, expectedHash);
  } catch {
    return false;
  }
}

/**
 * Comparaison en temps constant pour éviter les timing attacks
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Génère un token JWT sécurisé avec HMAC-SHA256
 */
export async function generateToken(userId: number, email: string): Promise<string> {
  const secret = JWT_SECRET || (process.env.NODE_ENV !== 'production' ? 'dev-secret-key-do-not-use-in-prod' : '');
  
  if (!secret) {
    throw new Error('JWT_SECRET non configuré');
  }
  
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    userId,
    email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (JWT_EXPIRY_HOURS * 60 * 60)
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  
  // Signature HMAC-SHA256
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signatureData = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(`${encodedHeader}.${encodedPayload}`)
  );
  
  const signature = base64UrlEncode(String.fromCharCode(...new Uint8Array(signatureData)));
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Vérifie un token JWT avec validation de signature HMAC-SHA256
 */
export async function verifyToken(token: string): Promise<{ userId: number; email: string } | null> {
  try {
    const secret = JWT_SECRET || (process.env.NODE_ENV !== 'production' ? 'dev-secret-key-do-not-use-in-prod' : '');
    
    if (!secret) {
      return null;
    }
    
    const [encodedHeader, encodedPayload, signature] = token.split('.');
    
    if (!encodedHeader || !encodedPayload || !signature) {
      return null;
    }
    
    // Vérifier la signature HMAC-SHA256
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    const signatureBytes = Uint8Array.from(
      base64UrlDecode(signature).split('').map(c => c.charCodeAt(0))
    );
    
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes,
      encoder.encode(`${encodedHeader}.${encodedPayload}`)
    );
    
    if (!isValid) {
      return null;
    }
    
    // Décoder le payload
    const decodedPayload = JSON.parse(base64UrlDecode(encodedPayload));
    
    // Vérifier expiration
    if (decodedPayload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return {
      userId: decodedPayload.userId,
      email: decodedPayload.email
    };
  } catch {
    return null;
  }
}

/**
 * Encode en Base64 URL-safe
 */
function base64UrlEncode(str: string): string {
  const base64 = Buffer.from(str).toString('base64');
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Decode depuis Base64 URL-safe
 */
function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString();
}
