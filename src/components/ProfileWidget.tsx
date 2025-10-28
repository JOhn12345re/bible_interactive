import React from 'react';
import { Link } from 'react-router-dom';
import { useProfileStore } from '../state/profileStore';

const ProfileWidget: React.FC = () => {
  const { profile, getLevelInfo, getTotalAchievements } = useProfileStore();

  if (!profile) {
    return (
      <Link
        to="/profile"
        className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 text-white hover:scale-105 transition-transform duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <h3 className="font-bold">Créer un profil</h3>
            <p className="text-sm opacity-90">Suivez vos progrès</p>
          </div>
        </div>
      </Link>
    );
  }

  const levelInfo = getLevelInfo();
  const totalAchievements = getTotalAchievements();

  return (
    <Link
      to="/profile"
      className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 text-white hover:scale-105 transition-transform duration-200 group"
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">{profile.avatar || '👤'}</span>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {levelInfo.level}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="font-bold group-hover:scale-105 transition-transform">
            {profile.firstName} {profile.lastName}
          </h3>
          <div className="flex items-center space-x-2 text-sm opacity-90">
            <span>🏆 {totalAchievements}</span>
            <span>•</span>
            <span>⭐ {levelInfo.level}</span>
            <span>•</span>
            <span>🎮 {profile.gameStats?.totalGamesPlayed || 0}</span>
          </div>

          {/* Mini barre de progression */}
          <div className="mt-2 bg-white/20 rounded-full h-1">
            <div
              className="bg-white h-1 rounded-full transition-all duration-300"
              style={{
                width: `${(levelInfo.progress / levelInfo.nextLevelAt) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProfileWidget;
