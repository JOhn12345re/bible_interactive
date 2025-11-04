import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';
import { useProfileStore } from '../state/profileStore';
import { useProgress } from '../state/progressStore';
import SettingsDialog from '../components/SettingsDialog';
import ProfileDialog from '../components/ProfileDialog';

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const { contrastHigh } = useSettings();
  const { profile, isProfileComplete } = useProfileStore();
  const { getAllBadges } = useProgress();
  const badges = getAllBadges();

  return (
    <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
      {/* Header simple et épuré */}
      <header className={`sticky top-0 z-40 backdrop-blur-md ${contrastHigh ? 'bg-contrast-bg/95' : 'bg-white/95 shadow-sm border-b border-gray-100'}`}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">📖</span>
              <div>
                <h1 className={`text-2xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                  Bible Interactive
                </h1>
                <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                  Découverte biblique pour enfants
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Badges */}
              {badges.length > 0 && (
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-full ${
                  contrastHigh 
                    ? 'bg-contrast-text text-contrast-bg'
                    : 'bg-yellow-400 text-yellow-900 shadow-md'
                }`}>
                  <span>🏆</span>
                  <span className="font-bold">{badges.length}</span>
                </div>
              )}
              
              {/* Profil */}
              <button
                onClick={() => setShowProfile(true)}
                className={`px-3 py-2 rounded-full font-medium transition-all hover:scale-105 ${
                  contrastHigh 
                    ? 'bg-contrast-text text-contrast-bg'
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}
              >
                👤 {profile?.firstName || 'Profil'}
              </button>
              
              {/* Paramètres */}
              <button 
                onClick={() => setShowSettings(true)} 
                className={`p-2 rounded-full transition-all hover:scale-110 ${
                  contrastHigh ? 'hover:bg-contrast-text/20' : 'hover:bg-gray-200'
                }`}
              >
                ⚙️
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Section héro simplifiée */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🌟</div>
          <h2 className={`text-4xl font-bold mb-4 ${
            contrastHigh ? 'text-contrast-text' : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
          }`}>
            Bienvenue dans l'aventure !
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            contrastHigh ? 'text-contrast-text' : 'text-gray-600'
          }`}>
            Découvre les plus belles histoires de la Bible à travers des jeux interactifs et des activités amusantes.
          </p>
        </div>

        {/* Actions principales - Grille simple */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Timeline */}
          <Link 
            to="/timeline"
            className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              contrastHigh 
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg'
            }`}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📅</div>
            <h3 className="text-xl font-bold mb-2">Frise Chronologique</h3>
            <p className="text-sm opacity-90">
              Voyage dans le temps de la Création à Jésus avec notre timeline interactive !
            </p>
          </Link>

          {/* Jeux */}
          <Link 
            to="/games"
            className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              contrastHigh 
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg'
            }`}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎮</div>
            <h3 className="text-xl font-bold mb-2">Mini-Jeux</h3>
            <p className="text-sm opacity-90">
              Puzzles, quiz et défis pour tester tes connaissances en s'amusant !
            </p>
          </Link>

          {/* Bible Explorer */}
          <Link 
            to="/bible"
            className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              contrastHigh 
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-lg'
            }`}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📖</div>
            <h3 className="text-xl font-bold mb-2">Explorateur Bible</h3>
            <p className="text-sm opacity-90">
              Navigue dans les livres et découvre des versets inspirants !
            </p>
          </Link>

          {/* Vidéos */}
          <Link 
            to="/sermons"
            className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              contrastHigh 
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-lg'
            }`}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎬</div>
            <h3 className="text-xl font-bold mb-2">Vidéos & Chants</h3>
            <p className="text-sm opacity-90">
              Regarde des vidéos et écoute de beaux chants chrétiens !
            </p>
          </Link>

          {/* Journal */}
          <Link 
            to="/journal"
            className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              contrastHigh 
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg'
            }`}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">✍️</div>
            <h3 className="text-xl font-bold mb-2">Mon Journal</h3>
            <p className="text-sm opacity-90">
              Écris tes pensées et tes découvertes spirituelles !
            </p>
          </Link>

          {/* Histoire de l'Église Copte */}
          <Link 
            to="/coptic-church"
            className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              contrastHigh 
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg'
            }`}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">⛪</div>
            <h3 className="text-xl font-bold mb-2">Église Copte</h3>
            <p className="text-sm opacity-90">
              Découvre l'histoire, les saints et l'art de l'Église copte orthodoxe !
            </p>
          </Link>

          {/* Histoire de l'Église Copte */}
          <Link 
            to="/christian-history"
            className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              contrastHigh 
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-lg'
            }`}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">⛪</div>
            <h3 className="text-xl font-bold mb-2">Histoire Copte</h3>
            <p className="text-sm opacity-90">
              2000 ans d'histoire de l'Église d'Alexandrie !
            </p>
          </Link>

          {/* Orthodox Presenter */}
          <Link 
            to="/orthodox-presenter"
            className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              contrastHigh 
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg'
            }`}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📖</div>
            <h3 className="text-xl font-bold mb-2">Services Liturgiques</h3>
            <p className="text-sm opacity-90">
              Prières, lectures et hymnes pour les offices !
            </p>
          </Link>

          {/* Katameros */}
          <Link 
            to="/katameros"
            className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              contrastHigh 
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg'
            }`}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📜</div>
            <h3 className="text-xl font-bold mb-2">Lectionnaire Copte</h3>
            <p className="text-sm opacity-90">
              Lectures quotidiennes du Katameros (Ⲕⲁⲧⲁⲙⲉⲣⲟⲥ) !
            </p>
          </Link>

          {/* Marenhos */}
          <Link 
            to="/marenhos"
            className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              contrastHigh 
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg'
            }`}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎵</div>
            <h3 className="text-xl font-bold mb-2">Hymnes Coptes</h3>
            <p className="text-sm opacity-90">
              Marenhos (Ⲙⲁⲣⲉⲛϩⲱⲥ) - Application d'hymnes liturgiques !
            </p>
          </Link>
        </div>

        {/* Statistiques rapides */}
        <div className={`p-6 rounded-2xl text-center mb-8 ${
          contrastHigh 
            ? 'bg-contrast-bg border-2 border-contrast-text'
            : 'bg-gradient-to-br from-green-50 to-blue-50 border border-green-200'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-blue-600">12+</div>
              <div className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>Histoires</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">15+</div>
              <div className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>Mini-jeux</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{badges.length}</div>
              <div className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>Badges obtenus</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">∞</div>
              <div className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>Découvertes</div>
            </div>
          </div>
        </div>

        {/* Message d'encouragement */}
        <div className={`p-6 rounded-2xl text-center ${
          contrastHigh 
            ? 'bg-contrast-bg border-2 border-contrast-text'
            : 'bg-gradient-to-br from-blue-100 to-purple-100'
        }`}>
          <div className="text-4xl mb-3">🎯</div>
          <h3 className={`text-xl font-bold mb-2 ${
            contrastHigh ? 'text-contrast-text' : 'text-gray-800'
          }`}>
            {badges.length === 0 ? 'Prêt pour l\'aventure ?' : 'Continue ton aventure !'}
          </h3>
          <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
            {badges.length === 0 
              ? "Commence par une histoire pour obtenir ton premier badge !" 
              : `Félicitations ! Tu as ${badges.length} badge${badges.length > 1 ? 's' : ''}. Continue à explorer !`
            }
          </p>
        </div>
      </main>

      {/* Dialogs */}
      <SettingsDialog isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <ProfileDialog isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  );
}