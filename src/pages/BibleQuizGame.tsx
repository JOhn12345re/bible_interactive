import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';
import { useProgress } from '../state/progressStore';
import { useProfileStore } from '../state/profileStore';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  reference: string;
}

const BibleQuizGame = () => {
  const { contrastHigh } = useSettings();
  const { markDone } = useProgress();
  const { updateGameStats, addFavoriteVerse } = useProfileStore();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const questions: Question[] = [
    {
      id: 1,
      question: "Qui a construit l'arche pour échapper au déluge ?",
      options: ['Abraham', 'Moïse', 'Noé', 'David'],
      correctAnswer: 2,
      explanation:
        "Noé a construit l'arche sur ordre de Dieu pour sauver sa famille et les animaux du déluge.",
      reference: 'Genèse 6:19 (Louis Segond 1910)',
    },
    {
      id: 2,
      question: 'Combien de jours Jésus a-t-il jeûné dans le désert ?',
      options: ['30 jours', '40 jours', '50 jours', '7 jours'],
      correctAnswer: 1,
      explanation:
        "Jésus a jeûné pendant 40 jours et 40 nuits dans le désert avant d'être tenté par Satan.",
      reference: 'Matthieu 4:2 (Louis Segond 1910)',
    },
    {
      id: 3,
      question: 'Avec quoi David a-t-il vaincu Goliath ?',
      options: ['Une épée', 'Une lance', 'Une fronde', 'Un arc'],
      correctAnswer: 2,
      explanation:
        'David a utilisé une fronde et une pierre pour vaincre le géant Goliath.',
      reference: '1 Samuel 17:50 (Louis Segond 1910)',
    },
    {
      id: 4,
      question: "Combien d'apôtres Jésus avait-il ?",
      options: ['10', '12', '7', '15'],
      correctAnswer: 1,
      explanation:
        "Jésus a choisi douze apôtres pour l'accompagner et répandre son message.",
      reference: 'Marc 3:14 (Louis Segond 1910)',
    },
    {
      id: 5,
      question: 'Où Jésus est-il né ?',
      options: ['Nazareth', 'Jérusalem', 'Bethléem', 'Capharnaüm'],
      correctAnswer: 2,
      explanation:
        "Jésus est né à Bethléem, dans une étable, car il n'y avait pas de place dans l'hôtellerie.",
      reference: 'Luc 2:4-7 (Louis Segond 1910)',
    },
    {
      id: 6,
      question: 'Qui a trahi Jésus ?',
      options: ['Pierre', 'Jean', 'Judas', 'Thomas'],
      correctAnswer: 2,
      explanation:
        "Judas Iscariote a trahi Jésus en le livrant aux autorités pour 30 pièces d'argent.",
      reference: 'Matthieu 26:14-16 (Louis Segond 1910)',
    },
    {
      id: 7,
      question: "Combien de plaies Dieu a-t-il envoyées sur l'Égypte ?",
      options: ['7', '10', '12', '5'],
      correctAnswer: 1,
      explanation:
        "Dieu a envoyé dix plaies sur l'Égypte pour convaincre Pharaon de libérer le peuple d'Israël.",
      reference: 'Exode 7-12 (Louis Segond 1910)',
    },
    {
      id: 8,
      question: 'Qui a reçu les Dix Commandements ?',
      options: ['Abraham', 'Moïse', 'Aaron', 'Josué'],
      correctAnswer: 1,
      explanation:
        'Moïse a reçu les Dix Commandements de Dieu sur le mont Sinaï.',
      reference: 'Exode 20:1-17 (Louis Segond 1910)',
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect =
      selectedAnswer === questions[currentQuestion].correctAnswer;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameFinished(true);
      // Marquer le quiz comme terminé avec un badge selon le score
      const percentage = (score / questions.length) * 100;
      let badge = '';
      if (percentage >= 90) badge = '🏆 Expert Biblique';
      else if (percentage >= 80) badge = '🥇 Connaisseur';
      else if (percentage >= 60) badge = '🥈 Étudiant';
      else badge = '🥉 Apprenti';

      markDone(`quiz-biblique-${Date.now()}`, badge);

      // Mettre à jour les stats du profil
      updateGameStats('Quiz Biblique', percentage);

      // Ajouter des versets favoris selon le score
      if (percentage >= 80) {
        addFavoriteVerse(
          "Car Dieu a tant aimé le monde qu'il a donné son Fils unique - Jean 3:16"
        );
      }
      if (percentage === 100) {
        addFavoriteVerse(
          'Toute Écriture est inspirée de Dieu, et utile - 2 Timothée 3:16'
        );
      }
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setGameFinished(false);
    setAnswers([]);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const currentQ = questions[currentQuestion];

  if (gameFinished) {
    return (
      <div
        className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'}`}
      >
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
          </div>

          {/* Results */}
          <div className="max-w-2xl mx-auto">
            <div
              className={`p-8 rounded-2xl text-center ${
                contrastHigh
                  ? 'bg-contrast-bg border-2 border-contrast-text'
                  : 'bg-white shadow-xl border border-blue-200'
              }`}
            >
              <div className="text-6xl mb-6">🏆</div>
              <h2
                className={`text-3xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}
              >
                Quiz Terminé !
              </h2>
              <div className={`text-5xl font-bold mb-6 ${getScoreColor()}`}>
                {score}/{questions.length}
              </div>
              <p
                className={`text-lg mb-8 ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}
              >
                {score === questions.length &&
                  'Parfait ! Tu connais très bien la Bible ! 🌟'}
                {score >= questions.length * 0.8 &&
                  score < questions.length &&
                  'Excellent ! Tu as une très bonne connaissance de la Bible ! 👏'}
                {score >= questions.length * 0.6 &&
                  score < questions.length * 0.8 &&
                  'Bien joué ! Continue à étudier la Bible ! 📖'}
                {score < questions.length * 0.6 &&
                  'Continue à lire la Bible pour apprendre davantage ! 💪'}
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

  return (
    <div
      className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'}`}
    >
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

          <div className="text-right">
            <div
              className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}
            >
              Question {currentQuestion + 1}/{questions.length}
            </div>
            <div
              className={`text-lg font-bold ${contrastHigh ? 'text-contrast-text' : 'text-blue-600'}`}
            >
              Score: {score}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className={`w-full h-2 rounded-full mb-8 ${contrastHigh ? 'bg-contrast-text/20' : 'bg-gray-200'}`}
        >
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>

        {/* Question Card */}
        <div className="max-w-3xl mx-auto">
          <div
            className={`p-8 rounded-2xl ${
              contrastHigh
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-white shadow-xl border border-blue-200'
            }`}
          >
            {/* Question */}
            <div className="text-center mb-8">
              <h2
                className={`text-2xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}
              >
                {currentQ.question}
              </h2>
              <div className="text-4xl mb-4">🤔</div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                    selectedAnswer === index
                      ? showResult
                        ? index === currentQ.correctAnswer
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : 'bg-red-100 border-red-500 text-red-800'
                        : contrastHigh
                          ? 'bg-contrast-text/20 border-contrast-text'
                          : 'bg-blue-100 border-blue-500'
                      : showResult && index === currentQ.correctAnswer
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : contrastHigh
                          ? 'border-contrast-text/30 hover:bg-contrast-text/10'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  } ${
                    showResult
                      ? 'cursor-default'
                      : 'cursor-pointer hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                        selectedAnswer === index
                          ? showResult
                            ? index === currentQ.correctAnswer
                              ? 'border-green-500 bg-green-500 text-white'
                              : 'border-red-500 bg-red-500 text-white'
                            : contrastHigh
                              ? 'border-contrast-text bg-contrast-text text-contrast-bg'
                              : 'border-blue-500 bg-blue-500 text-white'
                          : showResult && index === currentQ.correctAnswer
                            ? 'border-green-500 bg-green-500 text-white'
                            : contrastHigh
                              ? 'border-contrast-text/30'
                              : 'border-gray-300'
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span
                      className={`font-medium ${
                        contrastHigh ? 'text-contrast-text' : 'text-gray-800'
                      }`}
                    >
                      {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Result Explanation */}
            {showResult && (
              <div
                className={`p-6 rounded-xl mb-6 ${
                  contrastHigh
                    ? 'bg-contrast-text/10'
                    : 'bg-gradient-to-br from-blue-50 to-indigo-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <h4
                      className={`font-bold mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-blue-800'}`}
                    >
                      Explication
                    </h4>
                    <p
                      className={`mb-3 ${contrastHigh ? 'text-contrast-text' : 'text-blue-700'}`}
                    >
                      {currentQ.explanation}
                    </p>
                    <p
                      className={`text-sm font-medium ${contrastHigh ? 'text-contrast-text/80' : 'text-blue-600'}`}
                    >
                      📖 {currentQ.reference}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="text-center">
              {!showResult ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedAnswer !== null
                      ? 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  ✅ Valider la réponse
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-8 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                >
                  {currentQuestion + 1 < questions.length
                    ? '➡️ Question suivante'
                    : '🏁 Voir les résultats'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BibleQuizGame;
