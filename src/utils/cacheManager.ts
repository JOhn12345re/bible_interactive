/**
 * Utilitaire pour gérer le cache de l'application
 * Permet d'effacer automatiquement le cache lors des mises à jour
 */

// Version de l'application - À incrémenter à chaque mise à jour importante
const APP_VERSION = '2.0.2';
const CACHE_VERSION_KEY = 'bible_interactive_cache_version';

/**
 * Efface tous les caches du navigateur
 */
export async function clearAllCaches(): Promise<void> {
  try {
    // 1. Effacer les caches du Service Worker
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => {
          console.log(`🗑️ Suppression du cache: ${cacheName}`);
          return caches.delete(cacheName);
        })
      );
      console.log('✅ Tous les caches Service Worker effacés');
    }

    // 2. Désenregistrer les Service Workers
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log('✅ Service Worker désenregistré');
      }
    }

    // 3. Effacer le localStorage lié au cache
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('cache') || key.includes('sw') || key.includes('workbox'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));

    console.log('✅ Cache local effacé');
  } catch (error) {
    console.error('❌ Erreur lors de l\'effacement du cache:', error);
  }
}

/**
 * Vérifie si une nouvelle version est disponible et efface le cache si nécessaire
 */
export async function checkAndClearCache(): Promise<boolean> {
  const storedVersion = localStorage.getItem(CACHE_VERSION_KEY);
  
  if (storedVersion !== APP_VERSION) {
    console.log(`🔄 Nouvelle version détectée: ${storedVersion} → ${APP_VERSION}`);
    await clearAllCaches();
    localStorage.setItem(CACHE_VERSION_KEY, APP_VERSION);
    return true; // Cache effacé
  }
  
  return false; // Pas de changement
}

/**
 * Force le rechargement de la page sans cache
 */
export function forceReload(): void {
  // Recharger en ignorant le cache
  window.location.reload();
}

/**
 * Efface le cache et recharge la page
 */
export async function clearCacheAndReload(): Promise<void> {
  await clearAllCaches();
  localStorage.setItem(CACHE_VERSION_KEY, APP_VERSION);
  
  // Attendre un peu pour que tout soit nettoyé
  setTimeout(() => {
    window.location.reload();
  }, 500);
}

/**
 * Récupère la version actuelle de l'application
 */
export function getAppVersion(): string {
  return APP_VERSION;
}

/**
 * Ajoute un timestamp aux URLs pour éviter le cache
 */
export function addCacheBuster(url: string): string {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${APP_VERSION}&t=${Date.now()}`;
}

export default {
  clearAllCaches,
  checkAndClearCache,
  forceReload,
  clearCacheAndReload,
  getAppVersion,
  addCacheBuster,
};
