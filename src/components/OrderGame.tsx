import React, { useState, useEffect } from 'react';
import { useSettings } from '../state/settingsStore';

interface OrderGameProps {
  storySteps: string[];
  onComplete: (score: number) => void;
  title: string;
}

interface OrderItem {
  id: number;
  text: string;
  emoji: string;
  originalIndex: number;
}

// Fonction pour extraire l'emoji d'un texte ou en générer un par défaut
const getEmojiForStep = (step: string, index: number): string => {
  const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
  const match = step.match(emojiRegex);
  if (match && match[0]) return match[0];
  
  // Emojis par défaut selon le type d'événement
  const defaultEmojis = ['📖', '🏛️', '⚡', '🙏', '👑', '🗡️', '🕊️', '✨', '🌟', '📜'];
  return defaultEmojis[index % defaultEmojis.length];
};

export default function OrderGame({ storySteps, onComplete, title }: OrderGameProps) {
  const { contrastHigh } = useSettings();
  const [orderingItems, setOrderingItems] = useState<OrderItem[]>([]);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  console.log('OrderGame: Reçu storySteps:', storySteps);
  console.log('OrderGame: Nombre d\'étapes:', storySteps?.length);

  // Initialiser les items avec mélange
  useEffect(() => {
    console.log('OrderGame useEffect: Initialisation avec storySteps:', storySteps);
    if (!storySteps || storySteps.length === 0) {
      console.log('OrderGame: Aucune story_steps disponible !');
      setOrderingItems([]);
      return;
    }

    const items: OrderItem[] = storySteps.map((step, index) => ({
      id: index,
      text: step.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim(),
      emoji: getEmojiForStep(step, index),
      originalIndex: index
    }));

    console.log('OrderGame: Items créés:', items);

    // Mélanger les items
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    console.log('OrderGame: Items mélangés:', shuffled);
    setOrderingItems(shuffled);
  }, [storySteps]);

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...orderingItems];
    const item = newItems.splice(fromIndex, 1)[0];
    newItems.splice(toIndex, 0, item);
    setOrderingItems(newItems);
  };

  const checkOrder = () => {
    const correctOrder = orderingItems.every((item, index) => item.originalIndex === index);
    const calculatedScore = correctOrder ? 100 : Math.max(0, 100 - orderingItems.reduce((errors, item, index) => {
      return errors + (item.originalIndex !== index ? 10 : 0);
    }, 0));
    
    setScore(calculatedScore);
    setCompleted(true);
    
    if (calculatedScore >= 80) {
      setTimeout(() => onComplete(calculatedScore), 2000);
    }
  };

  const resetGame = () => {
    const items: OrderItem[] = storySteps.map((step, index) => ({
      id: index,
      text: step.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim(),
      emoji: getEmojiForStep(step, index),
      originalIndex: index
    }));
    
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setOrderingItems(shuffled);
    setCompleted(false);
    setScore(0);
  };

  return (
    <div className={`rounded-2xl shadow-xl p-8 ${contrastHigh ? 'bg-contrast-bg text-contrast-text border-2 border-contrast-text' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
        📅 {title}
      </h2>
      
      <div className="grid gap-3 mb-8">
        {orderingItems.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-move transition-all ${
              contrastHigh 
                ? 'bg-contrast-bg border-contrast-text' 
                : 'bg-gradient-to-r from-orange-100 to-amber-100 border-orange-200 hover:from-orange-200 hover:to-amber-200'
            }`}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', index.toString())}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
              moveItem(fromIndex, index);
            }}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{item.emoji}</span>
              <span className={`font-medium ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                {item.text}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {index > 0 && (
                <button
                  onClick={() => moveItem(index, index - 1)}
                  className={`px-2 py-1 rounded text-sm transition-colors ${
                    contrastHigh 
                      ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  ↑
                </button>
              )}
              {index < orderingItems.length - 1 && (
                <button
                  onClick={() => moveItem(index, index + 1)}
                  className={`px-2 py-1 rounded text-sm transition-colors ${
                    contrastHigh 
                      ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  ↓
                </button>
              )}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                contrastHigh 
                  ? 'bg-contrast-text text-contrast-bg'
                  : 'bg-orange-500 text-white'
              }`}>
                {index + 1}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!completed ? (
        <div className="text-center">
          <button
            onClick={checkOrder}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
              contrastHigh 
                ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
                : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
            }`}
          >
            ✅ Vérifier l'ordre
          </button>
        </div>
      ) : (
        <div className="text-center">
          <div className={`text-2xl font-bold mb-4 ${
            score >= 80 
              ? (contrastHigh ? 'text-green-400' : 'text-green-600')
              : (contrastHigh ? 'text-orange-400' : 'text-orange-600')
          }`}>
            Score: {score}/100
          </div>
          {score >= 80 ? (
            <div className={`font-medium ${contrastHigh ? 'text-green-400' : 'text-green-600'}`}>
              🎉 Parfait ! Jeu terminé avec succès !
            </div>
          ) : (
            <button
              onClick={resetGame}
              className={`px-6 py-3 rounded-lg transition-colors ${
                contrastHigh 
                  ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              🔄 Réessayer
            </button>
          )}
        </div>
      )}
    </div>
  );
}