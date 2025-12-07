import { create } from 'zustand';

interface AudioState {
  soundEnabled: boolean;
  volume: number;
  setSoundEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
  playSound: (soundType: string) => void;
}

// Sons disponibles (on peut les remplacer par de vrais fichiers audio plus tard)
const SOUNDS = {
  click: () => {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(800, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  },

  success: () => {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Mélodie de succès simple
    osc.frequency.setValueAtTime(523, ctx.currentTime); // Do
    osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // Mi
    osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // Sol

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  },

  error: () => {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Son d'erreur
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.setValueAtTime(150, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  },

  notification: () => {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Son de notification doux
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  },
};

export const useAudioStore = create<AudioState>((set, get) => ({
  soundEnabled: true,
  volume: 0.5,

  setSoundEnabled: (enabled: boolean) => {
    set({ soundEnabled: enabled });
    localStorage.setItem('bible-sound-enabled', JSON.stringify(enabled));
  },

  setVolume: (volume: number) => {
    set({ volume });
    localStorage.setItem('bible-volume', JSON.stringify(volume));
  },

  playSound: (soundType: string) => {
    const { soundEnabled, volume } = get();
    if (!soundEnabled) return;

    try {
      const soundFunction = SOUNDS[soundType as keyof typeof SOUNDS];
      if (soundFunction) {
        soundFunction();
      }
    } catch (error) {
      console.log('Son non disponible:', soundType);
    }
  },
}));

// Hook pour utiliser facilement les sons
export const useAudio = () => {
  const { playSound } = useAudioStore();

  return {
    playClick: () => playSound('click'),
    playSuccess: () => playSound('success'),
    playError: () => playSound('error'),
    playNotification: () => playSound('notification'),
  };
};
