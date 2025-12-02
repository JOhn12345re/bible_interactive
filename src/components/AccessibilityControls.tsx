import React, { useState, useEffect } from 'react';
import { useSettings } from '../state/settingsStore';
import { clearCacheAndReload, getAppVersion } from '../utils/cacheManager';

const AccessibilityControls = () => {
  const {
    contrastHigh,
    fontScale,
    fontFamily,
    toggleContrast,
    setFontScale,
    setFont,
  } = useSettings();

  const [showControls, setShowControls] = useState(false);
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  // Détecter l'utilisation du clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Raccourcis clavier
  useEffect(() => {
    const handleKeyboardShortcuts = (e: KeyboardEvent) => {
      // Alt + A pour ouvrir les contrôles d'accessibilité
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        setShowControls(!showControls);
      }

      // Alt + C pour le contraste
      if (e.altKey && e.key === 'c') {
        e.preventDefault();
        toggleContrast();
      }

      // Alt + + pour augmenter la taille
      if (e.altKey && e.key === '+') {
        e.preventDefault();
        setFontScale(Math.min(fontScale + 0.1, 2.0));
      }

      // Alt + - pour diminuer la taille
      if (e.altKey && e.key === '-') {
        e.preventDefault();
        setFontScale(Math.max(fontScale - 0.1, 0.8));
      }
    };

    document.addEventListener('keydown', handleKeyboardShortcuts);
    return () =>
      document.removeEventListener('keydown', handleKeyboardShortcuts);
  }, [showControls, contrastHigh, fontScale, toggleContrast, setFontScale]);

  return (
    <>
      {/* Indicateur d'utilisation du clavier */}
      {isKeyboardUser && (
        <div className="sr-only" aria-live="polite">
          Navigation au clavier activée. Utilisez Tab pour naviguer.
        </div>
      )}

      {/* Raccourcis cachés pour lecteurs d'écran */}
      <div className="sr-only">
        <p>Raccourcis clavier disponibles :</p>
        <ul>
          <li>Alt + A : Ouvrir les contrôles d'accessibilité</li>
          <li>Alt + C : Basculer le mode contraste élevé</li>
          <li>Alt + + : Augmenter la taille du texte</li>
          <li>Alt + - : Diminuer la taille du texte</li>
        </ul>
      </div>

      <div className="fixed top-4 right-4 z-50">
        {/* Bouton principal */}
        <button
          onClick={() => setShowControls(!showControls)}
          className={`w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:scale-110 ${
            contrastHigh
              ? 'bg-contrast-text text-contrast-bg'
              : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
          } ${showControls ? 'rotate-180' : ''}`}
          aria-label="Ouvrir les contrôles d'accessibilité"
          aria-expanded={showControls}
          aria-controls="accessibility-panel"
        >
          ♿
        </button>

        {/* Panel de contrôles */}
        {showControls && (
          <div
            id="accessibility-panel"
            className={`absolute top-16 right-0 p-4 rounded-xl shadow-xl border-2 min-w-[280px] transform transition-all duration-300 animate-slide-in-up ${
              contrastHigh
                ? 'bg-contrast-bg border-contrast-text text-contrast-text'
                : 'bg-white border-indigo-200 text-gray-800'
            }`}
            role="dialog"
            aria-labelledby="accessibility-title"
          >
            <h3 id="accessibility-title" className="font-bold mb-4 text-center">
              ♿ Accessibilité
            </h3>

            {/* Contraste élevé */}
            <div className="mb-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium flex items-center">
                  <span className="mr-2">🌗</span>
                  Contraste élevé
                </span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={contrastHigh}
                    onChange={() => toggleContrast()}
                    className="sr-only"
                    aria-describedby="contrast-help"
                  />
                  <div
                    className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                      contrastHigh ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
                        contrastHigh
                          ? 'translate-x-6 translate-y-0.5'
                          : 'translate-x-0.5 translate-y-0.5'
                      }`}
                    ></div>
                  </div>
                </div>
              </label>
              <p id="contrast-help" className="text-xs text-gray-500 mt-1">
                Améliore la lisibilité avec des couleurs plus contrastées
              </p>
            </div>

            {/* Taille de police */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                <span className="mr-2">📝</span>
                Taille du texte: {Math.round(fontScale * 100)}%
              </label>
              <input
                type="range"
                min="0.8"
                max="2.0"
                step="0.1"
                value={fontScale}
                onChange={(e) => setFontScale(parseFloat(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                  contrastHigh ? 'bg-contrast-text/30' : 'bg-gray-200'
                }`}
                aria-describedby="font-size-help"
              />
              <p id="font-size-help" className="text-xs text-gray-500 mt-1">
                Ajuste la taille du texte selon tes besoins
              </p>
              <div className="flex justify-between text-xs mt-1">
                <button
                  onClick={() => setFontScale(Math.max(fontScale - 0.1, 0.8))}
                  className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
                  aria-label="Diminuer la taille du texte"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontScale(1.0)}
                  className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
                  aria-label="Taille normale"
                >
                  Normal
                </button>
                <button
                  onClick={() => setFontScale(Math.min(fontScale + 0.1, 2.0))}
                  className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
                  aria-label="Augmenter la taille du texte"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Police de caractères */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                <span className="mr-2">🔤</span>
                Police de caractères
              </label>
              <select
                value={fontFamily}
                onChange={(e) =>
                  setFont(e.target.value as 'default' | 'opendyslexic')
                }
                className={`w-full p-2 rounded border ${
                  contrastHigh
                    ? 'bg-contrast-bg border-contrast-text text-contrast-text'
                    : 'bg-white border-gray-300'
                }`}
                aria-describedby="font-family-help"
              >
                <option value="default">Police par défaut</option>
                <option value="opendyslexic">OpenDyslexic (Dyslexie)</option>
              </select>
              <p id="font-family-help" className="text-xs text-gray-500 mt-1">
                OpenDyslexic aide les personnes dyslexiques
              </p>
            </div>

            {/* Actions rapides */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setFontScale(1.0);
                  // Reset contrast en appelant toggleContrast() seulement si c'est activé
                  if (contrastHigh) toggleContrast();
                  setFont('default');
                }}
                className={`p-2 rounded text-xs transition-colors ${
                  contrastHigh
                    ? 'bg-contrast-text/20 hover:bg-contrast-text/30'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
                aria-label="Réinitialiser tous les paramètres"
              >
                🔄 Reset
              </button>
              <button
                onClick={() => setShowControls(false)}
                className={`p-2 rounded text-xs transition-colors ${
                  contrastHigh
                    ? 'bg-contrast-text/20 hover:bg-contrast-text/30'
                    : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800'
                }`}
                aria-label="Fermer les contrôles d'accessibilité"
              >
                ✅ Fermer
              </button>
            </div>

            {/* Bouton effacer le cache */}
            <div className="mt-3">
              <button
                onClick={() => {
                  if (confirm('Effacer le cache et recharger la page ?')) {
                    clearCacheAndReload();
                  }
                }}
                className={`w-full p-2 rounded text-xs transition-colors ${
                  contrastHigh
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-red-100 hover:bg-red-200 text-red-800'
                }`}
                aria-label="Effacer le cache et recharger"
              >
                🗑️ Effacer le cache (v{getAppVersion()})
              </button>
            </div>

            {/* Aide */}
            <div
              className={`mt-4 p-3 rounded text-xs ${
                contrastHigh
                  ? 'bg-contrast-text/10'
                  : 'bg-blue-50 text-blue-800'
              }`}
            >
              <p className="font-medium mb-1">💡 Raccourcis clavier :</p>
              <ul className="space-y-1">
                <li>Alt + A : Ouvrir ce menu</li>
                <li>Alt + C : Contraste élevé</li>
                <li>Alt + +/- : Taille du texte</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* Focus visible amélioré pour navigation clavier */
        *:focus-visible {
          outline: 3px solid #3b82f6;
          outline-offset: 2px;
          border-radius: 4px;
        }

        /* Skip links pour navigation clavier */
        .skip-link {
          position: absolute;
          top: -40px;
          left: 6px;
          background: #000;
          color: #fff;
          padding: 8px;
          text-decoration: none;
          border-radius: 4px;
          z-index: 100;
        }

        .skip-link:focus {
          top: 6px;
        }
      `}</style>
    </>
  );
};

export default AccessibilityControls;
