import React, { useState, useEffect } from 'react';
import { topicsService, Topic, TopicVerse } from '../services/topicsService';

const TopicsExplorer: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [verseOfTheDay, setVerseOfTheDay] = useState<{ topic: Topic; verse: TopicVerse } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTopics();
    loadVerseOfTheDay();
  }, []);

  const loadTopics = async () => {
    try {
      const allTopics = await topicsService.getAllTopics();
      setTopics(allTopics);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des topics:', error);
      setLoading(false);
    }
  };

  const loadVerseOfTheDay = async () => {
    try {
      const verse = await topicsService.getVerseOfTheDay();
      setVerseOfTheDay(verse);
    } catch (error) {
      console.error('Erreur lors du chargement du verset du jour:', error);
    }
  };

  const filteredTopics = topics.filter(topic =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  const getRandomVerseFromTopic = async (topic: Topic) => {
    try {
      const verse = await topicsService.getRandomVerseFromTopic(topic.slug);
      if (verse) {
        alert(`Verset aléatoire de ${topic.name}:\n\n"${verse.texte}"\n\n— ${verse.ref}`);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du verset aléatoire:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Chargement des thèmes...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          📚 Explorateur de Thèmes Bibliques
        </h1>
        <p className="text-lg text-gray-600">
          Découvrez des versets organisés par thème pour enrichir votre foi
        </p>
      </div>

      {/* Verset du jour */}
      {verseOfTheDay && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 mb-8 shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-3xl">🌟</span>
            <h2 className="text-2xl font-bold">Verset du jour</h2>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">{verseOfTheDay.topic.name}</h3>
            <p className="text-sm opacity-90 mb-3">{verseOfTheDay.topic.description}</p>
            <blockquote className="text-lg italic">
              "{verseOfTheDay.verse.texte}"
            </blockquote>
            <cite className="text-sm opacity-80 mt-2 block">
              — {verseOfTheDay.verse.ref}
            </cite>
          </div>
        </div>
      )}

      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher un thème..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des topics */}
        <div className="lg:col-span-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Thèmes disponibles ({filteredTopics.length})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredTopics.map((topic) => (
              <button
                key={topic.slug}
                onClick={() => handleTopicSelect(topic)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 hover-lift ${
                  selectedTopic?.slug === topic.slug
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-white border border-gray-200 hover:border-blue-300'
                }`}
              >
                <h4 className="font-semibold text-gray-800 mb-1">{topic.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{topic.description}</p>
                <span className="text-xs text-blue-600 font-medium">
                  {topic.verses.length} verset{topic.verses.length > 1 ? 's' : ''}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Détails du topic sélectionné */}
        <div className="lg:col-span-2">
          {selectedTopic ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📖</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedTopic.name}</h2>
                  <p className="text-gray-600">{selectedTopic.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                {selectedTopic.verses.map((verse, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <blockquote className="text-gray-700 leading-relaxed mb-2">
                      "{verse.texte}"
                    </blockquote>
                    <cite className="text-sm text-blue-600 font-medium">
                      — {verse.ref}
                    </cite>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => getRandomVerseFromTopic(selectedTopic)}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 button-interactive"
                >
                  🎲 Verset aléatoire
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-gray-400">📚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Sélectionnez un thème
              </h3>
              <p className="text-gray-500">
                Choisissez un thème dans la liste pour voir les versets correspondants
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicsExplorer;
