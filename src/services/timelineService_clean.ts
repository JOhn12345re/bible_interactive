import type { TimelineData as BaseTimelineData, Period as BasePeriod, Story as BaseStory } from './timelineService';

type Story = BaseStory;
type Period = BasePeriod;
type TimelineData = BaseTimelineData & {
  progress?: {
    unlocked_periods: string[];
    completed_stories: string[];
    badges_earned: string[];
    current_level: number;
    total_score: number;
  };
};

// Données intégrées de la timeline biblique - VERSION SIMPLIFIÉE
const TIMELINE_DATA: TimelineData = {
  timeline: {
    title: 'Frise Chronologique Biblique',
    description: "Le grand récit de Dieu avec l'humanité",
    periods: [
      {
        id: 'creation',
        title: 'Création',
        icon: '🌍',
        color: '#4ade80',
        description: 'Les commencements du monde',
        biblical_time: 'Genèse 1-11',
        stories: [
          {
            id: 'creation_01',
            title: 'La Création du monde',
            description:
              "Au commencement, Dieu créa les cieux et la terre. En six jours, il forme tout l'univers avec sagesse et puissance.",
            book: 'Genèse 1:1-31',
            available: true,
          },
          {
            id: 'adam_eve_01',
            title: 'Adam et Ève — La chute',
            description:
              'Le serpent était le plus rusé de tous les animaux des champs. La tentation et la désobéissance.',
            book: 'Genèse 3:1-7',
            available: true,
          },
          {
            id: 'cain_abel',
            title: 'Caïn et Abel',
            description:
              "Caïn se jeta sur son frère Abel, et le tua. Premier meurtre de l'histoire humaine.",
            book: 'Genèse 4:6-8',
            available: true,
          },
          {
            id: 'noe_01',
            title: 'Noé et le Déluge',
            description:
              "L'Éternel vit que la méchanceté des hommes était grande sur la terre. Il ordonna à Noé de construire une arche.",
            book: 'Genèse 6:5-8:22',
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
            id: 'abraham_call',
            title: "L'appel d'Abraham",
            description:
              "L'Éternel dit à Abram: Va-t'en de ton pays, de ta patrie, et de la maison de ton père, dans le pays que je te montrerai.",
            book: 'Genèse 12:1-3',
            available: true,
          },
          {
            id: 'isaac_sacrifice_01',
            title: "Le sacrifice d'Isaac",
            description:
              "Dieu dit: Prends ton fils, ton unique, celui que tu aimes, Isaac; va-t'en au pays de Morija, et là offre-le en holocauste.",
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
            title: 'Jacob et Ésaü — Les jumeaux',
            description:
              'L\'histoire des jumeaux Jacob et Ésaü et de leur réconciliation.',
            book: 'Genèse 25-33',
            available: true,
          },
          {
            id: 'jacob_songe_01',
            title: "L'Échelle de Jacob",
            description:
              'Jacob eut un songe. Et voici, une échelle était appuyée sur la terre, et son sommet touchait au ciel.',
            book: 'Genèse 28:10-22',
            available: true,
          },
          {
            id: 'joseph_01',
            title: 'Joseph vendu par ses frères',
            description:
              'Joseph eut un songe, et il le raconta à ses frères, qui le haïrent encore davantage.',
            book: 'Genèse 37:1-36',
            available: true,
          },
        ],
      },
      {
        id: 'delivrance',
        title: 'Délivrance',
        icon: '🦅',
        color: '#ef4444',
        description: "La sortie d'Égypte",
        biblical_time: 'Exode 1-18',
        stories: [
          {
            id: 'moise_buisson_01',
            title: 'Moïse et le Buisson Ardent',
            description:
              "L'ange de l'Éternel lui apparut dans une flamme de feu, au milieu d'un buisson. Le buisson était tout en feu, et ne se consumait point.",
            book: 'Exode 3:1-15',
            available: true,
          },
          {
            id: 'plaies_egypte_01',
            title: "Les Dix Plaies d'Égypte",
            description:
              "L'Éternel dit à Moïse: Pharaon ne vous écoutera point, afin que mes miracles se multiplient dans le pays d'Égypte.",
            book: 'Exode 7:1-12:36',
            available: true,
          },
          {
            id: 'mer_rouge_01',
            title: 'La Traversée de la Mer Rouge',
            description:
              "Moïse étendit sa main sur la mer. Et l'Éternel refoula la mer par un vent d'orient, qui souffla avec impétuosité toute la nuit.",
            book: 'Exode 14:1-31',
            available: true,
          },
        ],
      },
      {
        id: 'alliance',
        title: 'Alliance',
        icon: '⚖️',
        color: '#8b5cf6',
        description: "La Loi et l'Alliance au Sinaï",
        biblical_time: 'Exode 19 - Deutéronome 34',
        stories: [
          {
            id: 'commandements_01',
            title: 'Les Dix Commandements',
            description:
              "Dieu prononça toutes ces paroles, en disant: Je suis l'Éternel, ton Dieu, qui t'ai fait sortir du pays d'Égypte.",
            book: 'Exode 20:1-17',
            available: true,
          },
          {
            id: 'moise_01',
            title: 'Mort de Moïse',
            description:
              "Moïse, serviteur de l'Éternel, mourut là, dans le pays de Moab, selon l'ordre de l'Éternel.",
            book: 'Deutéronome 34:1-12',
            available: true,
          },
        ],
      },
      {
        id: 'conquete',
        title: 'Conquête',
        icon: '⚔️',
        color: '#f97316',
        description: 'La conquête de la Terre Promise',
        biblical_time: 'Josué',
        stories: [
          {
            id: 'josue_01',
            title: 'Josué traverse le Jourdain',
            description:
              "L'Éternel dit à Josué: Aujourd'hui, je commencerai à t'élever aux yeux de tout Israël, afin qu'ils sachent que je serai avec toi comme j'ai été avec Moïse.",
            book: 'Josué 3:1-17',
            available: true,
          },
        ],
      },
      {
        id: 'juges',
        title: 'Juges',
        icon: '🏛️',
        color: '#06b6d4',
        description: "L'époque des Juges d'Israël",
        biblical_time: 'Juges - Ruth',
        stories: [
          {
            id: 'gedeon_01',
            title: 'Gédéon et la Toison',
            description:
              "Gédéon dit à Dieu: Si tu veux délivrer Israël par ma main, comme tu l'as dit, voici, je vais mettre une toison de laine.",
            book: 'Juges 6:36-40',
            available: true,
          },
          {
            id: 'samson_01',
            title: 'Samson et Dalila',
            description:
              'Il aima une femme dans la vallée de Sorek. Elle se nommait Dalila. Les princes des Philistins montèrent vers elle.',
            book: 'Juges 16:4-31',
            available: true,
          },
        ],
      },
      {
        id: 'royaume',
        title: 'Royaume',
        icon: '👑',
        color: '#dc2626',
        description: "L'établissement du royaume d'Israël",
        biblical_time: '1 Samuel - 1 Rois 11',
        stories: [
          {
            id: 'hannah_prayer',
            title: "Prière d'Anne",
            description:
              "Il y avait un homme d'Elqana. Anne était stérile, elle n'avait point d'enfants. Anne pria, et dit: Mon cœur se réjouit en l'Éternel!",
            book: '1 Samuel 1:1-2:11',
            available: true,
          },
          {
            id: 'david_goliath',
            title: 'David et Goliath',
            description:
              "Un homme sortit du camp des Philistins et s'avança entre les deux armées. Il se nommait Goliath, de Gath; sa hauteur était de six coudées et un empan.",
            book: '1 Samuel 17:1-58',
            available: true,
          },
          {
            id: 'david_01',
            title: "David roi d'Israël",
            description:
              "Toutes les tribus d'Israël vinrent auprès de David, à Hébron, et dirent: Voici, nous sommes tes os et ta chair. Ils oignirent David pour roi sur Israël.",
            book: '2 Samuel 5:1-25',
            available: true,
          },
          {
            id: 'salomon_01',
            title: 'Sagesse de Salomon',
            description:
              "Salomon aima l'Éternel. A Gabaon, l'Éternel apparut en songe à Salomon pendant la nuit, et Dieu lui dit: Demande ce que tu veux que je te donne.",
            book: '1 Rois 3:1-28',
            available: true,
          },
        ],
      },
    ],
  },
  educational_goals: [
    'Comprendre la chronologie des événements bibliques majeurs',
    "Découvrir les personnages clés de l'Ancien Testament",
    'Mémoriser les versets importants de chaque période',
    'Développer une compréhension progressive du plan de Dieu',
  ],
  progress: {
    unlocked_periods: ['creation', 'patriarches', 'delivrance', 'alliance'],
    completed_stories: [],
    badges_earned: [],
    current_level: 1,
    total_score: 0,
  },
};

export class TimelineService {
  static async getTimelineData(): Promise<TimelineData> {
    return Promise.resolve(TIMELINE_DATA);
  }

  static async getPeriod(periodId: string): Promise<Period | null> {
    const data = await this.getTimelineData();
    return data.timeline.periods.find((p: Period) => p.id === periodId) || null;
  }

  static async getStory(storyId: string): Promise<Story | null> {
    const data = await this.getTimelineData();
    for (const period of data.timeline.periods as Period[]) {
      const story = period.stories.find((s: Story) => s.id === storyId);
      if (story) return story;
    }
    return null;
  }
}

export default TimelineService;
