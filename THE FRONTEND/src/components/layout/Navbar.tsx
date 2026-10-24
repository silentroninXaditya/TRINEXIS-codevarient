import React from 'react';
import {
  Compass,
  Activity,
  Bot,
  Bookmark,
  Zap,
  Radio,
  Sun,
  Moon,
  Key,
  UserCheck,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useVault } from '../../context/VaultContext';

export type ActiveScreen = 'graveyard' | 'intelligence' | 'copilot' | 'vault' | '404' | '429';

interface NavbarProps {
  activeScreen: ActiveScreen;
  onSelectScreen: (screen: ActiveScreen) => void;
  onOpenByokModal: () => void;
  hasByokKey: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeScreen,
  onSelectScreen,
  onOpenByokModal,
  hasByokKey,
}) => {
  const { toggleTheme, isDark } = useTheme();
  const { savedCount, ownProjects, isGuest, toggleUserMode, userProfile } = useVault();
  const totalVaultCount = savedCount + ownProjects.length;

  return (
    <header className="fixed top-4 inset-x-0 max-w-7xl mx-auto z-40 px-4">
      <div
        className={`w-full rounded-2xl px-5 py-3 transition-all duration-300 flex items-center justify-between gap-4 border ${
          isDark
            ? 'bg-slate-900/65 backdrop-blur-xl border-indigo-500/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_32px_rgba(0,0,0,0.85)]'
            : 'bg-white/85 backdrop-blur-xl border-black/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),0_6px_24px_rgba(0,0,0,0.08)]'
        }`}
      >
        {/* Left: Brand Identity + Status */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none shrink-0"
          onClick={() => onSelectScreen('graveyard')}
        >
          {/* Team Trinexis Trident Emblem */}
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-serif text-lg font-bold transition-all ${
              isDark
                ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-[0_0_14px_rgba(99,102,241,0.5)]'
                : 'bg-black text-white shadow-[2px_2px_0px_#FF5500]'
            }`}
          >
            Ψ
          </div>

          <div className="flex flex-col">
            <span
              className={`font-serif text-sm font-bold tracking-[0.18em] uppercase ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              PROJECT GRAVEYARD
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span
                className={`text-[9px] font-mono tracking-widest font-bold ${
                  isDark ? 'text-emerald-400' : 'text-emerald-700'
                }`}
              >
                NEXUS ONLINE
              </span>
            </div>
          </div>
        </div>

        {/* Center: 3 Main Pages (PPT Section 2 B) */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10">
          {/* Page 1: The Graveyard */}
          <button
            onClick={() => onSelectScreen('graveyard')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              activeScreen === 'graveyard'
                ? isDark
                  ? 'bg-indigo-600 text-white shadow-[0_0_14px_rgba(99,102,241,0.5)]'
                  : 'bg-black text-white shadow-[2px_2px_0px_#FF5500]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass size={13} />
            <span>01 // The Graveyard</span>
          </button>

          {/* Page 2: Intelligence & Second Chance */}
          <button
            onClick={() => onSelectScreen('intelligence')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              activeScreen === 'intelligence'
                ? isDark
                  ? 'bg-purple-600 text-white shadow-[0_0_14px_rgba(168,85,247,0.5)]'
                  : 'bg-black text-white shadow-[2px_2px_0px_#FF5500]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity size={13} />
            <span>02 // Intelligence &amp; Revival</span>
          </button>

          {/* Page 3: Quantum Co-Pilot Studio (Voice & Edit) */}
          <button
            onClick={() => onSelectScreen('copilot')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              activeScreen === 'copilot'
                ? isDark
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_16px_rgba(99,102,241,0.6)]'
                  : 'bg-black text-white shadow-[2px_2px_0px_#FF5500]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot size={13} className="text-indigo-400 animate-pulse" />
            <span>03 // Quantum Co-Pilot</span>
          </button>

          {/* Quick Vault Link */}
          <button
            onClick={() => onSelectScreen('vault')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              activeScreen === 'vault'
                ? 'bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.5)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark size={13} />
            <span>Vault ({totalVaultCount})</span>
          </button>
        </nav>

        {/* Right Utility Bar: Guest Switcher, BYOK, 404, 429, Theme */}
        <div className="flex items-center gap-2">
          {/* Guest vs Logged-In Profile Switcher (Slide 2 B) */}
          <button
            onClick={toggleUserMode}
            className={`px-2.5 py-1.5 rounded-xl font-mono text-[10px] font-bold uppercase transition flex items-center gap-1.5 border ${
              isGuest
                ? 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
                : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
            }`}
            title="Click to toggle between Guest Mode and Authenticated Developer Profile"
          >
            <UserCheck size={12} />
            <span className="hidden sm:inline">
              {isGuest ? 'Guest' : userProfile.handle}
            </span>
          </button>

          {/* BYOK Key Status */}
          <button
            onClick={onOpenByokModal}
            className={`px-2.5 py-1.5 rounded-xl font-mono text-[10px] font-bold uppercase transition flex items-center gap-1.5 border ${
              hasByokKey
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-800/80 border-slate-700 text-indigo-300 hover:bg-slate-700'
            }`}
            title="Client-Side BYOK Key Manager"
          >
            <Key size={12} />
            <span className="hidden sm:inline">
              {hasByokKey ? 'KEY: LOCAL' : 'BYOK'}
            </span>
          </button>

          {/* 429 Overload Trigger */}
          <button
            onClick={() => onSelectScreen('429')}
            className={`p-1.5 rounded-xl border transition ${
              activeScreen === '429'
                ? 'bg-amber-600 text-white border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                : 'bg-white/[0.04] border-white/10 text-amber-400 hover:bg-amber-950/40'
            }`}
            title="Slide 8 Demo: Trigger 429 Temporal Overload"
          >
            <Zap size={14} />
          </button>

          {/* 404 Quantum Portal Trigger */}
          <button
            onClick={() => onSelectScreen('404')}
            className={`p-1.5 rounded-xl border transition ${
              activeScreen === '404'
                ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                : 'bg-white/[0.04] border-white/10 text-purple-400 hover:bg-purple-950/40'
            }`}
            title="Demo: Jump into 404 Quantum Realm"
          >
            <Radio size={14} />
          </button>

          {/* Theme Toggle (Neumorphic) */}
          <button
            onClick={toggleTheme}
            className={`p-1.5 rounded-xl border transition ${
              isDark
                ? 'bg-slate-800 border-indigo-500/30 text-amber-400 hover:bg-slate-700 shadow-[inset_1px_1px_2px_#020307]'
                : 'bg-white border-black text-black shadow-[2px_2px_0px_#111111]'
            }`}
            title={isDark ? 'Switch to Solar Brutalism (Light)' : 'Switch to Quantum Void (Dark)'}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>
    </header>
  );
};
