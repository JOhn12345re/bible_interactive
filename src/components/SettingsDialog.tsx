// import { useState } from 'react';
import { useSettings } from '../state/settingsStore';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SettingsDialog({ isOpen, onClose }: Props) {
  const {
    fontScale,
    contrastHigh,
    audioOn,
    fontFamily,
    setFontScale,
    toggleContrast,
    toggleAudio,
    setFont,
  } = useSettings();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`rounded-lg p-6 max-w-md w-full mx-4 ${
          contrastHigh
            ? 'bg-contrast-bg text-contrast-text border-2 border-contrast-text'
            : 'bg-white text-gray-900'
        }`}
        role="dialog"
        aria-labelledby="settings-title"
        aria-modal="true"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="settings-title" className="text-2xl font-bold">
            Réglages
          </h2>
          <button
            onClick={onClose}
            className={`text-2xl hover:opacity-70 ${
              contrastHigh ? 'text-contrast-text' : 'text-gray-500'
            }`}
            aria-label="Fermer les réglages"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Taille de police */}
          <div>
            <label className="block text-lg font-medium mb-3">
              Taille du texte
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setFontScale(fontScale - 0.1)}
                disabled={fontScale <= 0.8}
                className={`px-4 py-2 rounded font-bold text-xl ${
                  fontScale <= 0.8
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:opacity-80'
                } ${contrastHigh ? 'bg-contrast-text text-contrast-bg' : 'bg-blue-500 text-white'}`}
                aria-label="Diminuer la taille du texte"
              >
                A-
              </button>
              <span className="min-w-[60px] text-center text-lg">
                {Math.round(fontScale * 100)}%
              </span>
              <button
                onClick={() => setFontScale(fontScale + 0.1)}
                disabled={fontScale >= 1.6}
                className={`px-4 py-2 rounded font-bold text-xl ${
                  fontScale >= 1.6
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:opacity-80'
                } ${contrastHigh ? 'bg-contrast-text text-contrast-bg' : 'bg-blue-500 text-white'}`}
                aria-label="Augmenter la taille du texte"
              >
                A+
              </button>
            </div>
          </div>

          {/* Police */}
          <div>
            <label className="block text-lg font-medium mb-3">
              Police de caractères
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="font"
                  value="default"
                  checked={fontFamily === 'default'}
                  onChange={() => setFont('default')}
                  className="mr-3"
                />
                Police par défaut
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="font"
                  value="opendyslexic"
                  checked={fontFamily === 'opendyslexic'}
                  onChange={() => setFont('opendyslexic')}
                  className="mr-3"
                />
                OpenDyslexic (dyslexie)
              </label>
            </div>
          </div>

          {/* Contraste élevé */}
          <div>
            <label className="flex items-center justify-between">
              <span className="text-lg font-medium">Contraste élevé</span>
              <button
                onClick={toggleContrast}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  contrastHigh
                    ? contrastHigh
                      ? 'bg-contrast-text'
                      : 'bg-blue-600'
                    : 'bg-gray-300'
                }`}
                aria-pressed={contrastHigh}
                aria-label="Activer le contraste élevé"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                    contrastHigh
                      ? 'translate-x-6 bg-contrast-bg'
                      : 'translate-x-1 bg-white'
                  }`}
                />
              </button>
            </label>
          </div>

          {/* Audio */}
          <div>
            <label className="flex items-center justify-between">
              <span className="text-lg font-medium">Narration audio</span>
              <button
                onClick={toggleAudio}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  audioOn
                    ? contrastHigh
                      ? 'bg-contrast-text'
                      : 'bg-blue-600'
                    : 'bg-gray-300'
                }`}
                aria-pressed={audioOn}
                aria-label="Activer la narration audio"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                    audioOn
                      ? 'translate-x-6 bg-white'
                      : 'translate-x-1 bg-white'
                  }`}
                />
              </button>
            </label>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className={`px-6 py-3 rounded-lg font-medium ${
              contrastHigh
                ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
