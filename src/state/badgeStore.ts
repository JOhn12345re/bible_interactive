import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Badge {
  id: string;
  icon: string;
  title: string;
  description: string;
  category: 'reading' | 'games' | 'learning' | 'special';
  earned: boolean;
  earnedAt?: Date;
  progress: number;
  target: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  type: 'verse' | 'quiz' | 'story' | 'psalm';
  target: number;
  current: number;
  completed: boolean;
  completedAt?: Date;
  reward: {
    icon: string;
    name: string;
  };
}

interface BadgeStore {
  badges: Badge[];
  dailyChallenges: DailyChallenge[];
  totalExperience: number;
  level: number;
  
  // Actions pour les badges
  earnBadge: (badgeId: string) => void;
  updateBadgeProgress: (badgeId: string, progress: number) => void;
  getBadgeById: (badgeId: string) => Badge | undefined;
  getBadgesByCategory: (category: string) => Badge[];
  
  // Actions pour les défis quotidiens
  completeChallenge: (challengeId: string) => void;
  updateChallengeProgress: (challengeId: string, progress: number) => void;
  resetDailyChallenges: () => void;
  
  // Actions pour l'expérience
  addExperience: (points: number) => void;
  getExperienceToNextLevel: () => number;
}

const initialBadges: Badge[] = [
  // Badges de lecture
  { id: 'first-verse', icon: '📖', title: 'Premier Verset', description: 'Lire votre premier verset biblique', category: 'reading', earned: false, progress: 0, target: 1 },
  { id: 'psalm-reader', icon: '🎵', title: 'Lecteur de Psaumes', description: 'Lire 5 psaumes différents', category: 'reading', earned: false, progress: 0, target: 5 },
  { id: 'bible-explorer', icon: '🗺️', title: 'Explorateur Biblique', description: 'Explorer 10 livres différents', category: 'reading', earned: false, progress: 0, target: 10 },
  
  // Badges de jeux
  { id: 'quiz-master', icon: '🧠', title: 'Maître du Quiz', description: 'Réussir 10 quiz sans erreur', category: 'games', earned: false, progress: 0, target: 10 },
  { id: 'order-expert', icon: '🔄', title: 'Expert de l\'Ordre', description: 'Réussir 5 jeux d\'ordre chronologique', category: 'games', earned: false, progress: 0, target: 5 },
  { id: 'memory-champion', icon: '🧩', title: 'Champion de Mémoire', description: 'Mémoriser 20 versets', category: 'games', earned: false, progress: 0, target: 20 },
  
  // Badges d'apprentissage
  { id: 'timeline-scholar', icon: '📜', title: 'Érudit de la Chronologie', description: 'Compléter la frise chronologique', category: 'learning', earned: false, progress: 0, target: 1 },
  { id: 'topic-expert', icon: '💡', title: 'Expert en Thèmes', description: 'Explorer 15 thèmes bibliques', category: 'learning', earned: false, progress: 0, target: 15 },
  { id: 'story-teller', icon: '📚', title: 'Conteur d\'Histoires', description: 'Lire 20 histoires bibliques', category: 'learning', earned: false, progress: 0, target: 20 },
  
  // Badges spéciaux
  { id: 'daily-devotion', icon: '☀️', title: 'Dévotion Quotidienne', description: 'Lire le psaume du jour 7 jours de suite', category: 'special', earned: false, progress: 0, target: 7 },
  { id: 'weekend-warrior', icon: '⚔️', title: 'Guerrier du Weekend', description: 'Compléter 5 défis le weekend', category: 'special', earned: false, progress: 0, target: 5 },
  { id: 'family-time', icon: '👨‍👩‍👧‍👦', title: 'Temps en Famille', description: 'Partager 10 versets avec la famille', category: 'special', earned: false, progress: 0, target: 10 },
];

const initialDailyChallenges: DailyChallenge[] = [
  {
    id: 'daily-verse',
    title: 'Verset du Jour',
    description: 'Lire et méditer sur le verset du jour',
    type: 'verse',
    target: 1,
    current: 0,
    completed: false,
    reward: { icon: '📖', name: 'Lecteur Quotidien' }
  },
  {
    id: 'psalm-reading',
    title: 'Psaume du Jour',
    description: 'Écouter le psaume du jour en audio',
    type: 'psalm',
    target: 1,
    current: 0,
    completed: false,
    reward: { icon: '🎵', name: 'Mélomane Biblique' }
  },
  {
    id: 'quiz-master',
    title: 'Quiz Quotidien',
    description: 'Réussir un quiz biblique sans erreur',
    type: 'quiz',
    target: 1,
    current: 0,
    completed: false,
    reward: { icon: '🧠', name: 'Maître du Quiz' }
  },
  {
    id: 'story-explorer',
    title: 'Histoire Biblique',
    description: 'Lire une nouvelle histoire biblique',
    type: 'story',
    target: 1,
    current: 0,
    completed: false,
    reward: { icon: '📚', name: 'Explorateur d\'Histoires' }
  }
];

export const useBadgeStore = create<BadgeStore>()(
  persist(
    (set, get) => ({
      badges: initialBadges,
      dailyChallenges: initialDailyChallenges,
      totalExperience: 0,
      level: 1,

      // Actions pour les badges
      earnBadge: (badgeId: string) => {
        set((state) => ({
          badges: state.badges.map(badge =>
            badge.id === badgeId
              ? { ...badge, earned: true, earnedAt: new Date(), progress: badge.target }
              : badge
          ),
          totalExperience: state.totalExperience + 100 // 100 points par badge
        }));
      },

      updateBadgeProgress: (badgeId: string, progress: number) => {
        set((state) => ({
          badges: state.badges.map(badge => {
            if (badge.id === badgeId) {
              const newProgress = Math.min(progress, badge.target);
              const shouldEarn = newProgress >= badge.target && !badge.earned;
              
              return {
                ...badge,
                progress: newProgress,
                earned: shouldEarn,
                earnedAt: shouldEarn ? new Date() : badge.earnedAt
              };
            }
            return badge;
          })
        }));

        // Vérifier si le badge doit être gagné
        const badge = get().badges.find(b => b.id === badgeId);
        if (badge && progress >= badge.target && !badge.earned) {
          get().earnBadge(badgeId);
        }
      },

      getBadgeById: (badgeId: string) => {
        return get().badges.find(badge => badge.id === badgeId);
      },

      getBadgesByCategory: (category: string) => {
        return get().badges.filter(badge => badge.category === category);
      },

      // Actions pour les défis quotidiens
      completeChallenge: (challengeId: string) => {
        set((state) => ({
          dailyChallenges: state.dailyChallenges.map(challenge =>
            challenge.id === challengeId
              ? { ...challenge, completed: true, completedAt: new Date(), current: challenge.target }
              : challenge
          ),
          totalExperience: state.totalExperience + 50 // 50 points par défi
        }));
      },

      updateChallengeProgress: (challengeId: string, progress: number) => {
        set((state) => ({
          dailyChallenges: state.dailyChallenges.map(challenge => {
            if (challenge.id === challengeId) {
              const newProgress = Math.min(progress, challenge.target);
              const shouldComplete = newProgress >= challenge.target && !challenge.completed;
              
              return {
                ...challenge,
                current: newProgress,
                completed: shouldComplete,
                completedAt: shouldComplete ? new Date() : challenge.completedAt
              };
            }
            return challenge;
          })
        }));

        // Vérifier si le défi doit être complété
        const challenge = get().dailyChallenges.find(c => c.id === challengeId);
        if (challenge && progress >= challenge.target && !challenge.completed) {
          get().completeChallenge(challengeId);
        }
      },

      resetDailyChallenges: () => {
        set((state) => ({
          dailyChallenges: state.dailyChallenges.map(challenge => ({
            ...challenge,
            completed: false,
            current: 0,
            completedAt: undefined
          }))
        }));
      },

      // Actions pour l'expérience
      addExperience: (points: number) => {
        set((state) => {
          const newExperience = state.totalExperience + points;
          const newLevel = Math.floor(newExperience / 1000) + 1; // 1000 points par niveau
          
          return {
            totalExperience: newExperience,
            level: newLevel
          };
        });
      },

      getExperienceToNextLevel: () => {
        const { totalExperience, level } = get();
        const currentLevelExp = (level - 1) * 1000;
        const nextLevelExp = level * 1000;
        return nextLevelExp - (totalExperience - currentLevelExp);
      }
    }),
    {
      name: 'badge-store',
      partialize: (state) => ({
        badges: state.badges,
        dailyChallenges: state.dailyChallenges,
        totalExperience: state.totalExperience,
        level: state.level
      })
    }
  )
);
