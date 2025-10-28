import { Link } from 'react-router-dom';
import { useProgress } from '../state/progressStore';
import { useSettings } from '../state/settingsStore';

type Props = {
  id: string;
  title: string;
  path: string;
  description?: string;
  book?: string;
};

export default function LessonCard({
  id,
  title,
  path,
  description,
  book,
}: Props) {
  const { isCompleted, getBadge } = useProgress();
  const { contrastHigh } = useSettings();
  const completed = isCompleted(id);
  const badge = getBadge(id);

  // Fonction pour obtenir l'emoji approprié selon la leçon
  const getLessonEmoji = (lessonId: string): string => {
    const emojiMap: Record<string, string> = {
      creation_01: '🌍',
      adam_eve_01: '🍎',
      noe_01: '🚢',
      babel_01: '🏗️',
      abraham_01: '⭐',
      isaac_sacrifice_01: '🔥',
      isaac_mariage_01: '💍',
      jacob_esau_01: '👬',
      jacob_songe_01: '🪜',
      joseph_01: '🌾',
      commandements_01: '📜',
      moise_buisson_01: '🔥',
      plaies_egypte_01: '🐸',
      mer_rouge_01: '🌊',
      david_01: '⚔️',
      daniel_01: '🦁',
      gedeon_01: '🗡️',
      samson_01: '💪',
      josue_01: '🏰',
      salomon_01: '👑',
      jonas_01: '🐋',
      jonas_02_fuite: '🌊',
      jonas_03_ninive: '🏙️',
      jonas_04_ricin: '🌿',
      elie_01: '🔥',
      ezechiel_01: '💨',
      naissance_jesus: '👶',
      enfance_jesus: '🧒',
      bapteme_jesus: '💦',
      tentations_jesus: '😈',
    };
    return emojiMap[lessonId] || '📖';
  };

  return (
    <Link
      to={`/lesson/${id}`}
      className={`group block p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl card-enter relative overflow-hidden ${
        contrastHigh
          ? 'border-contrast-text bg-contrast-bg hover:bg-contrast-text hover:text-contrast-bg'
          : completed
            ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 shadow-lg'
            : 'border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-indigo-50 hover:border-blue-400 shadow-md hover:shadow-lg'
      }`}
      aria-label={`Leçon : ${title}${completed ? ' - Terminée' : ''}`}
    >
      {/* Badge de statut en coin */}
      {completed && !contrastHigh && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
          TERMINÉ
        </div>
      )}

      <div className="flex items-start justify-between relative">
        <div className="flex-1 pr-2 sm:pr-4">
          <div className="flex items-center space-x-2 sm:space-x-3 mb-3">
            <h3
              className={`text-lg sm:text-xl font-bold group-hover:text-blue-600 transition-colors ${
                contrastHigh
                  ? 'text-contrast-text'
                  : completed
                    ? 'text-green-800'
                    : 'text-gray-800'
              }`}
            >
              {title}
            </h3>
            {completed && (
              <span
                className={`text-2xl animate-bounce ${contrastHigh ? 'text-contrast-text' : 'text-green-500'}`}
                aria-label="Leçon terminée"
              >
                ✅
              </span>
            )}
          </div>

          <div
            className={`flex items-center space-x-2 text-xs sm:text-sm mb-3 ${
              contrastHigh ? 'text-contrast-text' : 'text-gray-600'
            }`}
          >
            <span className="text-sm sm:text-lg">📖</span>
            <span className="font-medium">{path}</span>
            {book && (
              <>
                <span className="text-gray-400">•</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-semibold">
                  {book}
                </span>
              </>
            )}
          </div>

          {description && (
            <p
              className={`text-sm sm:text-base leading-relaxed mb-4 ${
                contrastHigh ? 'text-contrast-text' : 'text-gray-700'
              }`}
            >
              {description}
            </p>
          )}

          {badge && (
            <div
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold shadow-md ${
                contrastHigh
                  ? 'bg-contrast-text text-contrast-bg'
                  : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:from-yellow-500 hover:to-orange-500'
              }`}
            >
              <span className="text-lg animate-bounce">🏆</span>
              <span>{badge}</span>
            </div>
          )}
        </div>

        <div
          className={`text-3xl sm:text-4xl transform group-hover:scale-110 transition-transform duration-300 ${
            contrastHigh
              ? 'text-contrast-text'
              : completed
                ? 'text-green-500'
                : 'text-blue-500'
          }`}
        >
          {getLessonEmoji(id)}
        </div>
      </div>

      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div
          className={`inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all group-hover:translate-x-1 ${
            contrastHigh
              ? 'text-contrast-text'
              : completed
                ? 'bg-green-100 text-green-700 group-hover:bg-green-200'
                : 'bg-blue-100 text-blue-700 group-hover:bg-blue-200'
          }`}
        >
          <span>{completed ? '🔄 Rejouer' : '▶️ Commencer'}</span>
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>

        {completed && (
          <div className="flex items-center space-x-1">
            {[1, 2, 3].map((star) => (
              <span
                key={star}
                className={`text-xl animate-pulse ${
                  contrastHigh ? 'text-contrast-text' : 'text-yellow-400'
                }`}
                style={{ animationDelay: `${star * 0.2}s` }}
              >
                ⭐
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
