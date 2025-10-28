// Service API Bible intégré
export interface BibleVerse {
  verset: string;
  texte: string;
}

export interface TopicInfo {
  name: string;
  slug: string;
  verses: BibleVerse[];
  count: number;
}

export interface VerseOfTheDay {
  verset: string;
  texte: string;
  reference: string;
  date: string;
  theme?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class BibleApiService {
  private baseUrl: string;
  private cache: Map<string, any> = new Map();

  constructor() {
    // Utiliser les données de fallback intégrées (mode offline)
    this.baseUrl = '';
    console.log(
      '📖 Service API Bible initialisé en mode offline avec données intégrées'
    );
  }

  // Méthode générique pour faire des requêtes
  private async request<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const cacheKey = endpoint;
      if (this.cache.has(cacheKey)) {
        console.log('📦 Cache hit pour:', endpoint);
        return this.cache.get(cacheKey);
      }

      // Utiliser les données de fallback intégrées
      let data: any = null;

      if (endpoint === '/health') {
        data = {
          success: true,
          data: {
            status: 'OK',
            timestamp: new Date().toISOString(),
            uptime: 3600,
          },
          message: 'API Bible en fonctionnement (mode offline)',
        };
      } else if (endpoint === '/api/topics') {
        data = {
          success: true,
          data: fallbackTopics,
        };
      } else if (endpoint.startsWith('/api/topics/')) {
        const slug = endpoint.split('/')[3];
        const topic = fallbackTopics.find((t) => t.slug === slug);
        if (topic) {
          data = {
            success: true,
            data: topic,
          };
        } else {
          data = {
            success: false,
            error: 'Thème non trouvé',
          };
        }
      } else if (endpoint === '/api/verse-of-the-day') {
        data = {
          success: true,
          data: fallbackVerseOfTheDay,
        };
      }

      if (data) {
        // Mettre en cache pendant 5 minutes
        this.cache.set(cacheKey, data);
        setTimeout(() => this.cache.delete(cacheKey), 5 * 60 * 1000);
        return data;
      }

      throw new Error(`Endpoint non supporté: ${endpoint}`);
    } catch (error) {
      console.error('❌ Erreur API Bible:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        message: "Impossible de se connecter à l'API Bible",
      };
    }
  }

  // Santé de l'API
  async getHealth(): Promise<
    ApiResponse<{ status: string; timestamp: string; uptime: number }>
  > {
    return this.request('/health');
  }

  // Liste des thèmes
  async getTopics(): Promise<ApiResponse<TopicInfo[]>> {
    return this.request('/api/topics');
  }

  // Thème spécifique
  async getTopic(slug: string): Promise<ApiResponse<TopicInfo>> {
    return this.request(`/api/topics/${slug}`);
  }

  // Verset du jour
  async getVerseOfTheDay(): Promise<ApiResponse<VerseOfTheDay>> {
    return this.request('/api/verse-of-the-day');
  }

  // Verset du jour par thème
  async getVerseOfTheDayByTheme(
    theme: string
  ): Promise<ApiResponse<VerseOfTheDay>> {
    return this.request(`/api/verse-of-the-day/${theme}`);
  }

  // Recherche dans les thèmes
  async searchTopics(query: string): Promise<ApiResponse<TopicInfo[]>> {
    return this.request(`/api/topics/search?q=${encodeURIComponent(query)}`);
  }

  // Vider le cache
  clearCache(): void {
    this.cache.clear();
    console.log('🗑️ Cache API Bible vidé');
  }

  // Vérifier si l'API est accessible
  async isApiAccessible(): Promise<boolean> {
    try {
      const health = await this.getHealth();
      return health.success;
    } catch {
      return false;
    }
  }
}

// Instance singleton
export const bibleApiService = new BibleApiService();

// Données de fallback si l'API n'est pas accessible
export const fallbackTopics: TopicInfo[] = [
  {
    name: 'Foi',
    slug: 'foi',
    verses: [
      {
        verset: 'Genèse 6:13',
        texte:
          "Dieu dit à Noé : La fin de toute chair est arrêtée devant moi ; car la terre est pleine de violence à cause d'eux ; voici, je vais les détruire avec la terre.",
      },
      {
        verset: 'Genèse 12:1',
        texte:
          "L'Éternel dit à Abram : Va-t'en de ton pays, de ta patrie et de la maison de ton père, vers le pays que je te montrerai.",
      },
      {
        verset: 'Hébreux 11:1',
        texte:
          "Or la foi est une ferme assurance des choses qu'on espère, une démonstration de celles qu'on ne voit pas.",
      },
    ],
    count: 3,
  },
  {
    name: 'Amour',
    slug: 'amour',
    verses: [
      {
        verset: 'Luc 2:11',
        texte:
          "Voici, je vous annonce une bonne nouvelle, qui sera pour tout le peuple, le salut qui vous est né aujourd'hui : c'est un Sauveur, qui est le Christ, le Seigneur.",
      },
      {
        verset: 'Genèse 45:7',
        texte:
          "Dieu m'a envoyé devant vous pour préserver la vie, afin de vous conserver un reste sur la terre et de vous sauver par un grand délivrance.",
      },
      {
        verset: 'Jean 3:16',
        texte:
          "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais ait la vie éternelle.",
      },
    ],
    count: 3,
  },
  {
    name: 'Joie',
    slug: 'joie',
    verses: [
      {
        verset: 'Luc 2:20',
        texte:
          "Les bergers s'en retournèrent, glorifiant et louant Dieu pour tout ce qu'ils avaient entendu et vu, comme cela leur avait été annoncé.",
      },
      {
        verset: 'Genèse 12:2',
        texte:
          'Je ferai de toi une grande nation, et je te bénirai ; je rendrai ton nom grand, et tu seras une source de bénédiction.',
      },
      {
        verset: 'Philippiens 4:4',
        texte:
          'Réjouissez-vous toujours dans le Seigneur ; je le répète, réjouissez-vous.',
      },
    ],
    count: 3,
  },
];

export const fallbackVerseOfTheDay: VerseOfTheDay = {
  verset: 'Jean 3:16',
  texte:
    "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais ait la vie éternelle.",
  reference: 'Jean 3:16',
  date: new Date().toISOString().split('T')[0],
  theme: 'Amour',
};
