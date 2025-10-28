import React, { useState, useEffect } from 'react';
import { useSettings } from '../state/settingsStore';
import { useProgress } from '../state/progressStore';
import { useProfileStore } from '../state/profileStore';

interface GoldGameQuestion {
  question: string;
  choices: string[];
  correct: number;
  explanation?: string;
}

interface GoldGameReward {
  type: string;
  name: string;
  description: string;
  icon: string;
}

interface GoldGameData {
  title: string;
  description: string;
  questions: GoldGameQuestion[];
  passingScore: number;
  reward: GoldGameReward;
}

interface GoldGameProps {
  goldGame: GoldGameData;
  lessonId: string;
}

const GoldGame = ({ goldGame, lessonId }: GoldGameProps) => {
  const { contrastHigh } = useSettings();
  const { markDone } = useProgress();
  const { updateGameStats } = useProfileStore();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  // Vérifier que le goldGame et les questions existent
  if (!goldGame || !goldGame.questions || goldGame.questions.length === 0) {
    return (
      <div className="p-6 rounded-lg bg-red-50 border-2 border-red-200 text-center">
        <p className="text-red-600">Aucune question trouvée pour ce jeu d'or.</p>
      </div>
    );
  }

  // Initialiser userAnswers avec la bonne longueur
  useEffect(() => {
    setUserAnswers(new Array(goldGame.questions.length).fill(null));
  }, [goldGame.questions.length]);

  const currentQuestion = goldGame.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === goldGame.questions.length - 1;

  // Fonctions utilitaires
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === currentQuestion.correct;
    setIsCorrect(correct);
    setShowResult(true);
    setShowExplanation(true);

    // Mettre à jour les réponses de l'utilisateur
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newAnswers);

    if (correct) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Quiz terminé
      setGameCompleted(true);
      const finalScore = score + (isCorrect ? 1 : 0);
      const passed = finalScore >= goldGame.passingScore;
      setHasWon(passed);

      if (passed) {
        // Marquer le jeu d'or comme terminé
        markDone(`${lessonId}-goldgame`);
        
        // Mettre à jour les statistiques de jeu
        updateGameStats('goldGame', finalScore);
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowExplanation(false);
    }
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setUserAnswers(new Array(goldGame.questions.length).fill(null));
    setGameCompleted(false);
    setScore(0);
    setShowExplanation(false);
    setHasWon(false);
  };

  if (gameCompleted) {
    return (
      <div className={`p-6 rounded-lg text-center ${
        contrastHigh
          ? 'bg-contrast-bg border-2 border-contrast-text'
          : hasWon 
            ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300'
            : 'bg-gray-50 border border-gray-200'
      }`}>
        <div className="text-6xl mb-4">
          {hasWon ? goldGame.reward.icon : '🤔'}
        </div>
        <h3 className={`text-2xl font-bold mb-2 ${
          contrastHigh ? 'text-contrast-text' : hasWon ? 'text-yellow-700' : 'text-gray-700'
        }`}>
          {hasWon ? 'Félicitations !' : 'Presque réussi !'}
        </h3>
        <p className={`text-lg mb-4 ${
          contrastHigh ? 'text-contrast-text' : hasWon ? 'text-yellow-600' : 'text-gray-600'
        }`}>
          Score : {score}/{goldGame.questions.length}
        </p>
        {hasWon ? (
          <div className="mb-4">
            <div className="text-2xl mb-2">🏆 {goldGame.reward.name}</div>
            <p className={`text-sm ${
              contrastHigh ? 'text-contrast-text' : 'text-yellow-600'
            }`}>
              {goldGame.reward.description}
            </p>
          </div>
        ) : (
          <p className={`text-sm mb-4 ${
            contrastHigh ? 'text-contrast-text' : 'text-gray-600'
          }`}>
            Il vous faut au moins {goldGame.passingScore}/{goldGame.questions.length} pour obtenir la récompense.
          </p>
        )}
        <button
          onClick={resetGame}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            contrastHigh
              ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
              : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
          }`}
        >
          🔄 Recommencer le jeu d'or
        </button>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-lg ${
      contrastHigh
        ? 'bg-contrast-bg border-2 border-contrast-text'
        : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300'
    }`}>
      {/* En-tête du jeu d'or */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-xl font-bold ${
            contrastHigh ? 'text-contrast-text' : 'text-yellow-700'
          }`}>
            🏆 {goldGame.title}
          </h3>
          <span className={`text-sm px-3 py-1 rounded-full ${
            contrastHigh
              ? 'bg-contrast-text text-contrast-bg'
              : 'bg-yellow-200 text-yellow-800'
          }`}>
            Question {currentQuestionIndex + 1}/{goldGame.questions.length}
          </span>
        </div>
        <p className={`text-sm ${
          contrastHigh ? 'text-contrast-text' : 'text-yellow-600'
        }`}>
          {goldGame.description}
        </p>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h4 className={`text-lg font-semibold mb-4 ${
          contrastHigh ? 'text-contrast-text' : 'text-gray-800'
        }`}>
          {currentQuestion.question}
        </h4>

        {/* Choix de réponses */}
        <div className="space-y-3">
          {currentQuestion.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswer === index
                  ? contrastHigh
                    ? 'border-contrast-text bg-contrast-text text-contrast-bg'
                    : showResult
                      ? index === currentQuestion.correct
                        ? 'border-green-500 bg-green-100 text-green-800'
                        : 'border-red-500 bg-red-100 text-red-800'
                      : 'border-yellow-500 bg-yellow-100 text-yellow-800'
                  : showResult && index === currentQuestion.correct
                    ? 'border-green-500 bg-green-100 text-green-800'
                    : contrastHigh
                      ? 'border-contrast-text text-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                      : 'border-gray-300 text-gray-700 hover:border-yellow-400 hover:bg-yellow-50'
              }`}
            >
              <span className="font-medium">
                {String.fromCharCode(65 + index)}. {choice}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Explication */}
      {showExplanation && currentQuestion.explanation && (
        <div className={`mb-6 p-4 rounded-lg ${
          contrastHigh
            ? 'bg-contrast-bg border border-contrast-text'
            : isCorrect
              ? 'bg-green-50 border border-green-200'
              : 'bg-blue-50 border border-blue-200'
        }`}>
          <div className="flex items-start space-x-2">
            <span className="text-2xl">
              {isCorrect ? '✅' : '💡'}
            </span>
            <div>
              <p className={`font-medium ${
                contrastHigh ? 'text-contrast-text' : isCorrect ? 'text-green-800' : 'text-blue-800'
              }`}>
                {isCorrect ? 'Excellent !' : 'À retenir :'}
              </p>
              <p className={`text-sm mt-1 ${
                contrastHigh ? 'text-contrast-text' : isCorrect ? 'text-green-700' : 'text-blue-700'
              }`}>
                {currentQuestion.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Boutons d'action */}
      <div className="flex justify-between">
        <div className={`text-sm ${
          contrastHigh ? 'text-contrast-text' : 'text-yellow-700'
        }`}>
          Score : {score}/{goldGame.questions.length} 
          {goldGame.passingScore > 0 && (
            <span className="ml-2">(Minimum : {goldGame.passingScore})</span>
          )}
        </div>
        
        <div className="space-x-3">
          {!showResult ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedAnswer === null
                  ? contrastHigh
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : contrastHigh
                    ? 'bg-contrast-text text-contrast-bg hover:bg-contrast-bg hover:text-contrast-text border-2 border-contrast-text'
                    : 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-lg hover:shadow-xl'
              }`}
            >
              ✓ Valider
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                contrastHigh
                  ? 'bg-contrast-text text-contrast-bg hover:bg-contrast-bg hover:text-contrast-text border-2 border-contrast-text'
                  : 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-lg hover:shadow-xl'
              }`}
            >
              {isLastQuestion ? '🏁 Terminer' : '→ Question suivante'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoldGame;