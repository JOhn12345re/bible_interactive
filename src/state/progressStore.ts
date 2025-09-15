import { create } from 'zustand';

type Progress = {
  completed: Record<string, { badge?: string; date: string }>;
  markDone: (id: string, badge?: string) => void;
  reset: () => void;
  isCompleted: (id: string) => boolean;
  getBadge: (id: string) => string | undefined;
  getAllBadges: () => Array<{ id: string; badge: string; date: string }>;
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
}));
