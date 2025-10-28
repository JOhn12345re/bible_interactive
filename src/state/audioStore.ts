import { create } from 'zustand';

interface AudioState {
  soundEnabled: boolean;
  musicEnabled: boolean;
  volume: number;
  currentMusic: string | null;
  setSoundEnabled: (enabled: boolean) => void;
  setMusicEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
  playSound: (soundType: string) => void;
  playMusic: (musicType: string) => void;
  stopMusic: () => void;
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

// Musiques d'ambiance (synthétisées pour l'instant)
const createAmbientMusic = (type: string) => {
  const ctx = new AudioContext();

  switch (type) {
    case 'peaceful':
      // Musique paisible pour la lecture
      return createPeacefulAmbient(ctx);
    case 'adventure':
      // Musique d'aventure pour les jeux
      return createAdventureAmbient(ctx);
    case 'meditation':
      // Musique de méditation pour le journal
      return createMeditationAmbient(ctx);
    default:
      return null;
  }
};

const createPeacefulAmbient = (ctx: AudioContext) => {
  // Créer une ambiance paisible avec des tons doux
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  const gain2 = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc1.connect(gain1);
  osc2.connect(gain2);
  gain1.connect(filter);
  gain2.connect(filter);
  filter.connect(ctx.destination);

  osc1.frequency.setValueAtTime(220, ctx.currentTime); // La grave
  osc2.frequency.setValueAtTime(330, ctx.currentTime); // Mi

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, ctx.currentTime);

  gain1.gain.setValueAtTime(0.02, ctx.currentTime);
  gain2.gain.setValueAtTime(0.015, ctx.currentTime);

  osc1.start();
  osc2.start();

  return { osc1, osc2, gain1, gain2, filter };
};

const createAdventureAmbient = (ctx: AudioContext) => {
  // Musique plus dynamique pour les jeux
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.connect(gain);
  gain.connect(filter);
  filter.connect(ctx.destination);

  osc.frequency.setValueAtTime(440, ctx.currentTime);
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1000, ctx.currentTime);

  gain.gain.setValueAtTime(0.03, ctx.currentTime);

  osc.start();

  return { osc, gain, filter };
};

const createMeditationAmbient = (ctx: AudioContext) => {
  // Sons très doux pour la méditation
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.connect(gain);
  gain.connect(filter);
  filter.connect(ctx.destination);

  osc.frequency.setValueAtTime(174, ctx.currentTime); // Fréquence de guérison
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(500, ctx.currentTime);

  gain.gain.setValueAtTime(0.01, ctx.currentTime);

  osc.start();

  return { osc, gain, filter };
};

export const useAudioStore = create<AudioState>((set, get) => ({
  soundEnabled: true,
  musicEnabled: false,
  volume: 0.5,
  currentMusic: null,

  setSoundEnabled: (enabled: boolean) => {
    set({ soundEnabled: enabled });
    localStorage.setItem('bible-sound-enabled', JSON.stringify(enabled));
  },

  setMusicEnabled: (enabled: boolean) => {
    set({ musicEnabled: enabled });
    localStorage.setItem('bible-music-enabled', JSON.stringify(enabled));

    if (!enabled) {
      get().stopMusic();
    }
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

  playMusic: (musicType: string) => {
    const { musicEnabled, volume } = get();
    if (!musicEnabled) return;

    try {
      // Arrêter la musique actuelle
      get().stopMusic();

      // Démarrer la nouvelle musique
      const music = createAmbientMusic(musicType);
      if (music) {
        set({ currentMusic: musicType });
      }
    } catch (error) {
      console.log('Musique non disponible:', musicType);
    }
  },

  stopMusic: () => {
    // Note: Dans une vraie implémentation, on arrêterait les oscillateurs ici
    set({ currentMusic: null });
  },
}));

// Hook pour utiliser facilement les sons
export const useAudio = () => {
  const { playSound, playMusic, stopMusic } = useAudioStore();

  return {
    playClick: () => playSound('click'),
    playSuccess: () => playSound('success'),
    playError: () => playSound('error'),
    playNotification: () => playSound('notification'),
    playPeacefulMusic: () => playMusic('peaceful'),
    playAdventureMusic: () => playMusic('adventure'),
    playMeditationMusic: () => playMusic('meditation'),
    stopMusic,
  };
};
