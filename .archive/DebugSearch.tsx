import React, { useState } from 'react';
import { bibleApi } from '../services/bibleApi';
import { useVerseSearch } from '../hooks/useBibleApi';

export default function DebugSearch() {
  const [query, setQuery] = useState('');
  const [directApiResult, setDirectApiResult] = useState<any>(null);
  const [directApiError, setDirectApiError] = useState<string>('');
  const [directApiLoading, setDirectApiLoading] = useState(false);

  // Hook de recherche
  const {
    verses: hookResults,
    loading: hookLoading,
    error: hookError,
    searchVerse,
    clearError,
  } = useVerseSearch();

  const testDirectApi = async () => {
    if (!query.trim()) return;

    setDirectApiLoading(true);
    setDirectApiError('');
    setDirectApiResult(null);

    try {
      console.log('🔍 Test direct API pour:', query);
      const result = await bibleApi.getVerseByReference(query);
      console.log('📝 Résultat direct API:', result);
      setDirectApiResult(result);
    } catch (err) {
      console.error('❌ Erreur API directe:', err);
      setDirectApiError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setDirectApiLoading(false);
    }
  };

  const testHookApi = async () => {
    if (!query.trim()) return;

    clearError();
    console.log('🔍 Test hook pour:', query);
    await searchVerse(query);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          🔍 Debug Recherche Bible
        </h1>
        <p className="text-gray-600">
          Test de la fonctionnalité de recherche de versets
        </p>
      </div>

      {/* Contrôles de test */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">🧪 Tests</h2>

        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex: Jean 3:16, Psaume 23:1, Romains 8:28..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && testDirectApi()}
            />
            <button
              onClick={testDirectApi}
              disabled={directApiLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {directApiLoading ? '⏳' : '🧪 Test Direct API'}
            </button>
            <button
              onClick={testHookApi}
              disabled={hookLoading}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {hookLoading ? '⏳' : '🔗 Test Hook'}
            </button>
          </div>

          {/* Boutons de test rapide */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 font-medium">
              Tests rapides:
            </span>
            {[
              'Jean 3:16',
              'Psaume 23:1',
              'Romains 8:28',
              'Matthieu 5:3',
              'Genèse 1:1',
            ].map((testQuery) => (
              <button
                key={testQuery}
                onClick={() => {
                  setQuery(testQuery);
                  setTimeout(() => testDirectApi(), 100);
                }}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors"
              >
                {testQuery}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Résultats côte à côte */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test Direct API */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-600">
            🧪 Test Direct API
          </h3>

          {directApiError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700">
              ❌ <strong>Erreur:</strong> {directApiError}
            </div>
          )}

          {directApiResult && (
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <div className="font-medium text-green-800">
                  ✅ Verset trouvé
                </div>
                <div className="mt-2">
                  <div className="text-sm text-gray-600">Référence:</div>
                  <div className="font-medium text-blue-600">
                    {directApiResult.book_id} {directApiResult.chapter}:
                    {directApiResult.verse_start}
                    {directApiResult.verse_end &&
                    directApiResult.verse_end !== directApiResult.verse_start
                      ? `-${directApiResult.verse_end}`
                      : ''}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">Texte:</div>
                  <div className="bg-gray-50 p-2 rounded italic">
                    "{directApiResult.verse_text}"
                  </div>
                </div>
              </div>
            </div>
          )}

          {directApiResult === null &&
            query &&
            !directApiLoading &&
            !directApiError && (
              <div className="p-3 bg-yellow-100 border border-yellow-300 rounded text-yellow-700">
                ⚠️ Aucun résultat trouvé
              </div>
            )}
        </div>

        {/* Test Hook */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-green-600">
            🔗 Test Hook
          </h3>

          {hookError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700">
              ❌ <strong>Erreur:</strong> {hookError}
            </div>
          )}

          {hookResults.length > 0 && (
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <div className="font-medium text-green-800">
                  ✅ {hookResults.length} verset(s) trouvé(s)
                </div>
                {hookResults.map((verse, index) => (
                  <div key={index} className="mt-2">
                    <div className="text-sm text-gray-600">Référence:</div>
                    <div className="font-medium text-blue-600">
                      {verse.book_id} {verse.chapter}:{verse.verse_start}
                      {verse.verse_end && verse.verse_end !== verse.verse_start
                        ? `-${verse.verse_end}`
                        : ''}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">Texte:</div>
                    <div className="bg-gray-50 p-2 rounded italic">
                      "{verse.verse_text}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hookResults.length === 0 && query && !hookLoading && !hookError && (
            <div className="p-3 bg-yellow-100 border border-yellow-300 rounded text-yellow-700">
              ⚠️ Aucun résultat trouvé via le hook
            </div>
          )}
        </div>
      </div>

      {/* Console de debug */}
      <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm">
        <div className="mb-2 text-gray-400">
          Console de debug (ouvrez les DevTools pour plus de détails):
        </div>
        <div>
          📊 Status: {directApiLoading || hookLoading ? 'En cours...' : 'Prêt'}
        </div>
        <div>🔍 Dernière recherche: {query || 'Aucune'}</div>
        <div>
          📝 Résultats API directe: {directApiResult ? 'Trouvé' : 'Aucun'}
        </div>
        <div>
          📝 Résultats Hook:{' '}
          {hookResults.length > 0 ? `${hookResults.length} trouvé(s)` : 'Aucun'}
        </div>
      </div>
    </div>
  );
}
