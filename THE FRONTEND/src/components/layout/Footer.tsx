import React from 'react';
import {
  RefreshCw,
  Zap,
  Radio,
  Download,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useVault } from '../../context/VaultContext';

interface FooterProps {
  onReplayPreloader: () => void;
  onNavigate404: () => void;
  onNavigate429: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onReplayPreloader,
  onNavigate404,
  onNavigate429,
}) => {
  const { isDark } = useTheme();
  const { exportVaultJson } = useVault();

  return (
    <footer
      className={`border-t transition-colors mt-20 ${
        isDark
          ? 'bg-[#03050B] border-indigo-500/20 text-slate-300'
          : 'bg-[#F4F4F0] border-2 border-black text-black'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1: Brand Identity */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-serif text-base font-bold ${
                  isDark
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-[0_0_12px_rgba(99,102,241,0.5)]'
                    : 'bg-black text-white shadow-[2px_2px_0px_#FF5500]'
                }`}
              >
                Ψ
              </div>
              <span className="font-serif text-sm font-bold tracking-widest uppercase">
                THE PROJECT GRAVEYARD
              </span>
            </div>

            <p className="font-serif text-xs leading-relaxed text-slate-400">
              Where lost codebases defy time &amp; death. Built by <strong>Team Trinexis</strong> for the Top 50 Finale. Solving friction, preserving trapped value, and giving software a dignified second life.
            </p>

            <span className="font-mono text-[10px] text-slate-500 tracking-wider uppercase">
              100% Client-Side Privacy • Zero Account Friction
            </span>
          </div>

          {/* Column 2: System Boundaries */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-slate-400 flex items-center gap-1.5">
              <ShieldAlert size={13} className="text-purple-400" />
              <span>SYSTEM BOUNDARIES</span>
            </span>

            <ul className="space-y-1.5 text-xs font-serif text-slate-400">
              <li className="flex items-start gap-1.5">
                <span className="text-purple-400">•</span>
                <span>Not a GitHub replacement or scraper.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-purple-400">•</span>
                <span>Zero mandatory account creation or tracking.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-purple-400">•</span>
                <span>Zero fabricated completion percentages.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-purple-400">•</span>
                <span>Explicit "Reason Unknown" on missing data.</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Teleport */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-slate-400">
              QUICK TELEPORT
            </span>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={onReplayPreloader}
                className="text-xs font-mono text-left text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw size={12} />
                <span>Replay Grim Reaper Preloader</span>
              </button>

              <button
                type="button"
                onClick={onNavigate404}
                className="text-xs font-mono text-left text-slate-400 hover:text-purple-400 flex items-center gap-1.5 transition-colors"
              >
                <Radio size={12} />
                <span>404 Quantum Void (Loki TVA 3D)</span>
              </button>

              <button
                type="button"
                onClick={onNavigate429}
                className="text-xs font-mono text-left text-slate-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors"
              >
                <Zap size={12} />
                <span>429 Temporal Overload Simulator</span>
              </button>

              <button
                type="button"
                onClick={exportVaultJson}
                className="text-xs font-mono text-left text-blue-400 hover:underline flex items-center gap-1.5 transition-colors"
              >
                <Download size={12} />
                <span>Export Local Vault (.JSON)</span>
              </button>
            </div>
          </div>

          {/* Column 4: Team Trinexis Showcase */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-slate-400">
              TEAM TRINEXIS
            </span>

            <p className="font-serif text-xs leading-relaxed text-slate-400">
              Engineering high-concurrency developer tooling and aesthetic experiences.
            </p>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-xl border text-center font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                isDark
                  ? 'bg-indigo-600 text-white border-indigo-400 hover:bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                  : 'bg-black text-white border-black hover:bg-slate-900 shadow-[3px_3px_0px_#FF5500]'
              }`}
            >
              <span>TRINEXIS SHOWCASE</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-slate-500 gap-2">
          <span>THE PROJECT GRAVEYARD // ROUND 2 LIVE FRONTEND BUILD</span>
          <span>TOP 50 FINALE PROTOTYPE • VERIFIED PRODUCTION TOOLING</span>
        </div>
      </div>
    </footer>
  );
};
