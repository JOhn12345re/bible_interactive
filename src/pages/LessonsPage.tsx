import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';

const LessonsPage = () => {
  const { contrastHigh } = useSettings();

  const lessons = [
    {
      id: 'noe_01',
      title: 'Noé et l\'Arche',
      description: 'Comment Noé a sauvé tous les animaux du déluge dans son arche géante.',
      emoji: '�',
      duration: '15 min',
      difficulty: 'Facile',
      colorClass: 'bg-gradient-to-br from-purple-500 to-blue-600'
    },
    {
      id: 'adam_eve_01',
      title: 'Adam et Ève au Jardin d\'Éden',
      description: 'L\'histoire du premier homme et de la première femme dans le magnifique jardin.',
      emoji: '🌳',
      duration: '12 min',
      difficulty: 'Facile',
      colorClass: 'bg-gradient-to-br from-green-500 to-emerald-600'
    },
    {
      id: 'creation_01',
      title: 'La Création du Monde',
      description: 'Découvre comment Dieu a créé le monde en 7 jours.',
      emoji: '🌍',
      duration: '10 min',
      difficulty: 'Facile',
      colorClass: 'bg-gradient-to-br from-blue-500 to-cyan-600'
    },
    {
      id: 'moise_01',
      title: 'Moïse et la Mer Rouge',
      description: 'Le miracle extraordinaire de la séparation des eaux de la mer Rouge.',
      emoji: '🌊',
      duration: '18 min',
      difficulty: 'Moyen',
      colorClass: 'bg-gradient-to-br from-teal-500 to-blue-600'
    },
    {
      id: 'david_01',
      title: 'David et Goliath',
      description: 'Comment un petit berger a vaincu le géant avec sa fronde et sa foi.',
      emoji: '⚔️',
      duration: '14 min',
      difficulty: 'Moyen',
      colorClass: 'bg-gradient-to-br from-yellow-500 to-orange-600'
    },
    {
      id: 'daniel_01',
      title: 'Daniel dans la Fosse aux Lions',
      description: 'L\'histoire courageuse de Daniel qui a été protégé par Dieu.',
      emoji: '🦁',
      duration: '16 min',
      difficulty: 'Moyen',
      colorClass: 'bg-gradient-to-br from-red-500 to-pink-600'
    }
  ];

  return (
    <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
      {/* Header */}
      <header className={`py-6 px-4 sm:px-6 lg:px-8 ${contrastHigh ? 'bg-contrast-bg' : 'bg-white shadow-sm'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  contrastHigh ? 'hover:bg-contrast-text/20' : 'hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl">←</span>
                <span>Retour</span>
              </Link>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                  📚 Histoires Bibliques
                </h1>
                <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                  Découvre les plus belles histoires de la Bible
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className={`mb-8 p-6 rounded-2xl ${
          contrastHigh 
            ? 'bg-contrast-bg border-2 border-contrast-text'
            : 'bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200'
        }`}>
          <div className="flex items-start space-x-4">
            <span className="text-4xl">🌟</span>
            <div>
              <h2 className={`text-xl font-bold mb-2 ${
                contrastHigh ? 'text-contrast-text' : 'text-yellow-800'
              }`}>
                Prêt pour l'Aventure ?
              </h2>
              <p className={`${
                contrastHigh ? 'text-contrast-text' : 'text-yellow-700'
              }`}>
                Chaque histoire que tu lis te rapprochera d'un badge spécial ! 
                Clique sur une histoire pour commencer ton voyage.
              </p>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Link
              key={lesson.id}
              to={`/lesson/${lesson.id}`}
              className={`group relative block p-6 rounded-2xl text-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${lesson.colorClass}`}
            >
              {/* Background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {lesson.emoji}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-100 transition-colors duration-300">
                  {lesson.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300 mb-4 leading-relaxed">
                  {lesson.description}
                </p>
                
                {/* Metadata */}
                <div className="flex items-center justify-between text-xs opacity-80">
                  <span className="flex items-center space-x-1">
                    <span>⏱️</span>
                    <span>{lesson.duration}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>📊</span>
                    <span>{lesson.difficulty}</span>
                  </span>
                </div>
                
                {/* Play indicator */}
                <div className="mt-4 flex items-center text-white/80 group-hover:text-white transition-colors duration-300">
                  <span className="text-sm font-medium mr-2">Commencer</span>
                  <svg 
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m3-6l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
              </div>
              
              {/* Background pattern */}
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 opacity-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125">
                {lesson.emoji}
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className={`mt-12 p-6 rounded-2xl text-center ${
          contrastHigh 
            ? 'bg-contrast-bg border-2 border-contrast-text'
            : 'bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200'
        }`}>
          <div className="text-4xl mb-4">🚧</div>
          <h3 className={`text-xl font-bold mb-2 ${
            contrastHigh ? 'text-contrast-text' : 'text-gray-800'
          }`}>
            Bientôt Disponible !
          </h3>
          <p className={`${
            contrastHigh ? 'text-contrast-text' : 'text-gray-600'
          }`}>
            De nouvelles histoires passionnantes arrivent bientôt. 
            Reste connecté pour découvrir encore plus d'aventures bibliques !
          </p>
        </div>
      </main>
    </div>
  );
};

export default LessonsPage;