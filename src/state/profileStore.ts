import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: 'reading' | 'games' | 'learning' | 'consistency';
}

export interface UserProfile {
  id?: string;
  firstName: string;
  lastName: string;
  age: number;
  church: string;
  email?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
  // Nouvelles propriétés avancées
  favoriteVerses: string[];
  completedLessons: string[];
  gameStats: {
    totalGamesPlayed: number;
    totalScore: number;
    favoriteGame: string;
    achievements: Achievement[];
  };
  readingStats: {
    totalReadingTime: number; // en minutes
    booksRead: string[];
    currentBook: string;
    currentChapter: number;
    dailyStreak: number;
  };
  preferences: {
    preferredTranslation: string;
    reminderTime?: string;
    dailyGoal: number; // versets par jour
    notifications: boolean;
  };
}

// Avatars disponibles
export const AVAILABLE_AVATARS = [
  '👦',
  '👧',
  '🧒',
  '👶',
  '🧑',
  '👱‍♂️',
  '👱‍♀️',
  '🧔',
  '👨‍🦱',
  '👩‍🦱',
  '👨‍🦰',
  '👩‍🦰',
  '👨‍🦲',
  '👩‍🦲',
  '🐑',
  '🕊️',
  '⭐',
  '👑',
  '📖',
  '🎯',
  '🏆',
  '💎',
];

// Achievements prédéfinis
export const PREDEFINED_ACHIEVEMENTS: Omit<Achievement, 'unlockedAt'>[] = [
  {
    id: 'first-game',
    title: 'Premier Jeu',
    description: 'Tu as joué à ton premier jeu biblique !',
    icon: '🎮',
    category: 'games',
  },
  {
    id: 'game-master',
    title: 'Maître des Jeux',
    description: 'Tu as joué à tous les jeux disponibles !',
    icon: '🏆',
    category: 'games',
  },
  {
    id: 'verse-collector',
    title: 'Collectionneur de Versets',
    description: 'Tu as mémorisé 10 versets !',
    icon: '📚',
    category: 'learning',
  },
  {
    id: 'daily-reader',
    title: 'Lecteur Quotidien',
    description: 'Tu as lu la Bible 7 jours de suite !',
    icon: '📖',
    category: 'consistency',
  },
  {
    id: 'explorer',
    title: 'Explorateur',
    description: 'Tu as visité toutes les sections du site !',
    icon: '🗺️',
    category: 'learning',
  },
  {
    id: 'quiz-expert',
    title: 'Expert en Quiz',
    description: 'Tu as obtenu 100% à un quiz biblique !',
    icon: '🧠',
    category: 'games',
  },
];

interface ProfileState {
  profile: UserProfile | null;
  isProfileComplete: boolean;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  clearProfile: () => void;
  saveProfileToServer: (profile: UserProfile) => Promise<boolean>;
  loadProfileFromServer: (userId?: string) => Promise<boolean>;
  initializeDemoProfile: () => void;

  // Nouvelles méthodes avancées
  addAchievement: (achievement: Omit<Achievement, 'unlockedAt'>) => void;
  addFavoriteVerse: (verse: string) => void;
  removeFavoriteVerse: (verse: string) => void;
  updateGameStats: (gameType: string, score: number) => void;
  updateReadingProgress: (
    book: string,
    chapter: number,
    timeSpent: number
  ) => void;
  completeLesson: (lessonId: string) => void;

  // Getters
  getTotalAchievements: () => number;
  getAchievementsByCategory: (
    category: Achievement['category']
  ) => Achievement[];
  getLevelInfo: () => { level: number; progress: number; nextLevelAt: number };
}

const createDefaultUserProfile = (): UserProfile => ({
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

const defaultProfile: UserProfile = createDefaultUserProfile();

// Helper pour étendre les anciens profils avec les nouvelles propriétés
const extendOldProfile = (oldProfile: any): UserProfile => {
  const defaultProps = createDefaultUserProfile();
  return {
    ...defaultProps,
    ...oldProfile,
    favoriteVerses: Array.isArray(oldProfile.favoriteVerses) 
      ? oldProfile.favoriteVerses 
      : defaultProps.favoriteVerses,
    completedLessons: Array.isArray(oldProfile.completedLessons)
      ? oldProfile.completedLessons 
      : defaultProps.completedLessons,
    gameStats: oldProfile.gameStats || defaultProps.gameStats,
    readingStats: oldProfile.readingStats || defaultProps.readingStats,
    preferences: oldProfile.preferences || defaultProps.preferences,
  };
};

// Storage key pour le profil local
const PROFILE_STORAGE_KEY = 'bible_interactive_profile';

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profile: null,
      isProfileComplete: false,

      setProfile: (profile) => {
        const isComplete = !!(
          profile.firstName &&
          profile.lastName &&
          profile.age > 0 &&
          profile.church
        );
        set({ profile, isProfileComplete: isComplete });
      },

      updateProfile: (updates) => {
        const currentProfile = get().profile || defaultProfile;
        const newProfile = { ...currentProfile, ...updates };
        const isComplete = !!(
          newProfile.firstName &&
          newProfile.lastName &&
          newProfile.age > 0 &&
          newProfile.church
        );
        set({ profile: newProfile, isProfileComplete: isComplete });
      },

      clearProfile: () => {
        set({ profile: null, isProfileComplete: false });
      },

      // Créer un profil de démonstration si aucun n'existe
      initializeDemoProfile: () => {
        const currentProfile = get().profile;
        if (!currentProfile) {
          const demoProfile: UserProfile = {
            id: 'demo-profile',
            firstName: 'Jean',
            lastName: 'Dupont',
            age: 12,
            church: 'Église de la Paix',
            email: 'jean.dupont@exemple.fr',
            avatar: '👦',
            favoriteVerses: [
              "Car Dieu a tant aimé le monde qu'il a donné son Fils unique - Jean 3:16",
            ],
            completedLessons: ['lesson-1', 'lesson-2'],
            gameStats: {
              totalGamesPlayed: 3,
              totalScore: 240,
              favoriteGame: 'Quiz Biblique',
              achievements: [
                {
                  id: 'first-game',
                  title: 'Premier Jeu',
                  description: 'Tu as joué à ton premier jeu biblique !',
                  icon: '🎮',
                  category: 'games',
                  unlockedAt: new Date(Date.now() - 86400000).toISOString(), // Il y a 1 jour
                },
              ],
            },
            readingStats: {
              totalReadingTime: 45,
              booksRead: ['Genèse'],
              currentBook: 'Exode',
              currentChapter: 3,
              dailyStreak: 5,
            },
            preferences: {
              preferredTranslation: 'Louis Segond 1910',
              dailyGoal: 5,
              notifications: true,
            },
            createdAt: new Date(Date.now() - 604800000).toISOString(), // Il y a 1 semaine
            updatedAt: new Date().toISOString(),
          };
          get().setProfile(demoProfile);
        }
      },

      saveProfileToServer: async (profile) => {
        try {
          // Générer un ID si nécessaire
          const profileToSave = {
            ...profile,
            id: profile.id || Date.now().toString(),
            updatedAt: new Date().toISOString(),
            createdAt: profile.createdAt || new Date().toISOString(),
          };

          // Sauvegarder dans localStorage
          localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileToSave));
          
          // Mettre à jour le state
          set({ profile: profileToSave });
          
          return true;
        } catch (error) {
          console.error('Erreur sauvegarde profil:', error);
          return false;
        }
      },

      loadProfileFromServer: async (userId) => {
        try {
          // Charger depuis localStorage
          const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
          
          if (stored) {
            const parsedProfile = JSON.parse(stored);
            
            // Si userId est fourni, vérifier que c'est le bon profil
            if (userId && parsedProfile.id !== userId) {
              return false;
            }
            
            const extendedProfile = extendOldProfile(parsedProfile);
            const isComplete = !!(
              extendedProfile.firstName &&
              extendedProfile.lastName &&
              extendedProfile.age > 0 &&
              extendedProfile.church
            );
            set({ profile: extendedProfile, isProfileComplete: isComplete });
            return true;
          }
          
          return false;
        } catch (error) {
          console.error('Erreur chargement profil:', error);
          return false;
        }
      },

      // Nouvelles méthodes avancées
      addAchievement: (achievement: Omit<Achievement, 'unlockedAt'>) => {
        const currentProfile = get().profile;
        if (!currentProfile) return;

        // Vérifier si l'achievement existe déjà
        const achievementExists = currentProfile.gameStats?.achievements?.some(
          (existingAchievement) => existingAchievement.id === achievement.id
        );

        if (achievementExists) {
          return;
        }

        const newAchievement: Achievement = {
          ...achievement,
          unlockedAt: new Date().toISOString(),
        };

        const updatedProfile = {
          ...currentProfile,
          gameStats: {
            ...currentProfile.gameStats,
            achievements: [
              ...(currentProfile.gameStats?.achievements || []),
              newAchievement,
            ],
          },
        };

        get().updateProfile(updatedProfile);
      },

      addFavoriteVerse: (verse: string) => {
        const currentProfile = get().profile;
        if (!currentProfile || currentProfile.favoriteVerses.includes(verse))
          return;

        get().updateProfile({
          favoriteVerses: [...currentProfile.favoriteVerses, verse],
        });
      },

      removeFavoriteVerse: (verse: string) => {
        const currentProfile = get().profile;
        if (!currentProfile) return;

        get().updateProfile({
          favoriteVerses: currentProfile.favoriteVerses.filter(
            (v) => v !== verse
          ),
        });
      },

      updateGameStats: (gameType: string, score: number) => {
        const currentProfile = get().profile;
        if (!currentProfile) return;

        const currentGameStats = currentProfile.gameStats || {
          totalGamesPlayed: 0,
          totalScore: 0,
          favoriteGame: '',
          achievements: [],
        };

        const updatedGameStats = {
          ...currentGameStats,
          totalGamesPlayed: currentGameStats.totalGamesPlayed + 1,
          totalScore: currentGameStats.totalScore + score,
          favoriteGame: gameType,
        };

        get().updateProfile({
          gameStats: updatedGameStats,
        });

        // Vérifier les achievements
        if (updatedGameStats.totalGamesPlayed === 1) {
          get().addAchievement(PREDEFINED_ACHIEVEMENTS[0]); // Premier jeu
        }

        if (updatedGameStats.totalGamesPlayed >= 7) {
          get().addAchievement(PREDEFINED_ACHIEVEMENTS[1]); // Maître des jeux
        }

        if (score === 100) {
          get().addAchievement(PREDEFINED_ACHIEVEMENTS[5]); // Quiz expert
        }
      },

      updateReadingProgress: (
        book: string,
        chapter: number,
        timeSpent: number
      ) => {
        const currentProfile = get().profile;
        if (!currentProfile) return;

        const updatedReadingStats = {
          ...currentProfile.readingStats,
          totalReadingTime:
            currentProfile.readingStats.totalReadingTime + timeSpent,
          currentBook: book,
          currentChapter: chapter,
          booksRead: currentProfile.readingStats.booksRead.includes(book)
            ? currentProfile.readingStats.booksRead
            : [...currentProfile.readingStats.booksRead, book],
        };

        get().updateProfile({
          readingStats: updatedReadingStats,
        });
      },

      completeLesson: (lessonId: string) => {
        const currentProfile = get().profile;
        if (!currentProfile) return;
        
        const currentCompletedLessons = Array.isArray(currentProfile.completedLessons) 
          ? currentProfile.completedLessons 
          : [];
          
        if (currentCompletedLessons.includes(lessonId)) return;

        get().updateProfile({
          completedLessons: [...currentCompletedLessons, lessonId],
        });
      },

      getTotalAchievements: () => {
        const currentProfile = get().profile;
        return currentProfile?.gameStats?.achievements?.length || 0;
      },

      getAchievementsByCategory: (category: Achievement['category']) => {
        const currentProfile = get().profile;
        return (
          currentProfile?.gameStats?.achievements?.filter(
            (a) => a.category === category
          ) || []
        );
      },

      getLevelInfo: () => {
        const currentProfile = get().profile;
        if (!currentProfile) return { level: 1, progress: 0, nextLevelAt: 100 };

        // Safe access with defaults for potentially undefined nested properties
        const gameStats = currentProfile.gameStats || { totalScore: 0 };
        const readingStats = currentProfile.readingStats || {
          totalReadingTime: 0,
        };
        const completedLessons = currentProfile.completedLessons || [];

        const totalXP =
          (gameStats.totalScore || 0) +
          (readingStats.totalReadingTime || 0) * 2 +
          completedLessons.length * 50;

        const level = Math.floor(totalXP / 100) + 1;
        const progress = totalXP % 100;
        const nextLevelAt = 100;

        return { level, progress, nextLevelAt };
      },
    }),
    {
      name: 'profile-store',
      partialize: (state) => ({
        profile: state.profile,
        isProfileComplete: state.isProfileComplete,
      }),
    }
  )
);
