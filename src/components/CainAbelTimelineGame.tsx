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

const CainAbelTimelineGame = () => {
  const { contrastHigh } = useSettings();
  const { markDone } = useProgress();

  const [events, setEvents] = useState<TimelineEvent[]>([
    {
      id: 'naissance',
      title: 'Naissance des deux frères',
      description: 'Adam et Ève eurent deux fils : Caïn, l\'aîné, et Abel, le cadet. Ils grandirent ensemble dans la famille.',
      date: 'Début',
      emoji: '👶',
      isRevealed: false
    },
    {
      id: 'metiers',
      title: 'Choix des métiers',
      description: 'Abel devint berger et gardait les troupeaux. Caïn devint agriculteur et cultivait la terre.',
      date: 'Jeunesse',
      emoji: '🐑',
      isRevealed: false
    },
    {
      id: 'offrandes',
      title: 'Les offrandes à Dieu',
      description: 'Caïn apporta des fruits de la terre en offrande. Abel offrit des premiers-nés de ses troupeaux et de leur graisse.',
      date: 'Le sacrifice',
      emoji: '🔥',
      isRevealed: false
    },
    {
      id: 'acceptation',
      title: 'Dieu regarde les offrandes',
      description: 'L\'Éternel eut égard à Abel et à son offrande, mais Il n\'eut pas égard à Caïn et à son offrande.',
      date: 'La réponse divine',
      emoji: '👁️',
      isRevealed: false
    },
    {
      id: 'colere',
      title: 'La colère de Caïn',
      description: 'Caïn fut très irrité et son visage s\'assombrit. La jalousie et la colère remplirent son cœur contre son frère.',
      date: 'L\'amertume',
      emoji: '😡',
      isRevealed: false
    },
    {
      id: 'avertissement',
      title: 'L\'avertissement divin',
      description: 'Dieu avertit Caïn : "Si tu fais le bien, ne seras-tu pas accepté ? Le péché est à la porte, mais toi tu le domineras."',
      date: 'La mise en garde',
      emoji: '⚠️',
      isRevealed: false
    },
    {
      id: 'piege',
      title: 'Caïn tend un piège',
      description: 'Caïn dit à Abel son frère : "Allons aux champs." Il médite déjà son crime dans son cœur.',
      date: 'La préméditation',
      emoji: '🌾',
      isRevealed: false
    },
    {
      id: 'meurtre',
      title: 'Le premier meurtre',
      description: 'Comme ils étaient dans les champs, Caïn se jeta sur Abel, son frère, et le tua. Premier meurtre de l\'humanité.',
      date: 'Le crime',
      emoji: '⚡',
      isRevealed: false
    },
    {
      id: 'question',
      title: 'La question de Dieu',
      description: 'L\'Éternel demanda à Caïn : "Où est ton frère Abel ?" Caïn répondit : "Je ne sais pas. Suis-je le gardien de mon frère ?"',
      date: 'L\'interrogation',
      emoji: '❓',
      isRevealed: false
    },
    {
      id: 'jugement',
      title: 'Le jugement et l\'exil',
      description: 'Dieu maudit Caïn : la terre ne lui donnera plus sa richesse. Il sera errant et vagabond sur la terre.',
      date: 'La sentence',
      emoji: '🚶',
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
      markDone('cain-abel-timeline-game');
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
    <div className={`min-h-screen p-6 ${contrastHigh ? 'bg-black text-white' : 'bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50'}`}>
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            ⚔️ Frise Chronologique - Caïn et Abel
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Découvre l'histoire tragique des deux frères étape par étape
          </p>
          <div className="bg-red-100 dark:bg-red-900 px-4 py-2 rounded-lg inline-block">
            <span className="text-red-800 dark:text-red-200 font-medium">
              📖 Genèse 4:1-16 | Score: {score}/100
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            🎯 Comment jouer
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Clique sur chaque événement pour découvrir l'histoire de Caïn et Abel dans l'ordre chronologique. 
            Cette histoire nous enseigne sur la jalousie et ses conséquences.
          </p>
        </div>

        {/* Frise chronologique interactive */}
        <div className="relative">
          {/* Ligne de temps */}
          <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-gradient-to-b from-green-400 to-red-600"></div>
          
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
                        ? 'bg-white dark:bg-gray-800 hover:scale-105 border-2 border-orange-300' 
                        : 'bg-gray-100 dark:bg-gray-700 opacity-50 cursor-not-allowed'
                      }
                      ${index === currentEventIndex && !event.isRevealed ? 'ring-4 ring-orange-300 animate-pulse' : ''}
                    `}
                    onClick={() => {
                      if (index === currentEventIndex && !event.isRevealed) {
                        revealEvent(event.id);
                      }
                    }}
                  >
                    {/* Numéro de l'étape */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
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
                          <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">
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
          <div className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-4">🎉 Histoire complétée !</h2>
            <p className="text-lg mb-4">
              Tu as découvert toute l'histoire de Caïn et Abel ! Score final: {score}/100
            </p>
            <p className="text-sm mb-6 opacity-90">
              "Si tu fais le bien, ne seras-tu pas accepté ? Mais si tu ne fais pas le bien, le péché est à la porte" - Genèse 4:7
            </p>
            <button
              onClick={resetGame}
              className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-red-50 transition-colors"
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

export default CainAbelTimelineGame;