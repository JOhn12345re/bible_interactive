import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSettings } from './state/settingsStore';
import { useProfileStore } from './state/profileStore';
import Home from './pages/Home';
const Lesson = lazy(() => import('./pages/Lesson'));
const LessonsPage = lazy(() => import('./pages/LessonsPage'));
const GamesPage = lazy(() => import('./pages/GamesPage'));
const GamePage = lazy(() => import('./pages/GamePage'));
const JournalPage = lazy(() => import('./pages/JournalPage'));
const VerseMemoryGame = lazy(() => import('./pages/VerseMemoryGame'));
const TempleBuilderGame = lazy(() => import('./pages/TempleBuilderGame'));
const MiracleRaceGame = lazy(() => import('./pages/MiracleRaceGame'));
const BibleQuizGame = lazy(() => import('./pages/BibleQuizGame'));
const VerseMemoryCardGame = lazy(() => import('./pages/VerseMemoryCardGame'));
const ArkPuzzleGame = lazy(() => import('./pages/ArkPuzzleGame'));
const TreasureHuntGame = lazy(() => import('./pages/TreasureHuntGame'));
const SerpentAirainGame = lazy(() => import('./pages/SerpentAirainGame'));
const AdamEveTimelineGame = lazy(() => import('./components/AdamEveTimelineGame'));
const CreationTimelineGame = lazy(() => import('./components/CreationTimelineGame'));
const CainAbelTimelineGame = lazy(() => import('./components/CainAbelTimelineGame'));
const AbrahamTimelineGame = lazy(() => import('./components/AbrahamTimelineGame'));
const BabelTimelineGame = lazy(() => import('./components/BabelTimelineGame'));
const NaissanceJesusTimelineGame = lazy(() => import('./components/NaissanceJesusTimelineGame'));

const CompleteTimeline = lazy(() => import('./components/CompleteTimeline'));
const BibleExplorer = lazy(() => import('./pages/BibleExplorer'));
const SermonSection = lazy(() => import('./components/SermonSection'));
const TopicsExplorer = lazy(() => import('./components/TopicsExplorer'));
const CopticChurchHistoryPage = lazy(() => import('./pages/CopticChurchHistoryPage'));
const CopticSaintsPage = lazy(() => import('./pages/CopticSaintsPage'));
const CopticIconsPage = lazy(() => import('./pages/CopticIconsPage'));
const CopticImportantDatesPage = lazy(() => import('./pages/CopticImportantDatesPage'));
const ChristianHistoryPage = lazy(() => import('./pages/ChristianHistoryPage'));
const OrthodoxPresenterPage = lazy(() => import('./pages/OrthodoxPresenterPage'));
const KatamerosPage = lazy(() => import('./pages/KatamerosPage'));
const DailyReadingPage = lazy(() => import('./pages/DailyReadingPage'));
const DailyVersePage = lazy(() => import('./pages/DailyVersePage'));
const SpiritualChallengesPage = lazy(() => import('./pages/SpiritualChallengesPage'));
const VerseMemorizationPage = lazy(() => import('./pages/VerseMemorizationPage'));
import MobileNavigation from './components/MobileNavigation';
import AudioControls from './components/AudioControls';
import AccessibilityControls from './components/AccessibilityControls';
import ProfileDashboard from './components/ProfileDashboard';
import AchievementManager from './components/AchievementManager';
import LevelUpManager from './components/LevelUpManager';
// Production build: test/debug pages removed

function App() {
  const { fontScale, contrastHigh, fontFamily } = useSettings();
  const { initializeDemoProfile } = useProfileStore();

  useEffect(() => {
    // Initialiser un profil de démonstration si aucun n'existe
    initializeDemoProfile();
  }, [initializeDemoProfile]);

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        contrastHigh
          ? 'bg-contrast-bg text-contrast-text'
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
      }`}
      style={{
        fontSize: `${fontScale}rem`,
        fontFamily:
          fontFamily === 'opendyslexic'
            ? 'OpenDyslexic, sans-serif'
            : 'system-ui, sans-serif',
      }}
    >
      {/* Particules de fond animées */}
      {!contrastHigh && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-20 left-[10%] w-4 h-4 bg-blue-200 rounded-full opacity-30 animate-float"></div>
          <div
            className="absolute top-[30%] right-[15%] w-6 h-6 bg-purple-200 rounded-full opacity-25 animate-float"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute bottom-[40%] left-[20%] w-3 h-3 bg-indigo-200 rounded-full opacity-35 animate-float"
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className="absolute top-[60%] right-[30%] w-5 h-5 bg-cyan-200 rounded-full opacity-20 animate-float"
            style={{ animationDelay: '0.5s' }}
          ></div>
          <div
            className="absolute bottom-20 right-[10%] w-4 h-4 bg-pink-200 rounded-full opacity-30 animate-float"
            style={{ animationDelay: '1.5s' }}
          ></div>
        </div>
      )}

      <div className="relative z-10">
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          {/* Navigation mobile */}
          <MobileNavigation />

          <Suspense
            fallback={<div className="p-8 text-center">Chargement...</div>}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lessons" element={<LessonsPage />} />
              <Route path="/lesson/:id" element={<Lesson />} />
              <Route path="/game/:id/:gameType" element={<GamePage />} />
              <Route path="/game/adam_eve_01/timeline_cards" element={<AdamEveTimelineGame />} />
              <Route path="/game/creation_01/timeline_cards" element={<CreationTimelineGame />} />
              <Route path="/game/cain_abel_01/timeline_cards" element={<CainAbelTimelineGame />} />
              <Route path="/game/abraham_01/timeline_cards" element={<AbrahamTimelineGame />} />
              <Route path="/game/babel_01/timeline_cards" element={<BabelTimelineGame />} />
              <Route path="/game/naissance_jesus/timeline_cards" element={<NaissanceJesusTimelineGame />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/games/verse-memory" element={<VerseMemoryGame />} />
              <Route
                path="/games/temple-builder"
                element={<TempleBuilderGame />}
              />
              <Route path="/games/miracle-race" element={<MiracleRaceGame />} />
              <Route path="/games/bible-quiz" element={<BibleQuizGame />} />
              <Route
                path="/games/verse-memory-cards"
                element={<VerseMemoryCardGame />}
              />
              <Route path="/games/ark-puzzle" element={<ArkPuzzleGame />} />
              <Route
                path="/games/treasure-hunt"
                element={<TreasureHuntGame />}
              />
              <Route
                path="/games/serpent-airain"
                element={<SerpentAirainGame />}
              />

              <Route path="/journal" element={<JournalPage />} />
              <Route path="/timeline-complete" element={<CompleteTimeline />} />
              <Route path="/timeline" element={<CompleteTimeline />} />
              <Route path="/bible" element={<BibleExplorer />} />
              <Route path="/sermons" element={<SermonSection />} />
              <Route path="/topics" element={<TopicsExplorer />} />
              <Route path="/christian-history" element={<ChristianHistoryPage />} />
              <Route path="/coptic-church" element={<CopticChurchHistoryPage />} />
              <Route path="/coptic-church/saints" element={<CopticSaintsPage />} />
              <Route path="/coptic-church/icons" element={<CopticIconsPage />} />
              <Route path="/coptic-church/important-dates" element={<CopticImportantDatesPage />} />
              <Route path="/orthodox-presenter" element={<OrthodoxPresenterPage />} />
              <Route path="/katameros" element={<KatamerosPage />} />
              <Route path="/daily-reading" element={<DailyReadingPage />} />
              <Route path="/daily-verse" element={<DailyVersePage />} />
              <Route path="/spiritual-challenges" element={<SpiritualChallengesPage />} />
              <Route path="/verse-memorization" element={<VerseMemorizationPage />} />
              <Route path="/profile" element={<ProfileDashboard />} />
              {/* test-bible route removed */}
              {/* test/debug routes removed */}
            </Routes>
          </Suspense>
        </Router>

        {/* Contrôles audio globaux */}
        <AudioControls />

        {/* Contrôles d'accessibilité */}
        <AccessibilityControls />

        {/* Gestionnaire d'achievements */}
        <AchievementManager />

        {/* Gestionnaire de montée de niveau */}
        <LevelUpManager />
      </div>
    </div>
  );
}

export default App;
