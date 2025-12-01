import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';
import { useAuth } from '../context/AuthContext';
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
        description:
          "L'histoire du premier couple et comment le péché est entré dans le monde.",
        book: 'Genèse',
      },
      {
        id: 'noe_01',
        title: "Noé et l'Arche — Le Déluge et l'Alliance",
        path: 'Le Pentateuque',
        description:
          "L'histoire du déluge et de l'alliance de Dieu avec l'humanité.",
        book: 'Genèse',
      },
      {
        id: 'moise_buisson_01',
        title: "Moïse et le buisson ardent — L'appel de Dieu",
        path: 'Le Pentateuque',
        description: "L'appel de Moïse et la révélation du nom de Dieu.",
        book: 'Exode',
      },
      {
        id: 'plaies_egypte_01',
        title: "Les dix plaies d'Égypte — Dieu libère son peuple",
        path: 'Le Pentateuque',
        description: 'Les dix plaies envoyées par Dieu pour libérer Israël.',
        book: 'Exode',
      },
      {
        id: 'mer_rouge_01',
        title: 'La traversée de la mer Rouge — Miracle de la libération',
        path: 'Le Pentateuque',
        description:
          "Le miracle de la traversée de la mer Rouge et la délivrance d'Israël.",
        book: 'Exode',
      },
      {
        id: 'babel_01',
        title: 'La Tour de Babel — La confusion des langues',
        path: 'Le Pentateuque',
        description:
          "L'histoire de la tour de Babel et de la confusion des langues.",
        book: 'Genèse',
      },
      {
        id: 'abraham_01',
        title: "Abraham et l'Alliance — L'appel et la promesse de Dieu",
        path: 'Le Pentateuque',
        description: "L'histoire d'Abraham et de l'alliance de Dieu avec lui.",
        book: 'Genèse',
      },
      {
        id: 'isaac_sacrifice_01',
        title: 'Le Sacrifice d\'Isaac',
        path: 'Le Pentateuque',
        description: 'Dieu met Abraham à l\'épreuve en lui demandant de sacrifier Isaac.',
        book: 'Genèse',
      },
      {
        id: 'isaac_mariage_01',
        title: 'Isaac et Rebecca — Le mariage et la bénédiction',
        path: 'Le Pentateuque',
        description: "L'histoire du mariage d'Isaac et Rebecca.",
        book: 'Genèse',
      },
      {
        id: 'jacob_esau_01',
        title: 'Jacob et Ésaü — Les jumeaux et la bénédiction',
        path: 'Le Pentateuque',
        description: "L'histoire des jumeaux Jacob et Ésaü.",
        book: 'Genèse',
      },
      {
        id: 'jacob_songe_01',
        title: 'Le Songe de Jacob',
        path: 'Le Pentateuque',
        description: 'Jacob voit une échelle qui touche le ciel avec les anges de Dieu.',
        book: 'Genèse',
      },
      {
        id: 'joseph_01',
        title: 'Joseph en Égypte — Vendu par ses frères et élevé par Dieu',
        path: 'Le Pentateuque',
        description: "L'histoire de Joseph vendu par ses frères.",
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
    title: 'Alliance',
    icon: '📜',
    description: 'Lévitique-Deutéronome - L\'établissement de l\'alliance',
    lessons: [
      {
        id: 'tabernacle_01',
        title: 'Le Tabernacle — Sanctuaire de Dieu',
        path: 'Alliance',
        description: 'Ils me feront un sanctuaire, et j\'habiterai au milieu d\'eux.',
        book: 'Exode',
      },
      {
        id: 'terre_promise_01',
        title: 'La Terre Promise — Vision de Moïse',
        path: 'Alliance',
        description: 'Moïse contemple la terre promise depuis le mont Nebo.',
        book: 'Deutéronome',
      },
    ],
  },
  {
    title: 'Conquête',
    icon: '⚔️',
    description: 'La conquête de Canaan',
    lessons: [
      {
        id: 'josue_01',
        title: 'La Prise de Jéricho — Les murailles s\'effondrent',
        path: 'Conquête',
        description: 'Les murailles s\'écroulèrent, et le peuple monta dans la ville.',
        book: 'Josué',
      },
    ],
  },
  {
    title: 'Les icônes coptes',
    icon: '🖼️',
    description: "L'art sacré de la tradition copte",
    lessons: [
      {
        id: 'icone_pantocrator',
        title: 'Le Christ Pantocrator',
        path: 'Les icônes coptes',
        description: 'Découvre la plus célèbre des icônes du Christ Roi de l\'univers.',
        book: 'Tradition copte',
      },
      {
        id: 'icone_theotokos',
        title: 'La Théotokos - Mère de Dieu',
        path: 'Les icônes coptes',
        description: 'Les représentations de la Vierge Marie dans l\'art copte.',
        book: 'Tradition copte',
      },
      {
        id: 'icone_nativite',
        title: 'L\'icône de la Nativité',
        path: 'Les icônes coptes',
        description: 'La naissance du Christ représentée dans la tradition copte.',
        book: 'Tradition copte',
      },
      {
        id: 'icone_resurrection',
        title: 'L\'icône de la Résurrection',
        path: 'Les icônes coptes',
        description: 'Le Christ vainqueur de la mort dans l\'art copte.',
        book: 'Tradition copte',
      },
      {
        id: 'icone_transfiguration',
        title: 'L\'icône de la Transfiguration',
        path: 'Les icônes coptes',
        description: 'La gloire divine révélée sur le mont Thabor.',
        book: 'Tradition copte',
      },
      {
        id: 'icone_ascension',
        title: 'L\'icône de l\'Ascension',
        path: 'Les icônes coptes',
        description: 'Le Christ montant vers son Père dans la gloire.',
        book: 'Tradition copte',
      },
      // À développer : autres icônes traditionnelles coptes
    ],
  },
  {
    title: 'L\'histoire des saints',
    icon: '👼',
    description: 'Les vies exemplaires des saints de l\'Église',
    lessons: [
      {
        id: 'saint_mina',
        title: 'Saint Mina le Thaumaturge',
        path: 'L\'histoire des saints',
        description: 'Le héros égyptien et faiseur de miracles, martyr de la foi.',
        book: 'Vies des saints',
      },
      {
        id: 'saint_antoine',
        title: 'Saint Antoine le Grand',
        path: 'L\'histoire des saints',
        description: 'Le père du monachisme et sa vie dans le désert égyptien.',
        book: 'Vies des saints',
      },
      {
        id: 'saint_athanase',
        title: 'Saint Athanase d\'Alexandrie',
        path: 'L\'histoire des saints',
        description: 'Le défenseur de la foi contre l\'arianisme.',
        book: 'Vies des saints',
      },
      {
        id: 'saint_cyrille_alexandrie',
        title: 'Saint Cyrille d\'Alexandrie',
        path: 'L\'histoire des saints',
        description: 'Le grand docteur de l\'Église et défenseur de la foi.',
        book: 'Vies des saints',
      },
      {
        id: 'saint_macaire',
        title: 'Saint Macaire l\'Égyptien',
        path: 'L\'histoire des saints',
        description: 'Le grand spirituel du désert de Scété.',
        book: 'Vies des saints',
      },
      {
        id: 'saint_pachome',
        title: 'Saint Pachôme',
        path: 'L\'histoire des saints',
        description: 'Le fondateur du monachisme cénobitique.',
        book: 'Vies des saints',
      },
      {
        id: 'saint_shenouda',
        title: 'Saint Shenouda l\'Archimandrite',
        path: 'L\'histoire des saints',
        description: 'Le grand réformateur du monachisme copte.',
        book: 'Vies des saints',
      },
      {
        id: 'sainte_marie_egyptienne',
        title: 'Sainte Marie l\'Égyptienne',
        path: 'L\'histoire des saints',
        description: 'La grande pénitente du désert.',
        book: 'Vies des saints',
      },
      {
        id: 'saint_moise_noir',
        title: 'Saint Moïse le Noir',
        path: 'L\'histoire des saints',
        description: 'De brigand à saint moine du désert.',
        book: 'Vies des saints',
      },
      // À développer : autres saints de la tradition copte
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
        description:
          "Découvre l'histoire complète de Jonas et sa grande aventure.",
        book: 'Jonas',
      },
      {
        id: 'jonas_02_fuite',
        title: 'Jonas fuit sa mission',
        path: 'Livres prophétiques',
        description:
          "Pourquoi Jonas refuse-t-il d'obéir à Dieu ? La tempête en mer.",
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
        description:
          "L'histoire d'Élie et du duel spectaculaire sur le mont Carmel.",
        book: '1 Rois',
      },
      {
        id: 'ezechiel_01',
        title: 'Ézéchiel et les ossements desséchés — Vision de résurrection',
        path: 'Livres prophétiques',
        description:
          "L'histoire d'Ézéchiel et de sa vision des ossements qui reprennent vie.",
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
        description: "L'incarnation miraculeuse du Fils de Dieu à Bethléem.",
        book: 'Luc',
      },
      {
        id: 'enfance_jesus',
        title: "L'enfance de Jésus — À 12 ans dans le temple",
        path: 'Vie du Christ',
        description:
          'Jésus à 12 ans dans le temple, étonnant les docteurs par sa sagesse.',
        book: 'Luc',
      },
      {
        id: 'bapteme_jesus',
        title: 'Le baptême de Jésus — Début du ministère',
        path: 'Vie du Christ',
        description:
          'Jésus se fait baptiser par Jean-Baptiste, marquant le début de son ministère public.',
        book: 'Matthieu',
      },
      {
        id: 'tentations_jesus',
        title: 'Les tentations de Jésus — Victoire sur le mal',
        path: 'Vie du Christ',
        description:
          "Jésus résiste aux tentations du diable en s'appuyant sur la Parole de Dieu.",
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
  const { user, isAuthenticated, logout } = useAuth();

  const selectedItem = menuItems.find((item) => item.title === selectedPath);

  return (
    <div className="max-w-6xl mx-auto px-responsive">
      {/* Bannière d'authentification */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 sm:p-4 rounded-xl shadow-lg gap-3">
        <div className="flex items-center space-x-2 sm:space-x-3">
          {isAuthenticated ? (
            <>
              <span className="text-xl sm:text-2xl">👤</span>
              <div>
                <p className="font-bold text-sm sm:text-base">{user?.username}</p>
                <p className="text-xs sm:text-sm opacity-90 hidden sm:block">Progression sauvegardée automatiquement</p>
              </div>
            </>
          ) : (
            <>
              <span className="text-xl sm:text-2xl">⚠️</span>
              <div>
                <p className="font-bold text-sm sm:text-base">Mode invité</p>
                <p className="text-xs sm:text-sm opacity-90 hidden sm:block">Connectez-vous pour sauvegarder votre progression</p>
              </div>
            </>
          )}
        </div>
        <div className="w-full sm:w-auto">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="w-full sm:w-auto px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-semibold transition-all text-sm sm:text-base"
            >
              Déconnexion
            </button>
          ) : (
            <Link
              to="/login"
              className="block w-full sm:w-auto text-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-semibold transition-all text-sm sm:text-base"
            >
              Se connecter
            </Link>
          )}
        </div>
      </div>

      {/* Navigation des chemins */}
      <nav
        className="mb-8 sm:mb-12 animate-slide-up"
        role="navigation"
        aria-label="Chemins bibliques"
      >
        <h2
          className={`text-responsive-lg font-bold mb-4 sm:mb-6 text-center lg:text-left ${
            contrastHigh
              ? 'text-contrast-text'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'
          }`}
        >
          ✨ Sections bibliques à explorer ✨
        </h2>
        <div className="grid-responsive">
          {menuItems.map((item, index) => (
            <button
              key={item.title}
              onClick={() => setSelectedPath(item.title)}
              className={`group flex flex-col items-center text-center p-3 sm:p-4 md:p-6 rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-scale ${
                selectedPath === item.title
                  ? contrastHigh
                    ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text'
                    : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg border-2 border-blue-300'
                  : contrastHigh
                    ? 'bg-contrast-bg text-contrast-text border-2 border-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                    : 'bg-gradient-to-br from-white to-gray-50 text-gray-700 border-2 border-gray-200 hover:from-blue-50 hover:to-indigo-50 hover:border-blue-400 shadow-md hover:shadow-lg'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              aria-pressed={selectedPath === item.title}
            >
              <span
                className={`text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 transition-transform group-hover:scale-110 ${
                  selectedPath === item.title ? 'animate-bounce' : ''
                }`}
              >
                {item.icon}
              </span>
              <span className="font-bold text-xs sm:text-sm lg:text-base mb-1 sm:mb-2">
                {item.title}
              </span>
              {item.description && (
                <span
                  className={`text-xs sm:text-sm leading-relaxed ${
                    selectedPath === item.title
                      ? contrastHigh
                        ? 'text-contrast-bg'
                        : 'text-blue-100'
                      : contrastHigh
                        ? 'text-contrast-text'
                        : 'text-gray-600'
                  }`}
                >
                  {item.description}
                </span>
              )}

              {/* Indicateur de leçons disponibles */}
              {item.lessons.length > 0 && (
                <div
                  className={`mt-2 sm:mt-3 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedPath === item.title
                      ? contrastHigh
                        ? 'bg-contrast-bg text-contrast-text'
                        : 'bg-white bg-opacity-30 text-white'
                      : contrastHigh
                        ? 'bg-contrast-text text-contrast-bg'
                        : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {item.lessons.length} leçon
                  {item.lessons.length > 1 ? 's' : ''}
                </div>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Leçons du chemin sélectionné */}
      <section aria-labelledby="lessons-heading" className="animate-slide-up">
        <div
          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 p-responsive rounded-2xl gap-3 sm:gap-4 ${
            contrastHigh
              ? 'bg-contrast-bg border-2 border-contrast-text'
              : 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200'
          }`}
        >
          <div className="flex-1">
            <h3
              id="lessons-heading"
              className={`text-responsive-md font-bold mb-2 flex items-center space-x-2 ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-800'
              }`}
            >
              <span className="text-2xl sm:text-3xl md:text-4xl animate-bounce">
                {selectedItem?.icon}
              </span>
              <span>{selectedPath}</span>
            </h3>
            <p
              className={`text-responsive-sm ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-600'
              }`}
            >
              {selectedItem?.description}
            </p>
          </div>

          {selectedItem?.lessons && selectedItem.lessons.length > 0 && (
            <div
              className={`hidden lg:flex items-center space-x-4 px-4 py-2 rounded-xl ${
                contrastHigh
                  ? 'bg-contrast-text text-contrast-bg'
                  : 'bg-white shadow-md'
              }`}
            >
              <span className="text-2xl">📊</span>
              <div className="text-sm">
                <div
                  className={`font-bold ${contrastHigh ? 'text-contrast-bg' : 'text-gray-800'}`}
                >
                  {selectedItem.lessons.length} histoire
                  {selectedItem.lessons.length > 1 ? 's' : ''}
                </div>
                <div
                  className={`${contrastHigh ? 'text-contrast-bg' : 'text-gray-600'}`}
                >
                  disponible{selectedItem.lessons.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          )}
        </div>

        {selectedItem?.lessons.length === 0 ? (
          <div
            className={`text-center py-10 sm:py-16 rounded-2xl border-2 border-dashed animate-pulse ${
              contrastHigh
                ? 'border-contrast-text text-contrast-text bg-contrast-bg'
                : 'border-gray-300 text-gray-500 bg-gradient-to-br from-gray-50 to-gray-100'
            }`}
          >
            <span className="text-4xl sm:text-6xl mb-4 sm:mb-6 block animate-bounce">🚧</span>
            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">
              Bientôt disponible !
            </h4>
            <p className="text-sm sm:text-base lg:text-lg max-w-md mx-auto leading-relaxed px-4">
              Les leçons de cette section sont en cours de préparation. Revenez
              bientôt pour découvrir de nouvelles aventures bibliques !
            </p>
          </div>
        ) : (
          <div className="grid-responsive-3">
            {selectedItem?.lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="animate-fade-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
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
      <section className="mt-10 sm:mt-16 animate-slide-up">
        <div
          className={`relative overflow-hidden text-center p-responsive rounded-3xl ${
            contrastHigh
              ? 'bg-contrast-bg border-2 border-contrast-text'
              : 'bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 text-white'
          }`}
        >
          {/* Éléments décoratifs */}
          {!contrastHigh && (
            <div className="absolute inset-0">
              <div className="absolute top-8 left-8 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-float"></div>
              <div
                className="absolute bottom-8 right-8 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-float"
                style={{ animationDelay: '1s' }}
              ></div>
              <div
                className="absolute top-1/2 left-1/4 w-8 h-8 bg-white bg-opacity-10 rounded-full animate-float"
                style={{ animationDelay: '2s' }}
              ></div>
            </div>
          )}

          <div className="relative z-10">
            <div className="flex justify-center mb-4 sm:mb-6">
              <span className="text-5xl sm:text-6xl lg:text-7xl animate-bounce">📜</span>
            </div>

            <h3
              className={`text-responsive-lg font-bold mb-4 sm:mb-6 ${
                contrastHigh ? 'text-contrast-text' : 'text-white'
              }`}
            >
              Découvre la grande histoire de la Bible
            </h3>

            <p
              className={`text-responsive-sm mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4 ${
                contrastHigh ? 'text-contrast-text' : 'text-indigo-100'
              }`}
            >
              Voyage à travers le temps et découvre comment toutes les histoires
              bibliques s'articulent dans le grand plan de Dieu : de la Création
              à l'Apocalypse !
            </p>

            <a
              href="/timeline-complete"
              className={`group inline-flex items-center space-x-2 sm:space-x-3 px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                contrastHigh
                  ? 'bg-contrast-text text-contrast-bg hover:opacity-80 border-2 border-contrast-text'
                  : 'bg-white text-indigo-700 hover:bg-indigo-50 shadow-xl'
              }`}
            >
              <span className="text-2xl group-hover:rotate-12 transition-transform">
                🌟
              </span>
              <span>Voir la Frise Chronologique</span>
              <span className="text-2xl group-hover:rotate-12 transition-transform">
                🌟
              </span>
            </a>

            <div
              className={`mt-6 text-sm ${
                contrastHigh ? 'text-contrast-text' : 'text-indigo-200'
              }`}
            >
              Une expérience interactive unique pour comprendre l'histoire
              sainte
            </div>
          </div>
        </div>
      </section>

      {/* Section bonus modernisée */}
      <section className="mt-12 pt-8 border-t border-gray-200 animate-slide-up">
        <div
          className={`rounded-2xl p-responsive text-center ${
            contrastHigh
              ? 'bg-contrast-bg border-2 border-contrast-text'
              : 'bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 border border-amber-200'
          }`}
        >
          <div className="flex justify-center mb-4">
            <span className="text-4xl animate-wiggle">💡</span>
          </div>

          <h3
            className={`text-responsive-md font-bold mb-4 ${
              contrastHigh ? 'text-contrast-text' : 'text-amber-800'
            }`}
          >
            Le savais-tu ?
          </h3>

          <p
            className={`text-responsive-sm leading-relaxed max-w-2xl mx-auto ${
              contrastHigh ? 'text-contrast-text' : 'text-amber-700'
            }`}
          >
            La Bible contient 66 livres écrits sur plus de 1 500 ans par une
            quarantaine d'auteurs différents. Chaque histoire nous enseigne
            quelque chose sur l'amour infini de Dieu et nous guide pour vivre
            une vie qui lui plaît.
          </p>

          <div
            className={`mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto ${
              contrastHigh ? 'text-contrast-text' : 'text-amber-600'
            }`}
          >
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
