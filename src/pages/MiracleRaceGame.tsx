import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';
import { useProgress } from '../state/progressStore';

interface Miracle {
  id: string;
  name: string;
  emoji: string;
  description: string;
  requiredItems: string[];
  story: string;
  biblicalReference: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
}

interface GameItem {
  id: string;
  emoji: string;
  name: string;
  x: number;
  y: number;
  collected: boolean;
}

interface Player {
  x: number;
  y: number;
  facing: 'up' | 'down' | 'left' | 'right';
  isMoving: boolean;
}

interface GameState {
  currentMiracle: Miracle | null;
  player: Player;
  items: GameItem[];
  collectedItems: string[];
  timeLeft: number;
  gameStarted: boolean;
  gameCompleted: boolean;
  miraclePerformed: boolean;
  score: number;
  level: number;
}

const MiracleRaceGame = () => {
  const { contrastHigh } = useSettings();
  const { markDone } = useProgress();
  
  // Définition des miracles
  const miracles: Miracle[] = [
    {
      id: 'multiplication-pains',
      name: 'Multiplication des Pains',
      emoji: '🍞',
      description: 'Aide Jésus à nourrir 5000 personnes',
      requiredItems: ['bread', 'fish', 'basket', 'faith'],
      story: 'Jésus prit les 5 pains et 2 poissons, et nourrit toute la foule.',
      biblicalReference: 'Matthieu 14:13-21',
      difficulty: 'facile'
    },
    {
      id: 'guerison-aveugle',
      name: 'Guérison de l\'Aveugle',
      emoji: '👁️',
      description: 'Restaure la vue à l\'aveugle-né',
      requiredItems: ['clay', 'water', 'hands', 'faith'],
      story: 'Jésus fit de la boue et l\'appliqua sur les yeux de l\'aveugle.',
      biblicalReference: 'Jean 9:1-12',
      difficulty: 'moyen'
    },
    {
      id: 'resurrection-lazare',
      name: 'Résurrection de Lazare',
      emoji: '⛪',
      description: 'Ramène Lazare à la vie',
      requiredItems: ['tomb', 'voice', 'prayer', 'faith'],
      story: 'Jésus cria d\'une voix forte : "Lazare, sors !"',
      biblicalReference: 'Jean 11:1-44',
      difficulty: 'difficile'
    },
    {
      id: 'marche-eau',
      name: 'Marche sur l\'Eau',
      emoji: '🌊',
      description: 'Marche avec Jésus sur les eaux',
      requiredItems: ['boat', 'wind', 'courage', 'faith'],
      story: 'Pierre marcha sur les eaux vers Jésus pendant la tempête.',
      biblicalReference: 'Matthieu 14:22-33',
      difficulty: 'moyen'
    },
    {
      id: 'guerison-paralytique',
      name: 'Guérison du Paralytique',
      emoji: '🏃',
      description: 'Aide le paralytique à remarcher',
      requiredItems: ['mat', 'friends', 'roof', 'faith'],
      story: 'Ses amis descendirent le paralytique par le toit devant Jésus.',
      biblicalReference: 'Marc 2:1-12',
      difficulty: 'facile'
    }
  ];

  // Items disponibles dans le jeu
  const availableItems = [
    { id: 'bread', emoji: '🍞', name: 'Pain' },
    { id: 'fish', emoji: '🐟', name: 'Poisson' },
    { id: 'basket', emoji: '🧺', name: 'Panier' },
    { id: 'faith', emoji: '✨', name: 'Foi' },
    { id: 'clay', emoji: '🏺', name: 'Argile' },
    { id: 'water', emoji: '💧', name: 'Eau' },
    { id: 'hands', emoji: '🙏', name: 'Mains' },
    { id: 'tomb', emoji: '⚱️', name: 'Tombeau' },
    { id: 'voice', emoji: '📢', name: 'Voix' },
    { id: 'prayer', emoji: '🙏', name: 'Prière' },
    { id: 'boat', emoji: '⛵', name: 'Barque' },
    { id: 'wind', emoji: '💨', name: 'Vent' },
    { id: 'courage', emoji: '💪', name: 'Courage' },
    { id: 'mat', emoji: '🛏️', name: 'Grabat' },
    { id: 'friends', emoji: '👥', name: 'Amis' },
    { id: 'roof', emoji: '🏠', name: 'Toit' }
  ];

  const [gameState, setGameState] = useState<GameState>({
    currentMiracle: null,
    player: { x: 200, y: 300, facing: 'down', isMoving: false },
    items: [],
    collectedItems: [],
    timeLeft: 60,
    gameStarted: false,
    gameCompleted: false,
    miraclePerformed: false,
    score: 0,
    level: 1
  });

  const gameAreaRef = useRef<HTMLDivElement>(null);
  const keysPressed = useRef<Set<string>>(new Set());
  const gameLoopRef = useRef<number>();

  // Initialiser un nouveau niveau
  const initializeLevel = (miracle: Miracle) => {
    const gameItems: GameItem[] = [];
    
    // Ajouter les items requis pour le miracle
    miracle.requiredItems.forEach((itemId, index) => {
      const item = availableItems.find(i => i.id === itemId);
      if (item) {
        gameItems.push({
          id: itemId,
          emoji: item.emoji,
          name: item.name,
          x: Math.random() * 500 + 50,
          y: Math.random() * 300 + 50,
          collected: false
        });
      }
    });

    // Ajouter quelques items distraction
    const distractionItems = availableItems.filter(item => 
      !miracle.requiredItems.includes(item.id)
    );
    
    for (let i = 0; i < 3; i++) {
      const item = distractionItems[Math.floor(Math.random() * distractionItems.length)];
      gameItems.push({
        id: `distraction-${i}`,
        emoji: item.emoji,
        name: item.name,
        x: Math.random() * 500 + 50,
        y: Math.random() * 300 + 50,
        collected: false
      });
    }

    setGameState(prev => ({
      ...prev,
      currentMiracle: miracle,
      items: gameItems,
      collectedItems: [],
      timeLeft: miracle.difficulty === 'facile' ? 90 : miracle.difficulty === 'moyen' ? 75 : 60,
      gameStarted: true,
      gameCompleted: false,
      miraclePerformed: false,
      player: { x: 200, y: 300, facing: 'down', isMoving: false }
    }));
  };

  // Démarrer un miracle aléatoire
  const startRandomMiracle = () => {
    const randomMiracle = miracles[Math.floor(Math.random() * miracles.length)];
    initializeLevel(randomMiracle);
  };

  // Mouvement du joueur
  const movePlayer = useCallback(() => {
    if (!gameState.gameStarted || gameState.gameCompleted) return;

    const speed = 3;
    let newX = gameState.player.x;
    let newY = gameState.player.y;
    let facing = gameState.player.facing;
    let isMoving = false;

    if (keysPressed.current.has('ArrowUp') || keysPressed.current.has('w')) {
      newY = Math.max(0, newY - speed);
      facing = 'up';
      isMoving = true;
    }
    if (keysPressed.current.has('ArrowDown') || keysPressed.current.has('s')) {
      newY = Math.min(360, newY + speed);
      facing = 'down';
      isMoving = true;
    }
    if (keysPressed.current.has('ArrowLeft') || keysPressed.current.has('a')) {
      newX = Math.max(0, newX - speed);
      facing = 'left';
      isMoving = true;
    }
    if (keysPressed.current.has('ArrowRight') || keysPressed.current.has('d')) {
      newX = Math.min(560, newX + speed);
      facing = 'right';
      isMoving = true;
    }

    if (newX !== gameState.player.x || newY !== gameState.player.y) {
      setGameState(prev => ({
        ...prev,
        player: { x: newX, y: newY, facing, isMoving }
      }));

      // Vérifier les collisions avec les items
      checkItemCollisions(newX, newY);
    } else if (gameState.player.isMoving !== isMoving) {
      setGameState(prev => ({
        ...prev,
        player: { ...prev.player, isMoving }
      }));
    }
  }, [gameState.gameStarted, gameState.gameCompleted, gameState.player]);

  // Vérifier les collisions avec les items
  const checkItemCollisions = (playerX: number, playerY: number) => {
    setGameState(prev => {
      const updatedItems = prev.items.map(item => {
        if (!item.collected) {
          const distance = Math.sqrt(
            Math.pow(playerX - item.x, 2) + Math.pow(playerY - item.y, 2)
          );
          
          if (distance < 30) {
            // Item collecté
            return { ...item, collected: true };
          }
        }
        return item;
      });

      // Mettre à jour les items collectés
      const newCollectedItems = updatedItems
        .filter(item => item.collected && !prev.collectedItems.includes(item.id))
        .map(item => item.id);

      if (newCollectedItems.length > 0) {
        const allCollectedItems = [...prev.collectedItems, ...newCollectedItems];
        
        // Vérifier si le miracle peut être accompli
        const canPerformMiracle = prev.currentMiracle?.requiredItems.every(itemId =>
          allCollectedItems.includes(itemId)
        );

        if (canPerformMiracle && !prev.miraclePerformed) {
          // Miracle accompli !
          const points = prev.currentMiracle?.difficulty === 'facile' ? 100 : 
                        prev.currentMiracle?.difficulty === 'moyen' ? 200 : 300;
          
          setTimeout(() => {
            setGameState(current => ({
              ...current,
              miraclePerformed: true,
              gameCompleted: true,
              score: current.score + points + (current.timeLeft * 2)
            }));

            // Marquer la progression
            if (prev.currentMiracle) {
              markDone(`miracle-${prev.currentMiracle.id}`, `Miracle ${prev.currentMiracle.name} accompli`);
            }
          }, 500);
        }

        return {
          ...prev,
          items: updatedItems,
          collectedItems: allCollectedItems
        };
      }

      return { ...prev, items: updatedItems };
    });
  };

  // Boucle de jeu
  const gameLoop = useCallback(() => {
    movePlayer();
    
    // Décrémenter le temps
    setGameState(prev => {
      if (prev.gameStarted && !prev.gameCompleted && prev.timeLeft > 0) {
        const newTimeLeft = prev.timeLeft - 1/60; // 60 FPS
        if (newTimeLeft <= 0) {
          return { ...prev, timeLeft: 0, gameCompleted: true };
        }
        return { ...prev, timeLeft: newTimeLeft };
      }
      return prev;
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [movePlayer]);

  // Gestion des touches
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Démarrer/arrêter la boucle de jeu
  useEffect(() => {
    if (gameState.gameStarted && !gameState.gameCompleted) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    } else if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState.gameStarted, gameState.gameCompleted, gameLoop]);

  // Rejouer
  const playAgain = () => {
    startRandomMiracle();
  };

  // Retour au menu
  const backToMenu = () => {
    setGameState(prev => ({
      ...prev,
      gameStarted: false,
      gameCompleted: false,
      currentMiracle: null
    }));
  };

  return (
    <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
      {/* Header */}
      <header className={`py-6 px-4 sm:px-6 lg:px-8 ${contrastHigh ? 'bg-contrast-bg' : 'bg-white shadow-sm'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/games" 
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  contrastHigh ? 'hover:bg-contrast-text/20' : 'hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl">←</span>
                <span>Retour aux jeux</span>
              </Link>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                  🏃‍♂️ Course au Miracle
                </h1>
                <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                  Collecte les éléments et accomplis des miracles bibliques
                </p>
              </div>
            </div>
            
            {/* Stats */}
            {gameState.gameStarted && (
              <div className={`flex items-center space-x-6 ${
                contrastHigh ? 'text-contrast-text' : 'text-blue-600'
              }`}>
                <div className="text-center">
                  <div className="text-xl font-bold">{Math.ceil(gameState.timeLeft)}</div>
                  <div className="text-xs">Secondes</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{gameState.score}</div>
                  <div className="text-xs">Points</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">
                    {gameState.currentMiracle?.requiredItems.filter(item => 
                      gameState.collectedItems.includes(item)
                    ).length || 0}/{gameState.currentMiracle?.requiredItems.length || 0}
                  </div>
                  <div className="text-xs">Éléments</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {!gameState.gameStarted ? (
          /* Menu principal */
          <div className="space-y-8">
            {/* Introduction */}
            <div className={`rounded-2xl p-8 text-center ${
              contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'
            }`}>
              <div className="text-6xl mb-6">🏃‍♂️✨</div>
              <h2 className={`text-3xl font-bold mb-4 ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-800'
              }`}>
                Course au Miracle
              </h2>
              <p className={`text-lg mb-8 max-w-2xl mx-auto ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-600'
              }`}>
                Aide Jésus à accomplir ses miracles ! Cours dans l'arène, collecte les bons éléments 
                et reconstitue les miracles bibliques avant que le temps s'épuise.
              </p>
              
              <button
                onClick={startRandomMiracle}
                className={`px-8 py-4 rounded-xl font-bold text-xl transition-all hover:scale-105 ${
                  contrastHigh 
                    ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
                }`}
              >
                🚀 Commencer l'Aventure !
              </button>
            </div>

            {/* Liste des miracles */}
            <div className={`rounded-2xl p-6 ${
              contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'
            }`}>
              <h3 className={`text-xl font-bold mb-6 text-center ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-800'
              }`}>
                🌟 Miracles à Découvrir
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {miracles.map((miracle) => (
                  <div
                    key={miracle.id}
                    className={`p-4 rounded-xl border transition-all hover:scale-105 cursor-pointer ${
                      contrastHigh 
                        ? 'border-contrast-text/20 hover:border-contrast-text hover:bg-contrast-text/10'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                    onClick={() => initializeLevel(miracle)}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{miracle.emoji}</div>
                      <h4 className={`font-bold mb-1 ${
                        contrastHigh ? 'text-contrast-text' : 'text-gray-800'
                      }`}>
                        {miracle.name}
                      </h4>
                      <p className={`text-sm mb-2 ${
                        contrastHigh ? 'text-contrast-text' : 'text-gray-600'
                      }`}>
                        {miracle.description}
                      </p>
                      <div className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${
                        miracle.difficulty === 'facile' 
                          ? 'bg-green-100 text-green-800'
                          : miracle.difficulty === 'moyen'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {miracle.difficulty.charAt(0).toUpperCase() + miracle.difficulty.slice(1)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className={`rounded-2xl p-6 ${
              contrastHigh 
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200'
            }`}>
              <h3 className={`font-bold mb-4 ${
                contrastHigh ? 'text-contrast-text' : 'text-yellow-800'
              }`}>
                🎮 Comment Jouer
              </h3>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${
                contrastHigh ? 'text-contrast-text' : 'text-yellow-700'
              }`}>
                <div>
                  <h4 className="font-medium mb-2">🕹️ Contrôles</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Flèches ou WASD pour bouger</li>
                    <li>• Approche-toi des objets pour les collecter</li>
                    <li>• Collecte tous les éléments requis</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🏆 Objectif</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Trouve les bons éléments pour le miracle</li>
                    <li>• Évite les objets qui ne servent pas</li>
                    <li>• Accomplis le miracle avant la fin du temps</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Guide des Emojis */}
            <div className={`rounded-2xl p-6 ${
              contrastHigh 
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200'
            }`}>
              <h3 className={`font-bold mb-6 text-center ${
                contrastHigh ? 'text-contrast-text' : 'text-blue-800'
              }`}>
                🔍 Guide des Emojis - Que Signifie Chaque Symbole ?
              </h3>
              
              {/* Emojis des Miracles */}
              <div className="mb-8">
                <h4 className={`font-medium mb-4 ${
                  contrastHigh ? 'text-contrast-text' : 'text-blue-700'
                }`}>
                  ✨ Emojis des Miracles
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                    contrastHigh ? 'bg-contrast-text/10' : 'bg-white/60'
                  }`}>
                    <span className="text-2xl">🍞</span>
                    <div>
                      <div className={`font-medium ${contrastHigh ? 'text-contrast-text' : 'text-blue-800'}`}>
                        Pain - Multiplication
                      </div>
                      <div className={`text-xs ${contrastHigh ? 'text-contrast-text' : 'text-blue-600'}`}>
                        Nourrir 5000 personnes
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                    contrastHigh ? 'bg-contrast-text/10' : 'bg-white/60'
                  }`}>
                    <span className="text-2xl">👁️</span>
                    <div>
                      <div className={`font-medium ${contrastHigh ? 'text-contrast-text' : 'text-blue-800'}`}>
                        Œil - Guérison
                      </div>
                      <div className={`text-xs ${contrastHigh ? 'text-contrast-text' : 'text-blue-600'}`}>
                        Redonner la vue
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                    contrastHigh ? 'bg-contrast-text/10' : 'bg-white/60'
                  }`}>
                    <span className="text-2xl">⛪</span>
                    <div>
                      <div className={`font-medium ${contrastHigh ? 'text-contrast-text' : 'text-blue-800'}`}>
                        Église - Résurrection
                      </div>
                      <div className={`text-xs ${contrastHigh ? 'text-contrast-text' : 'text-blue-600'}`}>
                        Ramener Lazare à la vie
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                    contrastHigh ? 'bg-contrast-text/10' : 'bg-white/60'
                  }`}>
                    <span className="text-2xl">🌊</span>
                    <div>
                      <div className={`font-medium ${contrastHigh ? 'text-contrast-text' : 'text-blue-800'}`}>
                        Vagues - Marche sur l'eau
                      </div>
                      <div className={`text-xs ${contrastHigh ? 'text-contrast-text' : 'text-blue-600'}`}>
                        Marcher avec Jésus
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                    contrastHigh ? 'bg-contrast-text/10' : 'bg-white/60'
                  }`}>
                    <span className="text-2xl">🏃</span>
                    <div>
                      <div className={`font-medium ${contrastHigh ? 'text-contrast-text' : 'text-blue-800'}`}>
                        Coureur - Guérison
                      </div>
                      <div className={`text-xs ${contrastHigh ? 'text-contrast-text' : 'text-blue-600'}`}>
                        Paralytique qui remarche
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emojis des Objets à Collecter */}
              <div>
                <h4 className={`font-medium mb-4 ${
                  contrastHigh ? 'text-contrast-text' : 'text-blue-700'
                }`}>
                  🎯 Objets à Collecter
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {availableItems.map((item) => (
                    <div key={item.id} className={`flex items-center space-x-2 p-2 rounded-lg ${
                      contrastHigh ? 'bg-contrast-text/10' : 'bg-white/60'
                    }`}>
                      <span className="text-lg">{item.emoji}</span>
                      <div className={`text-xs font-medium ${
                        contrastHigh ? 'text-contrast-text' : 'text-blue-800'
                      }`}>
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`mt-4 p-3 rounded-lg ${
                  contrastHigh ? 'bg-contrast-text/20' : 'bg-blue-100'
                }`}>
                  <p className={`text-sm ${
                    contrastHigh ? 'text-contrast-text' : 'text-blue-700'
                  }`}>
                    💡 <strong>Astuce :</strong> Chaque miracle nécessite des objets spécifiques ! 
                    Regarde bien les éléments requis avant de commencer à collecter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Zone de jeu */
          <div className="space-y-6">
            {/* Info du miracle actuel */}
            {gameState.currentMiracle && (
              <div className={`rounded-2xl p-6 ${
                contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl">{gameState.currentMiracle.emoji}</span>
                    <div>
                      <h3 className={`text-xl font-bold ${
                        contrastHigh ? 'text-contrast-text' : 'text-gray-800'
                      }`}>
                        {gameState.currentMiracle.name}
                      </h3>
                      <p className={`text-sm ${
                        contrastHigh ? 'text-contrast-text' : 'text-gray-600'
                      }`}>
                        {gameState.currentMiracle.biblicalReference}
                      </p>
                    </div>
                  </div>
                  
                  {/* Éléments requis */}
                  <div className="flex space-x-2">
                    {gameState.currentMiracle.requiredItems.map((itemId) => {
                      const item = availableItems.find(i => i.id === itemId);
                      const collected = gameState.collectedItems.includes(itemId);
                      return (
                        <div
                          key={itemId}
                          className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg transition-all ${
                            collected
                              ? 'bg-green-500 text-white scale-110'
                              : contrastHigh
                                ? 'bg-contrast-text/20'
                                : 'bg-gray-100'
                          }`}
                        >
                          {item?.emoji}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Zone de jeu */}
            <div className={`rounded-2xl p-4 relative ${
              contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'
            }`}>
              <div
                ref={gameAreaRef}
                className={`relative w-full rounded-xl overflow-hidden ${
                  contrastHigh ? 'bg-contrast-text/10' : 'bg-gradient-to-br from-green-100 to-blue-100'
                }`}
                style={{ height: '400px' }}
              >
                {/* Joueur */}
                <div
                  className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all duration-100 ${
                    gameState.player.isMoving ? 'animate-pulse' : ''
                  } ${
                    contrastHigh ? 'bg-contrast-text text-contrast-bg' : 'bg-blue-500 text-white'
                  }`}
                  style={{
                    left: gameState.player.x,
                    top: gameState.player.y,
                    transform: `rotate(${
                      gameState.player.facing === 'up' ? '-90deg' :
                      gameState.player.facing === 'down' ? '90deg' :
                      gameState.player.facing === 'left' ? '180deg' : '0deg'
                    })`,
                    zIndex: 100
                  }}
                >
                  🏃‍♂️
                </div>

                {/* Items */}
                {gameState.items.map((item) => (
                  !item.collected && (
                    <div
                      key={`${item.id}-${item.x}-${item.y}`}
                      className="absolute w-8 h-8 flex items-center justify-center text-lg animate-bounce cursor-pointer hover:scale-110 transition-transform"
                      style={{
                        left: item.x,
                        top: item.y,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    >
                      {item.emoji}
                    </div>
                  )
                ))}

                {/* Effet de miracle */}
                {gameState.miraclePerformed && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                    <div className="text-center animate-pulse">
                      <div className="text-6xl mb-4">✨🎉✨</div>
                      <div className={`text-2xl font-bold ${
                        contrastHigh ? 'text-contrast-text' : 'text-white'
                      }`}>
                        Miracle Accompli !
                      </div>
                    </div>
                  </div>
                )}

                {/* Game Over */}
                {gameState.gameCompleted && !gameState.miraclePerformed && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                    <div className="text-center">
                      <div className="text-6xl mb-4">⏰</div>
                      <div className={`text-2xl font-bold ${
                        contrastHigh ? 'text-contrast-text' : 'text-white'
                      }`}>
                        Temps Écoulé !
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Boutons de contrôle */}
            {gameState.gameCompleted && (
              <div className="flex justify-center space-x-4">
                <button
                  onClick={playAgain}
                  className={`px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 ${
                    contrastHigh 
                      ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  🔄 Rejouer
                </button>
                <button
                  onClick={backToMenu}
                  className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                    contrastHigh 
                      ? 'bg-contrast-text/20 hover:bg-contrast-text/30'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  🏠 Menu
                </button>
              </div>
            )}

            {/* Histoire du miracle */}
            {gameState.miraclePerformed && gameState.currentMiracle && (
              <div className={`rounded-2xl p-6 ${
                contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-br from-green-50 to-blue-50 border border-green-200'
              }`}>
                <h3 className={`text-lg font-bold mb-4 ${
                  contrastHigh ? 'text-contrast-text' : 'text-green-800'
                }`}>
                  📖 L'Histoire du Miracle
                </h3>
                <p className={`mb-4 ${
                  contrastHigh ? 'text-contrast-text' : 'text-green-700'
                }`}>
                  {gameState.currentMiracle.story}
                </p>
                <div className={`text-sm font-medium ${
                  contrastHigh ? 'text-contrast-text' : 'text-green-600'
                }`}>
                  📚 {gameState.currentMiracle.biblicalReference}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default MiracleRaceGame;