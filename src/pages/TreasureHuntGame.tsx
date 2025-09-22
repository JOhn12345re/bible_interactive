import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';
import { useProgress } from '../state/progressStore';
import { useProfileStore } from '../state/profileStore';

interface Treasure {
  id: number;
  name: string;
  emoji: string;
  clue: string;
  answer: string;
  explanation: string;
  reference: string;
  found: boolean;
}

interface Location {
  id: number;
  name: string;
  emoji: string;
  description: string;
  treasures: number[];
}

const TreasureHuntGame = () => {
  const { contrastHigh } = useSettings();
  const { markDone } = useProgress();
  const { updateGameStats, addFavoriteVerse } = useProfileStore();
  
  const [currentLocation, setCurrentLocation] = useState(0);
  const [treasures, setTreasures] = useState<Treasure[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [selectedTreasure, setSelectedTreasure] = useState<Treasure | null>(null);
  const [answer, setAnswer] = useState('');
  const [showClue, setShowClue] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const treasureData: Treasure[] = [
    {
      id: 1,
      name: "L'Arche de l'Alliance",
      emoji: "📦",
      clue: "Je contiens les tables de la loi données par Dieu à Moïse sur la montagne sainte.",
      answer: "arche alliance",
      explanation: "L'Arche de l'Alliance contenait les tables de pierre avec les Dix Commandements.",
      reference: "Exode 25:16 (Louis Segond 1910)",
      found: false
    },
    {
      id: 2,
      name: "La Couronne de David",
      emoji: "👑",
      clue: "Je suis le symbole du roi berger qui a vaincu le géant avec une simple pierre.",
      answer: "couronne david",
      explanation: "David était le roi d'Israël, choisi par Dieu, qui a vaincu Goliath.",
      reference: "1 Samuel 16:13 (Louis Segond 1910)",
      found: false
    },
    {
      id: 3,
      name: "La Tunique de Joseph",
      emoji: "👘",
      clue: "Je suis colorée et j'ai causé la jalousie entre frères, menant l'un d'eux en Égypte.",
      answer: "tunique joseph",
      explanation: "La tunique de plusieurs couleurs que Jacob donna à Joseph provoqua la jalousie de ses frères.",
      reference: "Genèse 37:3 (Louis Segond 1910)",
      found: false
    },
    {
      id: 4,
      name: "Les Sandales de Moïse",
      emoji: "👡",
      clue: "Dieu a dit de me retirer devant le buisson ardent, car la terre était sainte.",
      answer: "sandales moise",
      explanation: "Dieu demanda à Moïse d'ôter ses sandales devant le buisson ardent.",
      reference: "Exode 3:5 (Louis Segond 1910)",
      found: false
    },
    {
      id: 5,
      name: "La Harpe de David",
      emoji: "🎵",
      clue: "Mes mélodies apaisaient le roi Saül et j'ai inspiré de nombreux psaumes.",
      answer: "harpe david",
      explanation: "David jouait de la harpe pour apaiser le roi Saül et a écrit de nombreux psaumes.",
      reference: "1 Samuel 16:23 (Louis Segond 1910)",
      found: false
    },
    {
      id: 6,
      name: "L'Huile Sainte",
      emoji: "🛢️",
      clue: "J'ai servi à oindre les rois et les prêtres, marquant leur consécration à Dieu.",
      answer: "huile sainte",
      explanation: "L'huile d'onction était utilisée pour consacrer les rois et les prêtres.",
      reference: "1 Samuel 10:1 (Louis Segond 1910)",
      found: false
    }
  ];

  const locationData: Location[] = [
    {
      id: 1,
      name: "Le Temple de Jérusalem",
      emoji: "🏛️",
      description: "Le lieu le plus saint d'Israël, construit par le roi Salomon.",
      treasures: [1, 6]
    },
    {
      id: 2,
      name: "Le Palais Royal",
      emoji: "🏰",
      description: "Résidence des rois d'Israël, témoin de gloire et de conflits.",
      treasures: [2, 5]
    },
    {
      id: 3,
      name: "La Tente de Rencontre",
      emoji: "⛺",
      description: "Le lieu où Dieu rencontrait son peuple dans le désert.",
      treasures: [3, 4]
    }
  ];

  const initializeGame = () => {
    setTreasures(treasureData.map(t => ({ ...t, found: false })));
    setLocations(locationData);
    setCurrentLocation(0);
    setGameStarted(true);
    setGameWon(false);
    setSelectedTreasure(null);
    setAnswer('');
    setShowClue(false);
    setAttempts(0);
  };

  const normalizeAnswer = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ');
  };

  const checkAnswerMatch = (userAnswer: string, correctAnswer: string): boolean => {
    const normalizedUser = normalizeAnswer(userAnswer);
    const normalizedCorrect = normalizeAnswer(correctAnswer);
    
    // La réponse utilisateur doit faire au moins 3 caractères
    if (normalizedUser.length < 3) return false;
    
    // Vérifier si la réponse contient tous les mots-clés importants
    const correctWords = normalizedCorrect.split(' ');
    const userWords = normalizedUser.split(' ');
    
    // Au moins 70% des mots corrects doivent être présents dans la réponse utilisateur
    let matchingWords = 0;
    for (const correctWord of correctWords) {
      if (correctWord.length >= 3) { // Ignorer les mots trop courts
        for (const userWord of userWords) {
          if (userWord.includes(correctWord) || correctWord.includes(userWord)) {
            if (Math.abs(userWord.length - correctWord.length) <= 2) {
              matchingWords++;
              break;
            }
          }
        }
      }
    }
    
    const significantWords = correctWords.filter(word => word.length >= 3);
    const matchPercentage = matchingWords / Math.max(significantWords.length, 1);
    
    return matchPercentage >= 0.7;
  };

  const handleAnswerSubmit = () => {
    if (!selectedTreasure || !answer.trim()) return;
    
    setAttempts(attempts + 1);
    
    if (checkAnswerMatch(answer, selectedTreasure.answer)) {
      // Bonne réponse
      setTreasures(prev => prev.map(t => 
        t.id === selectedTreasure.id ? { ...t, found: true } : t
      ));
      
      // Vérifier si tous les trésors sont trouvés
      const updatedTreasures = treasures.map(t => 
        t.id === selectedTreasure.id ? { ...t, found: true } : t
      );
      
      if (updatedTreasures.every(t => t.found)) {
        setGameWon(true);
        // Marquer comme terminé avec un badge selon le nombre de tentatives
        let badge = '';
        let score = 100;
        if (attempts + 1 <= 8) {
          badge = '🏆 Explorateur Expert';
          score = 100;
        } else if (attempts + 1 <= 12) {
          badge = '⭐ Bon Chasseur';
          score = 80;
        } else {
          badge = '👍 Chasseur Persévérant';
          score = 60;
        }
        
        markDone(`chasse-tresor-${Date.now()}`, badge);
        
        // Mettre à jour les stats du profil
        updateGameStats('Chasse au Trésor', score);
        
        // Ajouter des versets favoris
        addFavoriteVerse("Cherchez, et vous trouverez - Matthieu 7:7");
        if (score >= 80) {
          addFavoriteVerse("Il y a plus de bonheur à donner qu'à recevoir - Actes 20:35");
        }
      }
      
      setSelectedTreasure(null);
      setAnswer('');
      setShowClue(false);
    } else {
      // Mauvaise réponse - montrer l'indice si pas encore affiché
      if (!showClue) {
        setShowClue(true);
      }
    }
  };

  const handleTreasureClick = (treasure: Treasure) => {
    if (treasure.found) return;
    setSelectedTreasure(treasure);
    setAnswer('');
    setShowClue(false);
  };

  const resetGame = () => {
    setGameStarted(false);
    setTreasures([]);
    setLocations([]);
    setCurrentLocation(0);
    setGameWon(false);
    setSelectedTreasure(null);
    setAnswer('');
    setShowClue(false);
    setAttempts(0);
  };

  if (gameWon) {
    return (
      <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-yellow-50 via-white to-orange-50'}`}>
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
                : 'bg-white shadow-xl border border-yellow-200'
            }`}>
              <div className="text-6xl mb-6">🏆</div>
              <h2 className={`text-3xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                Chasse au Trésor Terminée !
              </h2>
              <p className={`text-xl mb-6 ${contrastHigh ? 'text-contrast-text' : 'text-yellow-600'}`}>
                Tu as trouvé tous les trésors bibliques en {attempts} tentatives !
              </p>
              <p className={`text-lg mb-8 ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                Tu connais maintenant l'histoire de ces objets sacrés ! 📚
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-yellow-500 text-white rounded-full font-medium hover:bg-yellow-600 transition-colors"
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
      <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-yellow-50 via-white to-orange-50'}`}>
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
                : 'bg-white shadow-xl border border-yellow-200'
            }`}>
              <div className="text-6xl mb-6">🗺️</div>
              <h1 className={`text-3xl font-bold mb-6 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                Chasse au Trésor Biblique
              </h1>
              <p className={`text-xl mb-8 ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                Explore les lieux saints et découvre les trésors de l'histoire biblique !
              </p>
              
              <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ${
                contrastHigh ? 'text-contrast-text' : 'text-yellow-700'
              }`}>
                <div className="flex flex-col items-center">
                  <div className="text-3xl mb-2">🏛️</div>
                  <div className="font-semibold">3 Lieux Saints</div>
                  <div className="text-sm opacity-80">À explorer</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl mb-2">💎</div>
                  <div className="font-semibold">6 Trésors</div>
                  <div className="text-sm opacity-80">À découvrir</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl mb-2">🧩</div>
                  <div className="font-semibold">Énigmes</div>
                  <div className="text-sm opacity-80">Indices bibliques</div>
                </div>
              </div>
              
              <button
                onClick={initializeGame}
                className="px-8 py-4 bg-yellow-500 text-white text-xl font-bold rounded-full hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🚀 Commencer l'exploration
              </button>
              
              <div className={`mt-8 p-4 rounded-xl ${
                contrastHigh 
                  ? 'bg-contrast-text/10'
                  : 'bg-yellow-50'
              }`}>
                <h3 className={`font-bold mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-yellow-800'}`}>
                  💡 Comment jouer ?
                </h3>
                <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-yellow-700'}`}>
                  Visite chaque lieu, clique sur les trésors cachés et résous les énigmes bibliques pour les découvrir.
                  Chaque trésor raconte une histoire de la Bible (Louis Segond 1910) !
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentLoc = locations[currentLocation];

  return (
    <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-yellow-50 via-white to-orange-50'}`}>
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
            <div className={`text-center ${contrastHigh ? 'text-contrast-text' : 'text-yellow-600'}`}>
              <div className="text-sm">Tentatives</div>
              <div className="text-2xl font-bold">{attempts}</div>
            </div>
            <div className={`text-center ${contrastHigh ? 'text-contrast-text' : 'text-green-600'}`}>
              <div className="text-sm">Trouvés</div>
              <div className="text-2xl font-bold">{treasures.filter(t => t.found).length}/6</div>
            </div>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors"
            >
              🔄 Nouvelle chasse
            </button>
          </div>
        </div>

        {/* Navigation entre lieux */}
        <div className="mb-8">
          <div className="flex justify-center space-x-4">
            {locations.map((location, index) => (
              <button
                key={location.id}
                onClick={() => setCurrentLocation(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  index === currentLocation
                    ? contrastHigh
                      ? 'bg-contrast-text text-contrast-bg'
                      : 'bg-yellow-500 text-white'
                    : contrastHigh
                      ? 'bg-contrast-text/20 text-contrast-text hover:bg-contrast-text/30'
                      : 'bg-white text-yellow-600 border border-yellow-300 hover:bg-yellow-50'
                }`}
              >
                <span className="mr-2">{location.emoji}</span>
                {location.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Zone d'exploration */}
          <div className="lg:col-span-2">
            <div className={`p-6 rounded-2xl ${
              contrastHigh 
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-gradient-to-br from-amber-100 to-orange-200 border-2 border-amber-300'
            }`}>
              <div className="text-center mb-6">
                <div className="text-6xl mb-2">{currentLoc.emoji}</div>
                <h2 className={`text-2xl font-bold mb-2 ${
                  contrastHigh ? 'text-contrast-text' : 'text-amber-800'
                }`}>
                  {currentLoc.name}
                </h2>
                <p className={`${contrastHigh ? 'text-contrast-text' : 'text-amber-700'}`}>
                  {currentLoc.description}
                </p>
              </div>
              
              {/* Trésors dans ce lieu */}
              <div className="grid grid-cols-2 gap-4">
                {currentLoc.treasures.map(treasureId => {
                  const treasure = treasures.find(t => t.id === treasureId);
                  if (!treasure) return null;
                  
                  return (
                    <div
                      key={treasure.id}
                      onClick={() => handleTreasureClick(treasure)}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                        treasure.found
                          ? contrastHigh
                            ? 'bg-contrast-text/30 border-contrast-text opacity-50'
                            : 'bg-green-200 border-green-400 opacity-50'
                          : selectedTreasure?.id === treasure.id
                            ? contrastHigh
                              ? 'bg-contrast-text/20 border-contrast-text transform scale-105'
                              : 'bg-yellow-200 border-yellow-500 transform scale-105'
                            : contrastHigh
                              ? 'bg-contrast-text/10 border-contrast-text/30 hover:bg-contrast-text/20'
                              : 'bg-white border-amber-300 hover:border-amber-500 hover:bg-amber-50'
                      } ${treasure.found ? 'cursor-default' : 'hover:scale-105'}`}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">{treasure.emoji}</div>
                        <div className={`font-medium text-sm ${
                          contrastHigh ? 'text-contrast-text' : 'text-amber-800'
                        }`}>
                          {treasure.found ? '✓ ' + treasure.name : '? ? ?'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Panel d'énigme */}
          <div>
            <div className={`p-6 rounded-2xl ${
              contrastHigh 
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-white border-2 border-yellow-200'
            }`}>
              {selectedTreasure ? (
                <>
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-2">{selectedTreasure.emoji}</div>
                    <h3 className={`text-xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-yellow-800'}`}>
                      Énigme du Trésor
                    </h3>
                  </div>
                  
                  <div className={`p-4 rounded-xl mb-4 ${
                    contrastHigh 
                      ? 'bg-contrast-text/10'
                      : 'bg-yellow-50'
                  }`}>
                    <p className={`text-sm font-medium ${contrastHigh ? 'text-contrast-text' : 'text-yellow-800'}`}>
                      {selectedTreasure.clue}
                    </p>
                  </div>
                  
                  {showClue && (
                    <div className={`p-4 rounded-xl mb-4 ${
                      contrastHigh 
                        ? 'bg-contrast-text/20'
                        : 'bg-blue-50'
                    }`}>
                      <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-blue-800'}`}>
                        💡 <strong>Indice:</strong> {selectedTreasure.explanation}
                      </p>
                      <p className={`text-xs mt-2 ${contrastHigh ? 'text-contrast-text/80' : 'text-blue-600'}`}>
                        📖 {selectedTreasure.reference}
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAnswerSubmit()}
                      placeholder="Tape ta réponse..."
                      className={`w-full p-3 rounded-lg border-2 ${
                        contrastHigh
                          ? 'bg-contrast-bg border-contrast-text text-contrast-text placeholder-contrast-text/50'
                          : 'border-yellow-300 focus:border-yellow-500'
                      } focus:outline-none`}
                    />
                    
                    <button
                      onClick={handleAnswerSubmit}
                      disabled={!answer.trim()}
                      className={`w-full py-3 rounded-lg font-medium transition-colors ${
                        answer.trim()
                          ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      🔍 Vérifier la réponse
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🗺️</div>
                  <h3 className={`text-xl font-bold mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-yellow-800'}`}>
                    Explore le lieu
                  </h3>
                  <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                    Clique sur un trésor caché pour commencer l'énigme !
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreasureHuntGame;