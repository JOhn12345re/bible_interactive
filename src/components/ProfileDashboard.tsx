import React from 'react';
import {
  useProfileStore,
  AVAILABLE_AVATARS,
  PREDEFINED_ACHIEVEMENTS,
} from '../state/profileStore';

const ProfileDashboard: React.FC = () => {
  const {
    profile,
    updateProfile,
    getTotalAchievements,
    getAchievementsByCategory,
    getLevelInfo,
  } = useProfileStore();

  if (!profile) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-400 p-8">
        <h2 className="text-2xl font-bold mb-4">Aucun profil trouvé</h2>
        <p>Veuillez créer un profil pour voir vos statistiques.</p>
      </div>
    );
  }

  const levelInfo = getLevelInfo();
  const totalAchievements = getTotalAchievements();

  const handleAvatarChange = (newAvatar: string) => {
    updateProfile({ avatar: newAvatar });
  };

  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      {/* En-tête du profil */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl">
              {profile.avatar || '👤'}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm">
              {levelInfo.level}
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {profile.age} ans • {profile.church}
            </p>

            {/* Barre de progression du niveau */}
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{
                  width: `${(levelInfo.progress / levelInfo.nextLevelAt) * 100}%`,
                }}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Niveau {levelInfo.level} • {levelInfo.progress}/
              {levelInfo.nextLevelAt} XP jusqu'au niveau suivant
            </p>
          </div>
        </div>

        {/* Sélecteur d'avatar */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Changer d'avatar
          </h3>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_AVATARS.map((avatar, index) => (
              <button
                key={index}
                onClick={() => handleAvatarChange(avatar)}
                className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
                  profile.avatar === avatar
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                }`}
              >
                <span className="text-xl">{avatar}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white p-6">
          <div className="text-3xl font-bold">
            {profile.gameStats.totalGamesPlayed}
          </div>
          <div className="text-blue-100">Jeux joués</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white p-6">
          <div className="text-3xl font-bold">
            {profile.gameStats.totalScore}
          </div>
          <div className="text-green-100">Score total</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white p-6">
          <div className="text-3xl font-bold">
            {Math.floor(profile.readingStats.totalReadingTime / 60)}h
          </div>
          <div className="text-purple-100">Temps de lecture</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white p-6">
          <div className="text-3xl font-bold">{totalAchievements}</div>
          <div className="text-orange-100">Succès obtenus</div>
        </div>
      </div>

      {/* Succès */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          🏆 Succès obtenus ({totalAchievements}/
          {PREDEFINED_ACHIEVEMENTS.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PREDEFINED_ACHIEVEMENTS.map((achievement) => {
            const isUnlocked = profile.gameStats.achievements.some(
              (a) => a.id === achievement.id
            );
            const unlockedAchievement = profile.gameStats.achievements.find(
              (a) => a.id === achievement.id
            );

            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  isUnlocked
                    ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </p>
                    {isUnlocked && unlockedAchievement && (
                      <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                        Débloqué le{' '}
                        {new Date(
                          unlockedAchievement.unlockedAt
                        ).toLocaleDateString('fr-FR')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Versets favoris */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          ❤️ Versets favoris ({profile.favoriteVerses.length})
        </h2>

        {profile.favoriteVerses.length > 0 ? (
          <div className="space-y-3">
            {profile.favoriteVerses.map((verse, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-blue-500"
              >
                <p className="text-gray-900 dark:text-white italic">
                  "{verse}"
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 italic">
            Aucun verset favori pour le moment. Jouez aux jeux pour en découvrir
            !
          </p>
        )}
      </div>

      {/* Progrès de lecture */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          📖 Progrès de lecture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Livre actuel
            </h3>
            <p className="text-lg text-blue-600 dark:text-blue-400">
              {profile.readingStats.currentBook} - Chapitre{' '}
              {profile.readingStats.currentChapter}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Livres lus ({profile.readingStats.booksRead.length})
            </h3>
            {profile.readingStats.booksRead.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.readingStats.booksRead.map((book, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-sm"
                  >
                    {book}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 italic">
                Aucun livre terminé pour le moment
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Préférences */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          ⚙️ Préférences
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Version préférée
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {profile.preferences.preferredTranslation}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Objectif quotidien
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {profile.preferences.dailyGoal} versets par jour
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
