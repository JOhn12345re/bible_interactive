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

const AdamEveTimelineGame = () => {
  const { contrastHigh } = useSettings();
  const { markDone } = useProgress();

  const [events, setEvents] = useState<TimelineEvent[]>([
    {
      id: 'creation',
      title: 'La Création d\'Adam et Ève',
      description: 'Dieu forme Adam de la poussière et souffle en lui le souffle de vie. Il crée ensuite Ève à partir d\'Adam.',
      date: 'Commencement',
      emoji: '👫',
      isRevealed: false
    },
    {
      id: 'eden',
      title: 'La vie dans le jardin d\'Éden',
      description: 'Adam et Ève vivent en harmonie parfaite avec Dieu, sans honte ni péché dans le jardin d\'Éden.',
      date: 'Temps d\'innocence',
      emoji: '🌸',
      isRevealed: false
    },
    {
      id: 'commandement',
      title: 'Le commandement divin',
      description: 'Dieu donne à Adam et Ève la liberté de manger de tous les arbres, sauf de l\'arbre de la connaissance du bien et du mal.',
      date: 'L\'épreuve',
      emoji: '🌳',
      isRevealed: false
    },
    {
      id: 'tentation',
      title: 'La tentation du serpent',
      description: 'Le serpent, plus rusé que tous les animaux, approche Ève et met en doute la parole de Dieu.',
      date: 'La tromperie',
      emoji: '🐍',
      isRevealed: false
    },
    {
      id: 'chute',
      title: 'La chute - la désobéissance',
      description: 'Ève mange du fruit défendu et en donne à Adam. Leurs yeux s\'ouvrent et ils réalisent leur nudité.',
      date: 'La transgression',
      emoji: '🍎',
      isRevealed: false
    },
    {
      id: 'honte',
      title: 'La honte et la peur',
      description: 'Adam et Ève se cachent de la présence de Dieu parmi les arbres du jardin, couverts de feuilles.',
      date: 'La culpabilité',
      emoji: '🙈',
      isRevealed: false
    },
    {
      id: 'jugement',
      title: 'Le jugement de Dieu',
      description: 'Dieu prononce Son jugement : douleur pour la femme, travail pénible pour l\'homme, mort pour tous.',
      date: 'La justice',
      emoji: '⚖️',
      isRevealed: false
    },
    {
      id: 'promesse',
      title: 'La promesse du salut',
      description: 'Dieu annonce qu\'un descendant de la femme écrasera la tête du serpent - première prophétie messianique.',
      date: 'L\'espérance',
      emoji: '✨',
      isRevealed: false
    },
    {
      id: 'expulsion',
      title: 'L\'expulsion du jardin',
      description: 'Dieu chasse Adam et Ève du jardin d\'Éden et place des chérubins pour garder l\'arche de vie.',
      date: 'L\'exil',
      emoji: '🚪',
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
      markDone('adam-eve-timeline-game');
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
    <div className={`min-h-screen p-6 ${contrastHigh ? 'bg-black text-white' : 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50'}`}>
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            📜 Frise Chronologique - Adam et Ève
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Découvre l'histoire d'Adam et Ève étape par étape
          </p>
          <div className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-lg inline-block">
            <span className="text-blue-800 dark:text-blue-200 font-medium">
              📖 Genèse 1-3 | Score: {score}/90
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            🎯 Comment jouer
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Clique sur chaque événement pour découvrir l'histoire d'Adam et Ève dans l'ordre chronologique. 
            Chaque carte révélée te donne 10 points !
          </p>
        </div>

        {/* Frise chronologique interactive */}
        <div className="relative">
          {/* Ligne de temps */}
          <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-gradient-to-b from-green-400 to-red-400"></div>
          
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
                        ? 'bg-white dark:bg-gray-800 hover:scale-105 border-2 border-blue-300' 
                        : 'bg-gray-100 dark:bg-gray-700 opacity-50 cursor-not-allowed'
                      }
                      ${index === currentEventIndex && !event.isRevealed ? 'ring-4 ring-blue-300 animate-pulse' : ''}
                    `}
                    onClick={() => {
                      if (index === currentEventIndex && !event.isRevealed) {
                        revealEvent(event.id);
                      }
                    }}
                  >
                    {/* Numéro de l'étape */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
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
                          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
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
          <div className="mt-8 bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-4">🎉 Félicitations !</h2>
            <p className="text-lg mb-4">
              Tu as découvert toute l'histoire d'Adam et Ève ! Score final: {score}/90
            </p>
            <p className="text-sm mb-6 opacity-90">
              "Je mettrai inimitié entre toi et la femme, entre ta postérité et sa postérité: celle-ci t'écrasera la tête" - Genèse 3:15
            </p>
            <button
              onClick={resetGame}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
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

export default AdamEveTimelineGame;