export type SermonItem = {
  id: string; // slug dossier dans /public/sermons
  title: string;
  preacher?: string;
  date?: string; // ISO
  duration?: number; // en secondes
  description?: string;
  poster?: string; // chemin relatif
  hls?: string;    // chemin .m3u8
  mp4?: string;    // chemin .mp4 (fallback)
  subtitles?: { lang: string; label: string; src: string }[];
  chapters?: { start: number; title: string; number?: string }[];
  tags?: string[];
  youtubeUrl?: string; // URL YouTube pour respecter les droits d'auteur
};
export type SermonCatalog = { items: SermonItem[] };
