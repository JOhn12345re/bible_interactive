import React, { useState } from 'react';
import Badge from './Badge';
import Modal from './Modal';
import { useBadgeStore } from '../state/badgeStore';

interface BadgeData {
  id: string;
  icon: string;
  title: string;
  description: string;
  earned: boolean;
  progress?: number;
  category: 'reading' | 'games' | 'learning' | 'special';
}

const BadgeChest: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Utiliser le store des badges
  const { badges, totalExperience, level } = useBadgeStore();

  const categories = [
    { id: 'all', name: 'Tous', icon: '🏆' },
    { id: 'reading', name: 'Lecture', icon: '📖' },
    { id: 'games', name: 'Jeux', icon: '🎮' },
    { id: 'learning', name: 'Apprentissage', icon: '🎓' },
    { id: 'special', name: 'Spéciaux', icon: '⭐' },
  ];

  const filteredBadges =
    selectedCategory === 'all'
      ? badges
      : badges.filter((badge) => badge.category === selectedCategory);

  const earnedCount = badges.filter((badge) => badge.earned).length;
  const totalCount = badges.length;

  return (
    <>
      {/* Bouton pour ouvrir le coffre */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative flex flex-col items-center p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        <div className="text-4xl mb-2 group-hover:animate-bounce">🏆</div>
        <div className="text-sm font-semibold text-white">Coffre à Badges</div>
        <div className="text-xs text-yellow-100">
          {earnedCount}/{totalCount}
        </div>

        {/* Indicateur de nouveaux badges */}
        {earnedCount > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
            {earnedCount}
          </div>
        )}
      </button>

      {/* Modal du coffre à badges */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="🏆 Coffre à Badges"
      >
        <div className="space-y-6">
          {/* Statistiques */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {earnedCount}/{totalCount}
              </div>
              <div className="text-sm text-gray-600">Badges gagnés</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(earnedCount / totalCount) * 100}%` }}
                ></div>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                <div>Niveau {level}</div>
                <div>{totalExperience} points d'expérience</div>
              </div>
            </div>
          </div>

          {/* Filtres par catégorie */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Grille des badges */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {filteredBadges.map((badge) => (
              <Badge
                key={badge.id}
                icon={badge.icon}
                title={badge.title}
                description={badge.description}
                earned={badge.earned}
                progress={badge.progress}
                onClick={() => {
                  // Ici on pourrait afficher plus de détails sur le badge
                  console.log('Badge cliqué:', badge.title);
                }}
              />
            ))}
          </div>

          {/* Message d'encouragement */}
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-lg font-semibold text-green-800">
              {earnedCount === totalCount
                ? '🎉 Félicitations ! Vous avez gagné tous les badges !'
                : earnedCount > totalCount / 2
                  ? '🌟 Excellent progrès ! Continuez comme ça !'
                  : earnedCount > 0
                    ? '💪 Bon début ! Continuez à explorer !'
                    : '🚀 Commencez votre aventure biblique !'}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BadgeChest;
