import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProgress } from '../state/progressStore';
import { useSettings } from '../state/settingsStore';
import PhaserGame from '../components/PhaserGame';
import BibleVerseComponent from '../components/BibleVerse';
import GreekText from '../components/GreekText';
import LoadingSpinner from '../components/LoadingSpinner';
import { LessonData } from '../phaser/types';

export default function Lesson() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState<string | null>(null);
  const [selectedGameType, setSelectedGameType] = useState<'order_events' | 'quiz'>('order_events');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'normal' | 'hard'>('normal');
  
  const { markDone, isCompleted } = useProgress();
  const { contrastHigh } = useSettings();
  const completed = id ? isCompleted(id) : false;

  useEffect(() => {
    if (!id) {
      setError('ID de leçon manquant');
      setLoading(false);
      return;
    }

    // Charger les données de la leçon depuis le bon dossier
    const loadLessonData = async (lessonId: string) => {
      // Définir le mapping des leçons vers leurs dossiers
      const lessonFolders: Record<string, string> = {
        'jonas_01': 'prophetiques',
        'jonas_02_fuite': 'prophetiques', 
        'jonas_03_ninive': 'prophetiques',
        'jonas_04_ricin': 'prophetiques',
        'daniel_01': 'historiques',
        'david_01': 'historiques',
        'josue_01': 'historiques',
        'creation_01': 'pentateuque',
        'noe_01': 'pentateuque',
        'moise_01': 'pentateuque',
        'naissance_jesus': 'nouveau_testament',
      };
      
      const folder = lessonFolders[lessonId] || '';
      const path = folder ? `/src/content/${folder}/${lessonId}.json` : `/src/content/${lessonId}.json`;
      
      return fetch(path);
    };
    
    loadLessonData(id)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Leçon non trouvée: ${response.status}`);
        }
        return response.json();
      })
      .then((lessonData: LessonData) => {
        setData(lessonData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur de chargement:', err);
        setError('Impossible de charger la leçon');
        setLoading(false);
      });
  }, [id]);

  const handleGameComplete = (payload: { badge: string }) => {
    if (!id || gameCompleted) return;
    
    setGameCompleted(true);
    setEarnedBadge(payload.badge);
    markDone(id, payload.badge);
    
    // Animation de célébration
    setTimeout(() => {
      alert(`🎉 Félicitations ! Tu as obtenu le badge : ${payload.badge}`);
    }, 500);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}>
        <LoadingSpinner size="lg" message="Chargement de la leçon..." />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-4">Erreur</h1>
          <p className="text-lg mb-6">{error}</p>
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

  return (
    <div className="min-h-screen">
      {/* En-tête */}
      <header className={`shadow-sm ${
        contrastHigh ? 'bg-contrast-bg border-b-2 border-contrast-text' : 'bg-white'
      }`}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className={`text-2xl hover:opacity-70 ${
                  contrastHigh ? 'text-contrast-text' : 'text-blue-500'
                }`}
                aria-label="Retour à l'accueil"
              >
                ←
              </Link>
              <div>
                <h1 className="text-2xl font-bold">{data.title}</h1>
                <p className={`text-sm ${
                  contrastHigh ? 'text-contrast-text' : 'text-gray-600'
                }`}>
                  📖 {data.path}
                </p>
              </div>
            </div>
            
            {completed && (
              <div className={`flex items-center space-x-2 ${
                contrastHigh ? 'text-contrast-text' : 'text-green-600'
              }`}>
                <span className="text-2xl">✅</span>
                <span className="font-medium">Terminé</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Lecture guidée */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">📚 L'Histoire</h2>
          <div className={`rounded-lg p-6 space-y-4 ${
            contrastHigh 
              ? 'bg-contrast-bg border-2 border-contrast-text'
              : 'bg-white border border-gray-200'
          }`}>
            {data.reading.map((paragraph, index) => (
              <p 
                key={index} 
                className={`text-lg leading-relaxed ${
                  contrastHigh ? 'text-contrast-text' : 'text-gray-800'
                }`}
              >
                {paragraph}
              </p>
            ))}
            
            <div className={`mt-6 p-4 rounded-lg italic text-center ${
              contrastHigh 
                ? 'border-2 border-contrast-text'
                : 'bg-blue-50 border border-blue-200'
            }`}>
              <span className="text-lg">
                "
              </span>
              {data.key_verse}
              <span className="text-lg">
                "
              </span>
            </div>
          </div>
        </section>

        {/* Versets bibliques authentiques */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">📜 Textes sacrés</h2>
          <BibleVerseComponent lessonId={id || ''} className="animate-slide-up" />
        </section>

        {/* Texte grec LXX selon le livre de la leçon */}
        {(() => {
          const greekBookMap: Record<string, string> = {
            'Genèse': 'genesis',
            'Jonas': 'jonas',
          };
          const greekBook = data.book ? greekBookMap[data.book] : undefined;
          if (!greekBook) return null;
          const ref = greekBook === 'genesis' ? { chapter: 1, start: 1, end: 3 } : { chapter: 1, start: 1, end: 3 };
          return (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6">🇬🇷 Texte grec (Septante)</h2>
            <div className={`rounded-lg p-6 ${
              contrastHigh 
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-white border border-gray-200'
            }`}>
              <GreekText 
                book={greekBook}
                chapter={ref.chapter}
                verseStart={ref.start}
                verseEnd={ref.end}
                showTransliteration={true}
                showComparison={true}
                className="animate-slide-up"
              />
            </div>
          </section>
          );
        })()}

        {/* Vocabulaire */}
        {data.vocab && data.vocab.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6">📝 Vocabulaire</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.vocab.map((item, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg ${
                    contrastHigh 
                      ? 'bg-contrast-bg border-2 border-contrast-text'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <h3 className="font-bold text-lg mb-2">{item.word}</h3>
                  <p className={`${
                    contrastHigh ? 'text-contrast-text' : 'text-gray-600'
                  }`}>
                    {item.hint}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Mini-jeu */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">🎮 Mini-jeu</h2>
            {gameCompleted && earnedBadge && (
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                contrastHigh 
                  ? 'bg-contrast-text text-contrast-bg'
                  : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
              }`}>
                <span>🏆</span>
                <span className="font-medium">{earnedBadge}</span>
              </div>
            )}
          </div>
          
          {!showGame ? (
            <div className={`text-center py-12 rounded-lg border-2 ${
              contrastHigh 
                ? 'border-contrast-text bg-contrast-bg'
                : 'border-gray-300 bg-gray-50'
            }`}>
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-4">
                Choisis ton mini-jeu
              </h3>
              
              {/* Sélecteur de jeu */}
              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={() => setSelectedGameType('order_events')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedGameType === 'order_events'
                      ? contrastHigh
                        ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text'
                        : 'bg-blue-500 text-white'
                      : contrastHigh
                      ? 'bg-contrast-bg text-contrast-text border-2 border-contrast-text'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  🔄 Remettre en ordre
                </button>
                <button
                  onClick={() => setSelectedGameType('quiz')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedGameType === 'quiz'
                      ? contrastHigh
                        ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text'
                        : 'bg-blue-500 text-white'
                      : contrastHigh
                      ? 'bg-contrast-bg text-contrast-text border-2 border-contrast-text'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  🧠 Quiz interactif
                </button>
              </div>

              {/* Sélecteur de difficulté */}
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3">Niveau de difficulté :</h4>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setSelectedDifficulty('easy')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedDifficulty === 'easy'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    😊 Facile
                  </button>
                  <button
                    onClick={() => setSelectedDifficulty('normal')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedDifficulty === 'normal'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    🙂 Normal
                  </button>
                  <button
                    onClick={() => setSelectedDifficulty('hard')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedDifficulty === 'hard'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    😤 Difficile
                  </button>
                </div>
                <p className="text-sm mt-2 text-center text-gray-500">
                  {selectedDifficulty === 'easy' && '3 cartes, plus de temps'}
                  {selectedDifficulty === 'normal' && '4 cartes, temps normal'}
                  {selectedDifficulty === 'hard' && '6 cartes, moins de temps'}
                </p>
              </div>

              <p className={`mb-6 ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-600'
              }`}>
                {selectedGameType === 'order_events' 
                  ? 'Glisse et dépose les cartes pour reconstituer l\'histoire.'
                  : 'Réponds aux questions sur l\'histoire que tu viens de lire.'
                }
              </p>
              
              <button
                onClick={() => setShowGame(true)}
                className={`px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 ${
                  contrastHigh
                    ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
                    : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg'
                }`}
              >
                🚀 Commencer le jeu
              </button>
            </div>
          ) : (
          <div className={`rounded-lg overflow-hidden ${
            contrastHigh ? 'border-2 border-contrast-text' : 'border border-gray-300'
          }`}>
            <PhaserGame 
              onComplete={handleGameComplete}
              lessonData={data}
              gameType={selectedGameType}
              difficulty={selectedDifficulty}
              width={1280}
              height={720}
            />
          </div>
          )}
        </section>

        {/* Actions */}
        <section className="flex justify-center space-x-4">
          <Link 
            to="/"
            className={`px-6 py-3 rounded-lg font-medium ${
              contrastHigh
                ? 'bg-contrast-bg text-contrast-text border-2 border-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            🏠 Retour à l'accueil
          </Link>
          
          {gameCompleted && (
            <button
              onClick={() => {
                setShowGame(false);
                setGameCompleted(false);
                setEarnedBadge(null);
              }}
              className={`px-6 py-3 rounded-lg font-medium ${
                contrastHigh
                  ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              🔄 Rejouer
            </button>
          )}
        </section>
      </main>
    </div>
  );
}
