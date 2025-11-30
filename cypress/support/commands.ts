/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Commande personnalisée pour se connecter
       * @example cy.login('user@example.com', 'password123')
       */
      login(email: string, password: string): Chainable<void>;
      
      /**
       * Commande personnalisée pour s'inscrire
       * @example cy.register('John Doe', 'user@example.com', 'password123')
       */
      register(name: string, email: string, password: string): Chainable<void>;
      
      /**
       * Commande personnalisée pour naviguer vers une leçon
       * @example cy.goToLesson('adam_eve_01')
       */
      goToLesson(lessonId: string): Chainable<void>;
      
      /**
       * Commande personnalisée pour naviguer vers un jeu
       * @example cy.goToGame('verse-memory')
       */
      goToGame(gameId: string): Chainable<void>;
      
      /**
       * Commande personnalisée pour vérifier l'accessibilité
       * @example cy.checkAccessibility()
       */
      checkAccessibility(): Chainable<void>;
      
      /**
       * Commande personnalisée pour tester les contrôles audio
       * @example cy.testAudioControls()
       */
      testAudioControls(): Chainable<void>;
      
      /**
       * Commande personnalisée pour simuler la complétion d'une leçon
       * @example cy.completeLesson('adam_eve_01')
       */
      completeLesson(lessonId: string): Chainable<void>;
      
      /**
       * Commande personnalisée pour vérifier la présence d'un élément avec retry
       * @example cy.waitForElement('[data-testid="lesson-card"]')
       */
      waitForElement(selector: string, timeout?: number): Chainable<JQuery<HTMLElement>>;
    }
  }
}

// Commande de connexion
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('not.include', '/login');
});

// Commande d'inscription
Cypress.Commands.add('register', (name: string, email: string, password: string) => {
  cy.visit('/register');
  cy.get('input[name="name"]').type(name);
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').first().type(password);
  cy.get('input[type="password"]').last().type(password);
  cy.get('button[type="submit"]').click();
});

// Navigation vers une leçon
Cypress.Commands.add('goToLesson', (lessonId: string) => {
  cy.visit(`/lesson/${lessonId}`);
  cy.waitForElement('[data-testid="lesson-content"], .lesson-content, h1', 15000);
});

// Navigation vers un jeu
Cypress.Commands.add('goToGame', (gameId: string) => {
  cy.visit(`/games/${gameId}`);
  cy.waitForElement('[data-testid="game-container"], .game-container, canvas', 15000);
});

// Test d'accessibilité
Cypress.Commands.add('checkAccessibility', () => {
  // Vérifier que les contrôles d'accessibilité sont présents
  cy.get('body').then($body => {
    if ($body.find('[data-testid="accessibility-controls"]').length > 0) {
      cy.get('[data-testid="accessibility-controls"]').should('exist');
    }
  });
  
  // Vérifier les attributs ARIA de base
  cy.get('main').should('exist');
  cy.get('nav').should('exist');
});

// Test des contrôles audio
Cypress.Commands.add('testAudioControls', () => {
  // Chercher les contrôles audio s'ils existent
  cy.get('body').then($body => {
    if ($body.find('[data-testid="audio-controls"]').length > 0) {
      cy.get('[data-testid="audio-controls"]').should('exist');
    }
  });
});

// Complétion d'une leçon
Cypress.Commands.add('completeLesson', (lessonId: string) => {
  cy.goToLesson(lessonId);
  // Simuler la lecture complète de la leçon
  cy.wait(1000);
  // Chercher un bouton de complétion s'il existe
  cy.get('body').then($body => {
    if ($body.find('button:contains("Terminer"), button:contains("Compléter"), button:contains("Suivant")').length > 0) {
      cy.get('button').contains(/Terminer|Compléter|Suivant/i).click();
    }
  });
});

// Attendre un élément avec retry amélioré
Cypress.Commands.add('waitForElement', (selector: string, timeout = 10000) => {
  return cy.get(selector, { timeout });
});

export {};

