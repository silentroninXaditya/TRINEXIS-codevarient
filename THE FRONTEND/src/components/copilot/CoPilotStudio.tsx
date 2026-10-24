import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  Edit3,
  RotateCcw,
  Volume2,
  VolumeX,
  Check,
  X,
  FolderGit2,
  ArrowUpRight,
  Key,
  GripVertical,
  Bot,
  User,
  Radio,
} from 'lucide-react';
import { MOCK_REPOS } from '../../data/mockRepos';
import { useVault } from '../../context/VaultContext';
import type { OrphanedProject } from '../../types/project';

export interface MiniRepo {
  id: string;
  name: string;
  techStack: string[];
  state: string;
  recommendedPath: string;
  summary: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  attachedRepo?: MiniRepo | null;
  matchedRepos?: MiniRepo[];
  timestamp: string;
}

interface CoPilotStudioProps {
  onOpenRepoWorkspace?: (repo: OrphanedProject) => void;
}

export const CoPilotStudio: React.FC<CoPilotStudioProps> = ({ onOpenRepoWorkspace }) => {
  const { ownProjects } = useVault();

  // Convert full mock repos and user's own logged projects to draggable MiniRepo format
  const pipelineRepos: MiniRepo[] = [
    ...MOCK_REPOS.map((r) => ({
      id: r.id,
      name: r.name,
      techStack: r.techStack,
      state: r.state,
      recommendedPath: r.recommendedPath,
      summary: r.documentedGoal,
    })),
    ...ownProjects.map((op) => ({
      id: op.id,
      name: op.title,
      techStack: op.techStack,
      state: 'User Logged Unfinished',
      recommendedPath: op.recommendedPath,
      summary: `${op.completedWork} | Stopping reason: ${op.stoppingReason}`,
    })),
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        'Welcome to the **Trinexis Quantum Co-Pilot**.\n\nDrag & drop any repository card from the left dock into this ultra-glass canvas, speak via **Voice Mode 🎙️**, or ask me to diagnose and plan a **5-Path Revival** for any incomplete software foundation.',
      timestamp: 'JUST NOW',
    },
  ]);

  const [input, setInput] = useState('');
  const [droppedRepo, setDroppedRepo] = useState<MiniRepo | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Edit & Re-Run State
  const [editingMsgId, setEditingMsgId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState('');

  // Voice Recognition (STT) & Speech Synthesis (TTS) State
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Smart Pipeline Response Generator based on Rules Engine & Mock Data
  const generatePipelineResponse = (
    queryText: string,
    contextRepo?: MiniRepo | null
  ): { reply: string; matched: MiniRepo[] } => {
    const q = queryText.toLowerCase();

    if (contextRepo) {
      return {
        reply: `### 🧬 Evidence Autopsy: \`${contextRepo.name}\`\n\n- **Observed State:** ${contextRepo.state}\n- **Summary of Reality:** ${contextRepo.summary}\n- **Recommended Revival Path:** **${contextRepo.recommendedPath.toUpperCase()}**\n\n**Deterministic Action Playbook:**\n1. Lock runtime dependencies and run cryptographic audit.\n2. Isolate verified modules from uncompleted stubs.\n3. Execute the **${contextRepo.recommendedPath}** guidance protocol in the Second Chance Workspace.`,
        matched: [contextRepo],
      };
    }

    const matches = pipelineRepos.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.techStack.some((t) => q.includes(t.toLowerCase())) ||
        (q.includes('campus') && r.id.includes('campus')) ||
        (q.includes('auth') && r.id.includes('auth')) ||
        (q.includes('audio') && r.id.includes('audio')) ||
        (q.includes('p2p') && r.id.includes('p2p'))
    );

    if (matches.length > 0) {
      return {
        reply: `I scanned the **Trinexis Normalised Pipeline** and found **${matches.length} overlooked codebases** matching your intent. Review their verified evidence below or click any card to inspect the full autopsy:`,
        matched: matches.slice(0, 4),
      };
    }

    return {
      reply: `Based on our **Deterministic Rules Engine (Slide 8)**, commit age does not prove abandonment. We found high-potential stalled foundations with verified core logic ready for extraction or continuation:`,
      matched: pipelineRepos.slice(0, 3),
    };
  };

  // Send New Message
  const handleSend = (overrideText?: string) => {
    const textToSend = (overrideText ?? input).trim();
    if (!textToSend && !droppedRepo) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend || `Run full intelligence autopsy on: ${droppedRepo?.name}`,
      attachedRepo: droppedRepo,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const activeRepo = droppedRepo;
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setDroppedRepo(null);
    setIsTyping(true);

    setTimeout(() => {
      const { reply, matched } = generatePipelineResponse(userMsg.content, activeRepo);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: reply,
        matchedRepos: matched,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 650);
  };

  // Save Edited Message & Re-Run AI Response
  const handleSaveEditAndRerun = (msgIndex: number) => {
    if (!editDraft.trim()) return;
    const targetMsg = messages[msgIndex];

    if (targetMsg.role === 'user') {
      const updatedUserMsg: ChatMessage = {
        ...targetMsg,
        content: editDraft,
        timestamp: 'EDITED • JUST NOW',
      };
      const slicedHistory = [...messages.slice(0, msgIndex), updatedUserMsg];
      setMessages(slicedHistory);
      setEditingMsgId(null);
      setIsTyping(true);

      setTimeout(() => {
        const { reply, matched } = generatePipelineResponse(
          editDraft,
          updatedUserMsg.attachedRepo
        );
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-rerun-${Date.now()}`,
            role: 'assistant',
            content: reply,
            matchedRepos: matched,
            timestamp: 'RE-RUN • JUST NOW',
          },
        ]);
        setIsTyping(false);
      }, 600);
    } else {
      const updated = [...messages];
      updated[msgIndex] = { ...targetMsg, content: editDraft, timestamp: 'EDITED BY DEVELOPER' };
      setMessages(updated);
      setEditingMsgId(null);
    }
  };

  // Re-Run / Regenerate Specific AI Response
  const handleRegenerateAi = (msgIndex: number) => {
    const prevUserMsg = messages[msgIndex - 1];
    const query = prevUserMsg?.content || 'Diagnose stalled repository';
    setIsTyping(true);

    setTimeout(() => {
      const { reply, matched } = generatePipelineResponse(query, prevUserMsg?.attachedRepo);
      const updated = [...messages];
      updated[msgIndex] = {
        ...updated[msgIndex],
        content: `${reply}\n\n*(⚡ Alternative Heuristic Strategy via Slide 8 Rules Engine)*`,
        matchedRepos: matched,
        timestamp: 'REGENERATED • JUST NOW',
      };
      setMessages(updated);
      setIsTyping(false);
    }, 550);
  };

  // Voice Input (Web Speech API + Automated Fallback for Screen Share Reliability)
  const toggleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((res: any) => (res as any)[0].transcript)
            .join('');
          setInput(transcript);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
        recognitionRef.current = recognition;
        recognition.start();
      } catch {
        simulateVoiceFallback();
      }
    } else {
      simulateVoiceFallback();
    }
  };

  const simulateVoiceFallback = () => {
    setIsListening(true);
    setTimeout(() => {
      setInput('Find me the unfinished Campus Navigation App and show its revival path');
      setIsListening(false);
    }, 2200);
  };

  // Text-to-Speech (Read AI Response Aloud)
  const toggleSpeakMessage = (msg: ChatMessage) => {
    if (!('speechSynthesis' in window)) return;
    if (speakingMsgId === msg.id) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = msg.content.replace(/[#*`_~]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.onend = () => setSpeakingMsgId(null);
    setSpeakingMsgId(msg.id);
    window.speechSynthesis.speak(utterance);
  };

  const handleCardClick = (repoId: string) => {
    const fullProject = MOCK_REPOS.find((p) => p.id === repoId);
    if (fullProject && onOpenRepoWorkspace) {
      onOpenRepoWorkspace(fullProject);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] w-full overflow-hidden bg-[#04060d] text-slate-100 p-4 md:p-8 flex flex-col lg:flex-row gap-6">
      {/* Fluid Morphism Cosmic Background Orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-20 left-1/4 w-[34rem] h-[34rem] bg-blue-600/20 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-[36rem] h-[36rem] bg-purple-600/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-indigo-500/15 rounded-full blur-[130px]" />
      </div>

      {/* LEFT DOCK: Draggable Repository Cards */}
      <aside className="relative z-10 w-full lg:w-84 shrink-0 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.45),inset_0_1px_1px_0_rgba(255,255,255,0.2)] p-5 flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-400 block">
              Pipeline Context Dock
            </span>
            <h2 className="text-base font-bold tracking-tight text-white">
              Drag Repo to Co-Pilot
            </h2>
          </div>
          <FolderGit2 className="w-5 h-5 text-indigo-400" />
        </div>

        <div className="space-y-3 overflow-y-auto pr-1 flex-1">
          {pipelineRepos.map((repo) => (
            <div
              key={repo.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('application/json', JSON.stringify(repo));
              }}
              onClick={() => setDroppedRepo(repo)}
              className="group cursor-grab active:cursor-grabbing rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/10 hover:border-indigo-400/50 p-3.5 transition-all duration-200 shadow-lg"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <GripVertical className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 shrink-0" />
                  <span className="font-mono text-xs font-semibold text-indigo-200 truncate">
                    {repo.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 shrink-0">
                  {repo.recommendedPath}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2">{repo.summary}</p>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {repo.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span>DATA PIPELINE: NORMALIZED</span>
          <span className="inline-flex items-center gap-1 text-emerald-400">
            <Key className="w-3 h-3" /> Client-Side Only
          </span>
        </div>
      </aside>

      {/* CENTER GLASS CANVAS: Ultra-Glassmorphic Chatbot */}
      <section
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDraggingOver(false);
          const raw = e.dataTransfer.getData('application/json');
          if (raw) {
            try {
              setDroppedRepo(JSON.parse(raw));
            } catch {
              // fallback
            }
          }
        }}
        className={`relative z-10 flex-1 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border transition-all duration-300 shadow-[0_12px_45px_0_rgba(0,0,0,0.55),inset_0_1px_1px_0_rgba(255,255,255,0.22)] flex flex-col overflow-hidden max-h-[85vh] ${
          isDraggingOver
            ? 'border-indigo-400 bg-indigo-950/30 scale-[0.995]'
            : 'border-white/15'
        }`}
      >
        {/* Drag-and-Drop Hologram Overlay */}
        {isDraggingOver && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-indigo-950/70 backdrop-blur-md pointer-events-none">
            <Sparkles className="w-12 h-12 text-indigo-300 animate-bounce mb-2" />
            <p className="text-lg font-mono uppercase tracking-widest text-white font-bold">
              Drop Repository Into Quantum Context
            </p>
          </div>
        )}

        {/* Top Glass Header */}
        <header className="px-6 py-4 border-b border-white/10 bg-white/[0.02] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/20 flex items-center justify-center shadow-inner">
              <Bot className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h1 className="text-sm md:text-base font-bold tracking-tight text-white flex items-center gap-2">
                Trinexis Quantum Co-Pilot
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
                  Voice + Edit Active
                </span>
              </h1>
              <p className="text-xs text-slate-400 font-mono">
                Slide 8 Rules Engine & Normalised Pipeline • 100% Crystal Glass UI
              </p>
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleSend('Find me the Campus Nav App from Slide 2')}
              className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-indigo-200 transition"
            >
              🎓 Campus Nav
            </button>
            <button
              onClick={() => handleSend('Find reusable Python FastAPI Auth foundations')}
              className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-purple-200 transition"
            >
              ⚡ FastAPI Auth
            </button>
            <button
              onClick={() => handleSend('Show me WebGL Audio synthesis shaders')}
              className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-amber-200 transition"
            >
              ✨ WebGL Shaders
            </button>
          </div>
        </header>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => {
            const isEditing = editingMsgId === msg.id;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`group relative max-w-2xl rounded-3xl p-5 backdrop-blur-2xl border transition-all ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-indigo-600/25 to-purple-600/25 border-indigo-400/35 text-white shadow-[0_8px_25px_rgba(99,102,241,0.18)]'
                      : 'bg-white/[0.04] border-white/15 text-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
                  }`}
                >
                  {/* Message Role & Timestamp Header */}
                  <div className="flex items-center justify-between gap-4 mb-2 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    <span className="flex items-center gap-1.5 text-indigo-300">
                      {msg.role === 'user' ? (
                        <>
                          <User className="w-3 h-3" /> Developer Prompt
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3" /> Trinexis Intelligence
                        </>
                      )}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Attached Dropped Repo Pill */}
                  {msg.attachedRepo && (
                    <div className="mb-3 inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-indigo-500/20 border border-indigo-400/40 text-xs font-mono text-indigo-200">
                      <FolderGit2 className="w-3.5 h-3.5" />
                      Context Attached: {msg.attachedRepo.name}
                    </div>
                  )}

                  {/* Inline Editor Mode vs Standard View */}
                  {isEditing ? (
                    <div className="space-y-3 mt-1">
                      <textarea
                        value={editDraft}
                        onChange={(e) => setEditDraft(e.target.value)}
                        rows={3}
                        className="w-full rounded-2xl bg-slate-950/70 border border-indigo-400/50 p-3 text-sm text-white focus:outline-none"
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingMsgId(null)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono"
                        >
                          <X className="w-3.5 h-3.5" /> Cancel
                        </button>
                        <button
                          onClick={() => handleSaveEditAndRerun(idx)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-xs font-mono font-semibold text-white shadow-lg"
                        >
                          <Check className="w-3.5 h-3.5" />
                          {msg.role === 'user' ? 'Save & Re-Run AI' : 'Save Edited Output'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm leading-relaxed whitespace-pre-line">
                      {msg.content}
                    </div>
                  )}

                  {/* Interactive Matched Repository Cards Inside Chat */}
                  {msg.matchedRepos && msg.matchedRepos.length > 0 && !isEditing && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {msg.matchedRepos.map((repo) => (
                        <div
                          key={repo.id}
                          onClick={() => handleCardClick(repo.id)}
                          className="cursor-pointer rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 hover:border-indigo-400/50 p-3.5 transition group/card"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-indigo-300">
                              {repo.name}
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover/card:text-white group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition" />
                          </div>
                          <p className="text-[11px] text-slate-300 mt-1.5 line-clamp-2">
                            {repo.summary}
                          </p>
                          <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
                            <span className="text-amber-300">{repo.state}</span>
                            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-200">
                              Path: {repo.recommendedPath}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Toolbar (Edit, Re-Run, Voice Read Aloud) */}
                  {!isEditing && (
                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center gap-3 text-xs text-slate-400 opacity-85 group-hover:opacity-100 transition flex-wrap">
                      <button
                        onClick={() => {
                          setEditingMsgId(msg.id);
                          setEditDraft(msg.content);
                        }}
                        className="inline-flex items-center gap-1 hover:text-indigo-300 transition font-mono text-[11px]"
                        title="Edit message & re-run"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        {msg.role === 'user' ? 'Edit & Re-Run' : 'Edit Output'}
                      </button>

                      {msg.role === 'assistant' && (
                        <>
                          <button
                            onClick={() => handleRegenerateAi(idx)}
                            className="inline-flex items-center gap-1 hover:text-purple-300 transition font-mono text-[11px]"
                          >
                            <RotateCcw className="w-3.5 h-3.5" /> Re-Run Response
                          </button>
                          <button
                            onClick={() => toggleSpeakMessage(msg)}
                            className={`inline-flex items-center gap-1 transition font-mono text-[11px] ${
                              speakingMsgId === msg.id
                                ? 'text-emerald-400 animate-pulse'
                                : 'hover:text-emerald-300'
                            }`}
                          >
                            {speakingMsgId === msg.id ? (
                              <>
                                <VolumeX className="w-3.5 h-3.5" /> Stop Audio
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3.5 h-3.5" /> Read Aloud
                              </>
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 text-xs font-mono text-indigo-300">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              Evaluating repository evidence & generating revival steps...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Active Dropped Repository Preview Bar */}
        {droppedRepo && (
          <div className="mx-6 mb-2 px-4 py-2 rounded-2xl bg-indigo-500/20 backdrop-blur-xl border border-indigo-400/40 flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-2 text-indigo-200">
              <FolderGit2 className="w-4 h-4 text-indigo-300" />
              Attached for Autopsy: <strong>{droppedRepo.name}</strong> ({droppedRepo.state})
            </span>
            <button
              onClick={() => setDroppedRepo(null)}
              className="text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom Glass Input & Live Voice Bar with Animated Equalizer */}
        <footer className="p-4 md:p-5 border-t border-white/10 bg-white/[0.02]">
          {isListening && (
            <div className="mb-3 px-4 py-2.5 rounded-2xl bg-red-950/40 border border-red-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Radio className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="text-xs font-mono text-red-200">
                  Listening to audio input... Speak now!
                </span>
              </div>
              {/* CSS Audio Frequency Equalizer */}
              <div className="flex items-center gap-1 h-4">
                <span className="w-1 bg-red-400 rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
                <span className="w-1 bg-red-400 rounded-full animate-bounce h-4" style={{ animationDelay: '150ms' }} />
                <span className="w-1 bg-red-400 rounded-full animate-bounce h-3" style={{ animationDelay: '300ms' }} />
                <span className="w-1 bg-red-400 rounded-full animate-bounce h-4" style={{ animationDelay: '450ms' }} />
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            {/* Voice Mode Button */}
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`relative p-3.5 rounded-2xl border transition-all flex items-center justify-center ${
                isListening
                  ? 'bg-red-500/25 border-red-400 text-red-300 shadow-[0_0_25px_rgba(239,68,68,0.5)] animate-pulse'
                  : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/15 text-slate-300 hover:text-white'
              }`}
              title="Speak to AI Co-Pilot"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Transparent Glass Text Input */}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={
                isListening
                  ? '🎙️ Listening to your voice command...'
                  : 'Ask Co-Pilot, drop a repo card, or click the mic to talk...'
              }
              className="flex-1 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/15 px-4 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400/60"
            />

            {/* Send Button */}
            <button
              type="button"
              onClick={() => handleSend()}
              className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:brightness-110 text-white font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2 shadow-[0_0_25px_rgba(99,102,241,0.45)] transition"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
};
