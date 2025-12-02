/**
 * Utilitaire de logging conditionnel pour la production
 * En production, seules les erreurs critiques sont affichées
 */

const isDev = import.meta.env.DEV || 
  (typeof window !== 'undefined' && 
   (window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1'));

/**
 * Logger conditionnel - n'affiche en production que les erreurs critiques
 */
export const logger = {
  /**
   * Log d'information (dev uniquement)
   */
  log: (...args: unknown[]) => {
    if (isDev) {
      console.log(...args);
    }
  },

  /**
   * Log d'information avec emoji (dev uniquement)
   */
  info: (...args: unknown[]) => {
    if (isDev) {
      console.info('ℹ️', ...args);
    }
  },

  /**
   * Log de succès (dev uniquement)
   */
  success: (...args: unknown[]) => {
    if (isDev) {
      console.log('✅', ...args);
    }
  },

  /**
   * Log de debug (dev uniquement)
   */
  debug: (...args: unknown[]) => {
    if (isDev) {
      console.debug('🔍', ...args);
    }
  },

  /**
   * Warning (dev uniquement)
   */
  warn: (...args: unknown[]) => {
    if (isDev) {
      console.warn('⚠️', ...args);
    }
  },

  /**
   * Erreur (toujours affiché, important pour le debugging en prod)
   */
  error: (...args: unknown[]) => {
    console.error('❌', ...args);
  },

  /**
   * Log de chargement (dev uniquement)
   */
  loading: (...args: unknown[]) => {
    if (isDev) {
      console.log('📥', ...args);
    }
  },

  /**
   * Log de réseau/API (dev uniquement)
   */
  api: (...args: unknown[]) => {
    if (isDev) {
      console.log('🌐', ...args);
    }
  },

  /**
   * Groupe de logs (dev uniquement)
   */
  group: (label: string) => {
    if (isDev) {
      console.group(label);
    }
  },

  /**
   * Fin de groupe (dev uniquement)
   */
  groupEnd: () => {
    if (isDev) {
      console.groupEnd();
    }
  },

  /**
   * Table de données (dev uniquement)
   */
  table: (data: unknown) => {
    if (isDev) {
      console.table(data);
    }
  }
};

export default logger;
