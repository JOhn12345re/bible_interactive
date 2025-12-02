import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';

interface Icon {
  id: string;
  title: string;
  description: string;
  emoji: string;
  colorClass: string;
  available?: boolean;
}

const CopticIconsPage: React.FC = () => {
  const { contrastHigh } = useSettings();

  const icons: Icon[] = [
    {
      id: 'icone_pantocrator',
      title: 'Le Christ Pantocrator',
      description: 'L\'icône majestueuse du Christ Roi de l\'Univers.',
      emoji: '👑',
      colorClass: 'bg-gradient-to-br from-yellow-500 to-orange-600',
      available: false,
    },
    {
      id: 'icone_theotokos',
      title: 'La Théotokos',
      description: 'Marie, Mère de Dieu, dans l\'iconographie copte.',
      emoji: '🌹',
      colorClass: 'bg-gradient-to-br from-rose-500 to-pink-600',
      available: false,
    },
    {
      id: 'icone_annonciation',
      title: 'L\'Annonciation',
      description: 'L\'ange Gabriel annonce à Marie la naissance du Sauveur.',
      emoji: '👼',
      colorClass: 'bg-gradient-to-br from-blue-400 to-purple-600',
      available: false,
    },
    {
      id: 'icone_nativite',
      title: 'La Nativité',
      description: 'La naissance du Christ selon l\'art copte.',
      emoji: '⭐',
      colorClass: 'bg-gradient-to-br from-green-500 to-teal-600',
      available: false,
    },
    {
      id: 'icone_resurrection',
      title: 'La Résurrection',
      description: 'La victoire du Christ sur la mort.',
      emoji: '✨',
      colorClass: 'bg-gradient-to-br from-amber-500 to-yellow-500',
      available: false,
    },
    {
      id: 'icone_sagesse',
      title: 'La Sagesse Divine',
      description: 'La représentation de Sophia, la Sagesse personnifiée.',
      emoji: '📜',
      colorClass: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      available: false,
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-blue-50 via-white to-cyan-50'
      }`}
    >
      {/* Header */}
      <header
        className={`py-4 sm:py-6 px-3 sm:px-6 lg:px-8 ${
          contrastHigh ? 'bg-contrast-bg border-b border-contrast-text' : 'bg-white shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/coptic-church"
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full transition-colors text-sm sm:text-base ${
                contrastHigh
                  ? 'hover:bg-contrast-text/20'
                  : 'hover:bg-gray-100'
              }`}
            >
              <span className="text-lg sm:text-2xl">←</span>
              <span>Retour</span>
            </Link>
          </div>
          
          <div className="text-center">
            <h1
              className={`text-2xl sm:text-4xl font-bold mb-2 ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-800'
              }`}
            >
              🎨 Les Icônes Coptes
            </h1>
            <p
              className={`text-sm sm:text-lg max-w-3xl mx-auto ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-600'
              }`}
            >
              Explorez l'art sacré de l'iconographie copte et sa signification spirituelle
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {icons.map((icon) => {
            const isAvailable = icon.available !== false;
            
            if (isAvailable) {
              return (
                <Link
                  key={icon.id}
                  to={`/lesson/${icon.id}`}
                  className="block group"
                >
                  <div
                    className={`${
                      contrastHigh 
                        ? 'bg-contrast-bg border border-contrast-text hover:bg-contrast-text/10' 
                        : `${icon.colorClass} hover:shadow-2xl`
                    } rounded-2xl p-4 sm:p-6 text-white transition-all duration-300 transform hover:scale-105 relative overflow-hidden min-h-[160px] sm:min-h-[200px]`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-2 right-2 text-3xl sm:text-4xl transform rotate-12">
                        {icon.emoji}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                        {icon.emoji}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 group-hover:text-yellow-100 transition-colors duration-300">
                        {icon.title}
                      </h3>

                      <p className="text-xs sm:text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                        {icon.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            } else {
              // Carte grisée pour contenu non disponible
              return (
                <div
                  key={icon.id}
                  className="block cursor-not-allowed"
                >
                  <div
                    className={`${
                      contrastHigh 
                        ? 'bg-gray-700 border border-gray-500' 
                        : 'bg-gradient-to-br from-gray-400 to-gray-500'
                    } rounded-2xl p-4 sm:p-6 text-white relative overflow-hidden min-h-[160px] sm:min-h-[200px] opacity-70`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-2 right-2 text-3xl sm:text-4xl transform rotate-12">
                        {icon.emoji}
                      </div>
                    </div>

                    {/* Badge "Bientôt disponible" */}
                    <div className="absolute top-2 right-2 z-20">
                      <span className="bg-yellow-500 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                        🔜 Bientôt
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 grayscale">
                        {icon.emoji}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">
                        {icon.title}
                      </h3>

                      <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                        {icon.description}
                      </p>

                      <p className="text-xs mt-3 text-yellow-200 font-semibold">
                        ⏳ Contenu bientôt disponible
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </main>
    </div>
  );
};

export default CopticIconsPage;
