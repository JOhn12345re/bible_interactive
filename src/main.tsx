import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';
import './styles/sermon.css';
import './styles/home-animations.css';
import '@fontsource/opendyslexic';
import { checkAndClearCache, getAppVersion } from './utils/cacheManager';
import logger from './utils/logger';

// Vérifier et effacer le cache si nouvelle version
checkAndClearCache().then((cacheCleared) => {
  if (cacheCleared) {
    logger.success(`Bible Interactive v${getAppVersion()} - Cache effacé, nouvelle version chargée`);
  } else {
    logger.info(`Bible Interactive v${getAppVersion()} - Application prête`);
  }
});

// Gestionnaire d'erreur global (erreurs critiques uniquement en prod)
window.addEventListener('error', (event) => {
  logger.error('Erreur globale:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  logger.error('Promise non gérée:', event.reason);
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  logger.error('Élément root introuvable!');
  document.body.innerHTML = '<div style="padding: 20px; font-family: Arial; text-align: center;"><h1>⚠️ Erreur de chargement</h1><p>Veuillez rafraîchir la page.</p></div>';
} else {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    logger.error('Échec du rendu:', error);
    rootElement.innerHTML = '<div style="padding: 20px; font-family: Arial; text-align: center;"><h1>⚠️ Erreur de chargement</h1><p>Veuillez rafraîchir la page ou contacter le support.</p></div>';
  }
}
