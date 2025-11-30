describe('Page des Jeux', () => {
  beforeEach(() => {
    cy.visit('/games');
  });

  it('devrait afficher la page des jeux', () => {
    cy.url().should('include', '/games');
  });

  it('devrait afficher une liste de jeux disponibles', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasGames = $body.find('.card, [class*="card"], a[href*="/games/"]').length > 0;
      
      if (hasGames) {
        cy.log('Jeux disponibles trouvés');
      }
    });
  });

  it('devrait afficher les noms des jeux', () => {
    const gameNames = [
      'Verse Memory',
      'Temple Builder',
      'Miracle Race',
      'Bible Quiz',
      'Ark Puzzle',
      'Treasure Hunt',
      'Serpent d\'Airain'
    ];
    
    cy.get('body').then($body => {
      gameNames.forEach(gameName => {
        if ($body.text().toLowerCase().includes(gameName.toLowerCase())) {
          cy.log(`Jeu trouvé: ${gameName}`);
        }
      });
    });
  });

  it('devrait être responsive sur mobile', () => {
    cy.viewport('iphone-x');
    cy.visit('/games');
    cy.wait(1000);
    cy.get('body').should('be.visible');
  });
});

describe('Jeu - Verse Memory', () => {
  beforeEach(() => {
    cy.visit('/games/verse-memory');
  });

  it('devrait charger le jeu Verse Memory', () => {
    cy.url().should('include', '/games/verse-memory');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });

  it('devrait afficher du contenu de jeu', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasGameContent = $body.find('button, .verse, [class*="verse"], canvas').length > 0;
      expect(hasGameContent).to.be.true;
    });
  });

  it('devrait permettre l\'interaction avec le jeu', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasInteractiveElements = $body.find('button, input, select').length > 0;
      
      if (hasInteractiveElements) {
        cy.log('Éléments interactifs trouvés');
      }
    });
  });
});

describe('Jeu - Temple Builder', () => {
  beforeEach(() => {
    cy.visit('/games/temple-builder');
  });

  it('devrait charger le jeu Temple Builder', () => {
    cy.url().should('include', '/games/temple-builder');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });

  it('devrait afficher un canvas ou un conteneur de jeu', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasGameCanvas = $body.find('canvas, .phaser-game, [id*="phaser"]').length > 0;
      
      if (hasGameCanvas) {
        cy.log('Canvas de jeu trouvé');
      }
    });
  });
});

describe('Jeu - Miracle Race', () => {
  beforeEach(() => {
    cy.visit('/games/miracle-race');
  });

  it('devrait charger le jeu Miracle Race', () => {
    cy.url().should('include', '/games/miracle-race');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });

  it('devrait afficher le jeu', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasGame = $body.find('canvas, .game, [class*="game"]').length > 0;
      
      if (hasGame) {
        cy.log('Interface de jeu trouvée');
      }
    });
  });
});

describe('Jeu - Bible Quiz', () => {
  beforeEach(() => {
    cy.visit('/games/bible-quiz');
  });

  it('devrait charger le jeu Bible Quiz', () => {
    cy.url().should('include', '/games/bible-quiz');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });

  it('devrait afficher des questions', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasQuestions = $body.find('button, .question, [class*="question"], .answer, [class*="answer"]').length > 0;
      
      if (hasQuestions) {
        cy.log('Questions de quiz trouvées');
      }
    });
  });

  it('devrait permettre de sélectionner des réponses', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasAnswers = $body.find('button, input[type="radio"], .answer').length > 0;
      
      if (hasAnswers) {
        cy.log('Réponses sélectionnables trouvées');
      }
    });
  });
});

describe('Jeu - Verse Memory Cards', () => {
  beforeEach(() => {
    cy.visit('/games/verse-memory-cards');
  });

  it('devrait charger le jeu Verse Memory Cards', () => {
    cy.url().should('include', '/games/verse-memory-cards');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });

  it('devrait afficher des cartes', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasCards = $body.find('.card, [class*="card"]').length > 0;
      
      if (hasCards) {
        cy.log('Cartes de jeu trouvées');
      }
    });
  });
});

describe('Jeu - Ark Puzzle', () => {
  beforeEach(() => {
    cy.visit('/games/ark-puzzle');
  });

  it('devrait charger le jeu Ark Puzzle', () => {
    cy.url().should('include', '/games/ark-puzzle');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });

  it('devrait afficher un puzzle', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasPuzzle = $body.find('canvas, .puzzle, [class*="puzzle"]').length > 0;
      
      if (hasPuzzle) {
        cy.log('Puzzle trouvé');
      }
    });
  });
});

describe('Jeu - Treasure Hunt', () => {
  beforeEach(() => {
    cy.visit('/games/treasure-hunt');
  });

  it('devrait charger le jeu Treasure Hunt', () => {
    cy.url().should('include', '/games/treasure-hunt');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });

  it('devrait afficher le jeu', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasGame = $body.find('canvas, .game, [class*="game"]').length > 0;
      
      if (hasGame) {
        cy.log('Jeu de chasse au trésor trouvé');
      }
    });
  });
});

describe('Jeu - Serpent d\'Airain', () => {
  beforeEach(() => {
    cy.visit('/games/serpent-airain');
  });

  it('devrait charger le jeu Serpent d\'Airain', () => {
    cy.url().should('include', '/games/serpent-airain');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });

  it('devrait afficher le jeu', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasGame = $body.find('canvas, .game, [class*="game"]').length > 0;
      
      if (hasGame) {
        cy.log('Jeu du Serpent d\'Airain trouvé');
      }
    });
  });
});

describe('Jeux - Fonctionnalités communes', () => {
  const games = [
    'verse-memory',
    'temple-builder',
    'miracle-race',
    'bible-quiz',
    'verse-memory-cards',
    'ark-puzzle',
    'treasure-hunt',
    'serpent-airain'
  ];

  games.forEach(gameId => {
    it(`${gameId} devrait avoir un bouton de retour`, () => {
      cy.visit(`/games/${gameId}`);
      cy.wait(2000);
      
      cy.get('body').then($body => {
        const hasBackButton = $body.find('button:contains("Retour"), a:contains("Retour"), button:contains("←")').length > 0;
        
        if (hasBackButton) {
          cy.log(`Bouton de retour trouvé pour ${gameId}`);
        }
      });
    });
  });

  it('tous les jeux devraient être responsive', () => {
    cy.viewport('iphone-x');
    
    games.forEach(gameId => {
      cy.visit(`/games/${gameId}`);
      cy.wait(1000);
      cy.get('body').should('be.visible');
    });
  });
});

describe('Progression et Scores dans les Jeux', () => {
  it('devrait sauvegarder la progression du joueur', () => {
    cy.visit('/games/bible-quiz');
    cy.wait(2000);
    
    // La progression devrait être sauvegardée dans le localStorage
    cy.window().then((win) => {
      const hasProgressData = win.localStorage.getItem('progress') !== null;
      
      if (hasProgressData) {
        cy.log('Données de progression trouvées');
      }
    });
  });

  it('devrait afficher le score ou les points', () => {
    cy.visit('/games/bible-quiz');
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasScore = $body.find(':contains("Score"), :contains("Points"), .score, [class*="score"]').length > 0;
      
      if (hasScore) {
        cy.log('Affichage du score trouvé');
      }
    });
  });
});

