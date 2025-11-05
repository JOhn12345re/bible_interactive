import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';

interface Challenge {
  id: number;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  category: 'prayer' | 'reading' | 'service' | 'meditation' | 'community';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
  icon: string;
  completed: boolean;
  completedDate?: string;
  streak?: number;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  requirement: string;
  unlocked: boolean;
  unlockedDate?: string;
}

const SpiritualChallengesPage = () => {
  const { contrastHigh } = useSettings();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  const challengeTemplates: Omit<Challenge, 'id' | 'completed' | 'completedDate' | 'streak'>[] = [
    {
      title: "Prière matinale",
      description: "Commencez votre journée par 10 minutes de prière",
      type: "daily",
      category: "prayer",
      difficulty: "beginner",
      points: 10,
      icon: "🌅"
    },
    {
      title: "Lecture biblique quotidienne",
      description: "Lisez un chapitre de la Bible chaque jour",
      type: "daily",
      category: "reading",
      difficulty: "beginner",
      points: 15,
      icon: "📖"
    },
    {
      title: "Acte de bonté",
      description: "Accomplissez un acte de bonté envers quelqu'un",
      type: "daily",
      category: "service",
      difficulty: "intermediate",
      points: 20,
      icon: "🤝"
    },
    {
      title: "Méditation silencieuse",
      description: "Passez 15 minutes en méditation silencieuse",
      type: "daily",
      category: "meditation",
      difficulty: "intermediate",
      points: 25,
      icon: "🧘"
    },
    {
      title: "Jeûne et prière",
      description: "Jeûnez et priez pendant une période définie",
      type: "weekly",
      category: "prayer",
      difficulty: "advanced",
      points: 50,
      icon: "⛪"
    },
    {
      title: "Visite aux malades",
      description: "Rendez visite à une personne malade ou âgée",
      type: "weekly",
      category: "service",
      difficulty: "intermediate",
      points: 40,
      icon: "🏥"
    },
    {
      title: "Étude biblique approfondie",
      description: "Étudiez un livre de la Bible en profondeur",
      type: "monthly",
      category: "reading",
      difficulty: "advanced",
      points: 100,
      icon: "📚"
    },
    {
      title: "Participation communautaire",
      description: "Participez activement aux activités de votre église",
      type: "weekly",
      category: "community",
      difficulty: "beginner",
      points: 30,
      icon: "👥"
    },
    {
      title: "Prière d'intercession",
      description: "Priez pour les besoins des autres pendant 30 minutes",
      type: "weekly",
      category: "prayer",
      difficulty: "intermediate",
      points: 35,
      icon: "🙏"
    },
    {
      title: "Mémorisation de versets",
      description: "Mémorisez 5 versets bibliques ce mois-ci",
      type: "monthly",
      category: "reading",
      difficulty: "intermediate",
      points: 80,
      icon: "🧠"
    }
  ];

  const achievementTemplates: Omit<Achievement, 'id' | 'unlocked' | 'unlockedDate'>[] = [
    {
      title: "Premier Pas",
      description: "Complétez votre premier défi",
      icon: "🎯",
      requirement: "1 défi complété"
    },
    {
      title: "Persévérant",
      description: "Maintenez une série de 7 jours consécutifs",
      icon: "🔥",
      requirement: "7 jours de série"
    },
    {
      title: "Dévoué",
      description: "Accumulez 100 points",
      icon: "⭐",
      requirement: "100 points"
    },
    {
      title: "Serviteur Fidèle",
      description: "Complétez 10 défis de service",
      icon: "💝",
      requirement: "10 défis de service"
    },
    {
      title: "Guerrier de Prière",
      description: "Complétez 20 défis de prière",
      icon: "🛡️",
      requirement: "20 défis de prière"
    },
    {
      title: "Étudiant Assidu",
      description: "Complétez 15 défis de lecture",
      icon: "📜",
      requirement: "15 défis de lecture"
    },
    {
      title: "Maître Spirituel",
      description: "Accumulez 500 points",
      icon: "👑",
      requirement: "500 points"
    },
    {
      title: "Champion de la Foi",
      description: "Maintenez une série de 30 jours",
      icon: "🏆",
      requirement: "30 jours de série"
    }
  ];

  useEffect(() => {
    // Charger les données sauvegardées
    const savedChallenges = localStorage.getItem('spiritualChallenges');
    const savedAchievements = localStorage.getItem('achievements');
    const savedPoints = localStorage.getItem('totalPoints');
    const savedStreak = localStorage.getItem('currentStreak');

    if (savedChallenges) {
      setChallenges(JSON.parse(savedChallenges));
    } else {
      // Initialiser avec les défis par défaut
      const initialChallenges = challengeTemplates.map((template, index) => ({
        ...template,
        id: index + 1,
        completed: false,
        streak: 0
      }));
      setChallenges(initialChallenges);
    }

    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    } else {
      // Initialiser avec les succès par défaut
      const initialAchievements = achievementTemplates.map((template, index) => ({
        ...template,
        id: index + 1,
        unlocked: false
      }));
      setAchievements(initialAchievements);
    }

    if (savedPoints) {
      setTotalPoints(parseInt(savedPoints));
    }

    if (savedStreak) {
      setCurrentStreak(parseInt(savedStreak));
    }
  }, []);

  const completeChallenge = (challengeId: number) => {
    const updatedChallenges = challenges.map(challenge => {
      if (challenge.id === challengeId) {
        return {
          ...challenge,
          completed: true,
          completedDate: new Date().toLocaleDateString('fr-FR'),
          streak: (challenge.streak || 0) + 1
        };
      }
      return challenge;
    });

    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge && !challenge.completed) {
      const newTotalPoints = totalPoints + challenge.points;
      const newStreak = currentStreak + 1;

      setChallenges(updatedChallenges);
      setTotalPoints(newTotalPoints);
      setCurrentStreak(newStreak);

      localStorage.setItem('spiritualChallenges', JSON.stringify(updatedChallenges));
      localStorage.setItem('totalPoints', newTotalPoints.toString());
      localStorage.setItem('currentStreak', newStreak.toString());

      // Vérifier les succès
      checkAchievements(updatedChallenges, newTotalPoints, newStreak);
    }
  };

  const checkAchievements = (completedChallenges: Challenge[], points: number, streak: number) => {
    const updatedAchievements = achievements.map(achievement => {
      if (!achievement.unlocked) {
        let shouldUnlock = false;

        switch (achievement.title) {
          case "Premier Pas":
            shouldUnlock = completedChallenges.some(c => c.completed);
            break;
          case "Persévérant":
            shouldUnlock = streak >= 7;
            break;
          case "Dévoué":
            shouldUnlock = points >= 100;
            break;
          case "Serviteur Fidèle":
            shouldUnlock = completedChallenges.filter(c => c.completed && c.category === 'service').length >= 10;
            break;
          case "Guerrier de Prière":
            shouldUnlock = completedChallenges.filter(c => c.completed && c.category === 'prayer').length >= 20;
            break;
          case "Étudiant Assidu":
            shouldUnlock = completedChallenges.filter(c => c.completed && c.category === 'reading').length >= 15;
            break;
          case "Maître Spirituel":
            shouldUnlock = points >= 500;
            break;
          case "Champion de la Foi":
            shouldUnlock = streak >= 30;
            break;
        }

        if (shouldUnlock) {
          return {
            ...achievement,
            unlocked: true,
            unlockedDate: new Date().toLocaleDateString('fr-FR')
          };
        }
      }
      return achievement;
    });

    setAchievements(updatedAchievements);
    localStorage.setItem('achievements', JSON.stringify(updatedAchievements));
  };

  const resetChallenge = (challengeId: number) => {
    const updatedChallenges = challenges.map(challenge => {
      if (challenge.id === challengeId) {
        return {
          ...challenge,
          completed: false,
          completedDate: undefined,
          streak: 0
        };
      }
      return challenge;
    });

    setChallenges(updatedChallenges);
    localStorage.setItem('spiritualChallenges', JSON.stringify(updatedChallenges));
  };

  const filteredChallenges = selectedCategory === 'all' 
    ? challenges 
    : challenges.filter(c => c.category === selectedCategory);

  const getCategoryName = (category: string) => {
    const names = {
      all: 'Tous',
      prayer: 'Prière',
      reading: 'Lecture',
      service: 'Service',
      meditation: 'Méditation',
      community: 'Communauté'
    };
    return names[category as keyof typeof names] || category;
  };

  const getDifficultyColor = (difficulty: string) => {
    if (contrastHigh) return 'text-contrast-text';
    
    const colors = {
      beginner: 'text-green-600',
      intermediate: 'text-yellow-600',
      advanced: 'text-red-600'
    };
    return colors[difficulty as keyof typeof colors] || 'text-gray-600';
  };

  const getTypeFrequency = (type: string) => {
    const frequencies = {
      daily: 'Quotidien',
      weekly: 'Hebdomadaire',
      monthly: 'Mensuel'
    };
    return frequencies[type as keyof typeof frequencies] || type;
  };

  return (
    <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-purple-50 via-blue-50 to-green-50'}`}>
      {/* Header */}
      <header className={`py-6 px-4 sm:px-6 lg:px-8 ${contrastHigh ? 'bg-contrast-bg border-b-2 border-contrast-text' : 'bg-white shadow-sm'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                contrastHigh ? 'hover:bg-contrast-text/20' : 'hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl">←</span>
              <span className="font-medium">Retour</span>
            </Link>
            <h1 className={`text-2xl sm:text-3xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
              🎯 Défis Spirituels
            </h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Tableau de bord */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-xl text-center ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-br from-yellow-100 to-orange-100 shadow-lg'}`}>
            <div className="text-3xl mb-2">⭐</div>
            <div className={`text-2xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-orange-700'}`}>
              {totalPoints}
            </div>
            <div className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-orange-600'}`}>
              Points Total
            </div>
          </div>
          
          <div className={`p-6 rounded-xl text-center ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-br from-red-100 to-pink-100 shadow-lg'}`}>
            <div className="text-3xl mb-2">🔥</div>
            <div className={`text-2xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-red-700'}`}>
              {currentStreak}
            </div>
            <div className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-red-600'}`}>
              Jours Consécutifs
            </div>
          </div>
          
          <div className={`p-6 rounded-xl text-center ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-br from-green-100 to-emerald-100 shadow-lg'}`}>
            <div className="text-3xl mb-2">✅</div>
            <div className={`text-2xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-green-700'}`}>
              {challenges.filter(c => c.completed).length}
            </div>
            <div className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-green-600'}`}>
              Défis Complétés
            </div>
          </div>
          
          <div className={`p-6 rounded-xl text-center ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-br from-purple-100 to-indigo-100 shadow-lg'}`}>
            <div className="text-3xl mb-2">🏆</div>
            <div className={`text-2xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-purple-700'}`}>
              {achievements.filter(a => a.unlocked).length}
            </div>
            <div className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-purple-600'}`}>
              Succès Débloqués
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
          <h2 className={`text-xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
            🎛️ Filtres
          </h2>
          <div className="flex flex-wrap gap-3">
            {['all', 'prayer', 'reading', 'service', 'meditation', 'community'].map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? contrastHigh
                      ? 'bg-contrast-text text-contrast-bg'
                      : 'bg-blue-600 text-white shadow-lg'
                    : contrastHigh
                    ? 'bg-contrast-text/20 text-contrast-text hover:bg-contrast-text/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getCategoryName(category)}
              </button>
            ))}
          </div>
        </div>

        {/* Liste des défis */}
        <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
          <h2 className={`text-xl font-bold mb-6 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
            🎯 Défis Disponibles
          </h2>
          <div className="grid gap-4">
            {filteredChallenges.map(challenge => (
              <div
                key={challenge.id}
                className={`p-4 rounded-lg border ${
                  challenge.completed
                    ? contrastHigh
                      ? 'bg-contrast-text/20 border-contrast-text/30'
                      : 'bg-green-50 border-green-200'
                    : contrastHigh
                    ? 'bg-contrast-text/10 border-contrast-text/20'
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                } transition-all`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{challenge.icon}</span>
                      <h3 className={`text-lg font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
                        {challenge.title}
                      </h3>
                      {challenge.completed && (
                        <span className="text-green-500 text-xl">✅</span>
                      )}
                    </div>
                    
                    <p className={`mb-3 ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                      {challenge.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2 py-1 text-xs rounded ${contrastHigh ? 'bg-contrast-text/20' : 'bg-blue-100 text-blue-800'}`}>
                        {getTypeFrequency(challenge.type)}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded ${contrastHigh ? 'bg-contrast-text/20' : 'bg-purple-100 text-purple-800'}`}>
                        {getCategoryName(challenge.category)}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded ${getDifficultyColor(challenge.difficulty)} ${contrastHigh ? 'bg-contrast-text/20' : 'bg-gray-100'}`}>
                        {challenge.difficulty}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded ${contrastHigh ? 'bg-contrast-text/20' : 'bg-yellow-100 text-yellow-800'}`}>
                        {challenge.points} pts
                      </span>
                    </div>
                    
                    {challenge.completed && challenge.completedDate && (
                      <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-green-600'}`}>
                        Complété le {challenge.completedDate}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    {!challenge.completed ? (
                      <button
                        onClick={() => completeChallenge(challenge.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          contrastHigh
                            ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                            : 'bg-green-600 text-white hover:bg-green-700 shadow hover:shadow-lg'
                        }`}
                      >
                        Terminer
                      </button>
                    ) : (
                      <button
                        onClick={() => resetChallenge(challenge.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          contrastHigh
                            ? 'bg-contrast-text/20 text-contrast-text hover:bg-contrast-text/30'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Refaire
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Succès */}
        <div className={`p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
          <h2 className={`text-xl font-bold mb-6 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
            🏆 Succès et Récompenses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map(achievement => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg ${
                  achievement.unlocked
                    ? contrastHigh
                      ? 'bg-contrast-text/20 border-2 border-contrast-text/50'
                      : 'bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-orange-300'
                    : contrastHigh
                    ? 'bg-contrast-text/10 border border-contrast-text/20'
                    : 'bg-gray-100 border border-gray-300'
                } transition-all`}
              >
                <div className="text-center">
                  <div className={`text-4xl mb-3 ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <h3 className={`font-bold mb-2 ${
                    achievement.unlocked 
                      ? contrastHigh ? 'text-contrast-text' : 'text-orange-800'
                      : contrastHigh ? 'text-contrast-text/60' : 'text-gray-600'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm mb-2 ${
                    achievement.unlocked 
                      ? contrastHigh ? 'text-contrast-text' : 'text-gray-700'
                      : contrastHigh ? 'text-contrast-text/60' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                  <p className={`text-xs ${
                    achievement.unlocked 
                      ? contrastHigh ? 'text-contrast-text' : 'text-orange-600'
                      : contrastHigh ? 'text-contrast-text/60' : 'text-gray-400'
                  }`}>
                    {achievement.requirement}
                  </p>
                  {achievement.unlocked && achievement.unlockedDate && (
                    <p className={`text-xs mt-2 ${contrastHigh ? 'text-contrast-text' : 'text-green-600'}`}>
                      Débloqué le {achievement.unlockedDate}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SpiritualChallengesPage;