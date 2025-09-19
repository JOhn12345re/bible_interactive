import topicsData from '../db/topics.json';

export interface TopicVerse {
  ref: string;
  texte: string;
}

export interface Topic {
  slug: string;
  name: string;
  description: string;
  verses: TopicVerse[];
}

class TopicsService {
  private topics: Topic[] = [];

  constructor() {
    this.initializeTopics();
  }

  private initializeTopics(): void {
    // Convertir les données JSON en format Topic
    this.topics = Object.entries(topicsData).map(([slug, verses]) => ({
      slug,
      name: this.getTopicName(slug),
      description: this.getTopicDescription(slug),
      verses: verses as TopicVerse[]
    }));
  }

  private getTopicName(slug: string): string {
    const names: Record<string, string> = {
      'peur': 'Surmonter la peur',
      'joie': 'La joie du Seigneur',
      'foi': 'La foi en Dieu',
      'amour': 'L\'amour de Dieu',
      'pardonner': 'Le pardon',
      'espérance': 'L\'espérance',
      'patience': 'La patience',
      'sagesse': 'La sagesse divine',
      'obéissance': 'L\'obéissance',
      'courage': 'Le courage',
      'gratitude': 'La gratitude',
      'paix': 'La paix de Dieu',
      'force': 'La force divine',
      'humilité': 'L\'humilité',
      'justice': 'La justice',
      'loyauté': 'La loyauté',
      'obéissance à Dieu': 'L\'obéissance à Dieu',
      'espérance éternelle': 'L\'espérance éternelle'
    };
    return names[slug] || slug;
  }

  private getTopicDescription(slug: string): string {
    const descriptions: Record<string, string> = {
      'peur': 'Versets pour surmonter la peur et trouver la paix',
      'joie': 'Découvrez la vraie joie qui vient de Dieu',
      'foi': 'Renforcez votre foi avec ces versets inspirants',
      'amour': 'L\'amour infini de Dieu pour l\'humanité',
      'pardonner': 'Apprenez à pardonner comme Dieu nous pardonne',
      'espérance': 'Trouvez l\'espérance dans les promesses de Dieu',
      'patience': 'Développez la patience selon la Parole de Dieu',
      'sagesse': 'Demandez et recevez la sagesse divine',
      'obéissance': 'L\'importance de l\'obéissance à Dieu',
      'courage': 'Trouvez le courage dans la force de Dieu',
      'gratitude': 'Exprimez votre gratitude envers Dieu',
      'paix': 'La paix qui surpasse toute intelligence',
      'force': 'Votre force vient de l\'Éternel',
      'humilité': 'Marchez humblement avec votre Dieu',
      'justice': 'Recherchez la justice selon Dieu',
      'loyauté': 'La fidélité et la loyauté envers Dieu',
      'obéissance à Dieu': 'L\'obéissance complète à la volonté de Dieu',
      'espérance éternelle': 'L\'espérance de la vie éternelle'
    };
    return descriptions[slug] || `Versets sur le thème de ${slug}`;
  }

  // Obtenir tous les topics
  getAllTopics(): Topic[] {
    return this.topics;
  }

  // Obtenir un topic par son slug
  getTopicBySlug(slug: string): Topic | null {
    return this.topics.find(topic => topic.slug === slug) || null;
  }

  // Obtenir un verset aléatoire d'un topic
  getRandomVerseFromTopic(slug: string): TopicVerse | null {
    const topic = this.getTopicBySlug(slug);
    if (!topic || topic.verses.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * topic.verses.length);
    return topic.verses[randomIndex];
  }

  // Obtenir le verset du jour basé sur un topic
  getVerseOfTheDay(topicSlug?: string): { topic: Topic; verse: TopicVerse } | null {
    let targetTopic: Topic;
    
    if (topicSlug) {
      targetTopic = this.getTopicBySlug(topicSlug);
      if (!targetTopic) {
        return null;
      }
    } else {
      // Sélectionner un topic aléatoire
      const randomIndex = Math.floor(Math.random() * this.topics.length);
      targetTopic = this.topics[randomIndex];
    }
    
    const verse = this.getRandomVerseFromTopic(targetTopic.slug);
    if (!verse) {
      return null;
    }
    
    return { topic: targetTopic, verse };
  }

  // Rechercher des topics par mot-clé
  searchTopics(keyword: string): Topic[] {
    const lowerKeyword = keyword.toLowerCase();
    return this.topics.filter(topic => 
      topic.name.toLowerCase().includes(lowerKeyword) ||
      topic.description.toLowerCase().includes(lowerKeyword) ||
      topic.slug.toLowerCase().includes(lowerKeyword)
    );
  }
}

export const topicsService = new TopicsService();
