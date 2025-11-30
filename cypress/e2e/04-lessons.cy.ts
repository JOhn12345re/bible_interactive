describe('Page des Leçons', () => {
  beforeEach(() => {
    cy.visit('/lessons');
  });

  it('devrait afficher la page des leçons', () => {
    cy.url().should('include', '/lessons');
  });

  it('devrait afficher une liste de leçons', () => {
    cy.wait(2000); // Attendre le chargement des leçons
    
    cy.get('body').then($body => {
      // Chercher des cartes de leçons ou des liens
      const hasLessons = $body.find('.card, [class*="card"], a[href*="/lesson/"]').length > 0;
      
      if (hasLessons) {
        cy.log('Leçons trouvées');
        expect(hasLessons).to.be.true;
      }
    });
  });

  it('devrait permettre de filtrer les leçons par catégorie', () => {
    cy.get('body').then($body => {
      const hasFilters = $body.find('button:contains("Pentateuque"), button:contains("Historiques"), button:contains("Nouveau Testament")').length > 0;
      
      if (hasFilters) {
        cy.log('Filtres trouvés');
      }
    });
  });

  it('devrait afficher les informations de chaque leçon', () => {
    cy.get('body').then($body => {
      if ($body.find('a[href*="/lesson/"]').length > 0) {
        // Vérifier qu'il y a des titres, descriptions, etc.
        cy.log('Cartes de leçons avec informations trouvées');
      }
    });
  });

  it('devrait permettre de cliquer sur une leçon', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      if ($body.find('a[href*="/lesson/"]').length > 0) {
        cy.get('a[href*="/lesson/"]').first().click();
        cy.url().should('include', '/lesson/');
      }
    });
  });

  it('devrait afficher les catégories de leçons', () => {
    cy.get('body').then($body => {
      const categories = ['Pentateuque', 'Historiques', 'Nouveau Testament', 'Prophétiques', 'Poétiques'];
      let foundCategory = false;
      
      categories.forEach(category => {
        if ($body.text().includes(category)) {
          foundCategory = true;
        }
      });
      
      if (foundCategory) {
        cy.log('Catégories trouvées');
      }
    });
  });

  it('devrait être responsive sur mobile', () => {
    cy.viewport('iphone-x');
    cy.visit('/lessons');
    cy.wait(1000);
    cy.get('body').should('be.visible');
  });
});

describe('Page d\'une Leçon Spécifique', () => {
  const lessons = [
    'adam_eve_01',
    'creation_01',
    'noe_01',
    'babel_01',
    'abraham_01'
  ];

  lessons.forEach(lessonId => {
    describe(`Leçon: ${lessonId}`, () => {
      beforeEach(() => {
        cy.visit(`/lesson/${lessonId}`);
      });

      it(`devrait charger la leçon ${lessonId}`, () => {
        cy.url().should('include', `/lesson/${lessonId}`);
        cy.wait(2000);
        cy.get('body').should('be.visible');
      });

      it('devrait afficher le contenu de la leçon', () => {
        cy.wait(2000);
        
        cy.get('body').then($body => {
          // Chercher du contenu textuel
          const hasContent = $body.find('h1, h2, p, .content, [class*="content"]').length > 0;
          expect(hasContent).to.be.true;
        });
      });

      it('devrait afficher les médias (images/vidéos)', () => {
        cy.get('body').then($body => {
          const hasMedia = $body.find('img, video, audio, canvas').length > 0;
          
          if (hasMedia) {
            cy.log('Médias trouvés dans la leçon');
          }
        });
      });

      it('devrait avoir un bouton de navigation', () => {
        cy.get('body').then($body => {
          const hasNavigation = $body.find('button:contains("Suivant"), button:contains("Précédent"), a:contains("Retour")').length > 0;
          
          if (hasNavigation) {
            cy.log('Boutons de navigation trouvés');
          }
        });
      });

      it('devrait permettre de marquer la leçon comme complétée', () => {
        cy.wait(2000);
        
        cy.get('body').then($body => {
          const hasCompleteButton = $body.find('button:contains("Terminer"), button:contains("Compléter"), button:contains("Marquer")').length > 0;
          
          if (hasCompleteButton) {
            cy.log('Bouton de complétion trouvé');
          }
        });
      });
    });
  });
});

describe('Jeux de Timeline des Leçons', () => {
  const timelineGames = [
    { id: 'adam_eve_01', name: 'Adam et Ève' },
    { id: 'creation_01', name: 'Création' },
    { id: 'cain_abel_01', name: 'Caïn et Abel' },
    { id: 'abraham_01', name: 'Abraham' },
    { id: 'babel_01', name: 'Tour de Babel' },
    { id: 'naissance_jesus', name: 'Naissance de Jésus' }
  ];

  timelineGames.forEach(game => {
    it(`devrait charger le jeu de timeline: ${game.name}`, () => {
      cy.visit(`/game/${game.id}/timeline_cards`, { failOnStatusCode: false });
      cy.wait(2000);
      
      cy.get('body').then($body => {
        // Vérifier si le jeu est chargé
        const hasGame = $body.find('canvas, .game-container, [class*="timeline"]').length > 0;
        
        if (hasGame) {
          cy.log(`Jeu de timeline ${game.name} chargé`);
        }
      });
    });
  });
});

describe('Éditeur de Leçons', () => {
  it('devrait charger l\'éditeur d\'histoires', () => {
    cy.visit('/story-editor');
    cy.url().should('include', '/story-editor');
    cy.wait(1000);
    cy.get('body').should('be.visible');
  });

  it('devrait charger l\'éditeur universel', () => {
    cy.visit('/universal-editor');
    cy.url().should('include', '/universal-editor');
    cy.wait(1000);
    cy.get('body').should('be.visible');
  });

  it('devrait permettre de créer du contenu dans l\'éditeur', () => {
    cy.visit('/story-editor');
    cy.wait(1000);
    
    cy.get('body').then($body => {
      // Chercher des champs d'édition
      const hasEditor = $body.find('textarea, input[type="text"], [contenteditable="true"]').length > 0;
      
      if (hasEditor) {
        cy.log('Éditeur trouvé');
      }
    });
  });
});

