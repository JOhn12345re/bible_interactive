import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';
import { bibleApi, type BibleVerse } from '../services/bibleApi';
import { useFavoritesStore } from '../state/favoritesStore';
import { useVerseSearch } from '../hooks/useBibleApi';

const FRENCH_BOOKS: string[] = [
  // Ancien Testament
  'Genèse',
  'Exode',
  'Lévitique',
  'Nombres',
  'Deutéronome',
  'Josué',
  'Juges',
  'Ruth',
  '1 Samuel',
  '2 Samuel',
  '1 Rois',
  '2 Rois',
  '1 Chroniques',
  '2 Chroniques',
  'Esdras',
  'Néhémie',
  'Esther',
  'Job',
  'Psaumes',
  'Proverbes',
  'Ecclésiaste',
  'Cantique des Cantiques',
  'Isaïe',
  'Jérémie',
  'Lamentations',
  'Ézéchiel',
  'Daniel',
  'Osée',
  'Joël',
  'Amos',
  'Abdias',
  'Jonas',
  'Michée',
  'Nahum',
  'Habacuc',
  'Sophonie',
  'Aggée',
  'Zacharie',
  'Malachie',
  // Nouveau Testament
  'Matthieu',
  'Marc',
  'Luc',
  'Jean',
  'Actes',
  'Romains',
  '1 Corinthiens',
  '2 Corinthiens',
  'Galates',
  'Éphésiens',
  'Philippiens',
  'Colossiens',
  '1 Thessaloniciens',
  '2 Thessaloniciens',
  '1 Timothée',
  '2 Timothée',
  'Tite',
  'Philémon',
  'Hébreux',
  'Jacques',
  '1 Pierre',
  '2 Pierre',
  '1 Jean',
  '2 Jean',
  '3 Jean',
  'Jude',
  'Apocalypse',
];

export default function BibleExplorer() {
  const { contrastHigh } = useSettings();
  const [searchParams] = useSearchParams();
  const [book, setBook] = useState<string>('Genèse');
  const [chapter, setChapter] = useState<number>(1);
  const [start, setStart] = useState<number>(1);
  const [end, setEnd] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [activeTab, setActiveTab] = useState<'browse' | 'search'>('browse');
  const [searchTerm, setSearchTerm] = useState('');

  const addFavorite = useFavoritesStore((s) => s.addFavorite);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);

  // Hook de recherche
  const {
    verses: searchVerses,
    loading: searchLoading,
    error: searchError,
    searchHistory,
    searchVerse,
    clearError: clearSearchError,
  } = useVerseSearch();

  const isDemo = !import.meta.env.VITE_BIBLE_API_KEY;

  const chaptersList = useMemo(
    () => Array.from({ length: 150 }, (_, i) => i + 1),
    []
  );

  // Fonction de recherche
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    clearSearchError();
    await searchVerse(searchTerm.trim());
  };

  // Versets populaires pour suggestions
  const popularVerses = [
    'Jean 3:16',
    'Psaume 23:1',
    'Matthieu 28:19-20',
    'Romains 8:28',
    'Philippiens 4:13',
    'Genèse 1:1',
    'Esaïe 40:31',
  ];

  // Initialisation des paramètres URL book et chapter
  useEffect(() => {
    const urlBook = searchParams.get('book');
    const urlChapter = searchParams.get('chapter');
    const urlVerse = searchParams.get('verse');
    
    if (urlBook && FRENCH_BOOKS.includes(urlBook)) {
      setBook(urlBook);
    }
    
    if (urlChapter) {
      const chapterNum = parseInt(urlChapter);
      if (!isNaN(chapterNum) && chapterNum > 0) {
        setChapter(chapterNum);
      }
    }
    
    if (urlVerse) {
      const verseNum = parseInt(urlVerse);
      if (!isNaN(verseNum) && verseNum > 0) {
        setStart(verseNum);
        setEnd(verseNum + 10); // Afficher 10 versets à partir du verset spécifié
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchVerses = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await bibleApi.getVersesDefault(book, chapter, start, end);
        setVerses(data);
      } catch (err) {
        setError('Erreur de chargement des versets');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVerses();
  }, [book, chapter, start, end]);

  // Activer l'onglet Recherche via le paramètre d'URL `?tab=search`
  useEffect(() => {
    const tab = searchParams.get('tab')?.toLowerCase();
    if (tab === 'search' && activeTab !== 'search') {
      setActiveTab('search');
    }

    // Pré-remplir la recherche et lancer automatiquement si `?q=` est fourni
    const q = searchParams.get('q');
    if (q && q.trim()) {
      setSearchTerm(q);
      // lancer une recherche sans soumettre le formulaire
      clearSearchError();
      searchVerse(q.trim());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen">
      {isDemo && (
        <div className="text-center text-xs sm:text-sm py-2 px-4 bg-amber-50 text-amber-800 border-b border-amber-200">
          Mode démo: affichage basé sur données locales si l'API n'est pas
          configurée. Consultez docs/API_BIBLE_GUIDE.md
        </div>
      )}
      <header
        className={`sticky top-0 z-30 border-b ${
          contrastHigh
            ? 'bg-contrast-bg border-contrast-text'
            : 'bg-white border-gray-200'
        }`}
      >
        <div className="max-w-6xl mx-auto px-responsive py-3 sm:py-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link
              to="/"
              className={`text-sm sm:text-base ${contrastHigh ? 'text-contrast-text' : 'text-blue-600'}`}
            >
              ← Accueil
            </Link>
            <h1
              className={`text-lg sm:text-xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}
            >
              Explorateur de la Bible (LSG)
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-responsive py-responsive">
        {/* Onglets de navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('browse')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'browse'
                  ? contrastHigh
                    ? 'bg-contrast-text text-contrast-bg'
                    : 'bg-white text-blue-600 shadow-sm'
                  : contrastHigh
                    ? 'text-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📖 Parcourir
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'search'
                  ? contrastHigh
                    ? 'bg-contrast-text text-contrast-bg'
                    : 'bg-white text-blue-600 shadow-sm'
                  : contrastHigh
                    ? 'text-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🔍 Rechercher
            </button>
          </div>
        </div>

        {/* Contenu conditionnel selon l'onglet actif */}
        {activeTab === 'browse' ? (
          <>
            {/* Contrôles rapides */}
            <div className="mb-4">
              {/* Version mobile - contrôles compacts */}
              <div className="sm:hidden">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <button
                    onClick={() => setChapter(Math.max(1, chapter - 1))}
                    className="px-2 py-1 rounded border bg-gray-50 text-xs"
                  >
                    ⟨ Chapitre
                  </button>
                  <button
                    onClick={() => setChapter(chapter + 1)}
                    className="px-2 py-1 rounded border bg-gray-50 text-xs"
                  >
                    Chapitre ⟩
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      const s = Math.max(1, start - 5 || 1);
                      setStart(s);
                      setEnd(Math.max(s, end - 5));
                    }}
                    className="px-2 py-1 rounded border bg-gray-50 text-xs"
                  >
                    −5 versets
                  </button>
                  <button
                    onClick={() => {
                      const s = start + 5;
                      setStart(s);
                      setEnd(end + 5);
                    }}
                    className="px-2 py-1 rounded border bg-gray-50 text-xs"
                  >
                    +5 versets
                  </button>
                  <button
                    onClick={() => {
                      setStart(1);
                      setEnd(10);
                    }}
                    className="px-2 py-1 rounded border bg-gray-50 text-xs"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Version desktop - contrôles complets */}
              <div className="hidden sm:flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setChapter(Math.max(1, chapter - 1))}
                  className="px-3 py-1 rounded border bg-gray-50 text-sm"
                >
                  ⟨ Chapitre
                </button>
                <button
                  onClick={() => setChapter(chapter + 1)}
                  className="px-3 py-1 rounded border bg-gray-50 text-sm"
                >
                  Chapitre ⟩
                </button>
                <span className="mx-2 text-gray-500 text-sm">|</span>
                <button
                  onClick={() => {
                    const s = Math.max(1, start - 5 || 1);
                    setStart(s);
                    setEnd(Math.max(s, end - 5));
                  }}
                  className="px-3 py-1 rounded border bg-gray-50 text-sm"
                >
                  −5 versets
                </button>
                <button
                  onClick={() => {
                    const s = start + 5;
                    setStart(s);
                    setEnd(end + 5);
                  }}
                  className="px-3 py-1 rounded border bg-gray-50 text-sm"
                >
                  +5 versets
                </button>
                <span className="mx-2 text-gray-500 text-sm">|</span>
                <button
                  onClick={() => {
                    setStart(1);
                    setEnd(10);
                  }}
                  className="px-3 py-1 rounded border bg-gray-50 text-sm"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
            <section
              className={`p-responsive rounded-xl mb-6 ${
                contrastHigh
                  ? 'bg-contrast-bg border-2 border-contrast-text'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm mb-1">Livre</label>
                  <select
                    value={book}
                    onChange={(e) => setBook(e.target.value)}
                    className={`w-full p-2 sm:p-3 rounded border text-sm sm:text-base ${contrastHigh ? 'bg-contrast-bg border-contrast-text' : 'bg-white border-gray-300'}`}
                  >
                    {FRENCH_BOOKS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Chapitre</label>
                  <select
                    value={chapter}
                    onChange={(e) => setChapter(parseInt(e.target.value))}
                    className={`w-full p-2 sm:p-3 rounded border text-sm sm:text-base ${contrastHigh ? 'bg-contrast-bg border-contrast-text' : 'bg-white border-gray-300'}`}
                  >
                    {chaptersList.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Verset début</label>
                  <input
                    type="number"
                    min={1}
                    value={start}
                    onChange={(e) => setStart(parseInt(e.target.value) || 1)}
                    className={`w-full p-2 sm:p-3 rounded border text-sm sm:text-base ${contrastHigh ? 'bg-contrast-bg border-contrast-text' : 'bg-white border-gray-300'}`}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Verset fin</label>
                  <input
                    type="number"
                    min={start}
                    value={end}
                    onChange={(e) => setEnd(parseInt(e.target.value) || start)}
                    className={`w-full p-2 sm:p-3 rounded border text-sm sm:text-base ${contrastHigh ? 'bg-contrast-bg border-contrast-text' : 'bg-white border-gray-300'}`}
                  />
                </div>
              </div>
            </section>

            <section>
              {loading && (
                <div className="animate-pulse">
                  <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              )}
              {error && (
                <div className="p-responsive rounded bg-red-50 text-red-700 border border-red-200 text-sm sm:text-base">
                  {error}
                </div>
              )}
              {!loading && !error && verses.length === 0 && (
                <div className="p-responsive rounded bg-yellow-50 text-yellow-800 border border-yellow-200 text-sm sm:text-base">
                  Aucun verset trouvé.
                </div>
              )}
              <div className="space-y-4">
                {verses.map((v, idx) => {
                  const fav = isFavorite(
                    book,
                    v.chapter,
                    v.verse_start,
                    v.verse_end
                  );
                  const id = `${book}|${v.chapter}|${v.verse_start ?? ''}-${v.verse_end ?? ''}`;
                  const handleCopy = async () => {
                    const ref = `${book} ${v.chapter}:${v.verse_start}${v.verse_end ? `-${v.verse_end}` : ''}`;
                    const text = `${ref} — ${v.verse_text}`;
                    try {
                      await navigator.clipboard.writeText(text);
                    } catch (e) {
                      console.warn('Copie impossible', e);
                    }
                  };
                  const handleShare = async () => {
                    const ref = `${book} ${v.chapter}:${v.verse_start}${v.verse_end ? `-${v.verse_end}` : ''}`;
                    const title = `Bible LSG — ${ref}`;
                    const text = `${ref} — ${v.verse_text}`;
                    if (navigator.share) {
                      try {
                        await navigator.share({ title, text });
                      } catch (e) {
                        console.warn('Partage impossible', e);
                      }
                    } else {
                      try {
                        await navigator.clipboard.writeText(text);
                      } catch (e) {
                        console.warn('Copie impossible', e);
                      }
                    }
                  };
                  const toggleFav = () => {
                    if (fav) removeFavorite(id);
                    else
                      addFavorite({
                        book,
                        chapter: v.chapter,
                        verseStart: v.verse_start,
                        verseEnd: v.verse_end,
                        text: v.verse_text,
                      });
                  };
                  return (
                    <div
                      key={idx}
                      className={`p-responsive rounded ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white border border-gray-200'}`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="text-xs sm:text-sm text-gray-500 mb-2">
                            {book} {v.chapter}:{v.verse_start}
                            {v.verse_end ? `-${v.verse_end}` : ''}
                          </div>
                          <div className="text-base sm:text-lg leading-relaxed">
                            {v.verse_text}
                          </div>
                        </div>
                        <div className="flex-shrink-0 flex flex-wrap items-center gap-2">
                          <button
                            onClick={handleCopy}
                            className="text-xs sm:text-sm px-2 py-1 rounded border bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            Copier
                          </button>
                          <button
                            onClick={handleShare}
                            className="text-xs sm:text-sm px-2 py-1 rounded border bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            Partager
                          </button>
                          <button
                            onClick={toggleFav}
                            className={`text-xs sm:text-sm px-2 py-1 rounded border transition-colors ${fav ? 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200' : 'bg-gray-50 hover:bg-gray-100'}`}
                          >
                            {fav ? '★ Favori' : '☆ Favori'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        ) : (
          /* Interface de recherche */
          <div className="space-y-6">
            {/* Formulaire de recherche */}
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Ex: Jean 3:16, Psaume 23:1-3..."
                  className={`flex-1 px-4 py-3 rounded-xl border-2 transition-colors ${
                    contrastHigh
                      ? 'bg-contrast-bg text-contrast-text border-contrast-text'
                      : 'bg-gray-50 border-gray-200 focus:border-blue-400 focus:bg-white'
                  }`}
                />
                <button
                  type="submit"
                  disabled={!searchTerm.trim() || searchLoading}
                  className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                    contrastHigh
                      ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                      : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300'
                  }`}
                >
                  {searchLoading ? '🔄' : '🔍'}
                </button>
              </div>
            </form>

            {/* Versets populaires */}
            <div>
              <h3
                className={`text-sm font-medium mb-2 ${
                  contrastHigh ? 'text-contrast-text' : 'text-gray-700'
                }`}
              >
                Versets populaires :
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularVerses.map((verse) => (
                  <button
                    key={verse}
                    onClick={() => {
                      setSearchTerm(verse);
                      searchVerse(verse);
                    }}
                    className={`px-3 py-1 rounded-full text-xs transition-colors ${
                      contrastHigh
                        ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    {verse}
                  </button>
                ))}
              </div>
            </div>

            {/* Historique de recherche */}
            {searchHistory.length > 0 && (
              <div>
                <h3
                  className={`text-sm font-medium mb-2 ${
                    contrastHigh ? 'text-contrast-text' : 'text-gray-700'
                  }`}
                >
                  Recherches récentes :
                </h3>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.slice(0, 5).map((historyItem, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchTerm(historyItem);
                        searchVerse(historyItem);
                      }}
                      className={`px-3 py-1 rounded-full text-xs transition-colors ${
                        contrastHigh
                          ? 'bg-contrast-bg border border-contrast-text text-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {historyItem}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Erreur de recherche */}
            {searchError && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <p className="text-red-700 text-sm">{searchError}</p>
                <button
                  onClick={clearSearchError}
                  className="text-red-600 text-xs underline mt-1"
                >
                  Effacer
                </button>
              </div>
            )}

            {/* Résultats de recherche */}
            {searchLoading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p
                  className={`mt-2 text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}
                >
                  Recherche en cours...
                </p>
              </div>
            )}

            {searchVerses.length > 0 && !searchLoading && (
              <div className="space-y-4">
                <h3
                  className={`text-lg font-semibold ${
                    contrastHigh ? 'text-contrast-text' : 'text-gray-800'
                  }`}
                >
                  Résultats de recherche ({searchVerses.length})
                </h3>

                {searchVerses.map((verse, index) => {
                  const fav = isFavorite(
                    verse.book_id,
                    verse.chapter,
                    verse.verse_start
                  );

                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border ${
                        contrastHigh
                          ? 'bg-contrast-bg border-contrast-text'
                          : 'bg-white border-gray-200 shadow-sm'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1">
                          <div
                            className={`text-sm font-medium mb-2 ${
                              contrastHigh
                                ? 'text-contrast-text'
                                : 'text-blue-600'
                            }`}
                          >
                            {verse.book_id} {verse.chapter}:{verse.verse_start}
                          </div>
                          <p
                            className={`text-sm sm:text-base leading-relaxed ${
                              contrastHigh
                                ? 'text-contrast-text'
                                : 'text-gray-700'
                            }`}
                          >
                            {verse.verse_text}
                          </p>
                        </div>
                        <div className="flex-shrink-0 flex flex-wrap items-center gap-2">
                          <button
                            onClick={() =>
                              navigator.clipboard.writeText(
                                `${verse.book_id} ${verse.chapter}:${verse.verse_start} - ${verse.verse_text}`
                              )
                            }
                            className="text-xs sm:text-sm px-2 py-1 rounded border bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            Copier
                          </button>
                          <button
                            onClick={() => {
                              const favoriteId = `${verse.book_id}|${verse.chapter}|${verse.verse_start}-`;
                              if (fav) {
                                removeFavorite(favoriteId);
                              } else {
                                addFavorite({
                                  book: verse.book_id,
                                  chapter: verse.chapter,
                                  verseStart: verse.verse_start,
                                  text: verse.verse_text,
                                });
                              }
                            }}
                            className={`text-xs sm:text-sm px-2 py-1 rounded border transition-colors ${
                              fav
                                ? 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200'
                                : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                          >
                            {fav ? '★ Favori' : '☆ Favori'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
