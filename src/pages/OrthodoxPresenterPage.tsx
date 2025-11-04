import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';

const OrthodoxPresenterPage = () => {
  const { contrastHigh } = useSettings();

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
              ⛪ Orthodox Presenter
            </h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
            📖 Présentateur pour Services Liturgiques
          </h2>
          <p className={`text-lg leading-relaxed mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
            Orthodox Presenter est une application web open-source conçue pour les services de l'Église Copte Orthodoxe. 
            Elle affiche automatiquement les prières, lectures, commémorations des saints et hymnes appropriés pour chaque jour.
          </p>
          <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-blue-50 border border-blue-200'}`}>
            <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-blue-800'}`}>
              ⚖️ <strong>Licence MIT</strong> - Projet open-source créé par David Bishai et contributeurs
            </p>
            <p className={`text-sm mt-2 ${contrastHigh ? 'text-contrast-text' : 'text-blue-700'}`}>
              🔗 Source originale : <a 
                href="https://github.com/dbishai/orthodox-presenter" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:no-underline font-medium"
              >
                github.com/dbishai/orthodox-presenter
              </a>
            </p>
          </div>
        </div>

        {/* Caractéristiques */}
        <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
          <h3 className={`text-xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
            ✨ Fonctionnalités
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200'}`}>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl">📅</span>
                <h4 className={`font-bold ${contrastHigh ? 'text-contrast-text' : 'text-purple-900'}`}>
                  Calendrier Liturgique
                </h4>
              </div>
              <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                Affiche automatiquement les lectures et prières du jour selon le calendrier copte
              </p>
            </div>

            <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200'}`}>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl">🎵</span>
                <h4 className={`font-bold ${contrastHigh ? 'text-contrast-text' : 'text-blue-900'}`}>
                  Hymnes et Prières
                </h4>
              </div>
              <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                Textes des hymnes coptes et prières liturgiques en plusieurs langues
              </p>
            </div>

            <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200'}`}>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl">👥</span>
                <h4 className={`font-bold ${contrastHigh ? 'text-contrast-text' : 'text-green-900'}`}>
                  Commémorations
                </h4>
              </div>
              <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                Informations sur les saints et martyrs commémorés chaque jour
              </p>
            </div>

            <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200'}`}>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl">📱</span>
                <h4 className={`font-bold ${contrastHigh ? 'text-contrast-text' : 'text-orange-900'}`}>
                  Responsive
                </h4>
              </div>
              <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                S'adapte à tous les écrans : ordinateur, tablette, projecteur, smartphone
              </p>
            </div>
          </div>
        </div>

        {/* Iframe intégration */}
        <div className={`mb-8 rounded-xl overflow-hidden ${contrastHigh ? 'border-2 border-contrast-text' : 'shadow-2xl'}`}>
          <div className={`p-4 ${contrastHigh ? 'bg-contrast-bg' : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'}`}>
            <h3 className="text-xl font-bold flex items-center space-x-2">
              <span>🖥️</span>
              <span>Application Orthodox Presenter</span>
            </h3>
          </div>
          <div className="relative" style={{ paddingBottom: '75%' }}>
            <iframe
              src="https://dbishai.github.io/orthodox-presenter"
              title="Orthodox Presenter"
              className="absolute inset-0 w-full h-full border-0"
              allow="fullscreen"
              loading="lazy"
            />
          </div>
        </div>

        {/* Instructions d'utilisation */}
        <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
          <h3 className={`text-xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
            📖 Comment utiliser
          </h3>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-gray-50 border border-gray-200'}`}>
              <div className="flex items-start space-x-3">
                <span className={`text-2xl flex-shrink-0 ${contrastHigh ? '' : 'text-blue-600'}`}>1️⃣</span>
                <div>
                  <h4 className={`font-bold mb-1 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
                    Sélectionner la date
                  </h4>
                  <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                    L'application charge automatiquement le contenu pour la date actuelle, ou sélectionnez une autre date
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-gray-50 border border-gray-200'}`}>
              <div className="flex items-start space-x-3">
                <span className={`text-2xl flex-shrink-0 ${contrastHigh ? '' : 'text-blue-600'}`}>2️⃣</span>
                <div>
                  <h4 className={`font-bold mb-1 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
                    Naviguer dans les sections
                  </h4>
                  <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                    Utilisez le menu latéral pour accéder aux différentes prières, lectures et hymnes
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-gray-50 border border-gray-200'}`}>
              <div className="flex items-start space-x-3">
                <span className={`text-2xl flex-shrink-0 ${contrastHigh ? '' : 'text-blue-600'}`}>3️⃣</span>
                <div>
                  <h4 className={`font-bold mb-1 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
                    Ajuster l'affichage
                  </h4>
                  <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                    Modifiez la taille du texte et les paramètres d'affichage selon vos besoins
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-gray-50 border border-gray-200'}`}>
              <div className="flex items-start space-x-3">
                <span className={`text-2xl flex-shrink-0 ${contrastHigh ? '' : 'text-blue-600'}`}>4️⃣</span>
                <div>
                  <h4 className={`font-bold mb-1 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
                    Mode plein écran
                  </h4>
                  <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                    Cliquez sur l'icône plein écran pour une meilleure expérience lors des services
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Crédits et Liens */}
        <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200'}`}>
          <h3 className={`text-xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-orange-900'}`}>
            👨‍💻 Crédits et Remerciements
          </h3>
          <div className="space-y-3">
            <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
              <strong>Développeur principal :</strong> David Bishai (<a 
                href="https://github.com/dbishai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                @dbishai
              </a>)
            </p>
            <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
              <strong>Contributeurs :</strong> Abanoub (@AbanoubG), Bishoy Botros (@bishoybt)
            </p>
            <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
              <strong>Technologies :</strong> React, Flux, Bootstrap
            </p>
            <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
              <strong>Licence :</strong> MIT License (Libre et Open Source)
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href="https://github.com/dbishai/orthodox-presenter"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  contrastHigh
                    ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow'
                }`}
              >
                📂 Code Source sur GitHub
              </a>
              <a
                href="https://dbishai.github.io/orthodox-presenter"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  contrastHigh
                    ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                    : 'bg-green-600 text-white hover:bg-green-700 shadow'
                }`}
              >
                🚀 Ouvrir en Plein Écran
              </a>
            </div>
          </div>
        </div>

        {/* Note légale */}
        <div className={`p-4 rounded-lg text-sm ${contrastHigh ? 'bg-contrast-text/10' : 'bg-gray-100 border border-gray-300'}`}>
          <p className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
            ⚖️ <strong>Note légale :</strong> Orthodox Presenter est un projet open-source sous licence MIT. 
            Nous intégrons cet outil avec permission conformément aux termes de la licence, en maintenant 
            tous les crédits et mentions d'auteurs originaux. Ce projet appartient à ses créateurs et contributeurs.
          </p>
        </div>
      </main>
    </div>
  );
};

export default OrthodoxPresenterPage;
