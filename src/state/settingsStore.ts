import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Settings = {
  fontScale: number;
  contrastHigh: boolean;
  audioOn: boolean;
  fontFamily: 'default' | 'opendyslexic';
  setFontScale: (v: number) => void;
  toggleContrast: () => void;
  toggleAudio: () => void;
  setFont: (f: Settings['fontFamily']) => void;
};

export const useSettings = create<Settings>()(
  persist(
    (set) => ({
      fontScale: 1,
      contrastHigh: false,
      audioOn: true,
      fontFamily: 'default',
      setFontScale: (v) => set({ fontScale: Math.max(0.8, Math.min(1.6, v)) }),
      toggleContrast: () => set((s) => {
        const newContrast = !s.contrastHigh;
        // Appliquer la classe au HTML
        if (newContrast) {
          document.documentElement.classList.add('contrast-high');
        } else {
          document.documentElement.classList.remove('contrast-high');
        }
        return { contrastHigh: newContrast };
      }),
      toggleAudio: () => set((s) => ({ audioOn: !s.audioOn })),
      setFont: (f) => set({ fontFamily: f }),
    }),
    {
      name: 'bible-settings',
    }
  )
);
