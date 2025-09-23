import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';
import { useProfileStore } from '../state/profileStore';
import { useProgress } from '../state/progressStore';
import SettingsDialog from '../components/SettingsDialog';
import ProfileDialog from '../components/ProfileDialog';
import ActionCard from '../components/ui/ActionCard';
import ProfileWidget from '../components/ProfileWidget';

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const { contrastHigh } = useSettings();
  const { profile, isProfileComplete } = useProfileStore();
  const { getAllBadges } = useProgress();
  const badges = getAllBadges();

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
      {/* Header simplifié */}
      <header className={`sticky top-0 z-40 backdrop-blur-md ${contrastHigh ? 'bg-contrast-bg/95' : 'bg-white/95 shadow-sm border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <span className="text-3xl animate-pulse">📖</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className={`text-xl sm:text-2xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                  Bible Interactive
                </h1>
                <p className={`text-xs ${contrastHigh ? 'text-contrast-text' : 'text-gray-500'}`}>
                  Pour les 6-12 ans
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Badges indicator */}
              {badges.length > 0 && (
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-full ${
                  contrastHigh 
                    ? 'bg-contrast-text text-contrast-bg'
                    : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg'
                }`}>
                  <span className="text-lg animate-bounce">🏆</span>
                  <span className="font-bold text-sm">{badges.length}</span>
                </div>
              )}
              
              {/* Profile button */}
              <button
                onClick={() => setShowProfile(true)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 ${
                  isProfileComplete
                    ? contrastHigh 
                      ? 'bg-contrast-text text-contrast-bg'
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                    : contrastHigh
                      ? 'bg-contrast-text text-contrast-bg'
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                }`}
              >
                <span>{isProfileComplete ? '👤' : '⚠️'}</span>
                <span className="hidden sm:inline">{profile?.firstName || 'Profil'}</span>
              </button>
              
              {/* Settings button */}
              <button 
                onClick={() => setShowSettings(true)} 
                className={`p-2 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-90 ${
                  contrastHigh ? 'hover:bg-contrast-text/20' : 'hover:bg-gray-200'
                }`}
              >
                <span className="text-xl">⚙️</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <span className="text-3xl">🌟</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
            contrastHigh ? 'text-contrast-text' : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
          }`}>
            Bienvenue dans ton Aventure !
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            contrastHigh ? 'text-contrast-text' : 'text-gray-600'
          }`}>
            Découvre les histoires de la Bible à travers des jeux et des activités amusantes.
          </p>
        </div>

        {/* Widget de profil */}
        <div className="mb-8 max-w-md mx-auto">
          <ProfileWidget />
        </div>

        {/* Sections principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <ActionCard
            to="/games"
            icon="🎮"
            title="Jeux interactifs"
            description="Puzzles, défis et mini-jeux bibliques."
            colorClass="bg-gradient-to-br from-purple-500 to-pink-600"
          />
          <ActionCard
            to="/bible"
            icon="📖"
            title="Service Bible"
            description="Lire et chercher des versets par livre et chapitre."
            colorClass="bg-gradient-to-br from-yellow-500 to-orange-600"
          />
          <ActionCard
            to="/topics"
            icon="🔍"
            title="Explorateur de thèmes"
            description="Découvrir des sujets bibliques et versets associés."
            colorClass="bg-gradient-to-br from-indigo-500 to-blue-600"
          />
        </div>

        {/* Psaume du jour */}
        <div className={`${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white border border-gray-200'} rounded-2xl p-6 mb-12`}>
          <h3 className={`text-xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>Psaume du jour</h3>
          <div className="max-w-2xl mx-auto">
            <Link to="/bible" className={`${contrastHigh ? 'text-contrast-text underline' : 'text-blue-600 underline'}`}>
              Voir les psaumes du jour dans le Service Bible →
            </Link>
          </div>
        </div>

        {/* Encouragement Section */}
        <div className={`${
          contrastHigh 
            ? 'bg-contrast-bg border-2 border-contrast-text'
            : 'bg-gradient-to-br from-green-50 to-blue-50 border border-green-200'
        } mt-12 p-6 rounded-2xl text-center`}>
          <div className="text-4xl mb-4">🌟</div>
          <h3 className={`text-xl font-bold mb-2 ${
            contrastHigh ? 'text-contrast-text' : 'text-green-800'
          }`}>
            Continue ton Aventure !
          </h3>
          <p className={`${
            contrastHigh ? 'text-contrast-text' : 'text-green-700'
          }`}>
            {badges.length === 0 
              ? "Commence par l'histoire de Jonas pour obtenir ton premier badge !" 
              : `Bravo ! Tu as déjà ${badges.length} badge${badges.length > 1 ? 's' : ''}. Continue à explorer !`}
          </p>
        </div>
      </main>

      {/* Dialogs */}
      <SettingsDialog isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <ProfileDialog isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  );
}