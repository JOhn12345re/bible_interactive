import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';

const MarenhosPage = () => {
  const { contrastHigh } = useSettings();

  return (
    <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50'}`}>
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
              🎵 Ⲙⲁⲣⲉⲛϩⲱⲥ - Hymnes Coptes
            </h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
          <div className="flex items-start space-x-4 mb-4">
            <span className="text-6xl">🎵</span>
            <div>
              <h2 className={`text-3xl font-bold mb-3 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
                Ⲙⲁⲣⲉⲛϩⲱⲥ (Marenhos)
              </h2>
              <p className={`text-xl mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-purple-600'}`}>
                "Venez, chantons au Seigneur"
              </p>
            </div>
          </div>
          <p className={`text-lg leading-relaxed ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
            Marenhos est une application simple qui se concentre sur la beauté de la vie liturgique 
            de l'Église Copte Orthodoxe à travers ses hymnes. Cette application offre un accès facile 
            aux hymnes, litanies, et réponses diaconales utilisées dans la liturgie copte.
          </p>
        </div>

        {/* Fonctionnalités */}
        <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-br from-blue-100 to-purple-100 shadow-lg'}`}>
          <h2 className={`text-2xl font-bold mb-6 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
            ✨ Fonctionnalités
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fonctionnalité 1 */}
            <div className={`p-5 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-white shadow'}`}>
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-4xl">🎼</span>
                <h3 className={`text-xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-blue-900'}`}>
                  Hymnes pour la Congrégation
                </h3>
              </div>
              <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                Collection complète des hymnes liturgiques coptes pour la participation de l'assemblée.
              </p>
            </div>

            {/* Fonctionnalité 2 */}
            <div className={`p-5 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-white shadow'}`}>
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-4xl">🙏</span>
                <h3 className={`text-xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-purple-900'}`}>
                  Litanies et Réponses
                </h3>
              </div>
              <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                Toutes les litanies et réponses diaconales utilisées pendant les offices liturgiques.
              </p>
            </div>

            {/* Fonctionnalité 3 */}
            <div className={`p-5 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-white shadow'}`}>
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-4xl">📚</span>
                <h3 className={`text-xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-indigo-900'}`}>
                  Bibliothèque de Rites
                </h3>
              </div>
              <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                Accès aux différents rites et cérémonies de l'Église Copte Orthodoxe.
              </p>
            </div>

            {/* Fonctionnalité 4 */}
            <div className={`p-5 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-white shadow'}`}>
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-4xl">🎊</span>
                <h3 className={`text-xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-pink-900'}`}>
                  Hymnes de Jeûnes et Fêtes
                </h3>
              </div>
              <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                Hymnes spécifiques pour les périodes de jeûne et les grandes fêtes liturgiques.
              </p>
            </div>

            {/* Fonctionnalité 5 */}
            <div className={`p-5 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-white shadow'}`}>
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-4xl">🔖</span>
                <h3 className={`text-xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-green-900'}`}>
                  Marque-pages
                </h3>
              </div>
              <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                Enregistrez vos hymnes favoris pour un accès rapide et facile.
              </p>
            </div>

            {/* Fonctionnalité 6 */}
            <div className={`p-5 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-white shadow'}`}>
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-4xl">🔍</span>
                <h3 className={`text-xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-orange-900'}`}>
                  Recherche
                </h3>
              </div>
              <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                Trouvez rapidement n'importe quel hymne ou litanie grâce à la fonction de recherche.
              </p>
            </div>
          </div>
        </div>

        {/* Mise à jour automatique */}
        <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-green-50 border border-green-300 shadow-lg'}`}>
          <div className="flex items-start space-x-4">
            <span className="text-5xl">🔄</span>
            <div>
              <h3 className={`text-xl font-bold mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-green-900'}`}>
                Contenu Mis à Jour Régulièrement
              </h3>
              <p className={`${contrastHigh ? 'text-contrast-text' : 'text-green-800'}`}>
                Les hymnes et contenus sont ajoutés périodiquement sans nécessiter de mise à jour de l'application. 
                Profitez toujours du contenu le plus récent et complet.
              </p>
            </div>
          </div>
        </div>

        {/* Informations techniques */}
        <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
            🛠️ Technologies et Plateformes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg text-center ${contrastHigh ? 'bg-contrast-text/10' : 'bg-blue-50'}`}>
              <span className="text-4xl mb-2 block">📱</span>
              <p className={`font-bold ${contrastHigh ? 'text-contrast-text' : 'text-blue-900'}`}>Flutter/Dart</p>
              <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-blue-700'}`}>Framework principal</p>
            </div>
            <div className={`p-4 rounded-lg text-center ${contrastHigh ? 'bg-contrast-text/10' : 'bg-green-50'}`}>
              <span className="text-4xl mb-2 block">🍎</span>
              <p className={`font-bold ${contrastHigh ? 'text-contrast-text' : 'text-green-900'}`}>iOS</p>
              <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-green-700'}`}>iPhone & iPad</p>
            </div>
            <div className={`p-4 rounded-lg text-center ${contrastHigh ? 'bg-contrast-text/10' : 'bg-purple-50'}`}>
              <span className="text-4xl mb-2 block">🤖</span>
              <p className={`font-bold ${contrastHigh ? 'text-contrast-text' : 'text-purple-900'}`}>Android</p>
              <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-purple-700'}`}>Smartphones & Tablettes</p>
            </div>
          </div>
        </div>

        {/* Captures d'écran / Demo */}
        <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-br from-pink-100 to-purple-100 shadow-lg'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
            📸 Aperçu de l'Application
          </h2>
          <div className={`p-6 rounded-lg text-center ${contrastHigh ? 'bg-contrast-text/10' : 'bg-white'}`}>
            <p className={`text-lg mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
              Découvrez l'interface élégante et intuitive de Marenhos, conçue pour faciliter 
              votre participation à la liturgie copte orthodoxe.
            </p>
            <div className={`p-8 rounded-lg ${contrastHigh ? 'bg-contrast-text/20' : 'bg-gradient-to-br from-purple-200 to-pink-200'}`}>
              <span className="text-8xl">📱</span>
              <p className={`mt-4 font-medium ${contrastHigh ? 'text-contrast-text' : 'text-purple-900'}`}>
                Interface mobile optimisée pour iOS et Android
              </p>
            </div>
          </div>
        </div>

        {/* Crédits et Attribution */}
        <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 shadow-lg'}`}>
          <h2 className={`text-2xl font-bold mb-6 ${contrastHigh ? 'text-contrast-text' : 'text-orange-900'}`}>
            👨‍💻 Crédits et Remerciements
          </h2>
          
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-white'}`}>
              <p className={`text-lg mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                <strong>Développeur Principal :</strong> Abanoub Ghobrial (<a 
                  href="https://github.com/AbanoubG" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:no-underline text-blue-600"
                >
                  @AbanoubG
                </a>)
              </p>
            </div>

            <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-white'}`}>
              <p className={`mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                <strong>Dépôt GitHub :</strong> <a 
                  href="https://github.com/AbanoubG/marenhos_old" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:no-underline text-blue-600"
                >
                  github.com/AbanoubG/marenhos_old
                </a>
              </p>
            </div>

            <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-white'}`}>
              <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                <strong>Technologies :</strong> Flutter (Dart 86.8%), Ruby, Swift, Java, Kotlin
              </p>
            </div>

            <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-white'}`}>
              <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                <strong>Type :</strong> Application mobile open-source pour iOS et Android
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href="https://github.com/AbanoubG/marenhos_old"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                contrastHigh
                  ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
              }`}
            >
              📂 Code Source sur GitHub
            </a>
            <a
              href="https://github.com/AbanoubG"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                contrastHigh
                  ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                  : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl'
              }`}
            >
              👤 Profil du Développeur
            </a>
          </div>
        </div>

        {/* Comment utiliser */}
        <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
            📲 Comment Obtenir l'Application
          </h2>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-blue-50 border-l-4 border-blue-600'}`}>
              <h3 className={`font-bold mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-blue-900'}`}>
                📱 Pour Développeurs
              </h3>
              <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                Clonez le dépôt GitHub et compilez l'application avec Flutter :
              </p>
              <pre className={`mt-2 p-3 rounded text-sm overflow-x-auto ${contrastHigh ? 'bg-contrast-text/20' : 'bg-gray-800 text-green-400'}`}>
                git clone https://github.com/AbanoubG/marenhos_old.git{'\n'}
                cd marenhos_old{'\n'}
                flutter pub get{'\n'}
                flutter run
              </pre>
            </div>

            <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-purple-50 border-l-4 border-purple-600'}`}>
              <h3 className={`font-bold mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-purple-900'}`}>
                👥 Pour Utilisateurs
              </h3>
              <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                Consultez le dépôt GitHub pour les instructions d'installation spécifiques à votre plateforme 
                ou recherchez "Marenhos" sur l'App Store ou Google Play Store si une version publiée est disponible.
              </p>
            </div>
          </div>
        </div>

        {/* Note de droits d'auteur */}
        <div className={`p-6 rounded-xl ${contrastHigh ? 'bg-contrast-text/10' : 'bg-gray-100 border border-gray-300'}`}>
          <h3 className={`text-lg font-bold mb-3 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
            ⚖️ Droits d'Auteur et Licence
          </h3>
          <div className="space-y-2 text-sm">
            <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
              <strong>Copyright ©</strong> Abanoub Ghobrial et contributeurs
            </p>
            <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
              Cette application est un projet open-source. Nous présentons ce projet avec respect et attribution 
              complète à son créateur original. Tous les droits appartiennent à Abanoub Ghobrial.
            </p>
            <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
              Cette page est une présentation informative du projet Marenhos et ne constitue pas une redistribution 
              du code ou de l'application elle-même. Pour utiliser ou contribuer au projet, veuillez visiter le 
              dépôt GitHub officiel.
            </p>
            <p className={`mt-4 italic ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
              🙏 Nous remercions Abanoub Ghobrial pour son travail remarquable au service de l'Église Copte Orthodoxe 
              et pour avoir partagé cette ressource avec la communauté.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarenhosPage;
