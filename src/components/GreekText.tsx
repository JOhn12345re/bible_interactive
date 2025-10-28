import { useState, useEffect } from 'react';
import { lxxApi, type LXXVerse } from '../services/lxxApi';
import { bibleApi, type BibleVerse } from '../services/bibleApi';

interface GreekTextProps {
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd?: number;
  showTransliteration?: boolean;
  showComparison?: boolean;
  className?: string;
}

export function GreekText({
  book,
  chapter,
  verseStart,
  verseEnd,
  showTransliteration = false,
  showComparison = true,
  className = '',
}: GreekTextProps) {
  const [greekVerses, setGreekVerses] = useState<LXXVerse[]>([]);
  const [frenchVerses, setFrenchVerses] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVerses = async () => {
      try {
        setLoading(true);
        setError(null);

        // Charger les versets grecs
        const greekData = await lxxApi.getGreekVerses(
          book,
          chapter,
          verseStart,
          verseEnd
        );
        setGreekVerses(greekData);

        // Charger les versets français si comparaison activée
        if (showComparison) {
          const frenchData = await bibleApi.getVersesDefault(
            book,
            chapter,
            verseStart,
            verseEnd
          );
          setFrenchVerses(frenchData);
        }
      } catch (err) {
        setError('Erreur lors du chargement des textes bibliques');
        console.error('Erreur GreekText:', err);
      } finally {
        setLoading(false);
      }
    };

    loadVerses();
  }, [book, chapter, verseStart, verseEnd, showComparison]);

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-red-600 p-4 bg-red-50 rounded-lg ${className}`}>
        <p>{error}</p>
      </div>
    );
  }

  if (greekVerses.length === 0) {
    return (
      <div className={`text-gray-500 p-4 bg-gray-50 rounded-lg ${className}`}>
        <p>Aucun texte grec disponible pour ce passage.</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {greekVerses.map((greekVerse) => {
        const frenchVerse = frenchVerses.find(
          (v) =>
            v.chapter === greekVerse.chapter &&
            v.verse_start === greekVerse.verse
        );

        return (
          <div
            key={`${greekVerse.chapter}-${greekVerse.verse}`}
            className="border-l-4 border-indigo-500 pl-4 py-2"
          >
            {/* Référence du verset */}
            <div className="text-sm font-semibold text-gray-600 mb-2">
              {greekVerse.book_id} {greekVerse.chapter}:{greekVerse.verse}
            </div>

            {/* Texte grec */}
            <div className="mb-3">
              <div className="text-xs uppercase tracking-wide text-indigo-600 font-semibold mb-1">
                Grec (LXX)
              </div>
              <p
                className="text-lg leading-relaxed text-gray-800 font-serif"
                dir="ltr"
                style={{ fontFamily: 'Times New Roman, serif' }}
              >
                {greekVerse.greek_text}
              </p>
            </div>

            {/* Translittération si activée */}
            {showTransliteration && greekVerse.transliteration && (
              <div className="mb-3">
                <div className="text-xs uppercase tracking-wide text-green-600 font-semibold mb-1">
                  Translittération
                </div>
                <p className="text-sm text-gray-600 italic">
                  {greekVerse.transliteration}
                </p>
              </div>
            )}

            {/* Texte français si comparaison activée */}
            {showComparison && frenchVerse && (
              <div>
                <div className="text-xs uppercase tracking-wide text-blue-600 font-semibold mb-1">
                  Français (LSG)
                </div>
                <p className="text-base leading-relaxed text-gray-700">
                  {frenchVerse.verse_text}
                </p>
              </div>
            )}

            {/* Informations morphologiques (optionnel) */}
            {greekVerse.morphology && (
              <details className="mt-3">
                <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                  Analyse morphologique
                </summary>
                <div className="mt-2 text-xs text-gray-600 font-mono bg-gray-50 p-2 rounded flex flex-wrap gap-1">
                  {greekVerse.morphology.split(/\s+/).map((token, idx) => {
                    const titles: Record<string, string> = {
                      'N.NSM': 'Nom, nominatif singulier masculin',
                      'V.AAI3S': 'Verbe, aoriste actif indicatif, 3e singulier',
                      'RA.NSM': 'Article défini, nominatif singulier masculin',
                      C: 'Conjonction',
                      P: 'Préposition',
                    };
                    const title = titles[token] || 'Morphologie grecque';
                    return (
                      <span
                        key={idx}
                        title={title}
                        className="px-1.5 py-0.5 bg-gray-100 rounded"
                      >
                        {token}
                      </span>
                    );
                  })}
                </div>
              </details>
            )}

            {/* Numéros Strong (optionnel) */}
            {greekVerse.strong_numbers &&
              greekVerse.strong_numbers.length > 0 && (
                <details className="mt-2">
                  <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                    Numéros Strong
                  </summary>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {greekVerse.strong_numbers.map((num, index) => (
                      <span
                        key={index}
                        title={`Strong G${num}`}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                      >
                        G{num}
                      </span>
                    ))}
                  </div>
                </details>
              )}
          </div>
        );
      })}

      {/* Note explicative */}
      <div className="text-xs text-gray-500 mt-4 p-3 bg-blue-50 rounded-lg">
        <p>
          <strong>Note :</strong> Le texte grec provient de la Septante (LXX)
          selon l'édition de Rahlfs (1935), la traduction grecque de l'Ancien
          Testament utilisée par l'Église orthodoxe.
        </p>
      </div>
    </div>
  );
}

export default GreekText;
