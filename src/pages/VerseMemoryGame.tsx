import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';
import { useProgress } from '../state/progressStore';

interface Verse {
  id: string;
  text: string;
  reference: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  theme: string;
}

interface GameState {
  currentVerse: Verse | null;
  gameMode: 'fill-blanks' | 'word-order' | 'quiz' | null;
  score: number;
  streak: number;
  showHint: boolean;
  gameComplete: boolean;
  userAnswer: string;
  correctAnswer: string;
  blankedWords: string[];
  scrambledWords: string[];
}

const VerseMemoryGame = () => {
  const { contrastHigh } = useSettings();
  const { markDone } = useProgress();
  
  // Base de données de versets adaptés aux enfants
  const verses: Verse[] = [
    {
      id: '1',
      text: 'Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu\'il ait la vie éternelle.',
      reference: 'Jean 3:16 (Louis Segond 1910)',
      difficulty: 'facile',
      theme: 'Amour de Dieu'
    },
    {
      id: '2',
      text: 'Jésus lui dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.',
      reference: 'Jean 14:6 (Louis Segond 1910)',
      difficulty: 'facile',
      theme: 'Jésus'
    },
    {
      id: '3',
      text: 'L\'Éternel est mon berger: je ne manquerai de rien.',
      reference: 'Psaume 23:1 (Louis Segond 1910)',
      difficulty: 'facile',
      theme: 'Confiance'
    },
    {
      id: '4',
      text: 'Tout ce que vous demanderez avec foi par la prière, vous le recevrez.',
      reference: 'Matthieu 21:22 (Louis Segond 1910)',
      difficulty: 'moyen',
      theme: 'Prière'
    },
    {
      id: '5',
      text: 'Ne vous inquiétez de rien; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces.',
      reference: 'Philippiens 4:6 (Louis Segond 1910)',
      difficulty: 'moyen',
      theme: 'Paix'
    },
    {
      id: '6',
      text: 'Approchez-vous de Dieu, et il s\'approchera de vous. Nettoyez vos mains, pécheurs; purifiez vos coeurs, hommes irrésolus.',
      reference: 'Jacques 4:8 (Louis Segond 1910)',
      difficulty: 'moyen',
      theme: 'Relation avec Dieu'
    },
    {
      id: '7',
      text: 'Car mes pensées ne sont pas vos pensées, Et vos voies ne sont pas mes voies, Dit l\'Éternel.',
      reference: 'Ésaïe 55:8 (Louis Segond 1910)',
      difficulty: 'difficile',
      theme: 'Sagesse divine'
    },
    {
      id: '8',
      text: 'Celui qui demeure sous l\'abri du Très-Haut Repose à l\'ombre du Tout-Puissant.',
      reference: 'Psaume 91:1 (Louis Segond 1910)',
      difficulty: 'difficile',
      theme: 'Protection'
    }
  ];

  const [gameState, setGameState] = useState<GameState>({
    currentVerse: null,
    gameMode: null,
    score: 0,
    streak: 0,
    showHint: false,
    gameComplete: false,
    userAnswer: '',
    correctAnswer: '',
    blankedWords: [],
    scrambledWords: []
  });

  const [selectedDifficulty, setSelectedDifficulty] = useState<'facile' | 'moyen' | 'difficile'>('facile');

  // Choisir un verset aléatoire selon la difficulté
  const selectRandomVerse = (difficulty: 'facile' | 'moyen' | 'difficile') => {
    const filteredVerses = verses.filter(v => v.difficulty === difficulty);
    return filteredVerses[Math.floor(Math.random() * filteredVerses.length)];
  };

  // Créer des mots à trous
  const createFillBlanks = (text: string) => {
    const words = text.split(' ');
    const numBlanks = Math.max(1, Math.floor(words.length / 4)); // 25% des mots
    const blankedIndices = new Set<number>();
    
    while (blankedIndices.size < numBlanks) {
      blankedIndices.add(Math.floor(Math.random() * words.length));
    }
    
    const blankedWords: string[] = [];
    const textWithBlanks = words.map((word, index) => {
      if (blankedIndices.has(index)) {
        blankedWords.push(word.replace(/[.,!?]/g, ''));
        return '____';
      }
      return word;
    }).join(' ');
    
    return { textWithBlanks, blankedWords };
  };

  // Mélanger les mots
  const scrambleWords = (text: string) => {
    const words = text.split(' ').map(word => word.replace(/[.,!?]/g, ''));
    return [...words].sort(() => Math.random() - 0.5);
  };

  // Démarrer un nouveau jeu
  const startGame = (mode: 'fill-blanks' | 'word-order' | 'quiz') => {
    const verse = selectRandomVerse(selectedDifficulty);
    let blankedWords: string[] = [];
    let scrambledWords: string[] = [];
    let correctAnswer = verse.text; // Par défaut, la réponse correcte est le texte original

    if (mode === 'fill-blanks') {
      const result = createFillBlanks(verse.text);
      blankedWords = result.blankedWords;
    } else if (mode === 'word-order') {
      scrambledWords = scrambleWords(verse.text);
      // Pour le mode word-order, la réponse correcte devrait être sans ponctuation
      // puisque les mots mélangés n'ont pas de ponctuation
      correctAnswer = verse.text.split(' ').map(word => word.replace(/[.,!?]/g, '')).join(' ');
    }

    setGameState({
      currentVerse: verse,
      gameMode: mode,
      score: gameState.score,
      streak: gameState.streak,
      showHint: false,
      gameComplete: false,
      userAnswer: '',
      correctAnswer: correctAnswer,
      blankedWords,
      scrambledWords
    });
  };

  // Vérifier la réponse
  const checkAnswer = () => {
    // Fonction pour normaliser le texte de manière très tolérante
    const normalizeText = (text: string) => {
      return text
        .toLowerCase()
        // Normaliser tous les types d'apostrophes et guillemets
        .replace(/[''`´]/g, "'")
        .replace(/[«»""]/g, '"')
        // Normaliser les mots composés avec traits d'union
        .replace(/tout-puissant/gi, 'tout puissant')
        .replace(/très-haut/gi, 'très haut')
        .replace(/saint-esprit/gi, 'saint esprit')
        .replace(/jésus-christ/gi, 'jesus christ')
        // Normaliser TOUS les caractères accentués vers leurs équivalents non accentués
        .replace(/[àáâãäåāăą]/gi, 'a')
        .replace(/[èéêëēĕėęě]/gi, 'e')
        .replace(/[ìíîïīĭįı]/gi, 'i')
        .replace(/[òóôõöōŏő]/gi, 'o')
        .replace(/[ùúûüūŭů]/gi, 'u')
        .replace(/[ýÿŷ]/gi, 'y')
        .replace(/[ç]/gi, 'c')
        .replace(/[ñ]/gi, 'n')
        .replace(/[ß]/gi, 'ss')
        // Enlever TOUTE la ponctuation
        .replace(/[.,;:!?¿¡"'`´""''«»()[\]{}\-–—_/\\|@#$%^&*+=~<>]/g, '')
        // Normaliser tous les espaces (y compris espaces insécables, tabs, etc.)
        .replace(/\s+/g, ' ')
        .replace(/\u00A0/g, ' ') // Espaces insécables
        .replace(/\u2000-\u200F/g, ' ') // Divers espaces Unicode
        .replace(/\u2028-\u2029/g, ' ') // Séparateurs de ligne/paragraphe
        .trim();
    };

    let isCorrect = false;

    if (gameState.gameMode === 'fill-blanks') {
      // Pour le mode "texte à trous", vérifier les mots manquants
      const userWords = normalizeText(gameState.userAnswer).split(' ').filter(word => word.length > 0);
      const expectedWords = gameState.blankedWords.map(word => normalizeText(word));
      
      if (userWords.length === expectedWords.length) {
        let correctCount = 0;
        for (let i = 0; i < userWords.length; i++) {
          const userWord = userWords[i];
          const expectedWord = expectedWords[i];
          
          // Accepter si exactement identique après normalisation
          if (userWord === expectedWord) {
            correctCount++;
          }
          // Ou si très similaire (très tolérant aux fautes de frappe)
          else if (calculateWordSimilarity(userWord, expectedWord) >= 0.7) {
            correctCount++;
          }
        }
        // Accepter si au moins 70% des mots sont corrects (plus tolérant)
        isCorrect = (correctCount / expectedWords.length) >= 0.7;
      }
    } else {
      // Pour les autres modes (quiz et word-order), comparer le texte complet
      const userNormalized = normalizeText(gameState.userAnswer);
      const correctNormalized = normalizeText(gameState.correctAnswer);
      
      // Vérification exacte après normalisation ultra-tolérante
      if (userNormalized === correctNormalized) {
        isCorrect = true;
      }
      // Si pas exactement correct, vérifier la similarité (ultra-tolérant)
      else {
        const similarity = calculateSimilarity(userNormalized, correctNormalized);
        
        // TOUJOURS accepter si au moins 30% de similarité (extrêmement tolérant)
        // Cela permet d'accepter même des réponses avec beaucoup d'erreurs
        if (similarity >= 0.3) {
          isCorrect = true;
        } else {
          // Vérification mot par mot pour être encore plus tolérant
          const userWords = userNormalized.split(' ').filter(w => w.length > 0);
          const correctWords = correctNormalized.split(' ').filter(w => w.length > 0);
          
          let wordMatches = 0;
          const minLength = Math.min(userWords.length, correctWords.length);
          
          for (let i = 0; i < minLength; i++) {
            const wordSim = calculateWordSimilarity(userWords[i], correctWords[i]);
            if (wordSim >= 0.3) { // Très tolérant même pour les mots individuels
              wordMatches++;
            }
          }
          
          // Accepter si au moins 40% des mots correspondent
          if (minLength > 0 && (wordMatches / minLength) >= 0.4) {
            isCorrect = true;
          }
        }
      }
    }
    
    if (isCorrect) {
      const newScore = gameState.score + (selectedDifficulty === 'facile' ? 10 : selectedDifficulty === 'moyen' ? 20 : 30);
      const newStreak = gameState.streak + 1;
      
      setGameState(prev => ({
        ...prev,
        score: newScore,
        streak: newStreak,
        gameComplete: true
      }));

      // Ajouter des points de progression
      if (gameState.currentVerse) {
        markDone(`verse-${gameState.currentVerse.id}`, `Verset ${gameState.currentVerse.reference} mémorisé`);
      }
      
      // Badge spécial pour les streaks
      if (newStreak >= 5) {
        markDone('verse-master', '🏆 Maître des Versets');
      }
    } else {
      setGameState(prev => ({
        ...prev,
        streak: 0,
        gameComplete: true
      }));
    }
  };

  // Fonction pour calculer la similarité entre deux textes (très tolérante)
  const calculateSimilarity = (str1: string, str2: string): number => {
    const words1 = str1.split(' ').filter(word => word.length > 0);
    const words2 = str2.split(' ').filter(word => word.length > 0);
    
    if (words1.length === 0 && words2.length === 0) return 1;
    if (words1.length === 0 || words2.length === 0) return 0;
    
    let matches = 0;
    const maxLength = Math.max(words1.length, words2.length);
    
    // Comparer chaque mot avec beaucoup de tolérance
    for (let i = 0; i < maxLength; i++) {
      const word1 = words1[i] || '';
      const word2 = words2[i] || '';
      
      // Exact match après normalisation
      if (word1 === word2) {
        matches++;
      }
      // Tolérance très élevée aux petites différences
      else if (word1.length > 0 && word2.length > 0) {
        const wordSimilarity = calculateWordSimilarity(word1, word2);
        if (wordSimilarity >= 0.6) { // Très tolérant - accepter même 60% de similarité
          matches += wordSimilarity;
        }
      }
    }
    
    return matches / maxLength;
  };

  // Fonction pour calculer la similarité entre deux mots (très tolérante)
  const calculateWordSimilarity = (word1: string, word2: string): number => {
    // Normaliser les mots avec la même fonction très tolérante
    const normalizeWord = (word: string) => {
      return word
        .toLowerCase()
        // Normaliser tous les caractères accentués
        .replace(/[àáâãäåāăą]/gi, 'a')
        .replace(/[èéêëēĕėęě]/gi, 'e')
        .replace(/[ìíîïīĭįı]/gi, 'i')
        .replace(/[òóôõöōŏő]/gi, 'o')
        .replace(/[ùúûüūŭů]/gi, 'u')
        .replace(/[ýÿŷ]/gi, 'y')
        .replace(/[ç]/gi, 'c')
        .replace(/[ñ]/gi, 'n')
        // Enlever toute ponctuation
        .replace(/[.,;:!?¿¡"'`´""''«»()[\]{}\-–—_/\\|@#$%^&*+=~<>]/g, '')
        .trim();
    };
    
    const norm1 = normalizeWord(word1);
    const norm2 = normalizeWord(word2);
    
    if (norm1.length === 0) return norm2.length === 0 ? 1 : 0;
    if (norm2.length === 0) return 0;
    
    // Si les mots normalisés sont exactement identiques, retourner 1
    if (norm1 === norm2) return 1;
    
    // Être très tolérant - accepter si au moins 80% des caractères correspondent
    let matches = 0;
    const maxLength = Math.max(norm1.length, norm2.length);
    const minLength = Math.min(norm1.length, norm2.length);
    
    for (let i = 0; i < minLength; i++) {
      if (norm1[i] === norm2[i]) {
        matches++;
      }
    }
    
    const similarity = matches / maxLength;
    
    // Être très tolérant pour les mots courts (3 caractères ou moins)
    if (minLength <= 3 && similarity >= 0.6) return 0.9;
    
    // Pour les mots plus longs, être un peu plus strict mais toujours tolérant
    return similarity >= 0.8 ? 0.9 : similarity;
  };

  // Afficher un indice
  const showHint = () => {
    setGameState(prev => ({ ...prev, showHint: true }));
  };

  // Jouer à nouveau
  const playAgain = () => {
    startGame(gameState.gameMode!);
  };

  // Revenir au menu
  const backToMenu = () => {
    setGameState(prev => ({
      ...prev,
      currentVerse: null,
      gameMode: null,
      gameComplete: false,
      userAnswer: '',
      showHint: false
    }));
  };

  return (
    <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-purple-50 via-white to-pink-50'}`}>
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
                  🧠 Mémorisation des Versets
                </h1>
                <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                  Apprends les plus beaux versets de la Bible
                </p>
                <p className={`text-xs mt-1 ${contrastHigh ? 'text-contrast-text/70' : 'text-gray-500'}`}>
                  📖 Version Louis Segond 1910
                </p>
              </div>
            </div>
            
            {/* Score */}
            {gameState.score > 0 && (
              <div className={`flex items-center space-x-4 ${
                contrastHigh ? 'text-contrast-text' : 'text-purple-600'
              }`}>
                <div className="text-center">
                  <div className="text-2xl font-bold">{gameState.score}</div>
                  <div className="text-xs">Points</div>
                </div>
                {gameState.streak > 0 && (
                  <div className="text-center">
                    <div className="text-2xl">🔥</div>
                    <div className="text-xs">{gameState.streak} d'affilée</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {!gameState.gameMode ? (
          /* Menu principal */
          <div className="space-y-8">
            {/* Sélection de difficulté */}
            <div className={`rounded-2xl p-8 ${
              contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'
            }`}>
              <h2 className={`text-2xl font-bold mb-6 text-center ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-800'
              }`}>
                Choisis ton niveau
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(['facile', 'moyen', 'difficile'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedDifficulty(level)}
                    className={`p-6 rounded-xl text-center transition-all hover:scale-105 ${
                      selectedDifficulty === level
                        ? contrastHigh
                          ? 'bg-contrast-text text-contrast-bg ring-2 ring-contrast-text'
                          : 'bg-purple-500 text-white ring-2 ring-purple-500'
                        : contrastHigh
                          ? 'bg-contrast-text/10 hover:bg-contrast-text/20'
                          : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <div className="text-3xl mb-2">
                      {level === 'facile' ? '🌱' : level === 'moyen' ? '🌳' : '🏔️'}
                    </div>
                    <div className="font-bold capitalize">{level}</div>
                    <div className={`text-sm mt-1 ${
                      selectedDifficulty === level 
                        ? 'opacity-90' 
                        : contrastHigh ? 'text-contrast-text' : 'text-gray-600'
                    }`}>
                      {level === 'facile' ? 'Versets courts' : 
                       level === 'moyen' ? 'Versets moyens' : 'Versets longs'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Modes de jeu */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Texte à trous */}
              <button
                onClick={() => startGame('fill-blanks')}
                className={`p-8 rounded-2xl text-center transition-all hover:scale-105 hover:shadow-xl ${
                  contrastHigh 
                    ? 'bg-contrast-bg border-2 border-contrast-text hover:bg-contrast-text/10'
                    : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg'
                }`}
              >
                <div className="text-5xl mb-4">📝</div>
                <h3 className="text-xl font-bold mb-2">Texte à Trous</h3>
                <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'opacity-90'}`}>
                  Complète les mots manquants du verset
                </p>
              </button>

              {/* Ordre des mots */}
              <button
                onClick={() => startGame('word-order')}
                className={`p-8 rounded-2xl text-center transition-all hover:scale-105 hover:shadow-xl ${
                  contrastHigh 
                    ? 'bg-contrast-bg border-2 border-contrast-text hover:bg-contrast-text/10'
                    : 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg'
                }`}
              >
                <div className="text-5xl mb-4">🔤</div>
                <h3 className="text-xl font-bold mb-2">Ordre des Mots</h3>
                <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'opacity-90'}`}>
                  Remets les mots dans le bon ordre
                </p>
              </button>

              {/* Quiz */}
              <button
                onClick={() => startGame('quiz')}
                className={`p-8 rounded-2xl text-center transition-all hover:scale-105 hover:shadow-xl ${
                  contrastHigh 
                    ? 'bg-contrast-bg border-2 border-contrast-text hover:bg-contrast-text/10'
                    : 'bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg'
                }`}
              >
                <div className="text-5xl mb-4">🧠</div>
                <h3 className="text-xl font-bold mb-2">Quiz Verset</h3>
                <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'opacity-90'}`}>
                  Récite le verset de mémoire
                </p>
              </button>
            </div>

            {/* Note d'aide */}
            <div className={`rounded-xl p-4 ${
              contrastHigh 
                ? 'bg-contrast-text/10 border border-contrast-text/20'
                : 'bg-blue-50 border border-blue-200'
            }`}>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h4 className={`font-medium mb-2 ${
                    contrastHigh ? 'text-contrast-text' : 'text-blue-800'
                  }`}>
                    Conseils pour réussir
                  </h4>
                  <ul className={`text-sm space-y-1 ${
                    contrastHigh ? 'text-contrast-text' : 'text-blue-700'
                  }`}>
                    <li>• Les majuscules et minuscules n'ont pas d'importance</li>
                    <li>• La ponctuation (virgules, points) est ignorée</li>
                    <li>• De petites erreurs de frappe sont tolérées</li>
                    <li>• Concentre-toi sur le sens des mots !</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Jeu en cours */
          <GameInterface 
            gameState={gameState}
            setGameState={setGameState}
            contrastHigh={contrastHigh}
            checkAnswer={checkAnswer}
            showHint={showHint}
            playAgain={playAgain}
            backToMenu={backToMenu}
          />
        )}
      </main>
    </div>
  );
};

// Composant pour l'interface de jeu
interface GameInterfaceProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  contrastHigh: boolean;
  checkAnswer: () => void;
  showHint: () => void;
  playAgain: () => void;
  backToMenu: () => void;
}

const GameInterface: React.FC<GameInterfaceProps> = ({
  gameState,
  setGameState,
  contrastHigh,
  checkAnswer,
  showHint,
  playAgain,
  backToMenu
}) => {
  if (!gameState.currentVerse) return null;

  const handleAnswerChange = (value: string) => {
    setGameState(prev => ({ ...prev, userAnswer: value }));
  };

  const handleWordClick = (word: string, index: number) => {
    if (gameState.gameMode === 'word-order') {
      const currentAnswer = gameState.userAnswer;
      const newAnswer = currentAnswer ? `${currentAnswer} ${word}` : word;
      handleAnswerChange(newAnswer);
      
      // Retirer le mot de la liste
      const newScrambledWords = [...gameState.scrambledWords];
      newScrambledWords.splice(index, 1);
      setGameState(prev => ({ ...prev, scrambledWords: newScrambledWords }));
    }
  };

  const resetWordOrder = () => {
    if (gameState.gameMode === 'word-order') {
      const originalWords = gameState.currentVerse!.text.split(' ').map(word => word.replace(/[.,!?]/g, ''));
      setGameState(prev => ({
        ...prev,
        scrambledWords: [...originalWords].sort(() => Math.random() - 0.5),
        userAnswer: ''
      }));
    }
  };

  return (
    <div className="space-y-8">
      {/* Information du verset */}
      <div className={`rounded-2xl p-6 text-center ${
        contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'
      }`}>
        <div className="text-4xl mb-4">📖</div>
        <h3 className={`text-lg font-semibold ${
          contrastHigh ? 'text-contrast-text' : 'text-gray-800'
        }`}>
          {gameState.currentVerse.reference}
        </h3>
        <p className={`text-sm ${
          contrastHigh ? 'text-contrast-text' : 'text-gray-600'
        }`}>
          Thème: {gameState.currentVerse.theme}
        </p>
      </div>

      {/* Zone de jeu */}
      <div className={`rounded-2xl p-8 ${
        contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'
      }`}>
        {/* Instructions */}
        <div className={`mb-6 p-4 rounded-xl ${
          contrastHigh ? 'bg-contrast-text/10' : 'bg-blue-50'
        }`}>
          <p className={`text-center font-medium ${
            contrastHigh ? 'text-contrast-text' : 'text-blue-800'
          }`}>
            {gameState.gameMode === 'fill-blanks' && 'Écris les mots manquants séparés par des espaces'}
            {gameState.gameMode === 'word-order' && 'Clique sur les mots dans le bon ordre'}
            {gameState.gameMode === 'quiz' && 'Écris le verset complet de mémoire'}
          </p>
        </div>

        {/* Affichage du verset selon le mode */}
        {gameState.gameMode === 'fill-blanks' && (
          <div className={`text-xl text-center mb-6 p-6 rounded-xl ${
            contrastHigh ? 'bg-contrast-text/5' : 'bg-gray-50'
          }`}>
            {gameState.currentVerse.text.split(' ').map((word, index) => {
              const cleanWord = word.replace(/[.,!?]/g, '');
              if (gameState.blankedWords.includes(cleanWord)) {
                return <span key={index} className="text-blue-500 font-bold">____ </span>;
              }
              return <span key={index}>{word} </span>;
            })}
          </div>
        )}

        {gameState.gameMode === 'word-order' && (
          <>
            {/* Zone de construction de la réponse */}
            <div className={`min-h-[100px] p-4 rounded-xl border-2 border-dashed mb-4 ${
              contrastHigh ? 'border-contrast-text/30 bg-contrast-text/5' : 'border-gray-300 bg-gray-50'
            }`}>
              <p className={`text-sm mb-2 ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-600'
              }`}>
                Ta réponse:
              </p>
              <p className="text-lg">{gameState.userAnswer || 'Clique sur les mots ci-dessous...'}</p>
            </div>

            {/* Mots mélangés */}
            <div className="flex flex-wrap gap-2 mb-4">
              {gameState.scrambledWords.map((word, index) => (
                <button
                  key={`${word}-${index}`}
                  onClick={() => handleWordClick(word, index)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 ${
                    contrastHigh 
                      ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {word}
                </button>
              ))}
            </div>

            {/* Bouton reset */}
            <button
              onClick={resetWordOrder}
              className={`px-4 py-2 rounded-lg transition-colors ${
                contrastHigh 
                  ? 'bg-contrast-text/20 hover:bg-contrast-text/30'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              🔄 Recommencer
            </button>
          </>
        )}

        {gameState.gameMode === 'quiz' && (
          <div className={`text-center mb-6 p-6 rounded-xl ${
            contrastHigh ? 'bg-contrast-text/5' : 'bg-yellow-50'
          }`}>
            <div className="text-6xl mb-4">🤔</div>
            <p className={`text-lg ${
              contrastHigh ? 'text-contrast-text' : 'text-yellow-800'
            }`}>
              Récite le verset {gameState.currentVerse.reference} de mémoire
            </p>
          </div>
        )}

        {/* Zone de saisie pour fill-blanks et quiz */}
        {(gameState.gameMode === 'fill-blanks' || gameState.gameMode === 'quiz') && (
          <div className="mb-6">
            <textarea
              value={gameState.userAnswer}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder={
                gameState.gameMode === 'fill-blanks' 
                  ? 'Écris les mots manquants...' 
                  : 'Écris le verset complet...'
              }
              rows={gameState.gameMode === 'quiz' ? 4 : 2}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none ${
                contrastHigh
                  ? 'bg-contrast-bg border-contrast-text text-contrast-text focus:border-contrast-text/60'
                  : 'bg-white border-gray-200 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
              }`}
            />
          </div>
        )}

        {/* Boutons d'action */}
        {!gameState.gameComplete ? (
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={checkAnswer}
              disabled={!gameState.userAnswer.trim()}
              className={`px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                contrastHigh 
                  ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                  : 'bg-green-500 text-white hover:bg-green-600 shadow-lg'
              }`}
            >
              ✅ Vérifier
            </button>
            
            <button
              onClick={showHint}
              disabled={gameState.showHint}
              className={`px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 ${
                contrastHigh 
                  ? 'bg-contrast-text/20 hover:bg-contrast-text/30'
                  : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
              }`}
            >
              💡 Indice
            </button>

          </div>
        ) : (
          /* Résultat */
          <div className="text-center space-y-6">
            <div className="text-6xl">
              🎉
            </div>
            
            <div className={`text-xl font-bold ${
              contrastHigh ? 'text-contrast-text' : 'text-green-600'
            }`}>
              Excellent ! Bien joué !
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={playAgain}
                className={`px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 ${
                  contrastHigh 
                    ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                    : 'bg-purple-500 text-white hover:bg-purple-600 shadow-lg'
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
          </div>
        )}

        {/* Indice */}
        {gameState.showHint && !gameState.gameComplete && (
          <div className={`mt-6 p-4 rounded-xl ${
            contrastHigh ? 'bg-contrast-text/10' : 'bg-yellow-50 border-l-4 border-yellow-400'
          }`}>
            <p className={`text-sm font-medium ${
              contrastHigh ? 'text-contrast-text' : 'text-yellow-800'
            }`}>
              💡 Indice: Ce verset parle de "{gameState.currentVerse.theme}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerseMemoryGame;