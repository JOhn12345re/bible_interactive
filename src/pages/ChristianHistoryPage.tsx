import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';

interface HistoricalEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
  category: 'apostolic' | 'early' | 'medieval' | 'modern' | 'contemporary';
  importance: 'high' | 'medium';
}

const ChristianHistoryPage = () => {
  const { contrastHigh } = useSettings();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Toutes les périodes', icon: '📅' },
    { id: 'apostolic', name: 'Ère Apostolique (33-100)', icon: '✝️' },
    { id: 'early', name: 'Église Ancienne (100-641)', icon: '⛪' },
    { id: 'medieval', name: 'Période Islamique (641-1800)', icon: '🕌' },
    { id: 'modern', name: 'Renouveau (1800-1950)', icon: '📖' },
    { id: 'contemporary', name: 'Ère Moderne (1950+)', icon: '🌍' },
  ];

  const events: HistoricalEvent[] = [
    // Ère Apostolique - Fondation de l'Église d'Alexandrie
    {
      year: '42-43',
      title: 'Saint Marc fonde l\'Église d\'Alexandrie',
      description: 'Saint Marc l\'Évangéliste arrive à Alexandrie et établit l\'Église copte, devenant son premier patriarche.',
      icon: '✝️',
      category: 'apostolic',
      importance: 'high',
    },
    {
      year: '68',
      title: 'Martyre de Saint Marc',
      description: 'Saint Marc est martyrisé à Alexandrie le jour de Pâques. Il est traîné dans les rues jusqu\'à sa mort.',
      icon: '⚔️',
      category: 'apostolic',
      importance: 'high',
    },
    {
      year: '85',
      title: 'Saint Anianus, 2ème Patriarche',
      description: 'Anianus, premier converti de Saint Marc (le cordonnier), devient le deuxième patriarche d\'Alexandrie.',
      icon: '👤',
      category: 'apostolic',
      importance: 'medium',
    },

    // Église Ancienne - Persécutions et Théologie
    {
      year: '202-311',
      title: 'Ère des Martyrs',
      description: 'Période de persécutions intenses contre les chrétiens d\'Égypte. L\'Église copte compte ses années depuis 284 (calendrier des martyrs).',
      icon: '🕊️',
      category: 'early',
      importance: 'high',
    },
    {
      year: '250',
      title: 'Persécution de Dèce',
      description: 'Persécution massive sous l\'empereur Dèce. Milliers de martyrs coptes, naissance du monachisme.',
      icon: '⚔️',
      category: 'early',
      importance: 'high',
    },
    {
      year: '251-356',
      title: 'Saint Antoine le Grand',
      description: 'Père du monachisme chrétien. Se retire dans le désert égyptien, établissant le modèle de vie monastique.',
      icon: '🏜️',
      category: 'early',
      importance: 'high',
    },
    {
      year: '284',
      title: 'Début du Calendrier Copte',
      description: 'L\'Église copte commence son calendrier en l\'honneur des martyrs sous Dioclétien. Année 1 Anno Martyrum.',
      icon: '📅',
      category: 'early',
      importance: 'high',
    },
    {
      year: '303-311',
      title: 'Grande Persécution de Dioclétien',
      description: 'La plus terrible persécution. Des dizaines de milliers de coptes martyrisés. Destruction d\'églises et de manuscrits.',
      icon: '🔥',
      category: 'early',
      importance: 'high',
    },
    {
      year: '320',
      title: 'Saint Pacôme fonde le cénobitisme',
      description: 'Saint Pacôme établit les premiers monastères communautaires en Haute-Égypte, créant des règles monastiques.',
      icon: '⛪',
      category: 'early',
      importance: 'high',
    },
    {
      year: '325',
      title: 'Concile de Nicée I',
      description: 'Saint Athanase (diacre d\'Alexandrie) défend l\'orthodoxie contre Arius. Définition du Credo de Nicée.',
      icon: '📜',
      category: 'early',
      importance: 'high',
    },
    {
      year: '328-373',
      title: 'Saint Athanase, 20ème Patriarche',
      description: 'Le "Père de l\'Orthodoxie" défend la foi contre l\'arianisme. Exilé 5 fois pour la vraie foi.',
      icon: '👑',
      category: 'early',
      importance: 'high',
    },
    {
      year: '385',
      title: 'École Théologique d\'Alexandrie',
      description: 'L\'École Catéchétique d\'Alexandrie devient le plus grand centre d\'enseignement chrétien du monde.',
      icon: '📚',
      category: 'early',
      importance: 'high',
    },
    {
      year: '412-444',
      title: 'Saint Cyrille, 24ème Patriarche',
      description: 'Le "Pilier de la Foi" défend la christologie orthodoxe. Auteur majeur de théologie copte.',
      icon: '✍️',
      category: 'early',
      importance: 'high',
    },
    {
      year: '431',
      title: 'Concile d\'Éphèse',
      description: 'Saint Cyrille préside. Marie proclamée "Théotokos" (Mère de Dieu). Condamnation du nestorianisme.',
      icon: '👸',
      category: 'early',
      importance: 'high',
    },
    {
      year: '451',
      title: 'Concile de Chalcédoine - Séparation',
      description: 'L\'Église copte rejette Chalcédoine, restant fidèle à la christologie de Saint Cyrille (Miaphysisme).',
      icon: '⚖️',
      category: 'early',
      importance: 'high',
    },
    {
      year: '457',
      title: 'Ordination du premier Patriarche Copte indépendant',
      description: 'Saint Timothée III devient patriarche, consolidant l\'indépendance de l\'Église copte orthodoxe.',
      icon: '⛪',
      category: 'early',
      importance: 'high',
    },
    {
      year: '537',
      title: 'L\'Église Éthiopienne sous Alexandrie',
      description: 'L\'Église éthiopienne orthodoxe devient officiellement rattachée au Siège d\'Alexandrie.',
      icon: '🇪🇹',
      category: 'early',
      importance: 'medium',
    },

    // Période Islamique - Résistance et Survie
    {
      year: '641',
      title: 'Conquête Arabe de l\'Égypte',
      description: 'Début de l\'ère islamique en Égypte. L\'Église copte devient minoritaire mais survit.',
      icon: '🕌',
      category: 'medieval',
      importance: 'high',
    },
    {
      year: '705-1517',
      title: 'Persécutions Périodiques',
      description: 'Cycles de persécutions et de périodes de tolérance. Destruction d\'églises, conversions forcées.',
      icon: '⚔️',
      category: 'medieval',
      importance: 'high',
    },
    {
      year: '969',
      title: 'Le Siège Patriarcal au Caire',
      description: 'Le patriarcat copte est transféré d\'Alexandrie au Caire sous les Fatimides.',
      icon: '🏛️',
      category: 'medieval',
      importance: 'medium',
    },
    {
      year: '1047',
      title: 'Construction de l\'Église Suspendue',
      description: 'L\'église Al-Moallaqa (Suspendue) est reconstruite, symbole de la résilience copte.',
      icon: '⛪',
      category: 'medieval',
      importance: 'medium',
    },
    {
      year: '1219',
      title: 'Saint François d\'Assise visite le Pape Cyrille III',
      description: 'Rencontre historique symbolisant le respect mutuel entre les églises.',
      icon: '🤝',
      category: 'medieval',
      importance: 'medium',
    },
    {
      year: '1517',
      title: 'Période Ottomane',
      description: 'L\'Égypte passe sous domination ottomane. Nouvelles restrictions sur les coptes.',
      icon: '🕌',
      category: 'medieval',
      importance: 'medium',
    },

    // Renouveau - Renaissance Copte
    {
      year: '1854',
      title: 'Réforme du Patriarche Cyrille IV',
      description: 'Le "Père de la Réforme" modernise l\'Église : écoles, imprimeries, formation du clergé.',
      icon: '📖',
      category: 'modern',
      importance: 'high',
    },
    {
      year: '1893',
      title: 'Établissement du Mouvement de l\'École du Dimanche',
      description: 'Début du mouvement moderne d\'éducation religieuse pour les jeunes coptes.',
      icon: '�',
      category: 'modern',
      importance: 'high',
    },
    {
      year: '1959',
      title: 'Monastère de Saint-Macaire retrouve sa vie',
      description: 'Réveil du monachisme copte avec la rénovation des monastères du Wadi Natrun.',
      icon: '🏜️',
      category: 'contemporary',
      importance: 'medium',
    },

    // Ère Moderne - Expansion et Martyrs
    {
      year: '1959-2012',
      title: 'Pape Shenouda III',
      description: 'Le 117ème patriarche. Expansion mondiale de l\'Église copte, plus de 100 églises en diaspora.',
      icon: '👑',
      category: 'contemporary',
      importance: 'high',
    },
    {
      year: '1965',
      title: 'Dialogue avec l\'Église Catholique',
      description: 'Le Pape Paul VI et le Pape Shenouda signent une déclaration christologique commune.',
      icon: '🤝',
      category: 'contemporary',
      importance: 'high',
    },
    {
      year: '1973',
      title: 'Retour des reliques de Saint Marc',
      description: 'Le Pape Paul VI restitue les reliques de Saint Marc à l\'Église copte après 1100 ans.',
      icon: '✝️',
      category: 'contemporary',
      importance: 'high',
    },
    {
      year: '1989',
      title: 'Autonomie de l\'Église Éthiopienne',
      description: 'L\'Église orthodoxe éthiopienne devient autocéphale tout en gardant des liens avec Alexandrie.',
      icon: '🇪🇹',
      category: 'contemporary',
      importance: 'medium',
    },
    {
      year: '1990',
      title: 'Autonomie de l\'Église Érythréenne',
      description: 'L\'Église orthodoxe érythréenne devient autocéphale, église sœur de l\'Église copte.',
      icon: '🇪🇷',
      category: 'contemporary',
      importance: 'medium',
    },
    {
      year: '2011',
      title: 'Attentat d\'Alexandrie',
      description: 'Attentat contre l\'église des Saints au Nouvel An, 23 martyrs. Solidarité nationale.',
      icon: '�️',
      category: 'contemporary',
      importance: 'high',
    },
    {
      year: '2012',
      title: 'Pape Tawadros II élu',
      description: 'Le 118ème patriarche d\'Alexandrie, continue le renouveau spirituel et l\'expansion mondiale.',
      icon: '👑',
      category: 'contemporary',
      importance: 'high',
    },
    {
      year: '2015',
      title: 'Martyrs de Libye',
      description: '21 coptes décapités en Libye par Daesh. Canonisés immédiatement. Témoignage de foi mondial.',
      icon: '⚔️',
      category: 'contemporary',
      importance: 'high',
    },
    {
      year: '2017',
      title: 'Attentats de Tanta et Alexandrie',
      description: 'Dimanche des Rameaux : attaques contre deux églises, 45 martyrs. Résilience de la foi copte.',
      icon: '🕊️',
      category: 'contemporary',
      importance: 'high',
    },
    {
      year: '2019',
      title: 'Inauguration de la Cathédrale de la Nativité',
      description: 'Plus grande cathédrale du Moyen-Orient inaugurée en Égypte, symbole de renouveau.',
      icon: '⛪',
      category: 'contemporary',
      importance: 'high',
    },
    {
      year: '2020',
      title: 'Dialogue Œcuménique',
      description: 'Renforcement des liens avec les églises orthodoxes orientales (Arménienne, Syrienne, Indienne, Éthiopienne).',
      icon: '🤝',
      category: 'contemporary',
      importance: 'medium',
    },
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  return (
    <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
      {/* Header */}
      <header className={`py-6 px-4 sm:px-6 lg:px-8 ${contrastHigh ? 'bg-contrast-bg border-b-2 border-contrast-text' : 'bg-white shadow-sm'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  contrastHigh ? 'hover:bg-contrast-text/20' : 'hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl">←</span>
                <span className="font-medium">Retour</span>
              </Link>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
              ⛪ Histoire de l'Église Copte Orthodoxe
            </h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
          <p className={`text-lg leading-relaxed ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
            Découvrez l'histoire glorieuse de l'Église Copte Orthodoxe d'Alexandrie, fondée par Saint Marc l'Évangéliste en l'an 42. 
            De la fondation apostolique aux martyrs contemporains, retracez près de 2000 ans de foi, de résilience et de témoignage.
            Cette église, qui a donné naissance au monachisme chrétien et aux plus grands théologiens, continue de briller aujourd'hui.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? contrastHigh
                      ? 'bg-contrast-text text-contrast-bg'
                      : 'bg-blue-600 text-white shadow-lg'
                    : contrastHigh
                      ? 'bg-contrast-bg text-contrast-text border-2 border-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className={`absolute left-8 top-0 bottom-0 w-1 ${contrastHigh ? 'bg-contrast-text' : 'bg-blue-300'}`}></div>

          {/* Events */}
          <div className="space-y-8">
            {filteredEvents.map((event, index) => (
              <div key={index} className="relative pl-20">
                {/* Year bubble */}
                <div className={`absolute left-0 top-2 w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${
                  event.importance === 'high'
                    ? contrastHigh
                      ? 'bg-contrast-text text-contrast-bg border-4 border-contrast-text'
                      : 'bg-gradient-to-br from-red-500 to-pink-600 text-white'
                    : contrastHigh
                      ? 'bg-contrast-bg text-contrast-text border-2 border-contrast-text'
                      : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                }`}>
                  {event.year}
                </div>

                {/* Event card */}
                <div className={`p-6 rounded-xl transition-all hover:scale-105 ${
                  event.importance === 'high'
                    ? contrastHigh
                      ? 'bg-contrast-bg border-4 border-contrast-text'
                      : 'bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-300 shadow-lg'
                    : contrastHigh
                      ? 'bg-contrast-bg border-2 border-contrast-text'
                      : 'bg-white border border-gray-200 shadow'
                }`}>
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl flex-shrink-0">
                      {event.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-2 ${
                        event.importance === 'high'
                          ? contrastHigh
                            ? 'text-contrast-text'
                            : 'text-red-700'
                          : contrastHigh
                            ? 'text-contrast-text'
                            : 'text-gray-900'
                      }`}>
                        {event.title}
                      </h3>
                      <p className={`leading-relaxed ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                        {event.description}
                      </p>
                      {event.importance === 'high' && (
                        <div className={`mt-3 inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                          contrastHigh
                            ? 'bg-contrast-text text-contrast-bg'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          <span>⭐</span>
                          <span>Événement majeur</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className={`mt-12 p-6 rounded-xl text-center ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200'}`}>
          <p className={`text-lg font-medium mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-orange-800'}`}>
            ✝️ L'Église des Martyrs
          </p>
          <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
            L'Église Copte Orthodoxe compte ses années depuis 284 après J.-C., l'année de l'avènement de Dioclétien et du début de l'Ère des Martyrs (Anno Martyrum). 
            Cette église, fondée par Saint Marc, a donné au christianisme le monachisme, de grands théologiens comme Saint Athanase et Saint Cyrille, 
            et continue aujourd'hui avec plus de 20 millions de fidèles à travers le monde, témoignant de la foi jusqu'au martyre.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ChristianHistoryPage;
