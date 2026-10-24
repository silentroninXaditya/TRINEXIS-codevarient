import React from 'react';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface HeroSectionProps {
  onExploreClick?: () => void;
  onRevivalClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onRevivalClick,
}) => {
  const { isDark } = useTheme();

  return (
    <section className="relative pt-28 pb-12 px-6 overflow-hidden">
      {/* Fluid Morphism Background Aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full blur-[110px] opacity-40 transition-all duration-700 ${
            isDark
              ? 'bg-gradient-to-tr from-blue-600/30 via-purple-600/30 to-indigo-500/20'
              : 'bg-gradient-to-tr from-orange-400/20 via-amber-300/20 to-yellow-200/20'
          }`}
        />
        {/* Subtle Cybernetic Grid Mask */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Top Tag Badge */}
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase mb-6 border transition-all ${
            isDark
              ? 'bg-slate-900/80 text-blue-400 border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.2)]'
              : 'bg-white text-orange-600 border-black shadow-[2px_2px_0px_#FF5500]'
          }`}
        >
          <Sparkles size={12} />
          <span>TEAM TRINEXIS • TOP 50 FINALE PLATFORM</span>
        </div>

        {/* Primary Headline */}
        <h1
          className={`font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.08em] leading-[1.12] uppercase max-w-4xl mb-6 ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          WHERE LOST CODEBASES <br className="hidden sm:inline" />
          <span
            className={
              isDark
                ? 'bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(139,92,246,0.3)]'
                : 'text-[#FF5500]'
            }
          >
            DEFY TIME &amp; DEATH.
          </span>
        </h1>

        {/* Core Paradox Sub-headline */}
        <p
          className={`font-serif text-base sm:text-lg max-w-2xl leading-relaxed mb-8 ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          <strong>518M+ Total Repositories. 108M+ Incomplete.</strong> Old commits do not prove abandonment; recent commits do not prove completion. We separate documented architectural intent from verified working reality.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            type="button"
            onClick={onExploreClick}
            className={`px-7 py-3 rounded-xl font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2.5 ${
              isDark
                ? 'bg-white text-black hover:bg-slate-200 shadow-[0_4px_20px_rgba(255,255,255,0.25)]'
                : 'bg-black text-white hover:bg-slate-900 shadow-[4px_4px_0px_#FF5500]'
            }`}
          >
            <Compass size={15} />
            <span>ENTER THE GRAVEYARD</span>
            <ArrowRight size={14} />
          </button>

          <button
            type="button"
            onClick={onRevivalClick}
            className={`px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-widest font-bold border transition-all flex items-center gap-2 ${
              isDark
                ? 'bg-slate-900/60 text-slate-200 border-indigo-500/30 hover:border-white hover:text-white backdrop-blur-md'
                : 'bg-white text-black border-black hover:bg-slate-100 shadow-[3px_3px_0px_#111111]'
            }`}
          >
            <Sparkles size={14} />
            <span>5-PATH REVIVAL ENGINE</span>
          </button>
        </div>

        {/* Macroeconomic Bento Strip: 3 Neo-Brutalist Stat Boxes */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {/* Box 1 */}
          <div
            className={`p-5 border transition-all ${
              isDark
                ? 'bg-slate-900/60 border-indigo-500/30 rounded-xl shadow-[4px_4px_0px_#8B5CF6] hover:translate-x-[2px] hover:translate-y-[2px]'
                : 'bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px]'
            }`}
          >
            <span className="font-mono text-[10px] tracking-widest uppercase text-slate-400 block mb-1">
              01 // GLOBAL DORMANT SCALE
            </span>
            <div
              className={`font-mono text-3xl font-bold tracking-tight mb-1 ${
                isDark ? 'text-blue-400' : 'text-black'
              }`}
            >
              108.4M+
            </div>
            <p className={`text-xs font-serif leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Stalled &amp; orphaned repositories globally holding billions in trapped algorithmic value.
            </p>
          </div>

          {/* Box 2 */}
          <div
            className={`p-5 border transition-all ${
              isDark
                ? 'bg-slate-900/60 border-indigo-500/30 rounded-xl shadow-[4px_4px_0px_#8B5CF6] hover:translate-x-[2px] hover:translate-y-[2px]'
                : 'bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px]'
            }`}
          >
            <span className="font-mono text-[10px] tracking-widest uppercase text-slate-400 block mb-1">
              02 // STRUCTURED REVIVAL
            </span>
            <div
              className={`font-mono text-3xl font-bold tracking-tight mb-1 ${
                isDark ? 'text-purple-400' : 'text-[#FF5500]'
              }`}
            >
              5 PATHWAYS
            </div>
            <p className={`text-xs font-serif leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Restart, Continue, Change, Repurpose, or Archive. Tailored tactical playbooks for every project.
            </p>
          </div>

          {/* Box 3 */}
          <div
            className={`p-5 border transition-all ${
              isDark
                ? 'bg-slate-900/60 border-indigo-500/30 rounded-xl shadow-[4px_4px_0px_#8B5CF6] hover:translate-x-[2px] hover:translate-y-[2px]'
                : 'bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px]'
            }`}
          >
            <span className="font-mono text-[10px] tracking-widest uppercase text-slate-400 block mb-1">
              03 // ZERO ACCOUNT FRICTION
            </span>
            <div
              className={`font-mono text-3xl font-bold tracking-tight mb-1 ${
                isDark ? 'text-emerald-400' : 'text-emerald-700'
              }`}
            >
              0 ACCOUNTS
            </div>
            <p className={`text-xs font-serif leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              100% Client-Side Privacy. LocalStorage vault + BYOK AI streaming. Zero backend tracking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
