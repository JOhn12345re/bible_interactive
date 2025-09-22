import React, { useState } from 'react';
import { useAudioStore } from '../state/audioStore';
import { useSettings } from '../state/settingsStore';

const AudioControls = () => {
  const { contrastHigh } = useSettings();
  const { 
    soundEnabled, 
    musicEnabled, 
    volume, 
    setSoundEnabled, 
    setMusicEnabled, 
    setVolume,
    currentMusic
  } = useAudioStore();
  
  const [showControls, setShowControls] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Bouton principal */}
      <button
        onClick={() => setShowControls(!showControls)}
        className={`w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          contrastHigh 
            ? 'bg-contrast-text text-contrast-bg'
            : 'bg-gradient-to-br from-purple-500 to-blue-600 text-white'
        } ${showControls ? 'rotate-180' : ''}`}
        title="Contrôles audio"
      >
        🎵
      </button>

      {/* Panel de contrôles */}
      {showControls && (
        <div className={`absolute bottom-16 right-0 p-4 rounded-xl shadow-xl border-2 min-w-[200px] transform transition-all duration-300 animate-slide-in-up ${
          contrastHigh 
            ? 'bg-contrast-bg border-contrast-text text-contrast-text'
            : 'bg-white border-purple-200 text-gray-800'
        }`}>
          <h3 className="font-bold mb-3 text-center">🎵 Audio</h3>
          
          {/* Contrôle des sons */}
          <div className="mb-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium">Sons 🔊</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors duration-300 ${
                  soundEnabled 
                    ? contrastHigh ? 'bg-contrast-text' : 'bg-green-500'
                    : contrastHigh ? 'bg-contrast-text/30' : 'bg-gray-300'
                }`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
                    soundEnabled ? 'translate-x-5 translate-y-1' : 'translate-x-1 translate-y-1'
                  }`}></div>
                </div>
              </div>
            </label>
          </div>

          {/* Contrôle de la musique */}
          <div className="mb-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium">Musique 🎶</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={musicEnabled}
                  onChange={(e) => setMusicEnabled(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors duration-300 ${
                  musicEnabled 
                    ? contrastHigh ? 'bg-contrast-text' : 'bg-blue-500'
                    : contrastHigh ? 'bg-contrast-text/30' : 'bg-gray-300'
                }`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
                    musicEnabled ? 'translate-x-5 translate-y-1' : 'translate-x-1 translate-y-1'
                  }`}></div>
                </div>
              </div>
            </label>
          </div>

          {/* Contrôle du volume */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Volume: {Math.round(volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                contrastHigh 
                  ? 'bg-contrast-text/30 slider-contrast'
                  : 'bg-gray-200 slider-thumb'
              }`}
            />
          </div>

          {/* État actuel */}
          {currentMusic && (
            <div className={`text-xs text-center p-2 rounded ${
              contrastHigh ? 'bg-contrast-text/10' : 'bg-purple-50'
            }`}>
              🎵 {currentMusic === 'peaceful' && 'Ambiance Paisible'}
              {currentMusic === 'adventure' && 'Musique d\'Aventure'}
              {currentMusic === 'meditation' && 'Méditation'}
            </div>
          )}

          {/* Boutons de musique rapides */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            <button
              onClick={() => useAudioStore.getState().playMusic('peaceful')}
              className={`p-2 rounded text-xs transition-colors ${
                contrastHigh 
                  ? 'bg-contrast-text/20 hover:bg-contrast-text/30'
                  : 'bg-green-100 hover:bg-green-200 text-green-800'
              }`}
              title="Musique paisible"
            >
              🕊️
            </button>
            <button
              onClick={() => useAudioStore.getState().playMusic('adventure')}
              className={`p-2 rounded text-xs transition-colors ${
                contrastHigh 
                  ? 'bg-contrast-text/20 hover:bg-contrast-text/30'
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
              }`}
              title="Musique d'aventure"
            >
              ⚔️
            </button>
            <button
              onClick={() => useAudioStore.getState().playMusic('meditation')}
              className={`p-2 rounded text-xs transition-colors ${
                contrastHigh 
                  ? 'bg-contrast-text/20 hover:bg-contrast-text/30'
                  : 'bg-purple-100 hover:bg-purple-200 text-purple-800'
              }`}
              title="Méditation"
            >
              🧘
            </button>
          </div>
        </div>
      )}

      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .slider-thumb::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .slider-contrast::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--contrast-text, #000);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};

export default AudioControls;