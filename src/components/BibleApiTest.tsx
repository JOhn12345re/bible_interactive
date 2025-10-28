import React, { useState } from 'react';
import { useBibleApi, useVerseSearch } from '../hooks/useBibleApi';

export function BibleApiTest() {
  const { verses, loading, error, fetchVerses, bibles } = useBibleApi();
  const { searchVerse, searchHistory } = useVerseSearch();
  const [searchQuery, setSearchQuery] = useState('');

  const handleTestBooks = async () => {
    console.log('Livres disponibles:', bibles);
  };

  const handleTestVerses = async () => {
    await fetchVerses('Jean 3:16');
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await searchVerse(searchQuery);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Test de l'API Bible</h2>

      {/* Test des livres */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Versions disponibles ({bibles.length})
        </h3>
        <button
          onClick={handleTestBooks}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Afficher les versions
        </button>
        <div className="mt-2 max-h-32 overflow-y-auto">
          {bibles.map((bible) => (
            <div key={bible.id} className="text-sm text-gray-600">
              {bible.name} ({bible.abbreviation}) - {bible.language.name}
            </div>
          ))}
        </div>
      </div>

      {/* Test des versets */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Test des versets</h3>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleTestVerses}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Jean 3:16
          </button>
          <button
            onClick={() => fetchVerses('Genesis 3:1-15')}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Genèse 3:1-15 (Adam et Ève)
          </button>
          <button
            onClick={() => fetchVerses('Genesis 1:1-3')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Genèse 1:1-3 (Création)
          </button>
        </div>
      </div>

      {/* Recherche */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Recherche de versets</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un terme..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Rechercher
          </button>
        </div>
        {searchHistory.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Historique:</p>
            <div className="flex flex-wrap gap-1">
              {searchHistory.map((term, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-200 text-xs rounded cursor-pointer hover:bg-gray-300"
                  onClick={() => setSearchQuery(term)}
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Affichage des résultats */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Résultats</h3>
        {loading && <p className="text-blue-600">Chargement...</p>}
        {error && <p className="text-red-600">Erreur: {error}</p>}
        {verses.length > 0 && (
          <div className="space-y-2">
            {verses.map((verse) => (
              <div
                key={`${verse.book_id}-${verse.chapter}-${verse.verse_start}`}
                className="p-3 bg-gray-50 rounded border-l-4 border-blue-500"
              >
                <div className="text-sm text-gray-600 mb-1">
                  Verset {verse.verse_start}
                </div>
                <div className="text-gray-800">{verse.verse_text}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Informations de debug */}
      <div className="text-xs text-gray-500">
        <p>Mode: Données locales (offline)</p>
        <p>Traduction: Données en français</p>
        <p>Source: Données mockées intégrées</p>
        <p className="text-green-600">✅ Mode offline - Données en français</p>
      </div>
    </div>
  );
}
