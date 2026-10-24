import React, { useState, useRef, useEffect, useCallback } from 'react';

interface TactileSliderButtonProps {
  label: string;
  guideText?: string;
  icon?: React.ReactNode;
  onComplete: () => void;
  className?: string;
  colorTheme?: 'crimson' | 'emerald' | 'amber' | 'purple';
  width?: string | number;
}

export const TactileSliderButton: React.FC<TactileSliderButtonProps> = ({
  label,
  guideText = 'SLIDE TO EXECUTE ❯❯',
  icon,
  onComplete,
  className = '',
  colorTheme = 'crimson',
  width = '100%',
}) => {
  const [dragX, setDragX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const startXRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const getMaxTravel = () => {
    if (!trackRef.current) return 100;
    const trackWidth = trackRef.current.clientWidth;
    // thumb is roughly 110px or 35% of track
    return Math.max(60, trackWidth - 110);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.clientX - dragX;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }
  };

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDraggingRef.current) return;
    const maxTravel = getMaxTravel();
    const newX = Math.min(Math.max(0, e.clientX - startXRef.current), maxTravel);
    setDragX(newX);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    const maxTravel = getMaxTravel();
    // If dragged at least 50% across, execute action
    if (dragX >= maxTravel * 0.48) {
      setDragX(maxTravel);
      onComplete();
      setTimeout(() => {
        setDragX(0);
      }, 500);
    } else {
      // Snap back
      setDragX(0);
    }
  }, [dragX, onComplete]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => handlePointerMove(e);
    const onUp = () => handlePointerUp();

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  // Click on right end of track directly triggers completion
  const handleTrackClick = (e: React.MouseEvent) => {
    if (isDragging) return;
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clickX = e.clientX - rect.left;
    if (clickX > rect.width * 0.6) {
      const maxTravel = getMaxTravel();
      setDragX(maxTravel);
      setTimeout(() => {
        onComplete();
        setDragX(0);
      }, 250);
    }
  };

  const maxTravel = getMaxTravel();
  const progressPercent = maxTravel > 0 ? (dragX / maxTravel) * 100 : 0;

  return (
    <div
      ref={trackRef}
      className={`universal-tactile-slider-chassis theme-${colorTheme} ${className}`}
      style={{ width }}
      onClick={handleTrackClick}
      role="slider"
      aria-label={label}
      aria-valuenow={Math.round(progressPercent)}
    >
      <div
        className="tactile-slider-track-fill"
        style={{ width: `${Math.max(14, progressPercent)}%` }}
      />

      {/* Draggable Slider Thumb */}
      <div
        className="tactile-slider-thumb-btn"
        style={{
          transform: `translateX(${dragX}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        onPointerDown={handlePointerDown}
        title="Slide to activate"
      >
        {icon && <span className="slider-btn-icon">{icon}</span>}
        <span className="slider-btn-label">{label}</span>
      </div>

      {/* Track Background Guidance Text */}
      <span
        className="tactile-slider-guide-text"
        style={{ opacity: Math.max(0, 1 - (progressPercent / 100) * 1.8) }}
      >
        {guideText}
      </span>
    </div>
  );
};
