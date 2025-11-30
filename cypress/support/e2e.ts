// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Empêcher Cypress de s'arrêter sur les erreurs non capturées
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignorer certaines erreurs connues qui ne sont pas critiques
  if (err.message.includes('ResizeObserver')) {
    return false;
  }
  if (err.message.includes('hydration')) {
    return false;
  }
  // Laisser les autres erreurs échouer les tests
  return true;
});

// Configuration globale pour tous les tests
beforeEach(() => {
  // Clear storage before each test
  cy.clearLocalStorage();
  cy.clearCookies();
});

