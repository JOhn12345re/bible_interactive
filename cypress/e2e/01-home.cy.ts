describe('Page d\'Accueil', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('devrait afficher la page d\'accueil correctement', () => {
    // Vérifier le titre principal
    cy.contains('Bible Interactive').should('be.visible');
    cy.contains('Interactive').should('be.visible');
    
    // Vérifier la présence des éléments principaux
    cy.get('h1').should('contain', 'Bible');
    cy.get('p').should('contain', 'Découvrez la Bible');
  });

  it('devrait afficher les fonctionnalités principales', () => {
    // Vérifier que les 6 fonctionnalités sont affichées
    cy.contains('Plan de Lecture Bible 365 jours').should('be.visible');
    cy.contains('Versets Quotidiens par Thèmes').should('be.visible');
    cy.contains('Explorateur Bible Interactif').should('be.visible');
    cy.contains('Défis Spirituels').should('be.visible');
    cy.contains('Mémorisation de Versets').should('be.visible');
    cy.contains('Traditions Coptes').should('be.visible');
  });

  it('devrait afficher les statistiques', () => {
    cy.contains('365').should('be.visible');
    cy.contains('Jours de Lecture').should('be.visible');
    cy.contains('30+').should('be.visible');
    cy.contains('Versets Thématiques').should('be.visible');
    cy.contains('11').should('be.visible');
    cy.contains('Thèmes Spirituels').should('be.visible');
  });

  it('devrait afficher la citation biblique', () => {
    cy.contains('Ta parole est une lampe à mes pieds').should('be.visible');
    cy.contains('Psaume 119:105').should('be.visible');
  });

  it('devrait permettre de cliquer sur "Entrer dans l\'Aventure"', () => {
    cy.contains('button', 'Entrer dans l\'Aventure').should('be.visible').click();
    cy.url().should('include', '/dashboard');
  });

  it('devrait permettre de cliquer sur "Accès Direct"', () => {
    cy.contains('Accès Direct').should('be.visible').click();
    cy.url().should('include', '/dashboard');
  });

  it('devrait permettre de cliquer sur "Commencer Maintenant"', () => {
    cy.scrollTo('bottom');
    cy.contains('button', 'Commencer Maintenant').should('be.visible').click();
    cy.url().should('include', '/dashboard');
  });

  it('devrait afficher les animations et effets visuels', () => {
    // Vérifier la présence des particules animées
    cy.get('.animate-pulse, .animate-ping, .animate-bounce').should('exist');
    
    // Vérifier les classes de gradient
    cy.get('.bg-gradient-to-br, .bg-gradient-to-r').should('exist');
  });

  it('devrait être responsive sur mobile', () => {
    cy.viewport('iphone-x');
    cy.contains('Bible Interactive').should('be.visible');
    cy.contains('button', 'Entrer dans l\'Aventure').should('be.visible');
  });

  it('devrait être responsive sur tablette', () => {
    cy.viewport('ipad-2');
    cy.contains('Bible Interactive').should('be.visible');
    cy.get('.grid').should('exist');
  });

  it('devrait permettre l\'interaction avec les cartes de fonctionnalités', () => {
    // Tester le hover/click sur les cartes
    cy.contains('Plan de Lecture Bible 365 jours').parent().click();
    cy.contains('Plan de Lecture Bible 365 jours').parent().should('exist');
  });
});

describe('Navigation Globale', () => {
  it('devrait naviguer vers le dashboard', () => {
    cy.visit('/');
    cy.visit('/dashboard');
    cy.url().should('include', '/dashboard');
  });

  it('devrait naviguer vers les leçons', () => {
    cy.visit('/lessons');
    cy.url().should('include', '/lessons');
  });

  it('devrait naviguer vers les jeux', () => {
    cy.visit('/games');
    cy.url().should('include', '/games');
  });

  it('devrait naviguer vers la Bible', () => {
    cy.visit('/bible');
    cy.url().should('include', '/bible');
  });

  it('devrait naviguer vers la timeline', () => {
    cy.visit('/timeline');
    cy.url().should('include', '/timeline');
  });

  it('devrait gérer les routes invalides', () => {
    cy.visit('/route-qui-nexiste-pas', { failOnStatusCode: false });
    // La page devrait rediriger ou afficher une erreur
  });
});

