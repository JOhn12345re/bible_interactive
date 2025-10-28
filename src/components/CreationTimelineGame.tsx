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

const CreationTimelineGame = () => {
  const { contrastHigh } = useSettings();
  const { markDone } = useProgress();

  const [events, setEvents] = useState<TimelineEvent[]>([
    {
      id: 'commencement',
      title: 'Au commencement',
      description: 'Dieu créa le ciel et la terre. La terre était vide et dans les ténèbres, l\'Esprit de Dieu planait au-dessus des eaux.',
      date: 'Jour 0',
      emoji: '🌌',
      isRevealed: false
    },
    {
      id: 'jour1',
      title: 'Premier jour - La lumière',
      description: 'Dieu dit : "Que la lumière soit !" Et la lumière fut. Dieu sépara la lumière des ténèbres.',
      date: 'Jour 1',
      emoji: '💡',
      isRevealed: false
    },
    {
      id: 'jour2',
      title: 'Deuxième jour - Le ciel',
      description: 'Dieu fit une étendue pour séparer les eaux d\'en haut des eaux d\'en bas. Il appela cette étendue "ciel".',
      date: 'Jour 2',
      emoji: '☁️',
      isRevealed: false
    },
    {
      id: 'jour3',
      title: 'Troisième jour - Terre et végétation',
      description: 'Dieu rassembla les eaux et fit paraître le sec. Il créa l\'herbe, les plantes et les arbres fruitiers.',
      date: 'Jour 3',
      emoji: '🌱',
      isRevealed: false
    },
    {
      id: 'jour4',
      title: 'Quatrième jour - Les astres',
      description: 'Dieu fit le soleil, la lune et les étoiles pour éclairer la terre et marquer les temps et les saisons.',
      date: 'Jour 4',
      emoji: '☀️',
      isRevealed: false
    },
    {
      id: 'jour5',
      title: 'Cinquième jour - Poissons et oiseaux',
      description: 'Dieu créa les grands animaux marins, tous les êtres vivants qui peuplent les eaux, et tous les oiseaux ailés.',
      date: 'Jour 5',
      emoji: '🐟',
      isRevealed: false
    },
    {
      id: 'jour6_animaux',
      title: 'Sixième jour - Les animaux terrestres',
      description: 'Dieu fit les animaux de la terre : le bétail, les reptiles et les animaux sauvages de toute espèce.',
      date: 'Jour 6a',
      emoji: '🦁',
      isRevealed: false
    },
    {
      id: 'jour6_homme',
      title: 'Sixième jour - L\'homme et la femme',
      description: 'Dieu créa l\'homme à son image, homme et femme il les créa. Il leur donna domination sur toute la création.',
      date: 'Jour 6b',
      emoji: '👫',
      isRevealed: false
    },
    {
      id: 'jour7',
      title: 'Septième jour - Le repos',
      description: 'Dieu acheva son œuvre et se reposa le septième jour. Il bénit ce jour et le sanctifia.',
      date: 'Jour 7',
      emoji: '🙏',
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
      markDone('creation-timeline-game');
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
    <div className={`min-h-screen p-6 ${contrastHigh ? 'bg-black text-white' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            🌍 Frise Chronologique - La Création
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Découvre les 7 jours de la création étape par étape
          </p>
          <div className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-lg inline-block">
            <span className="text-blue-800 dark:text-blue-200 font-medium">
              📖 Genèse 1-2 | Score: {score}/90
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            🎯 Comment jouer
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Clique sur chaque jour pour découvrir l'œuvre créatrice de Dieu dans l'ordre chronologique. 
            Chaque jour révélé te donne 10 points !
          </p>
        </div>

        {/* Frise chronologique interactive */}
        <div className="relative">
          {/* Ligne de temps */}
          <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-gradient-to-b from-blue-400 to-green-400"></div>
          
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
                        ? 'bg-white dark:bg-gray-800 hover:scale-105 border-2 border-purple-300' 
                        : 'bg-gray-100 dark:bg-gray-700 opacity-50 cursor-not-allowed'
                      }
                      ${index === currentEventIndex && !event.isRevealed ? 'ring-4 ring-purple-300 animate-pulse' : ''}
                    `}
                    onClick={() => {
                      if (index === currentEventIndex && !event.isRevealed) {
                        revealEvent(event.id);
                      }
                    }}
                  >
                    {/* Numéro de l'étape */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
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
                          <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                            {event.isRevealed || index === currentEventIndex ? event.date : '???'}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {event.isRevealed ? event.description : 'Clique pour révéler ce jour de création...'}
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
          <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-4">🎉 Félicitations !</h2>
            <p className="text-lg mb-4">
              Tu as découvert tous les jours de la création ! Score final: {score}/90
            </p>
            <p className="text-sm mb-6 opacity-90">
              "Au commencement, Dieu créa le ciel et la terre" - Genèse 1:1
            </p>
            <button
              onClick={resetGame}
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-purple-50 transition-colors"
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

export default CreationTimelineGame;