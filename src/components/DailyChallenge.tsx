import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import Badge from './Badge';
import AudioPlayer from './AudioPlayer';
import { useBadgeStore } from '../state/badgeStore';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'verse' | 'quiz' | 'story' | 'psalm';
  target: number;
  current: number;
  reward: {
    icon: string;
    name: string;
  };
  completed: boolean;
}

const DailyChallenge: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  
  // Utiliser le store des défis quotidiens
  const { dailyChallenges, completeChallenge, updateChallengeProgress } = useBadgeStore();

  const completedChallenges = dailyChallenges.filter(c => c.completed).length;
  const totalChallenges = dailyChallenges.length;
  const completionPercentage = (completedChallenges / totalChallenges) * 100;

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'verse': return '📖';
      case 'quiz': return '🧠';
      case 'story': return '📚';
      case 'psalm': return '🎵';
      default: return '⭐';
    }
  };

  const getChallengeColor = (type: string) => {
    switch (type) {
      case 'verse': return 'blue';
      case 'quiz': return 'green';
      case 'story': return 'purple';
      case 'psalm': return 'orange';
      default: return 'blue';
    }
  };

  const handleChallengeClick = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
  };

  const handleCompleteChallenge = (challengeId: string) => {
    completeChallenge(challengeId);
    setSelectedChallenge(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Défis Quotidiens</h2>
          <p className="text-sm text-gray-600">Complétez vos défis pour gagner des badges !</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{completedChallenges}/{totalChallenges}</div>
          <div className="text-xs text-gray-500">Complétés</div>
        </div>
      </div>

      {/* Barre de progression globale */}
      <div className="mb-6">
        <ProgressBar
          current={completedChallenges}
          total={totalChallenges}
          label="Progression quotidienne"
          color="blue"
          size="lg"
          animated={true}
        />
      </div>

      {/* Message de félicitations */}
      {completionPercentage === 100 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg text-center">
          <div className="text-2xl mb-2">🎉</div>
          <div className="text-lg font-semibold text-green-800">
            Félicitations ! Vous avez complété tous les défis du jour !
          </div>
          <div className="text-sm text-green-600 mt-1">
            Revenez demain pour de nouveaux défis !
          </div>
        </div>
      )}

      {/* Liste des défis */}
      <div className="space-y-4">
        {dailyChallenges.map(challenge => (
          <div
            key={challenge.id}
            onClick={() => handleChallengeClick(challenge)}
            className={`
              p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md
              ${challenge.completed 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 bg-gray-50 hover:border-blue-300'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-xl
                  ${challenge.completed 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-600'
                  }
                `}>
                  {challenge.completed ? '✅' : getChallengeIcon(challenge.type)}
                </div>
                <div>
                  <h3 className={`font-semibold ${challenge.completed ? 'text-green-800' : 'text-gray-800'}`}>
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-gray-600">{challenge.description}</p>
                </div>
              </div>
              
              <div className="text-right">
                {challenge.completed ? (
                  <div className="text-green-600 font-semibold">✅ Complété</div>
                ) : (
                  <div className="text-blue-600 font-semibold">→ Commencer</div>
                )}
              </div>
            </div>

            {/* Barre de progression individuelle */}
            {!challenge.completed && (
              <div className="mt-3">
                <ProgressBar
                  current={challenge.current}
                  total={challenge.target}
                  color={getChallengeColor(challenge.type) as any}
                  size="sm"
                  showPercentage={false}
                />
              </div>
            )}

            {/* Récompense */}
            <div className="mt-2 flex items-center space-x-2 text-sm">
              <span className="text-gray-500">Récompense:</span>
              <span className="text-yellow-600">{challenge.reward.icon}</span>
              <span className="font-medium text-gray-700">{challenge.reward.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de détail du défi */}
      {selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{selectedChallenge.title}</h3>
              <button
                onClick={() => setSelectedChallenge(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">{selectedChallenge.description}</p>
              
              {/* Contenu spécifique au type de défi */}
              {selectedChallenge.type === 'verse' && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Verset du jour :</h4>
                  <p className="text-sm italic">"Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle."</p>
                  <p className="text-xs text-gray-500 mt-2">— Jean 3:16</p>
                  <AudioPlayer text="Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle." className="mt-3" />
                </div>
              )}

              {selectedChallenge.type === 'psalm' && (
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Psaume du jour :</h4>
                  <p className="text-sm italic">"L'Éternel est mon berger: je ne manquerai de rien."</p>
                  <p className="text-xs text-gray-500 mt-2">— Psaume 23:1</p>
                  <AudioPlayer text="L'Éternel est mon berger: je ne manquerai de rien." className="mt-3" />
                </div>
              )}

              <div className="flex gap-3">
                {!selectedChallenge.completed && (
                  <button
                    onClick={() => handleCompleteChallenge(selectedChallenge.id)}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Marquer comme complété
                  </button>
                )}
                <button
                  onClick={() => setSelectedChallenge(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyChallenge;
