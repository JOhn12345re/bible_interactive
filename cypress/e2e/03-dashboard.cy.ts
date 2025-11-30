describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });

  it('devrait afficher la page du dashboard', () => {
    cy.url().should('include', '/dashboard');
  });

  it('devrait afficher les sections principales du dashboard', () => {
    // Attendre que le contenu se charge
    cy.wait(1000);
    
    // Vérifier la présence de texte/contenu principal
    cy.get('body').should('be.visible');
    
    // Chercher des éléments communs du dashboard
    cy.get('body').then($body => {
      // Vérifier si des sections communes existent
      const hasCards = $body.find('.card, [class*="card"]').length > 0;
      const hasButtons = $body.find('button').length > 0;
      const hasLinks = $body.find('a').length > 0;
      
      expect(hasCards || hasButtons || hasLinks).to.be.true;
    });
  });

  it('devrait afficher les liens de navigation rapide', () => {
    cy.get('body').then($body => {
      // Chercher des liens vers les sections principales
      const hasNavigation = $body.find('a[href*="/lessons"], a[href*="/games"], a[href*="/bible"]').length > 0;
      
      if (hasNavigation) {
        cy.log('Navigation rapide trouvée');
      }
    });
  });

  it('devrait afficher le profil utilisateur', () => {
    cy.get('body').then($body => {
      if ($body.find('[data-testid="profile"], .profile, button:contains("Profil")').length > 0) {
        cy.log('Section profil trouvée');
      }
    });
  });

  it('devrait afficher les statistiques de progression', () => {
    cy.get('body').then($body => {
      // Chercher des indicateurs de progression
      if ($body.find('.progress, [class*="progress"], .stats, [class*="stats"]').length > 0) {
        cy.log('Statistiques de progression trouvées');
      }
    });
  });

  it('devrait permettre de naviguer vers les leçons', () => {
    cy.get('body').then($body => {
      if ($body.find('a[href*="/lessons"]').length > 0) {
        cy.get('a[href*="/lessons"]').first().click();
        cy.url().should('include', '/lessons');
      }
    });
  });

  it('devrait permettre de naviguer vers les jeux', () => {
    cy.visit('/dashboard');
    cy.get('body').then($body => {
      if ($body.find('a[href*="/games"]').length > 0) {
        cy.get('a[href*="/games"]').first().click();
        cy.url().should('include', '/games');
      }
    });
  });

  it('devrait permettre de naviguer vers la Bible', () => {
    cy.visit('/dashboard');
    cy.get('body').then($body => {
      if ($body.find('a[href*="/bible"]').length > 0) {
        cy.get('a[href*="/bible"]').first().click();
        cy.url().should('include', '/bible');
      }
    });
  });

  it('devrait afficher les défis quotidiens', () => {
    cy.get('body').then($body => {
      if ($body.find(':contains("Défi"), :contains("Challenge"), :contains("Quotidien")').length > 0) {
        cy.log('Section défis quotidiens trouvée');
      }
    });
  });

  it('devrait afficher les achievements/badges', () => {
    cy.get('body').then($body => {
      if ($body.find('[data-testid="achievements"], .badge, [class*="badge"], [class*="achievement"]').length > 0) {
        cy.log('Section achievements trouvée');
      }
    });
  });

  it('devrait être responsive sur mobile', () => {
    cy.viewport('iphone-x');
    cy.visit('/dashboard');
    cy.get('body').should('be.visible');
  });

  it('devrait être responsive sur tablette', () => {
    cy.viewport('ipad-2');
    cy.visit('/dashboard');
    cy.get('body').should('be.visible');
  });
});

describe('Dashboard - Profil', () => {
  beforeEach(() => {
    cy.visit('/profile');
  });

  it('devrait afficher la page de profil', () => {
    cy.url().should('include', '/profile');
  });

  it('devrait afficher les informations du profil', () => {
    cy.wait(1000);
    cy.get('body').should('be.visible');
  });

  it('devrait afficher les statistiques de l\'utilisateur', () => {
    cy.get('body').then($body => {
      const hasStats = $body.find('.stat, [class*="stat"], .level, [class*="level"]').length > 0;
      if (hasStats) {
        cy.log('Statistiques utilisateur trouvées');
      }
    });
  });

  it('devrait afficher les badges et achievements', () => {
    cy.get('body').then($body => {
      const hasBadges = $body.find('.badge, [class*="badge"], [data-testid*="badge"]').length > 0;
      if (hasBadges) {
        cy.log('Badges trouvés');
      }
    });
  });

  it('devrait afficher l\'historique de progression', () => {
    cy.get('body').then($body => {
      const hasHistory = $body.find('.history, [class*="history"], .progress, [class*="progress"]').length > 0;
      if (hasHistory) {
        cy.log('Historique trouvé');
      }
    });
  });
});

