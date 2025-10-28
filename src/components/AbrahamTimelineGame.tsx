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

const AbrahamTimelineGame = () => {
  const { contrastHigh } = useSettings();
  const { markDone } = useProgress();

  const [events, setEvents] = useState<TimelineEvent[]>([
    {
      id: 'appel',
      title: 'L\'appel de Dieu',
      description: 'Dieu appelle Abram à quitter son pays, sa famille et la maison de son père pour aller vers le pays qu\'Il lui montrera.',
      date: '~2000 av. J.-C.',
      emoji: '📞',
      isRevealed: false
    },
    {
      id: 'depart',
      title: 'Le départ de Ur',
      description: 'Abram quitte Ur en Chaldée avec Saraï sa femme, Lot son neveu, et tous leurs biens pour obéir à Dieu.',
      date: 'Le voyage commence',
      emoji: '🚶',
      isRevealed: false
    },
    {
      id: 'promesse',
      title: 'La grande promesse',
      description: 'Dieu promet à Abram : "Je ferai de toi une grande nation, je te bénirai et tu seras une bénédiction."',
      date: 'Alliance divine',
      emoji: '⭐',
      isRevealed: false
    },
    {
      id: 'canaan',
      title: 'Arrivée en Canaan',
      description: 'Abram arrive dans le pays de Canaan. Dieu lui dit : "Je donnerai ce pays à ta postérité." Abram bâtit un autel.',
      date: 'Terre Promise',
      emoji: '🏕️',
      isRevealed: false
    },
    {
      id: 'separation_lot',
      title: 'Séparation avec Lot',
      description: 'Leurs troupeaux devenant trop nombreux, Abram et Lot se séparent en paix. Lot choisit la plaine du Jourdain.',
      date: 'Division paisible',
      emoji: '↗️',
      isRevealed: false
    },
    {
      id: 'alliance',
      title: 'L\'alliance solennelle',
      description: 'Dieu fait une alliance avec Abram, promettant une descendance nombreuse comme les étoiles du ciel.',
      date: 'Pacte éternel',
      emoji: '🌟',
      isRevealed: false
    },
    {
      id: 'abraham',
      title: 'Nouveau nom : Abraham',
      description: 'Dieu change le nom d\'Abram en Abraham ("père d\'une multitude") et confirme Son alliance éternelle.',
      date: 'Nouvelle identité',
      emoji: '👑',
      isRevealed: false
    },
    {
      id: 'visiteurs',
      title: 'Les trois visiteurs',
      description: 'Trois hommes (anges) visitent Abraham. Ils annoncent que Sara aura un fils dans un an malgré son âge avancé.',
      date: 'Annonce miraculeuse',
      emoji: '👥',
      isRevealed: false
    },
    {
      id: 'isaac',
      title: 'Naissance d\'Isaac',
      description: 'Sara enfante Isaac selon la promesse de Dieu. Abraham a 100 ans. Le rire de Sara se change en joie.',
      date: 'Accomplissement',
      emoji: '👶',
      isRevealed: false
    },
    {
      id: 'sacrifice',
      title: 'Le sacrifice d\'Isaac',
      description: 'Dieu teste Abraham en lui demandant de sacrifier Isaac. Au dernier moment, Dieu pourvoit un bélier.',
      date: 'Test suprême',
      emoji: '🐏',
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
      markDone('abraham-timeline-game');
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
    <div className={`min-h-screen p-6 ${contrastHigh ? 'bg-black text-white' : 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50'}`}>
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            🌟 Frise Chronologique - Abraham
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Découvre le parcours du père de la foi étape par étape
          </p>
          <div className="bg-amber-100 dark:bg-amber-900 px-4 py-2 rounded-lg inline-block">
            <span className="text-amber-800 dark:text-amber-200 font-medium">
              📖 Genèse 12-22 | Score: {score}/100
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            🎯 Comment jouer
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Clique sur chaque événement pour découvrir l'histoire d'Abraham, le père de la foi, dans l'ordre chronologique. 
            Une histoire de promesses divines et d'obéissance !
          </p>
        </div>

        {/* Frise chronologique interactive */}
        <div className="relative">
          {/* Ligne de temps */}
          <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-gradient-to-b from-amber-400 to-orange-400"></div>
          
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
                        ? 'bg-white dark:bg-gray-800 hover:scale-105 border-2 border-amber-300' 
                        : 'bg-gray-100 dark:bg-gray-700 opacity-50 cursor-not-allowed'
                      }
                      ${index === currentEventIndex && !event.isRevealed ? 'ring-4 ring-amber-300 animate-pulse' : ''}
                    `}
                    onClick={() => {
                      if (index === currentEventIndex && !event.isRevealed) {
                        revealEvent(event.id);
                      }
                    }}
                  >
                    {/* Numéro de l'étape */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
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
                          <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
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
          <div className="mt-8 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-4">🎉 Bravo !</h2>
            <p className="text-lg mb-4">
              Tu as découvert toute l'histoire d'Abraham ! Score final: {score}/100
            </p>
            <p className="text-sm mb-6 opacity-90">
              "Abraham crut à Dieu, et cela lui fut imputé à justice" - Romains 4:3
            </p>
            <button
              onClick={resetGame}
              className="bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-orange-50 transition-colors"
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

export default AbrahamTimelineGame;