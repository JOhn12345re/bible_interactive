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

const AdamEveOrderGame = () => {
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
      id: 'creation_adam_eve',
      text: 'Dieu forme Adam et crée Ève dans le jardin d\'Éden',
      correctOrder: 1,
      emoji: '👫'
    },
    {
      id: 'vie_eden',
      text: 'Adam et Ève vivent en harmonie dans le jardin',
      correctOrder: 2,
      emoji: '🌸'
    },
    {
      id: 'commandement',
      text: 'Dieu leur donne le commandement de ne pas manger de l\'arbre défendu',
      correctOrder: 3,
      emoji: '🌳'
    },
    {
      id: 'tentation_serpent',
      text: 'Le serpent tente Ève et met en doute la parole de Dieu',
      correctOrder: 4,
      emoji: '🐍'
    },
    {
      id: 'desobeissance',
      text: 'Ève mange du fruit et en donne à Adam',
      correctOrder: 5,
      emoji: '🍎'
    },
    {
      id: 'yeux_ouverts',
      text: 'Leurs yeux s\'ouvrent et ils réalisent qu\'ils sont nus',
      correctOrder: 6,
      emoji: '👁️'
    },
    {
      id: 'se_cachent',
      text: 'Adam et Ève se cachent de la présence de Dieu',
      correctOrder: 7,
      emoji: '🙈'
    },
    {
      id: 'jugement_divin',
      text: 'Dieu prononce Son jugement sur le serpent, la femme et l\'homme',
      correctOrder: 8,
      emoji: '⚖️'
    },
    {
      id: 'promesse_salut',
      text: 'Dieu annonce qu\'un descendant écrasera la tête du serpent',
      correctOrder: 9,
      emoji: '✨'
    },
    {
      id: 'expulsion_eden',
      text: 'Dieu chasse Adam et Ève du jardin d\'Éden',
      correctOrder: 10,
      emoji: '🚪'
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
      markDone('adam-eve-order-game');
      updateGameStats('adam-eve-order-game', score);
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
    <div className={`min-h-screen p-6 ${contrastHigh ? 'bg-black text-white' : 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50'}`}>
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            🍎 Jeu d'ordre - Adam et Ève
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Remets les événements de la chute dans le bon ordre !
          </p>
          <div className="mt-4">
            <span className="bg-green-100 dark:bg-green-900 px-4 py-2 rounded-lg text-green-800 dark:text-green-200">
              📖 Genèse 2-3
            </span>
          </div>
        </div>

        {/* Jeu d'ordre chronologique */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            📅 Remets l'histoire d'Adam et Ève en ordre
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
                className="flex items-center justify-between p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg border-2 border-green-200 dark:border-green-700 cursor-move"
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
                      className="px-2 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                    >
                      ↑
                    </button>
                  )}
                  {index < orderingItems.length - 1 && (
                    <button
                      onClick={() => moveItem(index, index + 1)}
                      className="px-2 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
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
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:to-blue-600 transition-all"
              >
                ✅ Vérifier l'ordre
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className={`text-2xl font-bold mb-4 ${orderingScore === 100 ? 'text-green-600' : 'text-green-600'}`}>
                Score: {orderingScore}/100
              </div>
              {orderingScore === 100 ? (
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl mb-6">
                  <div className="text-green-600 font-bold text-xl mb-2">🎉 Parfait !</div>
                  <p className="text-green-800 dark:text-green-200">
                    Tu as parfaitement remis l'histoire d'Adam et Ève en ordre !
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                    "Je mettrai inimitié entre toi et la femme, entre ta postérité et sa postérité" - Genèse 3:15
                  </p>
                </div>
              ) : (
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl mb-6">
                  <div className="text-green-600 font-bold text-xl mb-2">📚 Continue !</div>
                  <p className="text-green-800 dark:text-green-200">
                    Presque ! Quelques événements ne sont pas encore dans le bon ordre.
                  </p>
                </div>
              )}
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-4"
              >
                🔄 Recommencer
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <Link
            to="/lesson/adam_eve_01"
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
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

export default AdamEveOrderGame;