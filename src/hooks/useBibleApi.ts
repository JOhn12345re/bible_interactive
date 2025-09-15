import { useState, useEffect, useCallback } from 'react';
import { bibleApi, type BibleVerse, type BibleVersion } from '../services/bibleApi';

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
    bibles: []
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
        setState(prev => ({ ...prev, bibles }));
      } catch (error) {
        console.error('Erreur lors du chargement des Bibles:', error);
      }
    };

    loadBibles();
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const fetchVerses = useCallback(async (reference: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    setLastRequest({ type: 'reference', value: reference });

    try {
      const verse = await bibleApi.getVerseByReference(reference);
      const verses = verse ? [verse] : [];
      
      setState(prev => ({ 
        ...prev, 
        verses, 
        loading: false,
        error: verses.length === 0 ? 'Verset non trouvé' : null
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Erreur lors du chargement du verset' 
      }));
      console.error('Erreur fetchVerses:', error);
    }
  }, []);

  const fetchLessonVerses = useCallback(async (lessonId: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
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
        case 'noe_01':
          // Ajouter des versets pour Noé plus tard
          verses = [];
          break;
        case 'moise_01':
          // Ajouter des versets pour Moïse plus tard
          verses = [];
          break;
        case 'naissance_jesus':
          verses = await bibleApi.getNativityVerses();
          break;
        default:
          setState(prev => ({ 
            ...prev, 
            loading: false, 
            error: 'Leçon non supportée par l\'API Bible' 
          }));
          return;
      }

      setState(prev => ({ 
        ...prev, 
        verses, 
        loading: false 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Erreur lors du chargement des versets' 
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
    retryLastRequest
  };
}

// Hook spécialisé pour une leçon spécifique
export function useLessonVerses(lessonId: string) {
  const { verses, loading, error, fetchLessonVerses, clearError } = useBibleApi();

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
    refetch: () => fetchLessonVerses(lessonId)
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

  const searchVerse = useCallback(async (reference: string) => {
    await fetchVerses(reference);
    
    // Ajouter à l'historique (max 10 éléments)
    setSearchHistory(prev => {
      const newHistory = [reference, ...prev.filter(ref => ref !== reference)];
      const trimmed = newHistory.slice(0, 10);
      try { localStorage.setItem('verse-search-history', JSON.stringify(trimmed)); } catch {}
      return trimmed;
    });
  }, [fetchVerses]);

  return {
    verses,
    loading,
    error,
    searchHistory,
    searchVerse,
    clearError
  };
}
