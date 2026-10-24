import React, { useState } from 'react';
import {
  Bookmark,
  Download,
  Upload,
  Trash2,
  FileEdit,
  ArrowRight,
  Save,
  Check,
  PlusCircle,
  X,
  Layers,
  Code2,
  AlertCircle,
  CheckCircle2,
  Send,
  UserCheck,
} from 'lucide-react';
import { useVault } from '../../context/VaultContext';
import { useTheme } from '../../context/ThemeContext';
import { MOCK_REPOS } from '../../data/mockRepos';
import type { OrphanedProject, RevivalPath } from '../../types/project';

interface SavedVaultProps {
  onInspectProject: (project: OrphanedProject) => void;
  onExploreClick: () => void;
  onSendToCoPilot?: (project: OrphanedProject) => void;
}

export const SavedVault: React.FC<SavedVaultProps> = ({
  onInspectProject,
  onExploreClick,
  onSendToCoPilot,
}) => {
  const { isDark } = useTheme();
  const {
    savedItems,
    savedCount,
    removeSaved,
    updateNote,
    getNote,
    ownProjects,
    logOwnProject,
    deleteOwnProject,
    isGuest,
    toggleUserMode,
    userProfile,
    exportVaultJson,
    importVaultJson,
  } = useVault();

  const [activeVaultTab, setActiveVaultTab] = useState<'bookmarked' | 'own'>('bookmarked');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const [savedSuccessId, setSavedSuccessId] = useState<string | null>(null);

  // New Own Project Form Modal State (Slide 6 & 7 Feature)
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newStack, setNewStack] = useState('');
  const [newCompleted, setNewCompleted] = useState('');
  const [newRemaining, setNewRemaining] = useState('');
  const [newReason, setNewReason] = useState('');
  const [newPath, setNewPath] = useState<RevivalPath>('Continue');

  // Map saved items to mockRepos
  const savedProjects = savedItems
    .map((item) => {
      const proj = MOCK_REPOS.find((p) => p.id === item.projectId);
      return proj ? { project: proj, vaultItem: item } : null;
    })
    .filter(Boolean) as { project: OrphanedProject; vaultItem: any }[];

  const handleStartEditNote = (projectId: string) => {
    setEditingNoteId(projectId);
    setNoteDraft(getNote(projectId));
  };

  const handleSaveNote = (projectId: string) => {
    updateNote(projectId, noteDraft);
    setEditingNoteId(null);
    setSavedSuccessId(projectId);
    setTimeout(() => setSavedSuccessId(null), 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = importVaultJson(content);
        if (res.success) {
          setImportMessage(`Successfully restored ${res.count} records into your vault.`);
        } else {
          setImportMessage(`Import Error: ${res.error || 'Failed to parse file.'}`);
        }
        setTimeout(() => setImportMessage(null), 4000);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleCreateOwnProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const stackArray = newStack
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    logOwnProject({
      title: newTitle.trim(),
      techStack: stackArray.length > 0 ? stackArray : ['TypeScript', 'React'],
      completedWork: newCompleted.trim() || 'Core setup and prototypes built.',
      remainingWork: newRemaining.trim() || 'Missing integration tests and mobile styles.',
      stoppingReason: newReason.trim() || 'Time constraints and competing priorities.',
      recommendedPath: newPath,
    });

    // Reset Form
    setNewTitle('');
    setNewStack('');
    setNewCompleted('');
    setNewRemaining('');
    setNewReason('');
    setNewPath('Continue');
    setIsRecordModalOpen(false);
    setActiveVaultTab('own');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Top Header Card */}
      <div
        className={`p-6 md:p-8 rounded-3xl mb-8 border transition-all ${
          isDark
            ? 'bg-slate-900/60 backdrop-blur-xl border-indigo-500/20 shadow-[0_12px_40px_rgba(0,0,0,0.85)]'
            : 'bg-white border-2 border-black shadow-[6px_6px_0px_#111111]'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="font-mono text-xs uppercase px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-bold">
                Slide 6 & 7 • Client Vault
              </span>
              <span
                onClick={toggleUserMode}
                className="cursor-pointer font-mono text-xs uppercase px-2.5 py-1 rounded flex items-center gap-1.5 transition"
                style={{
                  backgroundColor: isGuest ? 'rgba(100,116,139,0.2)' : 'rgba(16,185,129,0.2)',
                  color: isGuest ? '#94a3b8' : '#34d399',
                  border: isGuest ? '1px solid #475569' : '1px solid #059669',
                }}
                title="Click to toggle Guest vs Authenticated Developer Profile"
              >
                <UserCheck size={13} />
                {isGuest ? 'Mode: Guest (Stateless)' : `Mode: ${userProfile.name} (@${userProfile.handle})`}
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold uppercase tracking-wide">
              My Saved Graveyard
            </h1>
            <p className="font-serif text-sm text-slate-400 mt-1 max-w-2xl">
              100% private client-side vault. Maintain bookmarks of promising public codebases, or log
              records of your <strong>own unfinished projects</strong> with tactical revival notes.
            </p>
          </div>

          {/* Action Buttons: Export/Import JSON + Record Own Project */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setIsRecordModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:brightness-110 text-white font-mono text-xs uppercase font-bold tracking-wider inline-flex items-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.5)] transition"
            >
              <PlusCircle size={15} />
              <span>+ Record My Own Project</span>
            </button>

            <button
              onClick={exportVaultJson}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs uppercase font-bold tracking-wider inline-flex items-center gap-2 transition ${
                isDark
                  ? 'bg-slate-800/80 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30'
                  : 'bg-stone-200 hover:bg-stone-300 text-black border-2 border-black shadow-[2px_2px_0px_#111111]'
              }`}
              title="Download entire vault as JSON backup"
            >
              <Download size={14} />
              <span>Export .JSON</span>
            </button>

            <label
              className={`cursor-pointer px-4 py-2.5 rounded-xl font-mono text-xs uppercase font-bold tracking-wider inline-flex items-center gap-2 transition ${
                isDark
                  ? 'bg-slate-800/80 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30'
                  : 'bg-stone-200 hover:bg-stone-300 text-black border-2 border-black shadow-[2px_2px_0px_#111111]'
              }`}
              title="Upload JSON backup to restore saved items"
            >
              <Upload size={14} />
              <span>Import .JSON</span>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Import notification */}
        {importMessage && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-2 animate-fadeIn">
            <Check size={14} />
            <span>{importMessage}</span>
          </div>
        )}

        {/* Vault Navigation Sub-Tabs */}
        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-700/40">
          <button
            onClick={() => setActiveVaultTab('bookmarked')}
            className={`px-4 py-2 rounded-xl font-mono text-xs uppercase font-bold tracking-wider transition inline-flex items-center gap-2 ${
              activeVaultTab === 'bookmarked'
                ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                : 'text-slate-400 hover:text-white bg-white/[0.03]'
            }`}
          >
            <Bookmark size={14} />
            <span>Public Graveyard Bookmarks ({savedCount})</span>
          </button>

          <button
            onClick={() => setActiveVaultTab('own')}
            className={`px-4 py-2 rounded-xl font-mono text-xs uppercase font-bold tracking-wider transition inline-flex items-center gap-2 ${
              activeVaultTab === 'own'
                ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                : 'text-slate-400 hover:text-white bg-white/[0.03]'
            }`}
          >
            <Layers size={14} />
            <span>My Own Unfinished Projects ({ownProjects.length})</span>
          </button>
        </div>
      </div>

      {/* VIEW A: BOOKMARKED REPOSITORIES */}
      {activeVaultTab === 'bookmarked' && (
        <>
          {savedProjects.length === 0 ? (
            <div
              className={`p-12 text-center rounded-3xl border ${
                isDark
                  ? 'bg-slate-900/40 border-indigo-500/20'
                  : 'bg-white border-2 border-black'
              }`}
            >
              <Bookmark className="w-12 h-12 text-slate-500 mx-auto mb-4 opacity-50" />
              <h3 className="font-serif text-xl font-bold uppercase mb-2">
                No Bookmarked Repositories Yet
              </h3>
              <p className="font-serif text-sm text-slate-400 max-w-md mx-auto mb-6">
                Browse the Graveyard Discovery Catalogue and bookmark stalled foundations to evaluate
                their 5-path revival potential.
              </p>
              <button
                onClick={onExploreClick}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs uppercase font-bold tracking-wider transition-all inline-flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
              >
                <span>Explore The Graveyard</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {savedProjects.map(({ project, vaultItem }) => {
                const isEditing = editingNoteId === project.id;
                const currentNote = getNote(project.id);

                return (
                  <div
                    key={project.id}
                    className={`p-6 rounded-2xl border transition-all ${
                      isDark
                        ? 'bg-slate-900/70 border-indigo-500/25 shadow-[0_6px_24px_rgba(0,0,0,0.8)]'
                        : 'bg-white border-2 border-black shadow-[4px_4px_0px_#111111]'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3
                            className="font-serif text-2xl font-bold uppercase hover:underline cursor-pointer"
                            onClick={() => onInspectProject(project)}
                          >
                            {project.name}
                          </h3>
                          <span className="font-mono text-xs text-slate-500">
                            @{project.owner}
                          </span>
                          <span className="font-mono text-[10px] text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-500/20">
                            SAVED: {new Date(vaultItem.savedAt).toLocaleDateString()}
                          </span>
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-mono font-bold"
                            style={{
                              backgroundColor: isDark ? '#020307' : '#FFFFFF',
                              border: `1px solid ${project.languageColor || '#8B5CF6'}`,
                              color: isDark ? '#E2E8F0' : '#111111',
                            }}
                          >
                            {project.primaryLanguage}
                          </span>
                        </div>

                        <p className="font-serif text-sm text-slate-300 mt-1">
                          {project.documentedGoal}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => onInspectProject(project)}
                          className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold inline-flex items-center gap-1.5 transition"
                        >
                          <span>Inspect Intelligence</span>
                          <ArrowRight size={13} />
                        </button>
                        {onSendToCoPilot && (
                          <button
                            onClick={() => onSendToCoPilot(project)}
                            className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/30 font-mono text-xs font-bold inline-flex items-center gap-1 transition"
                            title="Send to Quantum Co-Pilot"
                          >
                            <Send size={13} />
                            <span>Co-Pilot</span>
                          </button>
                        )}
                        <button
                          onClick={() => removeSaved(project.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition"
                          title="Remove from vault"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Personal Notes Section */}
                    <div
                      className={`mt-4 p-4 rounded-xl border ${
                        isDark
                          ? 'bg-slate-950/60 border-slate-800'
                          : 'bg-stone-100 border border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-indigo-400 flex items-center gap-1 font-bold">
                          <FileEdit size={12} />
                          Personal Revival Notes (Private to your browser)
                        </span>

                        {!isEditing && (
                          <button
                            onClick={() => handleStartEditNote(project.id)}
                            className="font-mono text-[11px] text-slate-400 hover:text-white transition"
                          >
                            {currentNote ? 'Edit Notes' : '+ Add Revival Notes'}
                          </button>
                        )}
                      </div>

                      {isEditing ? (
                        <div className="space-y-2">
                          <textarea
                            value={noteDraft}
                            onChange={(e) => setNoteDraft(e.target.value)}
                            placeholder="Add tactical thoughts, e.g., 'Extract auth proxy for project hackathon on Saturday'..."
                            rows={3}
                            className={`w-full p-2.5 rounded-lg text-xs font-mono focus:outline-none ${
                              isDark
                                ? 'bg-slate-900 border border-indigo-500/40 text-slate-200 placeholder-slate-600'
                                : 'bg-white border-2 border-black text-black placeholder-stone-400'
                            }`}
                          />
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingNoteId(null)}
                              className="px-3 py-1 rounded text-xs font-mono text-slate-400 hover:text-white"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveNote(project.id)}
                              className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold inline-flex items-center gap-1"
                            >
                              <Save size={12} />
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="font-mono text-xs text-slate-300 italic">
                          {currentNote || (
                            <span className="text-slate-500 not-italic">
                              No notes attached yet. Click to write your revival strategy.
                            </span>
                          )}
                        </p>
                      )}

                      {savedSuccessId === project.id && (
                        <div className="mt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                          <Check size={12} />
                          Saved to localStorage.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* VIEW B: MY OWN UNFINISHED PROJECTS (PPT SLIDE 6 & 7) */}
      {activeVaultTab === 'own' && (
        <div className="space-y-6">
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between gap-4 flex-wrap ${
              isDark ? 'bg-indigo-950/30 border-indigo-500/25' : 'bg-orange-50 border-2 border-orange-400'
            }`}
          >
            <div className="flex items-center gap-3">
              <Code2 className="text-indigo-400 w-5 h-5 shrink-0" />
              <p className="text-xs font-mono text-slate-300">
                <strong>Slide 6 & 7 Feature:</strong> Developers can log and track their own paused codebases
                alongside public ones to avoid duplicate work and recover trapped time.
              </p>
            </div>
            <button
              onClick={() => setIsRecordModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs uppercase font-bold tracking-wider inline-flex items-center gap-1.5 shadow"
            >
              <PlusCircle size={14} />
              <span>+ Record New Project</span>
            </button>
          </div>

          {ownProjects.length === 0 ? (
            <div
              className={`p-12 text-center rounded-3xl border ${
                isDark ? 'bg-slate-900/40 border-indigo-500/20' : 'bg-white border-2 border-black'
              }`}
            >
              <Layers className="w-12 h-12 text-slate-500 mx-auto mb-4 opacity-50" />
              <h3 className="font-serif text-xl font-bold uppercase mb-2">
                No Personal Projects Logged Yet
              </h3>
              <p className="font-serif text-sm text-slate-400 max-w-md mx-auto mb-6">
                Have a repository sitting dormant on your hard drive? Record what you finished, what's
                missing, and why you paused so you can pick it up when you have bandwidth.
              </p>
              <button
                onClick={() => setIsRecordModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs uppercase font-bold tracking-wider transition-all inline-flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
              >
                <PlusCircle size={15} />
                <span>Record My Unfinished Project</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {ownProjects.map((own) => (
                <div
                  key={own.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    isDark
                      ? 'bg-slate-900/70 border-indigo-500/25 shadow-[0_6px_24px_rgba(0,0,0,0.8)]'
                      : 'bg-white border-2 border-black shadow-[4px_4px_0px_#111111]'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-serif text-2xl font-bold uppercase">{own.title}</h3>
                        <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                          CREATED: {own.createdAt}
                        </span>
                        <span className="font-mono text-[10px] text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/30">
                          REVIVAL PATH: {own.recommendedPath}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        {own.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded font-mono text-[10px] bg-white/[0.05] border border-white/10 text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => deleteOwnProject(own.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition self-start"
                      title="Delete logged project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Split Evidence Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                      <div className="flex items-center gap-2 mb-1 text-emerald-400 font-mono text-xs font-bold uppercase">
                        <CheckCircle2 size={13} />
                        <span>Completed & Verified Work</span>
                      </div>
                      <p className="font-mono text-xs text-slate-200">{own.completedWork}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30">
                      <div className="flex items-center gap-2 mb-1 text-amber-400 font-mono text-xs font-bold uppercase">
                        <AlertCircle size={13} />
                        <span>Remaining Gaps & Stopping Reason</span>
                      </div>
                      <p className="font-mono text-xs text-slate-200 mb-1">
                        <strong>Gaps:</strong> {own.remainingWork}
                      </p>
                      <p className="font-mono text-[11px] text-amber-300/80">
                        <strong>Reason:</strong> {own.stoppingReason}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL: [+ Record My Unfinished Project] (PPT Slide 6 & 7) */}
      {isRecordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div
            className={`w-full max-w-2xl rounded-3xl p-6 md:p-8 border shadow-2xl relative ${
              isDark
                ? 'bg-[#0B1021] border-indigo-500/40 text-white'
                : 'bg-white border-2 border-black text-black'
            }`}
          >
            <button
              onClick={() => setIsRecordModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              <X size={18} />
            </button>

            <div className="mb-6">
              <span className="font-mono text-xs uppercase px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-bold">
                Slide 6/7 Feature
              </span>
              <h2 className="font-serif text-2xl font-bold uppercase tracking-wide mt-2">
                Record My Unfinished Project
              </h2>
              <p className="font-serif text-xs text-slate-400 mt-1">
                Save an evidence-backed record of what's done, what stalled, and how to revive it.
              </p>
            </div>

            <form onSubmit={handleCreateOwnProject} className="space-y-4">
              <div>
                <label className="block font-mono text-xs uppercase font-bold text-slate-300 mb-1">
                  Project Title / Repo Name *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Campus-Mesh-P2P or Solana-Sensor-Vault"
                  className={`w-full p-3 rounded-xl font-mono text-xs focus:outline-none ${
                    isDark
                      ? 'bg-slate-900 border border-indigo-500/30 text-white'
                      : 'bg-stone-100 border border-black text-black'
                  }`}
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase font-bold text-slate-300 mb-1">
                  Tech Stack (Comma Separated)
                </label>
                <input
                  type="text"
                  value={newStack}
                  onChange={(e) => setNewStack(e.target.value)}
                  placeholder="e.g., React, TypeScript, FastAPI, Redis"
                  className={`w-full p-3 rounded-xl font-mono text-xs focus:outline-none ${
                    isDark
                      ? 'bg-slate-900 border border-indigo-500/30 text-white'
                      : 'bg-stone-100 border border-black text-black'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs uppercase font-bold text-emerald-400 mb-1">
                    What Actually Works (Completed Progress) *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newCompleted}
                    onChange={(e) => setNewCompleted(e.target.value)}
                    placeholder="e.g., Auth middleware, login UI and database migrations working 100%."
                    className={`w-full p-3 rounded-xl font-mono text-xs focus:outline-none ${
                      isDark
                        ? 'bg-slate-900 border border-emerald-500/30 text-white'
                        : 'bg-stone-100 border border-black text-black'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase font-bold text-amber-400 mb-1">
                    What's Remaining (Known Gaps) *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newRemaining}
                    onChange={(e) => setNewRemaining(e.target.value)}
                    placeholder="e.g., Missing WebSocket handler, unwritten billing stripe webhook."
                    className={`w-full p-3 rounded-xl font-mono text-xs focus:outline-none ${
                      isDark
                        ? 'bg-slate-900 border border-amber-500/30 text-white'
                        : 'bg-stone-100 border border-black text-black'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs uppercase font-bold text-slate-300 mb-1">
                    Stopping Reason (Why Was It Paused?)
                  </label>
                  <input
                    type="text"
                    value={newReason}
                    onChange={(e) => setNewReason(e.target.value)}
                    placeholder="e.g., Graduated, ran out of cloud credits, pivoted focus."
                    className={`w-full p-3 rounded-xl font-mono text-xs focus:outline-none ${
                      isDark
                        ? 'bg-slate-900 border border-indigo-500/30 text-white'
                        : 'bg-stone-100 border border-black text-black'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase font-bold text-slate-300 mb-1">
                    Planned 5-Path Revival
                  </label>
                  <select
                    value={newPath}
                    onChange={(e) => setNewPath(e.target.value as RevivalPath)}
                    className={`w-full p-3 rounded-xl font-mono text-xs focus:outline-none ${
                      isDark
                        ? 'bg-slate-900 border border-indigo-500/30 text-white'
                        : 'bg-stone-100 border border-black text-black'
                    }`}
                  >
                    <option value="Continue">02 // CONTINUE (Finish remaining 20%)</option>
                    <option value="Restart">01 // RESTART (Rewrite clean stack)</option>
                    <option value="Change">03 // CHANGE (Pivot use-case/audience)</option>
                    <option value="Repurpose">04 // REPURPOSE (Extract working organ)</option>
                    <option value="Archive">05 // ARCHIVE (Keep as read-only reference)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsRecordModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs uppercase font-bold tracking-wider inline-flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                >
                  <Save size={14} />
                  <span>Save Record into Vault</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
