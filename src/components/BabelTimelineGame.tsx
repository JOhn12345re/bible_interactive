import React, { useState } from 'react';
import { useSettings } from '../state/settingsStore';
import { useProgress } from '../state/progressStore';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  emoji: string;
  isRevealed: boolean;
}

const BabelTimelineGame = () => {
  const { contrastHigh } = useSettings();
  const { markDone } = useProgress();

  const [events, setEvents] = useState<TimelineEvent[]>([
    {
      id: 'une_langue',
      title: 'Une seule langue',
      description: 'Toute la terre avait une seule langue et les mêmes mots. L\'humanité était unie dans sa communication.',
      date: 'Après le déluge',
      emoji: '🗣️',
      isRevealed: false
    },
    {
      id: 'migration',
      title: 'Migration vers l\'est',
      description: 'Comme les hommes se déplaçaient vers l\'orient, ils trouvèrent une plaine dans le pays de Schinear et s\'y établirent.',
      date: 'Le voyage',
      emoji: '🚶‍♂️',
      isRevealed: false
    },
    {
      id: 'idee_construction',
      title: 'L\'idée de construction',
      description: 'Les hommes se dirent les uns aux autres : "Allons ! Faisons des briques et cuisons-les au feu."',
      date: 'La planification',
      emoji: '🧱',
      isRevealed: false
    },
    {
      id: 'projet_ambitieux',
      title: 'Le projet ambitieux',
      description: 'Ils dirent : "Bâtissons-nous une ville et une tour dont le sommet touche au ciel, et faisons-nous un nom."',
      date: 'L\'ambition',
      emoji: '🏗️',
      isRevealed: false
    },
    {
      id: 'motivation',
      title: 'La vraie motivation',
      description: 'Leur but était de ne pas être dispersés sur la face de toute la terre. Ils voulaient rester unis par l\'orgueil.',
      date: 'La rébellion',
      emoji: '👥',
      isRevealed: false
    },
    {
      id: 'construction',
      title: 'Début de la construction',
      description: 'Ils commencèrent à bâtir la ville et la tour avec des briques et du bitume, défiant l\'ordre divin.',
      date: 'Les travaux',
      emoji: '🏗️',
      isRevealed: false
    },
    {
      id: 'visite_divine',
      title: 'Dieu vient voir',
      description: 'L\'Éternel descendit pour voir la ville et la tour que bâtissaient les fils des hommes.',
      date: 'L\'inspection',
      emoji: '👁️',
      isRevealed: false
    },
    {
      id: 'constat_divin',
      title: 'Le constat de Dieu',
      description: 'Dieu dit : "Maintenant rien ne les empêchera de faire tout ce qu\'ils ont projeté." Il voit leur orgueil.',
      date: 'L\'évaluation',
      emoji: '⚖️',
      isRevealed: false
    },
    {
      id: 'confusion_langues',
      title: 'Confusion des langues',
      description: 'L\'Éternel confondit le langage de toute la terre, et ils ne comprirent plus le langage les uns des autres.',
      date: 'L\'intervention',
      emoji: '🌍',
      isRevealed: false
    },
    {
      id: 'dispersion',
      title: 'Dispersion sur la terre',
      description: 'L\'Éternel les dispersa sur la face de toute la terre, et ils cessèrent de bâtir la ville.',
      date: 'La dispersion',
      emoji: '↗️',
      isRevealed: false
    }
  ]);

  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const revealEvent = (eventId: string) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? { ...event, isRevealed: true }
          : event
      )
    );
    
    setScore(prev => prev + 10);
    
    if (currentEventIndex < events.length - 1) {
      setCurrentEventIndex(prev => prev + 1);
    } else {
      setGameCompleted(true);
      markDone('babel-timeline-game');
    }
  };

  const resetGame = () => {
    setEvents(prevEvents => 
      prevEvents.map(event => ({ ...event, isRevealed: false }))
    );
    setCurrentEventIndex(0);
    setGameCompleted(false);
    setScore(0);
  };

  return (
    <div className={`min-h-screen p-6 ${contrastHigh ? 'bg-black text-white' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50'}`}>
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            🏗️ Frise Chronologique - Tour de Babel
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Découvre l'histoire de l'orgueil humain et de l'intervention divine
          </p>
          <div className="bg-indigo-100 dark:bg-indigo-900 px-4 py-2 rounded-lg inline-block">
            <span className="text-indigo-800 dark:text-indigo-200 font-medium">
              📖 Genèse 11:1-9 | Score: {score}/100
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            🎯 Comment jouer
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Clique sur chaque événement pour découvrir l'histoire de la tour de Babel dans l'ordre chronologique. 
            Une leçon sur l'orgueil et l'humilité !
          </p>
        </div>

        {/* Frise chronologique interactive */}
        <div className="relative">
          {/* Ligne de temps */}
          <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-gradient-to-b from-blue-400 to-indigo-600"></div>
          
          {/* Événements */}
          <div className="space-y-8">
            {events.map((event, index) => (
              <div key={event.id} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`relative w-full max-w-lg ${index % 2 === 0 ? 'mr-4' : 'ml-4'}`}>
                  {/* Connecteur */}
                  <div className={`absolute top-1/2 w-8 h-0.5 bg-gray-300 ${index % 2 === 0 ? '-right-8' : '-left-8'}`}></div>
                  
                  {/* Carte événement */}
                  <div 
                    className={`
                      relative p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 transform
                      ${event.isRevealed || index === currentEventIndex 
                        ? 'bg-white dark:bg-gray-800 hover:scale-105 border-2 border-indigo-300' 
                        : 'bg-gray-100 dark:bg-gray-700 opacity-50 cursor-not-allowed'
                      }
                      ${index === currentEventIndex && !event.isRevealed ? 'ring-4 ring-indigo-300 animate-pulse' : ''}
                    `}
                    onClick={() => {
                      if (index === currentEventIndex && !event.isRevealed) {
                        revealEvent(event.id);
                      }
                    }}
                  >
                    {/* Numéro de l'étape */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    
                    {/* Contenu de la carte */}
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{event.emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {event.isRevealed || index === currentEventIndex ? event.title : '???'}
                          </h3>
                          <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                            {event.isRevealed || index === currentEventIndex ? event.date : '???'}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {event.isRevealed ? event.description : 'Clique pour révéler cet événement...'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Indicateur de statut */}
                    <div className="absolute top-2 right-2">
                      {event.isRevealed ? (
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      ) : index === currentEventIndex ? (
                        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                      ) : (
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message de fin */}
        {gameCompleted && (
          <div className="mt-8 bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-4">🎉 Histoire complétée !</h2>
            <p className="text-lg mb-4">
              Tu as découvert toute l'histoire de la tour de Babel ! Score final: {score}/100
            </p>
            <p className="text-sm mb-6 opacity-90">
              "L'Éternel confondit le langage de toute la terre" - Genèse 11:9
            </p>
            <button
              onClick={resetGame}
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors"
            >
              🔄 Recommencer
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            ← Retour à la leçon
          </button>
        </div>
      </div>
    </div>
  );
};

export default BabelTimelineGame;