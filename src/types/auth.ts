// Types pour l'authentification et la progression utilisateur

export interface User {
  id: number;
  email: string;
  username: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface UserProgress {
  userId: number;
  xp: number;
  level: number;
  coins: number;
  streakDays: number;
  lastActivityDate?: string;
  totalLessonsCompleted: number;
  totalQuizzesCompleted: number;
  totalGamesPlayed: number;
  updatedAt: string;
}

export interface UserBadge {
  id: number;
  userId: number;
  badgeId: string;
  badgeName: string;
  earnedAt: string;
}

export interface CompletedLesson {
  id: number;
  userId: number;
  lessonId: string;
  completedAt: string;
  score?: number;
}

export interface CompletedQuiz {
  id: number;
  userId: number;
  quizId: string;
  score: number;
  maxScore: number;
  completedAt: string;
}

export interface UserAchievement {
  id: number;
  userId: number;
  achievementId: string;
  achievementName: string;
  progress: number;
  completed: boolean;
  completedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
}

export interface ProgressResponse {
  success: boolean;
  message?: string;
  progress?: UserProgress;
  badges?: UserBadge[];
  completedLessons?: CompletedLesson[];
  achievements?: UserAchievement[];
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SaveProgressRequest {
  xp?: number;
  level?: number;
  coins?: number;
  streakDays?: number;
  completedLesson?: string;
  completedQuiz?: {
    quizId: string;
    score: number;
    maxScore: number;
  };
  newBadge?: {
    badgeId: string;
    badgeName: string;
  };
  achievement?: {
    achievementId: string;
    achievementName: string;
    progress: number;
    completed: boolean;
  };
}
