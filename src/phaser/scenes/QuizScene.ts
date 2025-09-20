import Phaser from 'phaser';

export default class QuizScene extends Phaser.Scene {
  private lessonData: any = null;
  private currentQuestion = 0;
  private score = 0;
  private questions: any[] = [];
  private questionText!: Phaser.GameObjects.Text;
  private answerButtons: Phaser.GameObjects.Container[] = [];
  private scoreText!: Phaser.GameObjects.Text;
  private timer!: Phaser.GameObjects.Graphics;
  private timeLeft = 15;
  private timerEvent!: Phaser.Time.TimerEvent;
  private gameComplete = false;

  constructor() {
    super('QuizScene');
  }

  public setLessonData(data: any) {
    this.lessonData = data;
    this.questions = data?.quiz || [];
    console.log('📝 QuizScene - Données de leçon reçues:', data?.id || 'pas de data');
    console.log('📝 QuizScene - Questions chargées:', this.questions.length);
    console.log('📝 QuizScene - Questions détaillées:', this.questions);
    
    // Vérifier que les questions sont bien formatées
    if (this.questions.length > 0) {
      console.log('📝 Première question:', this.questions[0]);
      
      // Si la scène est déjà créée et qu'on n'a pas encore affiché de question, afficher la première
      if (this.scene.isActive() && this.currentQuestion === 0 && !this.gameComplete) {
        console.log('📝 Affichage de la première question après chargement des données');
        this.showQuestion();
      }
    }
  }

  create() {
    const { width, height } = this.scale;

    // Calculer les tailles responsive
    const isMobile = width < 500;
    const isTablet = width >= 500 && width < 800;
    
    // Tailles adaptatives
    const titleFontSize = isMobile ? '24px' : isTablet ? '30px' : '36px';
    const questionFontSize = isMobile ? '18px' : isTablet ? '22px' : '26px';
    const buttonFontSize = isMobile ? '14px' : isTablet ? '16px' : '18px';
    const buttonWidth = isMobile ? width - 40 : isTablet ? 400 : 500;
    const buttonHeight = isMobile ? 50 : 60;
    const buttonSpacing = isMobile ? 70 : 90;

    // Réinitialiser les variables
    this.currentQuestion = 0;
    this.score = 0;
    this.gameComplete = false;
    console.log('🎮 Création du quiz - Questions disponibles:', this.questions.length);
    console.log('🎮 Création du quiz - currentQuestion initialisé à:', this.currentQuestion);
    console.log('🎮 Création du quiz - lessonData:', this.lessonData?.id);
    console.log('📱 Taille d\'écran:', width, 'x', height, 'Mobile:', isMobile, 'Tablet:', isTablet);

    // Arrière-plan avec gradient moderne
    this.add.rectangle(width / 2, height / 2, width, height, 0xf8fafc);
    
    // Ajouter un pattern subtil en arrière-plan
    const bgPattern = this.add.graphics();
    bgPattern.fillStyle(0x000000, 0.02);
    for (let x = 0; x < width; x += 40) {
      for (let y = 0; y < height; y += 40) {
        bgPattern.fillCircle(x, y, 1);
      }
    }

    // Titre spécifique selon la leçon
    let quizTitle = 'Quiz Biblique';
    if (this.lessonData && this.lessonData.id) {
      switch (this.lessonData.id) {
        case 'adam_eve_01':
          quizTitle = '🍎 Quiz Adam et Ève';
          break;
        case 'jonas_01':
        case 'jonas_02_fuite':
        case 'jonas_03_ninive':
        case 'jonas_04_ricin':
          quizTitle = '🐋 Quiz Jonas';
          break;
        case 'creation_01':
          quizTitle = '🌍 Quiz de la Création';
          break;
        case 'noe_01':
          quizTitle = '🚢 Quiz Noé et l\'Arche';
          break;
        case 'babel_01':
          quizTitle = '🏗️ Quiz Tour de Babel';
          break;
        case 'abraham_01':
          quizTitle = '⭐ Quiz Abraham et l\'Alliance';
          break;
        case 'isaac_01':
          quizTitle = '💍 Quiz Isaac et Rebecca';
          break;
        case 'jacob_01':
          quizTitle = '👬 Quiz Jacob et Ésaü';
          break;
        case 'joseph_01':
          quizTitle = '🌾 Quiz Joseph en Égypte';
          break;
        case 'commandements_01':
          quizTitle = '📜 Quiz Les Dix Commandements';
          break;
        case 'gedeon_01':
          quizTitle = '🗡️ Quiz Gédéon et les 300 hommes';
          break;
        case 'moise_buisson_01':
          quizTitle = '🔥 Quiz Moïse et le buisson ardent';
          break;
        case 'plaies_egypte_01':
          quizTitle = '🐸 Quiz Les dix plaies d\'Égypte';
          break;
        case 'mer_rouge_01':
          quizTitle = '🌊 Quiz La traversée de la mer Rouge';
          break;
        case 'samson_01':
          quizTitle = '💪 Quiz Samson et Dalila';
          break;
        case 'salomon_01':
          quizTitle = '👑 Quiz Salomon et le Temple';
          break;
        case 'elie_01':
          quizTitle = '🔥 Quiz Élie et les prophètes de Baal';
          break;
        case 'ezechiel_01':
          quizTitle = '💨 Quiz Ézéchiel et les ossements desséchés';
          break;
        case 'naissance_jesus':
          quizTitle = '👶 Quiz Naissance de Jésus';
          break;

        case 'enfance_jesus':
          quizTitle = '🧒 Quiz Enfance de Jésus';
          break;

        case 'bapteme_jesus':
          quizTitle = '💦 Quiz Baptême de Jésus';
          break;

        case 'tentations_jesus':
          quizTitle = '😈 Quiz Tentations de Jésus';
          break;
        default:
          quizTitle = '📖 Quiz Biblique';
          break;
      }
    }

    // Titre avec style moderne et animation d'entrée
    const title = this.add
      .text(width / 2, isMobile ? 30 : 50, quizTitle, {
        fontSize: titleFontSize,
        color: '#1e293b',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        stroke: '#ffffff',
        strokeThickness: 2,
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: '#000000',
          blur: 4,
          fill: true
        }
      })
      .setOrigin(0.5)
      .setAlpha(0);
      
    // Animation d'entrée du titre
    this.tweens.add({
      targets: title,
      alpha: 1,
      y: 55,
      duration: 800,
      ease: 'Back.easeOut'
    });

    // Score avec style moderne
    this.scoreText = this.add
      .text(width - 50, 50, `Score: ${this.score}/${this.questions.length}`, {
        fontSize: '22px',
        color: '#059669',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        stroke: '#ffffff',
        strokeThickness: 1,
        shadow: {
          offsetX: 1,
          offsetY: 1,
          color: '#000000',
          blur: 2,
          fill: true
        }
      })
      .setOrigin(1, 0)
      .setAlpha(0);
      
    // Animation d'entrée du score
    this.tweens.add({
      targets: this.scoreText,
      alpha: 1,
      duration: 600,
      delay: 200,
      ease: 'Power2'
    });

    // Timer visuel
    this.timer = this.add.graphics();
    this.updateTimer();

    // Attendre que les données soient chargées avant d'afficher la première question
    if (this.questions.length > 0) {
      this.showQuestion();
    } else {
      console.log('⏳ Attente des données de leçon...');
      // Attendre un peu pour que setLessonData soit appelé
      this.time.delayedCall(100, () => {
        if (this.questions.length > 0) {
          console.log('✅ Données reçues, affichage de la première question');
          this.showQuestion();
        } else {
          console.log('❌ Aucune donnée reçue après 100ms');
          this.endQuiz();
        }
      });
    }
  }

  private showQuestion() {
    console.log('❓ Affichage question:', this.currentQuestion + 1, '/', this.questions.length);
    console.log('❓ Questions disponibles:', this.questions);
    console.log('❓ currentQuestion:', this.currentQuestion, 'questions.length:', this.questions.length);
    
    if (this.currentQuestion >= this.questions.length) {
      console.log('🏁 Fin du quiz - toutes les questions ont été posées');
      this.endQuiz();
      return;
    }
    
    if (this.questions.length === 0) {
      console.log('❌ Aucune question disponible !');
      this.endQuiz();
      return;
    }

    const question = this.questions[this.currentQuestion];
    const { width, height } = this.scale;

    // Calculer les tailles responsive
    const isMobile = width < 500;
    const isTablet = width >= 500 && width < 800;
    
    // Tailles adaptatives
    const questionFontSize = isMobile ? '18px' : isTablet ? '22px' : '26px';
    const buttonFontSize = isMobile ? '14px' : isTablet ? '16px' : '18px';
    const buttonWidth = isMobile ? width - 40 : isTablet ? 400 : 500;
    const buttonHeight = isMobile ? 50 : 60;
    const buttonSpacing = isMobile ? 70 : 90;
    const questionY = isMobile ? 120 : 150;

    // Nettoyer les anciens éléments
    if (this.questionText) this.questionText.destroy();
    this.answerButtons.forEach(btn => btn.destroy());
    this.answerButtons = [];

    // Afficher la question avec style moderne
    this.questionText = this.add
      .text(width / 2, questionY, `Question ${this.currentQuestion + 1}: ${question.q}`, {
        fontSize: questionFontSize,
        color: '#1e293b',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        wordWrap: { width: width - (isMobile ? 20 : 100) },
        align: 'center',
        stroke: '#ffffff',
        strokeThickness: 1,
        shadow: {
          offsetX: 1,
          offsetY: 1,
          color: '#000000',
          blur: 2,
          fill: true
        }
      })
      .setOrigin(0.5)
      .setAlpha(0);
      
    // Animation d'entrée de la question
    this.tweens.add({
      targets: this.questionText,
      alpha: 1,
      duration: 600,
      delay: 300,
      ease: 'Power2'
    });

    // Créer les boutons de réponse avec design moderne
    question.choices.forEach((choice: string, index: number) => {
      const y = (isMobile ? 200 : 300) + index * buttonSpacing;
      const container = this.add.container(width / 2, y);
      container.setAlpha(0); // Commencer invisible

      // Bouton background avec gradient
      const bg = this.add.graphics();
      bg.fillGradientStyle(0xffffff, 0xffffff, 0xf8fafc, 0xf8fafc, 1, 1, 0, 0);
      bg.fillRoundedRect(-buttonWidth/2, -buttonHeight/2, buttonWidth, buttonHeight, 15);
      bg.lineStyle(3, 0xe2e8f0, 1);
      bg.strokeRoundedRect(-buttonWidth/2, -buttonHeight/2, buttonWidth, buttonHeight, 15);
      
      // Ombre portée
      bg.fillStyle(0x000000, 0.1);
      bg.fillRoundedRect(-buttonWidth/2 + 2, -buttonHeight/2 + 2, buttonWidth, buttonHeight, 15);

      // Texte de la réponse avec style moderne
      const text = this.add
        .text(0, 0, choice, {
          fontSize: buttonFontSize,
          color: '#1e293b',
          fontFamily: 'Arial, sans-serif',
          fontStyle: 'bold',
          stroke: '#ffffff',
          strokeThickness: 1,
        })
        .setOrigin(0.5);

      container.add([bg, text]);
      container.setSize(500, 60);
      container.setInteractive({ useHandCursor: true });

      // Animation d'entrée des boutons
      this.tweens.add({
        targets: container,
        alpha: 1,
        y: y,
        scaleX: 1,
        scaleY: 1,
        duration: 600,
        delay: 500 + (index * 100),
        ease: 'Back.easeOut'
      });

      // Animation hover améliorée
      container.on('pointerover', () => {
        this.tweens.add({
          targets: container,
          scaleX: 1.08,
          scaleY: 1.08,
          duration: 200,
          ease: 'Back.easeOut'
        });
        
        // Changer la couleur du bouton
        bg.clear();
        bg.fillGradientStyle(0x3B82F6, 0x3B82F6, 0x1D4ED8, 0x1D4ED8, 1, 1, 0, 0);
        bg.fillRoundedRect(-250, -30, 500, 60, 15);
        bg.lineStyle(3, 0xffffff, 1);
        bg.strokeRoundedRect(-250, -30, 500, 60, 15);
        
        text.setColor('#ffffff');
      });

      container.on('pointerout', () => {
        this.tweens.add({
          targets: container,
          scaleX: 1,
          scaleY: 1,
          duration: 200,
          ease: 'Back.easeOut'
        });
        
        // Restaurer la couleur originale
        bg.clear();
        bg.fillGradientStyle(0xffffff, 0xffffff, 0xf8fafc, 0xf8fafc, 1, 1, 0, 0);
        bg.fillRoundedRect(-250, -30, 500, 60, 15);
        bg.lineStyle(3, 0xe2e8f0, 1);
        bg.strokeRoundedRect(-250, -30, 500, 60, 15);
        
        text.setColor('#1e293b');
      });

      // Clic sur la réponse
      container.on('pointerdown', () => {
        this.selectAnswer(index, question.answer, bg, text);
      });

      this.answerButtons.push(container);
    });

    // Redémarrer le timer
    this.timeLeft = 15;
    this.startTimer();
  }

  private selectAnswer(selectedIndex: number, correctIndex: number, bg: Phaser.GameObjects.Graphics, text: Phaser.GameObjects.Text) {
    if (this.gameComplete) return;

    console.log('🎯 Réponse sélectionnée:', selectedIndex, 'Correcte:', correctIndex);

    // Arrêter le timer
    if (this.timerEvent) this.timerEvent.remove();

    const isCorrect = selectedIndex === correctIndex;
    console.log('✅ Réponse correcte:', isCorrect);

    // Feedback visuel amélioré
    if (isCorrect) {
      // Animation de succès
      bg.clear();
      bg.fillGradientStyle(0x10b981, 0x10b981, 0x059669, 0x059669, 1, 1, 0, 0);
      bg.fillRoundedRect(-250, -30, 500, 60, 15);
      bg.lineStyle(3, 0xffffff, 1);
      bg.strokeRoundedRect(-250, -30, 500, 60, 15);
      
      text.setColor('#ffffff');
      this.score++;
      
      // Effet de particules amélioré
      this.createParticles(bg.x, bg.y);
      
      // Animation de victoire
      this.tweens.add({
        targets: this.answerButtons[selectedIndex],
        scaleX: 1.15,
        scaleY: 1.15,
        duration: 200,
        yoyo: true,
        ease: 'Back.easeOut'
      });
    } else {
      // Animation d'erreur
      bg.clear();
      bg.fillGradientStyle(0xef4444, 0xef4444, 0xdc2626, 0xdc2626, 1, 1, 0, 0);
      bg.fillRoundedRect(-250, -30, 500, 60, 15);
      bg.lineStyle(3, 0xffffff, 1);
      bg.strokeRoundedRect(-250, -30, 500, 60, 15);
      
      text.setColor('#ffffff');
      
      // Montrer la bonne réponse avec animation
      const correctButton = this.answerButtons[correctIndex];
      const correctBg = correctButton.list[0] as Phaser.GameObjects.Graphics;
      const correctText = correctButton.list[1] as Phaser.GameObjects.Text;
      
      correctBg.clear();
      correctBg.fillGradientStyle(0x10b981, 0x10b981, 0x059669, 0x059669, 1, 1, 0, 0);
      correctBg.fillRoundedRect(-250, -30, 500, 60, 15);
      correctBg.lineStyle(3, 0xffffff, 1);
      correctBg.strokeRoundedRect(-250, -30, 500, 60, 15);
      
      correctText.setColor('#ffffff');
      
      // Animation de la bonne réponse
      this.tweens.add({
        targets: correctButton,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 300,
        yoyo: true,
        ease: 'Back.easeOut'
      });
    }

    // Mettre à jour le score avec animation
    this.tweens.add({
      targets: this.scoreText,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 200,
      yoyo: true,
      ease: 'Back.easeOut',
      onComplete: () => {
        this.scoreText.setText(`Score: ${this.score}/${this.questions.length}`);
      }
    });
    
    console.log('📊 Score actuel:', this.score, '/', this.questions.length);

    // Désactiver tous les boutons
    this.answerButtons.forEach(btn => {
      btn.disableInteractive();
    });

    // Passer à la question suivante après un délai
    this.time.delayedCall(2500, () => {
      this.currentQuestion++;
      console.log('➡️ Question suivante:', this.currentQuestion, '/', this.questions.length);
      this.showQuestion();
    });
  }

  private createParticles(x: number, y: number) {
    // Étoiles de victoire améliorées
    for (let i = 0; i < 12; i++) {
      const star = this.add.text(x, y, '⭐', {
        fontSize: '24px',
      }).setOrigin(0.5);

      const angle = (i / 12) * Math.PI * 2;
      const distance = 80 + Math.random() * 40;

      this.tweens.add({
        targets: star,
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        alpha: 0,
        scale: 2,
        rotation: Math.PI * 2,
        duration: 1200,
        ease: 'Power2',
        delay: Math.random() * 200,
        onComplete: () => star.destroy(),
      });
    }
    
    // Ajouter des cœurs pour plus de joie
    for (let i = 0; i < 6; i++) {
      const heart = this.add.text(x, y, '💚', {
        fontSize: '20px',
      }).setOrigin(0.5);

      const angle = (i / 6) * Math.PI * 2;
      const distance = 60;

      this.tweens.add({
        targets: heart,
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance - 20,
        alpha: 0,
        scale: 1.8,
        duration: 1000,
        ease: 'Power2',
        delay: Math.random() * 300,
        onComplete: () => heart.destroy(),
      });
    }
  }

  private startTimer() {
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      repeat: this.timeLeft - 1,
      callback: () => {
        this.timeLeft--;
        this.updateTimer();
        
        if (this.timeLeft <= 0) {
          // Temps écoulé - mauvaise réponse
          const dummyBg = this.add.graphics();
          const dummyText = this.add.text(0, 0, '', {});
          this.selectAnswer(-1, this.questions[this.currentQuestion].answer, dummyBg, dummyText);
        }
      },
    });
  }

  private updateTimer() {
    this.timer.clear();
    
    const { width } = this.scale;
    const barWidth = 400;
    const barHeight = 25;
    const x = (width - barWidth) / 2;
    const y = 200;
    
    // Barre de fond avec gradient
    this.timer.fillGradientStyle(0xe5e7eb, 0xe5e7eb, 0xf3f4f6, 0xf3f4f6, 1, 1, 0, 0);
    this.timer.fillRoundedRect(x, y, barWidth, barHeight, 12);
    
    // Barre de progression avec gradient
    const progress = this.timeLeft / 15;
    let color1, color2;
    
    if (progress > 0.5) {
      color1 = 0x10b981;
      color2 = 0x059669;
    } else if (progress > 0.25) {
      color1 = 0xf59e0b;
      color2 = 0xd97706;
    } else {
      color1 = 0xef4444;
      color2 = 0xdc2626;
    }
    
    this.timer.fillGradientStyle(color1, color1, color2, color2, 1, 1, 0, 0);
    this.timer.fillRoundedRect(x, y, barWidth * progress, barHeight, 12);
    
    // Bordure moderne
    this.timer.lineStyle(3, 0xffffff, 1);
    this.timer.strokeRoundedRect(x, y, barWidth, barHeight, 12);
    
    // Ombre portée
    this.timer.fillStyle(0x000000, 0.1);
    this.timer.fillRoundedRect(x + 1, y + 1, barWidth, barHeight, 12);
    
    // Texte du temps restant
    const timeText = this.add.text(width / 2, y + barHeight + 10, `${this.timeLeft}s`, {
      fontSize: '16px',
      color: progress > 0.5 ? '#059669' : progress > 0.25 ? '#d97706' : '#dc2626',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      stroke: '#ffffff',
      strokeThickness: 1,
    }).setOrigin(0.5);
    
    // Animation du texte
    this.tweens.add({
      targets: timeText,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 200,
      yoyo: true,
      ease: 'Power2'
    });
    
    // Détruire le texte après l'animation
    this.time.delayedCall(500, () => {
      timeText.destroy();
    });
  }

  private endQuiz() {
    this.gameComplete = true;
    const { width, height } = this.scale;

    console.log('🏁 Quiz terminé - Score final:', this.score, '/', this.questions.length);

    // Nettoyer l'écran
    if (this.questionText) this.questionText.destroy();
    this.answerButtons.forEach(btn => btn.destroy());
    this.timer.clear();

    // Calcul des résultats
    const percentage = Math.round((this.score / this.questions.length) * 100);
    console.log('📈 Pourcentage:', percentage + '%');
    let badge = 'Apprenti biblique';
    let message = 'Continue tes efforts !';

    // Badges spécifiques selon la leçon
    if (this.lessonData && this.lessonData.id) {
      switch (this.lessonData.id) {
        case 'adam_eve_01':
          console.log('🍎 Badges Adam et Ève - Pourcentage:', percentage);
          if (percentage >= 90) {
            badge = 'Gardien du Jardin';
            message = 'Tu connais parfaitement l\'histoire d\'Adam et Ève !';
          } else if (percentage >= 70) {
            badge = 'Témoin de la Chute';
            message = 'Très bonne connaissance de cette histoire !';
          } else if (percentage >= 50) {
            badge = 'Étudiant d\'Éden';
            message = 'Bon travail sur cette leçon importante !';
          } else {
            badge = 'Apprenti d\'Éden';
            message = 'Relis l\'histoire d\'Adam et Ève !';
          }
          console.log('🏆 Badge attribué:', badge);
          break;
        case 'jonas_01':
        case 'jonas_02_fuite':
        case 'jonas_03_ninive':
        case 'jonas_04_ricin':
          if (percentage >= 90) {
            badge = 'Ami des Prophètes';
            message = 'Tu connais parfaitement l\'histoire de Jonas !';
          } else if (percentage >= 70) {
            badge = 'Navigateur sage';
            message = 'Très bonne connaissance de Jonas !';
          } else if (percentage >= 50) {
            badge = 'Étudiant de Jonas';
            message = 'Bon travail sur cette histoire !';
          } else {
            badge = 'Apprenti de Jonas';
            message = 'Relis l\'histoire de Jonas !';
          }
          break;
        case 'creation_01':
          if (percentage >= 90) {
            badge = 'Témoin de la Création';
            message = 'Tu connais parfaitement la création !';
          } else if (percentage >= 70) {
            badge = 'Créateur en herbe';
            message = 'Très bonne connaissance de la création !';
          } else if (percentage >= 50) {
            badge = 'Étudiant de la Création';
            message = 'Bon travail sur cette leçon !';
          } else {
            badge = 'Apprenti de la Création';
            message = 'Relis l\'histoire de la création !';
          }
          break;
        case 'noe_01':
          if (percentage >= 90) {
            badge = 'Navigateur de l\'Alliance';
            message = 'Tu connais parfaitement l\'histoire de Noé !';
          } else if (percentage >= 70) {
            badge = 'Capitaine de l\'Arche';
            message = 'Très bonne connaissance de Noé et l\'arche !';
          } else if (percentage >= 50) {
            badge = 'Étudiant du Déluge';
            message = 'Bon travail sur cette histoire importante !';
          } else {
            badge = 'Apprenti de Noé';
            message = 'Relis l\'histoire de Noé et l\'arche !';
          }
          break;
        case 'babel_01':
          if (percentage >= 90) {
            badge = 'Maître des Langues';
            message = 'Tu connais parfaitement l\'histoire de Babel !';
          } else if (percentage >= 70) {
            badge = 'Architecte de Babel';
            message = 'Très bonne connaissance de la Tour de Babel !';
          } else if (percentage >= 50) {
            badge = 'Étudiant des Langues';
            message = 'Bon travail sur cette histoire importante !';
          } else {
            badge = 'Apprenti de Babel';
            message = 'Relis l\'histoire de la Tour de Babel !';
          }
          break;
        case 'abraham_01':
          if (percentage >= 90) {
            badge = 'Fils d\'Abraham';
            message = 'Tu connais parfaitement l\'histoire d\'Abraham !';
          } else if (percentage >= 70) {
            badge = 'Héritier de la Promesse';
            message = 'Très bonne connaissance d\'Abraham et de l\'alliance !';
          } else if (percentage >= 50) {
            badge = 'Étudiant de la Foi';
            message = 'Bon travail sur cette histoire importante !';
          } else {
            badge = 'Apprenti d\'Abraham';
            message = 'Relis l\'histoire d\'Abraham et de l\'alliance !';
          }
          break;
        case 'isaac_01':
          if (percentage >= 90) {
            badge = 'Fils d\'Isaac';
            message = 'Tu connais parfaitement l\'histoire d\'Isaac et Rebecca !';
          } else if (percentage >= 70) {
            badge = 'Héritier de la Bénédiction';
            message = 'Très bonne connaissance du mariage d\'Isaac et Rebecca !';
          } else if (percentage >= 50) {
            badge = 'Étudiant de l\'Alliance';
            message = 'Bon travail sur cette belle histoire !';
          } else {
            badge = 'Apprenti d\'Isaac';
            message = 'Relis l\'histoire d\'Isaac et Rebecca !';
          }
          break;
        case 'jacob_01':
          if (percentage >= 90) {
            badge = 'Fils de Jacob';
            message = 'Tu connais parfaitement l\'histoire de Jacob et Ésaü !';
          } else if (percentage >= 70) {
            badge = 'Maître de la Réconciliation';
            message = 'Très bonne connaissance de l\'histoire des jumeaux !';
          } else if (percentage >= 50) {
            badge = 'Étudiant du Pardon';
            message = 'Bon travail sur cette histoire de réconciliation !';
          } else {
            badge = 'Apprenti de Jacob';
            message = 'Relis l\'histoire de Jacob et Ésaü !';
          }
          break;
        case 'joseph_01':
          if (percentage >= 90) {
            badge = 'Fils de Joseph';
            message = 'Tu connais parfaitement l\'histoire de Joseph en Égypte !';
          } else if (percentage >= 70) {
            badge = 'Maître du Pardon';
            message = 'Très bonne connaissance de l\'histoire de Joseph !';
          } else if (percentage >= 50) {
            badge = 'Étudiant de la Providence';
            message = 'Bon travail sur cette belle histoire !';
          } else {
            badge = 'Apprenti de Joseph';
            message = 'Relis l\'histoire de Joseph en Égypte !';
          }
          break;
        case 'commandements_01':
          if (percentage >= 90) {
            badge = 'Gardien de la Loi';
            message = 'Tu connais parfaitement les Dix Commandements !';
          } else if (percentage >= 70) {
            badge = 'Disciple de Moïse';
            message = 'Très bonne connaissance de la Loi de Dieu !';
          } else if (percentage >= 50) {
            badge = 'Étudiant de la Loi';
            message = 'Bon travail sur les commandements !';
          } else {
            badge = 'Apprenti de la Loi';
            message = 'Relis l\'histoire des Dix Commandements !';
          }
          break;
        case 'gedeon_01':
          if (percentage >= 90) {
            badge = 'Vaillant Héros';
            message = 'Tu connais parfaitement l\'histoire de Gédéon !';
          } else if (percentage >= 70) {
            badge = 'Guerrier de Dieu';
            message = 'Très bonne connaissance de cette victoire miraculeuse !';
          } else if (percentage >= 50) {
            badge = 'Soldat de la Foi';
            message = 'Bon travail sur l\'histoire de Gédéon !';
          } else {
            badge = 'Apprenti de Gédéon';
            message = 'Relis l\'histoire de Gédéon et des 300 hommes !';
          }
          break;
        case 'naissance_jesus':
          if (percentage >= 90) {
            badge = 'Témoin de Noël';
            message = 'Tu connais parfaitement l\'histoire de la naissance de Jésus !';
          } else if (percentage >= 70) {
            badge = 'Adorateur de Bethléem';
            message = 'Très bonne connaissance de la naissance de Jésus !';
          } else if (percentage >= 50) {
            badge = 'Pèlerin de Noël';
            message = 'Bon travail sur cette histoire merveilleuse !';
          } else {
            badge = 'Apprenti de Noël';
            message = 'Relis l\'histoire de la naissance de Jésus !';
          }
          break;

        case 'enfance_jesus':
          if (percentage >= 90) {
            badge = 'Étudiant du Temple';
            message = 'Tu connais parfaitement l\'histoire de l\'enfance de Jésus !';
          } else if (percentage >= 70) {
            badge = 'Sage de Jérusalem';
            message = 'Très bonne connaissance de l\'enfance de Jésus !';
          } else if (percentage >= 50) {
            badge = 'Pèlerin du Temple';
            message = 'Bon travail sur l\'histoire de l\'enfance de Jésus !';
          } else {
            badge = 'Apprenti du Temple';
            message = 'Relis l\'histoire de l\'enfance de Jésus !';
          }
          break;

        case 'bapteme_jesus':
          if (percentage >= 90) {
            badge = 'Témoin du Baptême';
            message = 'Tu connais parfaitement l\'histoire du baptême de Jésus !';
          } else if (percentage >= 70) {
            badge = 'Fils bien-aimé';
            message = 'Très bonne connaissance du baptême de Jésus !';
          } else if (percentage >= 50) {
            badge = 'Pèlerin du Jourdain';
            message = 'Bon travail sur l\'histoire du baptême de Jésus !';
          } else {
            badge = 'Apprenti du Baptême';
            message = 'Relis l\'histoire du baptême de Jésus !';
          }
          break;

        case 'tentations_jesus':
          if (percentage >= 90) {
            badge = 'Vainqueur des Tentations';
            message = 'Tu connais parfaitement l\'histoire des tentations de Jésus !';
          } else if (percentage >= 70) {
            badge = 'Résistant au Mal';
            message = 'Très bonne connaissance des tentations de Jésus !';
          } else if (percentage >= 50) {
            badge = 'Guerrier de la Parole';
            message = 'Bon travail sur l\'histoire des tentations de Jésus !';
          } else {
            badge = 'Apprenti de la Résistance';
            message = 'Relis l\'histoire des tentations de Jésus !';
          }
          break;
        case 'moise_buisson_01':
          if (percentage >= 90) {
            badge = 'Témoin de l\'Appel';
            message = 'Tu connais parfaitement l\'histoire de l\'appel de Moïse !';
          } else if (percentage >= 70) {
            badge = 'Gardien du Buisson';
            message = 'Très bonne connaissance de cette révélation divine !';
          } else if (percentage >= 50) {
            badge = 'Étudiant de l\'Appel';
            message = 'Bon travail sur l\'histoire de Moïse et le buisson ardent !';
          } else {
            badge = 'Apprenti de Moïse';
            message = 'Relis l\'histoire de Moïse et le buisson ardent !';
          }
          break;
        case 'plaies_egypte_01':
          if (percentage >= 90) {
            badge = 'Témoin de la Puissance';
            message = 'Tu connais parfaitement l\'histoire des dix plaies d\'Égypte !';
          } else if (percentage >= 70) {
            badge = 'Gardien des Plaies';
            message = 'Très bonne connaissance de cette démonstration de puissance divine !';
          } else if (percentage >= 50) {
            badge = 'Étudiant des Miracles';
            message = 'Bon travail sur l\'histoire des dix plaies d\'Égypte !';
          } else {
            badge = 'Apprenti de Moïse';
            message = 'Relis l\'histoire des dix plaies d\'Égypte !';
          }
          break;
        case 'mer_rouge_01':
          if (percentage >= 90) {
            badge = 'Témoin du Miracle';
            message = 'Tu connais parfaitement l\'histoire de la traversée de la mer Rouge !';
          } else if (percentage >= 70) {
            badge = 'Gardien de la Mer';
            message = 'Très bonne connaissance de ce miracle de délivrance !';
          } else if (percentage >= 50) {
            badge = 'Étudiant des Miracles';
            message = 'Bon travail sur l\'histoire de la traversée de la mer Rouge !';
          } else {
            badge = 'Apprenti de Moïse';
            message = 'Relis l\'histoire de la traversée de la mer Rouge !';
          }
          break;
        case 'samson_01':
          if (percentage >= 90) {
            badge = 'Témoin de la Force';
            message = 'Tu connais parfaitement l\'histoire de Samson et Dalila !';
          } else if (percentage >= 70) {
            badge = 'Gardien de la Force';
            message = 'Très bonne connaissance de cette histoire de force et de faiblesse !';
          } else if (percentage >= 50) {
            badge = 'Étudiant de Samson';
            message = 'Bon travail sur l\'histoire de Samson et Dalila !';
          } else {
            badge = 'Apprenti des Juges';
            message = 'Relis l\'histoire de Samson et Dalila !';
          }
          break;
        case 'salomon_01':
          if (percentage >= 90) {
            badge = 'Témoin de la Sagesse';
            message = 'Tu connais parfaitement l\'histoire de Salomon et le Temple !';
          } else if (percentage >= 70) {
            badge = 'Gardien du Temple';
            message = 'Très bonne connaissance de cette histoire de sagesse et de splendeur !';
          } else if (percentage >= 50) {
            badge = 'Étudiant de Salomon';
            message = 'Bon travail sur l\'histoire de Salomon et le Temple !';
          } else {
            badge = 'Apprenti des Rois';
            message = 'Relis l\'histoire de Salomon et le Temple !';
          }
          break;
        case 'elie_01':
          if (percentage >= 90) {
            badge = 'Témoin du Feu';
            message = 'Tu connais parfaitement l\'histoire d\'Élie et les prophètes de Baal !';
          } else if (percentage >= 70) {
            badge = 'Gardien du Carmel';
            message = 'Très bonne connaissance de cette histoire de puissance divine !';
          } else if (percentage >= 50) {
            badge = 'Étudiant d\'Élie';
            message = 'Bon travail sur l\'histoire d\'Élie et les prophètes de Baal !';
          } else {
            badge = 'Apprenti des Prophètes';
            message = 'Relis l\'histoire d\'Élie et les prophètes de Baal !';
          }
          break;
        case 'ezechiel_01':
          if (percentage >= 90) {
            badge = 'Témoin de la Résurrection';
            message = 'Tu connais parfaitement l\'histoire d\'Ézéchiel et les ossements desséchés !';
          } else if (percentage >= 70) {
            badge = 'Gardien de l\'Espérance';
            message = 'Très bonne connaissance de cette vision de résurrection !';
          } else if (percentage >= 50) {
            badge = 'Étudiant d\'Ézéchiel';
            message = 'Bon travail sur l\'histoire d\'Ézéchiel et les ossements desséchés !';
          } else {
            badge = 'Apprenti des Visions';
            message = 'Relis l\'histoire d\'Ézéchiel et les ossements desséchés !';
          }
          break;
        default:
          // Badges génériques
          if (percentage >= 90) {
            badge = 'Maître de la Bible';
            message = 'Excellente connaissance !';
          } else if (percentage >= 70) {
            badge = 'Sage de la Bible';
            message = 'Très bien joué !';
          } else if (percentage >= 50) {
            badge = 'Étudiant biblique';
            message = 'Bon travail !';
          }
          break;
      }
    } else {
      // Badges génériques par défaut
      if (percentage >= 90) {
        badge = 'Maître de la Bible';
        message = 'Excellente connaissance !';
      } else if (percentage >= 70) {
        badge = 'Sage de la Bible';
        message = 'Très bien joué !';
      } else if (percentage >= 50) {
        badge = 'Étudiant biblique';
        message = 'Bon travail !';
      }
    }

    // Écran de résultats avec design moderne
    const resultsBg = this.add.graphics();
    resultsBg.fillGradientStyle(0xffffff, 0xffffff, 0xf8fafc, 0xf8fafc, 1, 1, 0, 0);
    resultsBg.fillRoundedRect(width / 2 - 300, height / 2 - 200, 600, 400, 30);
    resultsBg.lineStyle(4, 0xe2e8f0, 1);
    resultsBg.strokeRoundedRect(width / 2 - 300, height / 2 - 200, 600, 400, 30);
    
    // Ombre portée
    resultsBg.fillStyle(0x000000, 0.1);
    resultsBg.fillRoundedRect(width / 2 - 298, height / 2 - 198, 600, 400, 30);

    const titleText = this.add
      .text(width / 2, height / 2 - 120, `🎉 Quiz terminé !`, {
        fontSize: '42px',
        color: '#1e293b',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        stroke: '#ffffff',
        strokeThickness: 2,
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: '#000000',
          blur: 4,
          fill: true
        }
      })
      .setOrigin(0.5)
      .setAlpha(0);

    // Score avec couleur selon la performance
    const scoreColor = percentage >= 70 ? '#059669' : percentage >= 50 ? '#d97706' : '#ef4444';
    const scoreText = this.add
      .text(width / 2, height / 2 - 60, `Score: ${this.score}/${this.questions.length} (${percentage}%)`, {
        fontSize: '28px',
        color: scoreColor,
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        stroke: '#ffffff',
        strokeThickness: 1,
        shadow: {
          offsetX: 1,
          offsetY: 1,
          color: '#000000',
          blur: 2,
          fill: true
        }
      })
      .setOrigin(0.5)
      .setAlpha(0);

    const messageText = this.add
      .text(width / 2, height / 2 - 20, message, {
        fontSize: '22px',
        color: '#475569',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        wordWrap: { width: width - 150 },
        align: 'center',
        stroke: '#ffffff',
        strokeThickness: 1,
      })
      .setOrigin(0.5)
      .setAlpha(0);

    // Animation d'entrée des résultats
    this.tweens.add({
      targets: [titleText, scoreText, messageText],
      alpha: 1,
      duration: 800,
      delay: 500,
      ease: 'Back.easeOut'
    });

    // Badge obtenu avec emoji selon la leçon
    let badgeEmoji = '🏆';
    if (this.lessonData && this.lessonData.id === 'adam_eve_01') {
      badgeEmoji = '🍎';
    } else if (this.lessonData && this.lessonData.id?.includes('jonas')) {
      badgeEmoji = '🐋';
    } else if (this.lessonData && this.lessonData.id === 'creation_01') {
      badgeEmoji = '🌍';
    }

    const badgeText = this.add
      .text(width / 2, height / 2 + 40, `${badgeEmoji} ${badge}`, {
        fontSize: '32px',
        color: '#d97706',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        stroke: '#ffffff',
        strokeThickness: 2,
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: '#000000',
          blur: 4,
          fill: true
        }
      })
      .setOrigin(0.5)
      .setAlpha(0);

    // Message d'encouragement supplémentaire
    let encouragement = '';
    if (percentage === 100) {
      encouragement = 'Parfait ! Tu es un vrai expert !';
    } else if (percentage >= 90) {
      encouragement = 'Excellent travail !';
    } else if (percentage >= 70) {
      encouragement = 'Très bien ! Continue comme ça !';
    } else if (percentage >= 50) {
      encouragement = 'Pas mal ! Tu peux faire mieux !';
    } else {
      encouragement = 'Ne te décourage pas, relis la leçon !';
    }

    const encouragementText = this.add
      .text(width / 2, height / 2 + 80, encouragement, {
        fontSize: '18px',
        color: '#64748b',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'italic',
        stroke: '#ffffff',
        strokeThickness: 1,
      })
      .setOrigin(0.5)
      .setAlpha(0);

    // Animation d'entrée du badge et encouragement
    this.tweens.add({
      targets: [badgeText, encouragementText],
      alpha: 1,
      duration: 800,
      delay: 1000,
      ease: 'Back.easeOut'
    });

    // Animation du badge avec effet de pulsation
    this.tweens.add({
      targets: badgeText,
      scaleX: 1.3,
      scaleY: 1.3,
      yoyo: true,
      duration: 600,
      ease: 'Back.easeOut',
      repeat: 2,
      delay: 1500
    });

    // Effet de confettis pour la victoire
    if (percentage >= 70) {
      for (let i = 0; i < 30; i++) {
        const confetti = this.add.circle(
          width / 2 + (Math.random() - 0.5) * 600,
          height / 2 + (Math.random() - 0.5) * 300,
          Math.random() * 8 + 4,
          Math.random() * 0xffffff
        );
        
        this.tweens.add({
          targets: confetti,
          y: confetti.y + Math.random() * 300 + 200,
          alpha: 0,
          duration: 3000,
          ease: 'Power2',
          delay: Math.random() * 1000
        });
      }
    }

    // Émettre l'événement de fin
    this.time.delayedCall(2000, () => {
      console.log('🎉 Émission événement lesson:completed avec badge:', badge);
      this.events.emit('lesson:completed', { badge });
    });
  }
}
