import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';

interface Saint {
  id: string;
  title: string;
  description: string;
  emoji: string;
  colorClass: string;
  available?: boolean; // true si le contenu complet est disponible
}

const CopticSaintsPage: React.FC = () => {
  const { contrastHigh } = useSettings();

  const saints: Saint[] = [
    {
      id: 'saint_marc',
      title: 'Saint Marc l\'Évangéliste',
      description: 'Le fondateur de l\'Église d\'Alexandrie, père spirituel des coptes (68 ap. J.C.).',
      emoji: '✝️',
      colorClass: 'bg-gradient-to-br from-amber-600 to-yellow-500',
      available: true,
    },
    {
      id: 'saint_mercurios',
      title: 'Saint Mercurios (Abou Seifein)',
      description: 'Le Saint aux Deux Épées, héros de guerre martyrisé à 25 ans (250 ap. J.C.).',
      emoji: '⚔️',
      colorClass: 'bg-gradient-to-br from-slate-600 to-zinc-700',
      available: true,
    },
    {
      id: 'saint_mina',
      title: 'Saint Mina le Thaumaturge',
      description: 'Le héros égyptien et faiseur de miracles, martyr de la foi.',
      emoji: '⭐',
      colorClass: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      available: true,
    },
    {
      id: 'saint_abanoub',
      title: 'Saint Abanoub - Le Jeune Martyr',
      description: 'Le courageux martyr de 12 ans qui confessa sa foi devant les gouverneurs.',
      emoji: '👦',
      colorClass: 'bg-gradient-to-br from-red-500 to-rose-600',
      available: true,
    },
    {
      id: 'amba_paul',
      title: 'Amba Paul - Le Premier Anachorète',
      description: 'Le premier ermite du désert, nourri par un corbeau pendant 80 ans.',
      emoji: '🦅',
      colorClass: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      available: true,
    },
    {
      id: 'saint_antoine',
      title: 'Saint Antoine le Grand',
      description: 'Le père du monachisme chrétien et ermite du désert.',
      emoji: '🏜️',
      colorClass: 'bg-gradient-to-br from-amber-500 to-yellow-600',
      available: false,
    },
    {
      id: 'saint_athanase',
      title: 'Saint Athanase d\'Alexandrie',
      description: 'Le grand défenseur de la foi contre l\'arianisme.',
      emoji: '⛪',
      colorClass: 'bg-gradient-to-br from-purple-500 to-indigo-600',
      available: false,
    },
    {
      id: 'saint_cyrille_alexandrie',
      title: 'Saint Cyrille d\'Alexandrie',
      description: 'Le défenseur de la maternité divine de Marie.',
      emoji: '📜',
      colorClass: 'bg-gradient-to-br from-blue-500 to-teal-600',
      available: false,
    },
    {
      id: 'saint_macaire_grand',
      title: 'Saint Macaire l\'Égyptien',
      description: 'Le "Jeune Vieillard", fondateur du monachisme à Scété (300-390).',
      emoji: '🌟',
      colorClass: 'bg-gradient-to-br from-orange-500 to-red-600',
      available: true,
    },
    {
      id: 'saint_abraham_eveque',
      title: 'Saint Abraham l\'Évêque',
      description: 'Le Père des pauvres, évêque de Fayoum (1829-1914).',
      emoji: '🍞',
      colorClass: 'bg-gradient-to-br from-amber-500 to-orange-600',
      available: true,
    },
    {
      id: 'saint_dimitri',
      title: 'Saint Démétrius Ier',
      description: 'Le 12ème Pape d\'Alexandrie qui établit le calcul de Pâques (224 ap. J.C.).',
      emoji: '📅',
      colorClass: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      available: true,
    },
    {
      id: 'saints_dioscoros_seclapios',
      title: 'Saints Dioscoros et Séclapios',
      description: 'Les frères martyrs d\'Akhmim avec 8140 chrétiens (29 Kiahk).',
      emoji: '⚔️',
      colorClass: 'bg-gradient-to-br from-red-600 to-rose-700',
      available: true,
    },
    {
      id: 'saint_georges',
      title: 'Saint Georges - Le Prince des Martyrs',
      description: 'Le courageux soldat qui défia Dioclétien pendant 7 ans (303 ap. J.C.).',
      emoji: '🐉',
      colorClass: 'bg-gradient-to-br from-red-500 to-orange-600',
      available: true,
    },
    {
      id: 'saint_jean_evangeliste',
      title: 'Saint Jean l\'Évangéliste',
      description: 'L\'apôtre bien-aimé, auteur de l\'Évangile et de l\'Apocalypse (100 ap. J.C.).',
      emoji: '🦅',
      colorClass: 'bg-gradient-to-br from-sky-500 to-blue-600',
      available: true,
    },
    {
      id: 'saints_maximos_dometios',
      title: 'Saints Maximos et Dometios',
      description: 'Les princes de Constantinople devenus moines au désert de Scété.',
      emoji: '👑',
      colorClass: 'bg-gradient-to-br from-violet-500 to-purple-600',
      available: true,
    },
    {
      id: 'sainte_marie_egyptienne',
      title: 'Sainte Marie l\'Égyptienne',
      description: 'La grande pénitente du désert.',
      emoji: '🌸',
      colorClass: 'bg-gradient-to-br from-pink-500 to-rose-600',
      available: false,
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-purple-50 via-white to-indigo-50'
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
              👑 L'Histoire des Saints
            </h1>
            <p
              className={`text-sm sm:text-lg max-w-3xl mx-auto ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-600'
              }`}
            >
              Découvrez la vie extraordinaire des grands saints de l'Église copte orthodoxe
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {saints.map((saint) => {
            const isAvailable = saint.available !== false;
            
            if (isAvailable) {
              return (
                <Link
                  key={saint.id}
                  to={`/lesson/${saint.id}`}
                  className="block group"
                >
                  <div
                    className={`${
                      contrastHigh 
                        ? 'bg-contrast-bg border border-contrast-text hover:bg-contrast-text/10' 
                        : `${saint.colorClass} hover:shadow-2xl`
                    } rounded-2xl p-4 sm:p-6 text-white transition-all duration-300 transform hover:scale-105 relative overflow-hidden min-h-[160px] sm:min-h-[200px]`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-2 right-2 text-3xl sm:text-4xl transform rotate-12">
                        {saint.emoji}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                        {saint.emoji}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 group-hover:text-yellow-100 transition-colors duration-300">
                        {saint.title}
                      </h3>

                      <p className="text-xs sm:text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                        {saint.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            } else {
              // Carte grisée pour contenu non disponible
              return (
                <div
                  key={saint.id}
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
                        {saint.emoji}
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
                        {saint.emoji}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">
                        {saint.title}
                      </h3>

                      <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                        {saint.description}
                      </p>

                      <p className="text-xs mt-3 text-yellow-200 font-semibold">
                        ⏳ Histoire complète bientôt disponible
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

export default CopticSaintsPage;
