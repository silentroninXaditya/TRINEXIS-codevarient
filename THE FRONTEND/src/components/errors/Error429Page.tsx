import React from 'react';
import { ServerOff, ArrowLeft } from 'lucide-react';
import { TactileSliderButton } from '../common/TactileSliderButton';

interface Error429PageProps {
  onReturn: () => void;
}

export const Error429Page: React.FC<Error429PageProps> = ({ onReturn }) => {
  return (
    <div className="error-screen-container">
      <div className="error-screen-card">
        {/* Glow & Atmosphere */}
        <div className="error-screen-badge-row">
          <span className="error-pill-pulse">
            <ServerOff size={13} />
            <span>CIRCUIT DETACHED</span>
          </span>
          <span className="error-code-badge">HTTP 429 // RATE LIMIT</span>
        </div>

        {/* Big Glitch 429 Number */}
        <div className="error-giant-num">
          <span className="num-glitch">429</span>
          <span className="error-cross">✝</span>
        </div>

        {/* Core Notice as instructed by user */}
        <h1 className="error-main-headline">
          BACKEND IS NOT ATTACHED
        </h1>

        <p className="error-lead-message">
          The AI Necromancy inference pipeline cannot process your request because the <strong>backend is not attached</strong>. The neural resurrection gateway is currently disconnected from live compute.
        </p>

        {/* Diagnostic Forensic Box */}
        <div className="error-forensic-box">
          <div className="forensic-row">
            <span className="forensic-key">SYSTEM STATUS:</span>
            <span className="forensic-val err-status">BACKEND SERVICE NOT ATTACHED</span>
          </div>
          <div className="forensic-row">
            <span className="forensic-key">INFERENCE GATEWAY:</span>
            <span className="forensic-val">OFFLINE / DORMANT (NO LOCAL DAEMON)</span>
          </div>
          <div className="forensic-row">
            <span className="forensic-key">TRIGGER EVENT:</span>
            <span className="forensic-val">AI Chatbox Prompt Input Received</span>
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
          <button
            type="button"
            className="error-simple-return-link"
            onClick={onReturn}
          >
            ← Or click directly to return to dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
