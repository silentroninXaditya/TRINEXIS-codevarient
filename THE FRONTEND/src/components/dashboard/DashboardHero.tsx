import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Bot,
  Zap,
  RotateCw,
  ChevronDown,
  Check,
} from 'lucide-react';

export interface AIWorker {
  id: string;
  name: string;
  role: string;
  model: string;
  description: string;
  iconName: string;
}

export const AI_WORKERS: AIWorker[] = [
  {
    id: 'necromancer',
    name: 'Necromancer AI',
    role: 'Full-Stack Resurrector',
    model: 'Gemini 2.5 Flash',
    description: 'Auto-detects obsolete packages, repairs breaking dependencies, and compiles a live modern preview.',
    iconName: 'Zap',
  },
  {
    id: 'auditor',
    name: 'Grim Auditor',
    role: 'Forensic AST Inspector',
    model: 'Gemini 2.5 Pro',
    description: 'Dissects codebases for rate limit crashes, architecture rot, security CVEs, and missing tests.',
    iconName: 'Cpu',
  },
  {
    id: 'transmuter',
    name: 'Transmutation Engine',
    role: 'Framework Transformer',
    model: 'Claude 3.7 Sonnet',
    description: 'Migrates legacy jQuery, AngularJS, or PHP into clean TypeScript + Vite + Tailwind CSS.',
    iconName: 'Layers',
  },
  {
    id: 'scribe',
    name: 'Catacomb Scribe',
    role: 'Eulogy & Forensic Docs',
    model: 'Gemini 2.5 Flash',
    description: 'Generates post-mortem analysis, documented architectural intent, and revival playbooks.',
    iconName: 'FileCode',
  },
];

export interface ArchetypeItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  prompt: string;
  tech: string;
}

export const RESURRECTION_ARCHETYPES: ArchetypeItem[] = [
  {
    id: 'legacy-web',
    icon: 'Globe',
    title: 'Legacy Web App',
    subtitle: 'jQuery/PHP ➔ React 18 & Vite',
    prompt: 'Exhume this abandoned 2018 web application: replace jQuery spaghetti with modular React 18 TypeScript components, modernize build pipeline with Vite, and fix obsolete REST endpoints.',
    tech: 'React 18 • TypeScript • Vite',
  },
  {
    id: 'dormant-mobile',
    icon: 'Smartphone',
    title: 'Dormant Mobile',
    subtitle: 'Java/Obj-C ➔ React Native',
    prompt: 'Resurrect unmaintained mobile codebase: extract core business logic into cross-platform React Native, migrate deprecated native camera SDKs, and update push notification hooks.',
    tech: 'React Native • Expo • TypeScript',
  },
  {
    id: 'hackathon-finisher',
    icon: 'Flame',
    title: 'Hackathon Finisher',
    subtitle: 'Complete the Missing 40%',
    prompt: 'Pick up this stalled hackathon prototype with 60% completion: resolve unhandled API 429 rate limits, build missing responsive dashboard, and write automated E2E smoke tests.',
    tech: 'Next.js 15 • Tailwind CSS • Mock DB',
  },
  {
    id: 'zombie-api',
    icon: 'Cpu',
    title: 'Zombie API / Service',
    subtitle: 'Fix Broken SDKs & Endpoints',
    prompt: 'Heal broken backend service: upgrade deprecated FastAPI/Express dependencies, implement exponential backoff retry queues, and generate OpenAPI v3 documentation.',
    tech: 'Node.js • Express • PostgreSQL',
  },
  {
    id: 'open-archeology',
    icon: 'Layers',
    title: 'Open-Source Relic',
    subtitle: 'Fork & Modernize Dead Git',
    prompt: 'Fork unmaintained GitHub star with 2k+ stars: eliminate abandoned npm packages, replace Webpack with Rolldown, and deploy live interactive sandbox.',
    tech: 'TypeScript • Tailwind CSS • ESM',
  },
];

const EXAMPLE_PROMPTS = [
  'https://github.com/torvalds/micro-wasm-hypervisor: Dead hypervisor prototype stalled due to breaking WASI changes. Fix memory leaks and provide live sandbox.',
  'https://github.com/mit-student/autonomous-campus-rover: Student rover robotics telemetry dashboard abandoned after graduation. Port to modern web canvas.',
  'https://github.com/indie-hacker/fastapi-redis-jwt-shell: Stalled 10 months ago due to unhandled API rate limits. Complete authentication and add resilient queue.',
  'https://github.com/crypto-dev/offline-airgap-signer: Abandoned 2022 hackathon winner. Upgrade crypto primitives to modern WebCrypto and TypeScript.',
];

import { TitleParticleAnimation } from '../common/TitleParticleAnimation';
import { TactileSliderButton } from '../common/TactileSliderButton';

interface DashboardHeroProps {
  theme: 'dark' | 'light';
  onStartResurrection: (prompt: string, worker: AIWorker) => void;
  onSelectArchetype?: (archetype: ArchetypeItem) => void;
  onTrigger429?: () => void;
}

export const DashboardHero: React.FC<DashboardHeroProps> = ({
  theme,
  onStartResurrection,
  onTrigger429,
}) => {
  const [promptText, setPromptText] = useState('');
  const [selectedWorker, setSelectedWorker] = useState<AIWorker>(AI_WORKERS[0]);
  const [isWorkerDropdownOpen, setIsWorkerDropdownOpen] = useState(false);
  const [exampleIndex, setExampleIndex] = useState(0);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (onTrigger429) {
      onTrigger429();
      return;
    }
    const finalPrompt = promptText.trim() || EXAMPLE_PROMPTS[exampleIndex];
    onStartResurrection(finalPrompt, selectedWorker);
  };

  const handleCycleExample = () => {
    const nextIdx = (exampleIndex + 1) % EXAMPLE_PROMPTS.length;
    setExampleIndex(nextIdx);
    setPromptText(EXAMPLE_PROMPTS[nextIdx]);
    if (onTrigger429) {
      onTrigger429();
    }
  };

  return (
    <section className="dashboard-hero-section">
      
      {/* Interactive Particle Text Animation (from animation.docx) */}
      <TitleParticleAnimation theme={theme} />

      {/* Top Gothic Tag */}
      <div className="hero-status-pill">
        <Sparkles size={12} className="hero-sparkle-glyph" />
        <span>AUTONOMOUS SOFTWARE RESURRECTION CONSOLE</span>
      </div>

      {/* Main Headline */}
      <h1 className="hero-main-headline">
        WHAT LOST PROJECT WILL YOU BUILD?
      </h1>

      {/* Subtitle */}
      <p className="hero-subtext-lead">
        Turn abandoned repositories, dead hackathon builds, and dormant prototypes into revived, modern software — powered by AI Necromancy.
      </p>

      {/* Central Replit-style Necromancy Prompt Console */}
      <form onSubmit={handleSubmit} className="necromancy-prompt-card">
        
        {/* Top Input Row */}
        <div className="prompt-input-row">
          <button
            type="button"
            className="prompt-attach-btn"
            title="Import Repo URL or Upload Archive"
            onClick={handleCycleExample}
          >
            <Plus size={16} />
          </button>

          <textarea
            className="prompt-textarea"
            rows={2}
            value={promptText}
            onChange={(e) => {
              setPromptText(e.target.value);
              // Directs user to 429 page immediately when typing in the AI chatbox
              if (onTrigger429) {
                onTrigger429();
              }
            }}
            placeholder="Paste GitHub repository URL, drag a project ZIP, or describe the dead software you wish to revive..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (onTrigger429) {
                  onTrigger429();
                } else {
                  handleSubmit();
                }
              }
            }}
          />
        </div>

        {/* Bottom Control Bar inside Console */}
        <div className="prompt-bottom-controls">
          
          {/* AI Worker Selector Pill */}
          <div className="worker-selector-anchor">
            <button
              type="button"
              className="worker-selector-pill"
              onClick={() => setIsWorkerDropdownOpen(!isWorkerDropdownOpen)}
              title="Select AI Resurrection Specialist"
            >
              <Bot size={13} className="worker-icon" />
              <span className="worker-label">
                {selectedWorker.name}
              </span>
              <span className="worker-model-badge">
                {selectedWorker.model}
              </span>
              <ChevronDown size={12} className={`worker-chevron ${isWorkerDropdownOpen ? 'rotated' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isWorkerDropdownOpen && (
              <div className="worker-dropdown-menu">
                <div className="dropdown-header">SELECT SPECIALIST AI WORKER:</div>
                {AI_WORKERS.map((worker) => (
                  <button
                    key={worker.id}
                    type="button"
                    className={`worker-option-item ${selectedWorker.id === worker.id ? 'active-worker' : ''}`}
                    onClick={() => {
                      setSelectedWorker(worker);
                      setIsWorkerDropdownOpen(false);
                    }}
                  >
                    <div className="option-title-row">
                      <span className="option-name">{worker.name}</span>
                      <span className="option-model">{worker.model}</span>
                      {selectedWorker.id === worker.id && <Check size={12} className="option-check" />}
                    </div>
                    <span className="option-desc">{worker.description}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Tactile Slider Button converting button to slider */}
          <div className="prompt-submit-slider-wrap">
            <TactileSliderButton
              label="REVIVE"
              guideText="SLIDE TO RESURRECT ❯❯"
              icon={<Zap size={14} className="bolt-icon" />}
              onComplete={() => {
                if (onTrigger429) {
                  onTrigger429();
                } else {
                  handleSubmit();
                }
              }}
              colorTheme="crimson"
            />
          </div>
        </div>

      </form>

      {/* Minimal Prompt Suggestions Row (Clean, No Bulky Cards) */}
      <div className="archetypes-shelf-container">
        <div className="cycle-example-row">
          <button
            type="button"
            className="cycle-example-btn"
            onClick={handleCycleExample}
          >
            <span>Try an exhumation prompt:</span>
            <span className="example-snippet">{EXAMPLE_PROMPTS[exampleIndex].split(':')[0]}</span>
            <RotateCw size={12} className="rotate-icon" />
          </button>
        </div>
      </div>

    </section>
  );
};
