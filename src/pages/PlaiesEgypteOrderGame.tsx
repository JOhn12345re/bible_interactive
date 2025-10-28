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

const PlaiesEgypteOrderGame = () => {
  const { contrastHigh } = useSettings();
  const { markDone } = useProgress();
  const { updateGameStats } = useProfileStore();

  // États pour le jeu d'ordre
  const [orderingItems, setOrderingItems] = useState<OrderingItem[]>([]);
  const [orderingCompleted, setOrderingCompleted] = useState(false);
  const [orderingScore, setOrderingScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Les 10 plaies d'Égypte dans l'ordre
  const originalOrderingItems: OrderingItem[] = [
    {
      id: 'eau_sang',
      text: '1ère plaie : L\'eau changée en sang',
      correctOrder: 1,
      emoji: '🩸'
    },
    {
      id: 'grenouilles',
      text: '2ème plaie : Les grenouilles',
      correctOrder: 2,
      emoji: '🐸'
    },
    {
      id: 'moucherons',
      text: '3ème plaie : Les moucherons',
      correctOrder: 3,
      emoji: '🦟'
    },
    {
      id: 'mouches',
      text: '4ème plaie : Les mouches',
      correctOrder: 4,
      emoji: '🪰'
    },
    {
      id: 'mortalite_betail',
      text: '5ème plaie : La mortalité du bétail',
      correctOrder: 5,
      emoji: '🐄'
    },
    {
      id: 'ulceres',
      text: '6ème plaie : Les ulcères',
      correctOrder: 6,
      emoji: '🤕'
    },
    {
      id: 'grele',
      text: '7ème plaie : La grêle',
      correctOrder: 7,
      emoji: '🧊'
    },
    {
      id: 'sauterelles',
      text: '8ème plaie : Les sauterelles',
      correctOrder: 8,
      emoji: '🦗'
    },
    {
      id: 'tenebres',
      text: '9ème plaie : Les ténèbres',
      correctOrder: 9,
      emoji: '🌑'
    },
    {
      id: 'premiers_nes',
      text: '10ème plaie : La mort des premiers-nés',
      correctOrder: 10,
      emoji: '💔'
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
      markDone('plaies-egypte-order-game');
      updateGameStats('plaies-egypte-order-game', score);
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
    <div className={`min-h-screen p-6 ${contrastHigh ? 'bg-black text-white' : 'bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50'}`}>
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            ⚡ Jeu d'ordre - Les Dix Plaies d'Égypte
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Remets les dix plaies d'Égypte dans l'ordre chronologique !
          </p>
          <div className="mt-4">
            <span className="bg-red-100 dark:bg-red-900 px-4 py-2 rounded-lg text-red-800 dark:text-red-200">
              📖 Exode 7-12
            </span>
          </div>
        </div>

        {/* Jeu d'ordre chronologique */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            📅 Remets les plaies dans l'ordre chronologique
          </h2>
          
          {attempts > 0 && (
            <div className="text-center mb-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Tentative {attempts} | Score actuel: {orderingScore}/100
              </span>
            </div>
          )}
          
          <div className="grid gap-3 mb-8">
            {orderingItems.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900 dark:to-orange-900 rounded-lg border-2 border-red-200 dark:border-red-700 cursor-move"
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
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      ↑
                    </button>
                  )}
                  {index < orderingItems.length - 1 && (
                    <button
                      onClick={() => moveItem(index, index + 1)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
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
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold text-lg hover:from-red-600 hover:to-orange-600 transition-all"
              >
                ✅ Vérifier l'ordre
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className={`text-2xl font-bold mb-4 ${orderingScore === 100 ? 'text-green-600' : 'text-red-600'}`}>
                Score: {orderingScore}/100
              </div>
              {orderingScore === 100 ? (
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl mb-6">
                  <div className="text-green-600 font-bold text-xl mb-2">🎉 Formidable !</div>
                  <p className="text-green-800 dark:text-green-200">
                    Tu as parfaitement remis les dix plaies d'Égypte en ordre !
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                    "Les Égyptiens sauront que je suis l'Éternel." - Exode 7:5
                  </p>
                </div>
              ) : (
                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl mb-6">
                  <div className="text-red-600 font-bold text-xl mb-2">📚 Essaie encore !</div>
                  <p className="text-red-800 dark:text-red-200">
                    Quelques plaies ne sont pas encore dans le bon ordre. Tu peux y arriver !
                  </p>
                </div>
              )}
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 mr-4"
              >
                🔄 Recommencer
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <Link
            to="/lesson/plaies_egypte_01"
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
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

export default PlaiesEgypteOrderGame;