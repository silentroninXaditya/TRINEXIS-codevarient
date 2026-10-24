import React from 'react';
import { Cpu, ArrowLeft } from 'lucide-react';
import { TactileSliderButton } from '../common/TactileSliderButton';

interface Error404PageProps {
  onReturn: () => void;
  onReturnToDiscovery?: () => void;
}

export const Error404Page: React.FC<Error404PageProps> = ({ onReturn, onReturnToDiscovery }) => {
  return (
    <div className="error-screen-container">
      <div className="error-screen-card">
        {/* Glow & Atmosphere */}
        <div className="error-screen-badge-row">
          <span className="error-pill-pulse amber">
            <Cpu size={13} />
            <span>DISCOVERY OFFLINE</span>
          </span>
          <span className="error-code-badge">HTTP 404 // NOT FOUND</span>
        </div>

        {/* Big Glitch 404 Number */}
        <div className="error-giant-num">
          <span className="num-glitch">404</span>
          <span className="error-cross">✝</span>
        </div>

        {/* Core Notice as instructed by user */}
        <h1 className="error-main-headline">
          AI ENGINE IS NOT CONNECTED
        </h1>

        <p className="error-lead-message">
          The Discovery Searchbar cannot scan dead repositories because the <strong>AI engine is not connected</strong>. Semantic exhumation vectors and repository indexing are currently unreachable.
        </p>

        {/* Diagnostic Forensic Box */}
        <div className="error-forensic-box">
          <div className="forensic-row">
            <span className="forensic-key">SYSTEM STATUS:</span>
            <span className="forensic-val err-status">AI ENGINE IS NOT CONNECTED</span>
          </div>
          <div className="forensic-row">
            <span className="forensic-key">SEARCH ENGINE:</span>
            <span className="forensic-val">OFFLINE // NEURAL INDEX DISCONNECTED</span>
          </div>
          <div className="forensic-row">
            <span className="forensic-key">TRIGGER EVENT:</span>
            <span className="forensic-val">Discovery Searchbar Search Attempted</span>
          </div>
          <div className="forensic-row">
            <span className="forensic-key">RESOLUTION:</span>
            <span className="forensic-val ok-status">Slide control below to return to active Dashboard</span>
          </div>
        </div>

        {/* Tactile Slider to Return to Dashboard (all buttons converted to sliders) */}
        <div className="error-return-slider-dock">
          <TactileSliderButton
            label="RETURN"
            guideText="SLIDE TO RETURN TO DASHBOARD ❯❯"
            icon={<ArrowLeft size={14} />}
            onComplete={onReturn}
            colorTheme="crimson"
          />
          <div className="error-multi-links">
            <button
              type="button"
              className="error-simple-return-link"
              onClick={onReturn}
            >
              ← Or click to return to Dashboard
            </button>
            {onReturnToDiscovery && (
              <button
                type="button"
                className="error-simple-return-link"
                onClick={onReturnToDiscovery}
              >
                Return to Discovery Archives →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
