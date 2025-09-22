import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';
import { useProgress } from '../state/progressStore';

interface PuzzlePiece {
  id: number;
  emoji: string;
  name: string;
  position: { x: number; y: number } | null;
  correctPosition: { x: number; y: number };
  isPlaced: boolean;
}

const ArkPuzzleGame = () => {
  const { contrastHigh } = useSettings();
  const { markDone } = useProgress();
  
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);

  const puzzleData = [
    { id: 1, emoji: '🦁', name: 'Lion', correctPosition: { x: 0, y: 0 } },
    { id: 2, emoji: '🦁', name: 'Lionne', correctPosition: { x: 1, y: 0 } },
    { id: 3, emoji: '🐘', name: 'Éléphant', correctPosition: { x: 2, y: 0 } },
    { id: 4, emoji: '🐘', name: 'Éléphante', correctPosition: { x: 3, y: 0 } },
    { id: 5, emoji: '🦒', name: 'Girafe', correctPosition: { x: 0, y: 1 } },
    { id: 6, emoji: '🦒', name: 'Girafe', correctPosition: { x: 1, y: 1 } },
    { id: 7, emoji: '🐯', name: 'Tigre', correctPosition: { x: 2, y: 1 } },
    { id: 8, emoji: '🐯', name: 'Tigresse', correctPosition: { x: 3, y: 1 } },
    { id: 9, emoji: '🐻', name: 'Ours', correctPosition: { x: 0, y: 2 } },
    { id: 10, emoji: '🐻', name: 'Ourse', correctPosition: { x: 1, y: 2 } },
    { id: 11, emoji: '🐼', name: 'Panda', correctPosition: { x: 2, y: 2 } },
    { id: 12, emoji: '🐼', name: 'Panda', correctPosition: { x: 3, y: 2 } }
  ];

  const initializeGame = () => {
    const shuffledPieces = puzzleData
      .map(piece => ({
        ...piece,
        position: null,
        isPlaced: false
      }))
      .sort(() => Math.random() - 0.5);
    
    setPieces(shuffledPieces);
    setGameStarted(true);
    setGameWon(false);
    setMoves(0);
  };

  const handleDragStart = (e: React.DragEvent, pieceId: number) => {
    setDraggedPiece(pieceId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropX: number, dropY: number) => {
    e.preventDefault();
    
    if (draggedPiece === null) return;
    
    const piece = pieces.find(p => p.id === draggedPiece);
    if (!piece) return;
    
    // Vérifier si la position est déjà occupée
    const isOccupied = pieces.some(p => 
      p.position?.x === dropX && p.position?.y === dropY && p.id !== draggedPiece
    );
    
    if (isOccupied) {
      setDraggedPiece(null);
      return;
    }
    
    setMoves(moves + 1);
    
    // Mettre à jour la position de la pièce
    setPieces(prev => prev.map(p => 
      p.id === draggedPiece 
        ? { 
            ...p, 
            position: { x: dropX, y: dropY },
            isPlaced: p.correctPosition.x === dropX && p.correctPosition.y === dropY
          }
        : p
    ));
    
    setDraggedPiece(null);
    
    // Vérifier si le puzzle est terminé
    setTimeout(() => {
      const updatedPieces = pieces.map(p => 
        p.id === draggedPiece 
          ? { 
              ...p, 
              position: { x: dropX, y: dropY },
              isPlaced: p.correctPosition.x === dropX && p.correctPosition.y === dropY
            }
          : p
      );
      
      if (updatedPieces.every(piece => piece.isPlaced)) {
        setGameWon(true);
        // Marquer comme terminé avec un badge selon le nombre de coups
        let badge = '';
        if (moves + 1 <= 15) badge = '🏆 Architecte Parfait';
        else if (moves + 1 <= 25) badge = '⭐ Bon Constructeur';
        else badge = '👍 Constructeur Persévérant';
        
        markDone(`puzzle-arche-${Date.now()}`, badge);
      }
    }, 100);
  };

  const handlePieceClick = (pieceId: number) => {
    // Retirer la pièce de l'arche pour la remettre dans l'inventaire
    setPieces(prev => prev.map(p => 
      p.id === pieceId 
        ? { ...p, position: null, isPlaced: false }
        : p
    ));
  };

  const resetGame = () => {
    setGameStarted(false);
    setPieces([]);
    setGameWon(false);
    setMoves(0);
    setDraggedPiece(null);
  };

  if (gameWon) {
    return (
      <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-blue-50 via-white to-green-50'}`}>
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
                : 'bg-white shadow-xl border border-blue-200'
            }`}>
              <div className="text-6xl mb-6">🎉</div>
              <h2 className={`text-3xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                L'Arche est Complète !
              </h2>
              <p className={`text-xl mb-6 ${contrastHigh ? 'text-contrast-text' : 'text-blue-600'}`}>
                Tu as reconstitué l'Arche de Noé en {moves} coups !
              </p>
              <p className={`text-lg mb-8 ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                Tous les animaux sont maintenant à l'abri dans l'arche ! 🌈
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors"
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
      <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-blue-50 via-white to-green-50'}`}>
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
                : 'bg-white shadow-xl border border-blue-200'
            }`}>
              <div className="text-6xl mb-6">🚢</div>
              <h1 className={`text-3xl font-bold mb-6 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                Puzzle de l'Arche de Noé
              </h1>
              <p className={`text-xl mb-8 ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                Aide Noé à placer tous les animaux dans l'arche avant le déluge !
              </p>
              
              <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ${
                contrastHigh ? 'text-contrast-text' : 'text-blue-700'
              }`}>
                <div className="flex flex-col items-center">
                  <div className="text-3xl mb-2">🐾</div>
                  <div className="font-semibold">12 Animaux</div>
                  <div className="text-sm opacity-80">Par paires</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl mb-2">🧩</div>
                  <div className="font-semibold">Glisser-Déposer</div>
                  <div className="text-sm opacity-80">Facile à jouer</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <div className="font-semibold">Badges</div>
                  <div className="text-sm opacity-80">Selon tes performances</div>
                </div>
              </div>
              
              <button
                onClick={initializeGame}
                className="px-8 py-4 bg-blue-500 text-white text-xl font-bold rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🚀 Commencer le puzzle
              </button>
              
              <div className={`mt-8 p-4 rounded-xl ${
                contrastHigh 
                  ? 'bg-contrast-text/10'
                  : 'bg-blue-50'
              }`}>
                <h3 className={`font-bold mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-blue-800'}`}>
                  📖 Histoire Biblique
                </h3>
                <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-blue-700'}`}>
                  "L'Éternel dit à Noé: Entre dans l'arche, toi et toute ta maison... 
                  Tu prendras auprès de toi sept couples de tous les animaux purs" - Genèse 7:1-2 (Louis Segond 1910)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-blue-50 via-white to-green-50'}`}>
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
            <div className={`text-center ${contrastHigh ? 'text-contrast-text' : 'text-blue-600'}`}>
              <div className="text-sm">Coups</div>
              <div className="text-2xl font-bold">{moves}</div>
            </div>
            <div className={`text-center ${contrastHigh ? 'text-contrast-text' : 'text-green-600'}`}>
              <div className="text-sm">Placés</div>
              <div className="text-2xl font-bold">{pieces.filter(p => p.isPlaced).length}/12</div>
            </div>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              🔄 Nouveau puzzle
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Arche (Zone de dépôt) */}
          <div className="lg:col-span-2">
            <div className={`p-6 rounded-2xl ${
              contrastHigh 
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-gradient-to-br from-amber-100 to-orange-200 border-2 border-amber-300'
            }`}>
              <h2 className={`text-2xl font-bold mb-4 text-center ${
                contrastHigh ? 'text-contrast-text' : 'text-amber-800'
              }`}>
                🚢 L'Arche de Noé
              </h2>
              
              <div className="grid grid-cols-4 gap-2 mb-4">
                {Array.from({ length: 12 }, (_, index) => {
                  const x = index % 4;
                  const y = Math.floor(index / 4);
                  const placedPiece = pieces.find(p => p.position?.x === x && p.position?.y === y);
                  
                  return (
                    <div
                      key={`${x}-${y}`}
                      className={`aspect-square border-2 border-dashed rounded-xl flex items-center justify-center transition-all duration-300 ${
                        contrastHigh
                          ? placedPiece 
                            ? placedPiece.isPlaced 
                              ? 'bg-contrast-text/30 border-contrast-text'
                              : 'bg-contrast-text/10 border-contrast-text/50'
                            : 'border-contrast-text/30 hover:border-contrast-text/60'
                          : placedPiece
                            ? placedPiece.isPlaced
                              ? 'bg-green-200 border-green-400'
                              : 'bg-yellow-100 border-yellow-300'
                            : 'border-amber-300 hover:border-amber-500 hover:bg-amber-50'
                      }`}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, x, y)}
                    >
                      {placedPiece && (
                        <div
                          className="text-3xl cursor-pointer hover:scale-110 transition-transform"
                          onClick={() => handlePieceClick(placedPiece.id)}
                          title={`${placedPiece.name} - Cliquer pour retirer`}
                        >
                          {placedPiece.emoji}
                          {placedPiece.isPlaced && (
                            <div className="text-xs text-green-600">✓</div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className={`text-center text-sm ${
                contrastHigh ? 'text-contrast-text' : 'text-amber-700'
              }`}>
                Glisse les animaux dans l'arche. Clique sur un animal placé pour le retirer.
              </div>
            </div>
          </div>

          {/* Inventaire des animaux */}
          <div>
            <div className={`p-6 rounded-2xl ${
              contrastHigh 
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-white border-2 border-blue-200'
            }`}>
              <h3 className={`text-xl font-bold mb-4 text-center ${
                contrastHigh ? 'text-contrast-text' : 'text-blue-800'
              }`}>
                🐾 Animaux à Placer
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                {pieces
                  .filter(piece => !piece.position)
                  .map((piece) => (
                    <div
                      key={piece.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, piece.id)}
                      className={`aspect-square border-2 rounded-xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                        contrastHigh
                          ? 'bg-contrast-text/10 border-contrast-text/30 hover:border-contrast-text'
                          : 'bg-blue-50 border-blue-200 hover:border-blue-400 hover:bg-blue-100'
                      }`}
                      title={piece.name}
                    >
                      <div className="text-2xl">{piece.emoji}</div>
                      <div className={`text-xs font-medium text-center mt-1 ${
                        contrastHigh ? 'text-contrast-text' : 'text-blue-700'
                      }`}>
                        {piece.name}
                      </div>
                    </div>
                  ))}
              </div>
              
              {pieces.filter(piece => !piece.position).length === 0 && (
                <div className={`text-center py-8 ${
                  contrastHigh ? 'text-contrast-text' : 'text-gray-500'
                }`}>
                  <div className="text-3xl mb-2">🎉</div>
                  <div className="text-sm">Tous les animaux sont dans l'arche !</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArkPuzzleGame;