import Phaser from 'phaser';
import { CardContainer } from '../types';

export default class OrderEventsScene extends Phaser.Scene {
  private slots!: Phaser.GameObjects.Zone[];
  private cards!: CardContainer[];
  private correctOrder = ['1', '2', '3', '4'];
  private gameComplete = false;
  private lessonData: any = null;
  private difficulty: 'easy' | 'normal' | 'hard' = 'normal';
  private cardCount = 4;
  private storySteps = [
    'Dieu parle à Jonas',
    'Jonas fuit en bateau',
    'Dans le ventre du poisson', 
    'Jonas obéit et prêche'
  ];
  
  // Versions courtes pour les cartes
  private shortStorySteps = [
    'Dieu parle\nà Jonas',
    'Jonas fuit\nen bateau',
    'Dans le ventre\ndu poisson', 
    'Jonas obéit\net prêche'
  ];

  constructor() {
    super('OrderEvents');
  }

  public setDifficulty(difficulty: 'easy' | 'normal' | 'hard') {
    this.difficulty = difficulty;
    switch (difficulty) {
      case 'easy':
        this.cardCount = 3;
        this.correctOrder = ['1', '2', '3'];
        break;
      case 'normal':
        this.cardCount = 4;
        this.correctOrder = ['1', '2', '3', '4'];
        break;
      case 'hard':
        this.cardCount = 6;
        this.correctOrder = ['1', '2', '3', '4', '5', '6'];
        break;
    }
  }

  public setLessonData(data: any) {
    this.lessonData = data;
    console.log('📚 SetLessonData appelé avec:', data?.id || 'pas de data');
    
    // Adapter les étapes selon la leçon
    if (data && data.id) {
      switch (data.id) {
        case 'jonas_01':
          this.storySteps = [
            'Dieu parle à Jonas',
            'Jonas fuit en bateau',
            'Dans le ventre du poisson',
            'Jonas obéit et prêche'
          ];
          this.shortStorySteps = [
            'Dieu parle\nà Jonas',
            'Jonas fuit\nen bateau',
            'Dans le ventre\ndu poisson',
            'Jonas obéit\net prêche'
          ];
          break;
        case 'jonas_02_fuite':
          this.storySteps = [
            'Dieu donne la mission',
            'Jonas refuse et fuit',
            'Tempête sur la mer',
            'Jonas jeté à la mer'
          ];
          this.shortStorySteps = [
            'Dieu donne\nla mission',
            'Jonas refuse\net fuit',
            'Tempête\nsur la mer',
            'Jonas jeté\nà la mer'
          ];
          break;
        case 'jonas_03_ninive':
          this.storySteps = [
            'Jonas prêche à Ninive',
            'Les habitants se repentent',
            'Le roi ordonne le jeûne',
            'Dieu pardonne la ville'
          ];
          this.shortStorySteps = [
            'Jonas prêche\nà Ninive',
            'Les habitants\nse repentent',
            'Le roi ordonne\nle jeûne',
            'Dieu pardonne\nla ville'
          ];
          break;
        case 'jonas_04_ricin':
          this.storySteps = [
            'Jonas attend dehors',
            'Dieu fait pousser le ricin',
            'Un ver détruit le ricin',
            'Leçon de miséricorde'
          ];
          this.shortStorySteps = [
            'Jonas attend\ndehors',
            'Dieu fait pousser\nle ricin',
            'Un ver détruit\nle ricin',
            'Leçon de\nmiséricorde'
          ];
          break;
        case 'daniel_01':
          this.storySteps = [
            'Daniel prie fidèlement',
            'Les jaloux le dénoncent',
            'Daniel jeté aux lions',
            'Dieu ferme leur gueule'
          ];
          this.shortStorySteps = [
            'Daniel prie\nfidèlement',
            'Les jaloux\nle dénoncent',
            'Daniel jeté\naux lions',
            'Dieu ferme\nleur gueule'
          ];
          break;
        case 'david_01':
          this.storySteps = [
            'Goliath défie Israël',
            'David se porte volontaire',
            'David lance sa pierre',
            'Goliath tombe, victoire !'
          ];
          this.shortStorySteps = [
            'Goliath défie\nIsraël',
            'David se porte\nvolontaire',
            'David lance\nsa pierre',
            'Goliath tombe\nvictoire !'
          ];
          break;
        case 'creation_01':
          this.storySteps = [
            'Dieu sépare lumière et ténèbres',
            'Dieu créa la terre et les mers',
            'Dieu créa les plantes et animaux',
            'Dieu créa l\'homme et la femme'
          ];
          this.shortStorySteps = [
            'Dieu sépare\nlumière/ténèbres',
            'Dieu créa terre\net mers',
            'Dieu créa plantes\net animaux',
            'Dieu créa homme\net femme'
          ];
          break;
        case 'josue_01':
          this.storySteps = [
            'Josué reçoit ses instructions',
            'Six jours de marche silencieuse',
            'Septième jour : sept tours',
            'Cris et chute des murailles'
          ];
          this.shortStorySteps = [
            'Josué reçoit\nses instructions',
            'Six jours\nde marche',
            'Septième jour\nsept tours',
            'Cris et chute\ndes murailles'
          ];
          break;
        default:
          // Utiliser les étapes Jonas par défaut
          this.storySteps = [
            'Dieu parle à Jonas',
            'Jonas fuit en bateau',
            'Dans le ventre du poisson',
            'Jonas obéit et prêche'
          ];
          this.shortStorySteps = [
            'Dieu parle\nà Jonas',
            'Jonas fuit\nen bateau',
            'Dans le ventre\ndu poisson',
            'Jonas obéit\net prêche'
          ];
          break;
      }
      
      // Mettre à jour les cartes si elles existent déjà
      if (this.cards && this.cards.length > 0) {
        this.updateCardsAfterLessonDataChange();
      }
    }
  }

  private updateCardsAfterLessonDataChange() {
    // Mettre à jour le texte de chaque carte selon les nouvelles données
    this.cards.forEach((card, index) => {
      const frontNumber = (card as any).frontNumber;
      if (frontNumber && this.shortStorySteps[index]) {
        frontNumber.setText(this.shortStorySteps[index]);
      }
    });
  }

  preload() {
    // Créer des textures colorées au lieu de charger des images
    this.createColorTextures();
  }

  private createColorTextures() {
    const graphics = this.add.graphics();
    
    // Créer 6 cartes colorées différentes (pour tous les niveaux de difficulté)
    const colors = [0x3B82F6, 0x10B981, 0xF59E0B, 0xEF4444, 0x8B5CF6, 0x06B6D4];
    
    for (let i = 1; i <= 6; i++) {
      graphics.clear();
      graphics.fillStyle(colors[i - 1], 1);
      graphics.fillRoundedRect(0, 0, 120, 160, 10);
      
      // Ajouter une bordure
      graphics.lineStyle(3, 0xffffff, 1);
      graphics.strokeRoundedRect(0, 0, 120, 160, 10);
      
      graphics.generateTexture(`card${i}`, 120, 160);
    }
    
    // Créer texture de background
    graphics.clear();
    graphics.fillStyle(0xf7f7f7, 1);
    graphics.fillRect(0, 0, 800, 600);
    graphics.generateTexture('bg', 800, 600);
    
    graphics.destroy();
  }

  create() {
    const { width, height } = this.scale;
    
    // Arrière-plan
    this.add.rectangle(width / 2, height / 2, width, height, 0xf7f7f7);
    
    // Titre et instructions améliorées
    this.add
      .text(width / 2, 30, 'Remets les scènes dans l\'ordre chronologique', {
        fontSize: '24px',
        color: '#1f2937',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
      
    this.add
      .text(width / 2, 55, 'Lis les cartes et place-les dans l\'ordre de l\'histoire  •  Clique pour voir les détails', {
        fontSize: '14px',
        color: '#6b7280',
        fontFamily: 'Arial, sans-serif',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, 70, 'Utilise la logique : que s\'est-il passé en premier, en deuxième, etc.', {
        fontSize: '14px',
        color: '#10b981',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Création des zones de dépôt selon la difficulté
    const slotIndices = Array.from({ length: this.cardCount }, (_, i) => i);
    this.slots = slotIndices.map((i) => {
      const x = 200 + i * 220;
      const y = 280;
      
      // Zone de dépôt invisible
      const zone = this.add
        .zone(x, y, 180, 240)
        .setRectangleDropZone(180, 240);
      (zone as any).index = i;

      // Bordure visible
      this.add
        .rectangle(x, y, 180, 240)
        .setStrokeStyle(3, 0x6b7280)
        .setFillStyle(0xffffff, 0.1);

      // Numéro de l'étape avec indication d'ordre
      this.add
        .text(x, y - 140, `Étape ${i + 1}`, {
          fontSize: '16px',
          color: '#6b7280',
          fontFamily: 'Arial, sans-serif',
          fontStyle: 'bold',
        })
        .setOrigin(0.5);
        
      // Indicateur visuel simple (sans numéro)
      this.add.circle(x + 70, y - 120, 8, 0x10b981);

      return zone;
    });

    // Création des cartes selon la difficulté (mélangées)
    const cardKeys = Array.from({ length: this.cardCount }, (_, i) => `card${i + 1}`);
    const shuffledKeys = [...cardKeys].sort(() => Math.random() - 0.5);

    this.cards = shuffledKeys.map((key, i) => {
      const x = 200 + i * 220;
      const y = 520;

      const container = this.add.container(x, y) as CardContainer;

      // Carte (rectangle coloré si image non disponible)
      const cardImage = this.add.rectangle(0, 0, 180, 240, 0xe5e7eb);
      cardImage.setStrokeStyle(2, 0x9ca3af);

      // Essayer de charger l'image
      if (this.textures.exists(key)) {
        const img = this.add.image(0, 0, key);
        img.setDisplaySize(180, 240);
        container.add(img);
      } else {
        container.add(cardImage);
      }

      const cardNumber = key.replace('card', '');
      const cardIndex = parseInt(cardNumber) - 1;

      // Face avant - Description courte directement visible
      // Utiliser les bonnes données selon la leçon ou les données par défaut
      const displayText = this.shortStorySteps[cardIndex] || `Étape ${cardNumber}`;
      const frontNumber = this.add
        .text(0, 0, displayText, {
          fontSize: '16px',
          color: '#1f2937',
          fontFamily: 'Arial, sans-serif',
          fontStyle: 'bold',
          align: 'center',
          wordWrap: { width: 160 }
        })
        .setOrigin(0.5);

      container.add(frontNumber);

      // Propriétés pour la validation
      (container as any).frontNumber = frontNumber;

      container.setSize(180, 240);
      container.setInteractive({
        draggable: true,
        useHandCursor: true,
      });

      this.input.setDraggable(container);
      return container;
    });

    // Événement de clic pour effet visuel de sélection
    this.input.on('pointerdown', (_pointer: any, currentlyOver: any) => {
      if (currentlyOver.length > 0) {
        const clickedObject = currentlyOver[0];
        // Vérifier si l'objet cliqué est une carte
        const card = this.cards.find(c => c === clickedObject.parentContainer || c === clickedObject);
        if (card) {
          // Petit effet visuel pour confirmer la sélection
          this.tweens.add({
            targets: card,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 100,
            yoyo: true,
            ease: 'Power2'
          });
        }
      }
    });

    // Événements de drag & drop
    this.input.on('dragstart', (_pointer: any, gameObject: CardContainer) => {
      gameObject.setScale(1.05);
      this.children.bringToTop(gameObject);
    });

    this.input.on('drag', (_pointer: any, gameObject: CardContainer, dragX: number, dragY: number) => {
      gameObject.setPosition(dragX, dragY);
    });

    this.input.on('dragend', (_pointer: any, gameObject: CardContainer) => {
      gameObject.setScale(1);
    });

    this.input.on('drop', (_pointer: any, gameObject: CardContainer, dropZone: any) => {
      // Vérifier si une autre carte occupe déjà cette zone
      const occupant = this.cards.find((card) => card.slotIndex === dropZone.index && card !== gameObject);
      if (occupant) {
        // Échanger les positions
        const tempX = gameObject.x;
        const tempY = gameObject.y;
        const tempSlot = gameObject.slotIndex;
        
        gameObject.setPosition(dropZone.x, dropZone.y);
        gameObject.slotIndex = dropZone.index;
        
        occupant.setPosition(tempX, tempY);
        occupant.slotIndex = tempSlot;
      } else {
        gameObject.setPosition(dropZone.x, dropZone.y);
        gameObject.slotIndex = dropZone.index;
      }
      
      this.checkWin();
    });

    this.input.on('dragenter', (_pointer: any, _gameObject: any, dropZone: any) => {
      dropZone.alpha = 0.5;
    });

    this.input.on('dragleave', (_pointer: any, _gameObject: any, dropZone: any) => {
      dropZone.alpha = 1;
    });

    // Instructions détaillées (repositionnées plus haut)
    this.add
      .text(width / 2, 80, 'Clique sur une carte pour voir ce qui se passe', {
        fontSize: '16px',
        color: '#6b7280',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
      
    this.add
      .text(width / 2, 100, 'Puis glisse chaque carte vers l\'étape correspondante', {
        fontSize: '14px',
        color: '#9ca3af',
        fontFamily: 'Arial, sans-serif',
      })
      .setOrigin(0.5);
  }

  private checkWin() {
    if (this.gameComplete) return;

    // Vérifier que toutes les cartes sont placées
    const placedCards = this.cards.filter((card) => card.slotIndex !== undefined);
    if (placedCards.length !== this.cardCount) return;

    // Trier par index de slot et vérifier l'ordre
    const sortedCards = placedCards.sort((a, b) => a.slotIndex! - b.slotIndex!);
    const order = sortedCards.map((card) => {
      // Récupérer le texte de la carte depuis le frontNumber
      const frontNumber = (card as any).frontNumber;
      return frontNumber?.text || '';
    });

    // Vérifier si l'ordre correspond aux étapes chronologiques
    const correctStoryOrder = this.shortStorySteps.slice(0, this.cardCount);
    // Normaliser les textes pour ignorer les différences de \n
    const normalizedOrder = order.map(text => text.replace(/\n/g, ' ').trim());
    const normalizedCorrect = correctStoryOrder.map(text => text.replace(/\n/g, ' ').trim());
    const isCorrect = normalizedOrder.every((cardText, index) => cardText === normalizedCorrect[index]);
    
    // Debug temporaire pour voir le problème
    console.log('🎯 Vérification ordre:', {
      'Ordre actuel brut': order,
      'Ordre correct brut': correctStoryOrder,
      'Ordre normalisé': normalizedOrder,
      'Correct normalisé': normalizedCorrect,
      'Est correct': isCorrect
    });

    // Afficher le message
    const { width } = this.scale;
    let successMessage = 'Bravo ! Jonas a obéi à Dieu.';
    let badgeName = 'Ami des Prophètes';
    
    // Adapter le message selon la leçon
    if (this.lessonData && isCorrect) {
      switch (this.lessonData.id) {
        case 'jonas_02_fuite':
          successMessage = 'Bravo ! Tu as reconstitué la fuite de Jonas.';
          badgeName = 'Navigateur sage';
          break;
        case 'jonas_03_ninive':
          successMessage = 'Bravo ! Ninive s\'est convertie grâce à toi.';
          badgeName = 'Messager de paix';
          break;
        case 'jonas_04_ricin':
          successMessage = 'Bravo ! Tu as compris la leçon du ricin.';
          badgeName = 'Cœur miséricordieux';
          break;
        case 'daniel_01':
          successMessage = 'Bravo ! Daniel est resté fidèle à Dieu.';
          badgeName = 'Fidèle comme Daniel';
          break;
        case 'david_01':
          successMessage = 'Bravo ! David a vaincu le géant avec la foi.';
          badgeName = 'Courage de David';
          break;
        case 'creation_01':
          successMessage = 'Bravo ! Tu as retracé la création du monde.';
          badgeName = 'Témoin de la Création';
          break;
        case 'josue_01':
          successMessage = 'Bravo ! Les murailles sont tombées par la foi.';
          badgeName = 'Conquérant fidèle';
          break;
        default:
          // Garder le message par défaut
          break;
      }
    }
    
    const message = isCorrect 
      ? successMessage 
      : 'Regarde bien l\'histoire, essaie encore.';
    
    const messageColor = isCorrect ? '#10b981' : '#ef4444';
    
    const messageText = this.add
      .text(width / 2, 120, message, {
        fontSize: '24px',
        color: messageColor,
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
      .setDepth(10);

    if (isCorrect) {
      this.gameComplete = true;
      
      // Animation de victoire
      this.tweens.add({
        targets: messageText,
        scaleX: 1.2,
        scaleY: 1.2,
        yoyo: true,
        duration: 300,
        ease: 'Back.easeOut',
      });

      // Émettre l'événement de victoire après un délai
      this.time.delayedCall(1500, () => {
        this.events.emit('lesson:completed', { badge: badgeName });
      });
    } else {
      // Effacer le message d'erreur après un délai
      this.time.delayedCall(2000, () => {
        messageText.destroy();
      });
    }
  }

  private createPlaceholderCard(color: number): Phaser.GameObjects.Rectangle {
    return this.add.rectangle(0, 0, 180, 240, color).setStrokeStyle(2, 0x6b7280);
  }

  // Fonction flipCard supprimée - plus nécessaire car tout le texte est visible
}
