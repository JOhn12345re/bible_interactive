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

    // Réinitialiser les variables
    this.currentQuestion = 0;
    this.score = 0;
    this.gameComplete = false;
    console.log('🎮 Création du quiz - Questions disponibles:', this.questions.length);
    console.log('🎮 Création du quiz - currentQuestion initialisé à:', this.currentQuestion);
    console.log('🎮 Création du quiz - lessonData:', this.lessonData?.id);

    // Arrière-plan
    this.add.rectangle(width / 2, height / 2, width, height, 0xf0f8ff);

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

    this.add
      .text(width / 2, 50, quizTitle, {
        fontSize: '32px',
        color: '#2563eb',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Score
    this.scoreText = this.add
      .text(width - 50, 50, `Score: ${this.score}/${this.questions.length}`, {
        fontSize: '20px',
        color: '#059669',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
      })
      .setOrigin(1, 0);

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

    // Nettoyer les anciens éléments
    if (this.questionText) this.questionText.destroy();
    this.answerButtons.forEach(btn => btn.destroy());
    this.answerButtons = [];

    // Afficher la question
    this.questionText = this.add
      .text(width / 2, 150, `Question ${this.currentQuestion + 1}: ${question.q}`, {
        fontSize: '24px',
        color: '#1f2937',
        fontFamily: 'Arial, sans-serif',
        wordWrap: { width: width - 100 },
        align: 'center',
      })
      .setOrigin(0.5);

    // Créer les boutons de réponse
    question.choices.forEach((choice: string, index: number) => {
      const y = 280 + index * 80;
      const container = this.add.container(width / 2, y);

      // Bouton background
      const bg = this.add
        .rectangle(0, 0, 500, 60, 0xffffff)
        .setStrokeStyle(3, 0x6b7280)
        .setInteractive({ useHandCursor: true });

      // Texte de la réponse
      const text = this.add
        .text(0, 0, choice, {
          fontSize: '18px',
          color: '#374151',
          fontFamily: 'Arial, sans-serif',
        })
        .setOrigin(0.5);

      container.add([bg, text]);
      container.setSize(500, 60);

      // Animation hover
      bg.on('pointerover', () => {
        bg.setFillStyle(0xe5e7eb);
        this.tweens.add({
          targets: container,
          scaleX: 1.05,
          scaleY: 1.05,
          duration: 100,
        });
      });

      bg.on('pointerout', () => {
        bg.setFillStyle(0xffffff);
        this.tweens.add({
          targets: container,
          scaleX: 1,
          scaleY: 1,
          duration: 100,
        });
      });

      // Clic sur la réponse
      bg.on('pointerdown', () => {
        this.selectAnswer(index, question.answer, bg, text);
      });

      this.answerButtons.push(container);
    });

    // Redémarrer le timer
    this.timeLeft = 15;
    this.startTimer();
  }

  private selectAnswer(selectedIndex: number, correctIndex: number, bg: Phaser.GameObjects.Rectangle, text: Phaser.GameObjects.Text) {
    if (this.gameComplete) return;

    console.log('🎯 Réponse sélectionnée:', selectedIndex, 'Correcte:', correctIndex);

    // Arrêter le timer
    if (this.timerEvent) this.timerEvent.remove();

    const isCorrect = selectedIndex === correctIndex;
    console.log('✅ Réponse correcte:', isCorrect);

    // Feedback visuel
    if (isCorrect) {
      bg.setFillStyle(0x10b981);
      text.setColor('#ffffff');
      this.score++;
      
      // Effet de particules
      this.createParticles(bg.x, bg.y);
    } else {
      bg.setFillStyle(0xef4444);
      text.setColor('#ffffff');
      
      // Montrer la bonne réponse
      const correctButton = this.answerButtons[correctIndex];
      const correctBg = correctButton.list[0] as Phaser.GameObjects.Rectangle;
      const correctText = correctButton.list[1] as Phaser.GameObjects.Text;
      correctBg.setFillStyle(0x10b981);
      correctText.setColor('#ffffff');
    }

    // Mettre à jour le score
    this.scoreText.setText(`Score: ${this.score}/${this.questions.length}`);
    console.log('📊 Score actuel:', this.score, '/', this.questions.length);

    // Désactiver tous les boutons
    this.answerButtons.forEach(btn => {
      const btnBg = btn.list[0] as Phaser.GameObjects.Rectangle;
      btnBg.removeInteractive();
    });

    // Passer à la question suivante après un délai
    this.time.delayedCall(2000, () => {
      this.currentQuestion++;
      console.log('➡️ Question suivante:', this.currentQuestion, '/', this.questions.length);
      this.showQuestion();
    });
  }

  private createParticles(x: number, y: number) {
    // Étoiles de victoire
    for (let i = 0; i < 8; i++) {
      const star = this.add.text(x, y, '⭐', {
        fontSize: '20px',
      }).setOrigin(0.5);

      const angle = (i / 8) * Math.PI * 2;
      const distance = 50;

      this.tweens.add({
        targets: star,
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        alpha: 0,
        scale: 1.5,
        duration: 800,
        ease: 'Power2',
        onComplete: () => star.destroy(),
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
          this.selectAnswer(-1, this.questions[this.currentQuestion].answer, 
            new Phaser.GameObjects.Rectangle(this, 0, 0, 0, 0, 0xef4444),
            new Phaser.GameObjects.Text(this, 0, 0, '', {}));
        }
      },
    });
  }

  private updateTimer() {
    this.timer.clear();
    
    const { width } = this.scale;
    const barWidth = 300;
    const barHeight = 20;
    const x = (width - barWidth) / 2;
    const y = 200;
    
    // Barre de fond
    this.timer.fillStyle(0xe5e7eb);
    this.timer.fillRect(x, y, barWidth, barHeight);
    
    // Barre de progression
    const progress = this.timeLeft / 15;
    const color = progress > 0.5 ? 0x10b981 : progress > 0.25 ? 0xf59e0b : 0xef4444;
    
    this.timer.fillStyle(color);
    this.timer.fillRect(x, y, barWidth * progress, barHeight);
    
    // Bordure
    this.timer.lineStyle(2, 0x6b7280);
    this.timer.strokeRect(x, y, barWidth, barHeight);
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

    // Écran de résultats
    this.add
      .text(width / 2, height / 2 - 120, `🎉 Quiz terminé !`, {
        fontSize: '36px',
        color: '#2563eb',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Score avec couleur selon la performance
    const scoreColor = percentage >= 70 ? '#059669' : percentage >= 50 ? '#d97706' : '#ef4444';
    this.add
      .text(width / 2, height / 2 - 60, `Score: ${this.score}/${this.questions.length} (${percentage}%)`, {
        fontSize: '24px',
        color: scoreColor,
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 - 20, message, {
        fontSize: '20px',
        color: '#6b7280',
        fontFamily: 'Arial, sans-serif',
        wordWrap: { width: width - 100 },
        align: 'center',
      })
      .setOrigin(0.5);

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
        fontSize: '28px',
        color: '#d97706',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

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

    this.add
      .text(width / 2, height / 2 + 80, encouragement, {
        fontSize: '16px',
        color: '#9ca3af',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'italic',
      })
      .setOrigin(0.5);

    // Animation du badge
    this.tweens.add({
      targets: badgeText,
      scaleX: 1.2,
      scaleY: 1.2,
      yoyo: true,
      duration: 500,
      ease: 'Back.easeOut',
    });

    // Émettre l'événement de fin
    this.time.delayedCall(2000, () => {
      console.log('🎉 Émission événement lesson:completed avec badge:', badge);
      this.events.emit('lesson:completed', { badge });
    });
  }
}
