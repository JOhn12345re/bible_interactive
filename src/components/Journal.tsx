import { useProgress } from '../state/progressStore';
import { useSettings } from '../state/settingsStore';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Journal({ isOpen, onClose }: Props) {
  const { getAllBadges, reset } = useProgress();
  const { contrastHigh } = useSettings();
  const badges = getAllBadges();

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm('Êtes-vous sûr de vouloir effacer tout votre progrès ?')) {
      reset();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className={`rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto ${
          contrastHigh ? 'bg-contrast-bg text-contrast-text border-2 border-contrast-text' 
                      : 'bg-white text-gray-900'
        }`}
        role="dialog"
        aria-labelledby="journal-title"
        aria-modal="true"
      >
        {/* En-tête */}
        <div className="flex justify-between items-center mb-6 no-print">
          <h2 id="journal-title" className="text-2xl font-bold">
            📖 Mon Journal Biblique
          </h2>
          <button
            onClick={onClose}
            className={`text-2xl hover:opacity-70 ${
              contrastHigh ? 'text-contrast-text' : 'text-gray-500'
            }`}
            aria-label="Fermer le journal"
          >
            ×
          </button>
        </div>

        {/* Contenu du journal */}
        <div className="space-y-6">
          {/* Statistiques */}
          <section>
            <h3 className="text-xl font-semibold mb-4">📊 Mes Progrès</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg text-center ${
                contrastHigh 
                  ? 'border-2 border-contrast-text'
                  : 'bg-blue-50 border border-blue-200'
              }`}>
                <div className="text-2xl font-bold text-blue-600">
                  {badges.length}
                </div>
                <div className="text-sm">Badges obtenus</div>
              </div>
              <div className={`p-4 rounded-lg text-center ${
                contrastHigh 
                  ? 'border-2 border-contrast-text'
                  : 'bg-green-50 border border-green-200'
              }`}>
                <div className="text-2xl font-bold text-green-600">
                  {badges.length}
                </div>
                <div className="text-sm">Leçons terminées</div>
              </div>
              <div className={`p-4 rounded-lg text-center ${
                contrastHigh 
                  ? 'border-2 border-contrast-text'
                  : 'bg-purple-50 border border-purple-200'
              }`}>
                <div className="text-2xl font-bold text-purple-600">
                  {badges.length * 3}
                </div>
                <div className="text-sm">⭐ Étoiles gagnées</div>
              </div>
            </div>
          </section>

          {/* Collection de badges */}
          <section>
            <h3 className="text-xl font-semibold mb-4">🏆 Collection de Badges</h3>
            {badges.length === 0 ? (
              <div className={`text-center py-8 rounded-lg border-2 border-dashed ${
                contrastHigh 
                  ? 'border-contrast-text text-contrast-text'
                  : 'border-gray-300 text-gray-500'
              }`}>
                <span className="text-4xl mb-2 block">🌟</span>
                <p>Commence une leçon pour obtenir ton premier badge !</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {badges.map((badge, index) => {
                  const date = new Date(badge.date).toLocaleDateString('fr-FR');
                  return (
                    <div
                      key={`${badge.id}-${index}`}
                      className={`p-4 rounded-lg border-2 ${
                        contrastHigh
                          ? 'border-contrast-text'
                          : 'border-yellow-300 bg-yellow-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">🏆</span>
                        <div>
                          <h4 className="font-semibold">{badge.badge}</h4>
                          <p className={`text-sm ${
                            contrastHigh ? 'text-contrast-text' : 'text-gray-600'
                          }`}>
                            Obtenu le {date}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Citations motivantes */}
          <section>
            <h3 className="text-xl font-semibold mb-4">💬 Versets découverts</h3>
            <div className={`p-4 rounded-lg italic text-center ${
              contrastHigh 
                ? 'border-2 border-contrast-text'
                : 'bg-gray-50 border border-gray-200'
            }`}>
              "La délivrance vient du Seigneur."
              <div className={`text-sm mt-2 ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-600'
              }`}>
                - Jonas 2:9
              </div>
            </div>
          </section>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-end no-print">
          <button
            onClick={handlePrint}
            className={`px-4 py-2 rounded-lg font-medium ${
              contrastHigh 
                ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            🖨️ Imprimer
          </button>
          <button
            onClick={handleReset}
            className={`px-4 py-2 rounded-lg font-medium ${
              contrastHigh 
                ? 'bg-contrast-bg text-contrast-text border-2 border-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            🗑️ Recommencer
          </button>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg font-medium ${
              contrastHigh 
                ? 'bg-contrast-text text-contrast-bg border-2 border-contrast-text hover:bg-contrast-bg hover:text-contrast-text'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
