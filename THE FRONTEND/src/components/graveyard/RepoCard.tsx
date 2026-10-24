import React from 'react';
import {
  Bookmark,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  GitCommit,
  Star,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useVault } from '../../context/VaultContext';
import type { OrphanedProject } from '../../types/project';

interface RepoCardProps {
  project: OrphanedProject;
  onInspect: (project: OrphanedProject) => void;
}

export const RepoCard: React.FC<RepoCardProps> = ({ project, onInspect }) => {
  const { isDark } = useTheme();
  const { isSaved, toggleSave } = useVault();
  const bookmarked = isSaved(project.id);

  const getPathColor = () => {
    switch (project.recommendedPath) {
      case 'Restart':
        return isDark ? 'text-blue-400 border-blue-500/40 bg-blue-950/30' : 'text-blue-700 border-blue-600 bg-blue-50';
      case 'Continue':
        return isDark ? 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30' : 'text-emerald-700 border-emerald-600 bg-emerald-50';
      case 'Change':
        return isDark ? 'text-amber-400 border-amber-500/40 bg-amber-950/30' : 'text-amber-700 border-amber-600 bg-amber-50';
      case 'Repurpose':
        return isDark ? 'text-purple-400 border-purple-500/40 bg-purple-950/30' : 'text-purple-700 border-purple-600 bg-purple-50';
      case 'Archive':
        return isDark ? 'text-red-400 border-red-500/40 bg-red-950/30' : 'text-red-700 border-red-600 bg-red-50';
      default:
        return 'text-slate-400 border-slate-700 bg-slate-900';
    }
  };

  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between border ${
        isDark
          ? 'bg-slate-900/65 backdrop-blur-xl border-indigo-500/20 shadow-[0_8px_30px_rgba(0,0,0,0.85)] hover:border-indigo-400/50 hover:translate-y-[-2px]'
          : 'bg-[#EAEAE4] border-2 border-black shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px]'
      }`}
    >
      {/* 1. Header: Repo Name + Owner + Neo-Brutalist State Badge */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <h3
                className={`font-serif text-xl font-bold tracking-wide cursor-pointer hover:underline ${
                  isDark ? 'text-white' : 'text-black'
                }`}
                onClick={() => onInspect(project)}
              >
                {project.name}
              </h3>
              <span className="font-mono text-xs text-slate-500">
                @{project.owner}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold"
                style={{
                  backgroundColor: isDark ? '#020307' : '#FFFFFF',
                  border: `1px solid ${project.languageColor || '#8B5CF6'}`,
                  color: isDark ? '#E2E8F0' : '#111111',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: project.languageColor || '#8B5CF6' }}
                />
                {project.primaryLanguage}
              </span>

              <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                <GitCommit size={11} />
                <span>{project.commitCount} commits</span>
              </span>

              <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                <Star size={11} className="text-amber-400" />
                <span>{project.stars}</span>
              </span>
            </div>
          </div>

          {/* Neo-Brutalist State Badge */}
          {project.abandonmentReason === null ? (
            <span
              className={`px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-wider rounded border text-center ${
                isDark
                  ? 'bg-amber-950/40 text-amber-300 border-amber-500/50 shadow-[2px_2px_0px_#F59E0B]'
                  : 'bg-amber-100 text-amber-900 border-2 border-black shadow-[2px_2px_0px_#000]'
              }`}
            >
              UNKNOWN STATE // MISSING DATA
            </span>
          ) : (
            <span
              className={`px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-wider rounded border text-center ${
                isDark
                  ? 'bg-slate-950 text-slate-300 border-slate-700 shadow-[2px_2px_0px_#6366F1]'
                  : 'bg-white text-black border-2 border-black shadow-[2px_2px_0px_#000]'
              }`}
            >
              {project.state.toUpperCase()}
            </span>
          )}
        </div>

        {/* 2. Split Evidence Box (Minimalist High-Clarity) */}
        <div
          className={`p-3.5 rounded-xl mb-4 border transition-colors ${
            isDark
              ? 'bg-[#04060D]/80 border-indigo-500/15'
              : 'bg-white border border-black/20'
          }`}
        >
          {/* Documented Goal */}
          <div className="mb-2.5 pb-2.5 border-b border-white/5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-0.5 font-bold">
              DOCUMENTED PROMISE (README):
            </span>
            <p className={`font-serif text-xs leading-relaxed italic ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
              &ldquo;{project.documentedGoal}&rdquo;
            </p>
          </div>

          {/* Observed Reality */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block mb-1 font-bold flex items-center gap-1">
              <CheckCircle2 size={11} />
              <span>OBSERVED WORKING REALITY:</span>
            </span>
            <ul className="space-y-1">
              {project.observedEvidence.slice(0, 2).map((ev, i) => (
                <li
                  key={i}
                  className={`text-xs font-serif leading-snug flex items-start gap-1.5 ${
                    isDark ? 'text-slate-200' : 'text-slate-700'
                  }`}
                >
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. Unfinished Gaps Pills */}
        <div className="mb-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-1.5 font-bold flex items-center gap-1">
            <AlertTriangle size={11} />
            <span>UNRESOLVED CODE GAPS:</span>
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.unfinishedGaps.slice(0, 3).map((gap, i) => (
              <span
                key={i}
                className={`text-[11px] font-serif px-2.5 py-1 rounded-md border ${
                  isDark
                    ? 'bg-amber-950/20 text-amber-200 border-amber-500/20'
                    : 'bg-orange-50 text-orange-950 border-orange-300'
                }`}
              >
                {gap}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Revival Path Pill + 5. Action Footer */}
      <div className="pt-3 border-t border-white/5 flex flex-col gap-3">
        {/* Recommended Path Banner */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
            RECOMMENDED STRATEGY:
          </span>
          <span
            className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold uppercase tracking-wider border ${getPathColor()}`}
          >
            {project.recommendedPath}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Inspect Button */}
          <button
            type="button"
            onClick={() => onInspect(project)}
            className={`flex-1 py-2.5 px-4 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 ${
              isDark
                ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                : 'bg-black text-white hover:bg-slate-900 shadow-[2px_2px_0px_#FF5500]'
            }`}
          >
            <Layers size={13} />
            <span>INSPECT AUTOPSY</span>
            <ArrowRight size={13} />
          </button>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={() => toggleSave(project.id)}
            className={`p-2.5 rounded-xl border transition-all ${
              bookmarked
                ? isDark
                  ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.6)]'
                  : 'bg-[#FF5500] text-white border-black'
                : isDark
                ? 'bg-[#04060D] text-slate-400 border-indigo-500/20 hover:text-white hover:border-white'
                : 'bg-white text-slate-700 border-black hover:bg-slate-100'
            }`}
            title={bookmarked ? 'Saved in Personal Vault' : 'Save to Vault'}
            aria-label="Save to Vault"
          >
            <Bookmark size={15} className={bookmarked ? 'fill-current' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};
