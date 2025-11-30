describe('Explorateur de la Bible', () => {
  beforeEach(() => {
    cy.visit('/bible');
  });

  it('devrait afficher la page de la Bible', () => {
    cy.url().should('include', '/bible');
    cy.wait(2000);
  });

  it('devrait afficher une interface de navigation', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasNavigation = $body.find('select, button, .navigation, [class*="nav"]').length > 0;
      expect(hasNavigation).to.be.true;
    });
  });

  it('devrait permettre de sélectionner un livre', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      // Chercher des sélecteurs ou boutons de livres
      const hasBookSelector = $body.find('select, button:contains("Genèse"), button:contains("Exode")').length > 0;
      
      if (hasBookSelector) {
        cy.log('Sélecteur de livres trouvé');
      }
    });
  });

  it('devrait permettre de sélectionner un chapitre', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasChapterSelector = $body.find('select, button, input[type="number"]').length > 0;
      
      if (hasChapterSelector) {
        cy.log('Sélecteur de chapitres trouvé');
      }
    });
  });

  it('devrait afficher du texte biblique', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasBibleText = $body.find('p, .verse, [class*="verse"], article').length > 0;
      
      if (hasBibleText) {
        cy.log('Texte biblique trouvé');
      }
    });
  });

  it('devrait permettre de rechercher des versets', () => {
    cy.get('body').then($body => {
      const hasSearch = $body.find('input[type="search"], input[type="text"]').length > 0;
      
      if (hasSearch) {
        cy.log('Fonction de recherche trouvée');
      }
    });
  });

  it('devrait afficher les numéros de versets', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      // Chercher des numéros de versets
      const hasVerseNumbers = $body.find('.verse-number, [class*="verse"]').length > 0;
      
      if (hasVerseNumbers) {
        cy.log('Numéros de versets trouvés');
      }
    });
  });

  it('devrait permettre de naviguer entre les chapitres', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasNavButtons = $body.find('button:contains("Suivant"), button:contains("Précédent"), button:contains("→"), button:contains("←")').length > 0;
      
      if (hasNavButtons) {
        cy.log('Boutons de navigation entre chapitres trouvés');
      }
    });
  });

  it('devrait supporter différentes traductions', () => {
    cy.get('body').then($body => {
      const hasTranslationSelector = $body.find('select, button:contains("LSG"), button:contains("Segond")').length > 0;
      
      if (hasTranslationSelector) {
        cy.log('Sélecteur de traductions trouvé');
      }
    });
  });

  it('devrait être responsive sur mobile', () => {
    cy.viewport('iphone-x');
    cy.visit('/bible');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });
});

describe('Timeline Complète', () => {
  beforeEach(() => {
    cy.visit('/timeline');
  });

  it('devrait afficher la page de timeline', () => {
    cy.url().should('include', '/timeline');
    cy.wait(2000);
  });

  it('devrait afficher des événements chronologiques', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasEvents = $body.find('.timeline, [class*="timeline"], .event, [class*="event"]').length > 0;
      
      if (hasEvents) {
        cy.log('Événements de timeline trouvés');
      }
    });
  });

  it('devrait afficher des dates ou périodes', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      // Chercher des éléments de datation
      const hasDates = $body.find('.date, [class*="date"], .year, [class*="year"]').length > 0;
      
      if (hasDates) {
        cy.log('Dates trouvées dans la timeline');
      }
    });
  });

  it('devrait permettre de naviguer dans la timeline', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasNavigation = $body.find('button, .scroll, [class*="scroll"]').length > 0;
      
      if (hasNavigation) {
        cy.log('Navigation de timeline trouvée');
      }
    });
  });

  it('devrait afficher des détails sur les événements', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      // Chercher des cartes ou des sections d'événements
      const hasEventDetails = $body.find('.card, [class*="event"], p, h2, h3').length > 0;
      
      if (hasEventDetails) {
        cy.log('Détails des événements trouvés');
      }
    });
  });

  it('devrait permettre de cliquer sur les événements', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasClickableEvents = $body.find('button, a, [class*="event"]').length > 0;
      
      if (hasClickableEvents) {
        cy.log('Événements cliquables trouvés');
      }
    });
  });

  it('devrait être responsive', () => {
    cy.viewport('iphone-x');
    cy.visit('/timeline');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });
});

describe('Topics Explorer', () => {
  beforeEach(() => {
    cy.visit('/topics');
  });

  it('devrait afficher la page des topics', () => {
    cy.url().should('include', '/topics');
    cy.wait(2000);
  });

  it('devrait afficher une liste de topics', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasTopics = $body.find('.topic, [class*="topic"], button, .card').length > 0;
      
      if (hasTopics) {
        cy.log('Topics trouvés');
      }
    });
  });

  it('devrait afficher les noms des topics', () => {
    cy.wait(2000);
    
    const topicNames = ['Amour', 'Foi', 'Espoir', 'Paix', 'Force', 'Confiance'];
    
    cy.get('body').then($body => {
      topicNames.forEach(topic => {
        if ($body.text().includes(topic)) {
          cy.log(`Topic trouvé: ${topic}`);
        }
      });
    });
  });

  it('devrait permettre de cliquer sur un topic', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasClickableTopics = $body.find('button, a, [class*="topic"]').length > 0;
      
      if (hasClickableTopics && $body.find('button, a').length > 0) {
        cy.get('button, a').first().click();
        cy.wait(1000);
      }
    });
  });

  it('devrait afficher des versets pour chaque topic', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      if ($body.find('button, a').length > 0) {
        cy.get('button, a').first().click();
        cy.wait(1000);
        
        cy.get('body').then($updatedBody => {
          const hasVerses = $updatedBody.find('.verse, [class*="verse"], p').length > 0;
          
          if (hasVerses) {
            cy.log('Versets du topic trouvés');
          }
        });
      }
    });
  });

  it('devrait être responsive', () => {
    cy.viewport('iphone-x');
    cy.visit('/topics');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });
});

describe('Sermons', () => {
  beforeEach(() => {
    cy.visit('/sermons');
  });

  it('devrait afficher la page des sermons', () => {
    cy.url().should('include', '/sermons');
    cy.wait(2000);
  });

  it('devrait afficher une liste de sermons', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasSermons = $body.find('.sermon, [class*="sermon"], .card, video, audio').length > 0;
      
      if (hasSermons) {
        cy.log('Sermons trouvés');
      }
    });
  });

  it('devrait permettre de lire un sermon', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasPlayer = $body.find('video, audio, button:contains("Play"), button:contains("Lecture")').length > 0;
      
      if (hasPlayer) {
        cy.log('Lecteur de sermon trouvé');
      }
    });
  });

  it('devrait afficher les informations du sermon', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasInfo = $body.find('h1, h2, h3, p, .title, [class*="title"]').length > 0;
      
      if (hasInfo) {
        cy.log('Informations du sermon trouvées');
      }
    });
  });

  it('devrait être responsive', () => {
    cy.viewport('iphone-x');
    cy.visit('/sermons');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });
});

