import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';
import { useProgress } from '../state/progressStore';

interface Card {
  id: number;
  text: string;
  reference: string;
  type: 'verse' | 'reference';
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

const VerseMemoryCardGame = () => {
  const { contrastHigh } = useSettings();
  const { markDone } = useProgress();
  
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const verseData = [
    {
      id: 1,
      verse: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique",
      reference: "Jean 3:16"
    },
    {
      id: 2,
      verse: "Je puis tout par celui qui me fortifie",
      reference: "Philippiens 4:13"
    },
    {
      id: 3,
      verse: "L'Éternel est mon berger: je ne manquerai de rien",
      reference: "Psaume 23:1"
    },
    {
      id: 4,
      verse: "Cherchez premièrement le royaume et la justice de Dieu",
      reference: "Matthieu 6:33"
    },
    {
      id: 5,
      verse: "En vérité, en vérité, je vous le dis, celui qui croit en moi a la vie éternelle",
      reference: "Jean 6:47"
    },
    {
      id: 6,
      verse: "Car mes pensées ne sont pas vos pensées",
      reference: "Ésaïe 55:8"
    }
  ];

  const initializeGame = () => {
    const gameCards: Card[] = [];
    
    verseData.forEach((verse, index) => {
      // Carte verset
      gameCards.push({
        id: index * 2,
        text: verse.verse,
        reference: verse.reference,
        type: 'verse',
        pairId: verse.id,
        isFlipped: false,
        isMatched: false
      });
      
      // Carte référence
      gameCards.push({
        id: index * 2 + 1,
        text: verse.reference,
        reference: verse.reference,
        type: 'reference',
        pairId: verse.id,
        isFlipped: false,
        isMatched: false
      });
    });
    
    // Mélanger les cartes
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setGameStarted(true);
    setFlippedCards([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length >= 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;
    
    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    
    // Retourner la carte
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));
    
    // Vérifier la correspondance si 2 cartes sont retournées
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstCardId);
      const secondCard = cards.find(c => c.id === secondCardId);
      
      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // Correspondance trouvée
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstCardId || c.id === secondCardId 
              ? { ...c, isMatched: true }
              : c
          ));
          setFlippedCards([]);
          
          // Vérifier si le jeu est terminé
          const updatedCards = cards.map(c => 
            c.id === firstCardId || c.id === secondCardId 
              ? { ...c, isMatched: true }
              : c
          );
          
          if (updatedCards.every(card => card.isMatched)) {
            setGameWon(true);
            // Marquer comme terminé avec un badge selon le nombre de coups
            let badge = '';
            if (moves + 1 <= 8) badge = '🧠 Mémoire Parfaite';
            else if (moves + 1 <= 12) badge = '⭐ Bonne Mémoire';
            else badge = '👍 Mémoire Entraînée';
            
            markDone(`memory-versets-${Date.now()}`, badge);
          }
        }, 500);
      } else {
        // Pas de correspondance
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstCardId || c.id === secondCardId 
              ? { ...c, isFlipped: false }
              : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setCards([]);
    setFlippedCards([]);
    setMoves(0);
    setGameWon(false);
  };

  if (gameWon) {
    return (
      <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-purple-50 via-white to-pink-50'}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <Link 
              to="/games" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                contrastHigh ? 'hover:bg-contrast-text/20' : 'hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl">←</span>
              <span>Retour aux jeux</span>
            </Link>
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <div className={`p-8 rounded-2xl ${
              contrastHigh 
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-white shadow-xl border border-purple-200'
            }`}>
              <div className="text-6xl mb-6">🎉</div>
              <h2 className={`text-3xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                Félicitations !
              </h2>
              <p className={`text-xl mb-6 ${contrastHigh ? 'text-contrast-text' : 'text-purple-600'}`}>
                Tu as terminé le Memory des Versets en {moves} coups !
              </p>
              <p className={`text-lg mb-8 ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                Tu connais maintenant {verseData.length} versets bibliques par cœur !
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-purple-500 text-white rounded-full font-medium hover:bg-purple-600 transition-colors"
                >
                  🔄 Rejouer
                </button>
                <Link
                  to="/games"
                  className="px-6 py-3 bg-gray-500 text-white rounded-full font-medium hover:bg-gray-600 transition-colors"
                >
                  🎮 Autres jeux
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-purple-50 via-white to-pink-50'}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <Link 
              to="/games" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                contrastHigh ? 'hover:bg-contrast-text/20' : 'hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl">←</span>
              <span>Retour aux jeux</span>
            </Link>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <div className={`p-8 rounded-2xl ${
              contrastHigh 
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-white shadow-xl border border-purple-200'
            }`}>
              <div className="text-6xl mb-6">🧠</div>
              <h1 className={`text-3xl font-bold mb-6 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                Memory des Versets
              </h1>
              <p className={`text-xl mb-8 ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                Retrouve les paires verset-référence pour mémoriser la Parole de Dieu !
              </p>
              
              <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ${
                contrastHigh ? 'text-contrast-text' : 'text-purple-700'
              }`}>
                <div className="flex flex-col items-center">
                  <div className="text-3xl mb-2">📖</div>
                  <div className="font-semibold">6 Versets</div>
                  <div className="text-sm opacity-80">Louis Segond 1910</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="font-semibold">12 Cartes</div>
                  <div className="text-sm opacity-80">6 paires à trouver</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <div className="font-semibold">Badges</div>
                  <div className="text-sm opacity-80">Selon tes performances</div>
                </div>
              </div>
              
              <button
                onClick={initializeGame}
                className="px-8 py-4 bg-purple-500 text-white text-xl font-bold rounded-full hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🚀 Commencer le jeu
              </button>
              
              <div className={`mt-8 p-4 rounded-xl ${
                contrastHigh 
                  ? 'bg-contrast-text/10'
                  : 'bg-purple-50'
              }`}>
                <h3 className={`font-bold mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-purple-800'}`}>
                  💡 Comment jouer ?
                </h3>
                <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-purple-700'}`}>
                  Clique sur les cartes pour les retourner. Trouve les paires verset-référence. 
                  Mémorise en moins de coups possible pour obtenir le meilleur badge !
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-purple-50 via-white to-pink-50'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/games" 
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
              contrastHigh ? 'hover:bg-contrast-text/20' : 'hover:bg-gray-100'
            }`}
          >
            <span className="text-2xl">←</span>
            <span>Retour aux jeux</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <div className={`text-center ${contrastHigh ? 'text-contrast-text' : 'text-purple-600'}`}>
              <div className="text-sm">Coups</div>
              <div className="text-2xl font-bold">{moves}</div>
            </div>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
            >
              🔄 Nouveau jeu
            </button>
          </div>
        </div>

        {/* Game Board */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  card.isMatched ? 'opacity-50' : ''
                }`}
              >
                <div className={`w-full h-full rounded-xl border-2 transition-all duration-500 ${
                  card.isFlipped || card.isMatched 
                    ? card.isMatched
                      ? contrastHigh
                        ? 'bg-contrast-text/30 border-contrast-text'
                        : 'bg-green-100 border-green-300'
                      : contrastHigh
                        ? 'bg-contrast-bg border-contrast-text'
                        : card.type === 'verse'
                          ? 'bg-blue-50 border-blue-300'
                          : 'bg-yellow-50 border-yellow-300'
                    : contrastHigh 
                      ? 'bg-contrast-text/20 border-contrast-text'
                      : 'bg-gradient-to-br from-purple-400 to-pink-500 border-purple-300'
                }`}>
                  {card.isFlipped || card.isMatched ? (
                    <div className="h-full p-2 flex items-center justify-center">
                      <div className="text-center">
                        {card.type === 'verse' ? (
                          <>
                            <div className="text-xs mb-1">📜</div>
                            <div className={`text-xs font-medium leading-tight ${
                              contrastHigh ? 'text-contrast-text' : 'text-blue-800'
                            }`}>
                              {card.text.length > 50 ? card.text.substring(0, 47) + '...' : card.text}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-xs mb-1">📍</div>
                            <div className={`text-xs font-bold ${
                              contrastHigh ? 'text-contrast-text' : 'text-yellow-800'
                            }`}>
                              {card.text}
                            </div>
                            <div className={`text-xs mt-1 opacity-80 ${
                              contrastHigh ? 'text-contrast-text' : 'text-yellow-700'
                            }`}>
                              (Louis Segond 1910)
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-white text-2xl">📖</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerseMemoryCardGame;