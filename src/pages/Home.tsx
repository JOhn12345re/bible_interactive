import { useState } from 'react';
import { useSettings } from '../state/settingsStore';
import { useProgress } from '../state/progressStore';
import { useProfileStore } from '../state/profileStore';
import Menu from '../components/Menu';
import SettingsDialog from '../components/SettingsDialog';
import Journal from '../components/Journal';
import VerseSearch from '../components/VerseSearch';
import ProfileDialog from '../components/ProfileDialog';
import { BibleApiTest } from '../components/BibleApiTest';
import TranslationSelector from '../components/TranslationSelector';
import FrenchBibleSelector from '../components/FrenchBibleSelector';
import { Link } from 'react-router-dom';

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [showVerseSearch, setShowVerseSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showBibleApiTest, setShowBibleApiTest] = useState(false);
  const [showTranslationSelector, setShowTranslationSelector] = useState(false);
  const [showFrenchBibleSelector, setShowFrenchBibleSelector] = useState(false);
  const { contrastHigh } = useSettings();
  const { getAllBadges } = useProgress();
  const { profile, isProfileComplete } = useProfileStore();
  const badges = getAllBadges();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* En-tête héroïque */}
      <header className={`relative overflow-hidden ${
        contrastHigh ? 'bg-contrast-bg border-b-2 border-contrast-text' : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700'
      }`}>
        {/* Éléments décoratifs animés */}
        {!contrastHigh && (
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-float"></div>
            <div className="absolute top-20 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-10 right-1/3 w-14 h-14 bg-white bg-opacity-10 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
          </div>
        )}
        
        <div className="relative max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left lg:flex-1 animate-slide-left">
              <h1 className={`text-4xl lg:text-6xl font-bold mb-4 ${
                contrastHigh ? 'text-contrast-text' : 'text-white'
              }`}>
                <span className="inline-block animate-float">📖</span>
                <span className="ml-3 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Bible Interactive
                </span>
              </h1>
              <p className={`text-xl lg:text-2xl mb-6 ${
                contrastHigh ? 'text-contrast-text' : 'text-blue-100'
              }`}>
                Découvre les histoires sacrées à travers des jeux interactifs et des aventures captivantes
              </p>
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm ${
                contrastHigh 
                  ? 'bg-contrast-text text-contrast-bg'
                  : 'bg-white bg-opacity-20 text-white backdrop-blur-sm'
              }`}>
                <span>✨</span>
                <span>Adapté aux enfants de 6-12 ans</span>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6 mt-8 lg:mt-0 animate-slide-right">
              {/* Profil utilisateur */}
              <button
                onClick={() => setShowProfile(true)}
                className={`group flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  contrastHigh
                    ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
                    : isProfileComplete
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                    : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700'
                }`}
                aria-label="Gérer mon profil"
              >
                <span className="text-xl group-hover:rotate-12 transition-transform duration-300">
                  {isProfileComplete ? '👤' : '⚠️'}
                </span>
                <span>
                  {isProfileComplete 
                    ? `${profile?.firstName} ${profile?.lastName}` 
                    : 'Compléter profil'
                  }
                </span>
              </button>

              {/* Indicateur de badges avec animation */}
              {badges.length > 0 && (
                <div className={`flex items-center space-x-3 px-6 py-3 rounded-full transform hover:scale-105 transition-all duration-300 ${
                  contrastHigh 
                    ? 'bg-contrast-text text-contrast-bg'
                    : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg hover:shadow-xl'
                }`}>
                  <span className="text-2xl animate-bounce">🏆</span>
                  <div className="text-center">
                    <span className="font-bold text-lg">{badges.length}</span>
                    <p className="text-xs opacity-90">Badge{badges.length > 1 ? 's' : ''}</p>
                  </div>
                </div>
              )}

              {/* Bouton Journal modernisé */}
              <button
                onClick={() => setShowJournal(true)}
                className={`group flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  contrastHigh
                    ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                }`}
                aria-label="Ouvrir mon journal"
              >
                <span className="text-xl group-hover:rotate-12 transition-transform duration-300">📖</span>
                <span>Mon Journal</span>
              </button>

              {/* Bouton Recherche de Versets */}
              <button
                onClick={() => setShowVerseSearch(true)}
                className={`group flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  contrastHigh
                    ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
                    : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700'
                }`}
                aria-label="Rechercher des versets"
              >
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">🔍</span>
                <span>Versets</span>
              </button>

              {/* Bouton Sermons & Chants */}
              <Link
                to="/sermons"
                className={`group flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  contrastHigh
                    ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
                    : 'bg-gradient-to-r from-red-500 to-orange-600 text-white hover:from-red-600 hover:to-orange-700'
                }`}
                aria-label="Voir les sermons et chants"
              >
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">🎬</span>
                <span>Sermons & Chants</span>
              </Link>

              {/* Lien Explorateur de la Bible */}
              <Link
                to="/bible"
                className={`group flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  contrastHigh
                    ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
                    : 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:from-indigo-600 hover:to-blue-700'
                }`}
                aria-label="Explorer la Bible"
              >
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">📚</span>
                <span>Explorer la Bible</span>
              </Link>

              {/* Bouton Sélecteur de Traduction */}
              <button
                onClick={() => setShowTranslationSelector(true)}
                className={`group flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  contrastHigh
                    ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                }`}
                aria-label="Choisir la traduction biblique"
              >
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">📚</span>
                <span>Traduction</span>
              </button>




              {/* Bouton Bible Louis Segond 1910 */}
              <button
                onClick={() => setShowFrenchBibleSelector(true)}
                className={`group flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  contrastHigh
                    ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
                    : 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700'
                }`}
                aria-label="Voir la Bible Louis Segond 1910"
              >
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">🇫🇷</span>
                <span>Bible Louis Segond 1910</span>
              </button>


              {/* Bouton Test API Bible - Temporairement désactivé */}
              {false && (
                <button
                  onClick={() => setShowBibleApiTest(true)}
                  className={`group flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                    contrastHigh
                      ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
                      : 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:from-yellow-600 hover:to-orange-700'
                  }`}
                  aria-label="Tester l'API Bible"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">🧪</span>
                  <span>Test API</span>
                </button>
              )}

              {/* Bouton Test Bible Louis Segond */}
              <Link
                to="/test-bible"
                className={`group flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  contrastHigh
                    ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
                    : 'bg-gradient-to-r from-green-500 to-teal-600 text-white hover:from-green-600 hover:to-teal-700'
                }`}
                aria-label="Tester la Bible Louis Segond"
              >
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">📖</span>
                <span>Test Bible LSG</span>
              </Link>

              {/* Bouton Réglages modernisé */}
              <button
                onClick={() => setShowSettings(true)}
                className={`group flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  contrastHigh
                    ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
                }`}
                aria-label="Ouvrir les réglages"
              >
                <span className="text-xl group-hover:rotate-180 transition-transform duration-500">⚙️</span>
                <span>Réglages</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Section statistiques rapides */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-slide-up">
          <div className={`p-6 rounded-2xl text-center transform hover:scale-105 transition-all duration-300 ${
            contrastHigh 
              ? 'bg-contrast-bg border-2 border-contrast-text'
              : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl'
          }`}>
            <div className="text-4xl mb-3 animate-bounce">📚</div>
            <h3 className="text-xl font-bold mb-2">12+ Histoires</h3>
            <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-blue-100'}`}>
              Découvre les plus belles histoires bibliques
            </p>
          </div>
          
          <div className={`p-6 rounded-2xl text-center transform hover:scale-105 transition-all duration-300 ${
            contrastHigh 
              ? 'bg-contrast-bg border-2 border-contrast-text'
              : 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl'
          }`}>
            <div className="text-4xl mb-3 animate-bounce" style={{animationDelay: '0.2s'}}>🎮</div>
            <h3 className="text-xl font-bold mb-2">Jeux Interactifs</h3>
            <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-purple-100'}`}>
              Apprends en jouant et en t'amusant
            </p>
          </div>
          
          <div className={`p-6 rounded-2xl text-center transform hover:scale-105 transition-all duration-300 ${
            contrastHigh 
              ? 'bg-contrast-bg border-2 border-contrast-text'
              : 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl'
          }`}>
            <div className="text-4xl mb-3 animate-bounce" style={{animationDelay: '0.4s'}}>🏆</div>
            <h3 className="text-xl font-bold mb-2">Badges & Récompenses</h3>
            <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-green-100'}`}>
              Collectionne des badges uniques
            </p>
          </div>
        </section>

        {/* Message de bienvenue modernisé */}
        <section className={`mb-12 p-8 rounded-3xl relative overflow-hidden animate-fade-scale ${
          contrastHigh 
            ? 'bg-contrast-bg border-2 border-contrast-text'
            : 'bg-gradient-to-br from-indigo-50 via-white to-cyan-50 border border-gray-200 shadow-xl'
        }`}>
          {/* Éléments décoratifs */}
          {!contrastHigh && (
            <div className="absolute top-4 right-4 text-6xl opacity-10 animate-pulse-slow">🌟</div>
          )}
          
          <div className="relative">
            <h2 className={`text-3xl lg:text-4xl font-bold mb-6 ${
              contrastHigh ? 'text-contrast-text' : 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'
            }`}>
              🌟 Bienvenue dans ton aventure biblique !
            </h2>
            <p className={`text-xl leading-relaxed mb-6 ${
              contrastHigh ? 'text-contrast-text' : 'text-gray-700'
            }`}>
              Explore les histoires sacrées de la tradition chrétienne orthodoxe à travers des
              jeux interactifs et des activités éducatives passionnantes. Chaque leçon terminée 
              te rapportera des badges et des étoiles pour célébrer tes découvertes spirituelles.
            </p>
            
            {badges.length === 0 ? (
              <div className={`p-6 rounded-2xl backdrop-blur-sm ${
                contrastHigh 
                  ? 'border border-contrast-text bg-contrast-bg'
                  : 'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 shadow-inner'
              }`}>
                <div className="flex items-start space-x-4">
                  <span className="text-3xl animate-bounce">💡</span>
                  <div>
                    <h3 className={`font-bold text-lg mb-2 ${
                      contrastHigh ? 'text-contrast-text' : 'text-amber-800'
                    }`}>
                      Commence ton aventure !
                    </h3>
                    <p className={`${
                      contrastHigh ? 'text-contrast-text' : 'text-amber-700'
                    }`}>
                      L'histoire de <strong>Jonas et le grand poisson</strong> t'attend pour obtenir ton premier badge. 
                      Une aventure extraordinaire de foi et de pardon !
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`p-6 rounded-2xl ${
                contrastHigh 
                  ? 'bg-contrast-text text-contrast-bg'
                  : 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200'
              }`}>
                <div className="flex items-center space-x-4">
                  <span className="text-3xl animate-bounce">🎉</span>
                  <div>
                    <h3 className={`font-bold text-lg mb-1 ${
                      contrastHigh ? 'text-contrast-bg' : 'text-green-800'
                    }`}>
                      Félicitations !
                    </h3>
                    <p className={`${
                      contrastHigh ? 'text-contrast-bg' : 'text-green-700'
                    }`}>
                      Tu as déjà obtenu {badges.length} badge{badges.length > 1 ? 's' : ''} ! Continue ton exploration des merveilles bibliques.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Menu des leçons */}
        <Menu />


        {/* Informations légales modernisées */}
        <footer className={`mt-16 pt-12 border-t animate-slide-up ${
          contrastHigh 
            ? 'border-contrast-text text-contrast-text'
            : 'border-gray-200'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className={`text-center p-6 rounded-2xl ${
              contrastHigh 
                ? 'bg-contrast-bg border border-contrast-text'
                : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100'
            }`}>
              <div className="text-3xl mb-3">🔒</div>
              <h3 className={`font-bold mb-2 ${
                contrastHigh ? 'text-contrast-text' : 'text-blue-800'
              }`}>
                Confidentialité totale
              </h3>
              <p className={`text-sm ${
                contrastHigh ? 'text-contrast-text' : 'text-blue-600'
              }`}>
                Tes données restent privées et sont stockées uniquement sur ton appareil.
              </p>
            </div>
            
            <div className={`text-center p-6 rounded-2xl ${
              contrastHigh 
                ? 'bg-contrast-bg border border-contrast-text'
                : 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100'
            }`}>
              <div className="text-3xl mb-3">📖</div>
              <h3 className={`font-bold mb-2 ${
                contrastHigh ? 'text-contrast-text' : 'text-purple-800'
              }`}>
                Contenu authentique
              </h3>
              <p className={`text-sm ${
                contrastHigh ? 'text-contrast-text' : 'text-purple-600'
              }`}>
                Les textes bibliques utilisés respectent le domaine public et la tradition.
              </p>
            </div>
            
            <div className={`text-center p-6 rounded-2xl ${
              contrastHigh 
                ? 'bg-contrast-bg border border-contrast-text'
                : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100'
            }`}>
              <div className="text-3xl mb-3">✝️</div>
              <h3 className={`font-bold mb-2 ${
                contrastHigh ? 'text-contrast-text' : 'text-green-800'
              }`}>
                Tradition respectée
              </h3>
              <p className={`text-sm ${
                contrastHigh ? 'text-contrast-text' : 'text-green-600'
              }`}>
                Développé avec respect pour la tradition chrétienne orthodoxe.
              </p>
            </div>
          </div>
          
          <div className={`text-center py-6 border-t ${
            contrastHigh 
              ? 'border-contrast-text text-contrast-text'
              : 'border-gray-200 text-gray-500'
          }`}>
            <p className="text-sm italic">
              "La délivrance vient du Seigneur." - Jonas 2:9
            </p>
          </div>
        </footer>
      </main>

      {/* Dialogs */}
      <SettingsDialog 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
      <Journal 
        isOpen={showJournal} 
        onClose={() => setShowJournal(false)} 
      />
      <ProfileDialog 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)} 
      />
      
      {/* Dialog de recherche de versets */}
      {showVerseSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <VerseSearch onClose={() => setShowVerseSearch(false)} />
          </div>
        </div>
      )}

      {/* Dialog Sélecteur de Traduction */}
      {showTranslationSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-white rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Choisir la traduction biblique</h2>
                <button
                  onClick={() => setShowTranslationSelector(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <TranslationSelector />
            </div>
          </div>
        </div>
      )}


      {/* Dialog Sélecteur de Bible Française */}
      {showFrenchBibleSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-white rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">🇫🇷 Bible Louis Segond 1910</h2>
                <button
                  onClick={() => setShowFrenchBibleSelector(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <FrenchBibleSelector />
            </div>
          </div>
        </div>
      )}


      {/* Dialog de test API Bible - Temporairement désactivé */}
      {false && showBibleApiTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-white rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Test de l'API Bible</h2>
                <button
                  onClick={() => setShowBibleApiTest(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              {showBibleApiTest && <BibleApiTest />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
