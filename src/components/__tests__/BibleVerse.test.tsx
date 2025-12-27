import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import BibleVerseComponent from '../BibleVerse';
import '@testing-library/jest-dom';

// Mock du service BibleApi
vi.mock('../../services/bibleApi', () => ({
  BibleApiService: {
    getInstance: () => ({
      getCreationVerses: vi.fn().mockResolvedValue([
        {
          book: 'Genèse',
          chapter: 1,
          verse: 1,
          text: 'Au commencement, Dieu créa les cieux et la terre.',
          reference: 'Genèse 1:1'
        }
      ]),
      getCainAbelVerses: vi.fn().mockResolvedValue([
        {
          book: 'Genèse',
          chapter: 4,
          verse: 1,
          text: 'Adam connut Eve, sa femme; elle conçut, et enfanta Caïn.',
          reference: 'Genèse 4:1'
        }
      ]),
      getMoiseBuissonVerses: vi.fn().mockResolvedValue([
        {
          book: 'Exode',
          chapter: 3,
          verse: 2,
          text: 'L\'ange de l\'Éternel lui apparut dans une flamme de feu.',
          reference: 'Exode 3:2'
        }
      ]),
      getVeauOrVerses: vi.fn().mockResolvedValue([
        {
          book: 'Exode',
          chapter: 32,
          verse: 1,
          text: 'Le peuple s\'assembla autour d\'Aaron.',
          reference: 'Exode 32:1'
        }
      ]),
      getJerichoVerses: vi.fn().mockResolvedValue([
        {
          book: 'Josué',
          chapter: 6,
          verse: 1,
          text: 'Jéricho était fermée et barricadée.',
          reference: 'Josué 6:1'
        }
      ]),
      getDavidGoliathVerses: vi.fn().mockResolvedValue([
        {
          book: '1 Samuel',
          chapter: 17,
          verse: 1,
          text: 'Les Philistins réunirent leurs armées.',
          reference: '1 Samuel 17:1'
        }
      ]),
    })
  }
}));

describe('BibleVerseComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('devrait afficher les versets pour creation_01', async () => {
    render(<BibleVerseComponent lessonId="creation_01" />);
    
    await waitFor(() => {
      expect(screen.getByText(/Au commencement/i)).toBeInTheDocument();
    });
    
    expect(screen.getByText(/Genèse 1:1/i)).toBeInTheDocument();
  });

  it('devrait afficher les versets pour cain_abel_01', async () => {
    render(<BibleVerseComponent lessonId="cain_abel_01" />);
    
    await waitFor(() => {
      expect(screen.getByText(/Adam connut Eve/i)).toBeInTheDocument();
    });
    
    expect(screen.getByText(/Genèse 4:1/i)).toBeInTheDocument();
  });

  it('devrait afficher les versets pour moise_buisson_01', async () => {
    render(<BibleVerseComponent lessonId="moise_buisson_01" />);
    
    await waitFor(() => {
      expect(screen.getByText(/L'ange de l'Éternel/i)).toBeInTheDocument();
    });
    
    expect(screen.getByText(/Exode 3:2/i)).toBeInTheDocument();
  });

  it('devrait afficher les versets pour veau_or_01', async () => {
    render(<BibleVerseComponent lessonId="veau_or_01" />);
    
    await waitFor(() => {
      expect(screen.getByText(/Le peuple s'assembla/i)).toBeInTheDocument();
    });
    
    expect(screen.getByText(/Exode 32:1/i)).toBeInTheDocument();
  });

  it('devrait afficher les versets pour jericho_01', async () => {
    render(<BibleVerseComponent lessonId="jericho_01" />);
    
    await waitFor(() => {
      expect(screen.getByText(/Jéricho était fermée/i)).toBeInTheDocument();
    });
    
    expect(screen.getByText(/Josué 6:1/i)).toBeInTheDocument();
  });

  it('devrait afficher les versets pour david_goliath_01', async () => {
    render(<BibleVerseComponent lessonId="david_goliath_01" />);
    
    await waitFor(() => {
      expect(screen.getByText(/Les Philistins réunirent/i)).toBeInTheDocument();
    });
    
    expect(screen.getByText(/1 Samuel 17:1/i)).toBeInTheDocument();
  });

  it('devrait afficher un état de chargement', () => {
    render(<BibleVerseComponent lessonId="creation_01" />);
    
    // Le composant devrait afficher un indicateur de chargement initialement
    expect(screen.queryByText(/Au commencement/i)).not.toBeInTheDocument();
  });
});

