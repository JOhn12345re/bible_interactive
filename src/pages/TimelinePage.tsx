import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';
import SettingsDialog from '../components/SettingsDialog';
import Timeline from '../components/Timeline';

export default function TimelinePage() {
  const { contrastHigh } = useSettings();

  return (
    <div className="min-h-screen">
      {/* En-tête avec navigation */}
      <header
        className={`sticky top-0 z-50 border-b ${
          contrastHigh
            ? 'bg-contrast-bg border-contrast-text'
            : 'bg-white border-gray-200 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-2 font-bold text-xl transition-colors ${
                contrastHigh
                  ? 'text-contrast-text hover:opacity-70'
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              <span>📖</span>
              <span>Bible Interactive</span>
            </Link>
            <span
              className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-500'}`}
            >
              → Frise Chronologique
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                contrastHigh
                  ? 'text-contrast-text border-2 border-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                  : 'text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white'
              }`}
            >
              ← Retour Accueil
            </Link>
            <SettingsDialog isOpen={false} onClose={() => {}} />
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="py-8">
        <Timeline />
      </main>

      {/* Pied de page */}
      <footer
        className={`mt-16 py-8 border-t ${
          contrastHigh ? 'border-contrast-text' : 'border-gray-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p
            className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}
          >
            🌟 Bible Interactive - Découvre la grande histoire de Dieu avec
            l'humanité 🌟
          </p>
        </div>
      </footer>
    </div>
  );
}
