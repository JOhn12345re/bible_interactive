import React, { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  text: string;
  title?: string;
  autoPlay?: boolean;
  showControls?: boolean;
  className?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  text,
  title,
  autoPlay = false,
  showControls = true,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Fonction pour convertir le texte en audio (utilise l'API Web Speech)
  const speakText = () => {
    if (!('speechSynthesis' in window)) {
      setError("La synthèse vocale n'est pas supportée sur cet appareil");
      return;
    }

    // Arrêter toute lecture en cours
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Configuration de la voix
    utterance.rate = 0.8; // Vitesse de lecture (plus lente pour les enfants)
    utterance.pitch = 1.0; // Hauteur de la voix
    utterance.volume = 0.8; // Volume

    // Sélectionner une voix française si disponible
    const voices = window.speechSynthesis.getVoices();
    const frenchVoice =
      voices.find(
        (voice) => voice.lang.startsWith('fr') && voice.name.includes('Female')
      ) || voices.find((voice) => voice.lang.startsWith('fr'));

    if (frenchVoice) {
      utterance.voice = frenchVoice;
    }

    // Événements
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsLoading(false);
      setError(null);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = (event) => {
      setIsPlaying(false);
      setIsLoading(false);
      setError('Erreur lors de la lecture audio');
      console.error('Erreur de synthèse vocale:', event);
    };

    // Démarrer la lecture
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSpeaking();
    } else {
      setIsLoading(true);
      speakText();
    }
  };

  // Auto-play si demandé
  useEffect(() => {
    if (autoPlay && text) {
      const timer = setTimeout(() => {
        speakText();
      }, 500); // Petit délai pour laisser le composant se charger

      return () => clearTimeout(timer);
    }
  }, [autoPlay, text]);

  // Nettoyage à la fermeture du composant
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  if (!showControls) {
    return null;
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Bouton de lecture */}
      <button
        onClick={togglePlay}
        disabled={isLoading}
        className={`
          flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200
          ${
            isLoading
              ? 'bg-gray-300 cursor-not-allowed'
              : isPlaying
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
          }
          transform hover:scale-105 active:scale-95
        `}
        title={isPlaying ? 'Arrêter la lecture' : 'Lire le texte'}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : isPlaying ? (
          <span className="text-sm">⏸️</span>
        ) : (
          <span className="text-sm">🔊</span>
        )}
      </button>

      {/* Informations sur la lecture */}
      <div className="flex-1 min-w-0">
        {title && (
          <div className="text-sm font-medium text-gray-700 truncate">
            {title}
          </div>
        )}
        {isPlaying && (
          <div className="text-xs text-blue-600 animate-pulse">
            Lecture en cours...
          </div>
        )}
        {error && <div className="text-xs text-red-600">{error}</div>}
      </div>

      {/* Indicateur de durée (simulation) */}
      {isPlaying && (
        <div className="flex items-center space-x-1">
          <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
          <div
            className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div
            className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"
            style={{ animationDelay: '0.4s' }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
