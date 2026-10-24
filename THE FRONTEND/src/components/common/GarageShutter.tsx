import React, { useEffect, useState, useRef } from 'react';

export interface GarageShutterProps {
  /** If true, triggers a full close-and-open sequence */
  triggerKey?: string | number;
  onClosedMiddle?: () => void;
  onAnimationComplete?: () => void;
  showManualPullButton?: boolean;
}

export const GarageShutter: React.FC<GarageShutterProps> = ({
  triggerKey,
  onClosedMiddle,
  onAnimationComplete,
  showManualPullButton = true,
}) => {
  // Shutter states: 'idle' | 'closing' | 'sealed' | 'opening'
  const [shutterState, setShutterState] = useState<'idle' | 'closing' | 'sealed' | 'opening'>('idle');
  const [statusMessage, setStatusMessage] = useState('ACCESS BAY READY');
  const prevTriggerKeyRef = useRef(triggerKey);
  const isFirstRender = useRef(true);

  // Trigger sequence on triggerKey change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (triggerKey !== prevTriggerKeyRef.current) {
      prevTriggerKeyRef.current = triggerKey;
      runShutterSequence();
    }
  }, [triggerKey]);

  const runShutterSequence = () => {
    if (shutterState !== 'idle') return;

    setShutterState('closing');
    setStatusMessage('ENGAGING HYDRAULIC SHUTTERS...');

    // Midpoint: Shutters completely meet at center
    setTimeout(() => {
      setShutterState('sealed');
      setStatusMessage('SECTOR SEALED // EXHUMATION PROTOCOL');
      if (onClosedMiddle) {
        onClosedMiddle();
      }

      // Hold sealed for 320ms, then open
      setTimeout(() => {
        setShutterState('opening');
        setStatusMessage('DISENGAGING SEALS // ACCESS GRANTED');

        // Fully open
        setTimeout(() => {
          setShutterState('idle');
          setStatusMessage('ACCESS BAY READY');
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        }, 650);
      }, 350);
    }, 600);
  };

  const isVisible = shutterState !== 'idle';

  return (
    <>
      {/* Floating Manual Pull Shutter Lever (Always accessible on dashboard) */}
      {showManualPullButton && (
        <div className="shutter-manual-controller" title="Pull industrial garage shutter">
          <button
            type="button"
            className={`shutter-pull-lever-btn ${shutterState !== 'idle' ? 'pulled' : ''}`}
            onClick={runShutterSequence}
            disabled={shutterState !== 'idle'}
          >
            <div className="lever-chain-line"></div>
            <div className="lever-handle-grip">
              <span className="lever-hazard-bars">///</span>
              <span className="lever-label">PULL SHUTTER</span>
              <span className="lever-hazard-bars">///</span>
            </div>
          </button>
        </div>
      )}

      {/* Industrial Garage Shutter Curtain Overlay */}
      {isVisible && (
        <div className={`garage-shutter-overlay state-${shutterState}`} aria-hidden="true">
          
          {/* Left Garage Shutter Door (Pulls from left towards center) */}
          <div className="shutter-door shutter-door-left">
            <div className="shutter-slats-container">
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} className="corrugated-slat">
                  <div className="slat-rivet slat-rivet-start"></div>
                  <div className="slat-groove"></div>
                  <div className="slat-rivet slat-rivet-mid"></div>
                  <div className="slat-groove"></div>
                  <div className="slat-rivet slat-rivet-end"></div>
                </div>
              ))}
            </div>

            {/* Industrial Hazard Inner Edge Stripe */}
            <div className="shutter-edge-hazard hazard-left"></div>

            {/* Heavy Hydraulic Stamped Plate */}
            <div className="shutter-door-label label-left">
              <span className="stamped-code">ZONE // 01-BAY</span>
              <span className="stamped-title">WEST HANGAR GATE</span>
            </div>
          </div>

          {/* Right Garage Shutter Door (Pulls from right towards center) */}
          <div className="shutter-door shutter-door-right">
            <div className="shutter-slats-container">
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} className="corrugated-slat">
                  <div className="slat-rivet slat-rivet-start"></div>
                  <div className="slat-groove"></div>
                  <div className="slat-rivet slat-rivet-mid"></div>
                  <div className="slat-groove"></div>
                  <div className="slat-rivet slat-rivet-end"></div>
                </div>
              ))}
            </div>

            {/* Industrial Hazard Inner Edge Stripe */}
            <div className="shutter-edge-hazard hazard-right"></div>

            {/* Heavy Hydraulic Stamped Plate */}
            <div className="shutter-door-label label-right">
              <span className="stamped-code">ZONE // 02-BAY</span>
              <span className="stamped-title">EAST HANGAR GATE</span>
            </div>
          </div>

          {/* Center Mechanical Deadbolt & Status Seal (Locks when doors meet in center) */}
          <div className="shutter-center-deadbolt">
            <div className="deadbolt-housing">
              <div className="deadbolt-cross-crest">✝</div>
              <div className="deadbolt-title">THE PROJECT GRAVEYARD</div>
              <div className="deadbolt-status-pill">
                <span className="status-blink-dot"></span>
                <span className="status-text">{statusMessage}</span>
              </div>
              <div className="deadbolt-hazard-strip">
                <span>/// RESTRICTED ARCHIVE BAY ///</span>
              </div>
            </div>

            {/* Pneumatic steam release vents */}
            <div className="pneumatic-steam steam-left"></div>
            <div className="pneumatic-steam steam-right"></div>
          </div>

        </div>
      )}
    </>
  );
};
