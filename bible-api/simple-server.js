const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Route de test
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

// Route des thèmes
app.get('/api/topics', (req, res) => {
  const topics = {
    "peur": [
      { "ref": "Genèse 3:6", "texte": "La femme vit que l'arbre était bon à manger, agréable à regarder, et que l'arbre était précieux pour ouvrir l'intelligence. Elle prit de son fruit, et en mangea ; elle en donna aussi à son mari, qui était avec elle, et il en mangea." },
      { "ref": "Luc 2:10", "texte": "Mais l'ange leur dit : Ne craignez point ; car voici, je vous annonce une bonne nouvelle, qui sera pour tout le peuple, le salut qui vous est né aujourd'hui : c'est un Sauveur, qui est le Christ, le Seigneur." }
    ],
    "joie": [
      { "ref": "Luc 2:20", "texte": "Les bergers s'en retournèrent, glorifiant et louant Dieu pour tout ce qu'ils avaient entendu et vu, comme cela leur avait été annoncé." },
      { "ref": "Genèse 12:2", "texte": "Je ferai de toi une grande nation, et je te bénirai ; je rendrai ton nom grand, et tu seras une source de bénédiction." }
    ],
    "foi": [
      { "ref": "Genèse 6:13", "texte": "Dieu dit à Noé : La fin de toute chair est arrêtée devant moi ; car la terre est pleine de violence à cause d'eux ; voici, je vais les détruire avec la terre." },
      { "ref": "Genèse 12:1", "texte": "L'Éternel dit à Abram : Va-t'en de ton pays, de ta patrie et de la maison de ton père, vers le pays que je te montrerai." }
    ]
  };

  const topicsList = Object.entries(topics).map(([slug, verses]) => ({
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    slug: slug,
    verses: verses,
    count: verses.length
  }));

  res.json({
    success: true,
    data: topicsList,
    message: `${topicsList.length} thèmes disponibles`
  });
});

// Route d'un thème spécifique
app.get('/api/topics/:slug', (req, res) => {
  const { slug } = req.params;
  const topics = {
    "peur": [
      { "ref": "Genèse 3:6", "texte": "La femme vit que l'arbre était bon à manger, agréable à regarder, et que l'arbre était précieux pour ouvrir l'intelligence. Elle prit de son fruit, et en mangea ; elle en donna aussi à son mari, qui était avec elle, et il en mangea." },
      { "ref": "Luc 2:10", "texte": "Mais l'ange leur dit : Ne craignez point ; car voici, je vous annonce une bonne nouvelle, qui sera pour tout le peuple, le salut qui vous est né aujourd'hui : c'est un Sauveur, qui est le Christ, le Seigneur." }
    ],
    "joie": [
      { "ref": "Luc 2:20", "texte": "Les bergers s'en retournèrent, glorifiant et louant Dieu pour tout ce qu'ils avaient entendu et vu, comme cela leur avait été annoncé." },
      { "ref": "Genèse 12:2", "texte": "Je ferai de toi une grande nation, et je te bénirai ; je rendrai ton nom grand, et tu seras une source de bénédiction." }
    ],
    "foi": [
      { "ref": "Genèse 6:13", "texte": "Dieu dit à Noé : La fin de toute chair est arrêtée devant moi ; car la terre est pleine de violence à cause d'eux ; voici, je vais les détruire avec la terre." },
      { "ref": "Genèse 12:1", "texte": "L'Éternel dit à Abram : Va-t'en de ton pays, de ta patrie et de la maison de ton père, vers le pays que je te montrerai." }
    ]
  };

  if (!topics[slug]) {
    return res.status(404).json({
      success: false,
      error: 'Thème non trouvé',
      message: `Le thème "${slug}" n'existe pas`
    });
  }

  res.json({
    success: true,
    data: {
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      slug: slug,
      verses: topics[slug],
      count: topics[slug].length
    },
    message: `Thème "${slug}" - ${topics[slug].length} verset(s)`
  });
});

// Route du verset du jour
app.get('/api/verse-of-the-day', (req, res) => {
  const verses = [
    { "ref": "Genèse 1:1", "texte": "Au commencement, Dieu créa les cieux et la terre." },
    { "ref": "Jean 3:16", "texte": "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais ait la vie éternelle." },
    { "ref": "Luc 2:10", "texte": "Mais l'ange leur dit : Ne craignez point ; car voici, je vous annonce une bonne nouvelle, qui sera pour tout le peuple, le salut qui vous est né aujourd'hui : c'est un Sauveur, qui est le Christ, le Seigneur." }
  ];

  const today = new Date();
  const dateString = today.toISOString().split('T')[0];
  const index = today.getDate() % verses.length;
  const selectedVerse = verses[index];

  res.json({
    success: true,
    data: {
      verset: selectedVerse.ref,
      texte: selectedVerse.texte,
      reference: selectedVerse.ref,
      date: dateString
    },
    message: `Verset du jour - ${dateString}`
  });
});

// Route racine
app.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      message: 'Bienvenue sur l\'API Bible !',
      documentation: '/api',
      health: '/health'
    },
    message: 'API Bible Louis Segond 1910'
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 API Bible démarrée sur le port ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`❤️ Santé: http://localhost:${PORT}/health`);
  console.log(`🏷️ Thèmes: http://localhost:${PORT}/api/topics`);
  console.log(`⭐ Verset du jour: http://localhost:${PORT}/api/verse-of-the-day`);
});

module.exports = app;
