import { useState, useEffect } from 'react';
import { useSettings } from '../state/settingsStore';
import { bibleApi, type BibleVerse } from '../services/bibleApi';
import LoadingSpinner from './LoadingSpinner';

type Props = {
  reference?: string;
  verses?: BibleVerse[];
  lessonId?: string;
  showReference?: boolean;
  className?: string;
};

export default function BibleVerseComponent({
  reference,
  verses: initialVerses,
  lessonId,
  showReference = true,
  className = '',
}: Props) {
  const { contrastHigh } = useSettings();
  const [verses, setVerses] = useState<BibleVerse[]>(initialVerses || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialVerses || !reference) return;

    const fetchVerses = async () => {
      setLoading(true);
      setError(null);

      try {
        const verse = await bibleApi.getVerseByReference(reference);
        if (verse) {
          setVerses([verse]);
        } else {
          setError('Verset non trouvé');
        }
      } catch (err) {
        setError('Erreur lors du chargement du verset');
        console.error('Erreur Bible API:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVerses();
  }, [reference, initialVerses]);

  // Charger les versets spécifiques selon la leçon
  useEffect(() => {
    if (!lessonId || initialVerses) return;

    const fetchLessonVerses = async () => {
      setLoading(true);
      setError(null);

      try {
        let lessonVerses: BibleVerse[] = [];

        switch (lessonId) {
          case 'jonas_01':
          case 'jonas_02_fuite':
          case 'jonas_03_ninive':
          case 'jonas_04_ricin':
            lessonVerses = await bibleApi.getJonasVerses();
            break;
          case 'creation_01':
            lessonVerses = await bibleApi.getCreationVerses();
            break;
          case 'adam_eve_01':
            lessonVerses = await bibleApi.getAdamEveVerses();
            break;
          case 'noe_01':
            lessonVerses = await bibleApi.getNoeVerses();
            break;
          case 'babel_01':
            lessonVerses = await bibleApi.getBabelVerses();
            break;
          case 'abraham_01':
            lessonVerses = await bibleApi.getAbrahamVerses();
            break;
          case 'isaac_sacrifice_01':
            lessonVerses = await bibleApi.getIsaacSacrificeVerses();
            break;
          case 'isaac_mariage_01':
            lessonVerses = await bibleApi.getIsaacVerses();
            break;
          case 'jacob_esau_01':
            lessonVerses = await bibleApi.getJacobVerses();
            break;
          case 'jacob_songe_01':
            lessonVerses = await bibleApi.getJacobSongeVerses();
            break;
          case 'joseph_01':
            lessonVerses = await bibleApi.getJosephVerses();
            break;
          case 'commandements_01':
            lessonVerses = await bibleApi.getCommandementsVerses();
            break;
          case 'tabernacle_01':
            lessonVerses = await bibleApi.getTabernacleVerses();
            break;
          case 'terre_promise_01':
            lessonVerses = await bibleApi.getTerrePromiseVerses();
            break;
          case 'josue_01':
            lessonVerses = await bibleApi.getJosueVerses();
            break;
          case 'gedeon_01':
            lessonVerses = await bibleApi.getGedeonVerses();
            break;
          case 'moise_buisson_01':
            lessonVerses = await bibleApi.getMoiseBuissonVerses();
            break;
          case 'plaies_egypte_01':
            lessonVerses = await bibleApi.getPlaiesEgypteVerses();
            break;
          case 'mer_rouge_01':
            lessonVerses = await bibleApi.getMerRougeVerses();
            break;
          case 'samson_01':
            lessonVerses = await bibleApi.getSamsonVerses();
            break;
          case 'salomon_01':
            lessonVerses = await bibleApi.getSalomonVerses();
            break;
          case 'elie_01':
            lessonVerses = await bibleApi.getElieVerses();
            break;
          case 'ezechiel_01':
            lessonVerses = await bibleApi.getEzechielVerses();
            break;
          case 'daniel_01':
            lessonVerses = await bibleApi.getDanielVerses();
            break;
          case 'naissance_jesus':
            lessonVerses = await bibleApi.getNaissanceJesusVerses();
            break;
          case 'enfance_jesus':
            lessonVerses = await bibleApi.getEnfanceJesusVerses();
            break;
          case 'bapteme_jesus':
            lessonVerses = await bibleApi.getBaptemeJesusVerses();
            break;
          case 'tentations_jesus':
            lessonVerses = await bibleApi.getTentationsJesusVerses();
            break;
          default:
            setError("Leçon non supportée par l'API");
            return;
        }

        setVerses(lessonVerses);
      } catch (err) {
        setError('Erreur lors du chargement des versets');
        console.error('Erreur Bible API:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonVerses();
  }, [lessonId, initialVerses]);

  if (loading) {
    return (
      <div className={`${className}`}>
        <LoadingSpinner size="sm" message="Chargement des versets..." />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`p-4 rounded-xl border-2 border-dashed ${className} ${
          contrastHigh
            ? 'border-contrast-text text-contrast-text bg-contrast-bg'
            : 'border-yellow-300 bg-yellow-50 text-yellow-800'
        }`}
      >
        <div className="flex items-center space-x-2">
          <span className="text-xl">📖</span>
          <span className="font-medium">Versets disponibles localement</span>
        </div>
        <p className="text-sm mt-2 opacity-80">
          Les textes bibliques sont intégrés dans l'application pour une
          expérience sans connexion.
        </p>
      </div>
    );
  }

  if (!verses.length) {
    return null;
  }

  return (
    <div className={`${className}`}>
      <div
        className={`relative overflow-hidden rounded-2xl p-6 ${
          contrastHigh
            ? 'bg-contrast-bg border-2 border-contrast-text'
            : 'bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 border border-indigo-200 shadow-lg'
        }`}
      >
        {/* Éléments décoratifs */}
        {!contrastHigh && (
          <div className="absolute top-2 right-2 text-4xl opacity-10">📜</div>
        )}

        <div className="relative z-10">
          {/* En-tête */}
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-2xl">📖</span>
            <h3
              className={`text-lg font-bold ${
                contrastHigh ? 'text-contrast-text' : 'text-indigo-800'
              }`}
            >
              Parole de Dieu
            </h3>
          </div>

          {/* Versets */}
          <div className="space-y-3">
            {verses.map((verse, index) => (
              <div
                key={`${verse.book_id}-${verse.chapter}-${verse.verse_start}`}
                className={`animate-fade-scale ${
                  contrastHigh ? 'text-contrast-text' : 'text-gray-700'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {showReference && (
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold mr-3 ${
                      contrastHigh
                        ? 'bg-contrast-text text-contrast-bg'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    {verse.book_id} {verse.chapter}:{verse.verse_start}
                  </span>
                )}
                <span
                  className={`text-base leading-relaxed ${
                    contrastHigh ? 'text-contrast-text' : 'text-gray-800'
                  }`}
                >
                  {verse.verse_text}
                </span>
              </div>
            ))}
          </div>

          {/* Attribution */}
          <div
            className={`mt-6 pt-4 border-t text-center text-sm ${
              contrastHigh
                ? 'border-contrast-text text-contrast-text'
                : 'border-indigo-200 text-indigo-600'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>✝️</span>
              <span className="italic">
                Texte biblique - Tradition chrétienne orthodoxe
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
