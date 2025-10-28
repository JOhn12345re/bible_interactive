import React, { useEffect, useRef, useState } from 'react';
import type { SermonItem } from '../types/sermon';
import { formatTime } from '../utils/time';

export default function SermonPlayer({ item }: { item: SermonItem }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [inView, setInView] = useState(false);
  const storageKey = `sermon:progress:${item.id}`;

  // Lazy-init: observe visibility before loading media/HLS
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { root: null, rootMargin: '200px', threshold: 0.01 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // hls.js dynamic import
  useEffect(() => {
    if (!inView) return;
    const video = videoRef.current!;
    let hls: any;

    const initHls = async () => {
      const canNativeHls = video.canPlayType('application/vnd.apple.mpegurl');
      if (item.hls) {
        if (canNativeHls) {
          video.src = item.hls;
        } else {
          const Hls = (await import('hls.js')).default;
          if (Hls.isSupported()) {
            hls = new Hls({
              maxBufferLength: 60,
              maxMaxBufferLength: 120,
              enableWorker: true,
              lowLatencyMode: false,
              capLevelOnFPSDrop: true,
              startLevel: -1,
            });
            hls.loadSource(item.hls);
            hls.attachMedia(video);
            hls.on((Hls as any).Events.ERROR, (_e: any, data: any) => {
              if (data?.fatal && item.mp4) {
                // Fallback vers MP4 si disponible
                hls.destroy();
                video.src = item.mp4!;
              }
            });
          } else if (item.mp4) {
            video.src = item.mp4;
          }
        }
      } else if (item.mp4) {
        video.src = item.mp4;
      }

      video.addEventListener(
        'loadedmetadata',
        () => {
          setReady(true);
          setDuration(video.duration);
        },
        { once: true }
      );

      // Resume from saved position
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const t = parseFloat(saved);
        if (!isNaN(t) && t > 0) {
          video.currentTime = t;
        }
      }
    };

    initHls();

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (!video.paused && !video.seeking) {
        localStorage.setItem(storageKey, String(video.currentTime));
      }
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      localStorage.removeItem(storageKey);
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('ended', onEnded);
      if (hls) hls.destroy();
    };
  }, [inView, item.id, item.hls, item.mp4, storageKey]);

  // Keyboard shortcuts
  useEffect(() => {
    const v = videoRef.current!;
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLSelectElement
      )
        return;

      if (e.key === ' ') {
        e.preventDefault();
        v.paused ? v.play() : v.pause();
      }
      if (e.key === 'ArrowRight') v.currentTime += 5;
      if (e.key === 'ArrowLeft') v.currentTime -= 5;
      if (e.key === 'f' || e.key === 'F') {
        if (v.requestFullscreen) v.requestFullscreen();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handlePlaybackRateChange = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          controls
          playsInline
          preload="none"
          poster={item.poster}
          className="w-full h-full"
          aria-label={`Vidéo du sermon: ${item.title}`}
        >
          {/* Fallback MP4 source if present */}
          {item.mp4 ? <source src={item.mp4} type="video/mp4" /> : null}
          {/* Subtitles */}
          {item.subtitles?.map((t, i) => (
            <track
              key={i}
              srcLang={t.lang}
              label={t.label}
              src={t.src}
              default={i === 0}
              kind="subtitles"
            />
          ))}
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
      </div>

      {/* Progress bar */}
      {ready && duration > 0 && (
        <div className="mt-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{formatTime(currentTime)}</span>
            <div
              className="flex-1 bg-gray-200 rounded-full h-2 cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                handleSeek(percent * duration);
              }}
            >
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-200"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}

      {/* Controls extras */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
        <span aria-live="polite" className="opacity-80">
          {item.duration
            ? `Durée : ~${Math.round(item.duration / 60)} min`
            : ''}
        </span>

        <label className="ml-auto flex items-center gap-2">
          Vitesse
          <select
            className="border rounded px-2 py-1 bg-white"
            value={playbackRate}
            onChange={(e) =>
              handlePlaybackRateChange(parseFloat(e.target.value))
            }
          >
            <option value="0.75">0.75×</option>
            <option value="1">1×</option>
            <option value="1.25">1.25×</option>
            <option value="1.5">1.5×</option>
            <option value="1.75">1.75×</option>
            <option value="2">2×</option>
          </select>
        </label>

        <div className="text-xs text-gray-500">
          Raccourcis: Espace (play/pause), ←/→ (±5s), F (plein écran)
        </div>
      </div>

      {/* YouTube Link */}
      {(item.youtubeUrl || item.id === 'psaume-150-nayrouz') && (
        <div className="mt-4 text-center">
          <div className="mb-2 text-sm text-gray-600">
            💡 Pour respecter les droits d'auteur, vous pouvez aussi regarder
            cette vidéo sur YouTube
          </div>
          <a
            href={
              item.youtubeUrl || 'https://www.youtube.com/watch?v=jGqnGDFcqzE'
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span className="text-xl">📺</span>
            <span>Voir sur YouTube</span>
          </a>
        </div>
      )}

      {/* Chapters */}
      {ready && item.chapters?.length ? (
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-3">Chapitres</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {item.chapters.map((c, i) => (
              <button
                key={i}
                className="text-left px-4 py-2 rounded border hover:bg-gray-50 transition-colors"
                onClick={() => handleSeek(c.start)}
              >
                <div className="font-medium">
                  {c.number ? `${c.number}. ` : ''}
                  {c.title}
                </div>
                <div className="text-sm text-gray-600">
                  {formatTime(c.start)}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
