import React, { useState } from 'react';
import { useVault } from '../../context/VaultContext';
import { useTheme } from '../../context/ThemeContext';
import type { RevivalPath } from '../../types/project';
import { TactileSliderButton } from '../common/TactileSliderButton';

interface BuryProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessToast?: (title: string, desc: string) => void;
}

export const BuryProjectModal: React.FC<BuryProjectModalProps> = ({
  isOpen,
  onClose,
  onSuccessToast,
}) => {
  const { logOwnProject } = useVault();
  const { isDark } = useTheme();

  const [projectName, setProjectName] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [techStack, setTechStack] = useState('TypeScript, React');
  const [goal, setGoal] = useState('');
  const [completed, setCompleted] = useState('');
  const [unfinished, setUnfinished] = useState('');
  const [stoppingReason, setStoppingReason] = useState('Select a reason...');
  const [customStoppingReason, setCustomStoppingReason] = useState('');
  const [revivalPath, setRevivalPath] = useState<RevivalPath>('Continue');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!projectName.trim()) return;

    const stackList = techStack
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const effectiveReason =
      stoppingReason === 'Select a reason...' || stoppingReason === 'Other (explain in notes)'
        ? customStoppingReason.trim() || 'Paused due to resource and bandwidth constraints'
        : stoppingReason;

    // Save into Vault Context & local catacombs
    logOwnProject({
      title: projectName.trim(),
      techStack: stackList.length > 0 ? stackList : ['TypeScript', 'React'],
      completedWork: completed.trim() || 'Core architecture and prototypes verified.',
      remainingWork: unfinished.trim() || 'Missing production deployment pipeline.',
      stoppingReason: effectiveReason,
      recommendedPath: revivalPath,
    });

    // Also sync with vault.html localStorage if present
    try {
      const stored = localStorage.getItem('trinexis_own_projects');
      const ownProjects = stored ? JSON.parse(stored) : [];
      const newEntry = {
        id: `own-${Date.now()}`,
        title: projectName.trim(),
        repoUrl: repoUrl.trim(),
        techStack: stackList,
        goal: goal.trim(),
        completedWork: completed.trim(),
        remainingWork: unfinished.trim(),
        stoppingReason: effectiveReason,
        recommendedPath: revivalPath,
        personalNotes: notes.trim(),
        createdAt: new Date().toISOString().split('T')[0],
      };
      localStorage.setItem('trinexis_own_projects', JSON.stringify([newEntry, ...ownProjects]));

      // Also dispatch to embedded vault iframes
      const vaultFrames = document.querySelectorAll<HTMLIFrameElement>('.vault-embedded-frame');
      vaultFrames.forEach((frame) => {
        frame.contentWindow?.postMessage({ type: 'PROJECT_BURIED', project: newEntry }, '*');
      });
    } catch (err) {
      console.warn('Vault storage sync warning:', err);
    }

    if (onSuccessToast) {
      onSuccessToast('⚰️ CODEBASE ENTOMBED', `"${projectName.trim()}" has been laid to rest in the Catacombs.`);
    }

    // Reset fields
    setProjectName('');
    setRepoUrl('');
    setGoal('');
    setCompleted('');
    setUnfinished('');
    setNotes('');
    onClose();
  };

  return (
    <div
      className="bury-popup-backdrop"
      onClick={(e) => {
        // Clicking outside the popup area cancels / closes it
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      onDoubleClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      title="Click or double-click background to close"
    >
      <div
        className={`bury-popup-window ${isDark ? 'dark-glass' : 'light-glass'}`}
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bury-popup-header">
          <div className="bury-popup-title-row">
            <span className="bury-cross">✝</span>
            <div className="bury-header-titles">
              <h3 className="bury-main-title">BURY A CODEBASE // CATACOMB REGISTRATION</h3>
              <p className="bury-sub-title">
                Lay your paused project to rest. Double-click anywhere outside this popup to close.
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="bury-popup-form">
          <div className="bury-form-row two-col">
            <div className="bury-input-group">
              <label className="bury-label">Project Name *</label>
              <input
                type="text"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., campus-mesh-p2p or quantum-canvas"
                className="bury-input-field"
              />
            </div>
            <div className="bury-input-group">
              <label className="bury-label">Repository URL (optional)</label>
              <input
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/you/repo"
                className="bury-input-field"
              />
            </div>
          </div>

          <div className="bury-form-row">
            <div className="bury-input-group">
              <label className="bury-label">Tech Stack (comma-separated)</label>
              <input
                type="text"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                placeholder="TypeScript, React, Vite, Tailwind CSS"
                className="bury-input-field"
              />
            </div>
          </div>

          <div className="bury-form-row">
            <div className="bury-input-group">
              <label className="bury-label">What were you trying to build? *</label>
              <textarea
                required
                rows={2}
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="High-level architectural intent and target problem..."
                className="bury-textarea-field"
              />
            </div>
          </div>

          <div className="bury-form-row two-col">
            <div className="bury-input-group">
              <label className="bury-label">What was completed and verified?</label>
              <textarea
                rows={2}
                value={completed}
                onChange={(e) => setCompleted(e.target.value)}
                placeholder="Working modules, schemas, prototypes..."
                className="bury-textarea-field"
              />
            </div>
            <div className="bury-input-group">
              <label className="bury-label">What is still unfinished?</label>
              <textarea
                rows={2}
                value={unfinished}
                onChange={(e) => setUnfinished(e.target.value)}
                placeholder="Missing components, broken APIs, rate limits..."
                className="bury-textarea-field"
              />
            </div>
          </div>

          <div className="bury-form-row two-col">
            <div className="bury-input-group">
              <label className="bury-label">Why did you stop? *</label>
              <select
                value={stoppingReason}
                onChange={(e) => setStoppingReason(e.target.value)}
                className="bury-select-field"
              >
                <option value="Select a reason...">Select a reason...</option>
                <option value="API breaking changes / rate limit blockades">API breaking changes / rate limits</option>
                <option value="Lost interest / shifted to new experiment">Lost interest / shifted to new experiment</option>
                <option value="Scope creep became unmanageable">Scope creep became unmanageable</option>
                <option value="Out of cloud funds / infrastructure credits">Out of cloud credits / funds</option>
                <option value="SDK / library deprecated or orphaned">SDK / library deprecated</option>
                <option value="Other (explain in notes)">Other (explain below)</option>
              </select>
              {stoppingReason === 'Other (explain in notes)' && (
                <input
                  type="text"
                  value={customStoppingReason}
                  onChange={(e) => setCustomStoppingReason(e.target.value)}
                  placeholder="Specify brief reason..."
                  className="bury-input-field mt-2"
                />
              )}
            </div>

            <div className="bury-input-group">
              <label className="bury-label">Desired revival path *</label>
              <select
                value={revivalPath}
                onChange={(e) => setRevivalPath(e.target.value as RevivalPath)}
                className="bury-select-field"
              >
                <option value="Continue">02 // CONTINUE (Finish remaining 20%)</option>
                <option value="Restart">01 // RESTART (Clean greenfield rewrite)</option>
                <option value="Change">03 // CHANGE (Pivot core algorithmic basis)</option>
                <option value="Repurpose">04 // REPURPOSE (Extract organ library)</option>
                <option value="Archive">05 // ARCHIVE (Perpetual cold storage)</option>
              </select>
            </div>
          </div>

          <div className="bury-form-row">
            <div className="bury-input-group">
              <label className="bury-label">Your notes (optional)</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Private notes for future resurrection..."
                className="bury-textarea-field"
              />
            </div>
          </div>

          {/* Footer: Convert button to slider & Click outside cancels */}
          <div className="bury-popup-footer">
            <span className="bury-footer-hint">† Click anywhere outside to dismiss</span>
            <div style={{ width: 240, marginLeft: 'auto' }}>
              <TactileSliderButton
                label="ENTOMB"
                guideText="SLIDE TO ENTOMB ❯❯"
                icon={<span style={{ fontSize: 13 }}>✝</span>}
                onComplete={() => handleSubmit()}
                colorTheme="crimson"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
