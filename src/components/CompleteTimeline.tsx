import React, { useState, useEffect } from 'react';
import { useSettings } from '../state/settingsStore';
import { useProgress } from '../state/progressStore';
import { useProfileStore } from '../state/profileStore';
import { Link } from 'react-router-dom';
import {
  CompleteTimelineService,
  type CompleteTimelineData,
  type HistoricalPeriod,
  type HistoricalEvent,
} from '../services/completeTimelineService';

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
                  state={{ fromTimeline: true }}
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
                {period.events.map((event) => {
                  const completed = useProgress.getState().isCompleted(event.id) || 
                    useProfileStore.getState().profile?.completedLessons?.includes(event.id);
                  return (
                    <div key={event.id} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>
                        {completed ? '🏆' : event.available ? '📚' : '⏳'}
                      </span>
                      <span className={completed ? 'font-semibold text-green-600 dark:text-green-400' : ''}>
                        {event.title}
                      </span>
                    </div>
                  );
                })}
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
  
  const { isCompleted } = useProgress();
  const { profile } = useProfileStore();
  const { contrastHigh } = useSettings();

  useEffect(() => {
    async function loadTimeline() {
      try {
        setLoading(true);
        const data = await CompleteTimelineService.getCompleteTimelineData();
        setTimelineData(data);
        
        // Synchroniser la progression lors du chargement
        const progressStore = useProgress.getState();
        progressStore.syncWithProfile();
      } catch (error) {
        console.error('Erreur lors du chargement de la timeline:', error);
      } finally {
        setLoading(false);
      }
    }
    loadTimeline();
  }, []);

  // Fonction pour vérifier si une leçon est terminée
  const isLessonCompleted = (eventId: string) => {
    // Vérifier dans le progressStore ET dans le profil
    const progressCompleted = isCompleted(eventId);
    const profileCompleted = profile?.completedLessons?.includes(eventId) || false;
    return progressCompleted || profileCompleted;
  };

  // Calculer les statistiques de progression
  const getProgressStats = () => {
    if (!timelineData) return { completed: 0, total: 0, percentage: 0 };
    
    const allEvents = Object.values(timelineData.timeline.periods).flatMap(period => period.events);
    const availableEvents = allEvents.filter(event => event.available);
    const completedEvents = availableEvents.filter(event => isLessonCompleted(event.id));
    
    return {
      completed: completedEvents.length,
      total: availableEvents.length,
      percentage: availableEvents.length > 0 ? Math.round((completedEvents.length / availableEvents.length) * 100) : 0
    };
  };

  const progressStats = getProgressStats();

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
        {/* Bouton de retour */}
        <div className="mb-6">
          <Link
            to="/"
            className={`inline-flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              contrastHigh
                ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                : 'bg-white hover:bg-gray-50 text-gray-700 shadow-lg hover:shadow-xl border border-gray-200'
            }`}
          >
            <span className="text-2xl mr-2">←</span>
            <span>Retour à l'accueil</span>
          </Link>
        </div>

        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            📜 Frise Chronologique Biblique Complète
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
            {timelineData.timeline.description}
          </p>

          {/* Progression du profil */}
          {profile && (
            <div className={`max-w-md mx-auto mb-6 p-4 rounded-2xl ${
              contrastHigh 
                ? 'bg-contrast-bg border-2 border-contrast-text'
                : 'bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">👤</span>
                  <span className={`font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}>
                    {profile.firstName}
                  </span>
                </div>
                <div className={`text-sm px-3 py-1 rounded-full ${
                  contrastHigh 
                    ? 'bg-contrast-text text-contrast-bg'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {progressStats.percentage}% terminé
                </div>
              </div>
              
              {/* Barre de progression */}
              <div className={`w-full h-3 rounded-full overflow-hidden ${
                contrastHigh ? 'bg-contrast-text/20' : 'bg-gray-200'
              }`}>
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    contrastHigh 
                      ? 'bg-contrast-text'
                      : 'bg-gradient-to-r from-green-500 to-blue-500'
                  }`}
                  style={{ width: `${progressStats.percentage}%` }}
                />
              </div>
              
              <div className={`text-sm mt-2 ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}>
                {progressStats.completed} / {progressStats.total} histoires terminées
              </div>
            </div>
          )}
          
        </div>

        {/* Sélecteur de périodes */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex flex-wrap justify-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg">
              {timelineData.timeline.periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    selectedPeriod === period.id
                      ? 'text-white shadow-lg transform scale-105'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  style={{
                    backgroundColor: selectedPeriod === period.id ? period.color : 'transparent',
                  }}
                >
                  <span className="text-xl">{period.icon}</span>
                  <span className="text-sm font-medium">{period.title}</span>
                </button>
              ))}
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

            {/* Événements de la période */}
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {selectedPeriodData.events.map((event) => {
                const completed = isLessonCompleted(event.id);
                return (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all transform hover:scale-105 min-h-[120px] flex flex-col relative ${
                      completed
                        ? contrastHigh 
                          ? 'border-contrast-text bg-contrast-bg'
                          : 'border-green-400 bg-green-100 dark:bg-green-900/30 dark:border-green-500 hover:shadow-lg'
                        : event.available
                        ? contrastHigh
                          ? 'border-contrast-text/50 bg-contrast-bg/50'
                          : 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700 hover:shadow-lg'
                        : contrastHigh
                        ? 'border-contrast-text/20 bg-contrast-bg/20'
                        : 'border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600'
                    }`}
                  >
                    {/* Badge de statut */}
                    <div className="absolute -top-2 -right-2">
                      {completed ? (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          contrastHigh 
                            ? 'bg-contrast-text text-contrast-bg'
                            : 'bg-green-500 text-white'
                        } shadow-lg`}>
                          <span className="text-sm">✓</span>
                        </div>
                      ) : event.available ? (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          contrastHigh 
                            ? 'bg-contrast-text text-contrast-bg'
                            : 'bg-blue-500 text-white'
                        } shadow-lg`}>
                          <span className="text-sm">📚</span>
                        </div>
                      ) : (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          contrastHigh 
                            ? 'bg-contrast-text/50 text-contrast-bg'
                            : 'bg-gray-400 text-white'
                        } shadow-lg`}>
                          <span className="text-sm">⏳</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-start justify-between mb-2 flex-shrink-0">
                      <h4 className={`font-bold text-sm leading-tight pr-8 ${
                        contrastHigh 
                          ? 'text-contrast-text'
                          : completed 
                          ? 'text-green-800 dark:text-green-200'
                          : event.available
                          ? 'text-blue-800 dark:text-blue-200'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {event.title}
                      </h4>
                      </div>
                    
                    <p className={`text-sm mb-3 flex-grow ${
                      contrastHigh 
                        ? 'text-contrast-text'
                        : completed 
                        ? 'text-green-700 dark:text-green-300'
                        : event.available
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {event.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs mt-auto">
                      <span className={`px-2 py-1 rounded ${
                        contrastHigh 
                          ? 'bg-contrast-text/20 text-contrast-text'
                          : completed 
                          ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : event.available
                          ? 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                      }`}>
                        📖 {event.book}
                      </span>
                      {event.year_bc && (
                        <span className={`px-2 py-1 rounded ${
                          contrastHigh 
                            ? 'bg-contrast-text/20 text-contrast-text'
                            : 'bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                        }`}>
                          {event.year_bc} av. J.-C.
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bouton retour */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
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