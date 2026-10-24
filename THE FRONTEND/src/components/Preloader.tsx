import React, { useEffect, useState } from 'react';
import reaperImg from '../assets/reaper.png';
import graveImg from '../assets/grave.png';

interface PreloaderProps {
  onComplete: () => void;
  minDurationMs?: number;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

// User specified dot animation sequence: (.... , ....... , .. , .... , ..........)
const DOT_SEQUENCE = ['....', '.......', '..', '....', '..........'];

export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  minDurationMs = 4500,
  theme = 'dark',
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [dotIndex, setDotIndex] = useState<number>(0);
  const [isFinishing, setIsFinishing] = useState<boolean>(false);

  // Cycle the dots strictly through the user's sequence
  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % DOT_SEQUENCE.length);
    }, 280);
    return () => clearInterval(dotTimer);
  }, []);

  // Smooth progress from 0% to 100%
  useEffect(() => {
    const startTime = performance.now();
    const tickInterval = 25;

    const timer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const ratio = elapsed / minDurationMs;

      if (ratio >= 1) {
        setProgress(100);
        clearInterval(timer);
        setIsFinishing(true);
        setTimeout(() => {
          onComplete();
        }, 600);
      } else {
        const next = Math.min(99, Math.round(ratio * 100));
        setProgress(next);
      }
    }, tickInterval);

    return () => clearInterval(timer);
  }, [minDurationMs, onComplete]);

  return (
    <div className={`grim-preloader-root theme-${theme} ${isFinishing ? 'preloader-fadeout' : ''}`}>
      <div className="preloader-scene">
        {/* Slider & Artwork Container (Particles completely removed for raw brutal aura) */}
        <div className="slider-stage">
          
          {/* Base Stacked Unfilled Track */}
          <div className="slider-track-stacked">
            {/* Filled Progress Bar (White in dark mode, Black in white mode) */}
            <div
              className="slider-fill-bone"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Floating Grim Reaper (White in dark mode, Black in white mode) */}
          <div
            className="reaper-floating-node"
            style={{
              left: `calc(${progress}% - 50px)`,
            }}
          >
            <img
              src={reaperImg}
              alt="Grim Reaper"
              className="reaper-pure-img"
            />
          </div>

          {/* Grave at the end (White in dark mode, Black in white mode) */}
          <div className="grave-terminus-node">
            <img
              src={graveImg}
              alt="Grave at terminus"
              className="grave-pure-img"
            />
          </div>

        </div>

        {/* Single line in Times New Roman */}
        <div className="preloader-caption-row">
          <span className="caption-label">
            ASSIGNING GRIMREAPER for THE GRAVEYARD{DOT_SEQUENCE[dotIndex]}
          </span>
          <span className="caption-gap">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="caption-pct">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
