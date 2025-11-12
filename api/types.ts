// api/types.ts

export interface Badge {
  id: string;
  name: string;
  earnedAt: string;
}

export interface CompletedLesson {
  id: string;
  completedAt: string;
  score: number | null;
}

export interface Achievement {
  id: string;
  name: string;
  progress: number;
  completed: boolean;
  completedAt: string | null;
}
