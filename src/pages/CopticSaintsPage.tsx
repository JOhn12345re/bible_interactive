import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';

interface Saint {
  id: string;
  title: string;
  description: string;
  emoji: string;
  period: string;
  difficulty: string;
  colorClass: string;
}

const CopticSaintsPage: React.FC = () => {
  const { contrastHigh } = useSettings();

  const saints: Saint[] = [
    {
      id: 'saint_antoine',
      title: 'Saint Antoine le Grand',
      description: 'Le père du monachisme chrétien et ermite du désert.',
      emoji: '🏜️',
      period: '251-356',
      difficulty: 'Facile',
      colorClass: 'bg-gradient-to-br from-amber-500 to-yellow-600',
    },
    {
      id: 'saint_athanase',
      title: 'Saint Athanase d\'Alexandrie',
      description: 'Le grand défenseur de la foi contre l\'arianisme.',
      emoji: '⛪',
      period: '295-373',
      difficulty: 'Avancé',
      colorClass: 'bg-gradient-to-br from-purple-500 to-indigo-600',
    },
    {
      id: 'sainte_marie_egyptienne',
      title: 'Sainte Marie l\'Égyptienne',
      description: 'La grande pénitente du désert.',
      emoji: '🌸',
      period: '344-421',
      difficulty: 'Moyen',
      colorClass: 'bg-gradient-to-br from-pink-500 to-rose-600',
    },
    {
      id: 'saint_cyrille_alexandrie',
      title: 'Saint Cyrille d\'Alexandrie',
      description: 'Le défenseur de la maternité divine de Marie.',
      emoji: '📜',
      period: '376-444',
      difficulty: 'Avancé',
      colorClass: 'bg-gradient-to-br from-blue-500 to-teal-600',
    },
    {
      id: 'saint_paul_thebes',
      title: 'Saint Paul de Thèbes',
      description: 'Le premier ermite chrétien du désert.',
      emoji: '🕊️',
      period: '227-341',
      difficulty: 'Moyen',
      colorClass: 'bg-gradient-to-br from-green-500 to-emerald-600',
    },
    {
      id: 'saint_macaire_grand',
      title: 'Saint Macaire le Grand',
      description: 'L\'un des grands Pères du désert de Scété.',
      emoji: '🌟',
      period: '300-390',
      difficulty: 'Moyen',
      colorClass: 'bg-gradient-to-br from-orange-500 to-red-600',
    },
    {
      id: 'saint_jean_chrysostome',
      title: 'Saint Jean Chrysostome',
      description: 'Le grand prédicateur à la bouche d\'or.',
      emoji: '💬',
      period: '349-407',
      difficulty: 'Avancé',
      colorClass: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    },
    {
      id: 'saint_ephrem_syrien',
      title: 'Saint Éphrem le Syrien',
      description: 'Le grand hymnographe et théologien.',
      emoji: '🎵',
      period: '306-373',
      difficulty: 'Moyen',
      colorClass: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    }
  ];

  return (
    <div
      className={`min-h-screen ${
        contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-purple-50 via-white to-indigo-50'
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
              👑 L'Histoire des Saints
            </h1>
            <p
              className={`text-lg max-w-3xl mx-auto ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-600'
              }`}
            >
              Découvrez la vie extraordinaire des grands saints de l'Église copte orthodoxe
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Saints Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {saints.map((saint) => (
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
                } rounded-2xl p-6 text-white transition-all duration-300 transform hover:scale-105 relative overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-2 right-2 text-4xl transform rotate-12">
                    {saint.emoji}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    {saint.emoji}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-3 group-hover:text-yellow-100 transition-colors duration-300">
                    {saint.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300 mb-4 leading-relaxed">
                    {saint.description}
                  </p>

                  {/* Metadata */}
                  <div className="space-y-2 text-xs opacity-80">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-1">
                        <span>📅</span>
                        <span>{saint.period}</span>
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        saint.difficulty === 'Facile' ? 'bg-green-500/20' :
                        saint.difficulty === 'Moyen' ? 'bg-yellow-500/20' : 'bg-red-500/20'
                      }`}>
                        {saint.difficulty}
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

export default CopticSaintsPage;