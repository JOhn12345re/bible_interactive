import { useState } from 'react';
import { useSettings } from '../state/settingsStore';
import { useVerseSearch } from '../hooks/useBibleApi';
import BibleVerseComponent from './BibleVerse';
import LoadingSpinner from './LoadingSpinner';

type Props = {
  onClose?: () => void;
  className?: string;
};

export default function VerseSearch({ onClose, className = '' }: Props) {
  const { contrastHigh } = useSettings();
  const [searchTerm, setSearchTerm] = useState('');
  const { verses, loading, error, searchHistory, searchVerse, clearError } =
    useVerseSearch();
  const isDemo = !import.meta.env.VITE_BIBLE_API_KEY;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    clearError();
    await searchVerse(searchTerm.trim());
  };

  const handleHistoryClick = (reference: string) => {
    setSearchTerm(reference);
    searchVerse(reference);
  };

  const popularVerses = [
    'Jean 3:16',
    'Psaume 23:1',
    'Matthieu 28:19-20',
    'Romains 8:28',
    'Philippiens 4:13',
    'Genèse 1:1',
    'Jonas 2:9',
  ];

  return (
    <div className={`${className}`}>
      <div
        className={`rounded-2xl p-6 ${
          contrastHigh
            ? 'bg-contrast-bg border-2 border-contrast-text'
            : 'bg-white shadow-xl border border-gray-200'
        }`}
      >
        {/* Bandeau Mode Démo */}
        {isDemo && (
          <div className="mb-4 p-3 rounded-lg border text-sm bg-amber-50 border-amber-200 text-amber-800">
            Mode démo: les données affichées peuvent être locales. Ajoutez une
            clé dans .env.local pour activer l'API.
          </div>
        )}

        {/* En-tête */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🔍</span>
            <h2
              className={`text-xl font-bold ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-800'
              }`}
            >
              Recherche de versets
            </h2>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                contrastHigh
                  ? 'text-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              ✕
            </button>
          )}
        </div>

        {/* Formulaire de recherche */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex space-x-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ex: Jean 3:16, Psaume 23:1-3..."
              list="verse-books"
              className={`flex-1 px-4 py-3 rounded-xl border-2 transition-colors ${
                contrastHigh
                  ? 'bg-contrast-bg text-contrast-text border-contrast-text'
                  : 'bg-gray-50 border-gray-200 focus:border-blue-400 focus:bg-white'
              }`}
            />
            <datalist id="verse-books">
              <option value="Genèse" />
              <option value="Psaume" />
              <option value="Jean" />
              <option value="Matthieu" />
              <option value="Romains" />
              <option value="Philippiens" />
              <option value="Luc" />
              <option value="Actes" />
            </datalist>
            <button
              type="submit"
              disabled={loading || !searchTerm.trim()}
              className={`px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 ${
                contrastHigh
                  ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {loading ? '🔄' : '🔍'}
            </button>
          </div>
        </form>

        {/* Versets populaires */}
        <div className="mb-6">
          <h3
            className={`text-sm font-semibold mb-3 ${
              contrastHigh ? 'text-contrast-text' : 'text-gray-600'
            }`}
          >
            Versets populaires :
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularVerses.map((verse) => (
              <button
                key={verse}
                onClick={() => handleHistoryClick(verse)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all hover:scale-105 ${
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
          <div className="mb-6">
            <h3
              className={`text-sm font-semibold mb-3 ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-600'
              }`}
            >
              Recherches récentes :
            </h3>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((reference, index) => (
                <button
                  key={`${reference}-${index}`}
                  onClick={() => handleHistoryClick(reference)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                    contrastHigh
                      ? 'bg-contrast-bg border border-contrast-text text-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {reference}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* État de chargement */}
        {loading && (
          <div className="my-6">
            <LoadingSpinner size="sm" message="Recherche en cours..." />
          </div>
        )}

        {/* Résultats */}
        {verses.length > 0 && !loading && (
          <div className="mt-6">
            <BibleVerseComponent verses={verses} showReference={true} />
          </div>
        )}

        {/* Gestion des erreurs */}
        {error && !loading && (
          <div
            className={`mt-6 p-4 rounded-xl border-2 border-dashed ${
              contrastHigh
                ? 'border-contrast-text text-contrast-text bg-contrast-bg'
                : 'border-yellow-300 bg-yellow-50 text-yellow-800'
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className="text-xl">⚠️</span>
              <span className="font-medium">{error}</span>
            </div>
            <p className="text-sm mt-2 opacity-80">
              Vérifiez la référence (ex: "Jean 3:16" ou "Psaume 23:1-3")
            </p>
          </div>
        )}

        {/* Instructions d'utilisation */}
        {!verses.length && !loading && !error && (
          <div
            className={`mt-6 p-4 rounded-xl ${
              contrastHigh
                ? 'bg-contrast-bg border border-contrast-text'
                : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200'
            }`}
          >
            <h4
              className={`font-semibold mb-2 ${
                contrastHigh ? 'text-contrast-text' : 'text-blue-800'
              }`}
            >
              Comment rechercher un verset :
            </h4>
            <ul
              className={`text-sm space-y-1 ${
                contrastHigh ? 'text-contrast-text' : 'text-blue-700'
              }`}
            >
              <li>• Un verset : "Jean 3:16"</li>
              <li>• Plusieurs versets : "Psaume 23:1-3"</li>
              <li>• Un chapitre : "Genèse 1"</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
