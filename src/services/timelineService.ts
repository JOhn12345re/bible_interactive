// Service pour gérer la chronologie biblique
// Timeline simplifié avec seulement les histoires essentielles ayant des leçons détaillées

export interface Story {
  id: string;
  title: string;
  description: string;
  book: string;
  available: boolean;
}

export interface Period {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  biblical_time: string;
  stories: Story[];
}

export interface TimelineData {
  timeline: {
    title: string;
    description: string;
    periods: Period[];
  };
  educational_goals: string[];
}

const TIMELINE_DATA: Period[] = [
  {
    id: 'creation',
    title: 'Création',
    icon: '🌟',
    color: '#10b981',
    description: 'Les commencements de toutes choses',
    biblical_time: 'Genèse 1-11',
    stories: [
      {
        id: 'creation_01',
        title: 'La Création du monde',
        description:
          'Au commencement, Dieu créa les cieux et la terre en six jours.',
        book: 'Genèse 1:1-2:3',
        available: true,
      },
      {
        id: 'adam_eve_01',
        title: 'Adam et Ève',
        description:
          "L'Éternel Dieu forma l'homme de la poussière de la terre.",
        book: 'Genèse 2:4-3:24',
        available: true,
      },
      {
        id: 'cain_abel_01',
        title: 'Caïn et Abel',
        description:
          "Abel fut berger, et Caïn fut laboureur. Le premier meurtre de l'humanité.",
        book: 'Genèse 4:1-16',
        available: true,
      },
      {
        id: 'noe_01',
        title: 'Noé et le Déluge',
        description:
          "L'Éternel dit à Noé: Entre dans l'arche, toi et toute ta maison.",
        book: 'Genèse 6-9',
        available: true,
      },
      {
        id: 'babel_01',
        title: 'La Tour de Babel',
        description:
          'Ils dirent: Allons! bâtissons-nous une ville et une tour dont le sommet touche au ciel. Dieu confondit leur langage.',
        book: 'Genèse 11:1-9',
        available: true,
      },
    ],
  },
  {
    id: 'patriarches',
    title: 'Patriarches',
    icon: '👑',
    color: '#f59e0b',
    description: 'Les pères du peuple élu',
    biblical_time: 'Genèse 12-50',
    stories: [
      {
        id: 'abraham_01',
        title: "L'Appel d'Abraham",
        description:
          "L'Éternel dit à Abram: Va-t-en de ton pays, de ta patrie, et de la maison de ton père.",
        book: 'Genèse 12:1-9',
        available: true,
      },
      {
        id: 'isaac_sacrifice_01',
        title: "Le Sacrifice d'Isaac",
        description:
          "Dieu dit: Prends ton fils, ton unique, celui que tu aimes, Isaac, et va-t'en au pays de Morija.",
        book: 'Genèse 22:1-19',
        available: true,
      },
      {
        id: 'isaac_mariage_01',
        title: 'Isaac et Rebecca — Le mariage et la bénédiction',
        description: "L'histoire d'Isaac et Rebecca et de la fidélité de Dieu",
        book: 'Genèse 24-26',
        available: true,
      },
      {
        id: 'jacob_esau_01',
        title: 'Jacob et Ésaü — Les jumeaux et la bénédiction',
        description:
          'L\'histoire des jumeaux Jacob et Ésaü et de la réconciliation',
        book: 'Genèse 25-33',
        available: true,
      },
      {
        id: 'jacob_songe_01',
        title: 'Le Songe de Jacob',
        description:
          'Il eut un songe. Et voici, une échelle était appuyée sur la terre, et son sommet touchait au ciel.',
        book: 'Genèse 28:10-22',
        available: true,
      },
      {
        id: 'joseph_01',
        title: 'Joseph en Égypte',
        description:
          "Les frères de Joseph le vendirent aux Ismaélites, qui l'emmenèrent en Égypte.",
        book: 'Genèse 37-50',
        available: true,
      },
    ],
  },
  {
    id: 'delivrance',
    title: 'Délivrance',
    icon: '⚡',
    color: '#ef4444',
    description: "La sortie d'Égypte",
    biblical_time: 'Exode-Deutéronome',
    stories: [
      {
        id: 'moise_buisson_01',
        title: 'Moïse et le Buisson Ardent',
        description:
          "L'ange de l'Éternel lui apparut dans une flamme de feu, au milieu d'un buisson.",
        book: 'Exode 3:1-15',
        available: true,
      },
      {
        id: 'mer_rouge_01',
        title: "L'Exode d'Égypte",
        description:
          "L'Éternel combattit pour les Israélites contre les Égyptiens.",
        book: 'Exode 12-14',
        available: true,
      },
      {
        id: 'commandements_01',
        title: 'Les Dix Commandements',
        description: 'Dieu prononça toutes ces paroles sur le mont Sinaï.',
        book: 'Exode 20:1-17',
        available: true,
      },
    ],
  },
  {
    id: 'alliance',
    title: 'Alliance',
    icon: '📜',
    color: '#8b5cf6',
    description: "L'établissement de l'alliance",
    biblical_time: 'Lévitique-Deutéronome',
    stories: [
      {
        id: 'tabernacle_01',
        title: 'Le Tabernacle',
        description:
          'Ils me feront un sanctuaire, et j\'habiterai au milieu d\'eux.',
        book: 'Exode 25-40',
        available: true,
      },
      {
        id: 'terre_promise_01',
        title: 'La Terre Promise - Vision de Moïse',
        description:
          'Moïse contemple la terre promise depuis le mont Nebo.',
        book: 'Deutéronome 34',
        available: true,
      },
    ],
  },
  {
    id: 'conquete',
    title: 'Conquête',
    icon: '⚔️',
    color: '#dc2626',
    description: 'La conquête de Canaan',
    biblical_time: 'Josué',
    stories: [
      {
        id: 'josue_01',
        title: 'La Prise de Jéricho',
        description:
          "Les murailles s'écroulèrent, et le peuple monta dans la ville.",
        book: 'Josué 6',
        available: true,
      },
    ],
  },
  {
    id: 'juges',
    title: 'Juges',
    icon: '⚖️',
    color: '#059669',
    description: "L'époque des juges",
    biblical_time: 'Juges-Ruth',
    stories: [
      {
        id: 'samson_01',
        title: 'Samson et Dalila',
        description:
          "Samson dit à Dalila: Si on me rasait, ma force m'abandonnerait.",
        book: 'Juges 16',
        available: true,
      },
      {
        id: 'ruth_naomi',
        title: 'Ruth et Naomi',
        description:
          'Ruth dit: Ton peuple sera mon peuple, et ton Dieu sera mon Dieu.',
        book: 'Ruth 1-4',
        available: false,
      },
    ],
  },
  {
    id: 'royaume',
    title: 'Royaume',
    icon: '👑',
    color: '#7c3aed',
    description: "L'établissement de la royauté",
    biblical_time: '1 Samuel - 1 Rois',
    stories: [
      {
        id: 'hannah_prayer',
        title: "La Prière d'Anne",
        description:
          "Anne priait dans son cœur, et l'Éternel exauça sa prière en lui donnant Samuel.",
        book: '1 Samuel 1-2',
        available: false,
      },
      {
        id: 'samuel_call',
        title: "L'Appel de Samuel",
        description:
          "L'Éternel appela Samuel, et Samuel répondit: Parle, ton serviteur écoute.",
        book: '1 Samuel 3',
        available: false,
      },
      {
        id: 'david_01',
        title: 'David et Goliath',
        description:
          "David dit au Philistin: Tu marches contre moi avec l'épée, mais moi, je marche contre toi au nom de l'Éternel.",
        book: '1 Samuel 17',
        available: true,
      },
      {
        id: 'salomon_01',
        title: 'La Sagesse de Salomon',
        description:
          "Dieu dit à Salomon: Puisque tu demandes l'intelligence, je te la donne.",
        book: '1 Rois 3:5-15',
        available: true,
      },
    ],
  },
];

export class TimelineService {
  static getTimeline(): Period[] {
    return TIMELINE_DATA;
  }

  static getTimelineData(): TimelineData {
    return {
      timeline: {
        title: 'Chronologie Biblique Interactive',
        description:
          'Découvrez les grandes histoires de la Bible à travers une timeline interactive',
        periods: TIMELINE_DATA,
      },
      educational_goals: [
        "Comprendre l'ordre chronologique des événements bibliques",
        "Découvrir les personnages clés de l'histoire sainte",
        'Mémoriser les versets fondamentaux',
        "Développer une vision d'ensemble de la Bible",
      ],
    };
  }

  static getPeriod(periodId: string): Period | undefined {
    return TIMELINE_DATA.find((period) => period.id === periodId);
  }

  static getStory(storyId: string): Story | undefined {
    for (const period of TIMELINE_DATA) {
      const story = period.stories.find((s) => s.id === storyId);
      if (story) return story;
    }
    return undefined;
  }

  static getAvailableStories(): Story[] {
    const allStories: Story[] = [];
    for (const period of TIMELINE_DATA) {
      allStories.push(...period.stories.filter((story) => story.available));
    }
    return allStories;
  }

  static getStoriesForPeriod(periodId: string): Story[] {
    const period = this.getPeriod(periodId);
    return period ? period.stories.filter((story) => story.available) : [];
  }

  static getTotalStoryCount(): number {
    return TIMELINE_DATA.reduce(
      (total, period) => total + period.stories.length,
      0
    );
  }

  static getAvailableStoryCount(): number {
    return TIMELINE_DATA.reduce(
      (total, period) =>
        total + period.stories.filter((story) => story.available).length,
      0
    );
  }
}

export default TimelineService;
