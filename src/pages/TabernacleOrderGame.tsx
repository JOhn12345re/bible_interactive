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

const TabernacleOrderGame = () => {
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
      id: 'ordre_divin',
      text: 'Dieu ordonne à Moïse de construire un sanctuaire',
      correctOrder: 1,
      emoji: '📜'
    },
    {
      id: 'plans_detailles',
      text: 'Dieu montre à Moïse les plans détaillés',
      correctOrder: 2,
      emoji: '📐'
    },
    {
      id: 'collecte_offrandes',
      text: 'Le peuple apporte volontairement ses offrandes',
      correctOrder: 3,
      emoji: '💰'
    },
    {
      id: 'appel_artisans',
      text: 'Dieu désigne Betsaleel et Oholiab comme artisans',
      correctOrder: 4,
      emoji: '👷'
    },
    {
      id: 'fabrication_arche',
      text: 'Construction de l\'arche de l\'alliance',
      correctOrder: 5,
      emoji: '📦'
    },
    {
      id: 'fabrication_table',
      text: 'Fabrication de la table des pains de proposition',
      correctOrder: 6,
      emoji: '🍞'
    },
    {
      id: 'fabrication_chandelier',
      text: 'Création du chandelier à sept branches',
      correctOrder: 7,
      emoji: '🕯️'
    },
    {
      id: 'tentures_rideau',
      text: 'Confection des tentures et du voile',
      correctOrder: 8,
      emoji: '🏺'
    },
    {
      id: 'autel_bronze',
      text: 'Construction de l\'autel des holocaustes en bronze',
      correctOrder: 9,
      emoji: '🔥'
    },
    {
      id: 'assemblage',
      text: 'Assemblage complet du tabernacle',
      correctOrder: 10,
      emoji: '🔧'
    },
    {
      id: 'consecration',
      text: 'Consécration et onction du sanctuaire',
      correctOrder: 11,
      emoji: '✨'
    },
    {
      id: 'gloire_divine',
      text: 'La gloire de l\'Éternel remplit le tabernacle',
      correctOrder: 12,
      emoji: '☁️'
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
      markDone('tabernacle-order-game');
      updateGameStats('tabernacle-order-game', score);
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
    <div className={`min-h-screen p-6 ${contrastHigh ? 'bg-black text-white' : 'bg-gradient-to-br from-purple-50 via-gold-50 to-amber-50'}`}>
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            🏛️ Jeu d'ordre - Le Tabernacle
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Remets les étapes de construction du tabernacle dans l'ordre chronologique !
          </p>
          <div className="mt-4">
            <span className="bg-purple-100 dark:bg-purple-900 px-4 py-2 rounded-lg text-purple-800 dark:text-purple-200">
              📖 Exode 25-40
            </span>
          </div>
        </div>

        {/* Jeu d'ordre chronologique */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            📅 Remets la construction dans l'ordre chronologique
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
                className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-100 to-amber-100 dark:from-purple-900 dark:to-amber-900 rounded-lg border-2 border-purple-200 dark:border-purple-700 cursor-move"
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
                      className="px-2 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
                    >
                      ↑
                    </button>
                  )}
                  {index < orderingItems.length - 1 && (
                    <button
                      onClick={() => moveItem(index, index + 1)}
                      className="px-2 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
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
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-amber-500 text-white rounded-xl font-bold text-lg hover:from-purple-600 hover:to-amber-600 transition-all"
              >
                ✅ Vérifier l'ordre
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className={`text-2xl font-bold mb-4 ${orderingScore === 100 ? 'text-green-600' : 'text-purple-600'}`}>
                Score: {orderingScore}/100
              </div>
              {orderingScore === 100 ? (
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl mb-6">
                  <div className="text-green-600 font-bold text-xl mb-2">🎉 Parfait !</div>
                  <p className="text-green-800 dark:text-green-200">
                    Tu as parfaitement remis la construction du tabernacle en ordre !
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                    "Ils me feront un sanctuaire, et j'habiterai au milieu d'eux." - Exode 25:8
                  </p>
                </div>
              ) : (
                <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl mb-6">
                  <div className="text-purple-600 font-bold text-xl mb-2">📚 Continue !</div>
                  <p className="text-purple-800 dark:text-purple-200">
                    Presque ! Quelques étapes ne sont pas encore dans le bon ordre.
                  </p>
                </div>
              )}
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 mr-4"
              >
                🔄 Recommencer
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <Link
            to="/lesson/tabernacle_01"
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

export default TabernacleOrderGame;