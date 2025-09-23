import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useSettings } from './state/settingsStore';
import { useProfileStore } from './state/profileStore';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import LessonsPage from './pages/LessonsPage';
import GamesPage from './pages/GamesPage';
import JournalPage from './pages/JournalPage';
import VerseMemoryGame from './pages/VerseMemoryGame';
import TempleBuilderGame from './pages/TempleBuilderGame';
import MiracleRaceGame from './pages/MiracleRaceGame';
import BibleQuizGame from './pages/BibleQuizGame';
import VerseMemoryCardGame from './pages/VerseMemoryCardGame';
import ArkPuzzleGame from './pages/ArkPuzzleGame';
import TreasureHuntGame from './pages/TreasureHuntGame';
import TimelinePage from './pages/TimelinePage';
import BibleExplorer from './pages/BibleExplorer';
import SermonSection from './components/SermonSection';
import TestBible from './pages/TestBible';
import TopicsExplorer from './components/TopicsExplorer';
import MobileNavigation from './components/MobileNavigation';
import AudioControls from './components/AudioControls';
import AccessibilityControls from './components/AccessibilityControls';
import ProfileDashboard from './components/ProfileDashboard';
import AchievementManager from './components/AchievementManager';
import LevelUpManager from './components/LevelUpManager';
import TestSearch from './components/TestSearch';
import DebugSearch from './components/DebugSearch';

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
        fontFamily: fontFamily === 'opendyslexic' ? 'OpenDyslexic, sans-serif' : 'system-ui, sans-serif'
      }}
    >
      {/* Particules de fond animées */}
      {!contrastHigh && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-20 left-[10%] w-4 h-4 bg-blue-200 rounded-full opacity-30 animate-float"></div>
          <div className="absolute top-[30%] right-[15%] w-6 h-6 bg-purple-200 rounded-full opacity-25 animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-[40%] left-[20%] w-3 h-3 bg-indigo-200 rounded-full opacity-35 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-[60%] right-[30%] w-5 h-5 bg-cyan-200 rounded-full opacity-20 animate-float" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-20 right-[10%] w-4 h-4 bg-pink-200 rounded-full opacity-30 animate-float" style={{animationDelay: '1.5s'}}></div>
        </div>
      )}
      
      <div className="relative z-10">
      <Router future={{ 
        v7_startTransition: true,
        v7_relativeSplatPath: true 
      }}>
        {/* Navigation mobile */}
        <MobileNavigation />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/lesson/:id" element={<Lesson />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/verse-memory" element={<VerseMemoryGame />} />
          <Route path="/games/temple-builder" element={<TempleBuilderGame />} />
          <Route path="/games/miracle-race" element={<MiracleRaceGame />} />
          <Route path="/games/bible-quiz" element={<BibleQuizGame />} />
          <Route path="/games/verse-memory-cards" element={<VerseMemoryCardGame />} />
          <Route path="/games/ark-puzzle" element={<ArkPuzzleGame />} />
          <Route path="/games/treasure-hunt" element={<TreasureHuntGame />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/bible" element={<BibleExplorer />} />
          <Route path="/sermons" element={<SermonSection />} />
          <Route path="/profile" element={<ProfileDashboard />} />
          <Route path="/topics" element={<TopicsExplorer />} />
        </Routes>
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
