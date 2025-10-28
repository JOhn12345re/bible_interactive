import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';

interface ImportantDate {
  id: string;
  year: string;
  title: string;
  description: string;
  emoji: string;
  period: string;
  importance: 'Majeur' | 'Important' | 'Significatif';
  colorClass: string;
}

const CopticImportantDatesPage: React.FC = () => {
  const { contrastHigh } = useSettings();
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const importantDates: ImportantDate[] = [
    {
      id: 'foundation_42',
      year: '42',
      title: 'Fondation de l\'Église d\'Alexandrie',
      description: 'Saint Marc l\'Évangéliste fonde l\'Église copte.',
      emoji: '⛪',
      period: 'Apostolique',
      importance: 'Majeur',
      colorClass: 'bg-gradient-to-br from-yellow-500 to-amber-600',
    },
    {
      id: 'martyrdom_mark_68',
      year: '68',
      title: 'Martyre de Saint Marc',
      description: 'Saint Marc subit le martyre à Alexandrie.',
      emoji: '👑',
      period: 'Apostolique',
      importance: 'Majeur',
      colorClass: 'bg-gradient-to-br from-red-500 to-pink-600',
    },
    {
      id: 'persecution_diocletian_284',
      year: '284',
      title: 'Début de l\'Ère des Martyrs',
      description: 'Persécution de Dioclétien, début du calendrier copte.',
      emoji: '🕊️',
      period: 'Persécutions',
      importance: 'Majeur',
      colorClass: 'bg-gradient-to-br from-purple-600 to-indigo-700',
    },
    {
      id: 'council_nicaea_325',
      year: '325',
      title: 'Concile de Nicée',
      description: 'Premier concile œcuménique contre l\'arianisme.',
      emoji: '📜',
      period: 'Conciles',
      importance: 'Majeur',
      colorClass: 'bg-gradient-to-br from-blue-600 to-cyan-700',
    },
    {
      id: 'monasticism_270',
      year: '270',
      title: 'Début du Monachisme',
      description: 'Saint Antoine le Grand se retire au désert.',
      emoji: '🏜️',
      period: 'Monastique',
      importance: 'Majeur',
      colorClass: 'bg-gradient-to-br from-orange-500 to-yellow-600',
    },
    {
      id: 'council_ephesus_431',
      year: '431',
      title: 'Concile d\'Éphèse',
      description: 'Marie proclamée Théotokos (Mère de Dieu).',
      emoji: '🌹',
      period: 'Conciles',
      importance: 'Majeur',
      colorClass: 'bg-gradient-to-br from-pink-500 to-rose-600',
    },
    {
      id: 'council_chalcedon_451',
      year: '451',
      title: 'Concile de Chalcédoine',
      description: 'Séparation des Églises orientales orthodoxes.',
      emoji: '⚖️',
      period: 'Conciles',
      importance: 'Majeur',
      colorClass: 'bg-gradient-to-br from-gray-600 to-slate-700',
    },
    {
      id: 'arab_conquest_641',
      year: '641',
      title: 'Conquête Arabe de l\'Égypte',
      description: 'L\'Égypte passe sous domination musulmane.',
      emoji: '🏛️',
      period: 'Islamique',
      importance: 'Majeur',
      colorClass: 'bg-gradient-to-br from-green-600 to-teal-700',
    },
    {
      id: 'patriarch_benjamin_622',
      year: '622',
      title: 'Patriarcat de Benjamin Ier',
      description: 'Résistance face à la persécution byzantine.',
      emoji: '👨‍💼',
      period: 'Byzantin',
      importance: 'Important',
      colorClass: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    },
    {
      id: 'cathedral_cairo_1968',
      year: '1968',
      title: 'Cathédrale Saint-Marc au Caire',
      description: 'Construction de la nouvelle cathédrale.',
      emoji: '🏗️',
      period: 'Moderne',
      importance: 'Important',
      colorClass: 'bg-gradient-to-br from-teal-500 to-cyan-600',
    },
    {
      id: 'pope_shenouda_1971',
      year: '1971',
      title: 'Intronisation du Pape Shenouda III',
      description: 'Début du patriarcat de Shenouda III.',
      emoji: '👑',
      period: 'Moderne',
      importance: 'Important',
      colorClass: 'bg-gradient-to-br from-amber-500 to-orange-600',
    },
    {
      id: 'pope_tawadros_2012',
      year: '2012',
      title: 'Élection du Pape Tawadros II',
      description: '118e Pape et Patriarche d\'Alexandrie.',
      emoji: '✨',
      period: 'Contemporain',
      importance: 'Important',
      colorClass: 'bg-gradient-to-br from-violet-500 to-purple-600',
    }
  ];

  const periods = [
    { id: 'all', name: 'Toutes les époques', color: 'from-gray-500 to-gray-600' },
    { id: 'Apostolique', name: 'Ère Apostolique', color: 'from-yellow-500 to-amber-600' },
    { id: 'Persécutions', name: 'Persécutions', color: 'from-purple-600 to-indigo-700' },
    { id: 'Conciles', name: 'Grands Conciles', color: 'from-blue-600 to-cyan-700' },
    { id: 'Monastique', name: 'Ère Monastique', color: 'from-orange-500 to-yellow-600' },
    { id: 'Islamique', name: 'Période Islamique', color: 'from-green-600 to-teal-700' },
    { id: 'Moderne', name: 'Époque Moderne', color: 'from-teal-500 to-cyan-600' },
    { id: 'Contemporain', name: 'Contemporain', color: 'from-violet-500 to-purple-600' }
  ];

  const filteredDates = selectedPeriod === 'all' 
    ? importantDates.sort((a, b) => parseInt(a.year) - parseInt(b.year))
    : importantDates.filter(date => date.period === selectedPeriod).sort((a, b) => parseInt(a.year) - parseInt(b.year));

  return (
    <div
      className={`min-h-screen ${
        contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-amber-50 via-white to-yellow-50'
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
              📅 Les Dates Importantes
            </h1>
            <p
              className={`text-lg max-w-3xl mx-auto ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-600'
              }`}
            >
              Les événements majeurs qui ont façonné l'histoire de l'Église copte
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm ${
                  selectedPeriod === period.id
                    ? contrastHigh
                      ? 'bg-contrast-text text-contrast-bg'
                      : `bg-gradient-to-r ${period.color} text-white shadow-lg`
                    : contrastHigh
                    ? 'bg-contrast-bg border border-contrast-text text-contrast-text hover:bg-contrast-text/10'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {period.name}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {filteredDates.map((date, index) => (
            <div
              key={date.id}
              className={`${
                contrastHigh 
                  ? 'bg-contrast-bg border border-contrast-text' 
                  : 'bg-white shadow-lg hover:shadow-xl'
              } rounded-2xl p-6 transition-all duration-300 transform hover:scale-[1.02]`}
            >
              <div className="flex items-start space-x-4">
                {/* Year Badge */}
                <div
                  className={`${
                    contrastHigh 
                      ? 'bg-contrast-text text-contrast-bg' 
                      : date.colorClass
                  } text-white px-4 py-2 rounded-xl text-lg font-bold min-w-[80px] text-center`}
                >
                  {date.year}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{date.emoji}</span>
                      <h3
                        className={`text-xl font-bold ${
                          contrastHigh ? 'text-contrast-text' : 'text-gray-800'
                        }`}
                      >
                        {date.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          date.importance === 'Majeur' 
                            ? 'bg-red-100 text-red-800'
                            : date.importance === 'Important'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {date.importance}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          contrastHigh 
                            ? 'bg-contrast-text/20 text-contrast-text'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {date.period}
                      </span>
                    </div>
                  </div>
                  
                  <p
                    className={`leading-relaxed ${
                      contrastHigh ? 'text-contrast-text' : 'text-gray-600'
                    }`}
                  >
                    {date.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="mt-12 text-center">
          <div className={`inline-flex items-center space-x-4 px-6 py-3 rounded-full ${
            contrastHigh 
              ? 'bg-contrast-bg border border-contrast-text text-contrast-text' 
              : 'bg-white text-gray-600 shadow-md'
          }`}>
            <span className="flex items-center space-x-1">
              <span className="text-lg">📊</span>
              <span className="text-sm">{filteredDates.length} événements affichés</span>
            </span>
            <span className="w-px h-4 bg-gray-300"></span>
            <span className="flex items-center space-x-1">
              <span className="text-lg">⏳</span>
              <span className="text-sm">Plus de 1900 ans d'histoire</span>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CopticImportantDatesPage;