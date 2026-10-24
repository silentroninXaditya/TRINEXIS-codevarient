import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { DashboardView } from '../layout/GraveyardNavbar';

export interface WhiteGlassShutterProps {
  currentView: DashboardView;
  onNavigateToView: (targetView: DashboardView) => void;
  triggerKey?: string | number;
  theme?: 'dark' | 'light';
}

export const WhiteGlassShutter: React.FC<WhiteGlassShutterProps> = ({
  currentView,
  onNavigateToView,
  triggerKey,
}) => {
  // Shutter animation state: 'idle' | 'dragging' | 'sweeping-in' | 'covered' | 'sweeping-out'
  const [sweepState, setSweepState] = useState<'idle' | 'dragging' | 'sweeping-in' | 'covered' | 'sweeping-out'>('idle');
  const [sweepDirection, setSweepDirection] = useState<'from-right' | 'from-left'>('from-right');
  const [targetLabel, setTargetLabel] = useState<string>('');
  const [dragProgress, setDragProgress] = useState<number>(0); // 0 to 1

  const activeDragRef = useRef<{
    active: boolean;
    direction: 'from-right' | 'from-left';
    startX: number;
    target: DashboardView;
  }>({
    active: false,
    direction: 'from-right',
    startX: 0,
    target: 'discovery',
  });

  const prevTriggerKey = useRef(triggerKey);
  const isFirstMount = useRef(true);

  // Watch for external triggerKey changes
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (triggerKey !== prevTriggerKey.current) {
      prevTriggerKey.current = triggerKey;
    }
  }, [triggerKey]);

  // Complete Transition Helper
  const completeTransition = useCallback((target: DashboardView, direction: 'from-right' | 'from-left') => {
    setSweepDirection(direction);
    setTargetLabel(
      target === 'dashboard'
        ? 'THE GRAVEYARD'
        : target === 'discovery'
        ? 'DISCOVERY ARCHIVES'
        : target === 'vault'
        ? 'PERSONAL VAULT'
        : target === 'error_429'
        ? 'CIRCUIT OVERLOAD'
        : 'DISCOVERY OFFLINE'
    );
    setSweepState('covered');
    onNavigateToView(target);

    // Brief hold in covered glass state, then sweep out
    setTimeout(() => {
      setSweepState('sweeping-out');

      // Fully open duration: 420ms
      setTimeout(() => {
        setSweepState('idle');
        setDragProgress(0);
      }, 420);
    }, 180);
  }, [onNavigateToView]);

  // Initiate Animated Sweep Transition
  const triggerShutterTransition = useCallback((target: DashboardView, direction: 'from-right' | 'from-left') => {
    if (sweepState !== 'idle' || target === currentView) return;

    setSweepDirection(direction);
    setTargetLabel(target === 'dashboard' ? 'THE GRAVEYARD' : target === 'discovery' ? 'DISCOVERY ARCHIVES' : 'PERSONAL VAULT');
    setSweepState('sweeping-in');

    // Sweep in duration: 380ms
    setTimeout(() => {
      completeTransition(target, direction);
    }, 380);
  }, [sweepState, currentView, completeTransition]);

  // Start Slidable Drag on Shutter Handle
  const handleHandlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    direction: 'from-right' | 'from-left',
    target: DashboardView
  ) => {
    if (sweepState !== 'idle') return;
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    activeDragRef.current = {
      active: true,
      direction,
      startX: e.clientX,
      target,
    };

    setSweepDirection(direction);
    setTargetLabel(target === 'dashboard' ? 'THE GRAVEYARD' : target === 'discovery' ? 'DISCOVERY ARCHIVES' : 'PERSONAL VAULT');
    setSweepState('dragging');
    setDragProgress(0);
  };

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!activeDragRef.current.active) return;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || 1000;
    const { direction } = activeDragRef.current;

    let delta = 0;
    if (direction === 'from-right') {
      // Dragging from right edge towards left
      delta = activeDragRef.current.startX - e.clientX;
    } else {
      // Dragging from left edge towards right
      delta = e.clientX - activeDragRef.current.startX;
    }

    const progress = Math.min(1, Math.max(0, delta / (windowWidth * 0.6)));
    setDragProgress(progress);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!activeDragRef.current.active) return;
    const { target, direction } = activeDragRef.current;
    activeDragRef.current.active = false;

    // Threshold: dragged at least 15% across screen width or fast drag
    if (dragProgress >= 0.15) {
      setSweepState('sweeping-in');
      setTimeout(() => {
        completeTransition(target, direction);
      }, 280);
    } else {
      // Snaps back if released without sliding enough
      setSweepState('idle');
      setDragProgress(0);
    }
  }, [dragProgress, completeTransition]);

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

  const isOverlayActive = sweepState !== 'idle';

  // Calculate live inline transform while dragging
  let livePanelTransform = 'none';
  if (sweepState === 'dragging') {
    if (sweepDirection === 'from-right') {
      // Slides from right (100% -> 0%)
      const translatePercent = (1 - dragProgress) * 100;
      livePanelTransform = `translateX(${translatePercent}%)`;
    } else {
      // Slides from left (-100% -> 0%)
      const translatePercent = -(1 - dragProgress) * 100;
      livePanelTransform = `translateX(${translatePercent}%)`;
    }
  }

  return (
    <>
      {/* =========================================================================
          INTERACTIVE SLIDABLE SIDE SHUTTER HANDLES (SLIDABLE ACROSS THE SCREEN)
          ========================================================================= */}

      {/* 1. LEFT SIDE SHUTTER (Visible on Discovery and Vault) */}
      {(currentView === 'discovery' || currentView === 'vault') && (
        <aside
          className="side-shutter-container side-shutter-left"
          title={`Slide shutter to ${currentView === 'discovery' ? 'Dashboard' : 'Discovery'}`}
        >
          <div
            className={`white-glass-shutter-handle handle-left ${activeDragRef.current.active && sweepDirection === 'from-left' ? 'is-sliding' : ''}`}
            onPointerDown={(e) => {
              const target = currentView === 'discovery' ? 'dashboard' : 'discovery';
              handleHandlePointerDown(e, 'from-left', target);
            }}
            onClick={() => {
              if (dragProgress < 0.05) {
                const target = currentView === 'discovery' ? 'dashboard' : 'discovery';
                triggerShutterTransition(target, 'from-left');
              }
            }}
            role="slider"
            aria-label="Slide Shutter to Previous Screen"
          >
            {/* White Glass Slat Grips */}
            <div className="glass-grip-slats">
              <span className="grip-slat"></span>
              <span className="grip-slat"></span>
              <span className="grip-slat"></span>
              <span className="grip-slat"></span>
            </div>

            {/* Shutter Vertical Tab Label */}
            <div className="shutter-tab-label-col">
              <span className="shutter-arrow">❮❮</span>
              <span className="shutter-tab-text">
                SLIDE TO {currentView === 'discovery' ? 'DASHBOARD' : 'DISCOVERY'}
              </span>
            </div>
          </div>
        </aside>
      )}

      {/* 2. RIGHT SIDE SHUTTER (Visible on Dashboard and Discovery) */}
      {(currentView === 'dashboard' || currentView === 'discovery') && (
        <aside
          className="side-shutter-container side-shutter-right"
          title={`Slide shutter to ${currentView === 'dashboard' ? 'Discovery' : 'My Vault'}`}
        >
          <div
            className={`white-glass-shutter-handle handle-right ${activeDragRef.current.active && sweepDirection === 'from-right' ? 'is-sliding' : ''}`}
            onPointerDown={(e) => {
              const target = currentView === 'dashboard' ? 'discovery' : 'vault';
              handleHandlePointerDown(e, 'from-right', target);
            }}
            onClick={() => {
              if (dragProgress < 0.05) {
                const target = currentView === 'dashboard' ? 'discovery' : 'vault';
                triggerShutterTransition(target, 'from-right');
              }
            }}
            role="slider"
            aria-label="Slide Shutter to Next Screen"
          >
            {/* Shutter Vertical Tab Label */}
            <div className="shutter-tab-label-col">
              <span className="shutter-tab-text">
                SLIDE TO {currentView === 'dashboard' ? 'DISCOVERY' : 'MY VAULT'}
              </span>
              <span className="shutter-arrow">❯❯</span>
            </div>

            {/* White Glass Slat Grips */}
            <div className="glass-grip-slats">
              <span className="grip-slat"></span>
              <span className="grip-slat"></span>
              <span className="grip-slat"></span>
              <span className="grip-slat"></span>
            </div>
          </div>
        </aside>
      )}

      {/* =========================================================================
          FULL-SCREEN WHITE GLASSMORPHISM SHUTTER OVERLAY
          ========================================================================= */}
      {isOverlayActive && (
        <div
          className={`white-glass-shutter-curtain state-${sweepState} dir-${sweepDirection}`}
          aria-hidden="true"
        >
          {/* Frosted White Glass Shutter Body */}
          <div
            className="white-glass-shutter-panel"
            style={sweepState === 'dragging' ? { transform: livePanelTransform, transition: 'none' } : undefined}
          >
            {/* Horizontal Translucent White Glass Slats */}
            <div className="white-glass-slats-wrapper">
              {Array.from({ length: 22 }).map((_, i) => (
                <div key={i} className="white-glass-slat">
                  <div className="glass-slat-sheen"></div>
                </div>
              ))}
            </div>

            {/* Center Crystal Crest */}
            <div className="white-glass-center-crest">
              <div className="glass-cross-icon">✝</div>
              <div className="glass-brand-title">THE PROJECT GRAVEYARD</div>
              <div className="glass-transition-badge">
                <span className="pulse-indicator"></span>
                <span>OPENING {targetLabel}</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
