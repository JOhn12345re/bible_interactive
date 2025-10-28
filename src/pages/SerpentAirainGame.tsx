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

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  reference: string;
}

const SerpentAirainGame = () => {
  const { contrastHigh } = useSettings();
  const { markDone } = useProgress();
  const { updateGameStats } = useProfileStore();

  // États pour le jeu d'ordre
  const [orderingItems, setOrderingItems] = useState<OrderingItem[]>([]);
  const [orderingCompleted, setOrderingCompleted] = useState(false);
  const [orderingScore, setOrderingScore] = useState(0);

  // États pour le QCM
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<boolean[]>([]);

  // État général
  const [gamePhase, setGamePhase] = useState<'ordering' | 'quiz'>('ordering');
  const [totalScore, setTotalScore] = useState(0);

  // Éléments à remettre en ordre chronologique
  const originalOrderingItems: OrderingItem[] = [
    {
      id: 'murmures',
      text: 'Le peuple murmure contre Dieu dans le désert',
      correctOrder: 1,
      emoji: '😤'
    },
    {
      id: 'serpents',
      text: 'Dieu envoie des serpents brûlants',
      correctOrder: 2,
      emoji: '🐍'
    },
    {
      id: 'repentance',
      text: 'Le peuple reconnaît son péché',
      correctOrder: 3,
      emoji: '😢'
    },
    {
      id: 'intercession',
      text: 'Moïse prie pour le peuple',
      correctOrder: 4,
      emoji: '🙏'
    },
    {
      id: 'ordre',
      text: 'Dieu ordonne de faire un serpent d\'airain',
      correctOrder: 5,
      emoji: '📜'
    },
    {
      id: 'fabrication',
      text: 'Moïse fabrique le serpent de bronze',
      correctOrder: 6,
      emoji: '🔨'
    },
    {
      id: 'elevation',
      text: 'Le serpent est élevé sur une perche',
      correctOrder: 7,
      emoji: '🪜'
    },
    {
      id: 'guerison',
      text: 'Ceux qui regardent avec foi sont guéris',
      correctOrder: 8,
      emoji: '✨'
    }
  ];

  // Questions du QCM
  const questions: Question[] = [
    {
      id: 1,
      question: "Pourquoi le peuple d'Israël s'est-il plaint dans le désert ?",
      options: [
        'Ils étaient fatigués et impatients',
        'Ils n\'avaient pas d\'argent',
        'Ils étaient perdus',
        'Ils avaient froid'
      ],
      correctAnswer: 0,
      explanation: 'Le peuple était fatigué du voyage et impatient, dégoûté de la manne.',
      reference: 'Nombres 21:4-5'
    },
    {
      id: 2,
      question: 'Qu\'a envoyé Dieu à cause des murmures du peuple ?',
      options: [
        'Des lions',
        'Des serpents brûlants',
        'Une tempête',
        'La famine'
      ],
      correctAnswer: 1,
      explanation: 'Dieu envoya des serpents brûlants parmi le peuple.',
      reference: 'Nombres 21:6'
    },
    {
      id: 3,
      question: 'Qu\'a fait Moïse pour aider le peuple ?',
      options: [
        'Il a combattu les serpents',
        'Il a fait un serpent d\'airain sur une perche',
        'Il a donné des médicaments',
        'Il a prié seulement'
      ],
      correctAnswer: 1,
      explanation: 'Moïse fabriqua un serpent d\'airain et le plaça sur une perche.',
      reference: 'Nombres 21:9'
    },
    {
      id: 4,
      question: 'Que fallait-il faire pour être guéri de la morsure ?',
      options: [
        'Boire une potion',
        'Courir très vite',
        'Regarder le serpent d\'airain avec foi',
        'Se cacher'
      ],
      correctAnswer: 2,
      explanation: 'Quiconque regardait le serpent d\'airain conservait la vie.',
      reference: 'Nombres 21:9'
    },
    {
      id: 5,
      question: 'Selon Jésus, que représente le serpent d\'airain ?',
      options: [
        'Sa naissance',
        'Ses miracles',
        'Sa crucifixion et notre salut',
        'Ses enseignements'
      ],
      correctAnswer: 2,
      explanation: 'Jésus compare le serpent élevé à sa propre crucifixion pour notre salut.',
      reference: 'Jean 3:14-15'
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
      setTimeout(() => {
        setGamePhase('quiz');
      }, 2000);
    }
  };

  // Fonctions pour le QCM
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    const newAnswers = [...quizAnswers, isCorrect];
    setQuizAnswers(newAnswers);
    
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizFinished(true);
        const finalScore = orderingScore + (newAnswers.filter(Boolean).length * 20);
        setTotalScore(finalScore);
        
        // Marquer comme terminé si score suffisant
        if (finalScore >= 140) {
          markDone('serpent-airain-game');
          updateGameStats('serpent-airain-game', finalScore);
        }
      }
    }, 2000);
  };

  const resetGame = () => {
    const shuffled = [...originalOrderingItems].sort(() => Math.random() - 0.5);
    setOrderingItems(shuffled);
    setOrderingCompleted(false);
    setOrderingScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizScore(0);
    setQuizFinished(false);
    setQuizAnswers([]);
    setGamePhase('ordering');
    setTotalScore(0);
  };

  if (quizFinished) {
    return (
      <div className={`min-h-screen p-6 ${contrastHigh ? 'bg-black text-white' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-red-50'}`}>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">
              {totalScore >= 140 ? '🎉' : totalScore >= 100 ? '👏' : '📚'}
            </div>
            
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {totalScore >= 140 ? 'Excellent !' : totalScore >= 100 ? 'Bien joué !' : 'Continue à apprendre !'}
            </h2>
            
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-xl mb-6">
              <div className="text-2xl font-bold">Score final: {totalScore}/200</div>
              <div className="text-sm mt-2">
                Ordre chronologique: {orderingScore}/100 | QCM: {quizScore * 20}/100
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                🐍 <strong>Leçon du Serpent d'airain :</strong> 
                Le salut vient par un simple regard de foi !
              </p>
              <p className="text-base text-gray-600 dark:text-gray-400">
                "Comme Moïse éleva le serpent dans le désert, il faut de même que le Fils de l'homme soit élevé" - Jean 3:14
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
              >
                🔄 Rejouer
              </button>
              
              <Link
                to="/lesson/serpent_airain_01"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                📖 Revoir la leçon
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
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${contrastHigh ? 'bg-black text-white' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-red-50'}`}>
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            🐍 Jeu du Serpent d'airain
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {gamePhase === 'ordering' ? 'Remets les événements dans le bon ordre !' : 'Réponds aux questions !'}
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <div className={`px-4 py-2 rounded-lg ${gamePhase === 'ordering' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
              1. Ordre chronologique
            </div>
            <div className={`px-4 py-2 rounded-lg ${gamePhase === 'quiz' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
              2. Quiz
            </div>
          </div>
        </div>

        {/* Jeu d'ordre chronologique */}
        {gamePhase === 'ordering' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
              📅 Remets l'histoire dans l'ordre chronologique
            </h2>
            
            <div className="grid gap-3 mb-8">
              {orderingItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900 dark:to-amber-900 rounded-lg border-2 border-orange-200 dark:border-orange-700 cursor-move"
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
                        className="px-2 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
                      >
                        ↑
                      </button>
                    )}
                    {index < orderingItems.length - 1 && (
                      <button
                        onClick={() => moveItem(index, index + 1)}
                        className="px-2 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
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
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all"
                >
                  ✅ Vérifier l'ordre
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className={`text-2xl font-bold mb-4 ${orderingScore === 100 ? 'text-green-600' : 'text-orange-600'}`}>
                  Score: {orderingScore}/100
                </div>
                {orderingScore === 100 ? (
                  <div className="text-green-600 font-medium">
                    🎉 Parfait ! Passage au quiz dans 2 secondes...
                  </div>
                ) : (
                  <button
                    onClick={() => setOrderingCompleted(false)}
                    className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    🔄 Réessayer
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Quiz */}
        {gamePhase === 'quiz' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  ❓ Question {currentQuestion + 1}/{questions.length}
                </h2>
                <div className="text-lg font-medium text-orange-600">
                  Score: {quizScore}/{questions.length}
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                {questions[currentQuestion].question}
              </h3>
              
              <div className="grid gap-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`p-4 text-left rounded-lg border-2 transition-all ${
                      selectedAnswer === index
                        ? showResult
                          ? index === questions[currentQuestion].correctAnswer
                            ? 'bg-green-100 border-green-500 text-green-800'
                            : 'bg-red-100 border-red-500 text-red-800'
                          : 'bg-orange-100 border-orange-500 text-orange-800'
                        : showResult && index === questions[currentQuestion].correctAnswer
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : 'bg-gray-50 border-gray-200 hover:bg-orange-50 hover:border-orange-300'
                    }`}
                  >
                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                  </button>
                ))}
              </div>
            </div>

            {showResult && (
              <div className={`p-6 rounded-lg mb-6 ${
                selectedAnswer === questions[currentQuestion].correctAnswer
                  ? 'bg-green-50 border-2 border-green-200'
                  : 'bg-red-50 border-2 border-red-200'
              }`}>
                <div className={`font-bold text-lg mb-2 ${
                  selectedAnswer === questions[currentQuestion].correctAnswer ? 'text-green-800' : 'text-red-800'
                }`}>
                  {selectedAnswer === questions[currentQuestion].correctAnswer ? '✅ Correct !' : '❌ Incorrect'}
                </div>
                <p className="text-gray-700 mb-2">{questions[currentQuestion].explanation}</p>
                <p className="text-sm text-gray-600 italic">📖 {questions[currentQuestion].reference}</p>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                  selectedAnswer === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
                }`}
              >
                {currentQuestion < questions.length - 1 ? '➡️ Question suivante' : '🏁 Terminer le quiz'}
              </button>
            </div>
          </div>
        )}

        {/* Bouton retour */}
        <div className="text-center mt-8">
          <Link
            to="/games"
            className="inline-flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <span>🏠</span>
            <span>Retour aux jeux</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SerpentAirainGame;