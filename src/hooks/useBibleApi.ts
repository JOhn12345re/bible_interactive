import { useState, useEffect, useCallback } from 'react';
import {
  bibleApi,
  type BibleVerse,
  type BibleVersion,
} from '../services/bibleApi';

interface UseBibleApiState {
  verses: BibleVerse[];
  loading: boolean;
  error: string | null;
  bibles: BibleVersion[];
}

interface UseBibleApiReturn extends UseBibleApiState {
  fetchVerses: (reference: string) => Promise<void>;
  fetchLessonVerses: (lessonId: string) => Promise<void>;
  clearError: () => void;
  retryLastRequest: () => Promise<void>;
}

export function useBibleApi(): UseBibleApiReturn {
  const [state, setState] = useState<UseBibleApiState>({
    verses: [],
    loading: false,
    error: null,
    bibles: [],
  });

  const [lastRequest, setLastRequest] = useState<{
    type: 'reference' | 'lesson';
    value: string;
  } | null>(null);

  // Charger les versions de Bible disponibles au montage
  useEffect(() => {
    const loadBibles = async () => {
      try {
        const bibles = await bibleApi.getBibles('fra');
        setState((prev) => ({ ...prev, bibles }));
      } catch (error) {
        console.error('Erreur lors du chargement des Bibles:', error);
      }
    };

    loadBibles();
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const fetchVerses = useCallback(async (reference: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    setLastRequest({ type: 'reference', value: reference });

    try {
      console.log('🔍 fetchVerses: Recherche de référence:', reference);
      const verse = await bibleApi.getVerseByReference(reference);
      console.log("📝 fetchVerses: Résultat de l'API:", verse);

      const verses = verse ? [verse] : [];

      setState((prev) => ({
        ...prev,
        verses,
        loading: false,
        error: verses.length === 0 ? `Verset non trouvé: "${reference}"` : null,
      }));

      console.log(
        '✅ fetchVerses: État mis à jour avec',
        verses.length,
        'verset(s)'
      );
    } catch (error) {
      console.error(
        '❌ fetchVerses: Erreur lors du chargement du verset:',
        error
      );
      setState((prev) => ({
        ...prev,
        loading: false,
        error: `Erreur lors du chargement de "${reference}": ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      }));
    }
  }, []);

  const fetchLessonVerses = useCallback(async (lessonId: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    setLastRequest({ type: 'lesson', value: lessonId });

    try {
      let verses: BibleVerse[] = [];

      switch (lessonId) {
        case 'jonas_01':
        case 'jonas_02_fuite':
        case 'jonas_03_ninive':
        case 'jonas_04_ricin':
          verses = await bibleApi.getJonasVerses();
          break;
        case 'creation_01':
          verses = await bibleApi.getCreationVerses();
          break;
        case 'moise_buisson_01':
          verses = await bibleApi.getMoiseBuissonVerses();
          break;
        case 'plaies_egypte_01':
          verses = await bibleApi.getPlaiesEgypteVerses();
          break;
        case 'mer_rouge_01':
          verses = await bibleApi.getMerRougeVerses();
          break;
        case 'samson_01':
          verses = await bibleApi.getSamsonVerses();
          break;
        case 'salomon_01':
          verses = await bibleApi.getSalomonVerses();
          break;
        case 'elie_01':
          verses = await bibleApi.getElieVerses();
          break;
        case 'ezechiel_01':
          verses = await bibleApi.getEzechielVerses();
          break;
        case 'naissance_jesus':
          verses = await bibleApi.getNaissanceJesusVerses();
          break;
        case 'enfance_jesus':
          verses = await bibleApi.getEnfanceJesusVerses();
          break;
        case 'bapteme_jesus':
          verses = await bibleApi.getBaptemeJesusVerses();
          break;
        case 'tentations_jesus':
          verses = await bibleApi.getTentationsJesusVerses();
          break;
        case 'moise_01':
          // Ajouter des versets pour Moïse plus tard
          verses = [];
          break;
        case 'adam_eve_01':
          verses = await bibleApi.getAdamEveVerses();
          break;
        case 'noe_01':
          verses = await bibleApi.getNoeVerses();
          break;
        case 'babel_01':
          verses = await bibleApi.getBabelVerses();
          break;
        case 'abraham_01':
          verses = await bibleApi.getAbrahamVerses();
          break;
        case 'isaac_sacrifice_01':
          verses = await bibleApi.getIsaacSacrificeVerses();
          break;
        case 'isaac_mariage_01':
          verses = await bibleApi.getIsaacVerses();
          break;
        case 'jacob_esau_01':
          verses = await bibleApi.getJacobVerses();
          break;
        case 'jacob_songe_01':
          verses = await bibleApi.getJacobSongeVerses();
          break;
        case 'joseph_01':
          verses = await bibleApi.getJosephVerses();
          break;
        case 'commandements_01':
          verses = await bibleApi.getCommandementsVerses();
          break;
        case 'gedeon_01':
          verses = await bibleApi.getGedeonVerses();
          break;
        default:
          setState((prev) => ({
            ...prev,
            loading: false,
            error: "Leçon non supportée par l'API Bible",
          }));
          return;
      }

      setState((prev) => ({
        ...prev,
        verses,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Erreur lors du chargement des versets',
      }));
      console.error('Erreur fetchLessonVerses:', error);
    }
  }, []);

  const retryLastRequest = useCallback(async () => {
    if (!lastRequest) return;

    if (lastRequest.type === 'reference') {
      await fetchVerses(lastRequest.value);
    } else {
      await fetchLessonVerses(lastRequest.value);
    }
  }, [lastRequest, fetchVerses, fetchLessonVerses]);

  return {
    ...state,
    fetchVerses,
    fetchLessonVerses,
    clearError,
    retryLastRequest,
  };
}

// Hook spécialisé pour une leçon spécifique
export function useLessonVerses(lessonId: string) {
  const { verses, loading, error, fetchLessonVerses, clearError } =
    useBibleApi();

  useEffect(() => {
    if (lessonId) {
      fetchLessonVerses(lessonId);
    }
  }, [lessonId, fetchLessonVerses]);

  return {
    verses,
    loading,
    error,
    clearError,
    refetch: () => fetchLessonVerses(lessonId),
  };
}

// Hook pour rechercher des versets par référence
export function useVerseSearch() {
  const { verses, loading, error, fetchVerses, clearError } = useBibleApi();
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('verse-search-history');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const searchVerse = useCallback(
    async (reference: string) => {
      await fetchVerses(reference);

      // Ajouter à l'historique (max 10 éléments)
      setSearchHistory((prev) => {
        const newHistory = [
          reference,
          ...prev.filter((ref) => ref !== reference),
        ];
        const trimmed = newHistory.slice(0, 10);
        try {
          localStorage.setItem('verse-search-history', JSON.stringify(trimmed));
        } catch (e) {
          console.warn("Impossible d'écrire l'historique de recherche", e);
        }
        return trimmed;
      });
    },
    [fetchVerses]
  );

  return {
    verses,
    loading,
    error,
    searchHistory,
    searchVerse,
    clearError,
  };
}
