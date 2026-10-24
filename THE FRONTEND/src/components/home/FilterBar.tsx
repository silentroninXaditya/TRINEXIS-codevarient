import React from 'react';
import { Search, X, Filter, Sparkles, Compass, Zap, GraduationCap, ShieldCheck, Gem } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import type { CuratedCollectionCategory, ProjectState, RevivalPath } from '../../types/project';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedState: string;
  onSelectState: (state: string) => void;
  selectedPath: string;
  onSelectPath: (path: string) => void;
  selectedStack: string;
  onSelectStack: (stack: string) => void;
  selectedCollection: CuratedCollectionCategory;
  onSelectCollection: (col: CuratedCollectionCategory) => void;
  isNaturalLanguageMode: boolean;
  onToggleNaturalLanguageMode: () => void;
  totalFilteredCount: number;
}

const STATE_OPTIONS: (string | ProjectState)[] = [
  'All',
  'Stalled Prototype',
  'Architecture Solid / UI Incomplete',
  'Abandoned Hackathon MVP',
  'Unknown State',
];

const PATH_OPTIONS: (string | RevivalPath)[] = [
  'All',
  'Restart',
  'Continue',
  'Change',
  'Repurpose',
  'Archive',
];

const TECH_STACK_OPTIONS = [
  'All',
  'TypeScript',
  'Rust',
  'Python',
  'Go',
  'Kotlin',
  'Three.js',
  'WebRTC',
];

const CURATED_COLLECTIONS: { id: CuratedCollectionCategory; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'all', label: 'All Repositories', icon: <Compass size={14} />, desc: 'Complete normalised directory' },
  { id: 'hackathon', label: '⚡ Hackathon Starters', icon: <Zap size={14} />, desc: 'Bypass boilerplate in 48h' },
  { id: 'student', label: '🎓 Student Sandboxes', icon: <GraduationCap size={14} />, desc: 'Real-world senior projects' },
  { id: 'auth', label: '🔐 Indie Dev Auth', icon: <ShieldCheck size={14} />, desc: 'RBAC, OAuth & token proxies' },
  { id: 'stalled-gems', label: '🌱 Stalled Gems', icon: <Gem size={14} />, desc: 'High-value mathematical cores' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedState,
  onSelectState,
  selectedPath,
  onSelectPath,
  selectedStack,
  onSelectStack,
  selectedCollection,
  onSelectCollection,
  isNaturalLanguageMode,
  onToggleNaturalLanguageMode,
  totalFilteredCount,
}) => {
  const { isDark } = useTheme();

  const resetAllFilters = () => {
    onSearchChange('');
    onSelectState('All');
    onSelectPath('All');
    onSelectStack('All');
    onSelectCollection('all');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedState !== 'All' ||
    selectedPath !== 'All' ||
    selectedStack !== 'All' ||
    selectedCollection !== 'all';

  return (
    <div className="w-full space-y-4 mb-8">
      {/* 1. CURATED AUDIENCE COLLECTIONS (PPT Slide 4 & 7) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CURATED_COLLECTIONS.map((col) => {
          const isActive = selectedCollection === col.id;
          return (
            <button
              key={col.id}
              onClick={() => onSelectCollection(col.id)}
              className={`shrink-0 px-4 py-2.5 rounded-2xl font-mono text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-[1.02]'
                  : isDark
                  ? 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-white/10'
                  : 'bg-white hover:bg-stone-100 text-black border-2 border-black shadow-[2px_2px_0px_#111111]'
              }`}
            >
              <span>{col.icon}</span>
              <span>{col.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. MAIN NEUMORPHIC SEARCH BAR & NATURAL LANGUAGE TOGGLE */}
      <div
        className={`p-4 md:p-5 rounded-3xl border transition-all ${
          isDark
            ? 'bg-slate-900/60 backdrop-blur-xl border-indigo-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
            : 'bg-white border-2 border-black shadow-[4px_4px_0px_#111111]'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                isNaturalLanguageMode ? 'text-purple-400' : 'text-slate-500'
              }`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={
                isNaturalLanguageMode
                  ? '✨ Context-Aware Search (e.g., "Find campus indoor navigation with offline maps")...'
                  : 'Search by repository name, tech stack, or missing gap...'
              }
              className={`w-full pl-10 pr-9 py-3 rounded-2xl font-mono text-xs focus:outline-none transition ${
                isDark
                  ? 'bg-slate-950/70 border border-indigo-500/30 text-white placeholder-slate-500 focus:border-indigo-400'
                  : 'bg-stone-100 border border-black text-black placeholder-stone-400'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Context-Aware Natural Language Mode Toggle (Slide 5 #07) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onToggleNaturalLanguageMode}
              className={`px-3.5 py-2.5 rounded-2xl font-mono text-xs font-bold transition flex items-center gap-2 ${
                isNaturalLanguageMode
                  ? 'bg-purple-600/30 border border-purple-400 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : isDark
                  ? 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
                  : 'bg-stone-200 text-black border border-black'
              }`}
              title="Slide 5 Feature #07: Find projects by intended functionality rather than just tags"
            >
              <Sparkles size={13} className={isNaturalLanguageMode ? 'animate-spin text-purple-300' : ''} />
              <span>{isNaturalLanguageMode ? 'Natural Language Active' : 'Keyword Search'}</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="px-3 py-2 rounded-xl text-xs font-mono text-red-400 hover:bg-red-950/30 border border-red-500/30 transition flex items-center gap-1"
              >
                <X size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* 3. TACTILE FILTER PILLS */}
        <div className="space-y-3 pt-3 border-t border-slate-700/30">
          {/* Dev State Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono uppercase text-slate-500 w-24 shrink-0 flex items-center gap-1">
              <Filter size={10} /> State:
            </span>
            {STATE_OPTIONS.map((state) => {
              const active = selectedState === state;
              return (
                <button
                  key={state}
                  onClick={() => onSelectState(state)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-mono transition ${
                    active
                      ? 'bg-indigo-600 text-white font-bold shadow-[0_0_10px_rgba(99,102,241,0.5)]'
                      : 'bg-white/[0.04] text-slate-400 hover:text-white'
                  }`}
                >
                  {state}
                </button>
              );
            })}
          </div>

          {/* Revival Path Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono uppercase text-slate-500 w-24 shrink-0 flex items-center gap-1">
              Revival:
            </span>
            {PATH_OPTIONS.map((path) => {
              const active = selectedPath === path;
              return (
                <button
                  key={path}
                  onClick={() => onSelectPath(path)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-mono transition ${
                    active
                      ? 'bg-purple-600 text-white font-bold shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                      : 'bg-white/[0.04] text-slate-400 hover:text-white'
                  }`}
                >
                  {path}
                </button>
              );
            })}
          </div>

          {/* Tech Stack Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono uppercase text-slate-500 w-24 shrink-0 flex items-center gap-1">
              Stack:
            </span>
            {TECH_STACK_OPTIONS.map((stack) => {
              const active = selectedStack === stack;
              return (
                <button
                  key={stack}
                  onClick={() => onSelectStack(stack)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-mono transition ${
                    active
                      ? 'bg-emerald-600 text-white font-bold shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                      : 'bg-white/[0.04] text-slate-400 hover:text-white'
                  }`}
                >
                  {stack}
                </button>
              );
            })}
          </div>
        </div>

        {/* Counter Footer */}
        <div className="mt-3 pt-2 text-[10px] font-mono text-slate-500 flex items-center justify-between">
          <span>SHOWING {totalFilteredCount} NORMALIZED PROJECTS</span>
          <span>DETERMINISTIC HEURISTICS V2.0</span>
        </div>
      </div>
    </div>
  );
};
