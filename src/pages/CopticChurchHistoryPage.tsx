import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';

interface SubSection {
  id: string;
  title: string;
  description: string;
  emoji: string;
  route: string;
  colorClass: string;
  items: number;
}

const CopticChurchHistoryPage: React.FC = () => {
  const { contrastHigh } = useSettings();
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const subSections: SubSection[] = [
    {
      id: 'saints',
      title: 'L\'Histoire des Saints',
      description: 'Découvrez la vie extraordinaire des grands saints de l\'Église copte orthodoxe, leurs miracles et leur héritage spirituel.',
      emoji: '👑',
      route: '/coptic-church/saints',
      colorClass: 'bg-gradient-to-br from-purple-500 to-indigo-600',
      items: 12
    },
    {
      id: 'icons',
      title: 'Les Icônes Coptes',
      description: 'Explorez l\'art sacré de l\'iconographie copte, ses symboles, ses traditions et sa signification spirituelle.',
      emoji: '🎨',
      route: '/coptic-church/icons',
      colorClass: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      items: 8
    },
    {
      id: 'dates',
      title: 'Les Dates Importantes',
      description: 'Parcourez les événements majeurs qui ont façonné l\'histoire de l\'Église copte à travers les siècles.',
      emoji: '📅',
      route: '/coptic-church/important-dates',
      colorClass: 'bg-gradient-to-br from-amber-500 to-orange-600',
      items: 15
    }
  ];

  return (
    <div
      className={`min-h-screen ${
        contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-amber-50 via-white to-orange-50'
      }`}
    >
      {/* Header */}
      <header
        className={`py-8 px-4 sm:px-6 lg:px-8 ${
          contrastHigh ? 'bg-contrast-bg border-b border-contrast-text' : 'bg-white shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
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
          </div>
          
          <div className="text-center">
            <div className="mb-4">
              <span className="text-6xl">⛪</span>
            </div>
            <h1
              className={`text-4xl sm:text-5xl font-bold mb-4 ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-800'
              }`}
            >
              L'Histoire de l'Église Copte
            </h1>
            <p
              className={`text-lg max-w-3xl mx-auto leading-relaxed ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-600'
              }`}
            >
              Plongez dans la riche histoire de l'Église copte orthodoxe d'Alexandrie, 
              fondée par saint Marc l'Évangéliste. Découvrez ses saints, son art sacré 
              et les moments décisifs qui ont façonné cette tradition millénaire.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Introduction Cards */}
        <div className="mb-16">
          <div className={`${contrastHigh ? 'bg-contrast-bg border border-contrast-text' : 'bg-white'} rounded-2xl shadow-lg p-8`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className={`text-2xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                  Une Tradition Millénaire
                </h2>
                <p className={`leading-relaxed mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                  L'Église copte orthodoxe d'Alexandrie, fondée par saint Marc vers 42 après J.-C., 
                  est l'une des plus anciennes Églises chrétiennes au monde. Héritière directe 
                  des premiers chrétiens d'Égypte, elle a préservé la foi apostolique à travers 
                  les siècles.
                </p>
                <p className={`leading-relaxed ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                  Cette Église a donné naissance au monachisme chrétien avec saint Antoine le Grand, 
                  a produit de grands théologiens comme saint Athanase, et a développé un art 
                  iconographique unique qui continue d'inspirer le monde chrétien.
                </p>
              </div>
              <div className="text-center">
                <div className="text-8xl mb-4">🏛️</div>
                <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-500'}`}>
                  Depuis 42 après J.-C.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-sections Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {subSections.map((section) => (
            <Link
              key={section.id}
              to={section.route}
              className="block group"
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <div
                className={`${
                  contrastHigh 
                    ? 'bg-contrast-bg border border-contrast-text hover:bg-contrast-text/10' 
                    : `${section.colorClass} hover:shadow-2xl`
                } rounded-2xl p-8 text-white transition-all duration-500 transform hover:scale-105 relative overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 text-6xl transform rotate-12">
                    {section.emoji}
                  </div>
                  <div className="absolute bottom-4 left-4 text-4xl transform -rotate-12 opacity-50">
                    {section.emoji}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-5xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    {section.emoji}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-100 transition-colors duration-300">
                    {section.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300 mb-6 leading-relaxed">
                    {section.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs opacity-80">
                    <span className="flex items-center space-x-1">
                      <span>📚</span>
                      <span>{section.items} contenus</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span>→</span>
                      <span>Explorer</span>
                    </span>
                  </div>
                </div>

                {/* Hover Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    hoveredSection === section.id ? 'animate-pulse' : ''
                  }`}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full ${
            contrastHigh 
              ? 'bg-contrast-bg border border-contrast-text text-contrast-text' 
              : 'bg-white text-gray-600 shadow-md'
          }`}>
            <span className="text-xl">✨</span>
            <span>Chaque section comprend des leçons interactives, des quiz et des jeux</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CopticChurchHistoryPage;