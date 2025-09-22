import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';

const MobileNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { contrastHigh } = useSettings();

  const navigationItems = [
    { path: '/', label: 'Accueil', icon: '🏠' },
    { path: '/bible', label: 'Bible', icon: '📚' },
    { path: '/topics', label: 'Thèmes', icon: '📖' },
    { path: '/sermons', label: 'Sermons', icon: '🎬' },
    { path: '/timeline', label: 'Timeline', icon: '📜' },
    { path: '/test-bible', label: 'Test LSG', icon: '🧪' },
    { path: '/profile', label: 'Mon Profil', icon: '👤' },
  ];

  return (
    <>
      {/* Bouton hamburger mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
          contrastHigh
            ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text'
            : 'bg-white text-gray-700 border border-gray-200'
        }`}
        aria-label="Ouvrir le menu de navigation"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span
            className={`block w-5 h-0.5 transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
            } ${contrastHigh ? 'bg-contrast-bg' : 'bg-gray-700'}`}
          />
          <span
            className={`block w-5 h-0.5 transition-all duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            } ${contrastHigh ? 'bg-contrast-bg' : 'bg-gray-700'}`}
          />
          <span
            className={`block w-5 h-0.5 transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
            } ${contrastHigh ? 'bg-contrast-bg' : 'bg-gray-700'}`}
          />
        </div>
      </button>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu mobile */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${
          contrastHigh
            ? 'bg-contrast-bg border-l-2 border-contrast-text'
            : 'bg-white border-l border-gray-200'
        }`}
      >
        <div className="p-6">
          {/* En-tête du menu */}
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-xl font-bold ${
              contrastHigh ? 'text-contrast-text' : 'text-gray-800'
            }`}>
              Navigation
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className={`p-2 rounded-full ${
                contrastHigh
                  ? 'text-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
              aria-label="Fermer le menu"
            >
              <span className="text-xl">×</span>
            </button>
          </div>

          {/* Liste de navigation */}
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 ${
                  contrastHigh
                    ? 'text-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Section informations */}
          <div className={`mt-8 pt-6 border-t ${
            contrastHigh ? 'border-contrast-text' : 'border-gray-200'
          }`}>
            <div className={`text-sm ${
              contrastHigh ? 'text-contrast-text' : 'text-gray-600'
            }`}>
              <p className="mb-2">📱 Version mobile optimisée</p>
              <p>Naviguez facilement sur tous vos appareils</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
