import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';

export default function Home() {
  const navigate = useNavigate();
  const { contrastHigh } = useSettings();
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: "📖",
      title: "Plan de Lecture Bible 365 jours",
      description: "Parcourez toute la Bible en une année avec notre plan structuré qui vous guide jour par jour à travers l'Ancien et le Nouveau Testament."
    },
    {
      icon: "🎯",
      title: "Versets Quotidiens par Thèmes",
      description: "Découvrez des versets inspirants organisés par thèmes spirituels : Amour, Confiance, Force, Espoir, Paix, et bien plus encore."
    },
    {
      icon: "📚",
      title: "Explorateur Bible Interactif",
      description: "Naviguez librement dans tous les livres de la Bible avec une interface moderne et des liens de navigation intuitifs."
    },
    {
      icon: "🎮",
      title: "Défis Spirituels",
      description: "Participez à des défis quotidiens pour approfondir votre foi et développer des habitudes spirituelles saines."
    },
    {
      icon: "🧠",
      title: "Mémorisation de Versets",
      description: "Apprenez et mémorisez les versets bibliques avec notre système d'apprentissage interactif et de répétition espacée."
    },
    {
      icon: "⛪",
      title: "Traditions Coptes",
      description: "Explorez l'histoire riche de l'Église copte orthodoxe, ses saints, ses traditions liturgiques et son patrimoine spirituel."
    }
  ];

  const handleEnterSite = () => {
    navigate('/dashboard');
  };

  return (
    <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900'} relative overflow-hidden`}>
      {/* Effet de particules en arrière-plan */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
        <div className="absolute top-64 left-32 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-2 h-2 bg-purple-300 rounded-full animate-ping"></div>
        <div className="absolute bottom-64 left-20 w-1 h-1 bg-green-300 rounded-full animate-pulse"></div>
      </div>

      {/* Navigation en haut */}
      <nav className="relative z-10 p-4 sm:p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="text-3xl sm:text-4xl">📖</div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-white">Bible Interactive</h1>
              <p className="text-blue-200 text-xs sm:text-sm hidden sm:block">Votre companion spirituel</p>
            </div>
          </div>
          <Link 
            to="/dashboard" 
            className="px-4 sm:px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 text-xs sm:text-base"
          >
            Accès Direct
          </Link>
        </div>
      </nav>

      {/* Section Hero principale */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Icône principale animée */}
          <div className="text-5xl sm:text-8xl mb-6 sm:mb-8 animate-bounce">✨</div>
          
          {/* Titre principal */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Bible
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent"> Interactive</span>
          </h1>
          
          {/* Sous-titre */}
          <p className="text-base sm:text-xl md:text-2xl text-blue-100 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
            Découvrez la Bible comme jamais auparavant avec notre plateforme spirituelle complète. 
            Lectures guidées, versets thématiques, défis spirituels et bien plus encore.
          </p>

          {/* Bouton principal d'entrée */}
          <button
            onClick={handleEnterSite}
            className="group relative px-6 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-full text-white text-base sm:text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 mb-10 sm:mb-16"
          >
            <span className="relative z-10 flex items-center space-x-2 sm:space-x-3">
              <span>Entrer dans l'Aventure</span>
              <span className="text-xl sm:text-2xl group-hover:translate-x-2 transition-transform">🚀</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Section des fonctionnalités */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-12">Que contient notre plateforme ?</h2>
          
          {/* Grille des fonctionnalités */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-10 sm:mb-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group p-5 sm:p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer ${
                  currentFeature === index 
                    ? 'bg-white/20 border-2 border-white/40' 
                    : 'bg-white/10 border border-white/20 hover:bg-white/15'
                }`}
                onClick={() => setCurrentFeature(index)}
              >
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">{feature.title}</h3>
                <p className="text-sm sm:text-base text-blue-100 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Statistiques impressionnantes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mb-10 sm:mb-16">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-1 sm:mb-2">365</div>
              <div className="text-blue-200 text-xs sm:text-base">Jours de Lecture</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-1 sm:mb-2">30+</div>
              <div className="text-blue-200 text-xs sm:text-base">Versets Thématiques</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-purple-400 mb-1 sm:mb-2">11</div>
              <div className="text-blue-200 text-xs sm:text-base">Thèmes Spirituels</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-orange-400 mb-1 sm:mb-2">∞</div>
              <div className="text-blue-200 text-xs sm:text-base">Découvertes</div>
            </div>
          </div>

          {/* Citation inspirante */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 sm:p-8 max-w-3xl mx-auto">
            <div className="text-4xl sm:text-6xl text-center mb-3 sm:mb-4">📜</div>
            <blockquote className="text-base sm:text-xl text-white text-center italic mb-3 sm:mb-4">
              "Ta parole est une lampe à mes pieds, et une lumière sur mon sentier."
            </blockquote>
            <cite className="text-blue-200 text-center block text-sm sm:text-base">— Psaume 119:105</cite>
          </div>
        </div>
      </main>

      {/* Footer avec appel à l'action */}
      <footer className="relative z-10 text-center py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Prêt à commencer votre voyage spirituel ?</h3>
          <p className="text-sm sm:text-base text-blue-100 mb-6 sm:mb-8">
            Rejoignez des milliers de personnes qui découvrent la Bible de manière interactive et enrichissante.
          </p>
          <button
            onClick={handleEnterSite}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-900 font-bold rounded-full hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-xl text-sm sm:text-base"
          >
            Commencer Maintenant 🌟
          </button>
        </div>
      </footer>
    </div>
  );
}