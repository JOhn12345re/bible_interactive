import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';
import { useProgress } from '../state/progressStore';
import { useProfileStore } from '../state/profileStore';

interface OrderingItem {
  id: string;
  text: string;
  correctOrder: number;
  emoji: string;
}

const MerRougeOrderGame = () => {
  const { contrastHigh } = useSettings();
  const { markDone } = useProgress();
  const { updateGameStats } = useProfileStore();

  // États pour le jeu d'ordre
  const [orderingItems, setOrderingItems] = useState<OrderingItem[]>([]);
  const [orderingCompleted, setOrderingCompleted] = useState(false);
  const [orderingScore, setOrderingScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Éléments à remettre en ordre chronologique
  const originalOrderingItems: OrderingItem[] = [
    {
      id: 'sortie_egypte',
      text: 'Le peuple sort d\'Égypte après les plaies',
      correctOrder: 1,
      emoji: '🚶‍♂️'
    },
    {
      id: 'poursuite',
      text: 'Pharaon regrette et poursuit avec ses chars',
      correctOrder: 2,
      emoji: '🏇'
    },
    {
      id: 'arrivee_mer',
      text: 'Israël arrive au bord de la mer Rouge',
      correctOrder: 3,
      emoji: '🌊'
    },
    {
      id: 'peur_peuple',
      text: 'Le peuple a peur voyant l\'armée égyptienne',
      correctOrder: 4,
      emoji: '😰'
    },
    {
      id: 'priere_moise',
      text: 'Moïse prie et rassure le peuple',
      correctOrder: 5,
      emoji: '🙏'
    },
    {
      id: 'baton_leve',
      text: 'Moïse étend son bâton sur la mer',
      correctOrder: 6,
      emoji: '🪄'
    },
    {
      id: 'division_eaux',
      text: 'Dieu divise les eaux par un vent fort',
      correctOrder: 7,
      emoji: '💨'
    },
    {
      id: 'traversee',
      text: 'Israël traverse à pied sec entre les murailles',
      correctOrder: 8,
      emoji: '🚶‍♀️'
    },
    {
      id: 'poursuite_egyptiens',
      text: 'Les Égyptiens les poursuivent dans la mer',
      correctOrder: 9,
      emoji: '🐎'
    },
    {
      id: 'engloutissement',
      text: 'Les eaux se referment et engloutissent l\'armée',
      correctOrder: 10,
      emoji: '🌊'
    },
    {
      id: 'cantique',
      text: 'Israël chante un cantique de victoire',
      correctOrder: 11,
      emoji: '🎵'
    }
  ];

  // Initialisation du jeu d'ordre
  useEffect(() => {
    const shuffled = [...originalOrderingItems].sort(() => Math.random() - 0.5);
    setOrderingItems(shuffled);
  }, []);

  // Fonction pour réorganiser les éléments
  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...orderingItems];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    setOrderingItems(newItems);
  };

  // Vérifier l'ordre
  const checkOrder = () => {
    setAttempts(prev => prev + 1);
    let correct = 0;
    orderingItems.forEach((item, index) => {
      if (item.correctOrder === index + 1) {
        correct++;
      }
    });
    
    const score = Math.round((correct / orderingItems.length) * 100);
    setOrderingScore(score);
    setOrderingCompleted(true);
    
    if (score === 100) {
      markDone('mer-rouge-order-game');
      updateGameStats('mer-rouge-order-game', score);
    }
  };

  const resetGame = () => {
    const shuffled = [...originalOrderingItems].sort(() => Math.random() - 0.5);
    setOrderingItems(shuffled);
    setOrderingCompleted(false);
    setOrderingScore(0);
    setAttempts(0);
  };

  return (
    <div className={`min-h-screen p-6 ${contrastHigh ? 'bg-black text-white' : 'bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50'}`}>
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            🌊 Jeu d'ordre - Passage de la mer Rouge
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Remets les événements du passage de la mer Rouge dans l'ordre chronologique !
          </p>
          <div className="mt-4">
            <span className="bg-cyan-100 dark:bg-cyan-900 px-4 py-2 rounded-lg text-cyan-800 dark:text-cyan-200">
              📖 Exode 14
            </span>
          </div>
        </div>

        {/* Jeu d'ordre chronologique */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            📅 Remets l'histoire dans l'ordre chronologique
          </h2>
          
          {attempts > 0 && (
            <div className="text-center mb-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Tentative {attempts} | Score actuel: {orderingScore}/100
              </span>
            </div>
          )}
          
          <div className="grid gap-3 mb-8 max-h-96 overflow-y-auto">
            {orderingItems.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900 dark:to-blue-900 rounded-lg border-2 border-cyan-200 dark:border-cyan-700 cursor-move"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', index.toString())}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                  moveItem(fromIndex, index);
                }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{item.text}</span>
                </div>
                <div className="flex space-x-2">
                  {index > 0 && (
                    <button
                      onClick={() => moveItem(index, index - 1)}
                      className="px-2 py-1 bg-cyan-500 text-white rounded text-sm hover:bg-cyan-600"
                    >
                      ↑
                    </button>
                  )}
                  {index < orderingItems.length - 1 && (
                    <button
                      onClick={() => moveItem(index, index + 1)}
                      className="px-2 py-1 bg-cyan-500 text-white rounded text-sm hover:bg-cyan-600"
                    >
                      ↓
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {!orderingCompleted ? (
            <div className="text-center">
              <button
                onClick={checkOrder}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
              >
                ✅ Vérifier l'ordre
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className={`text-2xl font-bold mb-4 ${orderingScore === 100 ? 'text-green-600' : 'text-cyan-600'}`}>
                Score: {orderingScore}/100
              </div>
              {orderingScore === 100 ? (
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl mb-6">
                  <div className="text-green-600 font-bold text-xl mb-2">🎉 Magnifique !</div>
                  <p className="text-green-800 dark:text-green-200">
                    Tu as parfaitement remis l'histoire du passage de la mer Rouge en ordre !
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                    "En ce jour, l'Éternel délivra Israël de la main des Égyptiens." - Exode 14:30
                  </p>
                </div>
              ) : (
                <div className="bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-xl mb-6">
                  <div className="text-cyan-600 font-bold text-xl mb-2">📚 Continue !</div>
                  <p className="text-cyan-800 dark:text-cyan-200">
                    Presque ! Quelques événements ne sont pas encore dans le bon ordre.
                  </p>
                </div>
              )}
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 mr-4"
              >
                🔄 Recommencer
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <Link
            to="/lesson/mer_rouge_01"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            📖 Voir la leçon
          </Link>
          <Link
            to="/games"
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            🎮 Autres jeux
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MerRougeOrderGame;