import React, { useState, useEffect } from 'react';
import { GraveyardNavbar, type DashboardView } from '../layout/GraveyardNavbar';
import { GraveyardFooter } from '../layout/GraveyardFooter';
import { DashboardHero, type AIWorker, type ArchetypeItem, AI_WORKERS } from './DashboardHero';
import { CuratedGraveyard } from './CuratedGraveyard';
import { ResurrectionModal } from './ResurrectionModal';
import { ProjectModal } from '../graveyard/ProjectModal';
import { WhiteGlassShutter } from '../common/WhiteGlassShutter';
import { useVault } from '../../context/VaultContext';
import type { OrphanedProject } from '../../types/project';
import { CheckCircle2 } from 'lucide-react';
import { GraveyardAtmosphere } from '../common/GraveyardAtmosphere';

import { BuryProjectModal } from '../vault/BuryProjectModal';
import { Error429Page } from '../errors/Error429Page';
import { Error404Page } from '../errors/Error404Page';

interface GraveyardDashboardProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  userRole?: string | null;
  onNavigate404?: () => void;
  onNavigate429?: () => void;
  onReplayBoot?: () => void;
  onLogout?: () => void;
}

export const GraveyardDashboard: React.FC<GraveyardDashboardProps> = ({
  theme,
  onToggleTheme,
}) => {
  const { toggleSave } = useVault();
  const [currentView, setCurrentView] = useState<DashboardView>('dashboard');

  // Universal Rule 4: Dynamic responsive heights hugging actual content tightly
  const [discoveryHeight, setDiscoveryHeight] = useState<number>(560);
  const [vaultHeight, setVaultHeight] = useState<number>(480);
  const [isBuryModalOpen, setIsBuryModalOpen] = useState<boolean>(false);

  // Synchronize theme across embedded frames (discovery.html and vault.html)
  useEffect(() => {
    try {
      localStorage.setItem('graveyard_theme', theme);
      localStorage.setItem('trinexis_theme', theme);
      const frames = document.querySelectorAll<HTMLIFrameElement>('.discovery-embedded-frame, .vault-embedded-frame');
      frames.forEach((frame) => {
        frame.contentWindow?.postMessage({ type: 'SET_THEME', theme }, '*');
      });
    } catch {
      // Safe noop
    }
  }, [theme]);

  // Listen for inner frame auto-resize events
  useEffect(() => {
    const handleResizeMsg = (e: MessageEvent) => {
      if (e.data && e.data.type === 'GRAVEYARD_FRAME_RESIZE') {
        if (e.data.frame === 'discovery' && typeof e.data.height === 'number') {
          setDiscoveryHeight(Math.max(e.data.height + 8, 280));
        } else if (e.data.frame === 'vault' && typeof e.data.height === 'number') {
          setVaultHeight(Math.max(e.data.height + 8, 280));
        }
      } else if (e.data && e.data.type === 'OPEN_BURY_MODAL') {
        setIsBuryModalOpen(true);
      } else if (e.data && e.data.type === 'DISCOVERY_SEARCH_ATTEMPTED') {
        setCurrentView('error_404');
      } else if (e.data && e.data.type === 'DISCOVERY_CARD_DOUBLE_CLICK') {
        if (e.data.project) {
          setActiveProjectForModal(e.data.project);
        }
      }
    };
    window.addEventListener('message', handleResizeMsg);
    return () => window.removeEventListener('message', handleResizeMsg);
  }, []);

  const setupAutoHeight = (frame: HTMLIFrameElement, setHeight: React.Dispatch<React.SetStateAction<number>>) => {
    try {
      const doc = frame.contentDocument || frame.contentWindow?.document;
      if (!doc) return;
      doc.documentElement.style.overflow = 'hidden';
      if (doc.body) {
        doc.body.style.overflow = 'hidden';
        doc.body.style.background = 'transparent';
      }
      const measure = () => {
        const container = doc.querySelector('main') || doc.body;
        const h = container ? Math.ceil(container.scrollHeight) : (doc.body ? doc.body.scrollHeight : 0);
        if (h > 50) {
          setHeight(h + 8);
        }
      };
      measure();
      if (doc.body && typeof ResizeObserver !== 'undefined') {
        new ResizeObserver(measure).observe(doc.body);
      }
      if (doc.body && typeof MutationObserver !== 'undefined') {
        new MutationObserver(measure).observe(doc.body, { childList: true, subtree: true, attributes: true });
      }
    } catch {
      // Safe noop
    }
  };

  // User Request 1: Open Bury Modal as a centered popup right where user is, not jumping down
  const handleOpenBuryProject = () => {
    setIsBuryModalOpen(true);
  };

  // Modals & Active Session
  const [activeProjectForModal, setActiveProjectForModal] = useState<OrphanedProject | null>(null);
  const [resurrectionState, setResurrectionState] = useState<{
    isOpen: boolean;
    project: OrphanedProject | null;
    worker: AIWorker | null;
    userPrompt?: string;
  }>({
    isOpen: false,
    project: null,
    worker: null,
    userPrompt: undefined,
  });

  const [toastNotification, setToastNotification] = useState<{ title: string; desc: string } | null>(null);

  const showToast = (title: string, desc: string) => {
    setToastNotification({ title, desc });
    setTimeout(() => {
      setToastNotification(null);
    }, 3800);
  };

  // Start Resurrection from Prompt Console
  const handleStartPromptResurrection = (prompt: string, worker: AIWorker) => {
    // Synthetic or matched project
    const syntheticProject: OrphanedProject = {
      id: `prompt-${Date.now()}`,
      name: prompt.split(':')[0].split('/').pop()?.slice(0, 24) || 'resurrected-project',
      owner: 'community-exhumation',
      githubUrl: prompt.startsWith('http') ? prompt.split(' ')[0] : 'https://github.com/exhumed/artifact',
      lastCommitDate: new Date().toISOString().split('T')[0],
      commitCount: 142,
      stars: 840,
      primaryLanguage: 'TypeScript',
      languageColor: '#3178C6',
      techStack: ['TypeScript', 'Vite', 'React 18', 'Tailwind CSS'],
      state: 'Architecture Solid / UI Incomplete',
      abandonmentReason: 'Rate limit breakdown & framework deprecation.',
      documentedGoal: prompt,
      observedEvidence: ['Production-ready data parser', 'Resilient memory footprint'],
      unfinishedGaps: ['Missing React 18 UI', 'Unhandled 429 backoff'],
      recommendedPath: 'Continue',
      revivalPlaybook: {
        Restart: 'Scaffold modern Vite shell.',
        Continue: 'Implement exponential backoff retry queue.',
        Change: 'Shift to modern microservice.',
        Repurpose: 'Extract standalone npm library.',
        Archive: 'Document benchmarks.',
      },
      aiAutopsySummary: `Autonomous Necromancy compiled successfully for: ${prompt}`,
    };

    setResurrectionState({
      isOpen: true,
      project: syntheticProject,
      worker,
      userPrompt: prompt,
    });
  };

  const handleSelectArchetype = (archetype: ArchetypeItem) => {
    handleStartPromptResurrection(archetype.prompt, AI_WORKERS[0]);
  };

  return (
    <div className={`graveyard-dashboard-root theme-${theme}`}>
      {/* Living Atmospheric Canvas & Drifting Particle Shroud (From My Vault) */}
      <GraveyardAtmosphere theme={theme} />

      {/* White Glassmorphism Shutter & Interactive Side Pull Handles (Matching User Diagram) */}
      <WhiteGlassShutter
        currentView={currentView}
        onNavigateToView={(target) => setCurrentView(target)}
        theme={theme}
      />

      {/* Top Navbar: Big, Responsive, Clean (Left: Name, Center: Pages, Right: + BURY & Toggle) */}
      <GraveyardNavbar
        currentView={currentView}
        onSelectView={setCurrentView}
        theme={theme}
        onToggleTheme={onToggleTheme}
        onBuryProject={handleOpenBuryProject}
      />

      {/* Main Content Stage */}
      <main className="dashboard-content-stage">
        
        {/* VIEW 1: Dashboard (Clean Prompt Console + Curated Graves — No cards under chatbox) */}
        {currentView === 'dashboard' && (
          <div className="view-dashboard-flow">
            {/* Replit-style Necromancy Prompt Console with Particle Animation */}
            <DashboardHero
              theme={theme}
              onStartResurrection={handleStartPromptResurrection}
              onSelectArchetype={handleSelectArchetype}
              onTrigger429={() => setCurrentView('error_429')}
            />

            {/* Curated Graveyard Showcase */}
            <CuratedGraveyard
              onSelectProject={(p) => setActiveProjectForModal(p)}
              onQuickResurrect={(p) =>
                setResurrectionState({
                  isOpen: true,
                  project: p,
                  worker: AI_WORKERS[0],
                  userPrompt: `Quick Exhumation: Revive ${p.name}`,
                })
              }
              onSaveToVault={(p) => {
                toggleSave(p.id);
                showToast('⚰️ VAULT UPDATED', `Saved "${p.name}" to My Vault.`);
              }}
              onDragStartProject={() => {}}
            />
          </div>
        )}

        {/* VIEW 2: Discovery Page (Full Discovery Engine from discovery.html) */}
        {currentView === 'discovery' && (
          <div className="view-discovery-flow">
            <iframe
              src={`/discovery.html?theme=${theme}`}
              title="The Project Graveyard Discovery Archives"
              className="discovery-embedded-frame"
              scrolling="no"
              style={{ height: `${discoveryHeight}px`, overflow: 'hidden' }}
              onLoad={(e) => {
                setupAutoHeight(e.currentTarget, setDiscoveryHeight);
                e.currentTarget.contentWindow?.postMessage({ type: 'SET_THEME', theme }, '*');
              }}
            />
          </div>
        )}

        {/* VIEW 3: Personal Vault & Burial (Canonical Working My Vault App) */}
        {currentView === 'vault' && (
          <div className="view-vault-flow">
            <iframe
              src={`/vault.html?theme=${theme}`}
              title="The Project Graveyard Personal Vault & Catacombs"
              className="vault-embedded-frame"
              scrolling="no"
              style={{ height: `${vaultHeight}px`, overflow: 'hidden' }}
              onLoad={(e) => {
                setupAutoHeight(e.currentTarget, setVaultHeight);
                e.currentTarget.contentWindow?.postMessage({ type: 'SET_THEME', theme }, '*');
              }}
            />
          </div>
        )}

        {/* VIEW 4: Error 429 Page (Backend is not attached) */}
        {currentView === 'error_429' && (
          <Error429Page onReturn={() => setCurrentView('dashboard')} />
        )}

        {/* VIEW 5: Error 404 Page (AI engine is not connected) */}
        {currentView === 'error_404' && (
          <Error404Page
            onReturn={() => setCurrentView('dashboard')}
            onReturnToDiscovery={() => setCurrentView('discovery')}
          />
        )}

      </main>

      {/* Main Responsive Footer */}
      <GraveyardFooter onSelectView={setCurrentView} />

      {/* Interactive AI Worker Workspace Modal */}
      <ResurrectionModal
        isOpen={resurrectionState.isOpen}
        onClose={() => setResurrectionState((prev) => ({ ...prev, isOpen: false }))}
        project={resurrectionState.project}
        worker={resurrectionState.worker}
        userPrompt={resurrectionState.userPrompt}
        onSaveToVault={(p) => {
          toggleSave(p.id);
          showToast('⚰️ PRESERVED IN VAULT', `"${p.name}" stored in personal catacombs.`);
        }}
      />

      {/* Forensic Evidence Modal (Full Readme & Autopsy Inspector) */}
      <ProjectModal
        isOpen={Boolean(activeProjectForModal)}
        project={activeProjectForModal}
        onClose={() => setActiveProjectForModal(null)}
        onOpenByokModal={() => {}}
        onSendToCoPilot={(p) => {
          setActiveProjectForModal(null);
          setResurrectionState({
            isOpen: true,
            project: p,
            worker: AI_WORKERS[0],
            userPrompt: `Investigate and revive: ${p.name}`,
          });
        }}
      />

      {/* Universal Change 1 & User Request 1: Centered Glassmorphism Bury Project Modal */}
      <BuryProjectModal
        isOpen={isBuryModalOpen}
        onClose={() => setIsBuryModalOpen(false)}
        onSuccessToast={showToast}
      />

      {/* Toast Notification (Canvas Protocol & Vault Events) */}
      {toastNotification && (
        <div className="graveyard-system-toast">
          <CheckCircle2 size={16} className="toast-check-icon" />
          <div className="toast-text-block">
            <span className="toast-headline">{toastNotification.title}</span>
            <span className="toast-subtext">{toastNotification.desc}</span>
          </div>
        </div>
      )}

    </div>
  );
};
