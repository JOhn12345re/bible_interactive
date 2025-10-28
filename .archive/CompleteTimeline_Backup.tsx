import React, { useState, useEffect } from 'react';
import { useSettings } from '../state/settingsStore';
import { Link } from 'react-router-dom';
import {
  CompleteTimelineService,
  type CompleteTimelineData,
  type HistoricalPeriod,
  type HistoricalEvent,
} from '../services/completeTimelineService';
import { timelineExportService } from '../services/timelineExportService';

interface EventModalProps {
  event: HistoricalEvent | null;
  onClose: () => void;
}

interface PeriodModalProps {
  period: HistoricalPeriod | null;
  onClose: () => void;
}

function EventModal({ event, onClose }: EventModalProps) {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {event.title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {event.description}
              </p>
            </div>

            <div className="flex items-center flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                📖 {event.book}
              </span>
              {event.year_bc && (
                <span className="bg-amber-100 dark:bg-amber-900 px-3 py-1 rounded-full">
                  📅 {event.year_bc} av. J.-C.
                </span>
              )}
            </div>

            {event.summary && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">📋 Résumé</h4>
                <p className="text-gray-700 dark:text-gray-300">{event.summary}</p>
              </div>
            )}

            {event.key_verses && event.key_verses.length > 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">📜 Versets clés</h4>
                <ul className="space-y-2">
                  {event.key_verses.map((verse, index) => (
                    <li key={index} className="text-green-800 dark:text-green-200 italic">
                      "{verse}"
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {event.spiritual_lessons && event.spiritual_lessons.length > 0 && (
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">✨ Leçons spirituelles</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  {event.spiritual_lessons.map((lesson, index) => (
                    <li key={index}>{lesson}</li>
                  ))}
                </ul>
              </div>
            )}

            {event.historical_context && (
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 dark:text-orange-300 mb-2">🏛️ Contexte historique</h4>
                <p className="text-gray-700 dark:text-gray-300">{event.historical_context}</p>
              </div>
            )}

            {event.geographical_info && (
              <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-900 dark:text-teal-300 mb-2">🗺️ Géographie</h4>
                <p className="text-gray-700 dark:text-gray-300">{event.geographical_info}</p>
              </div>
            )}

            {event.key_figures && event.key_figures.length > 0 && (
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-2">👥 Personnages clés</h4>
                <div className="flex flex-wrap gap-2">
                  {event.key_figures.map((figure, index) => (
                    <span key={index} className="bg-indigo-100 dark:bg-indigo-800 px-2 py-1 rounded text-sm text-indigo-800 dark:text-indigo-200">
                      {figure}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {event.educational_notes && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">🎓 Pour les enfants</h4>
                <p className="text-gray-700 dark:text-gray-300">{event.educational_notes}</p>
              </div>
            )}

            {event.available && (
              <div className="flex justify-center pt-4">
                <Link
                  to={`/lesson/${event.id}`}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  onClick={onClose}
                >
                  📚 Voir la leçon complète
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PeriodModal({ period, onClose }: PeriodModalProps) {
  if (!period) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{period.icon}</span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {period.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4 text-sm">
              <span 
                className="px-3 py-1 rounded-full text-white font-medium"
                style={{ backgroundColor: period.color }}
              >
                📅 {period.period_range}
              </span>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {period.description}
              </p>
            </div>

            {period.period_summary && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">📋 Vue d'ensemble</h4>
                <p className="text-gray-700 dark:text-gray-300">{period.period_summary}</p>
              </div>
            )}

            {period.key_themes && period.key_themes.length > 0 && (
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">🎯 Thèmes principaux</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  {period.key_themes.map((theme, index) => (
                    <li key={index}>{theme}</li>
                  ))}
                </ul>
              </div>
            )}

            {period.historical_background && (
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 dark:text-orange-300 mb-2">🏛️ Contexte historique</h4>
                <p className="text-gray-700 dark:text-gray-300">{period.historical_background}</p>
              </div>
            )}

            {period.theological_significance && (
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">✨ Signification théologique</h4>
                <p className="text-gray-700 dark:text-gray-300">{period.theological_significance}</p>
              </div>
            )}

            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-gray-300 mb-2">📚 Événements de cette période</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {period.events.map((event) => (
                  <div key={event.id} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>{event.available ? '✅' : '⏳'}</span>
                    <span>{event.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CompleteTimeline() {
  const [timelineData, setTimelineData] = useState<CompleteTimelineData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('fondements');
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);
  const [selectedPeriodForModal, setSelectedPeriodForModal] = useState<HistoricalPeriod | null>(null);
  const [loading, setLoading] = useState(true);
  const { contrastHigh } = useSettings();

  useEffect(() => {
    try {
      const data = CompleteTimelineService.getCompleteTimelineData();
      setTimelineData(data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement de la timeline complète:', error);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Chargement de la frise chronologique...</div>
      </div>
    );
  }

  if (!timelineData) {
    return (
      <div className="text-center text-red-600">
        Erreur lors du chargement de la frise chronologique.
      </div>
    );
  }

  const selectedPeriodData = timelineData.timeline.periods.find(
    (period) => period.id === selectedPeriod
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            📜 Frise Chronologique Biblique Complète
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
            {timelineData.timeline.description}
          </p>
          
          {/* Boutons d'export */}
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={async () => {
                const exportData = await timelineExportService.getExportData();
                const markdown = timelineExportService.generateMarkdownContent(exportData);
                const blob = new Blob([markdown], { type: 'text/markdown' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'frise-chronologique-biblique.md';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <span>📄</span>
              <span>Export Markdown</span>
            </button>
            
            <button
              onClick={async () => {
                const exportData = await timelineExportService.getExportData();
                const pythonData = timelineExportService.generatePythonData(exportData);
                const blob = new Blob([pythonData], { type: 'text/python' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'timeline_data.py';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <span>🐍</span>
              <span>Export Python</span>
            </button>
            
            <button
              onClick={async () => {
                const exportData = await timelineExportService.getExportData();
                const jsonData = JSON.stringify(exportData, null, 2);
                const blob = new Blob([jsonData], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'timeline-data.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <span>📊</span>
              <span>Export JSON</span>
            </button>
          </div>
        </div>

        {/* Sélecteur de périodes - Version desktop */}
        <div className="hidden lg:flex justify-center mb-8 overflow-x-auto">
          <div className="flex space-x-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg">
            {timelineData.timeline.periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  selectedPeriod === period.id
                    ? 'text-white shadow-lg transform scale-105'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                style={{
                  backgroundColor: selectedPeriod === period.id ? period.color : 'transparent',
                }}
              >
                <span className="text-2xl">{period.icon}</span>
                <div className="text-left">
                  <div className="font-semibold">{period.title}</div>
                  <div className="text-xs opacity-90">{period.period_range}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sélecteur de périodes - Version mobile */}
        <div className="lg:hidden mb-6">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600"
          >
            {timelineData.timeline.periods.map((period) => (
              <option key={period.id} value={period.id}>
                {period.icon} {period.title} ({period.period_range})
              </option>
            ))}
          </select>
        </div>

        {/* Vue chronologique horizontale */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
              📅 Vue d'ensemble chronologique
            </h2>
            
            {/* Ligne de temps horizontale */}
            <div className="relative">
              <div className="flex overflow-x-auto pb-4 space-x-4">
                {timelineData.timeline.periods.map((period, index) => (
                  <div key={period.id} className="flex-shrink-0 relative">
                    {/* Connecteur */}
                    {index < timelineData.timeline.periods.length - 1 && (
                      <div className="absolute top-12 right-0 w-4 h-0.5 bg-gray-300 dark:bg-gray-600 z-0"></div>
                    )}
                    
                    {/* Période */}
                    <div
                      className={`w-32 h-24 rounded-lg p-3 text-white text-center cursor-pointer transform transition-all hover:scale-105 ${
                        selectedPeriod === period.id ? 'ring-4 ring-white shadow-xl' : ''
                      }`}
                      style={{ backgroundColor: period.color }}
                      onClick={() => setSelectedPeriod(period.id)}
                    >
                      <div className="text-2xl mb-1">{period.icon}</div>
                      <div className="text-xs font-semibold">{period.title}</div>
                      <div className="text-xs opacity-90">{period.period_range}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Détail de la période sélectionnée */}
        {selectedPeriodData && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{selectedPeriodData.icon}</span>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedPeriodData.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {selectedPeriodData.description}
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    📅 {selectedPeriodData.period_range}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPeriodForModal(selectedPeriodData)}
                className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                title="Voir les détails de cette période"
              >
                <span>ℹ️</span>
                <span>Détails</span>
              </button>
            </div>

            {/* Frise chronologique visuelle de la période */}
            {selectedPeriodData.events.some(event => event.year_bc || event.year_ad) && (
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <span>🕰️</span>
                  <span>Chronologie de la période</span>
                </h4>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg">
                  <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
                    {selectedPeriodData.events
                      .filter(event => event.year_bc || event.year_ad)
                      .sort((a, b) => {
                        const yearA = a.year_bc || -(a.year_ad || 0);
                        const yearB = b.year_bc || -(b.year_ad || 0);
                        return yearB - yearA; // Tri décroissant (plus ancien en premier)
                      })
                      .map((event, index, array) => (
                      <div key={event.id} className="flex-1">
                        <div className="flex flex-col items-center text-center">
                          <div 
                            className={`w-4 h-4 rounded-full mb-2 ${
                              event.available ? 'bg-green-500' : 'bg-gray-400'
                            }`}
                          />
                          <div className="text-xs font-bold text-gray-900 dark:text-white mb-1">
                            {event.year_bc ? `${event.year_bc} av. J.-C.` : `${event.year_ad} ap. J.-C.`}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-300 max-w-20">
                            {event.title}
                          </div>
                        </div>
                        {index < array.length - 1 && (
                          <div className="hidden md:block w-full h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 mt-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Événements de la période */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {selectedPeriodData.events.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all transform hover:scale-105 ${
                    event.available
                      ? 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700 hover:shadow-lg'
                      : 'border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                      {event.title}
                    </h4>
                    {event.available && (
                      <span className="ml-2 text-green-500 text-xl">📚</span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                      📖 {event.book}
                    </span>
                    {event.year_bc && (
                      <span className="bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded">
                        {event.year_bc} av. J.-C.
                      </span>
                    )}
                    {event.year_ad && (
                      <span className="bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded">
                        {event.year_ad} ap. J.-C.
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Objectifs éducatifs */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="text-2xl font-bold mb-4">🎯 Objectifs éducatifs</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {timelineData.educational_goals.map((goal, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="text-yellow-300 text-lg mt-0.5">✓</span>
                <p className="text-blue-50">{goal}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <span>🏠</span>
            <span>Retour au menu principal</span>
          </Link>
        </div>
      </div>

      {/* Modal d'événement */}
      <EventModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />

      {/* Modal de période */}
      <PeriodModal 
        period={selectedPeriodForModal} 
        onClose={() => setSelectedPeriodForModal(null)} 
      />
    </div>
  );
}