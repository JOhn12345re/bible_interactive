// API Bible simplifiée pour Vercel
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route de santé
app.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    },
    message: 'API Bible en fonctionnement'
  });
});

// Route pour les thèmes
app.get('/api/topics', (req, res) => {
  const topics = [
    { name: 'Foi', slug: 'foi', count: 3 },
    { name: 'Amour', slug: 'amour', count: 3 },
    { name: 'Joie', slug: 'joie', count: 3 },
    { name: 'Pardonner', slug: 'pardonner', count: 3 },
    { name: 'Espérance', slug: 'espérance', count: 2 },
    { name: 'Patience', slug: 'patience', count: 2 },
    { name: 'Sagesse', slug: 'sagesse', count: 2 },
    { name: 'Obéissance', slug: 'obéissance', count: 2 },
    { name: 'Courage', slug: 'courage', count: 2 },
    { name: 'Gratitude', slug: 'gratitude', count: 2 },
    { name: 'Paix', slug: 'paix', count: 2 },
    { name: 'Force', slug: 'force', count: 2 },
    { name: 'Humilité', slug: 'humilité', count: 2 },
    { name: 'Justice', slug: 'justice', count: 2 },
    { name: 'Loyauté', slug: 'loyauté', count: 2 },
    { name: 'Obéissance à Dieu', slug: 'obéissance à Dieu', count: 2 },
    { name: 'Espérance éternelle', slug: 'espérance éternelle', count: 2 },
    { name: 'Peur', slug: 'peur', count: 3 }
  ];
  
  res.json({
    success: true,
    data: topics
  });
});

// Route pour un thème spécifique
app.get('/api/topics/:slug', (req, res) => {
  const { slug } = req.params;
  
  const topicsData = {
    'foi': [
      { verset: 'Genèse 6:13', texte: 'Dieu dit à Noé : La fin de toute chair est arrêtée devant moi ; car la terre est pleine de violence à cause d\'eux ; voici, je vais les détruire avec la terre.' },
      { verset: 'Genèse 12:1', texte: 'L\'Éternel dit à Abram : Va-t\'en de ton pays, de ta patrie et de la maison de ton père, vers le pays que je te montrerai.' },
      { verset: 'Hébreux 11:1', texte: 'Or la foi est une ferme assurance des choses qu\'on espère, une démonstration de celles qu\'on ne voit pas.' }
    ],
    'amour': [
      { verset: 'Luc 2:11', texte: 'Voici, je vous annonce une bonne nouvelle, qui sera pour tout le peuple, le salut qui vous est né aujourd\'hui : c\'est un Sauveur, qui est le Christ, le Seigneur.' },
      { verset: 'Genèse 45:7', texte: 'Dieu m\'a envoyé devant vous pour préserver la vie, afin de vous conserver un reste sur la terre et de vous sauver par un grand délivrance.' },
      { verset: 'Jean 3:16', texte: 'Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais ait la vie éternelle.' }
    ],
    'joie': [
      { verset: 'Luc 2:20', texte: 'Les bergers s\'en retournèrent, glorifiant et louant Dieu pour tout ce qu\'ils avaient entendu et vu, comme cela leur avait été annoncé.' },
      { verset: 'Genèse 12:2', texte: 'Je ferai de toi une grande nation, et je te bénirai ; je rendrai ton nom grand, et tu seras une source de bénédiction.' },
      { verset: 'Philippiens 4:4', texte: 'Réjouissez-vous toujours dans le Seigneur ; je le répète, réjouissez-vous.' }
    ]
  };
  
  const verses = topicsData[slug] || [];
  
  if (verses.length === 0) {
    return res.status(404).json({
      success: false,
      error: 'Thème non trouvé'
    });
  }
  
  res.json({
    success: true,
    data: {
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      slug: slug,
      verses: verses,
      count: verses.length
    }
  });
});

// Route pour le verset du jour
app.get('/api/verse-of-the-day', (req, res) => {
  const verses = [
    {
      verset: 'Jean 3:16',
      texte: 'Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais ait la vie éternelle.',
      reference: 'Jean 3:16',
      date: new Date().toISOString().split('T')[0],
      theme: 'Amour'
    },
    {
      verset: 'Genèse 1:1',
      texte: 'Au commencement, Dieu créa les cieux et la terre.',
      reference: 'Genèse 1:1',
      date: new Date().toISOString().split('T')[0],
      theme: 'Création'
    },
    {
      verset: 'Luc 2:11',
      texte: 'Voici, je vous annonce une bonne nouvelle, qui sera pour tout le peuple, le salut qui vous est né aujourd\'hui : c\'est un Sauveur, qui est le Christ, le Seigneur.',
      reference: 'Luc 2:11',
      date: new Date().toISOString().split('T')[0],
      theme: 'Salut'
    }
  ];
  
  // Sélectionner un verset aléatoire basé sur le jour
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const selectedVerse = verses[dayOfYear % verses.length];
  
  res.json({
    success: true,
    data: selectedVerse
  });
});

// Route pour les livres de la Bible
app.get('/api/books', (req, res) => {
  const books = [
    { id: 'genese', name: 'Genèse', chapters: 50 },
    { id: 'exode', name: 'Exode', chapters: 40 },
    { id: 'luc', name: 'Luc', chapters: 24 },
    { id: 'jean', name: 'Jean', chapters: 21 },
    { id: 'matthieu', name: 'Matthieu', chapters: 28 },
    { id: 'philippiens', name: 'Philippiens', chapters: 4 },
    { id: 'hebreux', name: 'Hébreux', chapters: 13 },
    { id: 'psaumes', name: 'Psaumes', chapters: 150 },
    { id: 'proverbes', name: 'Proverbes', chapters: 31 },
    { id: 'esaie', name: 'Ésaïe', chapters: 66 },
    { id: 'jeremie', name: 'Jérémie', chapters: 52 },
    { id: 'romains', name: 'Romains', chapters: 16 },
    { id: 'galates', name: 'Galates', chapters: 6 },
    { id: 'jacques', name: 'Jacques', chapters: 5 },
    { id: '1thessaloniciens', name: '1 Thessaloniciens', chapters: 5 },
    { id: '1rois', name: '1 Rois', chapters: 22 },
    { id: 'juges', name: 'Juges', chapters: 21 },
    { id: 'josue', name: 'Josué', chapters: 24 },
    { id: 'michee', name: 'Michée', chapters: 7 },
    { id: 'ruth', name: 'Ruth', chapters: 4 },
    { id: 'apocalypse', name: 'Apocalypse', chapters: 22 }
  ];
  
  res.json({
    success: true,
    data: books
  });
});

// Route par défaut
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API Bible - Service en ligne',
    endpoints: [
      'GET /health - Santé de l\'API',
      'GET /api/books - Liste des livres',
      'GET /api/topics - Liste des thèmes',
      'GET /api/topics/:slug - Thème spécifique',
      'GET /api/verse-of-the-day - Verset du jour'
    ]
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur API:', err);
  res.status(500).json({
    success: false,
    error: 'Erreur interne du serveur',
    message: 'Une erreur est survenue lors du traitement de votre demande'
  });
});

// Route 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route non trouvée',
    message: 'L\'endpoint demandé n\'existe pas'
  });
});

module.exports = app;
