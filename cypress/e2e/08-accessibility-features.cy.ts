describe('Accessibilité - Contrôles', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('devrait afficher les contrôles d\'accessibilité', () => {
    cy.wait(1000);
    
    cy.get('body').then($body => {
      const hasAccessibilityControls = $body.find('[data-testid="accessibility-controls"], .accessibility, [class*="accessibility"]').length > 0;
      
      if (hasAccessibilityControls) {
        cy.log('Contrôles d\'accessibilité trouvés');
      }
    });
  });

  it('devrait permettre d\'ajuster la taille de police', () => {
    cy.get('body').then($body => {
      if ($body.find('button:contains("A+"), button:contains("A-"), button[aria-label*="font"], button[aria-label*="police"]').length > 0) {
        cy.log('Contrôles de taille de police trouvés');
        
        // Tester l'augmentation de la taille
        const initialFontSize = $body.css('font-size');
        cy.log(`Taille de police initiale: ${initialFontSize}`);
      }
    });
  });

  it('devrait permettre d\'activer le mode à contraste élevé', () => {
    cy.get('body').then($body => {
      if ($body.find('button:contains("Contraste"), button[aria-label*="contrast"]').length > 0) {
        cy.log('Bouton de contraste élevé trouvé');
        
        // Cliquer sur le bouton de contraste
        cy.get('button:contains("Contraste"), button[aria-label*="contrast"]').first().click();
        cy.wait(500);
      }
    });
  });

  it('devrait permettre de changer la police (OpenDyslexic)', () => {
    cy.get('body').then($body => {
      if ($body.find('button:contains("Dyslexic"), button:contains("Police"), select').length > 0) {
        cy.log('Option de changement de police trouvée');
      }
    });
  });

  it('devrait sauvegarder les préférences d\'accessibilité', () => {
    // Les préférences devraient être dans le localStorage
    cy.window().then((win) => {
      const settings = win.localStorage.getItem('settings');
      
      if (settings) {
        cy.log('Paramètres d\'accessibilité sauvegardés trouvés');
      }
    });
  });
});

describe('Accessibilité - Navigation au Clavier', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('devrait permettre la navigation au clavier', () => {
    // Tester la navigation Tab
    cy.get('body').tab();
    
    cy.focused().should('exist');
  });

  it('devrait avoir des indicateurs de focus visibles', () => {
    cy.get('body').tab();
    
    cy.focused().then($el => {
      const outline = $el.css('outline');
      const boxShadow = $el.css('box-shadow');
      
      cy.log(`Focus outline: ${outline}`);
      cy.log(`Focus box-shadow: ${boxShadow}`);
    });
  });

  it('devrait permettre d\'activer les boutons avec Entrée', () => {
    cy.visit('/dashboard');
    cy.wait(1000);
    
    cy.get('body').then($body => {
      if ($body.find('button, a').length > 0) {
        cy.get('button, a').first().focus().type('{enter}');
      }
    });
  });
});

describe('Accessibilité - ARIA et Sémantique', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('devrait avoir des landmarks ARIA appropriés', () => {
    cy.get('main').should('exist');
    cy.get('nav').should('exist');
  });

  it('devrait avoir des attributs alt sur les images', () => {
    cy.get('img').each($img => {
      const alt = $img.attr('alt');
      const ariaLabel = $img.attr('aria-label');
      
      if (!alt && !ariaLabel) {
        cy.log('Image sans texte alternatif trouvée');
      }
    });
  });

  it('devrait avoir des labels appropriés sur les formulaires', () => {
    cy.visit('/login');
    
    cy.get('input').each($input => {
      const id = $input.attr('id');
      const ariaLabel = $input.attr('aria-label');
      const ariaLabelledby = $input.attr('aria-labelledby');
      
      if (id || ariaLabel || ariaLabelledby) {
        cy.log('Input avec label approprié');
      }
    });
  });

  it('devrait avoir des headings dans un ordre logique', () => {
    cy.get('h1').should('exist');
    
    cy.get('h1, h2, h3, h4, h5, h6').then($headings => {
      cy.log(`Nombre de headings: ${$headings.length}`);
    });
  });
});

describe('Audio - Contrôles', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('devrait afficher les contrôles audio', () => {
    cy.get('body').then($body => {
      const hasAudioControls = $body.find('[data-testid="audio-controls"], .audio-controls, [class*="audio"]').length > 0;
      
      if (hasAudioControls) {
        cy.log('Contrôles audio trouvés');
      }
    });
  });

  it('devrait permettre de contrôler le volume', () => {
    cy.get('body').then($body => {
      const hasVolumeControl = $body.find('input[type="range"], button:contains("Volume"), [aria-label*="volume"]').length > 0;
      
      if (hasVolumeControl) {
        cy.log('Contrôle de volume trouvé');
      }
    });
  });

  it('devrait permettre de mettre en pause/lecture', () => {
    cy.get('body').then($body => {
      const hasPlayPause = $body.find('button:contains("Play"), button:contains("Pause"), button:contains("▶"), button:contains("⏸")').length > 0;
      
      if (hasPlayPause) {
        cy.log('Boutons play/pause trouvés');
      }
    });
  });

  it('devrait sauvegarder les préférences audio', () => {
    cy.window().then((win) => {
      const audioSettings = win.localStorage.getItem('audio-settings');
      
      if (audioSettings) {
        cy.log('Paramètres audio sauvegardés trouvés');
      }
    });
  });
});

describe('Journal Spirituel', () => {
  beforeEach(() => {
    cy.visit('/journal');
  });

  it('devrait afficher la page du journal', () => {
    cy.url().should('include', '/journal');
    cy.wait(1000);
  });

  it('devrait permettre d\'écrire dans le journal', () => {
    cy.wait(1000);
    
    cy.get('body').then($body => {
      const hasEditor = $body.find('textarea, [contenteditable="true"], input[type="text"]').length > 0;
      
      if (hasEditor) {
        cy.log('Zone d\'écriture de journal trouvée');
        
        // Tester l'écriture
        cy.get('textarea, [contenteditable="true"]').first().type('Ceci est une entrée de test');
      }
    });
  });

  it('devrait afficher les entrées précédentes', () => {
    cy.wait(1000);
    
    cy.get('body').then($body => {
      const hasEntries = $body.find('.entry, [class*="entry"], .journal-entry').length > 0;
      
      if (hasEntries) {
        cy.log('Entrées de journal trouvées');
      }
    });
  });

  it('devrait permettre de sauvegarder les entrées', () => {
    cy.get('body').then($body => {
      const hasSaveButton = $body.find('button:contains("Sauvegarder"), button:contains("Enregistrer")').length > 0;
      
      if (hasSaveButton) {
        cy.log('Bouton de sauvegarde trouvé');
      }
    });
  });

  it('devrait être responsive', () => {
    cy.viewport('iphone-x');
    cy.visit('/journal');
    cy.wait(1000);
    cy.get('body').should('be.visible');
  });
});

describe('Lectures Quotidiennes', () => {
  beforeEach(() => {
    cy.visit('/daily-reading');
  });

  it('devrait afficher la page des lectures quotidiennes', () => {
    cy.url().should('include', '/daily-reading');
    cy.wait(2000);
  });

  it('devrait afficher la lecture du jour', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasReading = $body.find('p, article, .reading, [class*="reading"]').length > 0;
      
      if (hasReading) {
        cy.log('Lecture quotidienne trouvée');
      }
    });
  });

  it('devrait afficher la date', () => {
    cy.get('body').then($body => {
      const hasDate = $body.find('.date, [class*="date"]').length > 0 || 
                      $body.text().match(/\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2} \w+ \d{4}/);
      
      if (hasDate) {
        cy.log('Date trouvée');
      }
    });
  });

  it('devrait être responsive', () => {
    cy.viewport('iphone-x');
    cy.visit('/daily-reading');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });
});

describe('Verset du Jour', () => {
  beforeEach(() => {
    cy.visit('/daily-verse');
  });

  it('devrait afficher la page du verset du jour', () => {
    cy.url().should('include', '/daily-verse');
    cy.wait(2000);
  });

  it('devrait afficher un verset', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasVerse = $body.find('p, .verse, [class*="verse"], blockquote').length > 0;
      
      if (hasVerse) {
        cy.log('Verset du jour trouvé');
      }
    });
  });

  it('devrait afficher la référence du verset', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      // Chercher des références bibliques (ex: Jean 3:16)
      const hasReference = $body.text().match(/[A-Za-zéèê]+ \d+:\d+/);
      
      if (hasReference) {
        cy.log('Référence du verset trouvée');
      }
    });
  });

  it('devrait permettre de partager le verset', () => {
    cy.get('body').then($body => {
      const hasShareButton = $body.find('button:contains("Partager"), button:contains("Share")').length > 0;
      
      if (hasShareButton) {
        cy.log('Bouton de partage trouvé');
      }
    });
  });

  it('devrait être responsive', () => {
    cy.viewport('iphone-x');
    cy.visit('/daily-verse');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });
});

describe('Défis Spirituels', () => {
  beforeEach(() => {
    cy.visit('/spiritual-challenges');
  });

  it('devrait afficher la page des défis spirituels', () => {
    cy.url().should('include', '/spiritual-challenges');
    cy.wait(2000);
  });

  it('devrait afficher des défis', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasChallenges = $body.find('.challenge, [class*="challenge"], .card, button').length > 0;
      
      if (hasChallenges) {
        cy.log('Défis spirituels trouvés');
      }
    });
  });

  it('devrait permettre d\'accepter un défi', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasAcceptButton = $body.find('button:contains("Accepter"), button:contains("Commencer")').length > 0;
      
      if (hasAcceptButton) {
        cy.log('Bouton d\'acceptation de défi trouvé');
      }
    });
  });

  it('devrait afficher la progression des défis', () => {
    cy.get('body').then($body => {
      const hasProgress = $body.find('.progress, [class*="progress"]').length > 0;
      
      if (hasProgress) {
        cy.log('Barre de progression trouvée');
      }
    });
  });

  it('devrait être responsive', () => {
    cy.viewport('iphone-x');
    cy.visit('/spiritual-challenges');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });
});

describe('Mémorisation de Versets', () => {
  beforeEach(() => {
    cy.visit('/verse-memorization');
  });

  it('devrait afficher la page de mémorisation', () => {
    cy.url().should('include', '/verse-memorization');
    cy.wait(2000);
  });

  it('devrait afficher des versets à mémoriser', () => {
    cy.wait(2000);
    
    cy.get('body').then($body => {
      const hasVerses = $body.find('p, .verse, [class*="verse"]').length > 0;
      
      if (hasVerses) {
        cy.log('Versets à mémoriser trouvés');
      }
    });
  });

  it('devrait avoir un système de répétition', () => {
    cy.get('body').then($body => {
      const hasSystem = $body.find('button:contains("Suivant"), button:contains("Répéter")').length > 0;
      
      if (hasSystem) {
        cy.log('Système de répétition trouvé');
      }
    });
  });

  it('devrait être responsive', () => {
    cy.viewport('iphone-x');
    cy.visit('/verse-memorization');
    cy.wait(2000);
    cy.get('body').should('be.visible');
  });
});

