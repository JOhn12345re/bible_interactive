import React, { useState } from 'react';
import { useSettings } from '../state/settingsStore';
import { useProgress } from '../state/progressStore';
import { Link } from 'react-router-dom';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  emoji: string;
  isRevealed: boolean;
}

const NaissanceJesusTimelineGame = () => {
  const { contrastHigh } = useSettings();
  const { markDone } = useProgress();

  const [events, setEvents] = useState<TimelineEvent[]>([
    {
      id: 'annonciation',
      title: 'L\'Annonciation',
      description: 'L\'ange Gabriel est envoyé à Marie à Nazareth pour lui annoncer qu\'elle concevra et enfantera un fils, Jésus.',
      date: '~6 mois avant',
      emoji: '👼',
      isRevealed: false
    },
    {
      id: 'acceptation_marie',
      title: 'L\'acceptation de Marie',
      description: 'Marie répond à l\'ange : "Je suis la servante du Seigneur ; qu\'il me soit fait selon ta parole !"',
      date: 'Foi et soumission',
      emoji: '🙏',
      isRevealed: false
    },
    {
      id: 'joseph_songe',
      title: 'Le songe de Joseph',
      description: 'Un ange apparaît à Joseph en songe pour lui expliquer que l\'enfant que porte Marie vient du Saint-Esprit.',
      date: 'Révélation divine',
      emoji: '😴',
      isRevealed: false
    },
    {
      id: 'recensement',
      title: 'Le recensement de César',
      description: 'César Auguste ordonne un recensement. Joseph et Marie doivent se rendre à Bethléhem, ville de David.',
      date: 'Décret impérial',
      emoji: '📜',
      isRevealed: false
    },
    {
      id: 'voyage_bethleem',
      title: 'Le voyage à Bethléhem',
      description: 'Joseph et Marie, enceinte, entreprennent le long voyage de Nazareth à Bethléhem pour se faire recenser.',
      date: 'Le pèlerinage',
      emoji: '🚶‍♂️',
      isRevealed: false
    },
    {
      id: 'pas_place_hotellerie',
      title: 'Pas de place à l\'hôtellerie',
      description: 'Arrivés à Bethléhem, Joseph et Marie cherchent un logement mais il n\'y a pas de place dans l\'hôtellerie.',
      date: 'Ville bondée',
      emoji: '🏠',
      isRevealed: false
    },
    {
      id: 'naissance_etable',
      title: 'Naissance dans l\'étable',
      description: 'Marie enfante son fils premier-né dans une étable. Elle l\'emmaillote et le couche dans une crèche.',
      date: '0 ap. J.-C.',
      emoji: '👶',
      isRevealed: false
    },
    {
      id: 'bergers_champs',
      title: 'Les bergers aux champs',
      description: 'Des bergers gardent leurs troupeaux dans la région. Un ange du Seigneur leur apparaît dans une grande lumière.',
      date: 'Cette nuit-là',
      emoji: '🐑',
      isRevealed: false
    },
    {
      id: 'annonce_bergers',
      title: 'L\'annonce aux bergers',
      description: 'L\'ange annonce : "Il vous est né aujourd\'hui un Sauveur, qui est le Christ, le Seigneur, dans la ville de David."',
      date: 'Bonne nouvelle',
      emoji: '📢',
      isRevealed: false
    },
    {
      id: 'multitude_anges',
      title: 'La multitude d\'anges',
      description: 'Une multitude d\'anges apparaît, louant Dieu et disant : "Gloire à Dieu au plus haut des cieux !"',
      date: 'Concert céleste',
      emoji: '🎵',
      isRevealed: false
    },
    {
      id: 'visite_bergers',
      title: 'La visite des bergers',
      description: 'Les bergers vont à Bethléhem et trouvent Marie, Joseph et le petit enfant couché dans la crèche.',
      date: 'Premiers visiteurs',
      emoji: '👥',
      isRevealed: false
    },
    {
      id: 'temoignage',
      title: 'Le témoignage',
      description: 'Les bergers racontent ce qu\'ils ont vu et entendu. Marie gardait toutes ces choses en son cœur.',
      date: 'Proclamation',
      emoji: '💬',
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
      markDone('naissance-jesus-timeline-game');
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
    <div className={`min-h-screen p-6 ${contrastHigh ? 'bg-black text-white' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Bouton de retour */}
        <div className="mb-6">
          <Link
            to="/lesson/naissance_jesus"
            className={`inline-flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              contrastHigh
                ? 'bg-white text-black hover:opacity-80'
                : 'bg-white hover:bg-gray-50 text-gray-700 shadow-lg hover:shadow-xl border border-gray-200'
            }`}
          >
            <span className="text-2xl mr-2">←</span>
            <span>Retour à la leçon</span>
          </Link>
        </div>

        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            ⭐ Frise Chronologique - Naissance de Jésus
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Découvre l'histoire de la naissance du Sauveur étape par étape
          </p>
          <div className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-lg inline-block">
            <span className="text-blue-800 dark:text-blue-200 font-medium">
              📖 Luc 1-2, Matthieu 1-2 | Score: {score}/120
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            🎯 Comment jouer
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Clique sur chaque événement pour découvrir l'histoire de la naissance de Jésus dans l'ordre chronologique. 
            La plus belle histoire jamais racontée !
          </p>
        </div>

        {/* Frise chronologique interactive */}
        <div className="relative">
          {/* Ligne de temps */}
          <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-gradient-to-b from-blue-400 via-indigo-400 to-purple-400"></div>
          
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
          <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-4">🎉 Noël accompli !</h2>
            <p className="text-lg mb-4">
              Tu as découvert toute l'histoire de la naissance de Jésus ! Score final: {score}/120
            </p>
            <p className="text-sm mb-6 opacity-90">
              "Gloire à Dieu dans les lieux très hauts, et paix sur la terre parmi les hommes qu\'il agrée !" - Luc 2:14
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

export default NaissanceJesusTimelineGame;