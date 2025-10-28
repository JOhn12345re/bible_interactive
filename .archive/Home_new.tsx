import React, { useState } from 'react';
import { useSettings } from '../state/settingsStore';
import { useProfileStore } from '../state/profileStore';
import { useProgress } from '../state/progressStore';
import SettingsDialog from '../components/SettingsDialog';
import ProfileDialog from '../components/ProfileDialog';
import ActionCard from '../components/ui/ActionCard';

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
    <div
      className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}
    >
      {/* Header simplifié */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md ${contrastHigh ? 'bg-contrast-bg/95' : 'bg-white/95 shadow-sm border-b border-gray-100'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <span className="text-3xl animate-pulse">📖</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1
                  className={`text-xl sm:text-2xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}
                >
                  Bible Interactive
                </h1>
                <p
                  className={`text-xs ${contrastHigh ? 'text-contrast-text' : 'text-gray-500'}`}
                >
                  Pour les 6-12 ans
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Badges indicator */}
              {badges.length > 0 && (
                <div
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full ${
                    contrastHigh
                      ? 'bg-contrast-text text-contrast-bg'
                      : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg'
                  }`}
                >
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
                <span className="hidden sm:inline">
                  {profile?.firstName || 'Profil'}
                </span>
              </button>

              {/* Settings button */}
              <button
                onClick={() => setShowSettings(true)}
                className={`p-2 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-90 ${
                  contrastHigh
                    ? 'hover:bg-contrast-text/20'
                    : 'hover:bg-gray-200'
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
          <h2
            className={`text-3xl sm:text-4xl font-bold mb-4 ${
              contrastHigh
                ? 'text-contrast-text'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
            }`}
          >
            Bienvenue dans ton Aventure !
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              contrastHigh ? 'text-contrast-text' : 'text-gray-600'
            }`}
          >
            Découvre les histoires de la Bible à travers des jeux et des
            activités amusantes.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div
            className={`text-center p-4 rounded-2xl ${
              contrastHigh
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg'
            }`}
          >
            <div className="text-2xl mb-2">📚</div>
            <div className="font-bold">12+</div>
            <div className="text-xs opacity-90">Histoires</div>
          </div>
          <div
            className={`text-center p-4 rounded-2xl ${
              contrastHigh
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg'
            }`}
          >
            <div className="text-2xl mb-2">🎮</div>
            <div className="font-bold">8+</div>
            <div className="text-xs opacity-90">Jeux</div>
          </div>
          <div
            className={`text-center p-4 rounded-2xl ${
              contrastHigh
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg'
            }`}
          >
            <div className="text-2xl mb-2">🏆</div>
            <div className="font-bold">{badges.length}</div>
            <div className="text-xs opacity-90">Badges</div>
          </div>
          <div
            className={`text-center p-4 rounded-2xl ${
              contrastHigh
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-lg'
            }`}
          >
            <div className="text-2xl mb-2">✨</div>
            <div className="font-bold">∞</div>
            <div className="text-xs opacity-90">Découvertes</div>
          </div>
        </div>

        {/* Main Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <ActionCard
            to="/lessons"
            icon="📚"
            title="Histoires Bibliques"
            description="Découvre les plus belles histoires avec des animations et des quiz."
            colorClass="bg-gradient-to-br from-blue-500 to-indigo-600"
          />
          <ActionCard
            to="/games"
            icon="🎮"
            title="Mini-Jeux"
            description="Teste tes connaissances avec des puzzles et des défis amusants."
            colorClass="bg-gradient-to-br from-purple-500 to-pink-600"
          />
                      title="Chronologie Complète"
          <ActionCard
            to="/bible"
            icon="📖"
            title="Explorateur Bible"
            description="Navigue dans les livres et découvre des versets."
            colorClass="bg-gradient-to-br from-yellow-500 to-orange-600"
          />
          <ActionCard
            to="/sermons"
            icon="🎬"
            title="Vidéos & Chants"
            description="Regarde des vidéos et écoute de beaux chants."
            colorClass="bg-gradient-to-br from-red-500 to-rose-600"
          />
          <ActionCard
            to="/journal"
            icon="✍️"
            title="Mon Journal Secret"
            description="Écris tes pensées et tes découvertes spirituelles."
            colorClass="bg-gradient-to-br from-sky-500 to-cyan-600"
          />
        </div>

        {/* Accordion Sections */}
        <div className="space-y-4">
          {/* Section Outils Avancés */}
          <div
            className={`rounded-2xl overflow-hidden shadow-lg ${
              contrastHigh
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-white border border-gray-200'
            }`}
          >
            <button
              onClick={() => toggleSection('tools')}
              className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${
                contrastHigh ? 'hover:bg-contrast-text/10' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🛠️</span>
                <div className="text-left">
                  <h3
                    className={`font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}
                  >
                    Outils Avancés
                  </h3>
                  <p
                    className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-500'}`}
                  >
                    Fonctions spéciales pour explorer plus loin
                  </p>
                </div>
              </div>
              <span
                className={`text-2xl transform transition-transform ${
                  expandedSection === 'tools' ? 'rotate-180' : ''
                }`}
              >
                ⌄
              </span>
            </button>

            {expandedSection === 'tools' && (
              <div
                className={`px-6 pb-6 border-t ${
                  contrastHigh ? 'border-contrast-text/20' : 'border-gray-100'
                }`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <ActionCard
                    to="/topics"
                    icon="🔍"
                    title="Thèmes Bibliques"
                    description="Explore par sujets et thématiques."
                    colorClass="bg-gradient-to-br from-indigo-500 to-blue-600"
                    className="h-32"
                  />
                  <ActionCard
                    to="/test-bible"
                    icon="📖"
                    title="Bible Louis Segond"
                    description="Version complète pour lecture approfondie."
                    colorClass="bg-gradient-to-br from-green-500 to-emerald-600"
                    className="h-32"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section Communauté */}
          <div
            className={`rounded-2xl overflow-hidden shadow-lg ${
              contrastHigh
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-white border border-gray-200'
            }`}
          >
            <button
              onClick={() => toggleSection('community')}
              className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${
                contrastHigh ? 'hover:bg-contrast-text/10' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">👥</span>
                <div className="text-left">
                  <h3
                    className={`font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}
                  >
                    Partage & Découverte
                  </h3>
                  <p
                    className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-500'}`}
                  >
                    Fonctions de recherche et de partage
                  </p>
                </div>
              </div>
              <span
                className={`text-2xl transform transition-transform ${
                  expandedSection === 'community' ? 'rotate-180' : ''
                }`}
              >
                ⌄
              </span>
            </button>

            {expandedSection === 'community' && (
              <div
                className={`px-6 pb-6 border-t ${
                  contrastHigh ? 'border-contrast-text/20' : 'border-gray-100'
                }`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <button
                    className={`p-4 rounded-xl text-left transition-all hover:scale-105 ${
                      contrastHigh
                        ? 'bg-contrast-text text-contrast-bg'
                        : 'bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🔍</span>
                      <div>
                        <h4 className="font-bold">Recherche de Versets</h4>
                        <p className="text-sm opacity-90">
                          Trouve des passages par mots-clés
                        </p>
                      </div>
                    </div>
                  </button>
                  <button
                    className={`p-4 rounded-xl text-left transition-all hover:scale-105 ${
                      contrastHigh
                        ? 'bg-contrast-text text-contrast-bg'
                        : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🌍</span>
                      <div>
                        <h4 className="font-bold">Traductions</h4>
                        <p className="text-sm opacity-90">
                          Compare différentes versions
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Encouragement Section */}
        <div
          className={`mt-12 p-6 rounded-2xl text-center ${
            contrastHigh
              ? 'bg-contrast-bg border-2 border-contrast-text'
              : 'bg-gradient-to-br from-green-50 to-blue-50 border border-green-200'
          }`}
        >
          <div className="text-4xl mb-4">🌟</div>
          <h3
            className={`text-xl font-bold mb-2 ${
              contrastHigh ? 'text-contrast-text' : 'text-green-800'
            }`}
          >
            Continue ton Aventure !
          </h3>
          <p
            className={`${
              contrastHigh ? 'text-contrast-text' : 'text-green-700'
            }`}
          >
            {badges.length === 0
              ? "Commence par l'histoire de Jonas pour obtenir ton premier badge !"
              : `Bravo ! Tu as déjà ${badges.length} badge${badges.length > 1 ? 's' : ''}. Continue à explorer !`}
          </p>
        </div>
      </main>

      {/* Dialogs */}
      <SettingsDialog
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
      <ProfileDialog
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </div>
  );
}
