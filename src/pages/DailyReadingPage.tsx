import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../state/settingsStore';
import { bibleApi, type BibleVerse } from '../services/bibleApi';

interface ReadingPlan {
  day: number;
  book: string;
  chapter: number;
  verses?: string;
  completed: boolean;
  date?: string;
}

const DailyReadingPage = () => {
  const { contrastHigh } = useSettings();
  const [currentDay, setCurrentDay] = useState(1);
  const [readingHistory, setReadingHistory] = useState<ReadingPlan[]>([]);
  const [todaysReading, setTodaysReading] = useState<ReadingPlan | null>(null);
  const [showChapter, setShowChapter] = useState(false);
  const [previewVerse, setPreviewVerse] = useState<BibleVerse | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  // Plan de lecture annuel complet (365 jours) - Bible entière
  const yearlyReadingPlan: Omit<ReadingPlan, 'completed' | 'date'>[] = [
    // ANCIEN TESTAMENT (Jours 1-273)
    
    // GENÈSE (50 chapitres) - Jours 1-50
    { day: 1, book: "Genèse", chapter: 1 }, { day: 2, book: "Genèse", chapter: 2 },
    { day: 3, book: "Genèse", chapter: 3 }, { day: 4, book: "Genèse", chapter: 4 },
    { day: 5, book: "Genèse", chapter: 5 }, { day: 6, book: "Genèse", chapter: 6 },
    { day: 7, book: "Genèse", chapter: 7 }, { day: 8, book: "Genèse", chapter: 8 },
    { day: 9, book: "Genèse", chapter: 9 }, { day: 10, book: "Genèse", chapter: 10 },
    { day: 11, book: "Genèse", chapter: 11 }, { day: 12, book: "Genèse", chapter: 12 },
    { day: 13, book: "Genèse", chapter: 13 }, { day: 14, book: "Genèse", chapter: 14 },
    { day: 15, book: "Genèse", chapter: 15 }, { day: 16, book: "Genèse", chapter: 16 },
    { day: 17, book: "Genèse", chapter: 17 }, { day: 18, book: "Genèse", chapter: 18 },
    { day: 19, book: "Genèse", chapter: 19 }, { day: 20, book: "Genèse", chapter: 20 },
    { day: 21, book: "Genèse", chapter: 21 }, { day: 22, book: "Genèse", chapter: 22 },
    { day: 23, book: "Genèse", chapter: 23 }, { day: 24, book: "Genèse", chapter: 24 },
    { day: 25, book: "Genèse", chapter: 25 }, { day: 26, book: "Genèse", chapter: 26 },
    { day: 27, book: "Genèse", chapter: 27 }, { day: 28, book: "Genèse", chapter: 28 },
    { day: 29, book: "Genèse", chapter: 29 }, { day: 30, book: "Genèse", chapter: 30 },
    { day: 31, book: "Genèse", chapter: 31 }, { day: 32, book: "Genèse", chapter: 32 },
    { day: 33, book: "Genèse", chapter: 33 }, { day: 34, book: "Genèse", chapter: 34 },
    { day: 35, book: "Genèse", chapter: 35 }, { day: 36, book: "Genèse", chapter: 36 },
    { day: 37, book: "Genèse", chapter: 37 }, { day: 38, book: "Genèse", chapter: 38 },
    { day: 39, book: "Genèse", chapter: 39 }, { day: 40, book: "Genèse", chapter: 40 },
    { day: 41, book: "Genèse", chapter: 41 }, { day: 42, book: "Genèse", chapter: 42 },
    { day: 43, book: "Genèse", chapter: 43 }, { day: 44, book: "Genèse", chapter: 44 },
    { day: 45, book: "Genèse", chapter: 45 }, { day: 46, book: "Genèse", chapter: 46 },
    { day: 47, book: "Genèse", chapter: 47 }, { day: 48, book: "Genèse", chapter: 48 },
    { day: 49, book: "Genèse", chapter: 49 }, { day: 50, book: "Genèse", chapter: 50 },

    // EXODE (40 chapitres) - Jours 51-90
    { day: 51, book: "Exode", chapter: 1 }, { day: 52, book: "Exode", chapter: 2 },
    { day: 53, book: "Exode", chapter: 3 }, { day: 54, book: "Exode", chapter: 4 },
    { day: 55, book: "Exode", chapter: 5 }, { day: 56, book: "Exode", chapter: 6 },
    { day: 57, book: "Exode", chapter: 7 }, { day: 58, book: "Exode", chapter: 8 },
    { day: 59, book: "Exode", chapter: 9 }, { day: 60, book: "Exode", chapter: 10 },
    { day: 61, book: "Exode", chapter: 11 }, { day: 62, book: "Exode", chapter: 12 },
    { day: 63, book: "Exode", chapter: 13 }, { day: 64, book: "Exode", chapter: 14 },
    { day: 65, book: "Exode", chapter: 15 }, { day: 66, book: "Exode", chapter: 16 },
    { day: 67, book: "Exode", chapter: 17 }, { day: 68, book: "Exode", chapter: 18 },
    { day: 69, book: "Exode", chapter: 19 }, { day: 70, book: "Exode", chapter: 20 },
    { day: 71, book: "Exode", chapter: 21 }, { day: 72, book: "Exode", chapter: 22 },
    { day: 73, book: "Exode", chapter: 23 }, { day: 74, book: "Exode", chapter: 24 },
    { day: 75, book: "Exode", chapter: 25 }, { day: 76, book: "Exode", chapter: 26 },
    { day: 77, book: "Exode", chapter: 27 }, { day: 78, book: "Exode", chapter: 28 },
    { day: 79, book: "Exode", chapter: 29 }, { day: 80, book: "Exode", chapter: 30 },
    { day: 81, book: "Exode", chapter: 31 }, { day: 82, book: "Exode", chapter: 32 },
    { day: 83, book: "Exode", chapter: 33 }, { day: 84, book: "Exode", chapter: 34 },
    { day: 85, book: "Exode", chapter: 35 }, { day: 86, book: "Exode", chapter: 36 },
    { day: 87, book: "Exode", chapter: 37 }, { day: 88, book: "Exode", chapter: 38 },
    { day: 89, book: "Exode", chapter: 39 }, { day: 90, book: "Exode", chapter: 40 },

    // LÉVITIQUE (27 chapitres) - Jours 91-117
    { day: 91, book: "Lévitique", chapter: 1 }, { day: 92, book: "Lévitique", chapter: 2 },
    { day: 93, book: "Lévitique", chapter: 3 }, { day: 94, book: "Lévitique", chapter: 4 },
    { day: 95, book: "Lévitique", chapter: 5 }, { day: 96, book: "Lévitique", chapter: 6 },
    { day: 97, book: "Lévitique", chapter: 7 }, { day: 98, book: "Lévitique", chapter: 8 },
    { day: 99, book: "Lévitique", chapter: 9 }, { day: 100, book: "Lévitique", chapter: 10 },
    { day: 101, book: "Lévitique", chapter: 11 }, { day: 102, book: "Lévitique", chapter: 12 },
    { day: 103, book: "Lévitique", chapter: 13 }, { day: 104, book: "Lévitique", chapter: 14 },
    { day: 105, book: "Lévitique", chapter: 15 }, { day: 106, book: "Lévitique", chapter: 16 },
    { day: 107, book: "Lévitique", chapter: 17 }, { day: 108, book: "Lévitique", chapter: 18 },
    { day: 109, book: "Lévitique", chapter: 19 }, { day: 110, book: "Lévitique", chapter: 20 },
    { day: 111, book: "Lévitique", chapter: 21 }, { day: 112, book: "Lévitique", chapter: 22 },
    { day: 113, book: "Lévitique", chapter: 23 }, { day: 114, book: "Lévitique", chapter: 24 },
    { day: 115, book: "Lévitique", chapter: 25 }, { day: 116, book: "Lévitique", chapter: 26 },
    { day: 117, book: "Lévitique", chapter: 27 },

    // NOMBRES (36 chapitres) - Jours 118-153
    { day: 118, book: "Nombres", chapter: 1 }, { day: 119, book: "Nombres", chapter: 2 },
    { day: 120, book: "Nombres", chapter: 3 }, { day: 121, book: "Nombres", chapter: 4 },
    { day: 122, book: "Nombres", chapter: 5 }, { day: 123, book: "Nombres", chapter: 6 },
    { day: 124, book: "Nombres", chapter: 7 }, { day: 125, book: "Nombres", chapter: 8 },
    { day: 126, book: "Nombres", chapter: 9 }, { day: 127, book: "Nombres", chapter: 10 },
    { day: 128, book: "Nombres", chapter: 11 }, { day: 129, book: "Nombres", chapter: 12 },
    { day: 130, book: "Nombres", chapter: 13 }, { day: 131, book: "Nombres", chapter: 14 },
    { day: 132, book: "Nombres", chapter: 15 }, { day: 133, book: "Nombres", chapter: 16 },
    { day: 134, book: "Nombres", chapter: 17 }, { day: 135, book: "Nombres", chapter: 18 },
    { day: 136, book: "Nombres", chapter: 19 }, { day: 137, book: "Nombres", chapter: 20 },
    { day: 138, book: "Nombres", chapter: 21 }, { day: 139, book: "Nombres", chapter: 22 },
    { day: 140, book: "Nombres", chapter: 23 }, { day: 141, book: "Nombres", chapter: 24 },
    { day: 142, book: "Nombres", chapter: 25 }, { day: 143, book: "Nombres", chapter: 26 },
    { day: 144, book: "Nombres", chapter: 27 }, { day: 145, book: "Nombres", chapter: 28 },
    { day: 146, book: "Nombres", chapter: 29 }, { day: 147, book: "Nombres", chapter: 30 },
    { day: 148, book: "Nombres", chapter: 31 }, { day: 149, book: "Nombres", chapter: 32 },
    { day: 150, book: "Nombres", chapter: 33 }, { day: 151, book: "Nombres", chapter: 34 },
    { day: 152, book: "Nombres", chapter: 35 }, { day: 153, book: "Nombres", chapter: 36 },

    // DEUTÉRONOME (34 chapitres) - Jours 154-187
    { day: 154, book: "Deutéronome", chapter: 1 }, { day: 155, book: "Deutéronome", chapter: 2 },
    { day: 156, book: "Deutéronome", chapter: 3 }, { day: 157, book: "Deutéronome", chapter: 4 },
    { day: 158, book: "Deutéronome", chapter: 5 }, { day: 159, book: "Deutéronome", chapter: 6 },
    { day: 160, book: "Deutéronome", chapter: 7 }, { day: 161, book: "Deutéronome", chapter: 8 },
    { day: 162, book: "Deutéronome", chapter: 9 }, { day: 163, book: "Deutéronome", chapter: 10 },
    { day: 164, book: "Deutéronome", chapter: 11 }, { day: 165, book: "Deutéronome", chapter: 12 },
    { day: 166, book: "Deutéronome", chapter: 13 }, { day: 167, book: "Deutéronome", chapter: 14 },
    { day: 168, book: "Deutéronome", chapter: 15 }, { day: 169, book: "Deutéronome", chapter: 16 },
    { day: 170, book: "Deutéronome", chapter: 17 }, { day: 171, book: "Deutéronome", chapter: 18 },
    { day: 172, book: "Deutéronome", chapter: 19 }, { day: 173, book: "Deutéronome", chapter: 20 },
    { day: 174, book: "Deutéronome", chapter: 21 }, { day: 175, book: "Deutéronome", chapter: 22 },
    { day: 176, book: "Deutéronome", chapter: 23 }, { day: 177, book: "Deutéronome", chapter: 24 },
    { day: 178, book: "Deutéronome", chapter: 25 }, { day: 179, book: "Deutéronome", chapter: 26 },
    { day: 180, book: "Deutéronome", chapter: 27 }, { day: 181, book: "Deutéronome", chapter: 28 },
    { day: 182, book: "Deutéronome", chapter: 29 }, { day: 183, book: "Deutéronome", chapter: 30 },
    { day: 184, book: "Deutéronome", chapter: 31 }, { day: 185, book: "Deutéronome", chapter: 32 },
    { day: 186, book: "Deutéronome", chapter: 33 }, { day: 187, book: "Deutéronome", chapter: 34 },

    // LIVRES HISTORIQUES (Jours 188-273)
    { day: 188, book: "Josué", chapter: 1 }, { day: 189, book: "Josué", chapter: 2 },
    { day: 190, book: "Josué", chapter: 3 }, { day: 191, book: "Josué", chapter: 4 },
    { day: 192, book: "Josué", chapter: 5 }, { day: 193, book: "Josué", chapter: 6 },
    { day: 194, book: "Josué", chapter: 7 }, { day: 195, book: "Josué", chapter: 8 },
    { day: 196, book: "Josué", chapter: 9 }, { day: 197, book: "Josué", chapter: 10 },
    { day: 198, book: "Josué", chapter: 11 }, { day: 199, book: "Josué", chapter: 12 },
    { day: 200, book: "Josué", chapter: 13 }, { day: 201, book: "Josué", chapter: 14 },
    { day: 202, book: "Josué", chapter: 15 }, { day: 203, book: "Josué", chapter: 16 },
    { day: 204, book: "Josué", chapter: 17 }, { day: 205, book: "Josué", chapter: 18 },
    { day: 206, book: "Josué", chapter: 19 }, { day: 207, book: "Josué", chapter: 20 },
    { day: 208, book: "Josué", chapter: 21 }, { day: 209, book: "Josué", chapter: 22 },
    { day: 210, book: "Josué", chapter: 23 }, { day: 211, book: "Josué", chapter: 24 },

    // JUGES + RUTH (Jours 212-232)
    { day: 212, book: "Juges", chapter: 1 }, { day: 213, book: "Juges", chapter: 2 },
    { day: 214, book: "Juges", chapter: 3 }, { day: 215, book: "Juges", chapter: 4 },
    { day: 216, book: "Juges", chapter: 5 }, { day: 217, book: "Juges", chapter: 6 },
    { day: 218, book: "Juges", chapter: 7 }, { day: 219, book: "Juges", chapter: 8 },
    { day: 220, book: "Juges", chapter: 9 }, { day: 221, book: "Juges", chapter: 10 },
    { day: 222, book: "Juges", chapter: 11 }, { day: 223, book: "Juges", chapter: 12 },
    { day: 224, book: "Juges", chapter: 13 }, { day: 225, book: "Juges", chapter: 14 },
    { day: 226, book: "Juges", chapter: 15 }, { day: 227, book: "Juges", chapter: 16 },
    { day: 228, book: "Juges", chapter: 17 }, { day: 229, book: "Juges", chapter: 18 },
    { day: 230, book: "Juges", chapter: 19 }, { day: 231, book: "Juges", chapter: 20 },
    { day: 232, book: "Juges", chapter: 21 },

    { day: 233, book: "Ruth", chapter: 1 }, { day: 234, book: "Ruth", chapter: 2 },
    { day: 235, book: "Ruth", chapter: 3 }, { day: 236, book: "Ruth", chapter: 4 },

    // SAMUEL + ROIS (Jours 237-273)
    { day: 237, book: "1 Samuel", chapter: 1 }, { day: 238, book: "1 Samuel", chapter: 2 },
    { day: 239, book: "1 Samuel", chapter: 3 }, { day: 240, book: "1 Samuel", chapter: 4 },
    { day: 241, book: "1 Samuel", chapter: 5 }, { day: 242, book: "1 Samuel", chapter: 6 },
    { day: 243, book: "1 Samuel", chapter: 7 }, { day: 244, book: "1 Samuel", chapter: 8 },
    { day: 245, book: "1 Samuel", chapter: 9 }, { day: 246, book: "1 Samuel", chapter: 10 },
    { day: 247, book: "1 Samuel", chapter: 11 }, { day: 248, book: "1 Samuel", chapter: 12 },
    { day: 249, book: "1 Samuel", chapter: 13 }, { day: 250, book: "1 Samuel", chapter: 14 },
    { day: 251, book: "1 Samuel", chapter: 15 }, { day: 252, book: "1 Samuel", chapter: 16 },
    { day: 253, book: "1 Samuel", chapter: 17 }, { day: 254, book: "1 Samuel", chapter: 18 },
    { day: 255, book: "1 Samuel", chapter: 19 }, { day: 256, book: "1 Samuel", chapter: 20 },
    { day: 257, book: "1 Samuel", chapter: 21 }, { day: 258, book: "1 Samuel", chapter: 22 },
    { day: 259, book: "1 Samuel", chapter: 23 }, { day: 260, book: "1 Samuel", chapter: 24 },
    { day: 261, book: "1 Samuel", chapter: 25 }, { day: 262, book: "1 Samuel", chapter: 26 },
    { day: 263, book: "1 Samuel", chapter: 27 }, { day: 264, book: "1 Samuel", chapter: 28 },
    { day: 265, book: "1 Samuel", chapter: 29 }, { day: 266, book: "1 Samuel", chapter: 30 },
    { day: 267, book: "1 Samuel", chapter: 31 },

    { day: 268, book: "2 Samuel", chapter: 1 }, { day: 269, book: "2 Samuel", chapter: 2 },
    { day: 270, book: "2 Samuel", chapter: 3 }, { day: 271, book: "2 Samuel", chapter: 4 },
    { day: 272, book: "2 Samuel", chapter: 5 }, { day: 273, book: "2 Samuel", chapter: 6 },

    // NOUVEAU TESTAMENT (Jours 274-365)

    // MATTHIEU (28 chapitres) - Jours 274-301
    { day: 274, book: "Matthieu", chapter: 1 }, { day: 275, book: "Matthieu", chapter: 2 },
    { day: 276, book: "Matthieu", chapter: 3 }, { day: 277, book: "Matthieu", chapter: 4 },
    { day: 278, book: "Matthieu", chapter: 5 }, { day: 279, book: "Matthieu", chapter: 6 },
    { day: 280, book: "Matthieu", chapter: 7 }, { day: 281, book: "Matthieu", chapter: 8 },
    { day: 282, book: "Matthieu", chapter: 9 }, { day: 283, book: "Matthieu", chapter: 10 },
    { day: 284, book: "Matthieu", chapter: 11 }, { day: 285, book: "Matthieu", chapter: 12 },
    { day: 286, book: "Matthieu", chapter: 13 }, { day: 287, book: "Matthieu", chapter: 14 },
    { day: 288, book: "Matthieu", chapter: 15 }, { day: 289, book: "Matthieu", chapter: 16 },
    { day: 290, book: "Matthieu", chapter: 17 }, { day: 291, book: "Matthieu", chapter: 18 },
    { day: 292, book: "Matthieu", chapter: 19 }, { day: 293, book: "Matthieu", chapter: 20 },
    { day: 294, book: "Matthieu", chapter: 21 }, { day: 295, book: "Matthieu", chapter: 22 },
    { day: 296, book: "Matthieu", chapter: 23 }, { day: 297, book: "Matthieu", chapter: 24 },
    { day: 298, book: "Matthieu", chapter: 25 }, { day: 299, book: "Matthieu", chapter: 26 },
    { day: 300, book: "Matthieu", chapter: 27 }, { day: 301, book: "Matthieu", chapter: 28 },

    // MARC (16 chapitres) - Jours 302-317
    { day: 302, book: "Marc", chapter: 1 }, { day: 303, book: "Marc", chapter: 2 },
    { day: 304, book: "Marc", chapter: 3 }, { day: 305, book: "Marc", chapter: 4 },
    { day: 306, book: "Marc", chapter: 5 }, { day: 307, book: "Marc", chapter: 6 },
    { day: 308, book: "Marc", chapter: 7 }, { day: 309, book: "Marc", chapter: 8 },
    { day: 310, book: "Marc", chapter: 9 }, { day: 311, book: "Marc", chapter: 10 },
    { day: 312, book: "Marc", chapter: 11 }, { day: 313, book: "Marc", chapter: 12 },
    { day: 314, book: "Marc", chapter: 13 }, { day: 315, book: "Marc", chapter: 14 },
    { day: 316, book: "Marc", chapter: 15 }, { day: 317, book: "Marc", chapter: 16 },

    // LUC (24 chapitres) - Jours 318-341
    { day: 318, book: "Luc", chapter: 1 }, { day: 319, book: "Luc", chapter: 2 },
    { day: 320, book: "Luc", chapter: 3 }, { day: 321, book: "Luc", chapter: 4 },
    { day: 322, book: "Luc", chapter: 5 }, { day: 323, book: "Luc", chapter: 6 },
    { day: 324, book: "Luc", chapter: 7 }, { day: 325, book: "Luc", chapter: 8 },
    { day: 326, book: "Luc", chapter: 9 }, { day: 327, book: "Luc", chapter: 10 },
    { day: 328, book: "Luc", chapter: 11 }, { day: 329, book: "Luc", chapter: 12 },
    { day: 330, book: "Luc", chapter: 13 }, { day: 331, book: "Luc", chapter: 14 },
    { day: 332, book: "Luc", chapter: 15 }, { day: 333, book: "Luc", chapter: 16 },
    { day: 334, book: "Luc", chapter: 17 }, { day: 335, book: "Luc", chapter: 18 },
    { day: 336, book: "Luc", chapter: 19 }, { day: 337, book: "Luc", chapter: 20 },
    { day: 338, book: "Luc", chapter: 21 }, { day: 339, book: "Luc", chapter: 22 },
    { day: 340, book: "Luc", chapter: 23 }, { day: 341, book: "Luc", chapter: 24 },

    // JEAN (21 chapitres) - Jours 342-362
    { day: 342, book: "Jean", chapter: 1 }, { day: 343, book: "Jean", chapter: 2 },
    { day: 344, book: "Jean", chapter: 3 }, { day: 345, book: "Jean", chapter: 4 },
    { day: 346, book: "Jean", chapter: 5 }, { day: 347, book: "Jean", chapter: 6 },
    { day: 348, book: "Jean", chapter: 7 }, { day: 349, book: "Jean", chapter: 8 },
    { day: 350, book: "Jean", chapter: 9 }, { day: 351, book: "Jean", chapter: 10 },
    { day: 352, book: "Jean", chapter: 11 }, { day: 353, book: "Jean", chapter: 12 },
    { day: 354, book: "Jean", chapter: 13 }, { day: 355, book: "Jean", chapter: 14 },
    { day: 356, book: "Jean", chapter: 15 }, { day: 357, book: "Jean", chapter: 16 },
    { day: 358, book: "Jean", chapter: 17 }, { day: 359, book: "Jean", chapter: 18 },
    { day: 360, book: "Jean", chapter: 19 }, { day: 361, book: "Jean", chapter: 20 },
    { day: 362, book: "Jean", chapter: 21 },

    // ACTES (3 chapitres finals) - Jours 363-365
    { day: 363, book: "Actes", chapter: 1 }, { day: 364, book: "Actes", chapter: 2 },
    { day: 365, book: "Apocalypse", chapter: 22 }
  ];

  useEffect(() => {
    // Charger les données sauvegardées
    const savedHistory = localStorage.getItem('readingHistory');
    const savedDay = localStorage.getItem('currentReadingDay');
    
    if (savedHistory) {
      setReadingHistory(JSON.parse(savedHistory));
    }
    
    if (savedDay) {
      setCurrentDay(parseInt(savedDay));
    }

    // Définir la lecture du jour
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const reading = yearlyReadingPlan.find(r => r.day === Math.min(dayOfYear, 365));
    
    if (reading) {
      const todayReading = {
        ...reading,
        completed: false,
        date: new Date().toLocaleDateString('fr-FR')
      };
      setTodaysReading(todayReading);
      
      // Charger l'aperçu du premier verset
      loadVersePreview(reading.book, reading.chapter);
    }
  }, []);

  const loadVersePreview = async (book: string, chapter: number) => {
    setLoadingPreview(true);
    try {
      const verses = await bibleApi.getVersesDefault(book, chapter, 1, 1);
      if (verses && verses.length > 0) {
        setPreviewVerse(verses[0]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'aperçu:', error);
    } finally {
      setLoadingPreview(false);
    }
  };

  const markAsCompleted = (day: number) => {
    const updatedHistory = [...readingHistory];
    const existingIndex = updatedHistory.findIndex(h => h.day === day);
    
    if (existingIndex >= 0) {
      updatedHistory[existingIndex].completed = true;
    } else {
      const reading = yearlyReadingPlan.find(r => r.day === day);
      if (reading) {
        updatedHistory.push({
          ...reading,
          completed: true,
          date: new Date().toLocaleDateString('fr-FR')
        });
      }
    }
    
    setReadingHistory(updatedHistory);
    localStorage.setItem('readingHistory', JSON.stringify(updatedHistory));
    
    // Avancer au jour suivant
    const nextDay = Math.min(day + 1, 365);
    setCurrentDay(nextDay);
    localStorage.setItem('currentReadingDay', nextDay.toString());
  };

  const getCompletedDays = () => readingHistory.filter(r => r.completed).length;
  const getProgressPercentage = () => Math.round((getCompletedDays() / 365) * 100);

  return (
    <div className={`min-h-screen ${contrastHigh ? 'bg-contrast-bg text-contrast-text' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
      {/* Header */}
      <header className={`py-6 px-4 sm:px-6 lg:px-8 ${contrastHigh ? 'bg-contrast-bg border-b-2 border-contrast-text' : 'bg-white shadow-sm'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                contrastHigh ? 'hover:bg-contrast-text/20' : 'hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl">←</span>
              <span className="font-medium">Retour</span>
            </Link>
            <h1 className={`text-2xl sm:text-3xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
              📖 Lecture Quotidienne
            </h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Statistiques de progression */}
        <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
            📊 Votre Progression
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`text-center p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-green-50'}`}>
              <div className="text-3xl font-bold text-green-600">{getCompletedDays()}</div>
              <div className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>Jours complétés</div>
            </div>
            <div className={`text-center p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-blue-50'}`}>
              <div className="text-3xl font-bold text-blue-600">{getProgressPercentage()}%</div>
              <div className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>Progression annuelle</div>
            </div>
            <div className={`text-center p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-purple-50'}`}>
              <div className="text-3xl font-bold text-purple-600">{365 - getCompletedDays()}</div>
              <div className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>Jours restants</div>
            </div>
          </div>
          
          {/* Barre de progression */}
          <div className="mt-4">
            <div className={`w-full rounded-full h-3 ${contrastHigh ? 'bg-contrast-text/20' : 'bg-gray-200'}`}>
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
            <p className={`text-sm mt-2 ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
              Bible complète en 365 jours - Jour {currentDay}
            </p>
          </div>
        </div>

        {/* Lecture du jour */}
        {todaysReading && (
          <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-br from-green-100 to-blue-100 shadow-lg'}`}>
            <h2 className={`text-2xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
              🌅 Lecture d'Aujourd'hui
            </h2>
            <div className={`p-6 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-white shadow'}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-blue-900'}`}>
                    {todaysReading.book} {todaysReading.chapter}
                  </h3>
                  <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                    Jour {todaysReading.day} • {todaysReading.date}
                  </p>
                </div>
                <div className="text-4xl">📜</div>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => setShowChapter(!showChapter)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    contrastHigh
                      ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow hover:shadow-lg'
                  }`}
                >
                  {showChapter ? 'Masquer le chapitre' : 'Lire le chapitre'}
                </button>
                
              {showChapter && (
                <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/20' : 'bg-gray-50'}`}>
                  {loadingPreview ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                        Chargement de l'aperçu...
                      </p>
                    </div>
                  ) : previewVerse ? (
                    <div>
                      <h4 className={`font-bold mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                        📖 Aperçu - Premier verset :
                      </h4>
                      <blockquote className={`text-base leading-relaxed italic border-l-4 pl-4 ${
                        contrastHigh ? 'text-contrast-text border-contrast-text/30' : 'text-gray-700 border-blue-300'
                      }`}>
                        "{previewVerse.verse_text}"
                      </blockquote>
                      <p className={`text-sm mt-2 ${contrastHigh ? 'text-contrast-text/80' : 'text-blue-600'}`}>
                        - {previewVerse.book_id} {previewVerse.chapter}:{previewVerse.verse_start}
                      </p>
                    </div>
                  ) : (
                    <p className={`text-lg leading-relaxed ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                      📖 Cliquez sur "Lire dans la Bible" ci-dessous pour accéder au chapitre complet avec le texte intégral.
                    </p>
                  )}
                </div>
              )}                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/bible?book=${encodeURIComponent(todaysReading.book)}&chapter=${todaysReading.chapter}&verse=1`}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      contrastHigh
                        ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                        : 'bg-green-600 text-white hover:bg-green-700 shadow'
                    }`}
                  >
                    📖 Lire dans la Bible
                  </Link>
                  
                  <button
                    onClick={() => markAsCompleted(todaysReading.day)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      contrastHigh
                        ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                        : 'bg-purple-600 text-white hover:bg-purple-700 shadow'
                    }`}
                  >
                    ✅ Marquer comme lu
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Plan de lecture */}
        <div className={`mb-8 p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-white shadow-lg'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-900'}`}>
            📅 Plan de Lecture Annuel Complet
          </h2>
          <p className={`mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
            Plan chronologique de la Bible entière en 365 jours. Cliquez sur n'importe quel chapitre pour le lire directement !
          </p>
          
          {/* Légende des sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
            <div className={`p-3 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-blue-50'}`}>
              <div className="font-bold text-blue-700">📜 Pentateuque</div>
              <div className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                Jours 1-187 : Genèse → Deutéronome
              </div>
            </div>
            <div className={`p-3 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-green-50'}`}>
              <div className="font-bold text-green-700">⚔️ Livres Historiques</div>
              <div className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                Jours 188-273 : Josué → 2 Samuel
              </div>
            </div>
            <div className={`p-3 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-purple-50'}`}>
              <div className="font-bold text-purple-700">✨ Nouveau Testament</div>
              <div className={`${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                Jours 274-365 : Matthieu → Apocalypse
              </div>
            </div>
          </div>
          
          <div className="grid gap-3 max-h-80 overflow-y-auto">
            {yearlyReadingPlan.slice(0, 50).map((reading) => {
              const isCompleted = readingHistory.some(h => h.day === reading.day && h.completed);
              const isCurrent = reading.day === currentDay;
              
              return (
                <div
                  key={reading.day}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer hover:shadow-md ${
                    isCurrent
                      ? contrastHigh
                        ? 'bg-contrast-text text-contrast-bg'
                        : 'bg-blue-100 border-2 border-blue-300'
                      : isCompleted
                      ? contrastHigh
                        ? 'bg-contrast-text/20'
                        : 'bg-green-50 border border-green-200'
                      : contrastHigh
                      ? 'bg-contrast-text/10 hover:bg-contrast-text/20'
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <span className={`text-sm font-medium ${isCurrent ? 'font-bold' : ''}`}>
                      Jour {reading.day}
                    </span>
                    <Link
                      to={`/bible?book=${encodeURIComponent(reading.book)}&chapter=${reading.chapter}&verse=1`}
                      className={`hover:underline ${isCurrent ? 'font-bold' : ''} ${
                        contrastHigh ? 'text-contrast-text' : 'text-blue-600 hover:text-blue-800'
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {reading.book} {reading.chapter}
                    </Link>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isCompleted && <span className="text-green-600">✅</span>}
                    {isCurrent && <span className="text-blue-600">👈</span>}
                    <button
                      onClick={() => markAsCompleted(reading.day)}
                      className={`px-2 py-1 text-xs rounded transition-all ${
                        isCompleted
                          ? contrastHigh
                            ? 'bg-contrast-text/30 text-contrast-text'
                            : 'bg-green-200 text-green-800'
                          : contrastHigh
                          ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                      disabled={isCompleted}
                    >
                      {isCompleted ? 'Lu' : 'Marquer'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className={`mt-4 p-3 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-gray-50'}`}>
            <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
              📝 Affichage des 50 premiers jours (complet jusqu'à Exode). Plan total : 365 jours pour lire toute la Bible. Votre progression est automatiquement sauvegardée.
            </p>
            <p className={`text-xs mt-2 ${contrastHigh ? 'text-contrast-text' : 'text-blue-600'}`}>
              💡 Conseil : Cliquez directement sur n'importe quel chapitre pour le lire dans votre Bible !
            </p>
          </div>
        </div>

        {/* Conseils de lecture */}
        <div className={`p-6 rounded-xl ${contrastHigh ? 'bg-contrast-bg border-2 border-contrast-text' : 'bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 shadow-lg'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-orange-900'}`}>
            💡 Conseils pour une Lecture Fructueuse
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-white'}`}>
              <h3 className={`font-bold mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-orange-800'}`}>
                🌅 Moment Idéal
              </h3>
              <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                Choisissez un moment calme, de préférence le matin, pour commencer la journée avec la Parole de Dieu.
              </p>
            </div>
            <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-white'}`}>
              <h3 className={`font-bold mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-orange-800'}`}>
                🙏 Prière
              </h3>
              <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                Commencez et terminez votre lecture par une prière pour demander l'éclairage du Saint-Esprit.
              </p>
            </div>
            <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-white'}`}>
              <h3 className={`font-bold mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-orange-800'}`}>
                📝 Réflexion
              </h3>
              <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                Prenez quelques instants pour réfléchir au message et à son application dans votre vie.
              </p>
            </div>
            <div className={`p-4 rounded-lg ${contrastHigh ? 'bg-contrast-text/10' : 'bg-white'}`}>
              <h3 className={`font-bold mb-2 ${contrastHigh ? 'text-contrast-text' : 'text-orange-800'}`}>
                ⭐ Persévérance
              </h3>
              <p className={`text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}>
                Si vous manquez un jour, ne vous découragez pas. Reprenez simplement où vous vous êtes arrêté.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DailyReadingPage;