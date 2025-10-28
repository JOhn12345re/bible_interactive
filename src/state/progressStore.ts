import { create } from 'zustand';
import { useProfileStore } from './profileStore';

type Progress = {
  completed: Record<string, { badge?: string; date: string }>;
  markDone: (id: string, badge?: string) => void;
  reset: () => void;
  isCompleted: (id: string) => boolean;
  getBadge: (id: string) => string | undefined;
  getAllBadges: () => Array<{ id: string; badge: string; date: string }>;
  syncWithProfile: () => void;
};

export const useProgress = create<Progress>((set, get) => ({
  completed: JSON.parse(localStorage.getItem('bible-progress') || '{}'),

  markDone: (id, badge) =>
    set((s) => {
      const next = {
        ...s.completed,
        [id]: { badge, date: new Date().toISOString() },
      };
      localStorage.setItem('bible-progress', JSON.stringify(next));
      
      // Synchroniser avec le profil
      const profileStore = useProfileStore.getState();
      const currentProfile = profileStore.profile;
      if (currentProfile) {
        const currentCompletedLessons = Array.isArray(currentProfile.completedLessons) 
          ? currentProfile.completedLessons 
          : [];
        
        if (!currentCompletedLessons.includes(id)) {
          profileStore.updateProfile({
            completedLessons: [...currentCompletedLessons, id]
          });
        }
      }
      
      return { completed: next };
    }),

  reset: () =>
    set(() => {
      localStorage.removeItem('bible-progress');
      return { completed: {} };
    }),

  isCompleted: (id) => {
    const { completed } = get();
    return !!completed[id];
  },

  getBadge: (id) => {
    const { completed } = get();
    return completed[id]?.badge;
  },

  getAllBadges: () => {
    const { completed } = get();
    return Object.entries(completed)
      .filter(([, data]) => data.badge)
      .map(([id, data]) => ({
        id,
        badge: data.badge!,
        date: data.date,
      }));
  },

  syncWithProfile: () => {
    const { completed } = get();
    const profileStore = useProfileStore.getState();
    const currentProfile = profileStore.profile;
    
    if (currentProfile) {
      // Synchroniser les leçons terminées depuis le localStorage vers le profil
      const completedLessonIds = Object.keys(completed);
      // S'assurer que completedLessons est un array
      const currentCompletedLessons = Array.isArray(currentProfile.completedLessons) 
        ? currentProfile.completedLessons 
        : [];
      
      const uniqueCompletedLessons = Array.from(new Set([
        ...currentCompletedLessons,
        ...completedLessonIds
      ]));
      
      if (uniqueCompletedLessons.length !== currentCompletedLessons.length) {
        profileStore.updateProfile({
          completedLessons: uniqueCompletedLessons
        });
      }
    }
  },
}));
