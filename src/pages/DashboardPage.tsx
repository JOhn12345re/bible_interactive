import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';
import { useProfileStore } from '../state/profileStore';
import { useProgress } from '../state/progressStore';
import SettingsDialog from '../components/SettingsDialog';
import ProfileDialog from '../components/ProfileDialog';

export default function DashboardPage() {
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const { contrastHigh } = useSettings();
  const { profile } = useProfileStore();
  const { getAllBadges } = useProgress();
  const badges = getAllBadges();

  return (
    <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
      {/* Header avec navigation */}
      <header className={`sticky top-0 z-40 backdrop-blur-md ${contrastHigh ? 'bg-contrast-bg/95' : 'bg-white/95 shadow-sm border-b border-gray-100'}`}>
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity">
              <span className="text-2xl sm:text-3xl">📖</span>
              <div>
                <h1 className={`text-lg sm:text-2xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                  Bible Interactive
                </h1>
                <p className={`text-xs sm:text-sm hidden sm:block ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                  Plateforme spirituelle complète
                </p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Badges */}
              {badges.length > 0 && (
                <div className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-full ${
                  contrastHigh 
                    ? 'bg-contrast-text text-contrast-bg'
                    : 'bg-yellow-400 text-yellow-900 shadow-md'
                }`}>
                  <span className="text-sm sm:text-base">🏆</span>
                  <span className="font-bold text-xs sm:text-base">{badges.length}</span>
                </div>
              )}
              
              {/* Profil */}
              <button
                onClick={() => setShowProfile(true)}
                className={`px-2 sm:px-3 py-1 sm:py-2 rounded-full font-medium transition-all hover:scale-105 text-xs sm:text-base ${
                  contrastHigh 
                    ? 'bg-contrast-text text-contrast-bg'
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}
              >
                👤 <span className="hidden sm:inline">{profile?.firstName || 'Profil'}</span>
              </button>
              
              {/* Paramètres */}
              <button 
                onClick={() => setShowSettings(true)} 
                className={`p-1.5 sm:p-2 rounded-full transition-all hover:scale-110 text-lg sm:text-xl ${
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
      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Section héro */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🌟</div>
          <h2 className={`text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 ${
            contrastHigh ? 'text-contrast-text' : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
          }`}>
            Bienvenue dans l'aventure spirituelle !
          </h2>
          <p className={`text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4 ${
            contrastHigh ? 'text-contrast-text' : 'text-gray-600'
          }`}>
            Explorez toutes nos fonctionnalités pour approfondir votre foi et découvrir la richesse de la Bible.
          </p>
        </div>

        {/* Fonctionnalités principales - Grille organisée */}
        <div className="space-y-8 sm:space-y-12">
          
          {/* Section Bible & Lecture */}
          <section>
            <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
              📖 Bible & Lecture Quotidienne
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 sm:gap-6">
              
              {/* Bible Explorer */}
              <Link 
                to="/bible"
                className={`group p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  contrastHigh 
                    ? 'bg-contrast-bg border-2 border-contrast-text'
                    : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg'
                }`}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">📚</div>
                <h3 className="text-lg sm:text-lg sm:text-xl font-bold mb-2">Explorateur Bible</h3>
                <p className="text-xs sm:text-xs sm:text-sm opacity-90">
                  Naviguez dans tous les livres de la Bible avec recherche et navigation intuitive.
                </p>
              </Link>

              {/* Lecture Quotidienne */}
              <Link 
                to="/daily-reading"
                className={`group p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  contrastHigh 
                    ? 'bg-contrast-bg border-2 border-contrast-text'
                    : 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg'
                }`}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">📖</div>
                <h3 className="text-lg sm:text-lg sm:text-xl font-bold mb-2">Plan de Lecture 365</h3>
                <p className="text-xs sm:text-xs sm:text-sm opacity-90">
                  Lisez la Bible entière en 365 jours avec notre plan structuré et guidé.
                </p>
              </Link>

              {/* Verset du Jour */}
              <Link 
                to="/daily-verse"
                className={`group p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  contrastHigh 
                    ? 'bg-contrast-bg border-2 border-contrast-text'
                    : 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-lg'
                }`}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">⭐</div>
                <h3 className="text-lg sm:text-lg sm:text-xl font-bold mb-2">Versets Thématiques</h3>
                <p className="text-xs sm:text-xs sm:text-sm opacity-90">
                  Découvrez des versets par thèmes : Amour, Confiance, Force, Espoir, et plus.
                </p>
              </Link>
            </div>
          </section>

          {/* Section Croissance Spirituelle */}
          <section>
            <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
              🎯 Croissance Spirituelle
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 sm:gap-6">
              
              {/* Défis Spirituels */}
              <Link 
                to="/spiritual-challenges"
                className={`group p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  contrastHigh 
                    ? 'bg-contrast-bg border-2 border-contrast-text'
                    : 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg'
                }`}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">🎯</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Défis Spirituels</h3>
                <p className="text-xs sm:text-sm opacity-90">
                  Participez à des défis quotidiens pour approfondir votre foi et grandir spirituellement.
                </p>
              </Link>

              {/* Mémorisation de Versets */}
              <Link 
                to="/verse-memorization"
                className={`group p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  contrastHigh 
                    ? 'bg-contrast-bg border-2 border-contrast-text'
                    : 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg'
                }`}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">🧠</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Mémorisation</h3>
                <p className="text-xs sm:text-sm opacity-90">
                  Apprenez et mémorisez les versets avec des techniques interactives d'apprentissage.
                </p>
              </Link>

              {/* Journal Spirituel */}
              <Link 
                to="/journal"
                className={`group p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  contrastHigh 
                    ? 'bg-contrast-bg border-2 border-contrast-text'
                    : 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg'
                }`}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">✍️</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Journal Spirituel</h3>
                <p className="text-xs sm:text-sm opacity-90">
                  Notez vos réflexions, prières et découvertes dans votre journal personnel.
                </p>
              </Link>
            </div>
          </section>

          {/* Section Apprentissage & Jeux */}
          <section>
            <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
              🎮 Apprentissage Interactif
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              
              {/* Timeline */}
              <Link 
                to="/timeline"
                className={`group p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  contrastHigh 
                    ? 'bg-contrast-bg border-2 border-contrast-text'
                    : 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg'
                }`}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">📅</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Frise Chronologique</h3>
                <p className="text-xs sm:text-sm opacity-90">
                  Explorez l'histoire biblique de la Création à Jésus avec notre timeline interactive.
                </p>
              </Link>

              {/* Jeux Éducatifs */}
              <Link 
                to="/games"
                className={`group p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  contrastHigh 
                    ? 'bg-contrast-bg border-2 border-contrast-text'
                    : 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg'
                }`}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">🎮</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Mini-Jeux Éducatifs</h3>
                <p className="text-xs sm:text-sm opacity-90">
                  Apprenez en vous amusant avec nos puzzles, quiz et jeux interactifs bibliques.
                </p>
              </Link>

              {/* Leçons */}
              <Link 
                to="/lessons"
                className={`group p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  contrastHigh 
                    ? 'bg-contrast-bg border-2 border-contrast-text'
                    : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg'
                }`}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">📚</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Leçons Interactives</h3>
                <p className="text-xs sm:text-sm opacity-90">
                  Découvrez les histoires bibliques à travers des leçons interactives et engageantes.
                </p>
              </Link>
            </div>
          </section>

          {/* Section Traditions & Culture */}
          <section>
            <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
              ⛪ Traditions & Heritage
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              
              {/* Église Copte */}
              <Link 
                to="/coptic-church"
                className={`group p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  contrastHigh 
                    ? 'bg-contrast-bg border-2 border-contrast-text'
                    : 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg'
                }`}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">⛪</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Église Copte</h3>
                <p className="text-xs sm:text-sm opacity-90">
                  Explorez l'histoire, les saints et les traditions de l'Église copte orthodoxe.
                </p>
              </Link>

              {/* Services Liturgiques */}
              <Link 
                to="/orthodox-presenter"
                className={`group p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  contrastHigh 
                    ? 'bg-contrast-bg border-2 border-contrast-text'
                    : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg'
                }`}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">📖</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Services Liturgiques</h3>
                <p className="text-xs sm:text-sm opacity-90">
                  Prières, lectures et hymnes pour les offices et célébrations liturgiques.
                </p>
              </Link>

              {/* Katameros */}
              <Link 
                to="/katameros"
                className={`group p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  contrastHigh 
                    ? 'bg-contrast-bg border-2 border-contrast-text'
                    : 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg'
                }`}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">📜</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Lectionnaire Copte</h3>
                <p className="text-xs sm:text-sm opacity-90">
                  Lectures quotidiennes du Katameros selon le calendrier liturgique copte.
                </p>
              </Link>
            </div>
          </section>

          {/* Section Administration */}
          <section>
            <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
              ⚙️ Administration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              
              {/* Éditeur universel */}
              <Link 
                to="/universal-editor"
                className={`group p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  contrastHigh 
                    ? 'bg-contrast-bg border-2 border-contrast-text'
                    : 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-lg'
                }`}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">📝</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Éditeur Universel</h3>
                <p className="text-xs sm:text-sm opacity-90">
                  Modifiez TOUS les contenus : Histoires bibliques, Saints, Icônes, et plus encore.
                </p>
              </Link>
            </div>
          </section>

          {/* Section Médias */}
          <section>
            <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
              🎬 Médias & Ressources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Vidéos & Sermons */}
              <Link 
                to="/sermons"
                className={`group p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  contrastHigh 
                    ? 'bg-contrast-bg border-2 border-contrast-text'
                    : 'bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-lg'
                }`}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">🎬</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Vidéos & Sermons</h3>
                <p className="text-xs sm:text-sm opacity-90">
                  Regardez des vidéos inspirantes, sermons et chants chrétiens pour nourrir votre âme.
                </p>
              </Link>

              {/* Explorateur de Sujets */}
              <Link 
                to="/topics"
                className={`group p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  contrastHigh 
                    ? 'bg-contrast-bg border-2 border-contrast-text'
                    : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg'
                }`}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">🔍</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Explorateur de Sujets</h3>
                <p className="text-xs sm:text-sm opacity-90">
                  Explorez différents thèmes bibliques et spirituels avec des ressources organisées.
                </p>
              </Link>
            </div>
          </section>
        </div>

        {/* Statistiques et progression */}
        <div className={`mt-12 p-6 rounded-2xl text-center ${
          contrastHigh 
            ? 'bg-contrast-bg border-2 border-contrast-text'
            : 'bg-gradient-to-br from-green-50 to-blue-50 border border-green-200'
        }`}>
          <h3 className={`text-xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
            Votre Progression Spirituelle
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-blue-600">365</div>
              <div className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>Jours de lecture</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">30+</div>
              <div className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>Versets thématiques</div>
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
        <div className={`mt-8 p-6 rounded-2xl text-center ${
          contrastHigh 
            ? 'bg-contrast-bg border-2 border-contrast-text'
            : 'bg-gradient-to-br from-blue-100 to-purple-100'
        }`}>
          <div className="text-4xl mb-3">🎯</div>
          <h3 className={`text-lg sm:text-xl font-bold mb-2 ${
            contrastHigh ? 'text-contrast-text' : 'text-gray-800'
          }`}>
            {badges.length === 0 ? 'Commencez votre voyage spirituel !' : 'Continuez votre croissance spirituelle !'}
          </h3>
          <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
            {badges.length === 0 
              ? "Explorez nos fonctionnalités et commencez votre aventure spirituelle dès aujourd'hui !" 
              : `Félicitations ! Vous avez ${badges.length} badge${badges.length > 1 ? 's' : ''}. Continuez à explorer et grandir dans la foi !`
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
