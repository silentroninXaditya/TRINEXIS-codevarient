import React from 'react';
import type { DashboardView } from './GraveyardNavbar';

interface GraveyardFooterProps {
  onSelectView: (view: DashboardView) => void;
}

export const GraveyardFooter: React.FC<GraveyardFooterProps> = ({ onSelectView }) => {
  return (
    <footer className="graveyard-main-footer">
      <div className="footer-inner-container">
        
        {/* Top / Brand Row */}
        <div className="footer-top-row">
          <div className="footer-brand-block">
            <div className="footer-logo">
              <span className="cross-glyph">✝</span>
              <span className="footer-title">THE PROJECT GRAVEYARD</span>
            </div>
            <p className="footer-motto">
              Where lost software finds new purpose. Preserving abandoned codebases, hackathon builds, and unmaintained relics through autonomous AI exhumation.
            </p>
          </div>

          {/* Quick Page Links */}
          <div className="footer-nav-col">
            <span className="footer-col-header">SANCTUARY VIEWS</span>
            <ul className="footer-links-list">
              <li>
                <button type="button" onClick={() => onSelectView('dashboard')} className="footer-nav-link">
                  Dashboard
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onSelectView('discovery')} className="footer-nav-link">
                  Discovery Archives
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onSelectView('vault')} className="footer-nav-link">
                  Personal Vault & Burial
                </button>
              </li>
            </ul>
          </div>

          {/* System Protocol Indicators */}
          <div className="footer-stats-col">
            <span className="footer-col-header">GRAVEYARD PROTOCOL</span>
            <div className="protocol-pill-group">
              <span className="protocol-tag-badge">518M+ CATALOGUED</span>
              <span className="protocol-tag-badge">CANVAS PROTOCOL</span>
              <span className="protocol-tag-badge">LOCAL VAULT SYNC</span>
            </div>
            <span className="footer-subtext-note">
              Runs 100% locally in your browser. All exhumations & backups are encrypted in local catacombs.
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <span className="footer-copyright">
            © 2026 THE PROJECT GRAVEYARD // CODE VARIANT BUILD 01
          </span>
          <span className="footer-version-tag">
            SURPRISE CHALLENGE: THE CANVAS PROTOCOL COMPLIANT
          </span>
        </div>

      </div>
    </footer>
  );
};
