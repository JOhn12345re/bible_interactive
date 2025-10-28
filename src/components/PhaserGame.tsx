import React, { useEffect, useRef, useState } from 'react';
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

export default function PhaserGame({
  onComplete,
  lessonData,
  gameType = 'order_events',
  width = 1280,
  height = 720,
}: Props) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [gameScale, setGameScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const gameRef = useRef<Phaser.Game | null>(null);
  const mountedRef = useRef(false);
  // Générer une clé unique pour chaque combinaison de leçon et de type de jeu
  const gameKey = `${lessonData?.id || 'noid'}-${gameType}`;

  // Détecter la taille d'écran
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Calculer la taille responsive
  const getResponsiveDimensions = () => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    if (isMobile) {
      return {
        width: Math.min(window.innerWidth - 32, 400), // Largeur mobile avec padding
        height: Math.min(window.innerHeight * 0.6, 600), // Hauteur mobile
        scale: isZoomed ? 1.5 : 1,
      };
    } else if (isTablet) {
      return {
        width: Math.min(window.innerWidth - 64, 800),
        height: Math.min(window.innerHeight * 0.7, 600),
        scale: isZoomed ? 1.3 : 1,
      };
    } else {
      return {
        width: Math.min(window.innerWidth - 128, width),
        height: Math.min(window.innerHeight * 0.8, height),
        scale: isZoomed ? 1.2 : 1,
      };
    }
  };

  const dimensions = getResponsiveDimensions();
  const actualWidth = dimensions.width;
  const actualHeight = dimensions.height;
  const scale = dimensions.scale;

  useEffect(() => {
    // Toujours détruire l'ancien jeu avant d'en créer un nouveau
    if (gameRef.current) {
      gameRef.current.destroy(true);
      gameRef.current = null;
    }
    mountedRef.current = false;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: actualWidth,
      height: actualHeight,
      parent: `phaser-root-${gameKey}`,
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
        width: actualWidth,
        height: actualHeight,
      },
      input: {
        mouse: {
          target: `phaser-root-${gameKey}`,
        },
        touch: {
          target: `phaser-root-${gameKey}`,
        },
      },
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;

    // Attendre que le jeu soit prêt
    const setupEventListeners = () => {
      console.log(
        '🎮 Configuration des événements pour:',
        gameType,
        'avec données:',
        lessonData?.id
      );

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
            console.log(
              "🔄 Configuration jeu d'ordre avec données:",
              lessonData
            );
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
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
      mountedRef.current = false;
    };
  }, [onComplete, lessonData, gameType, width, height, gameKey]);

  return (
    <div className="w-full h-full relative">
      {/* Contrôles de zoom pour mobile */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-lg shadow-lg text-sm font-medium transition-all"
          title={isZoomed ? 'Réduire' : 'Agrandir'}
        >
          {isZoomed ? '🔍-' : '🔍+'}
        </button>
      </div>

      <div
        id={`phaser-root-${gameKey}`}
        className="w-full h-full rounded-lg overflow-hidden"
        style={{
          minHeight: `${actualHeight}px`,
          maxWidth: `${actualWidth}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.3s ease-in-out',
        }}
      />

      {/* Instructions adaptées selon l'appareil */}
      <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 px-3 py-1 rounded-lg text-xs sm:text-sm text-gray-600">
        {isMobile ? (
          <span>
            📱 Glisse pour jouer • {isZoomed ? '🔍+' : '🔍-'} pour zoomer
          </span>
        ) : (
          <span>🎮 Utilise la souris pour glisser-déposer</span>
        )}
      </div>
    </div>
  );
}
