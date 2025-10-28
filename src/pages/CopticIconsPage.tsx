import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';

interface Icon {
  id: string;
  title: string;
  description: string;
  emoji: string;
  type: string;
  difficulty: string;
  colorClass: string;
}

const CopticIconsPage: React.FC = () => {
  const { contrastHigh } = useSettings();

  const icons: Icon[] = [
    {
      id: 'icone_pantocrator',
      title: 'Le Christ Pantocrator',
      description: 'L\'icône majestueuse du Christ Roi de l\'Univers.',
      emoji: '👑',
      type: 'Christologique',
      difficulty: 'Avancé',
      colorClass: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    },
    {
      id: 'icone_sagesse',
      title: 'L\'Icône de la Sagesse Divine',
      description: 'La représentation de Sophia, la Sagesse personnifiée.',
      emoji: '🤍',
      type: 'Symbolique',
      difficulty: 'Avancé',
      colorClass: 'bg-gradient-to-br from-white via-blue-100 to-purple-200',
    },
    {
      id: 'icone_annonciation',
      title: 'L\'Icône de l\'Annonciation',
      description: 'L\'art sacré de l\'Annonciation dans la tradition copte.',
      emoji: '👼',
      type: 'Mariale',
      difficulty: 'Moyen',
      colorClass: 'bg-gradient-to-br from-blue-400 to-purple-600',
    },
    {
      id: 'icone_theotokos',
      title: 'La Théotokos',
      description: 'Marie, Mère de Dieu, dans l\'iconographie copte.',
      emoji: '🌹',
      type: 'Mariale',
      difficulty: 'Moyen',
      colorClass: 'bg-gradient-to-br from-rose-500 to-pink-600',
    },
    {
      id: 'icone_resurrection',
      title: 'L\'Icône de la Résurrection',
      description: 'La représentation de la victoire du Christ sur la mort.',
      emoji: '✨',
      type: 'Pascale',
      difficulty: 'Avancé',
      colorClass: 'bg-gradient-to-br from-amber-500 to-yellow-500',
    },
    {
      id: 'icone_trinite',
      title: 'L\'Icône de la Trinité',
      description: 'La représentation du mystère de la Sainte Trinité.',
      emoji: '🔯',
      type: 'Trinitaire',
      difficulty: 'Avancé',
      colorClass: 'bg-gradient-to-br from-purple-600 to-indigo-700',
    },
    {
      id: 'icone_nativite',
      title: 'L\'Icône de la Nativité',
      description: 'La naissance du Christ selon l\'art copte.',
      emoji: '⭐',
      type: 'Christologique',
      difficulty: 'Moyen',
      colorClass: 'bg-gradient-to-br from-green-500 to-teal-600',
    },
    {
      id: 'icone_bapteme',
      title: 'L\'Icône du Baptême',
      description: 'Le baptême du Christ dans le Jourdain.',
      emoji: '💧',
      type: 'Christologique',
      difficulty: 'Moyen',
      colorClass: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    }
  ];

  const [selectedType, setSelectedType] = useState('all');
  
  const types = [
    { id: 'all', name: 'Toutes', color: 'from-gray-500 to-gray-600' },
    { id: 'Christologique', name: 'Christologiques', color: 'from-yellow-500 to-orange-600' },
    { id: 'Mariale', name: 'Mariales', color: 'from-blue-400 to-purple-600' },
    { id: 'Symbolique', name: 'Symboliques', color: 'from-white to-purple-200' },
    { id: 'Pascale', name: 'Pascales', color: 'from-amber-500 to-yellow-500' },
    { id: 'Trinitaire', name: 'Trinitaires', color: 'from-purple-600 to-indigo-700' }
  ];

  const filteredIcons = selectedType === 'all' 
    ? icons 
    : icons.filter(icon => icon.type === selectedType);

  return (
    <div
      className={`min-h-screen ${
        contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-blue-50 via-white to-cyan-50'
      }`}
    >
      {/* Header */}
      <header
        className={`py-6 px-4 sm:px-6 lg:px-8 ${
          contrastHigh ? 'bg-contrast-bg border-b border-contrast-text' : 'bg-white shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/coptic-church"
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                contrastHigh
                  ? 'hover:bg-contrast-text/20'
                  : 'hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl">←</span>
              <span>Retour à l'Histoire Copte</span>
            </Link>
          </div>
          
          <div className="text-center">
            <h1
              className={`text-3xl sm:text-4xl font-bold mb-2 ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-800'
              }`}
            >
              🎨 Les Icônes Coptes
            </h1>
            <p
              className={`text-lg max-w-3xl mx-auto ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-600'
              }`}
            >
              Explorez l'art sacré de l'iconographie copte et sa signification spirituelle
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {types.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedType === type.id
                    ? contrastHigh
                      ? 'bg-contrast-text text-contrast-bg'
                      : `bg-gradient-to-r ${type.color} text-white shadow-lg`
                    : contrastHigh
                    ? 'bg-contrast-bg border border-contrast-text text-contrast-text hover:bg-contrast-text/10'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Icons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredIcons.map((icon) => (
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
                } rounded-2xl p-6 text-white transition-all duration-300 transform hover:scale-105 relative overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-2 right-2 text-4xl transform rotate-12">
                    {icon.emoji}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    {icon.emoji}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-3 group-hover:text-yellow-100 transition-colors duration-300">
                    {icon.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300 mb-4 leading-relaxed">
                    {icon.description}
                  </p>

                  {/* Metadata */}
                  <div className="space-y-2 text-xs opacity-80">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-1">
                        <span>🏷️</span>
                        <span>{icon.type}</span>
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        icon.difficulty === 'Facile' ? 'bg-green-500/20' :
                        icon.difficulty === 'Moyen' ? 'bg-yellow-500/20' : 'bg-red-500/20'
                      }`}>
                        {icon.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CopticIconsPage;