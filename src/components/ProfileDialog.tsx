import React, { useState, useEffect } from 'react';
import { useSettings } from '../state/settingsStore';
import { useProfileStore, type UserProfile } from '../state/profileStore';

interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHURCH_OPTIONS = [
  'Église Orthodoxe',
  'Église Catholique',
  'Église Protestante',
  'Église Évangélique',
  'Église Baptiste',
  'Église Méthodiste',
  'Église Luthérienne',
  'Église Presbytérienne',
  'Église Pentecôtiste',
  'Église Adventiste',
  'Autre',
];

export default function ProfileDialog({ isOpen, onClose }: ProfileDialogProps) {
  const { contrastHigh } = useSettings();
  const { profile, updateProfile, saveProfileToServer } = useProfileStore();

  const makeDefaultProfile = (): UserProfile => ({
    firstName: '',
    lastName: '',
    age: 0,
    church: '',
    email: '',
    favoriteVerses: [],
    completedLessons: [],
    gameStats: {
      totalGamesPlayed: 0,
      totalScore: 0,
      favoriteGame: '',
      achievements: [],
    },
    readingStats: {
      totalReadingTime: 0,
      booksRead: [],
      currentBook: 'Genèse',
      currentChapter: 1,
      dailyStreak: 0,
    },
    preferences: {
      preferredTranslation: 'Louis Segond 1910',
      dailyGoal: 3,
      notifications: true,
    },
  });

  const [formData, setFormData] = useState<UserProfile>(makeDefaultProfile());

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen && profile) {
      setFormData(profile);
    }
  }, [isOpen, profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validation
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        throw new Error('Le prénom et le nom sont obligatoires');
      }
      if (formData.age < 1 || formData.age > 120) {
        throw new Error("L'âge doit être entre 1 et 120 ans");
      }
      if (!formData.church) {
        throw new Error('Veuillez sélectionner une église');
      }

      // Sauvegarder localement
      updateProfile(formData);

      // Tenter de sauvegarder sur le serveur
      const saved = await saveProfileToServer(formData);
      if (saved) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setSuccess(true); // Sauvegardé localement quand même
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erreur lors de la sauvegarde'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof UserProfile,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`max-w-md w-full rounded-2xl p-6 ${
          contrastHigh
            ? 'bg-contrast-bg border-2 border-contrast-text'
            : 'bg-white shadow-xl'
        }`}
        role="dialog"
        aria-labelledby="profile-dialog-title"
        aria-describedby="profile-dialog-description"
      >
        <h2 id="profile-dialog-title" className="sr-only">
          Configuration du profil utilisateur
        </h2>
        <p id="profile-dialog-description" className="sr-only">
          Remplissez vos informations personnelles pour personnaliser votre
          expérience
        </p>
        {/* En-tête */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">👤</span>
            <h2
              className={`text-xl font-bold ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-800'
              }`}
            >
              Mon Profil
            </h2>
          </div>
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
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 border border-green-200">
            ✅ Profil sauvegardé avec succès !
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  contrastHigh ? 'text-contrast-text' : 'text-gray-700'
                }`}
              >
                Prénom *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  contrastHigh
                    ? 'bg-contrast-bg text-contrast-text border-contrast-text'
                    : 'bg-white border-gray-300 focus:border-blue-400'
                }`}
                required
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  contrastHigh ? 'text-contrast-text' : 'text-gray-700'
                }`}
              >
                Nom *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  contrastHigh
                    ? 'bg-contrast-bg text-contrast-text border-contrast-text'
                    : 'bg-white border-gray-300 focus:border-blue-400'
                }`}
                required
              />
            </div>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-700'
              }`}
            >
              Âge *
            </label>
            <input
              type="number"
              min="1"
              max="120"
              value={formData.age || ''}
              onChange={(e) =>
                handleInputChange('age', parseInt(e.target.value) || 0)
              }
              className={`w-full px-3 py-2 rounded-lg border ${
                contrastHigh
                  ? 'bg-contrast-bg text-contrast-text border-contrast-text'
                  : 'bg-white border-gray-300 focus:border-blue-400'
              }`}
              required
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-700'
              }`}
            >
              Église *
            </label>
            <select
              value={formData.church}
              onChange={(e) => handleInputChange('church', e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border ${
                contrastHigh
                  ? 'bg-contrast-bg text-contrast-text border-contrast-text'
                  : 'bg-white border-gray-300 focus:border-blue-400'
              }`}
              required
            >
              <option value="">Sélectionnez votre église</option>
              {CHURCH_OPTIONS.map((church) => (
                <option key={church} value={church}>
                  {church}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-700'
              }`}
            >
              Email (optionnel)
            </label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border ${
                contrastHigh
                  ? 'bg-contrast-bg text-contrast-text border-contrast-text'
                  : 'bg-white border-gray-300 focus:border-blue-400'
              }`}
            />
          </div>

          {/* Boutons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                contrastHigh
                  ? 'bg-contrast-bg text-contrast-text border-2 border-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                contrastHigh
                  ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              } disabled:opacity-50`}
            >
              {loading ? '⏳' : '💾'} Sauvegarder
            </button>
          </div>
        </form>

        {/* Note */}
        <div
          className={`mt-4 text-xs ${
            contrastHigh ? 'text-contrast-text' : 'text-gray-500'
          }`}
        >
          * Champs obligatoires. Vos données sont sauvegardées localement et sur
          notre serveur sécurisé.
        </div>
      </div>
    </div>
  );
}
