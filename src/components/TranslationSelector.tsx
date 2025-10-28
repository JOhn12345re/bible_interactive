import React, { useState, useEffect } from 'react';
import { bibleApi } from '../services/bibleApi';

interface BibleVersion {
  id: string;
  name: string;
  abbreviation: string;
  language: {
    code: string;
    name: string;
  };
  description?: string;
}

const TranslationSelector: React.FC = () => {
  const [translations, setTranslations] = useState<BibleVersion[]>([]);
  const [currentTranslation, setCurrentTranslation] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTranslations();
  }, []);

  const loadTranslations = async () => {
    try {
      setLoading(true);
      const availableTranslations = await bibleApi.getAvailableTranslations();
      setTranslations(availableTranslations);
      setCurrentTranslation(bibleApi.getCurrentTranslation());
    } catch (error) {
      console.error('Erreur lors du chargement des traductions:', error);
      // En cas d'erreur, utiliser les traductions par défaut
      const defaultTranslations = [
        {
          id: 'fraLSG',
          name: 'Louis Segond 1910',
          abbreviation: 'LSG',
          language: { code: 'fra', name: 'Français' },
          description: 'Traduction française classique',
        },
        {
          id: 'fraBDS',
          name: 'Bible du Semeur',
          abbreviation: 'BDS',
          language: { code: 'fra', name: 'Français' },
          description: 'Traduction française moderne',
        },
      ];
      setTranslations(defaultTranslations);
      setCurrentTranslation('fraLSG');
    } finally {
      setLoading(false);
    }
  };

  const handleTranslationChange = (translationId: string) => {
    bibleApi.setTranslation(translationId);
    setCurrentTranslation(translationId);
  };

  const handleResetApi = () => {
    bibleApi.resetApiStatus();
    loadTranslations();
  };

  if (loading) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-600">
          🔄 Chargement des traductions disponibles...
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        📚 Choisir la traduction biblique
      </h3>

      <div className="space-y-2">
        {translations.map((translation) => (
          <label
            key={translation.id}
            className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <input
              type="radio"
              name="translation"
              value={translation.id}
              checked={currentTranslation === translation.id}
              onChange={(e) => handleTranslationChange(e.target.value)}
              className="mr-3 text-blue-600"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900">
                {translation.name}
              </div>
              <div className="text-sm text-gray-600">
                {translation.abbreviation} • {translation.language.name}
              </div>
              {translation.description && (
                <div className="text-xs text-gray-500 mt-1">
                  {translation.description}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>

      <div className="mt-4 p-3 bg-green-50 rounded-lg">
        <p className="text-sm text-green-700">
          ✅ Traduction actuelle: <strong>{currentTranslation}</strong>
        </p>
        <p className="text-xs text-green-600 mt-1">
          Les versets seront rechargés avec la nouvelle traduction
        </p>
      </div>

      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          ℹ️ <strong>Mode hors ligne</strong>
        </p>
        <p className="text-xs text-blue-600 mt-1">
          L'API externe n'est pas accessible. Les traductions affichées sont des
          exemples. Les versets utilisent les données locales du site.
        </p>
        <button
          onClick={handleResetApi}
          className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
        >
          🔄 Réessayer l'API
        </button>
      </div>
    </div>
  );
};

export default TranslationSelector;
