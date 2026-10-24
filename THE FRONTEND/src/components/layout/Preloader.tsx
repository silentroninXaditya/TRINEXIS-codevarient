import React, { useState, useEffect } from 'react';
import { FastForward } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
  minDurationMs?: number;
}

const BOOT_LOGS = [
  'INITIALIZING QUANTUM VOID KERNEL...',
  'SCANNING 108.4M+ ORPHANED CODEBASES...',
  'MOUNTING LOCAL STORAGE REPOSITORY VAULT...',
  'AUDITING COMMITS VS ABANDONMENT EVIDENCE...',
  'CALCULATING 5-PATH REVIVAL HEURISTICS...',
  'SYSTEM GUARDRAIL: UNKNOWN STATES ARMORED...',
  'ASSIGNING GRIM REAPER FOR THE GRAVEYARD...',
  'NEXUS STAR SYNCHRONIZATION 100% COMPLETE.',
];

export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  minDurationMs = 3800,
}) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentPct = Math.min(100, Math.floor((elapsed / minDurationMs) * 100));
      setProgress(currentPct);

      // Rotate boot logs smoothly
      const nextLogIdx = Math.min(
        BOOT_LOGS.length - 1,
        Math.floor((currentPct / 100) * BOOT_LOGS.length)
      );
      setLogIndex(nextLogIdx);

      if (elapsed >= minDurationMs) {
        clearInterval(interval);
        setProgress(100);
        setIsFadingOut(true);
        setTimeout(() => {
          onComplete();
        }, 600);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [minDurationMs, onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#04060D',
        color: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#04060D] text-slate-100 transition-all duration-500 overflow-hidden ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Cosmic Mesh Aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-purple-900/25 to-indigo-900/15 blur-[120px] pointer-events-none" />

      {/* Cybernetic subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Skip button in top right */}
      <button
        type="button"
        onClick={handleSkip}
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          zIndex: 10,
        }}
        className="absolute top-6 right-6 z-10 flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white bg-slate-900/70 border border-slate-700/60 rounded-md backdrop-blur-md transition-all hover:border-slate-500 shadow-lg cursor-pointer"
      >
        <span>Skip Sequence</span>
        <FastForward size={12} />
      </button>

      {/* Main Preloader Stage */}
      <div className="relative z-10 w-full max-w-3xl px-8 flex flex-col items-center">
        {/* Brand Headline */}
        <div className="flex items-center gap-3 mb-10 text-center">
          <span className="text-xl text-purple-400 font-serif">✝</span>
          <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-[0.25em] text-white uppercase">
            THE PROJECT GRAVEYARD
          </h1>
          <span className="text-xl text-purple-400 font-serif">✝</span>
        </div>

        {/* Artwork & Slider Track Stage */}
        <div className="relative w-full h-40 flex items-end pb-6 pr-20 mb-6">
          {/* Track Bar (Stacked Base) */}
          <div className="relative w-full h-2.5 bg-slate-950 rounded-full border border-indigo-500/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9),0_0_15px_rgba(59,130,246,0.15)] overflow-hidden">
            {/* Filled Progress Bar */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-400 rounded-full shadow-[0_0_14px_rgba(139,92,246,0.7)] transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Floating Grim Reaper */}
          <div
            className="absolute bottom-6 flex flex-col items-center transition-all duration-75 pointer-events-none"
            style={{
              left: `calc(${progress * 0.85}% - 42px)`,
              width: '96px',
            }}
          >
            {/* Crimson/Purple Glow Aura */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-600/40 to-purple-600/40 rounded-full blur-xl animate-pulse" />

            {/* Reaper Image with mix-blend-screen */}
            <img
              src="/reaper.jpeg"
              alt="Grim Reaper"
              style={{
                width: '96px',
                height: '96px',
                maxWidth: '96px',
                maxHeight: '96px',
                objectFit: 'contain',
              }}
              className="relative w-24 h-24 object-contain mix-blend-screen contrast-125 brightness-110 drop-shadow-[0_0_16px_rgba(239,68,68,0.7)] animate-bounce"
            />
          </div>

          {/* Fixed Graveyard Tombstone at 100% end */}
          <div
            className="absolute right-0 bottom-3 flex flex-col items-center pointer-events-none"
            style={{ width: '80px' }}
          >
            {/* Pulsing Portal Glow when progress > 80% */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-purple-600/50 to-indigo-500/50 rounded-full blur-2xl transition-all duration-500 ${
                progress > 80 ? 'opacity-100 scale-125 animate-pulse' : 'opacity-20 scale-90'
              }`}
            />

            {/* Tombstone Image with mix-blend-screen */}
            <img
              src="/grave.jpeg"
              alt="Graveyard Portal"
              style={{
                width: '80px',
                height: '80px',
                maxWidth: '80px',
                maxHeight: '80px',
                objectFit: 'contain',
              }}
              className={`relative w-24 h-24 object-contain mix-blend-screen contrast-125 brightness-110 transition-transform duration-500 ${
                progress > 80 ? 'scale-110 drop-shadow-[0_0_22px_rgba(139,92,246,0.9)]' : 'scale-100'
              }`}
            />
          </div>
        </div>

        {/* Monospace Progress Readout */}
        <div className="w-full flex justify-between items-center text-xs font-mono text-slate-400 mb-4 px-2">
          <span className="text-blue-400 font-bold tracking-wider">
            {BOOT_LOGS[logIndex]}
          </span>
          <span className="text-purple-300 font-bold tracking-widest text-sm">
            {progress}%
          </span>
        </div>

        {/* Subtitle */}
        <p className="font-serif text-xs tracking-widest text-slate-500 text-center uppercase">
          WHERE LOST CODEBASES DEFY TIME &amp; DEATH • 100% EVIDENCE-BACKED INTELLIGENCE
        </p>
      </div>
    </div>
  );
};
