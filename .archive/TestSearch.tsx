import React, { useState } from 'react';
import { useVerseSearch } from '../hooks/useBibleApi';

const TestSearch: React.FC = () => {
  const [testReference, setTestReference] = useState('Jean 3:16');
  const { verses, loading, error, searchVerse, clearError } = useVerseSearch();

  const handleTest = async () => {
    clearError();
    await searchVerse(testReference);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        🧪 Test de recherche de versets
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Référence à tester :
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={testReference}
              onChange={(e) => setTestReference(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Ex: Jean 3:16, Psaume 23:1"
            />
            <button
              onClick={handleTest}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Recherche...' : 'Tester'}
            </button>
          </div>
        </div>

        {/* Suggestions de test */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Suggestions à tester :</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Jean 3:16',
              'Psaume 23:1',
              'Genèse 1:1',
              'Matthieu 5:3',
              'Romains 8:28',
            ].map((ref) => (
              <button
                key={ref}
                onClick={() => setTestReference(ref)}
                className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
              >
                {ref}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">❌ Erreur: {error}</p>
          </div>
        )}

        {loading && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-700 text-sm">🔄 Recherche en cours...</p>
          </div>
        )}

        {verses.length > 0 && !loading && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">
              ✅ Résultats ({verses.length}) :
            </h3>
            {verses.map((verse, index) => (
              <div
                key={index}
                className="p-4 bg-green-50 border border-green-200 rounded-md"
              >
                <div className="font-medium text-green-800 mb-1">
                  {verse.book_id} {verse.chapter}:{verse.verse_start}
                </div>
                <p className="text-gray-700">{verse.verse_text}</p>
              </div>
            ))}
          </div>
        )}

        {verses.length === 0 && !loading && !error && testReference && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-yellow-700 text-sm">
              ⚠️ Aucun résultat trouvé pour "{testReference}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestSearch;
