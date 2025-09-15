export interface GameEvents {
  'lesson:completed': { badge: string };
}

export interface LessonData {
  id: string;
  title: string;
  path: string;
  // Nom du livre si présent dans le contenu (ex: "Genèse", "Jonas")
  book?: string;
  reading: string[];
  key_verse: string;
  vocab: Array<{ word: string; hint: string }>;
  quiz: Array<{ q: string; choices: string[]; answer: number }>;
  mini_games: string[];
  assets: string[];
}

export interface CardContainer extends Phaser.GameObjects.Container {
  slotIndex?: number;
}
