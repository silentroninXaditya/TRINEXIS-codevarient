import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { GraveyardDashboard } from './components/dashboard/GraveyardDashboard';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { VaultProvider } from './context/VaultContext';

type AppStage = 'preloader' | 'auth' | 'main' | '404' | '429';

const AppContent: React.FC = () => {
  const [stage, setStage] = useState<AppStage>('preloader');
  const [userRole, setUserRole] = useState<'guest' | 'user' | null>(null);
  const { theme, toggleTheme, setTheme } = useTheme();

  // Listen for navigation & theme messages from Auth and Error iframes
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== 'object') return;

      if (event.data.type === 'ENTER_APP') {
        setUserRole(event.data.mode || 'guest');
        // Refresh active theme from localStorage on enter
        try {
          const saved = localStorage.getItem('gw-theme') || localStorage.getItem('trinexis_theme');
          if (saved === 'light' || saved === 'dark') {
            setTheme(saved);
          }
        } catch (e) {}
        setStage('main');
      } else if (event.data.type === 'RETURN_TO_MAIN') {
        setStage('main');
      } else if (event.data.type === 'THEME_CHANGED') {
        if (event.data.theme === 'light' || event.data.theme === 'dark') {
          setTheme(event.data.theme);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [setTheme]);

  return (
    <div className={`graveyard-system-shell theme-${theme}`}>
      {/* 1. INITIAL BOOT: Grim Reaper Preloader */}
      {stage === 'preloader' && (
        <Preloader
          minDurationMs={4500}
          theme={theme}
          onComplete={() => setStage('auth')}
        />
      )}

      {/* 2. AUTHENTICATION: Login / Signup / Guest Portal */}
      {stage === 'auth' && (
        <div className="fullscreen-portal-frame">
          <iframe
            src="/auth/index.html"
            title="Project Grave Ward Login"
            className="embedded-portal-view"
          />
        </div>
      )}

      {/* 3. ERROR 404: Lost in the Deep */}
      {stage === '404' && (
        <div className="fullscreen-portal-frame">
          <iframe
            src="/error/index_1.html"
            title="404 Error: Lost in the Deep"
            className="embedded-portal-view"
          />
        </div>
      )}

      {/* 4. ERROR 429: Too Many Requests */}
      {stage === '429' && (
        <div className="fullscreen-portal-frame">
          <iframe
            src="/error/429.html"
            title="429 Error: Too Many Requests"
            className="embedded-portal-view"
          />
        </div>
      )}

      {/* 5. MAIN APPLICATION: The Project Graveyard Dashboard */}
      {stage === 'main' && (
        <GraveyardDashboard
          theme={theme}
          onToggleTheme={toggleTheme}
          userRole={userRole}
          onNavigate404={() => setStage('404')}
          onNavigate429={() => setStage('429')}
          onReplayBoot={() => setStage('preloader')}
          onLogout={() => setStage('auth')}
        />
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <VaultProvider>
        <AppContent />
      </VaultProvider>
    </ThemeProvider>
  );
};

export default App;
