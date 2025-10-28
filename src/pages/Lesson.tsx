import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useProgress } from '../state/progressStore';
import { useProfileStore } from '../state/profileStore';
import { useSettings } from '../state/settingsStore';
import BibleVerseComponent from '../components/BibleVerse';
import GreekText from '../components/GreekText';
import LoadingSpinner from '../components/LoadingSpinner';
import InteractiveQuiz from '../components/InteractiveQuiz';
import GoldGame from '../components/GoldGame';

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

interface GoldGameData {
  title: string;
  description: string;
  questions: Array<{
    question: string;
    choices: string[];
    correct: number;
    explanation?: string;
  }>;
  passingScore: number;
  reward: {
    type: string;
    name: string;
    description: string;
    icon: string;
  };
}

interface SummarySection {
  title: string;
  introduction: string;
  key_characters?: { [key: string]: string };
  key_events?: string[];
  spiritual_lessons?: string[];
  modern_applications?: string[];
  questions_for_reflection?: string[];
  biblical_context?: string;
  conclusion?: string;
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
  goldGame?: GoldGameData;
  story_steps?: string[];
  assets?: string[];
  story_for_children?: string;
  summary_section?: SummarySection;
  vocab?: Array<{ word: string; hint: string }>;
  key_verse?: string;
  theological_message?: string;
  life_application?: string;
  summary?: string;
  key_verses_display?: string[];
  spiritual_lessons?: string[];
  historical_context?: string;
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

  const errors: string[] = [];
  
  for (const url of possiblePaths) {
    try {
      const resp = await fetch(url);
      if (resp.ok) {
        const data = (await resp.json()) as LessonData;
        return data;
      } else {
        errors.push(`${url}: ${resp.status} ${resp.statusText}`);
      }
    } catch (err) {
      errors.push(`${url}: ${err}`);
    }
  }
  
  throw new Error(`Leçon non trouvée pour id: ${lessonId}`);
}

// Composant principal Lesson
export default function Lesson() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showGoldGame, setShowGoldGame] = useState(false);
  const { markDone, completed, isCompleted, syncWithProfile } = useProgress();
  const { profile } = useProfileStore();
  const { contrastHigh } = useSettings();

  // Détermine la page de retour en fonction de la provenance
  const fromTimeline = location.state?.fromTimeline;
  const backPath = fromTimeline ? '/timeline' : '/';

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    loadLessonData(id)
      .then((lessonData) => {
        setData(lessonData);
        setLoading(false);
        
        // Synchroniser la progression avec le profil au chargement
        syncWithProfile();
      })
      .catch(() => {
        setError('Impossible de charger la leçon');
        setLoading(false);
      });
  }, [id, syncWithProfile]);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          contrastHigh
            ? 'bg-contrast-bg text-contrast-text'
            : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
        }`}
      >
        <LoadingSpinner size="lg" message="Chargement de la leçon..." />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gray-50'
        }`}
      >
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-4">Erreur</h1>
          <p className="text-lg mb-6">{error}</p>
          <Link
            to={backPath}
            className={`px-6 py-3 rounded-lg font-medium ${
              contrastHigh
                ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {fromTimeline ? 'Retour à la frise chronologique' : 'Retour à l\'accueil'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* En-tête */}
      <header
        className={`shadow-sm ${
          contrastHigh
            ? 'bg-contrast-bg border-b-2 border-contrast-text'
            : 'bg-white'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to={backPath}
                className={`text-2xl hover:opacity-70 ${
                  contrastHigh ? 'text-contrast-text' : 'text-blue-500'
                }`}
                aria-label={fromTimeline ? 'Retour à la frise chronologique' : 'Retour à l\'accueil'}
              >
                ←
              </Link>
              <div>
                <h1 className="text-2xl font-bold">{data.title}</h1>
                <p
                  className={`text-sm ${
                    contrastHigh ? 'text-contrast-text' : 'text-gray-600'
                  }`}
                >
                  📖 {data.book}{data.chapter_range ? ` — ${data.chapter_range}` : ''}
                </p>
              </div>
            </div>

            {completed && (
              <div
                className={`flex items-center space-x-2 ${
                  contrastHigh ? 'text-contrast-text' : 'text-green-600'
                }`}
              >
                <span className="text-2xl">✅</span>
                <span className="font-medium">Terminé</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Résumé court */}
        {data.summary && (
          <section className="mb-8">
            <div
              className={`rounded-lg p-6 ${
                contrastHigh
                  ? 'bg-contrast-bg border-2 border-contrast-text'
                  : 'bg-blue-50 border border-blue-200'
              }`}
            >
              <h3 className="text-xl font-bold mb-3 flex items-center">
                📖 Résumé
              </h3>
              <p
                className={`text-lg leading-relaxed ${
                  contrastHigh ? 'text-contrast-text' : 'text-gray-800'
                }`}
              >
                {data.summary}
              </p>
            </div>
          </section>
        )}

        {/* Versets clés */}
        {data.key_verses_display && data.key_verses_display.length > 0 && (
          <section className="mb-8">
            <div
              className={`rounded-lg p-6 ${
                contrastHigh
                  ? 'bg-contrast-bg border-2 border-contrast-text'
                  : 'bg-green-50 border border-green-200'
              }`}
            >
              <h3 className="text-xl font-bold mb-3 flex items-center">
                📜 Versets clés
              </h3>
              <div className="space-y-3">
                {data.key_verses_display.map((verse, idx) => (
                  <p
                    key={idx}
                    className={`text-base italic ${
                      contrastHigh ? 'text-contrast-text' : 'text-gray-700'
                    }`}
                  >
                    "{verse}"
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Leçons spirituelles */}
        {data.spiritual_lessons && data.spiritual_lessons.length > 0 && (
          <section className="mb-8">
            <div
              className={`rounded-lg p-6 ${
                contrastHigh
                  ? 'bg-contrast-bg border-2 border-contrast-text'
                  : 'bg-purple-50 border border-purple-200'
              }`}
            >
              <h3 className="text-xl font-bold mb-3 flex items-center">
                ✨ Leçons spirituelles
              </h3>
              <ul className="space-y-2">
                {data.spiritual_lessons.map((lesson, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start text-base ${
                      contrastHigh ? 'text-contrast-text' : 'text-gray-800'
                    }`}
                  >
                    <span className="mr-2">•</span>
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Contexte historique */}
        {data.historical_context && (
          <section className="mb-8">
            <div
              className={`rounded-lg p-6 ${
                contrastHigh
                  ? 'bg-contrast-bg border-2 border-contrast-text'
                  : 'bg-orange-50 border border-orange-200'
              }`}
            >
              <h3 className="text-xl font-bold mb-3 flex items-center">
                🏛️ Contexte historique
              </h3>
              <p
                className={`text-base leading-relaxed ${
                  contrastHigh ? 'text-contrast-text' : 'text-gray-800'
                }`}
              >
                {data.historical_context}
              </p>
            </div>
          </section>
        )}

        {/* Histoire pour enfants */}
        {data.story_for_children && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">🎨 L'Histoire pour Enfants</h2>
            <div
              className={`rounded-lg p-8 space-y-6 ${
                contrastHigh
                  ? 'bg-contrast-bg border-2 border-contrast-text'
                  : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border border-purple-200'
              }`}
            >
              <div
                className={`text-lg leading-relaxed whitespace-pre-wrap ${
                  contrastHigh ? 'text-contrast-text' : 'text-gray-800'
                }`}
              >
                {data.story_for_children.split('\n').map((line: string, idx: number) => {
                  // Rendre le markdown basique (**texte** → gras)
                  const parts = line.split(/\*\*(.+?)\*\*/g);
                  return (
                    <div key={idx} className="mb-2">
                      {parts.map((part: string, partIdx: number) =>
                        partIdx % 2 === 1 ? (
                          <strong key={partIdx}>{part}</strong>
                        ) : (
                          <span key={partIdx}>{part}</span>
                        )
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Lecture guidée */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">📚 L'Histoire</h2>
          <div
            className={`rounded-lg p-6 space-y-4 ${
              contrastHigh
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-white border border-gray-200'
            }`}
          >
            {Array.isArray(data.reading) &&
              data.reading.map((paragraph, index) => {
                if (typeof paragraph === 'string') {
                  return (
                    <div
                      key={index}
                      className={`text-lg leading-relaxed ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}
                    >
                      {paragraph}
                    </div>
                  );
                } else if (
                  typeof paragraph === 'object' &&
                  paragraph !== null
                ) {
                  const p = paragraph as ReadingParagraph;
                  return (
                    <div
                      key={index}
                      className={`text-lg leading-relaxed ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}
                    >
                      <strong>{p.verse} :</strong> {p.text}{' '}
                      {p.key_point && <em>({p.key_point})</em>}
                    </div>
                  );
                }
                return null;
              })}
            {data.memory_verse &&
              typeof data.memory_verse === 'object' &&
              data.memory_verse.text && (
                <div
                  className={`mt-6 p-4 rounded-lg italic text-center ${
                    contrastHigh
                      ? 'border-2 border-contrast-text'
                      : 'bg-blue-50 border border-blue-200'
                  }`}
                >
                  <span className="text-lg">"</span>
                  {data.memory_verse.reference} : {data.memory_verse.text}
                  <span className="text-lg">"</span>
                </div>
              )}
          </div>
        </section>

        {/* Mots-clés et définitions importants */}
        {data.vocab && data.vocab.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6">🔑 Mots-clés importants</h2>
            <div
              className={`rounded-lg p-6 ${
                contrastHigh
                  ? 'bg-contrast-bg border-2 border-contrast-text'
                  : 'bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.vocab.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      contrastHigh
                        ? 'border-2 border-contrast-text'
                        : 'bg-white border border-yellow-300 shadow-sm hover:shadow-md transition-shadow'
                    }`}
                  >
                    <h3 className="font-bold text-lg mb-2 text-amber-800">
                      {item.word}
                    </h3>
                    <p className={`text-base ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                      {item.hint}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Versets bibliques authentiques */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">📜 Textes sacrés</h2>
          <BibleVerseComponent
            lessonId={id || ''}
            className="animate-slide-up"
          />
        </section>

        {/* Jeux interactifs */}
        {data.mini_games && data.mini_games.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6">🎮 Mini-Jeux</h2>
            <div
              className={`rounded-lg p-6 ${
                contrastHigh
                  ? 'bg-contrast-bg border-2 border-contrast-text'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Jeu spécial du Serpent d'airain */}
                {data.mini_games.includes('serpent-airain') && (
                  <div className="space-y-4 md:col-span-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-semibold">🐍 Jeu du Serpent d'airain</h3>
                      {isCompleted('serpent-airain-game') && (
                        <span className="text-2xl">✅</span>
                      )}
                    </div>
                    <p
                      className={`text-sm ${
                        contrastHigh ? 'text-contrast-text' : 'text-gray-600'
                      }`}
                    >
                      Remets l'histoire du serpent d'airain en ordre chronologique puis réponds au quiz !
                    </p>
                    
                    <Link
                      to="/games/serpent-airain"
                      className={`inline-block w-full px-6 py-4 rounded-lg font-medium text-center transition-all ${
                        contrastHigh
                          ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
                          : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                      }`}
                    >
                      🎮 Jouer au jeu complet - Ordre & Quiz
                    </Link>
                  </div>
                )}

                {data.mini_games.includes('order_events') && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-semibold">🧩 Jeu d'ordre</h3>
                      {isCompleted(id || '') && (
                        <span className="text-2xl">✅</span>
                      )}
                    </div>
                    <p
                      className={`text-sm ${
                        contrastHigh ? 'text-contrast-text' : 'text-gray-600'
                      }`}
                    >
                      Remets les événements dans le bon ordre !
                    </p>
                    
                    <button
                      onClick={() => navigate(`/game/${id}/order_events`)}
                      className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${
                        contrastHigh
                          ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
                          : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      🎯 Jouer au jeu d'ordre
                    </button>
                  </div>
                )}

                {data.mini_games.includes('timeline_cards') && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-semibold">📜 Frise Chronologique Interactive</h3>
                      {isCompleted(id || '') && (
                        <span className="text-2xl">✅</span>
                      )}
                    </div>
                    <p
                      className={`text-sm ${
                        contrastHigh ? 'text-contrast-text' : 'text-gray-600'
                      }`}
                    >
                      Découvre l'histoire étape par étape avec des cartes interactives
                    </p>
                    
                    <button
                      onClick={() => navigate(`/game/${id}/timeline_cards`)}
                      className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${
                        contrastHigh
                          ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
                          : 'bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      📜 Explorer la frise chronologique
                    </button>
                  </div>
                )}
                
                {data.mini_games.includes('quiz') && data.quiz && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-semibold">❓ Quiz interactif</h3>
                      {isCompleted(id || '') && (
                        <span className="text-2xl">✅</span>
                      )}
                    </div>
                    <p
                      className={`text-sm ${
                        contrastHigh ? 'text-contrast-text' : 'text-gray-600'
                      }`}
                    >
                      {showQuiz ? 'Réponds aux questions ci-dessous' : 'Teste tes connaissances avec un quiz interactif'}
                    </p>
                    
                    {!showQuiz ? (
                      <button
                        onClick={() => setShowQuiz(true)}
                        className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${
                          contrastHigh
                            ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
                            : 'bg-purple-500 text-white hover:bg-purple-600 shadow-lg hover:shadow-xl'
                        }`}
                      >
                        🧠 Commencer le quiz
                      </button>
                    ) : (
                      <div className="mt-6">
                        <div className="flex justify-between items-center mb-4">
                          <button
                            onClick={() => setShowQuiz(false)}
                            className={`text-sm px-3 py-1 rounded-lg ${
                              contrastHigh
                                ? 'text-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            ← Retour à la leçon
                          </button>
                        </div>
                        <InteractiveQuiz 
                          questions={data.quiz} 
                          lessonId={id || ''} 
                          title={data.title}
                        />
                      </div>
                    )}
                  </div>
                )}

                {data.mini_games && data.mini_games.includes('goldGame') && data.goldGame && (
                  <div className="space-y-4 md:col-span-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-semibold">🏆 Jeu d'or - Défi Avancé</h3>
                      {isCompleted(`${id}-goldgame`) && (
                        <span className="text-2xl">✅</span>
                      )}
                    </div>
                    <p
                      className={`text-sm ${
                        contrastHigh ? 'text-contrast-text' : 'text-gray-600'
                      }`}
                    >
                      {showGoldGame ? 'Répondez aux questions avancées ci-dessous' : 'Défi spécial avec questions d\'approfondissement pour les plus courageux !'}
                    </p>
                    
                    {!showGoldGame ? (
                      <button
                        onClick={() => setShowGoldGame(true)}
                        className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${
                          contrastHigh
                            ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
                            : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 shadow-lg hover:shadow-xl'
                        }`}
                      >
                        🏆 Commencer le jeu d'or
                      </button>
                    ) : (
                      <div className="mt-6">
                        <div className="flex justify-between items-center mb-4">
                          <button
                            onClick={() => setShowGoldGame(false)}
                            className={`text-sm px-3 py-1 rounded-lg ${
                              contrastHigh
                                ? 'text-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            ← Retour à la leçon
                          </button>
                        </div>
                        <GoldGame 
                          goldGame={data.goldGame!} 
                          lessonId={id || ''} 
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Message informatif */}
              <div
                className={`mt-6 p-4 rounded-lg text-center ${
                  contrastHigh
                    ? 'bg-contrast-bg border border-contrast-text'
                    : 'bg-blue-50 border border-blue-200'
                }`}
              >
                <p
                  className={`text-sm ${
                    contrastHigh ? 'text-contrast-text' : 'text-blue-700'
                  }`}
                >
                  💡 <strong>Info :</strong> Les jeux s'ouvrent dans une page dédiée pour une meilleure expérience. 
                  Votre progression est automatiquement sauvegardée !
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Texte grec LXX selon le livre de la leçon */}
        {(() => {
          const greekBookMap: Record<string, string> = {
            Genèse: 'genesis',
            Jonas: 'jonas',
          };
          const greekBook = data.book ? greekBookMap[data.book] : undefined;
          if (!greekBook) return null;
          const ref =
            greekBook === 'genesis'
              ? { chapter: 1, start: 1, end: 3 }
              : { chapter: 1, start: 1, end: 3 };
          return (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6">🇬🇷 Texte grec (Septante)</h2>
              <div
                className={`rounded-lg p-6 ${
                  contrastHigh
                    ? 'bg-contrast-bg border-2 border-contrast-text'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <GreekText
                  book={greekBook}
                  chapter={ref.chapter}
                  verseStart={ref.start}
                />
              </div>
            </section>
          );
        })()}

        {/* Résumé de la leçon */}
        {data.summary_section && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">📚 {data.summary_section.title}</h2>
            
            <div
              className={`rounded-lg p-8 space-y-8 ${
                contrastHigh
                  ? 'bg-contrast-bg border-2 border-contrast-text'
                  : 'bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 border border-green-200'
              }`}
            >
              {/* Introduction */}
              <div>
                <h3 className={`text-2xl font-semibold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-green-700'}`}>
                  Introduction
                </h3>
                <p className={`text-lg leading-relaxed ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                  {data.summary_section.introduction}
                </p>
              </div>

              {/* Personnages clés */}
              {data.summary_section.key_characters && Object.keys(data.summary_section.key_characters).length > 0 && (
                <div>
                  <h3 className={`text-2xl font-semibold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-blue-700'}`}>
                    👥 Personnages Clés
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(data.summary_section.key_characters).map(([key, value]) => (
                      <div
                        key={key}
                        className={`p-4 rounded-lg ${
                          contrastHigh
                            ? 'border-2 border-contrast-text'
                            : 'bg-white border border-blue-200'
                        }`}
                      >
                        <p className={`font-semibold ${contrastHigh ? 'text-contrast-text' : 'text-blue-700'}`}>
                          {key.replace(/_/g, ' ')}
                        </p>
                        <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Événements clés */}
              {data.summary_section.key_events && data.summary_section.key_events.length > 0 && (
                <div>
                  <h3 className={`text-2xl font-semibold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-purple-700'}`}>
                    📅 Événements Clés
                  </h3>
                  <ul className="space-y-2">
                    {data.summary_section.key_events.map((event: string, idx: number) => (
                      <li
                        key={idx}
                        className={`flex items-start space-x-3 text-lg ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}
                      >
                        <span className={`font-bold text-xl ${contrastHigh ? 'text-contrast-text' : 'text-purple-600'}`}>
                          {idx + 1}.
                        </span>
                        <span>{event}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Leçons spirituelles */}
              {data.summary_section.spiritual_lessons && data.summary_section.spiritual_lessons.length > 0 && (
                <div>
                  <h3 className={`text-2xl font-semibold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-red-700'}`}>
                    ✨ Leçons Spirituelles
                  </h3>
                  <ul className="space-y-3">
                    {data.summary_section.spiritual_lessons.map((lesson: string, idx: number) => (
                      <li
                        key={idx}
                        className={`flex items-start space-x-3 p-3 rounded-lg ${
                          contrastHigh
                            ? 'bg-contrast-bg border-l-4 border-contrast-text'
                            : 'bg-red-50 border-l-4 border-red-500'
                        }`}
                      >
                        <span className="text-xl">✝️</span>
                        <span className={`text-lg leading-relaxed ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                          {lesson.split('\n').map((line: string, lineIdx: number) => {
                            const parts = line.split(/\*\*(.+?)\*\*/g);
                            return (
                              <div key={lineIdx}>
                                {parts.map((part: string, partIdx: number) =>
                                  partIdx % 2 === 1 ? <strong key={partIdx}>{part}</strong> : part
                                )}
                              </div>
                            );
                          })}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Applications modernes */}
              {data.summary_section.modern_applications && data.summary_section.modern_applications.length > 0 && (
                <div>
                  <h3 className={`text-2xl font-semibold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-indigo-700'}`}>
                    💡 Applications Modernes
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.summary_section.modern_applications.map((app: string, idx: number) => {
                      const parts = app.split(':');
                      return (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg ${
                            contrastHigh
                              ? 'border-2 border-contrast-text'
                              : 'bg-white border-l-4 border-indigo-500'
                          }`}
                        >
                          {parts.length > 1 ? (
                            <>
                              <p className={`font-semibold mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-indigo-700'}`}>
                                {parts[0].trim()}
                              </p>
                              <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                                {parts.slice(1).join(':').trim()}
                              </p>
                            </>
                          ) : (
                            <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                              {app}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Questions de réflexion */}
              {data.summary_section.questions_for_reflection && data.summary_section.questions_for_reflection.length > 0 && (
                <div>
                  <h3 className={`text-2xl font-semibold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-orange-700'}`}>
                    🤔 Questions de Réflexion
                  </h3>
                  <ul className="space-y-2">
                    {data.summary_section.questions_for_reflection.map((question: string, idx: number) => (
                      <li
                        key={idx}
                        className={`flex items-start space-x-3 text-lg ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}
                      >
                        <span className="text-xl">❓</span>
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contexte biblique */}
              {data.summary_section.biblical_context && (
                <div
                  className={`p-4 rounded-lg ${
                    contrastHigh ? 'border-2 border-contrast-text' : 'bg-yellow-50 border-l-4 border-yellow-500'
                  }`}
                >
                  <h3 className={`text-xl font-semibold mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-yellow-700'}`}>
                    📖 Contexte Biblique
                  </h3>
                  <p className={`text-lg leading-relaxed ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                    {data.summary_section.biblical_context}
                  </p>
                </div>
              )}

              {/* Conclusion */}
              {data.summary_section.conclusion && (
                <div
                  className={`p-6 rounded-lg ${
                    contrastHigh
                      ? 'bg-contrast-bg border-2 border-contrast-text'
                      : 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300'
                  }`}
                >
                  <h3 className={`text-xl font-semibold mb-3 ${contrastHigh ? 'text-contrast-text' : 'text-blue-700'}`}>
                    🎯 Conclusion
                  </h3>
                  <p className={`text-lg leading-relaxed ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                    {data.summary_section.conclusion}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Actions */}
        <section className="flex justify-center space-x-4">
          <Link
            to={backPath}
            className={`px-6 py-3 rounded-lg font-medium ${
              contrastHigh
                ? 'bg-contrast-bg text-contrast-text border-2 border-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            {fromTimeline ? '📅 Retour à la frise chronologique' : '🏠 Retour à l\'accueil'}
          </Link>
        </section>
      </main>
    </div>
  );
}
