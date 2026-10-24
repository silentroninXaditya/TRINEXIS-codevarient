import React, { useState, useEffect } from 'react';
import { Zap, ArrowLeft, RefreshCw, Database } from 'lucide-react';

interface Overload429Props {
  onReturnHome: () => void;
  onUseFallbackCatalogue?: () => void;
}

export const Overload429: React.FC<Overload429Props> = ({
  onReturnHome,
  onUseFallbackCatalogue,
}) => {
  const [countdown, setCountdown] = useState(5);
  const [fallbackActive, setFallbackActive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onReturnHome();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onReturnHome]);

  const handleActivateFallback = () => {
    setFallbackActive(true);
    setTimeout(() => {
      if (onUseFallbackCatalogue) {
        onUseFallbackCatalogue();
      } else {
        onReturnHome();
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#06040A] text-white flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none">
      {/* Amber/Purple Quantum Distortion Waves */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-amber-600/20 via-purple-600/30 to-red-600/20 blur-[130px] animate-pulse" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(rgba(245, 158, 11, 0.4) 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-300 font-mono font-bold text-sm">
            ⚡
          </div>
          <span className="font-mono text-xs tracking-widest text-slate-400 font-bold uppercase">
            NEXUS RATE BOUNDARY // PPT SLIDE 8 CACHE LAYER
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          <span className="font-mono text-xs tracking-wider text-amber-400 font-bold uppercase">
            THROTTLING ACTIVE
          </span>
        </div>
      </header>

      {/* Center Card */}
      <div className="relative z-10 max-w-xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-amber-950/60 text-amber-300 border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.4)] mb-6 animate-pulse">
          <Zap size={14} />
          <span>ERROR 429 // TEMPORAL RATE LIMIT TRIGGERED</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-wider uppercase mb-4 text-white">
          CONCURRENCY THRESHOLD REACHED
        </h2>

        <p className="font-serif text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
          GitHub API / LLM Autopsy rate limit encountered. Demonstrating the <strong>Slide 8 Resilience Architecture</strong> with automated failover.
        </p>

        {/* Live Countdown Timer */}
        <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 mb-6 font-mono text-xs text-amber-200 flex items-center gap-3">
          <RefreshCw size={14} className="animate-spin text-amber-400" />
          <span>
            AUTO-STABILIZING IN 0{countdown} SECONDS...
          </span>
        </div>

        {/* Action Buttons: Force Return + Slide 8 Seeded JSON Fallback */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
          <button
            type="button"
            onClick={handleActivateFallback}
            disabled={fallbackActive}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
          >
            <Database size={15} />
            <span>
              {fallbackActive ? 'Engaging Fallback...' : 'Switch to Seeded JSON Fallback (Slide 8)'}
            </span>
          </button>

          <button
            type="button"
            onClick={onReturnHome}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold bg-amber-500 hover:bg-amber-400 text-black transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.5)]"
          >
            <ArrowLeft size={15} />
            <span>Return Home</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 flex justify-between items-center max-w-6xl mx-auto w-full text-xs font-mono text-slate-500">
        <span>TRINEXIS RESILIENCE LAYER // SLIDE 8</span>
        <span>AUTOMATIC CLIENT-SIDE FALLBACK</span>
      </footer>
    </div>
  );
};
