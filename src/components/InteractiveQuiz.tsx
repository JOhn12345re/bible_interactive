import React, { useState, useEffect } from 'react';
import { useSettings } from '../state/settingsStore';
import { useProgress } from '../state/progressStore';
import { useProfileStore } from '../state/profileStore';

interface QuizQuestion {
  q: string;
  choices: string[];
  answer: number;
  explanation?: string;
}

interface InteractiveQuizProps {
  questions: QuizQuestion[];
  lessonId: string;
  title: string;
}

const InteractiveQuiz = ({ questions, lessonId, title }: InteractiveQuizProps) => {
  const { contrastHigh } = useSettings();
  const { markDone } = useProgress();
  const { updateGameStats } = useProfileStore();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === currentQuestion.answer;
    setIsCorrect(correct);
    setShowResult(true);
    setShowExplanation(true);

    // Mettre à jour les réponses de l'utilisateur
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Calculer le score final
      const correctAnswers = userAnswers.filter((answer, index) => 
        answer === questions[index].answer
      ).length;
      const finalScore = Math.round((correctAnswers / questions.length) * 100);
      setScore(finalScore);
      setQuizCompleted(true);
      
      if (finalScore >= 80) {
        markDone(`${lessonId}-quiz`);
        updateGameStats(`${lessonId}-quiz`, finalScore);
      }
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setUserAnswers(new Array(questions.length).fill(null));
    setQuizCompleted(false);
    setScore(0);
    setShowExplanation(false);
  };

  if (quizCompleted) {
    return (
      <div className={`p-8 rounded-2xl shadow-xl ${contrastHigh ? 'bg-gray-800 border-2 border-gray-600' : 'bg-white border border-gray-200'}`}>
        <div className="text-center">
          <div className={`text-6xl mb-4 ${score >= 80 ? 'text-green-500' : score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
            {score >= 80 ? '🎉' : score >= 60 ? '🤔' : '📚'}
          </div>
          
          <h3 className={`text-3xl font-bold mb-4 ${contrastHigh ? 'text-white' : 'text-gray-900'}`}>
            Quiz terminé !
          </h3>
          
          <div className={`text-4xl font-bold mb-6 ${
            score >= 80 ? 'text-green-600' : 
            score >= 60 ? 'text-yellow-600' : 
            'text-red-600'
          }`}>
            {score}/100
          </div>
          
          <div className={`p-6 rounded-xl mb-6 ${
            score >= 80 ? 'bg-green-50 dark:bg-green-900/20' :
            score >= 60 ? 'bg-yellow-50 dark:bg-yellow-900/20' :
            'bg-red-50 dark:bg-red-900/20'
          }`}>
            {score >= 80 ? (
              <div>
                <div className="text-green-600 font-bold text-xl mb-2">Excellent travail !</div>
                <p className={`${contrastHigh ? 'text-green-200' : 'text-green-800'}`}>
                  Tu maîtrises parfaitement cette leçon biblique !
                </p>
              </div>
            ) : score >= 60 ? (
              <div>
                <div className="text-yellow-600 font-bold text-xl mb-2">Bien joué !</div>
                <p className={`${contrastHigh ? 'text-yellow-200' : 'text-yellow-800'}`}>
                  Tu as de bonnes bases, continue à étudier !
                </p>
              </div>
            ) : (
              <div>
                <div className="text-red-600 font-bold text-xl mb-2">Continue tes efforts !</div>
                <p className={`${contrastHigh ? 'text-red-200' : 'text-red-800'}`}>
                  Relis la leçon et réessaie le quiz !
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium transition-colors"
            >
              🔄 Recommencer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-8 rounded-2xl shadow-xl ${contrastHigh ? 'bg-gray-800 border-2 border-gray-600' : 'bg-white border border-gray-200'}`}>
      {/* En-tête du quiz */}
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-2xl font-bold ${contrastHigh ? 'text-white' : 'text-gray-900'}`}>
          ❓ Quiz - {title}
        </h3>
        <div className={`px-4 py-2 rounded-lg ${contrastHigh ? 'bg-gray-700' : 'bg-purple-100'}`}>
          <span className={`text-sm font-medium ${contrastHigh ? 'text-purple-300' : 'text-purple-700'}`}>
            Question {currentQuestionIndex + 1}/{questions.length}
          </span>
        </div>
      </div>

      {/* Barre de progression */}
      <div className={`w-full h-3 rounded-full mb-8 ${contrastHigh ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h4 className={`text-xl font-semibold mb-6 leading-relaxed ${contrastHigh ? 'text-white' : 'text-gray-800'}`}>
          {currentQuestion.q}
        </h4>

        {/* Choix de réponses */}
        <div className="space-y-3">
          {currentQuestion.choices.map((choice, index) => {
            let buttonStyle = '';
            
            if (showResult && selectedAnswer === index) {
              buttonStyle = isCorrect 
                ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/20 dark:border-green-400 dark:text-green-200'
                : 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900/20 dark:border-red-400 dark:text-red-200';
            } else if (showResult && index === currentQuestion.answer) {
              buttonStyle = 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/20 dark:border-green-400 dark:text-green-200';
            } else if (selectedAnswer === index && !showResult) {
              buttonStyle = 'bg-purple-100 border-purple-500 text-purple-800 dark:bg-purple-900/20 dark:border-purple-400 dark:text-purple-200';
            } else {
              buttonStyle = contrastHigh 
                ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100';
            }

            return (
              <button
                key={index}
                onClick={() => !showResult && handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left border-2 rounded-xl transition-all transform hover:scale-[1.02] ${buttonStyle} ${
                  !showResult ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-lg font-semibold mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="flex-1">{choice}</span>
                  {showResult && selectedAnswer === index && (
                    <span className="ml-2 text-xl">
                      {isCorrect ? '✅' : '❌'}
                    </span>
                  )}
                  {showResult && index === currentQuestion.answer && selectedAnswer !== index && (
                    <span className="ml-2 text-xl">✅</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explication (si disponible) */}
      {showExplanation && currentQuestion.explanation && (
        <div className={`p-4 rounded-lg mb-6 ${
          isCorrect 
            ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-700'
            : 'bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-700'
        }`}>
          <div className="flex items-start space-x-3">
            <span className="text-2xl">{isCorrect ? '💡' : '📚'}</span>
            <div>
              <h5 className={`font-semibold mb-2 ${
                isCorrect 
                  ? 'text-green-800 dark:text-green-200'
                  : 'text-blue-800 dark:text-blue-200'
              }`}>
                {isCorrect ? 'Excellent !' : 'À retenir :'}
              </h5>
              <p className={`text-sm ${
                isCorrect 
                  ? 'text-green-700 dark:text-green-300'
                  : 'text-blue-700 dark:text-blue-300'
              }`}>
                {currentQuestion.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Boutons d'action */}
      <div className="flex justify-between">
        {!showResult ? (
          <div className="flex space-x-4 ml-auto">
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedAnswer !== null
                  ? 'bg-purple-500 text-white hover:bg-purple-600 transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              Valider la réponse
            </button>
          </div>
        ) : (
          <div className="flex space-x-4 ml-auto">
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium transition-all transform hover:scale-105"
            >
              {isLastQuestion ? '🎯 Voir les résultats' : '➡️ Question suivante'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveQuiz;