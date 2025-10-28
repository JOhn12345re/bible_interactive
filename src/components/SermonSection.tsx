import React, { useEffect, useState } from 'react';
import type { SermonCatalog, SermonItem } from '../types/sermon';
import SermonPlayer from './SermonPlayer';
import { formatDuration } from '../utils/time';
import LoadingSpinner from './LoadingSpinner';

export default function SermonSection() {
  const [catalog, setCatalog] = useState<SermonCatalog>({ items: [] });
  const [active, setActive] = useState<SermonItem | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSermons = async () => {
      try {
        setLoading(true);
        const response = await fetch('/sermons/sermons.json');
        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
        const data: SermonCatalog = await response.json();
        setCatalog(data);
        if (data.items.length > 0) {
          setActive(data.items[0]);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Erreur lors du chargement des sermons'
        );
        console.error('Erreur chargement sermons:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSermons();
  }, []);

  const filtered = catalog.items.filter((it) => {
    const matchesQuery = [
      it.title,
      it.preacher,
      it.description,
      it.tags?.join(' '),
    ]
      .join(' ')
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesCategory =
      category === 'all' ||
      (category === 'sermons' &&
        !it.tags?.includes('psaume') &&
        !it.tags?.includes('chant')) ||
      (category === 'chants' &&
        (it.tags?.includes('psaume') || it.tags?.includes('chant')));

    return matchesQuery && matchesCategory;
  });

  if (loading) {
    return (
      <section className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Erreur de chargement
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Recharger la page
          </button>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Sermons" className="p-6 space-y-6">
      <header className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sermons & Chants</h1>
          <p className="text-gray-600 mt-2">
            Découvrez et regardez les sermons et chants en vidéo auto-hébergées
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="search"
              placeholder="Rechercher un sermon, prédicateur, ou mot-clé..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous</option>
              <option value="sermons">Sermons</option>
              <option value="chants">Chants & Psaumes</option>
            </select>
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            {filtered.length} élément{filtered.length > 1 ? 's' : ''} trouvé
            {filtered.length > 1 ? 's' : ''}
          </div>
        </div>
      </header>

      {/* Lecteur principal */}
      {active ? (
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{active.title}</h2>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-600">
              {active.preacher && (
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {active.preacher}
                </span>
              )}
              {active.date && (
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {new Date(active.date).toLocaleDateString('fr-FR')}
                </span>
              )}
              {active.duration && (
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {formatDuration(active.duration)}
                </span>
              )}
            </div>
          </div>

          <SermonPlayer item={active} />

          {active.description && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{active.description}</p>
            </div>
          )}

          {active.tags && active.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {active.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
          <p>Aucun sermon disponible pour le moment.</p>
        </div>
      )}

      {/* Liste des sermons */}
      {filtered.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">
            {category === 'all'
              ? 'Tous les contenus'
              : category === 'sermons'
                ? 'Sermons'
                : 'Chants & Psaumes'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((sermon) => (
              <button
                key={sermon.id}
                className={`text-left border rounded-lg p-4 hover:shadow-md transition-all duration-200 ${
                  active?.id === sermon.id
                    ? 'ring-2 ring-blue-500 border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
                onClick={() => setActive(sermon)}
              >
                <div className="aspect-video w-full bg-gray-200 rounded-lg overflow-hidden mb-3">
                  {sermon.poster ? (
                    <img
                      src={sermon.poster}
                      alt={`Affiche du sermon: ${sermon.title}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg
                        className="w-12 h-12"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 line-clamp-2">
                    {sermon.title}
                  </h4>

                  <div className="text-sm text-gray-600 space-y-1">
                    {sermon.preacher && (
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {sermon.preacher}
                      </div>
                    )}

                    {sermon.duration && (
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {formatDuration(sermon.duration)}
                      </div>
                    )}
                  </div>

                  {sermon.tags && sermon.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {sermon.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {sermon.tags.length > 3 && (
                        <span className="text-xs text-gray-400">
                          +{sermon.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && query && (
        <div className="text-center py-12 text-gray-500">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <p>Aucun sermon trouvé pour "{query}"</p>
          <button
            onClick={() => setQuery('')}
            className="mt-2 text-blue-600 hover:text-blue-800"
          >
            Effacer la recherche
          </button>
        </div>
      )}
    </section>
  );
}
