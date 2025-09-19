import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import OrderEventsScene from '../phaser/scenes/OrderEventsScene';
import QuizScene from '../phaser/scenes/QuizScene';

type Props = {
  onComplete?: (data: { badge: string }) => void;
  lessonData?: any;
  gameType?: 'order_events' | 'quiz';
  width?: number;
  height?: number;
};

export default function PhaserGame({ onComplete, lessonData, gameType = 'order_events', width = 1280, height = 720 }: Props) {
  const gameRef = useRef<Phaser.Game | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width,
      height,
      parent: 'phaser-root',
      backgroundColor: '#f7f7f7',
      scene: gameType === 'quiz' ? [QuizScene] : [OrderEventsScene],
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      input: {
        mouse: {
          target: 'phaser-root',
        },
        touch: {
          target: 'phaser-root',
        },
      },
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;

    // Attendre que le jeu soit prêt
    const setupEventListeners = () => {
      console.log('🎮 Configuration des événements pour:', gameType, 'avec données:', lessonData?.id);
      
      if (gameType === 'quiz') {
        const scene = game.scene.getScene('QuizScene') as QuizScene;
        if (scene) {
          if (lessonData) {
            console.log('📝 Configuration quiz avec données:', lessonData);
            scene.setLessonData(lessonData);
          }
          scene.events.on('lesson:completed', (payload: { badge: string }) => {
            console.log('Quiz terminé:', payload);
            onComplete?.(payload);
          });
        }
      } else {
        const scene = game.scene.getScene('OrderEvents') as OrderEventsScene;
        if (scene) {
          if (lessonData) {
            console.log('🔄 Configuration jeu d\'ordre avec données:', lessonData);
            scene.setLessonData(lessonData);
          }
          scene.events.on('lesson:completed', (payload: { badge: string }) => {
            console.log('Leçon terminée:', payload);
            onComplete?.(payload);
          });
        }
      }
    };

    // Écouter l'événement de démarrage du jeu
    game.events.once('ready', setupEventListeners);

    // Cleanup function
    return () => {
      if (gameRef.current) {
        const scene = gameRef.current.scene.getScene('OrderEvents');
        if (scene) {
          scene.events.removeAllListeners();
        }
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
      mountedRef.current = false;
    };
  }, [onComplete, lessonData, gameType, width, height]);

  return (
    <div className="w-full h-full relative">
      <div 
        id="phaser-root" 
        className="w-full h-full rounded-lg overflow-hidden"
        style={{ minHeight: `${height}px`, maxWidth: `${width}px` }}
      />
      <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-lg text-sm text-gray-600">
        🎮 Utilise la souris pour glisser-déposer
      </div>
    </div>
  );
}
