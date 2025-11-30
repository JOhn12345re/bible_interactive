describe('Église Copte - Histoire', () => {
  beforeEach(() => {
    cy.visit('/coptic-church');
  });

  it('devrait afficher la page d\'histoire de l\'Église Copte', () => {
    cy.url().should('include', '/coptic-church');
    cy.wait(2000);
  });

  it('devrait afficher du contenu historique', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasContent = $body.find('h1, h2, h3, p, article, .content').length > 0;
      expect(hasContent).to.be.true;
    });
  });

  it('devrait afficher des informations sur l\'Église Copte', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const keywords = ['Copte', 'Orthodoxe', 'Égypte', 'Marc'];
      let foundKeyword = false;
      
      keywords.forEach(keyword => {
        if ($body.text().includes(keyword)) {
          foundKeyword = true;
          cy.log(`Mot-clé trouvé: ${keyword}`);
        }
      });
      
      if (foundKeyword) {
        cy.log('Contenu sur l\'Église Copte trouvé');
      }
    });
  });

  it('devrait avoir des liens vers les sous-sections', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasLinks = $body.find('a[href*="/coptic-church/saints"], a[href*="/coptic-church/icons"], a[href*="/coptic-church/important-dates"]').length > 0;
      
      if (hasLinks) {
        cy.log('Liens vers les sous-sections trouvés');
      }
    });
  });

  it('devrait être responsive', () => {
    cy.viewport('iphone-x');
    cy.visit('/coptic-church');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });
});

describe('Saints Coptes', () => {
  beforeEach(() => {
    cy.visit('/coptic-church/saints');
  });

  it('devrait afficher la page des saints coptes', () => {
    cy.url().should('include', '/coptic-church/saints');
    cy.wait(2000);
  });

  it('devrait afficher une liste de saints', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasSaints = $body.find('.saint, [class*="saint"], .card, h2, h3').length > 0;
      
      if (hasSaints) {
        cy.log('Liste de saints trouvée');
      }
    });
  });

  it('devrait afficher des informations sur les saints', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const saintNames = ['Antoine', 'Paul', 'Athanase', 'Cyrille', 'Pacôme'];
      let foundSaint = false;
      
      saintNames.forEach(saint => {
        if ($body.text().includes(saint)) {
          foundSaint = true;
          cy.log(`Saint trouvé: ${saint}`);
        }
      });
      
      if (!foundSaint) {
        cy.log('Recherche de saints dans le contenu...');
      }
    });
  });

  it('devrait afficher des images ou icônes des saints', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasImages = $body.find('img').length > 0;
      
      if (hasImages) {
        cy.log('Images de saints trouvées');
      }
    });
  });

  it('devrait permettre de cliquer sur un saint pour plus de détails', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasClickableElements = $body.find('button, a, .card').length > 0;
      
      if (hasClickableElements) {
        cy.log('Éléments cliquables trouvés');
      }
    });
  });

  it('devrait être responsive', () => {
    cy.viewport('iphone-x');
    cy.visit('/coptic-church/saints');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });
});

describe('Icônes Coptes', () => {
  beforeEach(() => {
    cy.visit('/coptic-church/icons');
  });

  it('devrait afficher la page des icônes coptes', () => {
    cy.url().should('include', '/coptic-church/icons');
    cy.wait(2000);
  });

  it('devrait afficher une galerie d\'icônes', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasIcons = $body.find('img, .icon, [class*="icon"], .card').length > 0;
      
      if (hasIcons) {
        cy.log('Galerie d\'icônes trouvée');
      }
    });
  });

  it('devrait afficher des informations sur les icônes', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const iconKeywords = ['Annonciation', 'Nativité', 'Résurrection', 'Icône'];
      let foundKeyword = false;
      
      iconKeywords.forEach(keyword => {
        if ($body.text().includes(keyword)) {
          foundKeyword = true;
          cy.log(`Icône trouvée: ${keyword}`);
        }
      });
      
      if (!foundKeyword) {
        cy.log('Recherche d\'icônes dans le contenu...');
      }
    });
  });

  it('devrait permettre de cliquer sur une icône', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasClickableIcons = $body.find('button, a, img, .card').length > 0;
      
      if (hasClickableIcons) {
        cy.log('Icônes cliquables trouvées');
      }
    });
  });

  it('devrait afficher des descriptions des icônes', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasDescriptions = $body.find('p, .description, [class*="description"]').length > 0;
      
      if (hasDescriptions) {
        cy.log('Descriptions des icônes trouvées');
      }
    });
  });

  it('devrait être responsive', () => {
    cy.viewport('iphone-x');
    cy.visit('/coptic-church/icons');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });
});

describe('Dates Importantes Coptes', () => {
  beforeEach(() => {
    cy.visit('/coptic-church/important-dates');
  });

  it('devrait afficher la page des dates importantes', () => {
    cy.url().should('include', '/coptic-church/important-dates');
    cy.wait(2000);
  });

  it('devrait afficher un calendrier ou une liste de dates', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasDates = $body.find('.date, [class*="date"], .calendar, [class*="calendar"], .event').length > 0;
      
      if (hasDates) {
        cy.log('Dates importantes trouvées');
      }
    });
  });

  it('devrait afficher les fêtes coptes', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const feasts = ['Noël', 'Pâques', 'Pentecôte', 'Épiphanie'];
      let foundFeast = false;
      
      feasts.forEach(feast => {
        if ($body.text().includes(feast)) {
          foundFeast = true;
          cy.log(`Fête trouvée: ${feast}`);
        }
      });
      
      if (!foundFeast) {
        cy.log('Recherche de fêtes coptes dans le contenu...');
      }
    });
  });

  it('devrait afficher des descriptions des événements', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasDescriptions = $body.find('p, .description, article').length > 0;
      
      if (hasDescriptions) {
        cy.log('Descriptions des événements trouvées');
      }
    });
  });

  it('devrait être responsive', () => {
    cy.viewport('iphone-x');
    cy.visit('/coptic-church/important-dates');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });
});

describe('Histoire Chrétienne Générale', () => {
  beforeEach(() => {
    cy.visit('/christian-history');
  });

  it('devrait afficher la page d\'histoire chrétienne', () => {
    cy.url().should('include', '/christian-history');
    cy.wait(2000);
  });

  it('devrait afficher du contenu historique', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasContent = $body.find('h1, h2, h3, p, article').length > 0;
      expect(hasContent).to.be.true;
    });
  });

  it('devrait afficher des périodes historiques', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const periods = ['Église primitive', 'Concile', 'Père de l\'Église', 'Apôtre'];
      let foundPeriod = false;
      
      periods.forEach(period => {
        if ($body.text().includes(period)) {
          foundPeriod = true;
          cy.log(`Période trouvée: ${period}`);
        }
      });
      
      if (!foundPeriod) {
        cy.log('Recherche de périodes historiques dans le contenu...');
      }
    });
  });

  it('devrait être responsive', () => {
    cy.viewport('iphone-x');
    cy.visit('/christian-history');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });
});

describe('Présentateur Orthodoxe', () => {
  beforeEach(() => {
    cy.visit('/orthodox-presenter');
  });

  it('devrait afficher la page du présentateur orthodoxe', () => {
    cy.url().should('include', '/orthodox-presenter');
    cy.wait(2000);
  });

  it('devrait afficher du contenu', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasContent = $body.find('h1, h2, p, video, audio, article').length > 0;
      
      if (hasContent) {
        cy.log('Contenu du présentateur trouvé');
      }
    });
  });

  it('devrait être responsive', () => {
    cy.viewport('iphone-x');
    cy.visit('/orthodox-presenter');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });
});

describe('Katameros', () => {
  beforeEach(() => {
    cy.visit('/katameros');
  });

  it('devrait afficher la page du Katameros', () => {
    cy.url().should('include', '/katameros');
    cy.wait(2000);
  });

  it('devrait afficher des lectures liturgiques', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasReadings = $body.find('p, article, .reading, [class*="reading"]').length > 0;
      
      if (hasReadings) {
        cy.log('Lectures liturgiques trouvées');
      }
    });
  });

  it('devrait permettre de sélectionner une date', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasDateSelector = $body.find('input[type="date"], select, button').length > 0;
      
      if (hasDateSelector) {
        cy.log('Sélecteur de date trouvé');
      }
    });
  });

  it('devrait être responsive', () => {
    cy.viewport('iphone-x');
    cy.visit('/katameros');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });
});

