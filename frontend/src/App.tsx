import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { Waves, AlertTriangle, Hammer, RefreshCw, LogOut, ArrowRight } from 'lucide-react';

type AppStage = 'preloader' | 'auth' | 'main' | '404' | '429';

export const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>('preloader');
  const [userRole, setUserRole] = useState<'guest' | 'user' | null>(null);

  // Listen for navigation messages from Auth and Error iframes
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== 'object') return;

      if (event.data.type === 'ENTER_APP') {
        setUserRole(event.data.mode || 'guest');
        setStage('main');
      } else if (event.data.type === 'RETURN_TO_MAIN') {
        setStage('main');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="graveyard-system-shell">
      {/* 1. INITIAL BOOT: Grim Reaper Preloader */}
      {stage === 'preloader' && (
        <Preloader
          minDurationMs={4500}
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

      {/* 5. MAIN PAGE: "Website is under production" + 404 & 429 exploration buttons */}
      {stage === 'main' && (
        <main className="under-production-stage">
          {/* Subtle Ambient Vignette */}
          <div className="under-prod-vignette" />

          {/* Top Status Banner */}
          <div className="production-status-pill">
            <Hammer size={13} className="hammer-pulse" />
            <span>
              STATUS: LOGGED IN AS {userRole ? userRole.toUpperCase() : 'GUEST'} • SYSTEM UNDER DEVELOPMENT
            </span>
          </div>

          {/* Main Title & Message */}
          <div className="production-header-block">
            <div className="gothic-brand-tag">
              <span className="cross-glyph">✝</span>
              <span>THE PROJECT GRAVEYARD</span>
              <span className="cross-glyph">✝</span>
            </div>

            <h1 className="production-headline">
              WEBSITE IS UNDER PRODUCTION
            </h1>

            <p className="production-subtext">
              Where lost software finds a dignified afterlife. Our intelligence engine, project catalogue, and 5-path revival architecture are currently being forged.
            </p>
          </div>

          {/* Interactive Error Component Explorer Buttons */}
          <div className="error-actions-panel">
            <p className="actions-prompt">
              TEST COMPLETED EDGE-STATE MODULES:
            </p>

            <div className="action-buttons-row">
              <button
                type="button"
                className="error-inspect-btn deep-404-btn"
                onClick={() => setStage('404')}
              >
                <div className="btn-icon-wrapper">
                  <Waves size={18} />
                </div>
                <div className="btn-text-content">
                  <span className="btn-title">404 ERROR PAGE</span>
                  <span className="btn-desc">Lost in the Deep (Ocean Descent)</span>
                </div>
                <ArrowRight size={16} className="btn-arrow" />
              </button>

              <button
                type="button"
                className="error-inspect-btn limit-429-btn"
                onClick={() => setStage('429')}
              >
                <div className="btn-icon-wrapper">
                  <AlertTriangle size={18} />
                </div>
                <div className="btn-text-content">
                  <span className="btn-title">429 RATE LIMIT</span>
                  <span className="btn-desc">Too Many Requests (Tide Overload)</span>
                </div>
                <ArrowRight size={16} className="btn-arrow" />
              </button>
            </div>
          </div>

          {/* Secondary Utilities: Replay Boot or Switch Account */}
          <div className="utility-bar-row">
            <button
              type="button"
              className="util-text-btn"
              onClick={() => setStage('preloader')}
            >
              <RefreshCw size={13} />
              <span>Replay Preloader</span>
            </button>

            <span className="util-sep">•</span>

            <button
              type="button"
              className="util-text-btn"
              onClick={() => setStage('auth')}
            >
              <LogOut size={13} />
              <span>Back to Login</span>
            </button>
          </div>
        </main>
      )}
    </div>
  );
};

export default App;
