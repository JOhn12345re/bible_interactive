import React, { useState, useEffect } from 'react';
import { bibleApi, BibleVerse } from '../services/bibleApi';
import PsalmOfTheDay from '../components/PsalmOfTheDay';

const TestBible: React.FC = () => {
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [book, setBook] = useState('Genèse');
  const [chapter, setChapter] = useState(1);
  const [verseStart, setVerseStart] = useState<number | undefined>();
  const [verseEnd, setVerseEnd] = useState<number | undefined>();

  const loadVerses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Utiliser setTimeout pour éviter de bloquer l'UI
      setTimeout(async () => {
        try {
          const result = await bibleApi.getVersesDefault(book, chapter, verseStart, verseEnd);
          setVerses(result);
        } catch (err) {
          setError('Erreur lors du chargement des versets');
          console.error('Erreur:', err);
        } finally {
          setLoading(false);
        }
      }, 0);
    } catch (err) {
      setError('Erreur lors du chargement des versets');
      console.error('Erreur:', err);
      setLoading(false);
    }
  };

  const testSpecificMethods = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Utiliser setTimeout pour éviter de bloquer l'UI
      setTimeout(async () => {
        try {
          // Test de différentes méthodes
          console.log('🧪 Test des méthodes spécialisées...');
          
          const creation = await bibleApi.getCreationVerses();
          console.log('✅ Création:', creation.length, 'versets');
          
          const adamEve = await bibleApi.getAdamEveVerses();
          console.log('✅ Adam et Ève:', adamEve.length, 'versets');
          
          const psalm = await bibleApi.getPsalmOfTheDay();
          console.log('✅ Psaume du jour:', psalm.length, 'versets');
          
          setVerses(psalm);
        } catch (err) {
          setError('Erreur lors des tests');
          console.error('Erreur:', err);
        } finally {
          setLoading(false);
        }
      }, 0);
    } catch (err) {
      setError('Erreur lors des tests');
      console.error('Erreur:', err);
      setLoading(false);
    }
  };

  const debugBibleData = () => {
    console.log('🔍 Démarrage du debug des données...');
    
    // Utiliser setTimeout pour éviter de bloquer l'UI
    setTimeout(() => {
      try {
        (bibleApi as any).debugBibleData();
      } catch (error) {
        console.error('Erreur lors du debug:', error);
      }
    }, 0);
  };

  const testAllVerses = async () => {
    console.log('🧪 Démarrage du test automatique de tous les versets...');
    
    // Utiliser setTimeout pour éviter de bloquer l'UI
    setTimeout(async () => {
      try {
        await (bibleApi as any).testAllPopularVerses();
      } catch (error) {
        console.error('Erreur lors du test:', error);
      }
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 animate-float">
            <span className="text-3xl">🧪</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Test du Service Bible
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Testez le service Bible Louis Segond avec les données locales et découvrez les psaumes par jour
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test des versets génériques */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover-lift border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                <span className="text-xl">📖</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Test des versets</h2>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Livre
                </label>
                <input
                  type="text"
                  value={book}
                  onChange={(e) => setBook(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Genèse, Exode, Psaumes..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chapitre
                  </label>
                  <input
                    type="number"
                    value={chapter}
                    onChange={(e) => setChapter(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Verset début (optionnel)
                  </label>
                  <input
                    type="number"
                    value={verseStart || ''}
                    onChange={(e) => setVerseStart(e.target.value ? parseInt(e.target.value) : undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verset fin (optionnel)
                </label>
                <input
                  type="number"
                  value={verseEnd || ''}
                  onChange={(e) => setVerseEnd(e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={loadVerses}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors button-interactive"
              >
                {loading ? 'Chargement...' : 'Charger les versets'}
              </button>
              
              <button
                onClick={testSpecificMethods}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition-colors button-interactive"
              >
                Test méthodes spécialisées
              </button>

            <button
              onClick={debugBibleData}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors button-interactive"
            >
              🔍 Debug données
            </button>

            <button
              onClick={testAllVerses}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors button-interactive"
            >
              🧪 Test tous les versets
            </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-600">
                {error}
              </div>
            )}

            {verses.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-3">
                  Résultats ({verses.length} versets)
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {verses.map((verse, index) => (
                    <div key={index} className="flex items-start space-x-3 p-2 bg-gray-50 rounded">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium">
                        {verse.verse_start}
                      </span>
                      <p className="text-sm text-gray-700">
                        {verse.verse_text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Psaume du jour */}
          <div>
            <PsalmOfTheDay />
          </div>
        </div>

        {/* Informations sur le service */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Informations du service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Traduction:</strong> Louis Segond 1910
            </div>
            <div>
              <strong>Source:</strong> Données locales (JSON)
            </div>
            <div>
              <strong>Langue:</strong> Français
            </div>
            <div>
              <strong>Fonctionnalités:</strong> Psaumes par jour, versets par référence
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestBible;
