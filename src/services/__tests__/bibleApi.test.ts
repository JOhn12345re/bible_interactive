import { describe, it, expect, beforeEach } from 'vitest';
import { bibleApi } from '../bibleApi';

describe('BibleApiService', () => {
  beforeEach(() => {
    // Clear cache before each test if needed
  });

  describe('API Bible.com Integration', () => {
    it('devrait récupérer des versets depuis Bible.com pour Genèse 1:1-3', async () => {
      const verses = await bibleApi.getVersesDefault('Genèse', 1, 1, 3);
      
      expect(verses).toBeDefined();
      expect(verses.length).toBeGreaterThan(0);
      expect(verses[0].book).toBe('Genèse');
      expect(verses[0].chapter).toBe(1);
      expect(verses[0].verse).toBeGreaterThanOrEqual(1);
      expect(verses[0].text).toBeTruthy();
    }, 10000); // Timeout de 10s pour l'API

    it('devrait récupérer des versets pour Exode 3:1-22', async () => {
      const verses = await bibleApi.getVersesDefault('Exode', 3, 1, 22);
      
      expect(verses).toBeDefined();
      expect(verses.length).toBeGreaterThan(0);
      expect(verses[0].book).toBe('Exode');
      expect(verses[0].chapter).toBe(3);
    }, 10000);

    it('devrait récupérer des versets pour Jean 3:16', async () => {
      const verses = await bibleApi.getVersesDefault('Jean', 3, 16, 16);
      
      expect(verses).toBeDefined();
      expect(verses.length).toBe(1);
      expect(verses[0].book).toBe('Jean');
      expect(verses[0].chapter).toBe(3);
      expect(verses[0].verse).toBe(16);
    }, 10000);
  });

  describe('Méthodes spécifiques pour les histoires de la timeline', () => {
    it('devrait récupérer les versets pour la création (creation_01)', async () => {
      const verses = await bibleApi.getCreationVerses();
      
      expect(verses).toBeDefined();
      expect(verses.length).toBeGreaterThan(0);
      expect(verses[0].book).toBe('Genèse');
      expect(verses[0].chapter).toBe(1);
    }, 10000);

    it('devrait récupérer les versets pour Caïn et Abel (cain_abel_01)', async () => {
      const verses = await bibleApi.getCainAbelVerses();
      
      expect(verses).toBeDefined();
      expect(verses.length).toBeGreaterThan(0);
      expect(verses[0].book).toBe('Genèse');
      expect(verses[0].chapter).toBe(4);
    }, 10000);

    it('devrait récupérer les versets pour Noé et le déluge (noe_deluge_01)', async () => {
      const verses = await bibleApi.getNoeDelugeVerses();
      
      expect(verses).toBeDefined();
      expect(verses.length).toBeGreaterThan(0);
      expect(verses[0].book).toBe('Genèse');
    }, 10000);

    it('devrait récupérer les versets pour Abraham (abraham_alliance_01)', async () => {
      const verses = await bibleApi.getAbrahamAllianceVerses();
      
      expect(verses).toBeDefined();
      expect(verses.length).toBeGreaterThan(0);
      expect(verses[0].book).toBe('Genèse');
    }, 10000);

    it('devrait récupérer les versets pour le sacrifice d\'Isaac (isaac_sacrifice_01)', async () => {
      const verses = await bibleApi.getIsaacSacrificeVerses();
      
      expect(verses).toBeDefined();
      expect(verses.length).toBeGreaterThan(0);
      expect(verses[0].book).toBe('Genèse');
      expect(verses[0].chapter).toBe(22);
    }, 10000);

    it('devrait récupérer les versets pour le songe de Jacob (jacob_songe_01)', async () => {
      const verses = await bibleApi.getJacobSongeVerses();
      
      expect(verses).toBeDefined();
      expect(verses.length).toBeGreaterThan(0);
      expect(verses[0].book).toBe('Genèse');
      expect(verses[0].chapter).toBe(28);
    }, 10000);

    it('devrait récupérer les versets pour Moïse et le buisson ardent (moise_buisson_01)', async () => {
      const verses = await bibleApi.getMoiseBuissonVerses();
      
      expect(verses).toBeDefined();
      expect(verses.length).toBeGreaterThan(0);
      expect(verses[0].book).toBe('Exode');
      expect(verses[0].chapter).toBe(3);
      // Vérifier que ce n'est PAS Exode 1:1 (bug précédent)
      expect(verses[0].verse).not.toBe(1);
      expect(verses[0].text).not.toContain('Voici les noms des fils d\'Israël');
    }, 10000);

    it('devrait récupérer les versets pour le veau d\'or (veau_or_01)', async () => {
      const verses = await bibleApi.getVeauOrVerses();
      
      expect(verses).toBeDefined();
      expect(verses.length).toBeGreaterThan(0);
      expect(verses[0].book).toBe('Exode');
      expect(verses[0].chapter).toBe(32);
    }, 10000);

    it('devrait récupérer les versets pour la traversée du Jourdain (traversee_jourdain)', async () => {
      const verses = await bibleApi.getTraverseeJourdainVerses();
      
      expect(verses).toBeDefined();
      expect(verses.length).toBeGreaterThan(0);
      expect(verses[0].book).toBe('Josué');
      expect(verses[0].chapter).toBe(3);
    }, 10000);

    it('devrait récupérer les versets pour Jéricho (jericho_01)', async () => {
      const verses = await bibleApi.getJerichoVerses();
      
      expect(verses).toBeDefined();
      expect(verses.length).toBeGreaterThan(0);
      expect(verses[0].book).toBe('Josué');
      expect(verses[0].chapter).toBe(6);
    }, 10000);

    it('devrait récupérer les versets pour David et Goliath (david_goliath_01)', async () => {
      const verses = await bibleApi.getDavidGoliathVerses();
      
      expect(verses).toBeDefined();
      expect(verses.length).toBeGreaterThan(0);
      expect(verses[0].book).toBe('1 Samuel');
      expect(verses[0].chapter).toBe(17);
    }, 10000);

    it('devrait récupérer les versets pour David roi (david_roi_01)', async () => {
      const verses = await bibleApi.getDavidRoiVerses();
      
      expect(verses).toBeDefined();
      expect(verses.length).toBeGreaterThan(0);
      expect(verses[0].book).toBe('2 Samuel');
    }, 10000);

    it('devrait récupérer les versets pour la sagesse de Salomon (salomon_sagesse_01)', async () => {
      const verses = await bibleApi.getSalomonSagesseVerses();
      
      expect(verses).toBeDefined();
      expect(verses.length).toBeGreaterThan(0);
      expect(verses[0].book).toBe('1 Rois');
      expect(verses[0].chapter).toBe(3);
    }, 10000);

    it('devrait récupérer les versets pour le temple de Salomon (temple_salomon_01)', async () => {
      const verses = await bibleApi.getTempleSalomonVerses();
      
      expect(verses).toBeDefined();
      expect(verses.length).toBeGreaterThan(0);
      expect(verses[0].book).toBe('1 Rois');
      expect(verses[0].chapter).toBe(6);
    }, 10000);
  });

  describe('Gestion des erreurs et fallbacks', () => {
    it('devrait utiliser les données mockées si l\'API échoue', async () => {
      // Test avec un livre invalide qui devrait fallback sur les données mockées
      const verses = await bibleApi.getVersesDefault('LivreInvalide', 1, 1, 1);
      
      // Devrait retourner un verset par défaut ou des données mockées
      expect(verses).toBeDefined();
      expect(verses.length).toBeGreaterThan(0);
    }, 10000);

    it('devrait gérer les références invalides gracieusement', async () => {
      const verses = await bibleApi.getVersesDefault('Genèse', 999, 1, 1);
      
      // Devrait retourner des données mockées ou un tableau vide plutôt que de crash
      expect(verses).toBeDefined();
      expect(Array.isArray(verses)).toBe(true);
    }, 10000);
  });

  describe('Structure des données', () => {
    it('devrait retourner des versets avec la structure correcte', async () => {
      const verses = await bibleApi.getCreationVerses();
      
      expect(verses[0]).toHaveProperty('book');
      expect(verses[0]).toHaveProperty('chapter');
      expect(verses[0]).toHaveProperty('verse');
      expect(verses[0]).toHaveProperty('text');
      expect(verses[0]).toHaveProperty('reference');
      
      expect(typeof verses[0].book).toBe('string');
      expect(typeof verses[0].chapter).toBe('number');
      expect(typeof verses[0].verse).toBe('number');
      expect(typeof verses[0].text).toBe('string');
      expect(typeof verses[0].reference).toBe('string');
    }, 10000);
  });
});

