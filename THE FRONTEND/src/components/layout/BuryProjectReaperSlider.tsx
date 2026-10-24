import React, { useState } from 'react';

interface BuryProjectReaperSliderProps {
  onBuryProject: () => void;
  theme?: 'dark' | 'light';
}

export const BuryProjectReaperSlider: React.FC<BuryProjectReaperSliderProps> = ({
  onBuryProject,
}) => {
  const [sliderVal, setSliderVal] = useState<number>(0);
  const [isBuried, setIsBuried] = useState<boolean>(false);

  const triggerBurial = () => {
    setSliderVal(100);
    setIsBuried(true);
    try {
      onBuryProject();
    } catch (err) {
      console.error('Bury project trigger error:', err);
    }
    setTimeout(() => {
      setSliderVal(0);
      setIsBuried(false);
    }, 700);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderVal(val);
    if (val >= 80) {
      triggerBurial();
    }
  };

  const handleInputRelease = () => {
    if (sliderVal >= 75) {
      triggerBurial();
    } else {
      setSliderVal(0);
    }
  };

  return (
    <div
      className={`normal-bury-slider-chassis ${isBuried ? 'is-buried' : ''} ${sliderVal >= 60 ? 'near-tomb' : ''}`}
      title="Slide handle to the right to Bury a Project"
    >
      {/* Active Fill Track */}
      <div
        className="normal-slider-fill"
        style={{ width: `${Math.max(12, sliderVal)}%` }}
      />

      {/* Guide text that fades as slider moves */}
      <span
        className="normal-slider-label"
        style={{ opacity: Math.max(0, 1 - sliderVal / 50) }}
      >
        SLIDE TO BURY ❯
      </span>

      {/* Native Range Input: 100% reliable mouse/touch drag */}
      <input
        type="range"
        min={0}
        max={100}
        value={sliderVal}
        onChange={handleInputChange}
        onMouseUp={handleInputRelease}
        onTouchEnd={handleInputRelease}
        className="normal-slider-range-input"
        aria-label="Slide to bury a project"
      />

      {/* Destination Tomb Icon at Right Edge */}
      <button
        type="button"
        className="normal-slider-tomb-btn"
        onClick={triggerBurial}
        title="Tombstone Destination (Click to Bury)"
      >
        <span className="tomb-emoji">🪦</span>
      </button>
    </div>
  );
};
