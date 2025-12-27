import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';

// Nettoyer après chaque test
afterEach(() => {
  cleanup();
});

// Configuration globale pour les tests
beforeAll(() => {
  // Simuler l'environnement de variables
  if (!import.meta.env.VITE_BIBLE_API_KEY) {
    import.meta.env.VITE_BIBLE_API_KEY = 'e0d8e2de2f0db84705a6b02c2286d733';
  }
});

// Cleanup après tous les tests
afterAll(() => {
  cleanup();
});

