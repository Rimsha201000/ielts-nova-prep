import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Pages
import { HomePage } from './pages/HomePage';
import { PracticeHubPage } from './pages/PracticeHubPage';
import { ListeningPage } from './pages/ListeningPage';
import { ReadingPage } from './pages/ReadingPage';
import { WritingPage } from './pages/WritingPage';
import { SpeakingPage } from './pages/SpeakingPage';
import { MockTestsPage } from './pages/MockTestsPage';
import { DiagnosticPage } from './pages/DiagnosticPage';
import { MistakeBookPage } from './pages/MistakeBookPage';
import { VocabularyPage } from './pages/VocabularyPage';
import { GrammarPage } from './pages/GrammarPage';
import { ProgressPage } from './pages/ProgressPage';
import { StudyGuidePage } from './pages/StudyGuidePage';
import { StudyPlanPage } from './pages/StudyPlanPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  const getInitialRoute = () => {
    // Support both pathname and hash for maximum deployment flexibility
    const hash = window.location.hash.replace('#', '');
    if (hash) return hash;
    const path = window.location.pathname;
    return path === '' ? '/' : path;
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);

  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.replace('#', '');
      const path = window.location.pathname;
      setCurrentRoute(hash || (path === '' ? '/' : path));
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = (route: string) => {
    setCurrentRoute(route);
    // Update hash for local file / static hosting safety
    window.location.hash = route;
    window.scrollTo(0, 0);
  };

  // Route Resolver
  const renderCurrentPage = () => {
    const cleanRoute = currentRoute.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';

    switch (cleanRoute) {
      case '/':
        return <HomePage onNavigate={navigate} />;
      case '/practice':
        return <PracticeHubPage onNavigate={navigate} />;
      case '/listening':
        return <ListeningPage onNavigate={navigate} />;
      case '/reading':
        return <ReadingPage onNavigate={navigate} />;
      case '/writing':
        return <WritingPage onNavigate={navigate} />;
      case '/speaking':
        return <SpeakingPage onNavigate={navigate} />;
      case '/mock-tests':
        return <MockTestsPage onNavigate={navigate} />;
      case '/diagnostic':
        return <DiagnosticPage onNavigate={navigate} />;
      case '/mistakes':
        return <MistakeBookPage onNavigate={navigate} />;
      case '/vocabulary':
        return <VocabularyPage onNavigate={navigate} />;
      case '/grammar':
        return <GrammarPage onNavigate={navigate} />;
      case '/progress':
        return <ProgressPage onNavigate={navigate} />;
      case '/study-guide':
        return <StudyGuidePage onNavigate={navigate} />;
      case '/study-plan':
        return <StudyPlanPage onNavigate={navigate} />;
      case '/about':
        return <AboutPage onNavigate={navigate} />;
      case '/privacy':
        return <PrivacyPage onNavigate={navigate} />;
      case '/accessibility':
        return <AccessibilityPage onNavigate={navigate} />;
      default:
        return <NotFoundPage onNavigate={navigate} />;
    }
  };

  return (
    <ThemeProvider>
      <UserProvider>
        <ErrorBoundary>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar currentRoute={currentRoute} onNavigate={navigate} />
            <main style={{ flex: 1 }}>
              {renderCurrentPage()}
            </main>
            <Footer onNavigate={navigate} />
          </div>
        </ErrorBoundary>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
