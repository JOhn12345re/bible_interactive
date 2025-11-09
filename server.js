import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Route pour sauvegarder un fichier
app.post('/api/save-content', async (req, res) => {
  try {
    const { filePath, content } = req.body;

    if (!filePath || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'filePath et content sont requis' 
      });
    }

    // Sécurité: Vérifier que le chemin est dans public/content
    const normalizedPath = filePath.replace(/^\//, '');
    if (!normalizedPath.startsWith('content/')) {
      return res.status(403).json({ 
        success: false, 
        message: 'Accès refusé: chemin non autorisé' 
      });
    }

    // Construire le chemin complet
    const fullPath = path.join(__dirname, 'public', normalizedPath);
    
    // Vérifier que le dossier existe, sinon le créer
    const dir = path.dirname(fullPath);
    await fs.mkdir(dir, { recursive: true });

    // Sauvegarder le fichier
    const jsonContent = typeof content === 'string' 
      ? content 
      : JSON.stringify(content, null, 2);
    
    await fs.writeFile(fullPath, jsonContent, 'utf8');

    console.log(`✅ Fichier sauvegardé: ${fullPath}`);
    
    res.json({ 
      success: true, 
      message: 'Fichier sauvegardé avec succès',
      path: normalizedPath
    });

  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde:', error);
    res.status(500).json({ 
      success: false, 
      message: `Erreur serveur: ${error.message}` 
    });
  }
});

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Serveur API en ligne',
    timestamp: new Date().toISOString()
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`\n🚀 Serveur API de sauvegarde démarré sur http://localhost:${PORT}`);
  console.log(`📝 Endpoint de sauvegarde: http://localhost:${PORT}/api/save-content\n`);
});
