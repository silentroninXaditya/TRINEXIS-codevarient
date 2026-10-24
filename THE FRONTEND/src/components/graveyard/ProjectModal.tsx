import React, { useState } from 'react';
import {
  ExternalLink,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  GitFork,
  Lightbulb,
  Box,
  Archive,
  Terminal,
  Sparkles,
  HelpCircle,
  Copy,
  Check,
  Play,
  FileText,
  Activity,
  Send,
  GitCommit,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useVault } from '../../context/VaultContext';
import type { OrphanedProject, RevivalPath } from '../../types/project';

interface ProjectModalProps {
  project: OrphanedProject | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenByokModal: () => void;
  onSendToCoPilot?: (project: OrphanedProject) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  onOpenByokModal,
  onSendToCoPilot,
}) => {
  if (!isOpen || !project) return null;

  const { isDark } = useTheme();
  const { isSaved, toggleSave } = useVault();
  const bookmarked = isSaved(project.id);

  const [activeInspectorTab, setActiveInspectorTab] = useState<'forensics' | 'readme'>('forensics');
  const [activeRevivalPath, setActiveRevivalPath] = useState<RevivalPath>(
    project.recommendedPath || 'Continue'
  );

  // Typewriter streaming simulation for AI Autopsy
  const [aiStreaming, setAiStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [hasStreamed, setHasStreamed] = useState(false);
  const [copiedClone, setCopiedClone] = useState(false);
  const [copiedReadme, setCopiedReadme] = useState(false);

  // Interactive Checklist states for 5-Path Revival
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (stepKey: string) => {
    setCheckedSteps((prev) => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  const handleRunAiAutopsy = () => {
    setAiStreaming(true);
    setStreamedText('');
    setHasStreamed(true);

    const fullText = project.aiAutopsySummary;
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setStreamedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
        setAiStreaming(false);
      }
    }, 18);
  };

  const handleCopyClone = () => {
    navigator.clipboard.writeText(`git clone ${project.githubUrl}.git`);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  const handleCopyReadme = () => {
    if (project.rawReadme) {
      navigator.clipboard.writeText(project.rawReadme);
      setCopiedReadme(true);
      setTimeout(() => setCopiedReadme(false), 2000);
    }
  };

  const REVIVAL_PATHS_LIST: {
    path: RevivalPath;
    number: string;
    icon: React.ReactNode;
    label: string;
  }[] = [
    { path: 'Restart', number: '01', icon: <RotateCcw size={14} />, label: 'RESTART' },
    { path: 'Continue', number: '02', icon: <GitFork size={14} />, label: 'CONTINUE' },
    { path: 'Change', number: '03', icon: <Lightbulb size={14} />, label: 'CHANGE' },
    { path: 'Repurpose', number: '04', icon: <Box size={14} />, label: 'REPURPOSE' },
    { path: 'Archive', number: '05', icon: <Archive size={14} />, label: 'ARCHIVE' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md transition-all duration-300"
      onClick={(e) => {
        // Single click outside box cancels / closes modal
        if (e.target === e.currentTarget) onClose();
      }}
      onDoubleClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      title="Click outside background to close"
    >
      <aside
        className={`w-full max-w-2xl h-full flex flex-col justify-between overflow-y-auto border-l p-6 sm:p-8 transition-all ${
          isDark
            ? 'bg-[#04060D]/95 border-indigo-500/20 text-white shadow-[-16px_0_40px_rgba(0,0,0,0.95)]'
            : 'bg-[#F4F4F0] border-black text-black'
        }`}
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] tracking-widest text-indigo-400 uppercase font-bold">
                PAGE 2 // INTELLIGENCE &amp; FIVE-PATH REVIVAL
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight uppercase">
                {project.name}
              </h2>
              <span className="font-mono text-xs text-slate-500">
                Created by @{project.owner} • Last active: {project.lastCommitDate}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleSave(project.id)}
                className={`p-2 rounded-lg border transition-all ${
                  bookmarked
                    ? 'bg-purple-600 text-white border-purple-400'
                    : isDark
                    ? 'bg-slate-900 text-slate-400 border-slate-700'
                    : 'bg-white text-black border-black'
                }`}
                title={bookmarked ? 'Saved in Vault' : 'Save to Vault'}
              >
                <Bookmark size={16} className={bookmarked ? 'fill-current' : ''} />
              </button>
              <span className="font-mono text-[10px] text-slate-400">CLICK OUTSIDE TO CLOSE</span>
            </div>
          </div>

          {/* Quick Clone, Source Link, and Send to Co-Pilot Strip */}
          <div className="flex items-center gap-2.5 mb-6 flex-wrap">
            <button
              type="button"
              onClick={handleCopyClone}
              className={`px-3 py-1.5 rounded-md font-mono text-xs flex items-center gap-2 border transition-all ${
                isDark
                  ? 'bg-slate-900 border-indigo-500/30 text-slate-200 hover:border-white'
                  : 'bg-white border-black text-black'
              }`}
            >
              <Terminal size={12} />
              <span>{copiedClone ? 'Copied git clone!' : `git clone ${project.name}.git`}</span>
              {copiedClone ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            </button>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md font-mono text-xs flex items-center gap-1.5 text-blue-400 hover:underline border border-blue-500/30 bg-blue-950/20"
            >
              <span>GitHub Source</span>
              <ExternalLink size={12} />
            </a>

            {onSendToCoPilot && (
              <button
                type="button"
                onClick={() => {
                  onSendToCoPilot(project);
                  onClose();
                }}
                className="px-3 py-1.5 rounded-md font-mono text-xs flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:brightness-110 shadow-[0_0_15px_rgba(99,102,241,0.4)] transition"
              >
                <span>Send to Co-Pilot</span>
                <Send size={12} />
              </button>
            )}
          </div>

          {/* Sub-tab navigation: Forensic Autopsy vs Raw README */}
          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3">
            <button
              type="button"
              onClick={() => setActiveInspectorTab('forensics')}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-1.5 ${
                activeInspectorTab === 'forensics'
                  ? 'bg-indigo-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]'
                  : 'text-slate-400 hover:text-white bg-white/[0.04]'
              }`}
            >
              <Activity size={13} />
              <span>Forensic Autopsy &amp; 5-Path Revival</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveInspectorTab('readme')}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-1.5 ${
                activeInspectorTab === 'readme'
                  ? 'bg-indigo-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]'
                  : 'text-slate-400 hover:text-white bg-white/[0.04]'
              }`}
            >
              <FileText size={13} />
              <span>Raw README.md (Jina / Firecrawl)</span>
            </button>
          </div>

          {/* VIEW A: FORENSIC AUTOPSY */}
          {activeInspectorTab === 'forensics' && (
            <>
              {/* 1. The System Guardrail Banner (Slide 5 #01) */}
              {project.abandonmentReason === null ? (
                <div
                  className={`p-4 rounded-xl mb-6 border ${
                    isDark
                      ? 'bg-amber-950/20 border-2 border-amber-500 text-amber-200 shadow-[4px_4px_0px_#F59E0B]'
                      : 'bg-amber-100 border-2 border-black text-black shadow-[4px_4px_0px_#000]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <HelpCircle size={16} className="text-amber-400" />
                    <span className="font-mono text-xs font-bold tracking-wider uppercase">
                      SYSTEM GUARDRAIL // REASON UNKNOWN
                    </span>
                  </div>
                  <p className="font-mono text-xs leading-relaxed">
                    No exit issue, deprecation banner, or postmortem notice was documented by the creator. Completion percentage intentionally omitted to prevent fabricated metrics.
                  </p>
                </div>
              ) : (
                <div
                  className={`p-4 rounded-xl mb-6 border ${
                    isDark
                      ? 'bg-slate-900/60 border-indigo-500/30'
                      : 'bg-white border border-black/30'
                  }`}
                >
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 block mb-1 font-bold uppercase">
                    DOCUMENTED CREATOR STOPPING CAUSE:
                  </span>
                  <p className="font-serif text-sm italic leading-relaxed text-slate-300">
                    &ldquo;{project.abandonmentReason}&rdquo;
                  </p>
                </div>
              )}

              {/* 2. Timeline Forensics: Commits, Releases & Issues (Slide 5 #02) */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-mono text-xs font-bold tracking-widest uppercase text-slate-400">
                    TIMELINE &amp; VELOCITY FORENSICS (SLIDE 5 #02)
                  </h4>
                  <span className="text-[10px] font-mono text-indigo-400">
                    {project.commitCount} Total Commits
                  </span>
                </div>

                <div
                  className={`p-4 rounded-xl border text-xs font-mono space-y-3 ${
                    isDark ? 'bg-slate-950/60 border-white/10' : 'bg-white border-black/20'
                  }`}
                >
                  {project.timelineEvents && project.timelineEvents.length > 0 ? (
                    <div className="space-y-2.5">
                      {project.timelineEvents.map((evt, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs">
                          {evt.type === 'commit' && <GitCommit size={14} className="text-blue-400 shrink-0 mt-0.5" />}
                          {evt.type === 'release' && <Tag size={14} className="text-emerald-400 shrink-0 mt-0.5" />}
                          {evt.type === 'issue' && <AlertCircle size={14} className="text-amber-400 shrink-0 mt-0.5" />}
                          <div>
                            <span className="font-bold text-slate-200">{evt.title}</span>
                            <span className="text-[10px] text-slate-500 ml-2">({evt.date})</span>
                            <p className="text-[11px] text-slate-400 mt-0.5">{evt.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Last Commit Date:</span>
                      <span className="text-blue-400 font-bold">{project.lastCommitDate}</span>
                    </div>
                  )}

                  <p className="font-serif text-xs text-slate-400 mt-2 border-t border-white/5 pt-2 italic">
                    *Paradox Rule: Activity ≠ Completion. Old commits do not prove abandonment; recent commits do not prove feature maturity.
                  </p>
                </div>
              </div>

              {/* 3. Evidence Audit: Verified Working vs Documented Gaps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Working */}
                <div
                  className={`p-4 rounded-xl border ${
                    isDark ? 'bg-slate-950/60 border-emerald-500/20' : 'bg-emerald-50 border-emerald-600'
                  }`}
                >
                  <span className="font-mono text-[10px] tracking-wider uppercase text-emerald-400 font-bold block mb-2 flex items-center gap-1.5">
                    <CheckCircle2 size={13} />
                    OBSERVED EVIDENCE (CONFIRMED)
                  </span>
                  <ul className="space-y-1.5 text-xs font-serif text-slate-300">
                    {project.observedEvidence.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Gaps */}
                <div
                  className={`p-4 rounded-xl border ${
                    isDark ? 'bg-slate-950/60 border-amber-500/20' : 'bg-amber-50 border-amber-600'
                  }`}
                >
                  <span className="font-mono text-[10px] tracking-wider uppercase text-amber-400 font-bold block mb-2 flex items-center gap-1.5">
                    <AlertTriangle size={13} />
                    UNFINISHED WORK &amp; GAPS
                  </span>
                  <ul className="space-y-1.5 text-xs font-serif text-slate-300">
                    {project.unfinishedGaps.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 4. Interactive Five-Path Revival Selector (Slide 5 #04 & Slide 7 C) */}
              <div className="mb-6">
                <span className="font-mono text-xs font-bold tracking-widest uppercase text-slate-400 block mb-3">
                  INTERACTIVE FIVE-PATH REVIVAL PLAYBOOK
                </span>

                <div className="grid grid-cols-5 gap-1.5 mb-3">
                  {REVIVAL_PATHS_LIST.map((item) => {
                    const isSelected = activeRevivalPath === item.path;
                    const isRecommended = project.recommendedPath === item.path;

                    return (
                      <button
                        key={item.path}
                        type="button"
                        onClick={() => setActiveRevivalPath(item.path)}
                        className={`p-2 rounded-lg border text-center transition-all flex flex-col items-center gap-1 ${
                          isSelected
                            ? 'bg-purple-600/30 border-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                            : isDark
                            ? 'bg-slate-900/40 border-white/10 text-slate-400 hover:text-white'
                            : 'bg-white border-black text-black'
                        }`}
                      >
                        <span className="text-[10px] font-mono text-purple-300 font-bold">
                          {item.number}
                        </span>
                        <span className="text-xs">{item.icon}</span>
                        <span className="font-mono text-[9px] uppercase font-bold tracking-tighter truncate w-full">
                          {item.label}
                        </span>
                        {isRecommended && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-0.5" title="Recommended Path" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Tactical Path Details with Interactive Checkboxes */}
                <div
                  className={`p-4 rounded-xl border ${
                    isDark ? 'bg-slate-900/60 border-purple-500/20' : 'bg-white border-2 border-black'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-purple-400 font-bold uppercase tracking-wider">
                      Selected Strategy: 0{REVIVAL_PATHS_LIST.findIndex((p) => p.path === activeRevivalPath) + 1} // {activeRevivalPath.toUpperCase()}
                    </span>
                    {project.recommendedPath === activeRevivalPath && (
                      <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-bold">
                        RECOMMENDED HEURISTIC
                      </span>
                    )}
                  </div>

                  <p className="font-serif text-xs text-slate-200 leading-relaxed mb-4">
                    {project.revivalPlaybook[activeRevivalPath]}
                  </p>

                  {/* Practical First Action Checklist (Slide 7 C) */}
                  <div className="border-t border-slate-700/40 pt-3">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2 font-bold">
                      Interactive First-Action Checklist:
                    </span>
                    <div className="space-y-2">
                      {[
                        `Step 1: Clone repo and isolate verified working ${project.primaryLanguage} modules.`,
                        `Step 2: Address known blockers: ${project.unfinishedGaps[0] || 'Clean up dependencies'}.`,
                        `Step 3: Execute target deployment checklist under ${activeRevivalPath} architecture.`,
                      ].map((stepText, idx) => {
                        const key = `${project.id}-${activeRevivalPath}-${idx}`;
                        const isDone = !!checkedSteps[key];
                        return (
                          <div
                            key={key}
                            onClick={() => toggleStep(key)}
                            className="flex items-center gap-2 cursor-pointer select-none text-xs font-mono text-slate-300 hover:text-white"
                          >
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                                isDone ? 'bg-emerald-600 border-emerald-400 text-white' : 'border-slate-600 bg-slate-900'
                              }`}
                            >
                              {isDone && <Check size={11} />}
                            </div>
                            <span className={isDone ? 'line-through text-slate-500' : ''}>
                              {stepText}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Simulated AI Code Autopsy (Typewriter Stream) */}
              <div
                className={`p-5 rounded-2xl border mb-6 ${
                  isDark
                    ? 'bg-slate-950/70 border-indigo-500/30'
                    : 'bg-white border-2 border-black shadow-[4px_4px_0px_#111111]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span className="font-mono text-xs uppercase tracking-wider font-bold text-indigo-300">
                      Simulated Quantum Code Autopsy
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onOpenByokModal}
                      className="px-2.5 py-1 rounded-md text-[10px] font-mono text-slate-400 hover:text-indigo-300 bg-white/[0.04] border border-white/10"
                      title="Configure custom LLM key in localStorage"
                    >
                      BYOK Key
                    </button>
                    {!hasStreamed && (
                      <button
                        type="button"
                        onClick={handleRunAiAutopsy}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold inline-flex items-center gap-1.5 transition shadow"
                      >
                        <Play size={12} />
                        <span>Run Autopsy</span>
                      </button>
                    )}
                  </div>
                </div>

                {hasStreamed ? (
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-indigo-500/20 text-xs font-mono leading-relaxed text-indigo-200 min-h-[4rem]">
                    {streamedText}
                    {aiStreaming && <span className="inline-block w-2 h-4 bg-indigo-400 ml-1 animate-pulse" />}
                  </div>
                ) : (
                  <p className="font-serif text-xs text-slate-400 italic">
                    Click &ldquo;Run Autopsy&rdquo; to simulate LLM analysis evaluating how a developer can revive this repository within 48 hours.
                  </p>
                )}
              </div>
            </>
          )}

          {/* VIEW B: RAW README & METADATA VIEWER (SLIDE 6 #02) */}
          {activeInspectorTab === 'readme' && (
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs uppercase text-indigo-400 font-bold block">
                    Slide 6 #02 Feature
                  </span>
                  <span className="text-xs text-slate-400 font-serif">
                    Raw README extracted via simulated Jina AI / Firecrawl Markdown pipeline.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyReadme}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 font-mono text-xs text-slate-300 inline-flex items-center gap-1.5 transition"
                >
                  {copiedReadme ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedReadme ? 'Copied Markdown' : 'Copy README'}</span>
                </button>
              </div>

              <div
                className={`p-5 rounded-2xl border font-mono text-xs whitespace-pre-wrap leading-relaxed overflow-x-auto ${
                  isDark
                    ? 'bg-slate-950/80 border-indigo-500/20 text-slate-200'
                    : 'bg-white border-2 border-black text-black'
                }`}
              >
                {project.rawReadme || `# ${project.name}\n\n${project.documentedGoal}\n\n### Tech Stack\n${project.techStack.join(', ')}`}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-slate-700/40 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>PROJECT GRAVEYARD // TRINEXIS</span>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-white transition uppercase font-bold"
          >
            Close Drawer [ESC]
          </button>
        </div>
      </aside>
    </div>
  );
};
