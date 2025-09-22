import React, { useState, useEffect } from 'react';
import { useProfileStore } from '../state/profileStore';

interface AchievementNotificationProps {
  achievement: {
    id: string;
    title: string;
    description: string;
    icon: string;
  };
  onClose: () => void;
}

const AchievementNotification: React.FC<AchievementNotificationProps> = ({ achievement, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation d'entrée
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Auto-fermeture après 5 secondes
    const autoClose = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

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
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`transform transition-all duration-300 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg shadow-2xl p-4 max-w-sm border-2 border-yellow-300">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-2xl animate-bounce">{achievement.icon}</span>
              <div className="text-sm font-bold text-yellow-100">SUCCÈS DÉBLOQUÉ !</div>
            </div>
            <button
              onClick={handleClose}
              className="text-yellow-200 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          
          <h3 className="text-lg font-bold mb-1">{achievement.title}</h3>
          <p className="text-sm text-yellow-100">{achievement.description}</p>
          
          {/* Animation de confettis */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-2 left-4 w-2 h-2 bg-yellow-200 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
            <div className="absolute top-4 right-8 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute bottom-4 left-8 w-1 h-1 bg-yellow-200 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-2 right-4 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AchievementManager: React.FC = () => {
  const { profile } = useProfileStore();
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    achievement: {
      id: string;
      title: string;
      description: string;
      icon: string;
    };
  }>>([]);
  
  const [lastAchievementCount, setLastAchievementCount] = useState(0);

  useEffect(() => {
    if (!profile || !profile.gameStats) return;

    const currentAchievements = profile.gameStats.achievements || [];
    
    // Vérifier s'il y a de nouveaux achievements
    if (currentAchievements.length > lastAchievementCount) {
      const newAchievements = currentAchievements.slice(lastAchievementCount);
      
      newAchievements.forEach((achievement, index) => {
        // Délai pour afficher les notifications une par une
        setTimeout(() => {
          const uniqueId = `${achievement.id}-${Date.now()}-${index}`;
          setNotifications(prev => [...prev, {
            id: uniqueId,
            achievement: {
              id: achievement.id,
              title: achievement.title,
              description: achievement.description,
              icon: achievement.icon
            }
          }]);
        }, index * 500);
      });
    }
    
    setLastAchievementCount(currentAchievements.length);
  }, [profile?.gameStats?.achievements, lastAchievementCount]);

  const removeNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  return (
    <>
      {notifications.map((notification) => (
        <AchievementNotification
          key={notification.id}
          achievement={notification.achievement}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </>
  );
};

export default AchievementManager;