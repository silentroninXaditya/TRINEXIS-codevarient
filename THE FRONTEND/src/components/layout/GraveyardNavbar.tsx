import React from 'react';
import { ThemeToggleSwitch } from '../common/ThemeToggleSwitch';
import { BuryProjectReaperSlider } from './BuryProjectReaperSlider';

export type DashboardView = 'dashboard' | 'discovery' | 'vault' | 'error_429' | 'error_404';

interface GraveyardNavbarProps {
  currentView: DashboardView;
  onSelectView?: (view: DashboardView) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onBuryProject?: () => void;
  vaultCount?: number;
}

export const GraveyardNavbar: React.FC<GraveyardNavbarProps> = ({
  currentView,
  onSelectView: _onSelectView,
  theme,
  onToggleTheme,
  onBuryProject,
}) => {
  return (
    <header className="graveyard-main-navbar">
      <div className="navbar-inner-container">
        
        {/* Left Side: JUST the Brand Name */}
        <div className="navbar-brand-section">
          <span className="brand-cross-symbol">✝</span>
          <span className="brand-title">THE PROJECT GRAVEYARD</span>
        </div>

        {/* Center: Screen State Indicator (DASHBOARD, DISCOVERY, MY VAULT) — Changes by slider only, only color changes */}
        <div className="navbar-tabs-slider" role="status" aria-label="Current Screen Indicator">
          <span
            className={`nav-slider-tab ${currentView === 'dashboard' ? 'active-tab' : ''}`}
            aria-current={currentView === 'dashboard' ? 'page' : undefined}
          >
            DASHBOARD
          </span>

          <span
            className={`nav-slider-tab ${currentView === 'discovery' ? 'active-tab' : ''}`}
            aria-current={currentView === 'discovery' ? 'page' : undefined}
          >
            DISCOVERY
          </span>

          <span
            className={`nav-slider-tab ${currentView === 'vault' ? 'active-tab' : ''}`}
            aria-current={currentView === 'vault' ? 'page' : undefined}
          >
            MY VAULT
          </span>
        </div>

        {/* Right Side: Bury Project Reaper Slider and physical Theme Toggle */}
        <div className="navbar-actions-group">
          {onBuryProject && (
            <BuryProjectReaperSlider
              onBuryProject={onBuryProject}
              theme={theme}
            />
          )}
          <ThemeToggleSwitch theme={theme} onToggle={onToggleTheme} />
        </div>

      </div>
    </header>
  );
};
