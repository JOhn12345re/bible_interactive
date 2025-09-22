import React, { useState, useEffect } from 'react';
import { useProfileStore } from '../state/profileStore';

interface LevelUpNotificationProps {
  newLevel: number;
  onClose: () => void;
}

const LevelUpNotification: React.FC<LevelUpNotificationProps> = ({ newLevel, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation d'entrée
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Auto-fermeture après 4 secondes
    const autoClose = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoClose);
    };
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      
      {/* Notification */}
      <div
        className={`relative transform transition-all duration-500 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
      >
        <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-8 text-white shadow-2xl max-w-sm mx-4 text-center">
          {/* Effet d'étoiles */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute top-4 left-4 text-yellow-200 animate-spin">⭐</div>
            <div className="absolute top-6 right-6 text-yellow-100 animate-bounce">✨</div>
            <div className="absolute bottom-8 left-8 text-yellow-200 animate-pulse">🌟</div>
            <div className="absolute bottom-4 right-4 text-yellow-100 animate-ping">💫</div>
          </div>
          
          <div className="relative z-10">
            {/* Icône de niveau */}
            <div className="mb-4">
              <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-4xl">🏆</span>
              </div>
            </div>
            
            {/* Titre */}
            <h2 className="text-2xl font-bold mb-2 animate-bounce">
              NIVEAU SUPÉRIEUR !
            </h2>
            
            {/* Nouveau niveau */}
            <div className="mb-4">
              <div className="text-6xl font-black mb-2 text-yellow-100 animate-pulse">
                {newLevel}
              </div>
              <p className="text-yellow-100 font-semibold">
                Félicitations ! Tu as atteint le niveau {newLevel} !
              </p>
            </div>
            
            {/* Messages motivants selon le niveau */}
            <div className="mb-6">
              {newLevel <= 3 && (
                <p className="text-sm text-yellow-100">
                  🌱 Continue comme ça, petit explorateur !
                </p>
              )}
              {newLevel > 3 && newLevel <= 6 && (
                <p className="text-sm text-yellow-100">
                  🌿 Tu deviens un vrai connaisseur de la Bible !
                </p>
              )}
              {newLevel > 6 && newLevel <= 10 && (
                <p className="text-sm text-yellow-100">
                  🌳 Impressionnant ! Tu es maintenant un expert !
                </p>
              )}
              {newLevel > 10 && (
                <p className="text-sm text-yellow-100">
                  👑 Incroyable ! Tu es un maître de la Bible !
                </p>
              )}
            </div>
            
            {/* Bouton fermer */}
            <button
              onClick={handleClose}
              className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full font-semibold transition-colors duration-200"
            >
              Continuer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LevelUpManager: React.FC = () => {
  const { profile } = useProfileStore();
  const [notification, setNotification] = useState<{ newLevel: number } | null>(null);
  const [lastLevel, setLastLevel] = useState(1);

  useEffect(() => {
    if (!profile) return;

    // Safe access with defaults for potentially undefined nested properties
    const gameStats = profile.gameStats || { totalScore: 0 };
    const readingStats = profile.readingStats || { totalReadingTime: 0 };
    const completedLessons = profile.completedLessons || [];

    // Calculer le niveau actuel
    const totalXP = (gameStats.totalScore || 0) + 
                   ((readingStats.totalReadingTime || 0) * 2) + 
                   (completedLessons.length * 50);
    const currentLevel = Math.floor(totalXP / 100) + 1;
    
    // Vérifier s'il y a eu un gain de niveau
    if (currentLevel > lastLevel && lastLevel > 0) {
      setNotification({ newLevel: currentLevel });
    }
    
    setLastLevel(currentLevel);
  }, [profile?.gameStats?.totalScore, profile?.readingStats?.totalReadingTime, profile?.completedLessons?.length, lastLevel]);

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <>
      {notification && (
        <LevelUpNotification
          newLevel={notification.newLevel}
          onClose={closeNotification}
        />
      )}
    </>
  );
};

export default LevelUpManager;