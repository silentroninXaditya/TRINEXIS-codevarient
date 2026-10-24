import React, { useState, useEffect } from 'react';
import {
  Zap,
  Terminal,
  CheckCircle2,
  RefreshCw,
  GitBranch,
  FileCode,
  Copy,
  Check,
  Play,
  Bookmark,
} from 'lucide-react';
import type { OrphanedProject } from '../../types/project';
import type { AIWorker } from './DashboardHero';

interface ResurrectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: OrphanedProject | null;
  worker: AIWorker | null;
  userPrompt?: string;
  onSaveToVault: (project: OrphanedProject) => void;
}

export const ResurrectionModal: React.FC<ResurrectionModalProps> = ({
  isOpen,
  onClose,
  project,
  worker,
  userPrompt,
  onSaveToVault,
}) => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'preview' | 'diff' | 'eulogy'>('terminal');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isCompiling, setIsCompiling] = useState(true);
  const [copied, setCopied] = useState(false);
  const [previewCounter, setPreviewCounter] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setTerminalLogs([]);
      setIsCompiling(true);
      return;
    }

    const workerName = worker?.name || 'Necromancer AI';
    const projectName = project?.name || 'resurrected-artifact';

    const steps = [
      `[00:00.01] ⚡ BOOTING ${workerName.toUpperCase()} (Model: ${worker?.model || 'Gemini 2.5 Flash'})...`,
      `[00:00.18] 📦 TARGET CODEBASE: "${projectName}"`,
      `[00:00.45] 🔍 AST Scanner initialized. Dissecting file tree & package manifest...`,
      `[00:00.92] ⚠️ DETECTED BREAKING GAP: React 15.4 / Webpack 2 / Unhandled API 429 Rate Limits`,
      `[00:01.30] 🛠️ AUTO-MIGRATING: Upgrading to React 18 + Vite 6 + TypeScript 5.8...`,
      `[00:01.85] 🧪 GENERATING RESILIENT BACKOFF QUEUE: Implemented exponential retry on 429/503 limits`,
      `[00:02.40] 🎨 RECONSTRUCTING USER INTERFACE: Applying dual-mode Crimson Cemetery tokens`,
      `[00:02.95] 🚀 COMPILING LIVE REANIMATED WORKSPACE CONTAINER...`,
      `[00:03.40] ✓ RESURRECTION VERIFIED: Live sandbox running with 0 critical errors!`,
    ];

    setTerminalLogs([]);
    setIsCompiling(true);

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < steps.length) {
        setTerminalLogs((prev) => [...prev, steps[idx]]);
        idx++;
      } else {
        clearInterval(interval);
        setIsCompiling(false);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [isOpen, project, worker]);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`// Resurrected by The Project Graveyard\n// Worker: ${worker?.name}\n// Target: ${project?.name}\n\nimport React from 'react';\n\nexport const ResurrectedApp = () => {\n  return (\n    <div className="resurrected-container">\n      <h1>${project?.name || 'Revived Prototype'}</h1>\n      <p>Status: Exhumed & Healed successfully.</p>\n    </div>\n  );\n};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="resurrection-modal-backdrop"
      onClick={(e) => {
        // Single click outside box cancels / closes modal
        if (e.target === e.currentTarget) onClose();
      }}
      onDoubleClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      title="Click outside background to close"
    >
      <div
        className="resurrection-modal-window"
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="resurrection-modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <Zap size={16} />
            </div>
            <div>
              <h2 className="modal-main-title">
                {project ? project.name.toUpperCase() : 'RESURRECTION WORKSPACE'}
              </h2>
              <span className="modal-subtitle">
                AI SPECIALIST: {worker?.name || 'Necromancer AI'} • {worker?.model || 'Gemini 2.5'}
              </span>
            </div>
          </div>

          <div className="modal-header-actions">
            {project && (
              <button
                type="button"
                className="modal-action-pill-btn"
                onClick={() => onSaveToVault(project)}
                title="Preserve in My Vault"
              >
                <Bookmark size={13} />
                <span>SAVE TO VAULT</span>
              </button>
            )}
            <span className="text-[10px] font-mono text-slate-400">CLICK OUTSIDE TO CLOSE</span>
          </div>
        </div>

        {/* Workspace Mode Tabs */}
        <div className="resurrection-tabs-bar">
          <button
            type="button"
            className={`resurrect-tab-btn ${activeTab === 'terminal' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('terminal')}
          >
            <Terminal size={14} />
            <span>AI WORKER TERMINAL</span>
            {isCompiling && <span className="tab-pulsing-badge" />}
          </button>

          <button
            type="button"
            className={`resurrect-tab-btn ${activeTab === 'preview' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            <Play size={14} />
            <span>LIVE RESURRECTED APP</span>
          </button>

          <button
            type="button"
            className={`resurrect-tab-btn ${activeTab === 'diff' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('diff')}
          >
            <FileCode size={14} />
            <span>BEFORE / AFTER DIFF</span>
          </button>

          <button
            type="button"
            className={`resurrect-tab-btn ${activeTab === 'eulogy' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('eulogy')}
          >
            <GitBranch size={14} />
            <span>EULOGY &amp; FORENSICS</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="resurrection-modal-body">
          
          {/* TAB 1: AI Worker Terminal */}
          {activeTab === 'terminal' && (
            <div className="terminal-display-screen">
              <div className="terminal-screen-header">
                <span className="term-dot dot-red" />
                <span className="term-dot dot-amber" />
                <span className="term-dot dot-green" />
                <span className="term-title">bash // {worker?.name.toLowerCase().replace(/\s+/g, '-') || 'worker'}-session</span>
              </div>
              <div className="terminal-log-output">
                {userPrompt && (
                  <div className="terminal-user-prompt-echo">
                    <span className="term-prompt-arrow">&gt; USER INSTRUCTION:</span>
                    <span className="term-prompt-text">{userPrompt}</span>
                  </div>
                )}
                {terminalLogs.map((log, i) => (
                  <div key={i} className="terminal-log-line">
                    {log}
                  </div>
                ))}
                {isCompiling ? (
                  <div className="terminal-blinking-cursor">
                    <span className="cursor-block">▋</span>
                    <span>AI Specialist executing code refactoring...</span>
                  </div>
                ) : (
                  <div className="terminal-finished-notice">
                    <CheckCircle2 size={16} className="finish-check" />
                    <span>Reanimation process completed successfully. Switch to &quot;LIVE RESURRECTED APP&quot; to test the running software!</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Live Resurrected Sandbox Preview */}
          {activeTab === 'preview' && (
            <div className="preview-sandbox-screen">
              <div className="sandbox-top-controls">
                <div className="sandbox-url-pill">
                  <span className="url-protocol">https://</span>
                  <span className="url-host">graveyard.nexus/{project?.name.toLowerCase() || 'sandbox'}.preview</span>
                </div>
                <div className="sandbox-btn-group">
                  <button
                    type="button"
                    className="sandbox-util-btn"
                    onClick={() => setPreviewCounter((c) => c + 1)}
                    title="Reload Sandbox"
                  >
                    <RefreshCw size={12} />
                    <span>Reload</span>
                  </button>
                  <button
                    type="button"
                    className="sandbox-util-btn"
                    onClick={handleCopyCode}
                    title="Copy Scaffolded Source"
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
              </div>

              {/* Simulated Live Running Application */}
              <div className="sandbox-viewport-canvas">
                <div className="simulated-app-container">
                  <div className="simulated-app-nav">
                    <span className="sim-app-brand">{project?.name || 'Reanimated App'}</span>
                    <span className="sim-app-badge">REVIVED // ACTIVE</span>
                  </div>
                  <div className="simulated-app-hero">
                    <h2>Live Sandbox Compiled</h2>
                    <p>
                      {project?.documentedGoal ||
                        'The original abandoned codebase has been healed. Broken REST handlers upgraded to TypeScript, dependencies resolved, and UI rehydrated.'}
                    </p>
                    <div className="simulated-interactive-card">
                      <span className="card-label">INTERACTIVE TEST HARNESS:</span>
                      <div className="counter-demo-row">
                        <span>Simulated API Calls Handled: <strong>{previewCounter * 4 + 18}</strong></span>
                        <button
                          type="button"
                          className="simulated-action-btn"
                          onClick={() => setPreviewCounter((c) => c + 1)}
                        >
                          Trigger Handled Request (No 429 Crashes)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Before / After Diff Inspector */}
          {activeTab === 'diff' && (
            <div className="diff-inspector-screen">
              <div className="diff-columns-grid">
                
                {/* Column 1: Dead Code (Before) */}
                <div className="diff-panel dead-panel">
                  <div className="diff-panel-header">
                    <span className="diff-tag-red">BEFORE // DEAD CODE</span>
                    <span className="diff-filename">package.json (Legacy)</span>
                  </div>
                  <pre className="diff-code-view">
{`- "react": "15.4.2",
- "webpack": "2.1.0-beta.25",
- "babel-core": "6.26.0",
- "unhandled-api-caller": "1.0.0"
// ERROR: 429 Rate Limit Crash
// Unhandled Promise Rejection: Rate Limit Exceeded
// Memory Leak: 18 listeners on window resize
// Broken dependencies: 14 deprecated packages`}
                  </pre>
                </div>

                {/* Column 2: Resurrected Code (After) */}
                <div className="diff-panel alive-panel">
                  <div className="diff-panel-header">
                    <span className="diff-tag-green">AFTER // HEALED CODE</span>
                    <span className="diff-filename">package.json + App.tsx (Modern)</span>
                  </div>
                  <pre className="diff-code-view">
{`+ "react": "^18.3.1",
+ "vite": "^6.1.0",
+ "typescript": "^5.8.0",
+ "resilient-backoff-queue": "^2.4.0"
// HEALED: Handled 429 with Exponential Backoff
// HEALED: Memory leaks scrubbed with useEffect cleanup
// HEALED: Full TypeScript type safety across endpoints
// HEALED: Compiled live preview in 420ms`}
                  </pre>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: Eulogy & Forensics */}
          {activeTab === 'eulogy' && (
            <div className="eulogy-screen-container">
              <div className="eulogy-card-box">
                <span className="eulogy-cross">✝</span>
                <h3 className="eulogy-title">POST-MORTEM &amp; EULOGY</h3>
                <p className="eulogy-text">
                  &ldquo;Here lies <strong>{project?.name || 'this repository'}</strong>, created with immense architectural intent and documented vision. It died not of poor logic, but of unhandled API rate limits, rapid SDK deprecation, and team fatigue. Today, it finds dignified afterlife.&rdquo;
                </p>
                
                <div className="forensic-meta-grid">
                  <div className="meta-cell">
                    <span className="cell-label">DEATH CAUSE:</span>
                    <span className="cell-val">{project?.abandonmentReason || 'Developer Career Shift & Rate Limit Rot'}</span>
                  </div>
                  <div className="meta-cell">
                    <span className="cell-label">RECOMMENDED PATH:</span>
                    <span className="cell-val path-val">{project?.recommendedPath || 'Continue'}</span>
                  </div>
                  <div className="meta-cell">
                    <span className="cell-label">PRIMARY LANGUAGE:</span>
                    <span className="cell-val">{project?.primaryLanguage || 'TypeScript'}</span>
                  </div>
                  <div className="meta-cell">
                    <span className="cell-label">LAST ACTIVE:</span>
                    <span className="cell-val">{project?.lastCommitDate || '2023-11-14'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
