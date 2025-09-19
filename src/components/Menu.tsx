import { useState } from 'react';
import { useSettings } from '../state/settingsStore';
import LessonCard from './LessonCard';

const menuItems = [
  {
    title: 'Le Pentateuque',
    icon: '📜',
    description: 'Les cinq premiers livres de la Bible',
    lessons: [
      {
        id: 'creation_01',
        title: 'La Création du monde',
        path: 'Le Pentateuque',
        description: 'Découvre comment Dieu a créé le monde en six jours.',
        book: 'Genèse',
      },
      {
        id: 'adam_eve_01',
        title: 'Adam et Ève — Le premier couple et la chute',
        path: 'Le Pentateuque',
        description: 'L\'histoire du premier couple et comment le péché est entré dans le monde.',
        book: 'Genèse',
      },
      {
        id: 'noe_01',
        title: 'Noé et l\'Arche — Le Déluge et l\'Alliance',
        path: 'Le Pentateuque',
        description: 'L\'histoire du déluge et de l\'alliance de Dieu avec l\'humanité.',
        book: 'Genèse',
      },
      {
        id: 'moise_buisson_01',
        title: 'Moïse et le buisson ardent — L\'appel de Dieu',
        path: 'Le Pentateuque',
        description: 'L\'appel de Moïse et la révélation du nom de Dieu.',
        book: 'Exode',
      },
      {
        id: 'plaies_egypte_01',
        title: 'Les dix plaies d\'Égypte — Dieu libère son peuple',
        path: 'Le Pentateuque',
        description: 'Les dix plaies envoyées par Dieu pour libérer Israël.',
        book: 'Exode',
      },
      {
        id: 'mer_rouge_01',
        title: 'La traversée de la mer Rouge — Miracle de la libération',
        path: 'Le Pentateuque',
        description: 'Le miracle de la traversée de la mer Rouge et la délivrance d\'Israël.',
        book: 'Exode',
      },
        {
          id: 'babel_01',
          title: 'La Tour de Babel — La confusion des langues',
          path: 'Le Pentateuque',
          description: 'L\'histoire de la tour de Babel et de la confusion des langues.',
          book: 'Genèse',
        },
        {
          id: 'abraham_01',
          title: 'Abraham et l\'Alliance — L\'appel et la promesse de Dieu',
          path: 'Le Pentateuque',
          description: 'L\'histoire d\'Abraham et de l\'alliance de Dieu avec lui.',
          book: 'Genèse',
        },
        {
          id: 'isaac_01',
          title: 'Isaac et Rebecca — Le mariage et la bénédiction',
          path: 'Le Pentateuque',
          description: 'L\'histoire du mariage d\'Isaac et Rebecca.',
          book: 'Genèse',
        },
        {
          id: 'jacob_01',
          title: 'Jacob et Ésaü — Les jumeaux et la bénédiction',
          path: 'Le Pentateuque',
          description: 'L\'histoire des jumeaux Jacob et Ésaü.',
          book: 'Genèse',
        },
        {
          id: 'joseph_01',
          title: 'Joseph en Égypte — Vendu par ses frères et élevé par Dieu',
          path: 'Le Pentateuque',
          description: 'L\'histoire de Joseph vendu par ses frères.',
          book: 'Genèse',
        },
        {
          id: 'commandements_01',
          title: 'Les Dix Commandements — La Loi de Dieu',
          path: 'Le Pentateuque',
          description: 'Les dix commandements donnés par Dieu à Moïse.',
          book: 'Exode',
        },
      // À ajouter : Lévitique, Nombres, Deutéronome
    ],
  },
  {
    title: 'Les Livres historiques',
    icon: '🏛️',
    description: 'L\'histoire du peuple de Dieu',
    lessons: [
      {
        id: 'david_01',
        title: 'David et le géant Goliath',
        path: 'Livres historiques',
        description: 'Un jeune berger fait confiance à Dieu pour vaincre un géant.',
        book: '1 Samuel',
      },
      {
        id: 'daniel_01',
        title: 'Daniel dans la fosse aux lions',
        path: 'Livres historiques',
        description: 'La fidélité de Daniel est récompensée par un miracle divin.',
        book: 'Daniel',
      },
      {
        id: 'gedeon_01',
        title: 'Gédéon et les 300 hommes — La victoire par la force de Dieu',
        path: 'Les Livres historiques',
        description: 'L\'histoire de Gédéon et de sa victoire miraculeuse.',
        book: 'Juges',
      },
      {
        id: 'samson_01',
        title: 'Samson et Dalila — Force et faiblesse',
        path: 'Les Livres historiques',
        description: 'L\'histoire de Samson, sa force divine et sa chute.',
        book: 'Juges',
      },
      {
        id: 'josue_01',
        title: 'Josué et les murs de Jéricho',
        path: 'Les Livres historiques',
        description: 'Une victoire miraculeuse par la foi et l\'obéissance.',
        book: 'Josué',
      },
      {
        id: 'salomon_01',
        title: 'Salomon et le Temple — Sagesse et splendeur',
        path: 'Les Livres historiques',
        description: 'L\'histoire de Salomon, sa sagesse et la construction du Temple.',
        book: '1 Rois',
      },
      // À ajouter : Josué, Juges, Ruth, 1-2 Samuel, 1-2 Rois, 1-2 Chroniques, Esdras, Néhémie, Esther
    ],
  },
  {
    title: 'Les Livres poétiques',
    icon: '🎭',
    description: 'Sagesse, louanges et méditations',
    lessons: [
      // À ajouter : Job, Psaumes, Proverbes, Ecclésiaste, Cantiques
    ],
  },
  {
    title: 'Les Livres prophétiques',
    icon: '⚡',
    description: 'Messages des prophètes de Dieu',
    lessons: [
      {
        id: 'jonas_01',
        title: 'Jonas et le grand poisson',
        path: 'Livres prophétiques',
        description: 'Découvre l\'histoire complète de Jonas et sa grande aventure.',
        book: 'Jonas',
      },
      {
        id: 'jonas_02_fuite',
        title: 'Jonas fuit sa mission',
        path: 'Livres prophétiques',
        description: 'Pourquoi Jonas refuse-t-il d\'obéir à Dieu ? La tempête en mer.',
        book: 'Jonas',
      },
      {
        id: 'jonas_03_ninive',
        title: 'Ninive se convertit',
        path: 'Livres prophétiques',
        description: 'La conversion miraculeuse de toute une ville ennemie.',
        book: 'Jonas',
      },
      {
        id: 'jonas_04_ricin',
        title: 'La leçon du ricin',
        path: 'Livres prophétiques',
        description: 'Dieu enseigne à Jonas la vraie miséricorde universelle.',
        book: 'Jonas',
      },
      {
        id: 'elie_01',
        title: 'Élie et les prophètes de Baal — Duel sur le mont Carmel',
        path: 'Livres prophétiques',
        description: 'L\'histoire d\'Élie et du duel spectaculaire sur le mont Carmel.',
        book: '1 Rois',
      },
      {
        id: 'ezechiel_01',
        title: 'Ézéchiel et les ossements desséchés — Vision de résurrection',
        path: 'Livres prophétiques',
        description: 'L\'histoire d\'Ézéchiel et de sa vision des ossements qui reprennent vie.',
        book: 'Ézéchiel',
      },
      // À ajouter : Isaïe, Jérémie, Lamentations, Daniel, Osée, Joël, Amos, Abdias, Michée, Nahum, Habacuc, Sophonie, Aggée, Zacharie, Malachie
    ],
  },
  {
    title: 'Vie du Christ',
    icon: '✝️',
    description: 'La vie de Jésus-Christ, notre Sauveur',
    lessons: [
      {
        id: 'naissance_jesus',
        title: 'La naissance de Jésus — Dieu fait homme',
        path: 'Vie du Christ',
        description: 'L\'incarnation miraculeuse du Fils de Dieu à Bethléem.',
        book: 'Luc',
      },
      {
        id: 'enfance_jesus',
        title: 'L\'enfance de Jésus — À 12 ans dans le temple',
        path: 'Vie du Christ',
        description: 'Jésus à 12 ans dans le temple, étonnant les docteurs par sa sagesse.',
        book: 'Luc',
      },
      {
        id: 'bapteme_jesus',
        title: 'Le baptême de Jésus — Début du ministère',
        path: 'Vie du Christ',
        description: 'Jésus se fait baptiser par Jean-Baptiste, marquant le début de son ministère public.',
        book: 'Matthieu',
      },
      {
        id: 'tentations_jesus',
        title: 'Les tentations de Jésus — Victoire sur le mal',
        path: 'Vie du Christ',
        description: 'Jésus résiste aux tentations du diable en s\'appuyant sur la Parole de Dieu.',
        book: 'Matthieu',
      },
      // À ajouter : Miracles, Passion, Résurrection
    ],
  },
  {
    title: 'Fêtes',
    icon: '🎉',
    lessons: [
      // À ajouter plus tard
    ],
  },
];

export default function Menu() {
  const [selectedPath, setSelectedPath] = useState<string>('Le Pentateuque');
  const { contrastHigh } = useSettings();

  const selectedItem = menuItems.find((item) => item.title === selectedPath);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Navigation des chemins */}
      <nav className="mb-12 animate-slide-up" role="navigation" aria-label="Chemins bibliques">
        <h2 className={`text-2xl lg:text-3xl font-bold mb-6 text-center lg:text-left ${
          contrastHigh ? 'text-contrast-text' : 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'
        }`}>
          ✨ Sections bibliques à explorer ✨
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {menuItems.map((item, index) => (
            <button
              key={item.title}
              onClick={() => setSelectedPath(item.title)}
              className={`group flex flex-col items-center text-center p-6 rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-scale ${
                selectedPath === item.title
                  ? contrastHigh
                    ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text'
                    : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg border-2 border-blue-300'
                  : contrastHigh
                  ? 'bg-contrast-bg text-contrast-text border-2 border-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                  : 'bg-gradient-to-br from-white to-gray-50 text-gray-700 border-2 border-gray-200 hover:from-blue-50 hover:to-indigo-50 hover:border-blue-400 shadow-md hover:shadow-lg'
              }`}
              style={{animationDelay: `${index * 0.1}s`}}
              aria-pressed={selectedPath === item.title}
            >
              <span className={`text-4xl mb-3 transition-transform group-hover:scale-110 ${
                selectedPath === item.title ? 'animate-bounce' : ''
              }`}>
                {item.icon}
              </span>
              <span className="font-bold text-sm lg:text-base mb-2">{item.title}</span>
              {item.description && (
                <span className={`text-xs lg:text-sm leading-relaxed ${
                  selectedPath === item.title 
                    ? contrastHigh ? 'text-contrast-bg' : 'text-blue-100'
                    : contrastHigh ? 'text-contrast-text' : 'text-gray-600'
                }`}>
                  {item.description}
                </span>
              )}
              
              {/* Indicateur de leçons disponibles */}
              {item.lessons.length > 0 && (
                <div className={`mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedPath === item.title
                    ? contrastHigh
                      ? 'bg-contrast-bg text-contrast-text'
                      : 'bg-white bg-opacity-30 text-white'
                    : contrastHigh
                    ? 'bg-contrast-text text-contrast-bg'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.lessons.length} leçon{item.lessons.length > 1 ? 's' : ''}
                </div>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Leçons du chemin sélectionné */}
      <section aria-labelledby="lessons-heading" className="animate-slide-up">
        <div className={`flex items-center justify-between mb-8 p-6 rounded-2xl ${
          contrastHigh 
            ? 'bg-contrast-bg border-2 border-contrast-text'
            : 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200'
        }`}>
          <div>
            <h3 
              id="lessons-heading" 
              className={`text-2xl lg:text-3xl font-bold mb-2 flex items-center space-x-3 ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-800'
              }`}
            >
              <span className="text-4xl animate-bounce">{selectedItem?.icon}</span>
              <span>{selectedPath}</span>
            </h3>
            <p className={`text-sm lg:text-base ${
              contrastHigh ? 'text-contrast-text' : 'text-gray-600'
            }`}>
              {selectedItem?.description}
            </p>
          </div>
          
          {selectedItem?.lessons && selectedItem.lessons.length > 0 && (
            <div className={`hidden lg:flex items-center space-x-4 px-4 py-2 rounded-xl ${
              contrastHigh 
                ? 'bg-contrast-text text-contrast-bg'
                : 'bg-white shadow-md'
            }`}>
              <span className="text-2xl">📊</span>
              <div className="text-sm">
                <div className={`font-bold ${contrastHigh ? 'text-contrast-bg' : 'text-gray-800'}`}>
                  {selectedItem.lessons.length} histoire{selectedItem.lessons.length > 1 ? 's' : ''}
                </div>
                <div className={`${contrastHigh ? 'text-contrast-bg' : 'text-gray-600'}`}>
                  disponible{selectedItem.lessons.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {selectedItem?.lessons.length === 0 ? (
          <div className={`text-center py-16 rounded-2xl border-2 border-dashed animate-pulse ${
            contrastHigh 
              ? 'border-contrast-text text-contrast-text bg-contrast-bg'
              : 'border-gray-300 text-gray-500 bg-gradient-to-br from-gray-50 to-gray-100'
          }`}>
            <span className="text-6xl mb-6 block animate-bounce">🚧</span>
            <h4 className="text-xl lg:text-2xl font-bold mb-3">Bientôt disponible !</h4>
            <p className="text-lg max-w-md mx-auto leading-relaxed">
              Les leçons de cette section sont en cours de préparation. 
              Revenez bientôt pour découvrir de nouvelles aventures bibliques !
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {selectedItem?.lessons.map((lesson, index) => (
              <div 
                key={lesson.id}
                className="animate-fade-scale"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <LessonCard
                  id={lesson.id}
                  title={lesson.title}
                  path={lesson.path}
                  description={lesson.description}
                  book={(lesson as any).book}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section frise chronologique modernisée */}
      <section className="mt-16 animate-slide-up">
        <div className={`relative overflow-hidden text-center p-10 lg:p-12 rounded-3xl ${
          contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 text-white'
        }`}>
          {/* Éléments décoratifs */}
          {!contrastHigh && (
            <div className="absolute inset-0">
              <div className="absolute top-8 left-8 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-float"></div>
              <div className="absolute bottom-8 right-8 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white bg-opacity-10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
            </div>
          )}
          
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <span className="text-6xl lg:text-7xl animate-bounce">📜</span>
            </div>
            
            <h3 className={`text-3xl lg:text-4xl font-bold mb-6 ${
              contrastHigh ? 'text-contrast-text' : 'text-white'
            }`}>
              Découvre la grande histoire de la Bible
            </h3>
            
            <p className={`text-lg lg:text-xl mb-8 max-w-2xl mx-auto leading-relaxed ${
              contrastHigh ? 'text-contrast-text' : 'text-indigo-100'
            }`}>
              Voyage à travers le temps et découvre comment toutes les histoires bibliques 
              s'articulent dans le grand plan de Dieu : de la Création à l'Apocalypse !
            </p>
            
            <a
              href="/timeline"
              className={`group inline-flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                contrastHigh
                  ? 'bg-contrast-text text-contrast-bg hover:opacity-80 border-2 border-contrast-text'
                  : 'bg-white text-indigo-700 hover:bg-indigo-50 shadow-xl'
              }`}
            >
              <span className="text-2xl group-hover:rotate-12 transition-transform">🌟</span>
              <span>Voir la Frise Chronologique</span>
              <span className="text-2xl group-hover:rotate-12 transition-transform">🌟</span>
            </a>
            
            <div className={`mt-6 text-sm ${
              contrastHigh ? 'text-contrast-text' : 'text-indigo-200'
            }`}>
              Une expérience interactive unique pour comprendre l'histoire sainte
            </div>
          </div>
        </div>
      </section>

      {/* Section bonus modernisée */}
      <section className="mt-12 pt-8 border-t border-gray-200 animate-slide-up">
        <div className={`rounded-2xl p-8 text-center ${
          contrastHigh 
            ? 'bg-contrast-bg border-2 border-contrast-text'
            : 'bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 border border-amber-200'
        }`}>
          <div className="flex justify-center mb-4">
            <span className="text-4xl animate-wiggle">💡</span>
          </div>
          
          <h3 className={`text-2xl font-bold mb-4 ${
            contrastHigh ? 'text-contrast-text' : 'text-amber-800'
          }`}>
            Le savais-tu ?
          </h3>
          
          <p className={`text-lg leading-relaxed max-w-2xl mx-auto ${
            contrastHigh ? 'text-contrast-text' : 'text-amber-700'
          }`}>
            La Bible contient 66 livres écrits sur plus de 1 500 ans par une quarantaine d'auteurs différents. 
            Chaque histoire nous enseigne quelque chose sur l'amour infini de Dieu et nous guide 
            pour vivre une vie qui lui plaît.
          </p>
          
          <div className={`mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto ${
            contrastHigh ? 'text-contrast-text' : 'text-amber-600'
          }`}>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">📖</span>
              <span className="font-semibold">66 livres</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">👥</span>
              <span className="font-semibold">40+ auteurs</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">⏳</span>
              <span className="font-semibold">1500 ans</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
