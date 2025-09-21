import React, { useState, useEffect } from 'react';
import { bibleApi, BibleVerse } from '../services/bibleApi';
import AudioPlayer from './AudioPlayer';
import ProgressBar from './ProgressBar';

interface PsalmOfTheDayProps {
  className?: string;
}

const PsalmOfTheDay: React.FC<PsalmOfTheDayProps> = ({ className = '' }) => {
  const [psalm, setPsalm] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [psalmNumber, setPsalmNumber] = useState<number>(1);
  const [isRead, setIsRead] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

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
      setIsRead(false);
      setReadingProgress(0);
    } catch (err) {
      setError('Erreur lors du chargement du psaume');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = () => {
    setIsRead(true);
    setReadingProgress(100);
  };

  const getFullPsalmText = () => {
    return psalm.map(verse => verse.verse_text).join(' ');
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
    <div className={`p-6 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100 hover-lift ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-float">
            <span className="text-2xl">📅</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Psaume du jour
            </h2>
            <p className="text-sm text-gray-600">Découvrez le psaume quotidien</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="1"
            max="150"
            value={psalmNumber}
            onChange={(e) => setPsalmNumber(parseInt(e.target.value) || 1)}
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="1-150"
          />
          <button
            onClick={() => loadSpecificPsalm(psalmNumber)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 button-interactive text-sm font-medium"
          >
            📖 Charger
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Psaume {psalmNumber}
          </h3>
          <button
            onClick={loadPsalmOfTheDay}
            className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-300 button-interactive"
          >
            🔄 Retour au psaume du jour
          </button>
        </div>

        {/* Barre de progression de lecture */}
        <div className="mb-4">
          <ProgressBar
            current={readingProgress}
            total={100}
            label="Progression de lecture"
            color="purple"
            size="sm"
            showPercentage={true}
          />
        </div>

        {/* Contrôles audio */}
        <div className="mb-4">
          <AudioPlayer
            text={getFullPsalmText()}
            title={`Psaume ${psalmNumber}`}
            className="bg-blue-50 p-3 rounded-lg"
          />
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {psalm.map((verse, index) => (
          <div 
            key={index} 
            className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover-lift"
            onClick={() => {
              if (!isRead) {
                setReadingProgress(Math.min(100, ((index + 1) / psalm.length) * 100));
              }
            }}
          >
            <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {verse.verse_start}
            </span>
            <p className="text-gray-700 leading-relaxed text-lg">
              {verse.verse_text}
            </p>
          </div>
        ))}
      </div>

      {/* Bouton pour marquer comme lu */}
      {!isRead && psalm.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={markAsRead}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 button-interactive font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            ✅ Marquer comme lu
          </button>
        </div>
      )}

      {/* Message de félicitations */}
      {isRead && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg text-center">
          <div className="text-2xl mb-2">🎉</div>
          <div className="text-lg font-semibold text-green-800">
            Félicitations ! Vous avez lu le Psaume {psalmNumber} !
          </div>
          <div className="text-sm text-green-600 mt-1">
            Vous avez gagné des points d'expérience !
          </div>
        </div>
      )}

      {psalm.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          Aucun verset trouvé pour ce psaume.
        </div>
      )}
    </div>
  );
};

export default PsalmOfTheDay;
