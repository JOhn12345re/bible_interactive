// Types pour l'API Bible

export interface BibleVerse {
  verset: string;
  texte: string;
}

export interface BibleStory {
  titre: string;
  reference: string;
  versets: BibleVerse[];
}

export interface BibleData {
  histoires: BibleStory[];
}

export interface TopicVerse {
  ref: string;
  texte: string;
}

export interface TopicsData {
  [key: string]: TopicVerse[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SearchResult {
  verset: string;
  texte: string;
  histoire?: string;
  reference?: string;
}

export interface VerseOfTheDay {
  verset: string;
  texte: string;
  reference: string;
  date: string;
  theme?: string;
}

export interface BookInfo {
  id: string;
  name: string;
  chapters: number;
  description: string;
}

export interface ChapterInfo {
  book: string;
  chapter: number;
  verses: BibleVerse[];
}

export interface TopicInfo {
  name: string;
  slug: string;
  verses: TopicVerse[];
  count: number;
}

// Types pour la validation
export interface ValidationError {
  field: string;
  message: string;
}

export interface RequestContext {
  ip: string;
  userAgent: string;
  timestamp: Date;
}

// Types pour les paramètres de requête
export interface SearchParams {
  q: string;
  limit?: number;
  offset?: number;
}

export interface VerseParams {
  bookId: string;
  chapter: number;
  verse?: number;
}

export interface ChapterParams {
  bookId: string;
  chapter: number;
}

// Types pour les réponses d'erreur
export interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: any;
}

// Types pour les statistiques
export interface ApiStats {
  totalStories: number;
  totalVerses: number;
  totalTopics: number;
  lastUpdated: string;
}
