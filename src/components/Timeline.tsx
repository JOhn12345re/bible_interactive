import React, { useState, useEffect } from 'react';
import { useSettings } from '../state/settingsStore';
import { useProgress } from '../state/progressStore';
import { Link } from 'react-router-dom';
import {
  TimelineService,
  type TimelineData,
  type Period as BasePeriod,
  type Story,
} from '../services/timelineService';

type Period = BasePeriod & { pivot?: boolean };

export default function Timeline() {
  const [timelineData, setTimelineData] = useState<TimelineData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('creation');
  const [loading, setLoading] = useState(true);
  const { contrastHigh } = useSettings();
  const { isCompleted } = useProgress();

  useEffect(() => {
    // Charger les données de la timeline via le service intégré
    try {
      const data = TimelineService.getTimelineData();
      setTimelineData(data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement de la timeline:', error);
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

  const periods = timelineData.timeline.periods as unknown as Period[];

  return (
    <div className="max-w-7xl mx-auto p-responsive">
      {/* En-tête */}
      <div className="text-center mb-8">
        <h1 className="text-responsive-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📜 {timelineData.timeline.title}
        </h1>
        <p
          className={`text-responsive-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}
        >
          {timelineData.timeline.description}
        </p>
      </div>

      {/* Frise chronologique responsive */}
      <div className="relative mb-12">
        {/* Version desktop - Ligne centrale */}
        <div
          className={`hidden lg:block absolute left-0 right-0 top-1/2 h-1 transform -translate-y-1/2 ${
            contrastHigh
              ? 'bg-contrast-text'
              : 'bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200'
          }`}
        ></div>

        {/* Version desktop - Périodes en ligne */}
        <div className="hidden lg:flex justify-between items-center relative z-10">
          {periods.map((period, index) => {
            const isSelected = selectedPeriod === period.id;
            const availableStories = period.stories.filter(
              (story) => story.available
            ).length;
            const completedStories = period.stories.filter((story) =>
              isCompleted(story.id)
            ).length;
            const progressPercentage =
              availableStories > 0
                ? (completedStories / availableStories) * 100
                : 0;

            return (
              <div key={period.id} className="flex flex-col items-center">
                {/* Icône de la période */}
                <button
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-300 transform hover:scale-110 border-4 ${
                    isSelected
                      ? contrastHigh
                        ? 'bg-contrast-text text-contrast-bg border-contrast-text shadow-lg'
                        : 'bg-white border-blue-500 shadow-lg'
                      : contrastHigh
                        ? 'bg-contrast-bg text-contrast-text border-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                        : 'bg-white border-gray-300 hover:border-blue-400 shadow-md'
                  }`}
                  style={{
                    backgroundColor:
                      !contrastHigh && isSelected ? period.color : undefined,
                    color: !contrastHigh && isSelected ? 'white' : undefined,
                  }}
                  aria-label={`Période: ${period.title}`}
                >
                  {period.icon}
                </button>

                {/* Barre de progression */}
                {availableStories > 0 && (
                  <div className="w-16 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                )}

                {/* Titre de la période */}
                <h3
                  className={`text-sm font-bold mt-2 text-center ${
                    isSelected
                      ? contrastHigh
                        ? 'text-contrast-text'
                        : 'text-blue-600'
                      : contrastHigh
                        ? 'text-contrast-text'
                        : 'text-gray-700'
                  }`}
                >
                  {period.title}
                </h3>

                {/* Indicateur pivot pour le Christ */}
                {period.pivot && (
                  <div
                    className={`text-xs font-bold mt-1 px-2 py-1 rounded ${
                      contrastHigh
                        ? 'bg-contrast-text text-contrast-bg'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    PIVOT
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Version mobile/tablette - Scroll horizontal */}
        <div className="lg:hidden">
          <div
            className="flex overflow-x-auto scroll-smooth space-x-4 pb-4"
            style={{ scrollbarWidth: 'thin' }}
          >
            {periods.map((period, index) => {
              const isSelected = selectedPeriod === period.id;
              const availableStories = period.stories.filter(
                (story) => story.available
              ).length;
              const completedStories = period.stories.filter((story) =>
                isCompleted(story.id)
              ).length;
              const progressPercentage =
                availableStories > 0
                  ? (completedStories / availableStories) * 100
                  : 0;

              return (
                <div
                  key={period.id}
                  className="flex-shrink-0 flex flex-col items-center min-w-[120px]"
                >
                  {/* Icône de la période */}
                  <button
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold transition-all duration-300 transform hover:scale-110 border-4 ${
                      isSelected
                        ? contrastHigh
                          ? 'bg-contrast-text text-contrast-bg border-contrast-text shadow-lg'
                          : 'bg-white border-blue-500 shadow-lg'
                        : contrastHigh
                          ? 'bg-contrast-bg text-contrast-text border-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                          : 'bg-white border-gray-300 hover:border-blue-400 shadow-md'
                    }`}
                    style={{
                      backgroundColor:
                        !contrastHigh && isSelected ? period.color : undefined,
                      color: !contrastHigh && isSelected ? 'white' : undefined,
                    }}
                    aria-label={`Période: ${period.title}`}
                  >
                    {period.icon}
                  </button>

                  {/* Barre de progression */}
                  {availableStories > 0 && (
                    <div className="w-12 sm:w-16 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-green-500 transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  )}

                  {/* Titre de la période */}
                  <h3
                    className={`text-xs sm:text-sm font-bold mt-2 text-center ${
                      isSelected
                        ? contrastHigh
                          ? 'text-contrast-text'
                          : 'text-blue-600'
                        : contrastHigh
                          ? 'text-contrast-text'
                          : 'text-gray-700'
                    }`}
                  >
                    {period.title}
                  </h3>

                  {/* Indicateur pivot pour le Christ */}
                  {period.pivot && (
                    <div
                      className={`text-xs font-bold mt-1 px-2 py-1 rounded ${
                        contrastHigh
                          ? 'bg-contrast-text text-contrast-bg'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      PIVOT
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Détails de la période sélectionnée */}
      {selectedPeriodData && (
        <div
          className={`rounded-lg p-responsive ${
            contrastHigh
              ? 'bg-contrast-bg border-2 border-contrast-text'
              : 'bg-white border border-gray-200 shadow-lg'
          }`}
        >
          <div className="flex items-center mb-4">
            <span className="text-3xl sm:text-4xl mr-3 sm:mr-4">
              {selectedPeriodData.icon}
            </span>
            <div>
              <h2
                className={`text-xl sm:text-2xl font-bold ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}
              >
                {selectedPeriodData.title}
              </h2>
              <p
                className={`text-xs sm:text-sm ${contrastHigh ? 'text-contrast-text' : 'text-gray-600'}`}
              >
                {selectedPeriodData.biblical_time}
              </p>
            </div>
          </div>

          <p
            className={`text-base sm:text-lg mb-6 ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}
          >
            {selectedPeriodData.description}
          </p>

          {/* Histoires de la période */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedPeriodData.stories.map((story) => {
              const completed = isCompleted(story.id);

              return (
                <div
                  key={story.id}
                  className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                    story.available
                      ? contrastHigh
                        ? completed
                          ? 'bg-contrast-text text-contrast-bg border-contrast-text'
                          : 'bg-contrast-bg text-contrast-text border-contrast-text hover:bg-contrast-text hover:text-contrast-bg'
                        : completed
                          ? 'bg-green-50 border-green-300 text-green-800'
                          : 'bg-blue-50 border-blue-300 hover:bg-blue-100'
                      : contrastHigh
                        ? 'bg-contrast-bg text-contrast-text border-contrast-text opacity-50 cursor-not-allowed'
                        : 'bg-gray-200 border-gray-400 text-gray-400 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className={`font-bold text-base sm:text-lg pr-2 ${!story.available ? 'text-gray-400' : ''}`}>
                      {story.title}
                    </h4>
                    <div className="flex-shrink-0">
                      {completed && (
                        <span className="text-green-600 text-lg sm:text-xl">
                          ✅
                        </span>
                      )}
                      {!story.available && (
                        <span className="text-gray-400 text-lg sm:text-xl">
                          🔒
                        </span>
                      )}
                    </div>
                  </div>

                  <p
                    className={`text-xs sm:text-sm mb-2 ${
                      story.available
                        ? contrastHigh
                          ? 'text-contrast-text'
                          : 'text-gray-600'
                        : 'text-gray-400'
                    }`}
                  >
                    📖 {story.book}
                  </p>

                  <p
                    className={`text-xs sm:text-sm mb-4 ${
                      story.available
                        ? contrastHigh
                          ? 'text-contrast-text'
                          : 'text-gray-700'
                        : 'text-gray-400'
                    }`}
                  >
                    {story.description}
                  </p>

                  {/* Indicateur de jeux disponibles */}
                  {story.available && (
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xs sm:text-sm text-purple-600 font-medium">
                        🎮 Jeux disponibles
                      </span>
                      <div className="flex space-x-1">
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          🧩 Ordre
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          ❓ Quiz
                        </span>
                      </div>
                    </div>
                  )}

                  {story.available ? (
                    <Link
                      to={`/lesson/${story.id}`}
                      state={{ fromTimeline: true }}
                      className={`inline-block px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                        contrastHigh
                          ? 'bg-contrast-text text-contrast-bg hover:opacity-80'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {completed ? 'Rejouer' : 'Commencer'}
                    </Link>
                  ) : (
                    <span className="inline-block px-3 sm:px-4 py-2 rounded-lg font-medium bg-gray-300 text-gray-500 cursor-not-allowed text-sm sm:text-base">
                      Bientôt disponible
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Objectifs pédagogiques */}
      <div
        className={`mt-8 p-responsive rounded-lg ${
          contrastHigh
            ? 'bg-contrast-bg border-2 border-contrast-text'
            : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'
        }`}
      >
        <h3
          className={`text-lg sm:text-xl font-bold mb-4 ${contrastHigh ? 'text-contrast-text' : 'text-gray-800'}`}
        >
          🎯 Objectifs pédagogiques
        </h3>
        <ul className="space-y-2">
          {timelineData.educational_goals.map((goal, index) => (
            <li
              key={index}
              className={`flex items-start text-sm sm:text-base ${contrastHigh ? 'text-contrast-text' : 'text-gray-700'}`}
            >
              <span className="text-blue-500 mr-2 mt-0.5 flex-shrink-0">✓</span>
              <span>{goal}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
