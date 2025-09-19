import React, { useState, useEffect } from 'react';
import { bibleApi, BibleVerse } from '../services/bibleApi';

interface PsalmOfTheDayProps {
  className?: string;
}

const PsalmOfTheDay: React.FC<PsalmOfTheDayProps> = ({ className = '' }) => {
  const [psalm, setPsalm] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [psalmNumber, setPsalmNumber] = useState<number>(1);

  useEffect(() => {
    loadPsalmOfTheDay();
  }, []);

  const loadPsalmOfTheDay = async () => {
    try {
      setLoading(true);
      setError(null);
      const verses = await bibleApi.getPsalmOfTheDay();
      setPsalm(verses);
      
      // Extraire le numéro du psaume depuis les versets
      if (verses.length > 0) {
        const firstVerse = verses[0];
        const match = firstVerse.book_id.match(/PSAUME\s*(\d+)/i);
        if (match) {
          setPsalmNumber(parseInt(match[1]));
        }
      }
    } catch (err) {
      setError('Erreur lors du chargement du psaume du jour');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadSpecificPsalm = async (number: number) => {
    if (number < 1 || number > 150) return;
    
    try {
      setLoading(true);
      setError(null);
      const verses = await bibleApi.getPsalm(number);
      setPsalm(verses);
      setPsalmNumber(number);
    } catch (err) {
      setError('Erreur lors du chargement du psaume');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`p-6 bg-white rounded-lg shadow-md ${className}`}>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Chargement du psaume du jour...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 bg-red-50 border border-red-200 rounded-lg ${className}`}>
        <div className="text-red-600 mb-4">
          <h3 className="font-semibold">Erreur</h3>
          <p>{error}</p>
        </div>
        <button
          onClick={loadPsalmOfTheDay}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className={`p-6 bg-white rounded-lg shadow-md ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          📅 Psaume du jour
        </h2>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="1"
            max="150"
            value={psalmNumber}
            onChange={(e) => setPsalmNumber(parseInt(e.target.value) || 1)}
            className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
          />
          <button
            onClick={() => loadSpecificPsalm(psalmNumber)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
          >
            Charger
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Psaume {psalmNumber}
        </h3>
        <button
          onClick={loadPsalmOfTheDay}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          Retour au psaume du jour
        </button>
      </div>

      <div className="space-y-3">
        {psalm.map((verse, index) => (
          <div key={index} className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
              {verse.verse_start}
            </span>
            <p className="text-gray-700 leading-relaxed">
              {verse.verse_text}
            </p>
          </div>
        ))}
      </div>

      {psalm.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          Aucun verset trouvé pour ce psaume.
        </div>
      )}
    </div>
  );
};

export default PsalmOfTheDay;
