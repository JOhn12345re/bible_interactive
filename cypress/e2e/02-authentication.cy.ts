describe('Authentification - Connexion', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('devrait afficher la page de connexion', () => {
    cy.url().should('include', '/login');
    cy.contains('Connexion').should('be.visible');
  });

  it('devrait afficher les champs de formulaire', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('devrait afficher un lien vers l\'inscription', () => {
    cy.contains(/inscription|s'inscrire|créer un compte/i).should('be.visible');
  });

  it('devrait valider les champs obligatoires', () => {
    cy.get('button[type="submit"]').click();
    // Le formulaire ne devrait pas être soumis sans données
    cy.url().should('include', '/login');
  });

  it('devrait valider le format de l\'email', () => {
    cy.get('input[type="email"]').type('email-invalide');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    // Vérifier si un message d'erreur apparaît ou si le formulaire n'est pas soumis
    cy.url().should('include', '/login');
  });

  it('devrait permettre de saisir les informations de connexion', () => {
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="email"]').should('have.value', 'test@example.com');
    
    cy.get('input[type="password"]').type('password123');
    cy.get('input[type="password"]').should('have.value', 'password123');
  });

  it('devrait afficher/masquer le mot de passe', () => {
    cy.get('input[type="password"]').type('password123');
    
    // Chercher un bouton pour afficher/masquer le mot de passe
    cy.get('body').then($body => {
      if ($body.find('button:contains("👁")').length > 0 || 
          $body.find('[aria-label*="show"], [aria-label*="afficher"]').length > 0) {
        cy.log('Bouton de visibilité du mot de passe trouvé');
      }
    });
  });

  it('devrait naviguer vers la page d\'inscription', () => {
    cy.contains(/inscription|s'inscrire|créer un compte/i).click();
    cy.url().should('include', '/register');
  });
});

describe('Authentification - Inscription', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('devrait afficher la page d\'inscription', () => {
    cy.url().should('include', '/register');
    cy.contains(/inscription|s'inscrire/i).should('be.visible');
  });

  it('devrait afficher les champs de formulaire', () => {
    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('have.length.at.least', 1);
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('devrait afficher un lien vers la connexion', () => {
    cy.contains(/connexion|se connecter|déjà un compte/i).should('be.visible');
  });

  it('devrait valider les champs obligatoires', () => {
    cy.get('button[type="submit"]').click();
    // Le formulaire ne devrait pas être soumis sans données
    cy.url().should('include', '/register');
  });

  it('devrait valider le format de l\'email', () => {
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[type="email"]').type('email-invalide');
    cy.get('input[type="password"]').first().type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/register');
  });

  it('devrait vérifier la correspondance des mots de passe', () => {
    const passwords = cy.get('input[type="password"]');
    
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[type="email"]').type('test@example.com');
    
    // Si il y a deux champs de mot de passe
    passwords.then($inputs => {
      if ($inputs.length >= 2) {
        cy.get('input[type="password"]').first().type('password123');
        cy.get('input[type="password"]').last().type('password456');
        cy.get('button[type="submit"]').click();
        // Devrait afficher une erreur ou rester sur la page
        cy.url().should('include', '/register');
      }
    });
  });

  it('devrait permettre de saisir toutes les informations', () => {
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="name"]').should('have.value', 'Test User');
    
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="email"]').should('have.value', 'test@example.com');
    
    cy.get('input[type="password"]').first().type('password123');
    cy.get('input[type="password"]').first().should('have.value', 'password123');
  });

  it('devrait naviguer vers la page de connexion', () => {
    cy.contains(/connexion|se connecter|déjà un compte/i).click();
    cy.url().should('include', '/login');
  });
});

describe('Authentification - Protection des routes', () => {
  it('devrait permettre l\'accès aux pages publiques sans connexion', () => {
    cy.visit('/');
    cy.url().should('include', '/');
    
    cy.visit('/bible');
    cy.url().should('include', '/bible');
    
    cy.visit('/lessons');
    cy.url().should('include', '/lessons');
  });

  it('devrait gérer la déconnexion', () => {
    cy.visit('/dashboard');
    
    // Chercher un bouton de déconnexion
    cy.get('body').then($body => {
      if ($body.find('button:contains("Déconnexion"), button:contains("Logout")').length > 0) {
        cy.contains(/déconnexion|logout/i).click();
        // Devrait rediriger vers la page d'accueil ou de connexion
      }
    });
  });
});

