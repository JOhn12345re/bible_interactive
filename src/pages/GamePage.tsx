import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProgress } from '../state/progressStore';
import { useSettings } from '../state/settingsStore';
import PhaserGame from '../components/PhaserGame';
import OrderGame from '../components/OrderGame';
import LoadingSpinner from '../components/LoadingSpinner';

// Interface pour les données de leçon (reprise de Lesson.tsx)
interface MemoryVerse {
  reference: string;
  text: string;
}

interface ReadingParagraph {
  verse?: string;
  text?: string;
  key_point?: string;
}

interface QuizQuestion {
  q: string;
  choices: string[];
  answer: number;
}

interface LessonData {
  id: string;
  title: string;
  book: string;
  chapter_range?: string;
  reading: Array<string | ReadingParagraph>;
  memory_verse?: MemoryVerse;
  mini_games?: string[];
  quiz?: QuizQuestion[];
  story_steps?: string[];
  assets?: string[];
}

// Fonction utilitaire pour charger la leçon selon l'id
async function loadLessonData(lessonId: string): Promise<LessonData> {
  // Essayons différents dossiers dans l'ordre de priorité
  const possiblePaths = [
    `/content/pentateuque/${lessonId}.json`,
    `/content/nouveau_testament/${lessonId}.json`,
    `/content/poetiques/${lessonId}.json`,
    `/content/prophetiques/${lessonId}.json`,
    `/content/historiques/${lessonId}.json`,
    `/content/icones_coptes/${lessonId}.json`,
    `/content/histoire_saints/${lessonId}.json`,
    `/content/${lessonId}.json`
  ];

  for (const url of possiblePaths) {
    try {
      console.log('GamePage: Tentative de chargement de', url);
      const resp = await fetch(url);
      if (resp.ok) {
        const data = (await resp.json()) as LessonData;
        console.log('GamePage: Succès du chargement depuis', url, '- données:', data);
        return data;
      }
    } catch (error) {
      console.log('GamePage: Erreur lors du chargement de', url, ':', error);
    }
  }
  
  throw new Error(`Leçon non trouvée pour id: ${lessonId}`);
}

export default function GamePage() {
  const { id, gameType } = useParams<{ id: string; gameType: 'order_events' | 'quiz' }>();
  const navigate = useNavigate();
  const [data, setData] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState<string | null>(null);
  const { markDone, completed, isCompleted } = useProgress();
  const { contrastHigh } = useSettings();

  // Charger les données de la leçon
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    loadLessonData(id)
      .then((lessonData) => {
        console.log('GamePage: Données chargées pour', id, ':', lessonData);
        console.log('GamePage: story_steps disponibles :', lessonData.story_steps);
        console.log('GamePage: Toutes les clés:', Object.keys(lessonData));
        console.log('GamePage: mini_games:', lessonData.mini_games);
        setData(lessonData);
        setLoading(false);
      })
      .catch(() => {
        setError('Impossible de charger la leçon');
        setLoading(false);
      });
  }, [id]);

  // Vérifier si le jeu a déjà été complété
  useEffect(() => {
    if (id) {
      setGameCompleted(isCompleted(id));
    }
  }, [id, isCompleted]);

  // Gestionnaire de fin de jeu
  const handleGameComplete = (result: { badge?: string }) => {
    setGameCompleted(true);
    if (result.badge) {
      setEarnedBadge(result.badge);
    }
    if (id) {
      markDone(id);
    }
  };

  // Gérer le retour à la leçon
  const handleBackToLesson = () => {
    navigate(`/lesson/${id}`);
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          contrastHigh
            ? 'bg-contrast-bg text-contrast-text'
            : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
        }`}
      >
        <LoadingSpinner size="lg" message="Chargement du jeu..." />
      </div>
    );
  }

  if (error || !data || !gameType) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gray-50'
        }`}
      >
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-4">Erreur</h1>
          <p className="text-lg mb-6">{error || 'Jeu non trouvé'}</p>
          <Link
            to="/"
            className={`px-6 py-3 rounded-lg font-medium ${
              contrastHigh
                ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  // Vérifier si le jeu demandé est disponible
  const gameAvailable = data.mini_games?.includes(gameType);
  if (!gameAvailable) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gray-50'
        }`}
      >
        <div className="text-center">
          <div className="text-4xl mb-4">🎮</div>
          <h1 className="text-2xl font-bold mb-4">Jeu non disponible</h1>
          <p className="text-lg mb-6">Ce type de jeu n'est pas disponible pour cette leçon</p>
          <button
            onClick={handleBackToLesson}
            className={`px-6 py-3 rounded-lg font-medium ${
              contrastHigh
                ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Retour à la leçon
          </button>
        </div>
      </div>
    );
  }

  const gameTitle = gameType === 'quiz' ? '❓ Quiz' : '🧩 Remets dans l\'ordre';
  const gameDescription = gameType === 'quiz' 
    ? 'Réponds aux questions sur cette histoire'
    : 'Place les événements dans l\'ordre chronologique';

  return (
    <div className="min-h-screen">
      {/* En-tête avec navigation */}
      <header
        className={`sticky top-0 z-50 border-b ${
          contrastHigh
            ? 'bg-contrast-bg border-contrast-text'
            : 'bg-white border-gray-200 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToLesson}
                className={`text-2xl hover:opacity-70 ${
                  contrastHigh ? 'text-contrast-text' : 'text-blue-500'
                }`}
                aria-label="Retour à la leçon"
              >
                ←
              </button>
              <div>
                <h1 className="text-xl font-bold">{gameTitle}</h1>
                <p
                  className={`text-sm ${
                    contrastHigh ? 'text-contrast-text' : 'text-gray-600'
                  }`}
                >
                  📖 {data.title} — {data.book}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {gameCompleted && (
                <div
                  className={`flex items-center space-x-2 ${
                    contrastHigh ? 'text-contrast-text' : 'text-green-600'
                  }`}
                >
                  <span className="text-2xl">✅</span>
                  <span className="font-medium">Terminé</span>
                </div>
              )}
              
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  contrastHigh
                    ? 'text-contrast-text border-2 border-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                    : 'text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white'
                }`}
              >
                🏠 Accueil
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Description du jeu */}
        <div
          className={`rounded-lg p-6 mb-8 text-center ${
            contrastHigh
              ? 'bg-contrast-bg border-2 border-contrast-text'
              : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'
          }`}
        >
          <h2 className="text-2xl font-bold mb-2">{gameTitle}</h2>
          <p
            className={`text-lg ${
              contrastHigh ? 'text-contrast-text' : 'text-gray-700'
            }`}
          >
            {gameDescription}
          </p>
        </div>

        {/* Zone de jeu */}
        {gameType === 'order_events' ? (
          <>
            {console.log('GamePage: Rendu OrderGame avec story_steps:', data.story_steps)}
            <OrderGame
              storySteps={data.story_steps || []}
              onComplete={(score) => handleGameComplete({ badge: score >= 80 ? `Maître de l'ordre - ${data.title}` : undefined })}
              title="Remets l'histoire dans l'ordre chronologique"
            />
          </>
        ) : (
          <div
            className={`rounded-lg overflow-hidden ${
              contrastHigh
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-white border border-gray-200 shadow-lg'
            }`}
          >
            <PhaserGame
              lessonData={data}
              gameType={gameType}
              onComplete={handleGameComplete}
              width={1200}
              height={800}
            />
          </div>
        )}

        {/* Écran de félicitations */}
        {gameCompleted && earnedBadge && (
          <div
            className={`mt-8 p-8 rounded-lg text-center ${
              contrastHigh
                ? 'bg-contrast-text text-contrast-bg'
                : 'bg-gradient-to-r from-green-50 to-blue-50 border border-green-200'
            }`}
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold mb-4">Félicitations !</h3>
            <p className="text-xl mb-6">
              Tu as gagné le badge : <strong>{earnedBadge}</strong>
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleBackToLesson}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  contrastHigh
                    ? 'bg-contrast-bg text-contrast-text border-2 border-contrast-text'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                📖 Retour à la leçon
              </button>
              
              <button
                onClick={() => {
                  setGameCompleted(false);
                  setEarnedBadge(null);
                  // Recharger la page pour recommencer le jeu
                  window.location.reload();
                }}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  contrastHigh
                    ? 'bg-contrast-bg text-contrast-text border-2 border-contrast-text'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                🔄 Rejouer
              </button>
            </div>
          </div>
        )}

        {/* Instructions pour mobile */}
        <div
          className={`mt-8 p-4 rounded-lg text-center text-sm ${
            contrastHigh
              ? 'bg-contrast-bg border border-contrast-text'
              : 'bg-gray-50 border border-gray-200'
          }`}
        >
          <p
            className={`${
              contrastHigh ? 'text-contrast-text' : 'text-gray-600'
            }`}
          >
            💡 <strong>Astuce :</strong> Utilisez la souris pour glisser-déposer les cartes. 
            Sur mobile, touchez et faites glisser. Votre progression est automatiquement sauvegardée !
          </p>
        </div>
      </main>
    </div>
  );
}