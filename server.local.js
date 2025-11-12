import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;

const requestCounts = new Map();
const RATE_LIMIT = 100;
const RATE_WINDOW = 60 * 1000;

const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return next();
  }
  
  const record = requestCounts.get(ip);
  
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + RATE_WINDOW;
    return next();
  }
  
  if (record.count >= RATE_LIMIT) {
    return res.status(429).json({
      success: false,
      message: 'Trop de requêtes. Veuillez réessayer plus tard.'
    });
  }
  
  record.count++;
  next();
};

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://votredomaine.vercel.app'] 
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(rateLimiter);

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.post('/api/save-content', async (req, res) => {
  try {
    const { filePath, content } = req.body;

    if (!filePath || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'filePath et content sont requis' 
      });
    }

    const normalizedPath = filePath.replace(/^\//, '');
    if (!normalizedPath.startsWith('content/')) {
      return res.status(403).json({ 
        success: false, 
        message: 'Accès refusé: chemin non autorisé' 
      });
    }

    const fullPath = path.join(__dirname, 'public', normalizedPath);
    
    const dir = path.dirname(fullPath);
    await fs.mkdir(dir, { recursive: true });

    const jsonContent = typeof content === 'string' 
      ? content 
      : JSON.stringify(content, null, 2);
    
    await fs.writeFile(fullPath, jsonContent, 'utf8');
    
    res.json({ 
      success: true, 
      message: 'Fichier sauvegardé avec succès',
      path: normalizedPath
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: `Erreur serveur: ${error.message}` 
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Serveur API en ligne',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`� API Server: http://localhost:${PORT}`);
  }
});
