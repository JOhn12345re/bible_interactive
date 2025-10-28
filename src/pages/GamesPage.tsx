import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';

const GamesPage = () => {
  const { contrastHigh } = useSettings();

  const games = [
    {
      id: 'verse-memory',
      title: 'Mémorisation des Versets',
      description:
        'Apprends les plus beaux versets avec des jeux de mémoire amusants.',
      emoji: '🧠',
      difficulty: 'Moyen',
      players: '1 joueur',
      colorClass: 'bg-gradient-to-br from-purple-500 to-indigo-600',
      available: true,
      link: '/games/verse-memory',
    },
    {
      id: 'temple-builder',
      title: 'Constructeur de Temple',
      description:
        'Construis le temple de Salomon en plaçant chaque élément à sa place.',
      emoji: '🏛️',
      difficulty: 'Facile',
      players: '1 joueur',
      colorClass: 'bg-gradient-to-br from-amber-500 to-orange-600',
      available: true,
      link: '/games/temple-builder',
    },
    {
      id: 'course-miracle',
      title: 'Course au Miracle',
      description:
        'Collectionne les éléments pour reproduire les miracles de Jésus !',
      emoji: '🏃‍♂️',
      difficulty: 'Moyen',
      players: '1 joueur',
      colorClass: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      available: true,
      link: '/games/miracle-race',
    },
    {
      id: 'bible-quiz',
      title: 'Quiz Biblique',
      description: 'Teste tes connaissances avec des questions sur la Bible !',
      emoji: '🤔',
      difficulty: 'Moyen',
      players: '1 joueur',
      colorClass: 'bg-gradient-to-br from-green-500 to-teal-600',
      available: true,
      link: '/games/bible-quiz',
    },
    {
      id: 'verse-memory-cards',
      title: 'Memory des Versets',
      description:
        'Retrouve les paires verset-référence pour mémoriser la Parole !',
      emoji: '🃏',
      difficulty: 'Facile',
      players: '1 joueur',
      colorClass: 'bg-gradient-to-br from-pink-500 to-rose-600',
      available: true,
      link: '/games/verse-memory-cards',
    },
    {
      id: 'ark-puzzle',
      title: "Puzzle de l'Arche",
      description:
        "Aide Noé à placer tous les animaux dans l'arche avant le déluge !",
      emoji: '🚢',
      difficulty: 'Facile',
      players: '1 joueur',
      colorClass: 'bg-gradient-to-br from-blue-600 to-indigo-700',
      available: true,
      link: '/games/ark-puzzle',
    },
    {
      id: 'treasure-hunt',
      title: 'Chasse au Trésor',
      description:
        'Explore les lieux saints et découvre les trésors bibliques !',
      emoji: '🗺️',
      difficulty: 'Difficile',
      players: '1 joueur',
      colorClass: 'bg-gradient-to-br from-yellow-500 to-orange-600',
      available: true,
      link: '/games/treasure-hunt',
    },


  ];

  return (
    <div
      className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-purple-50 via-white to-pink-50'}`}
    >
      {/* Header */}
      <header
        className={`py-6 px-4 sm:px-6 lg:px-8 ${contrastHigh ? 'bg-contrast-bg' : 'bg-white shadow-sm'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  contrastHigh
                    ? 'hover:bg-contrast-text/20'
                    : 'hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl">←</span>
                <span>Retour</span>
              </Link>
              <div>
                <h1
                  className={`text-2xl sm:text-3xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}
                >
                  🎮 Mini-Jeux Bibliques
                </h1>
                <p
                  className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}
                >
                  Apprends en t'amusant avec des jeux interactifs
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div
          className={`mb-8 p-6 rounded-2xl ${
            contrastHigh
              ? 'bg-contrast-bg border-2 border-contrast-text'
              : 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200'
          }`}
        >
          <div className="flex items-start space-x-4">
            <span className="text-4xl">🎯</span>
            <div>
              <h2
                className={`text-xl font-bold mb-2 ${
                  contrastHigh ? 'text-contrast-text' : 'text-purple-800'
                }`}
              >
                Prêt à Jouer ?
              </h2>
              <p
                className={`${
                  contrastHigh ? 'text-contrast-text' : 'text-purple-700'
                }`}
              >
                Sept jeux éducatifs t'attendent ! Quiz, mémoire, construction,
                course, puzzles, et chasse au trésor. Chaque jeu terminé te
                donne des points et peut débloquer de nouveaux badges !
              </p>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => {
            if (game.available && game.link) {
              return (
                <Link
                  key={game.id}
                  to={game.link}
                  className={`group relative block p-6 rounded-2xl text-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${game.colorClass}`}
                >
                  {/* Background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 bg-green-400 text-green-900 text-xs font-bold px-2 py-1 rounded-full">
                    Disponible
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      {game.emoji}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-100 transition-colors duration-300">
                      {game.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300 mb-4 leading-relaxed">
                      {game.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-xs opacity-80 mb-4">
                      <span className="flex items-center space-x-1">
                        <span>📊</span>
                        <span>{game.difficulty}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>👤</span>
                        <span>{game.players}</span>
                      </span>
                    </div>

                    {/* Play indicator */}
                    <div className="flex items-center text-white/80 group-hover:text-white transition-colors duration-300">
                      <span className="text-sm font-medium mr-2">
                        Jouer maintenant
                      </span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m3-6l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Background pattern */}
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 opacity-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125">
                    {game.emoji}
                  </div>
                </Link>
              );
            } else {
              return (
                <div
                  key={game.id}
                  className={`group relative block p-6 rounded-2xl text-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl cursor-default ${game.colorClass}`}
                >
                  {/* Background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                    Bientôt
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      {game.emoji}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-100 transition-colors duration-300">
                      {game.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300 mb-4 leading-relaxed">
                      {game.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-xs opacity-80 mb-4">
                      <span className="flex items-center space-x-1">
                        <span>📊</span>
                        <span>{game.difficulty}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>👤</span>
                        <span>{game.players}</span>
                      </span>
                    </div>

                    {/* Play indicator */}
                    <div className="flex items-center text-white/60">
                      <span className="text-sm font-medium mr-2">
                        Bientôt disponible
                      </span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Background pattern */}
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 opacity-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125">
                    {game.emoji}
                  </div>
                </div>
              );
            }
          })}
        </div>

        {/* Development Notice */}
        <div
          className={`mt-12 p-8 rounded-2xl text-center ${
            contrastHigh
              ? 'bg-contrast-bg border-2 border-contrast-text'
              : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200'
          }`}
        >
          <div className="text-6xl mb-4">🚀</div>
          <h3
            className={`text-2xl font-bold mb-4 ${
              contrastHigh ? 'text-contrast-text' : 'text-blue-800'
            }`}
          >
            En Développement !
          </h3>
          <p
            className={`text-lg mb-6 ${
              contrastHigh ? 'text-contrast-text' : 'text-blue-700'
            }`}
          >
            Nos développeurs travaillent dur pour créer les jeux les plus
            amusants pour toi !
          </p>
          <div
            className={`grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto ${
              contrastHigh ? 'text-contrast-text' : 'text-blue-600'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">🎯</span>
              <span className="font-medium">Quiz Interactifs</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">🧩</span>
              <span className="font-medium">Puzzles Animés</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">🏆</span>
              <span className="font-medium">Système de Badges</span>
            </div>
          </div>

          <div
            className={`mt-6 p-4 rounded-xl ${
              contrastHigh
                ? 'bg-contrast-text/20'
                : 'bg-white/60 backdrop-blur-sm'
            }`}
          >
            <p
              className={`text-sm ${
                contrastHigh ? 'text-contrast-text' : 'text-blue-600'
              }`}
            >
              💡 <strong>Astuce :</strong> En attendant, explore les histoires
              bibliques pour débloquer tes premiers badges !
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GamesPage;
