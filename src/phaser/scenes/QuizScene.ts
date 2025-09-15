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
  }

  create() {
    const { width, height } = this.scale;

    // Arrière-plan
    this.add.rectangle(width / 2, height / 2, width, height, 0xf0f8ff);

    // Titre
    this.add
      .text(width / 2, 50, 'Quiz Biblique', {
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

    // Afficher la première question
    this.showQuestion();
  }

  private showQuestion() {
    if (this.currentQuestion >= this.questions.length) {
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

    // Arrêter le timer
    if (this.timerEvent) this.timerEvent.remove();

    const isCorrect = selectedIndex === correctIndex;

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

    // Désactiver tous les boutons
    this.answerButtons.forEach(btn => {
      const btnBg = btn.list[0] as Phaser.GameObjects.Rectangle;
      btnBg.removeInteractive();
    });

    // Passer à la question suivante après un délai
    this.time.delayedCall(2000, () => {
      this.currentQuestion++;
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

    // Nettoyer l'écran
    if (this.questionText) this.questionText.destroy();
    this.answerButtons.forEach(btn => btn.destroy());
    this.timer.clear();

    // Calcul des résultats
    const percentage = Math.round((this.score / this.questions.length) * 100);
    let badge = 'Apprenti biblique';
    let message = 'Continue tes efforts !';

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

    // Écran de résultats
    this.add
      .text(width / 2, height / 2 - 100, `Quiz terminé !`, {
        fontSize: '36px',
        color: '#2563eb',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 - 40, `Score: ${this.score}/${this.questions.length} (${percentage}%)`, {
        fontSize: '24px',
        color: '#059669',
        fontFamily: 'Arial, sans-serif',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 + 20, message, {
        fontSize: '20px',
        color: '#6b7280',
        fontFamily: 'Arial, sans-serif',
      })
      .setOrigin(0.5);

    // Badge obtenu
    const badgeText = this.add
      .text(width / 2, height / 2 + 80, `🏆 ${badge}`, {
        fontSize: '28px',
        color: '#d97706',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
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
      this.events.emit('lesson:completed', { badge });
    });
  }
}
