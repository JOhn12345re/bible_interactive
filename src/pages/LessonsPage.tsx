import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';

const LessonsPage = () => {
  const { contrastHigh } = useSettings();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Liste des leçons disponibles (présentes dans public/content/*.json)
  const AVAILABLE_IDS = new Set<string>([
    // Toutes les leçons sont temporairement désactivées car en cours de développement
    // Aucune leçon n'est disponible pour le moment
  ]);

  const categories = [
    {
      id: 'all',
      title: 'Toutes les sections',
      icon: '📚',
      description: 'Toutes les sections spécialisées',
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'icones_coptes',
      title: 'Les icônes coptes',
      icon: '🖼️',
      description: "L'art sacré de la tradition copte",
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'histoire_saints',
      title: "L'histoire des saints",
      icon: '👼',
      description: 'Les vies exemplaires des saints de l\'Église',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const lessons = [
    // Icônes coptes
    {
      id: 'icone_annonciation',
      title: 'L\'Annonciation',
      description: 'L\'ange Gabriel annonce à Marie qu\'elle portera le Sauveur.',
      emoji: '👼',
      duration: '12 min',
      difficulty: 'Facile',
      category: 'icones_coptes',
      colorClass: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    },
    {
      id: 'icone_pantocrator',
      title: 'Le Christ Pantocrator',
      description: 'Découvre la plus célèbre des icônes du Christ Roi de l\'univers.',
      emoji: '🖼️',
      duration: '12 min',
      difficulty: 'Facile',
      category: 'icones_coptes',
      colorClass: 'bg-gradient-to-br from-purple-500 to-indigo-600',
    },
    {
      id: 'icone_theotokos',
      title: 'La Théotokos - Mère de Dieu',
      description: 'Les représentations de la Vierge Marie dans l\'art copte.',
      emoji: '👸',
      duration: '14 min',
      difficulty: 'Facile',
      category: 'icones_coptes',
      colorClass: 'bg-gradient-to-br from-pink-500 to-purple-600',
    },
    {
      id: 'icone_nativite',
      title: 'L\'icône de la Nativité',
      description: 'La naissance du Christ représentée dans la tradition copte.',
      emoji: '🎄',
      duration: '13 min',
      difficulty: 'Facile',
      category: 'icones_coptes',
      colorClass: 'bg-gradient-to-br from-green-500 to-teal-600',
    },
    {
      id: 'icone_resurrection',
      title: 'L\'icône de la Résurrection',
      description: 'Le Christ vainqueur de la mort dans l\'art copte.',
      emoji: '☀️',
      duration: '15 min',
      difficulty: 'Moyen',
      category: 'icones_coptes',
      colorClass: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    },
    {
      id: 'icone_sagesse',
      title: 'L\'icône de la Sagesse Divine',
      description: 'La représentation de la Sagesse de Dieu dans l\'iconographie.',
      emoji: '📜',
      duration: '14 min',
      difficulty: 'Moyen',
      category: 'icones_coptes',
      colorClass: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    },
    // Histoire des saints
    {
      id: 'saint_antoine',
      title: 'Saint Antoine le Grand',
      description: 'Le père du monachisme et sa vie dans le désert égyptien.',
      emoji: '👼',
      duration: '16 min',
      difficulty: 'Moyen',
      category: 'histoire_saints',
      colorClass: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    },
    {
      id: 'saint_athanase',
      title: 'Saint Athanase d\'Alexandrie',
      description: 'Le défenseur de la foi contre l\'arianisme.',
      emoji: '⛪',
      duration: '18 min',
      difficulty: 'Moyen',
      category: 'histoire_saints',
      colorClass: 'bg-gradient-to-br from-orange-500 to-red-600',
    },
    {
      id: 'saint_cyrille',
      title: 'Saint Cyrille d\'Alexandrie',
      description: 'Le pilier de la foi et théologien de l\'Incarnation.',
      emoji: '📖',
      duration: '17 min',
      difficulty: 'Moyen',
      category: 'histoire_saints',
      colorClass: 'bg-gradient-to-br from-red-500 to-pink-600',
    },
    {
      id: 'saint_cyrille_alexandrie',
      title: 'Saint Cyrille d\'Alexandrie - Vie complète',
      description: 'L\'histoire complète du grand docteur de l\'Église.',
      emoji: '✝️',
      duration: '20 min',
      difficulty: 'Avancé',
      category: 'histoire_saints',
      colorClass: 'bg-gradient-to-br from-red-600 to-orange-600',
    },
    {
      id: 'saint_macaire',
      title: 'Saint Macaire l\'Égyptien',
      description: 'Le grand spirituel du désert de Scété.',
      emoji: '🏜️',
      duration: '16 min',
      difficulty: 'Moyen',
      category: 'histoire_saints',
      colorClass: 'bg-gradient-to-br from-amber-500 to-yellow-600',
    },
    {
      id: 'sainte_marie_egyptienne',
      title: 'Sainte Marie l\'Égyptienne',
      description: 'La grande pénitente du désert.',
      emoji: '🌸',
      duration: '19 min',
      difficulty: 'Moyen',
      category: 'histoire_saints',
      colorClass: 'bg-gradient-to-br from-pink-500 to-rose-600',
    },
  ];

  const filteredLessons = selectedCategory === 'all' 
    ? lessons 
    : lessons.filter(lesson => lesson.category === selectedCategory);

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div
      className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}
    >
      {/* Header */}
      <header
        className={`py-4 sm:py-6 px-3 sm:px-6 lg:px-8 ${contrastHigh ? 'bg-contrast-bg' : 'bg-white shadow-sm'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                to="/"
                className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-full transition-colors text-sm sm:text-base ${
                  contrastHigh
                    ? 'hover:bg-contrast-text/20'
                    : 'hover:bg-gray-100'
                }`}
              >
                <span className="text-lg sm:text-2xl">←</span>
                <span className="hidden sm:inline">Retour</span>
              </Link>
              <div>
                <h1
                  className={`text-lg sm:text-2xl md:text-3xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}
                >
                  🎨 Sections Spécialisées
                </h1>
                <p
                  className={`text-xs sm:text-sm hidden sm:block ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}
                >
                  Découvre l'art sacré copte et les vies des saints
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
        {/* Categories Tabs */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm ${
                  selectedCategory === category.id
                    ? contrastHigh
                      ? 'bg-contrast-text text-contrast-bg'
                      : `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : contrastHigh
                    ? 'bg-contrast-bg border border-contrast-text text-contrast-text hover:bg-contrast-text/10'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span>{category.icon}</span>
                <span className="font-medium">{category.title}</span>
              </button>
            ))}
          </div>

          {/* Category Description */}
          {selectedCategoryData && (
            <div className={`p-3 sm:p-4 rounded-lg ${
              contrastHigh 
                ? 'bg-contrast-bg border border-contrast-text' 
                : 'bg-white border border-gray-200 shadow-sm'
            }`}>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-xl sm:text-2xl">{selectedCategoryData.icon}</span>
                <div>
                  <h2 className={`text-base sm:text-lg font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                    {selectedCategoryData.title}
                  </h2>
                  <p className={`text-xs sm:text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                    {selectedCategoryData.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Introduction */}
        <div
          className={`mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl ${
            contrastHigh
              ? 'bg-contrast-bg border-2 border-contrast-text'
              : 'bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200'
          }`}
        >
          <div className="flex items-start space-x-3 sm:space-x-4">
            <span className="text-3xl sm:text-4xl flex-shrink-0">🌟</span>
            <div>
              <h2
                className={`text-lg sm:text-xl font-bold mb-1.5 sm:mb-2 ${
                  contrastHigh ? 'text-contrast-text' : 'text-yellow-800'
                }`}
              >
                Prêt pour l'Aventure ?
              </h2>
              <p
                className={`text-sm sm:text-base ${
                  contrastHigh ? 'text-contrast-text' : 'text-yellow-700'
                }`}
              >
                Chaque histoire que tu lis te rapprochera d'un badge spécial !
                Clique sur une histoire pour commencer ton voyage.
              </p>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredLessons.map((lesson) => {
            const isAvailable = AVAILABLE_IDS.has(lesson.id);
            
            const cardContent = (
              <>
                {/* Badge indisponible */}
                {!isAvailable && (
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/30 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm">
                    BIENTÔT
                  </div>
                )}

                {/* Background overlay */}
                {isAvailable && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                )}

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`text-4xl sm:text-5xl mb-3 sm:mb-4 transition-transform duration-300 ${isAvailable ? 'transform group-hover:scale-110 group-hover:rotate-6' : ''}`}>
                    {lesson.emoji}
                  </div>

                  {/* Title */}
                  <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 transition-colors duration-300 ${isAvailable ? 'group-hover:text-yellow-100' : ''}`}>
                    {lesson.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-xs sm:text-sm opacity-90 transition-opacity duration-300 mb-3 sm:mb-4 leading-relaxed ${isAvailable ? 'group-hover:opacity-100' : ''}`}>
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
                  <div className={`mt-4 flex items-center text-white/80 transition-colors duration-300 ${isAvailable ? 'group-hover:text-white' : ''}`}>
                    <span className="text-sm font-medium mr-2">{isAvailable ? 'Commencer' : 'Indisponible'}</span>
                    {isAvailable && (
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
                    )}
                  </div>
                </div>

                {/* Background pattern */}
                {isAvailable && (
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 opacity-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125">
                    {lesson.emoji}
                  </div>
                )}
              </>
            );
            
            return isAvailable ? (
              <Link
                key={lesson.id}
                to={`/lesson/${lesson.id}`}
                className={`group relative block p-4 sm:p-6 rounded-2xl text-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${lesson.colorClass}`}
              >
                {cardContent}
              </Link>
            ) : (
              <div
                key={lesson.id}
                className={`group relative block p-4 sm:p-6 rounded-2xl text-white transition-all duration-300 opacity-60 cursor-not-allowed ${lesson.colorClass}`}
              >
                {cardContent}
              </div>
            );
          })}
        </div>

        {/* Coming Soon Section */}
        <div
          className={`mt-8 sm:mt-12 p-4 sm:p-6 rounded-2xl text-center ${
            contrastHigh
              ? 'bg-contrast-bg border-2 border-contrast-text'
              : 'bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200'
          }`}
        >
          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🚧</div>
          <h3
            className={`text-lg sm:text-xl font-bold mb-2 ${
              contrastHigh ? 'text-contrast-text' : 'text-gray-800'
            }`}
          >
            Bientôt Disponible !
          </h3>
          <p
            className={`text-sm sm:text-base ${
              contrastHigh ? 'text-contrast-text' : 'text-gray-600'
            }`}
          >
            De nouvelles histoires passionnantes arrivent bientôt. Reste
            connecté pour découvrir encore plus d'aventures bibliques !
          </p>
        </div>
      </main>
    </div>
  );
};

export default LessonsPage;
