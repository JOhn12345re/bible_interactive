import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';
import './styles/sermon.css';
import './styles/home-animations.css';
import '@fontsource/opendyslexic';
import { checkAndClearCache, getAppVersion } from './utils/cacheManager';

// Vérifier et effacer le cache si nouvelle version
checkAndClearCache().then((cacheCleared) => {
  if (cacheCleared) {
    console.log(`🚀 Bible Interactive v${getAppVersion()} - Cache effacé, nouvelle version chargée`);
  } else {
    console.log(`🚀 Bible Interactive v${getAppVersion()} - Chargement depuis le cache`);
  }
});

// Gestionnaire d'erreur global pour le débogage
window.addEventListener('error', (event) => {
  console.error('Error caught:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="padding: 20px; font-family: Arial;">Error: Root element not found. Please check the HTML structure.</div>';
} else {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Failed to render app:', error);
    rootElement.innerHTML = '<div style="padding: 20px; font-family: Arial;">Error loading application. Please check the console for details.</div>';
  }
}
