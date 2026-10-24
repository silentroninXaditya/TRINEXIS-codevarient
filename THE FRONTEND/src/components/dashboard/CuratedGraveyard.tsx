import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import {
  Search,
  Zap,
  Bookmark,
  GripHorizontal,
  Star,
  Calendar,
  SlidersHorizontal,
  X,
  Layers,
  Sparkles,
  Inbox,
  Check,
} from 'lucide-react';
import type { OrphanedProject } from '../../types/project';
import { MOCK_REPOS } from '../../data/mockRepos';
import { TagDetailModal, type TagItem } from './TagDetailModal';
import { TactileSliderButton } from '../common/TactileSliderButton';

// Specification Tags Master Registry (with detailed specifications for drag & drop & double-click popup)
export const SPECIFICATION_TAGS: TagItem[] = [
  // 1. Curated Collections / Domains
  {
    id: 'ai-agents',
    label: 'AI AGENTS',
    category: 'collection',
    categoryLabel: 'DOMAIN // AGENTS',
    description: 'Autonomous multi-agent pipelines, LLM tool execution graphs, and prompt reasoning architectures.',
    matchCount: 3,
  },
  {
    id: 'developer-tools',
    label: 'DEV TOOLS',
    category: 'collection',
    categoryLabel: 'DOMAIN // TOOLING',
    description: 'Compilers, linters, terminal shells, AST analyzers, and developer runtime diagnostics.',
    matchCount: 4,
  },
  {
    id: 'web3',
    label: 'WEB3 & PROTOCOLS',
    category: 'collection',
    categoryLabel: 'DOMAIN // CRYPTO',
    description: 'Decentralized peer-to-peer data mesh, cryptographic signature envelopes, and consensus protocols.',
    matchCount: 2,
  },
  {
    id: 'creative-tech',
    label: 'CREATIVE TECH',
    category: 'collection',
    categoryLabel: 'DOMAIN // GRAPHICS',
    description: 'WebGL 3D canvas, real-time spatial navigation, shader nodes, and interactive audio pipelines.',
    matchCount: 2,
  },
  {
    id: 'lost-gems',
    label: 'LOST GEMS',
    category: 'collection',
    categoryLabel: 'DOMAIN // ARCHIVE',
    description: 'High-starred (>1000 stars) orphaned codebases with pristine architecture and stalled maintainers.',
    matchCount: 3,
  },

  // 2. 5-Path Revival Strategy
  {
    id: 'Continue',
    label: 'CONTINUE',
    category: 'path',
    categoryLabel: 'REVIVAL // ARCHETYPE',
    description: 'Preserve existing architecture and finish the pending roadmap with targeted pull requests.',
    matchCount: 4,
  },
  {
    id: 'Restart',
    label: 'RESTART',
    category: 'path',
    categoryLabel: 'REVIVAL // ARCHETYPE',
    description: 'Scaffold a modern greenfield rewrite, replacing stalled legacy runtime dependencies.',
    matchCount: 3,
  },
  {
    id: 'Change',
    label: 'CHANGE',
    category: 'path',
    categoryLabel: 'REVIVAL // ARCHETYPE',
    description: 'Pivot the core algorithmic foundation into a new domain or product market application.',
    matchCount: 2,
  },
  {
    id: 'Repurpose',
    label: 'REPURPOSE',
    category: 'path',
    categoryLabel: 'REVIVAL // ARCHETYPE',
    description: 'Extract standalone sub-modules into independent, zero-dependency npm or crate packages.',
    matchCount: 3,
  },
  {
    id: 'Archive',
    label: 'ARCHIVE',
    category: 'path',
    categoryLabel: 'REVIVAL // ARCHETYPE',
    description: 'Conduct forensic autopsy, document technical hurdles, and freeze repository with a memorial badge.',
    matchCount: 2,
  },

  // 3. Health & Forensic Status
  {
    id: 'Stalled Prototype',
    label: 'STALLED PROTOTYPE',
    category: 'status',
    categoryLabel: 'HEALTH // POST-MORTEM',
    description: 'Initial feature set started but halted before full test coverage or production deployment.',
    matchCount: 4,
  },
  {
    id: 'Architecture Solid / UI Incomplete',
    label: 'SOLID ARCH / INCOMPLETE UI',
    category: 'status',
    categoryLabel: 'HEALTH // POST-MORTEM',
    description: 'Back-end engine and cryptographic layer operate cleanly, but frontend interface is absent.',
    matchCount: 3,
  },
  {
    id: 'Abandoned Hackathon MVP',
    label: 'ABANDONED HACKATHON MVP',
    category: 'status',
    categoryLabel: 'HEALTH // POST-MORTEM',
    description: 'Built under 48-hour pressure. High-velocity proof of concept abandoned after competition.',
    matchCount: 4,
  },

  // 4. Tech Stack Engines
  {
    id: 'typescript',
    label: 'TYPESCRIPT',
    category: 'stack',
    categoryLabel: 'STACK // ENGINE',
    description: 'Strongly typed JavaScript runtime applications and Node/Browser cross-compilation.',
    matchCount: 6,
  },
  {
    id: 'python',
    label: 'PYTHON',
    category: 'stack',
    categoryLabel: 'STACK // ENGINE',
    description: 'PyTorch models, FastAPI servers, data analysis pipelines, and neural network scripts.',
    matchCount: 4,
  },
  {
    id: 'rust',
    label: 'RUST',
    category: 'stack',
    categoryLabel: 'STACK // ENGINE',
    description: 'Memory-safe systems programming, WebAssembly micro-kernels, and high-concurrency daemons.',
    matchCount: 3,
  },
  {
    id: 'webrtc',
    label: 'WEBRTC / P2P',
    category: 'stack',
    categoryLabel: 'STACK // ENGINE',
    description: 'Peer-to-peer DataChannels, UDP packet fragmentation, and ICE/STUN/TURN network tunnels.',
    matchCount: 2,
  },
];

interface CuratedGraveyardProps {
  onSelectProject: (project: OrphanedProject) => void;
  onQuickResurrect: (project: OrphanedProject) => void;
  onSaveToVault: (project: OrphanedProject) => void;
  onDragStartProject: (project: OrphanedProject) => void;
}

export const CuratedGraveyard: React.FC<CuratedGraveyardProps> = ({
  onSelectProject,
  onQuickResurrect,
  onSaveToVault,
  onDragStartProject,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Universal Change 2: Filter is opened by a tactile slider button
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  // The Crucible Box tags (dropped into the large box)
  const [crucibleTags, setCrucibleTags] = useState<TagItem[]>([]);
  
  // Active dragging states for drop zone
  const [isDragOverCrucible, setIsDragOverCrucible] = useState(false);
  const [draggedTag, setDraggedTag] = useState<TagItem | null>(null);

  // Universal Change 5: Double-click any tag opens the Tag Specification Detail Modal
  const [selectedTagForModal, setSelectedTagForModal] = useState<TagItem | null>(null);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  // Filter Slider button drag tracking
  const [sliderDragX, setSliderDragX] = useState<number>(0);
  const [isSliderDragging, setIsSliderDragging] = useState<boolean>(false);
  const sliderStartXRef = useRef<number>(0);
  const isSliderDraggingRef = useRef<boolean>(false);
  const MAX_SLIDER_TRAVEL = 90;

  // Filter repos based on dropped Crucible tags and search query
  const filteredRepos = useMemo(() => {
    return MOCK_REPOS.filter((repo: OrphanedProject) => {
      const matchesSearch =
        searchQuery === '' ||
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.documentedGoal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.techStack.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // If Crucible is empty, show all search matches
      if (crucibleTags.length === 0) return true;

      // Check if repo satisfies the dropped crucible tags
      const collectionTags = crucibleTags.filter((t) => t.category === 'collection');
      const pathTags = crucibleTags.filter((t) => t.category === 'path');
      const statusTags = crucibleTags.filter((t) => t.category === 'status');
      const stackTags = crucibleTags.filter((t) => t.category === 'stack');

      const matchesCollection =
        collectionTags.length === 0 ||
        collectionTags.some((t) => repo.curatedCollection === t.id);

      const matchesPath =
        pathTags.length === 0 ||
        pathTags.some((t) => repo.recommendedPath === t.id);

      const matchesStatus =
        statusTags.length === 0 ||
        statusTags.some((t) => repo.state === t.id);

      const matchesStack =
        stackTags.length === 0 ||
        stackTags.some((t) =>
          repo.techStack.some((tech) => tech.toLowerCase().includes(t.id.toLowerCase()))
        );

      return matchesCollection && matchesPath && matchesStatus && matchesStack;
    });
  }, [searchQuery, crucibleTags]);

  // Handle Drag & Drop of Tags into the Crucible Box
  const handleTagDragStart = (e: React.DragEvent, tag: TagItem) => {
    e.dataTransfer.setData('application/json', JSON.stringify(tag));
    e.dataTransfer.effectAllowed = 'copyMove';
    setDraggedTag(tag);
  };

  const handleCrucibleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverCrucible(false);

    try {
      const rawData = e.dataTransfer.getData('application/json');
      if (rawData) {
        const tag: TagItem = JSON.parse(rawData);
        if (!crucibleTags.some((t) => t.id === tag.id)) {
          setCrucibleTags((prev) => [...prev, tag]);
        }
      }
    } catch {
      if (draggedTag && !crucibleTags.some((t) => t.id === draggedTag.id)) {
        setCrucibleTags((prev) => [...prev, draggedTag]);
      }
    }
    setDraggedTag(null);
  };

  const handleRemoveFromCrucible = (tagId: string) => {
    setCrucibleTags((prev) => prev.filter((t) => t.id !== tagId));
  };

  const handleClearCrucible = () => {
    setCrucibleTags([]);
  };

  // Double click tag to inspect in TagDetailModal (Universal Change 5)
  const handleTagDoubleClick = (tag: TagItem) => {
    setSelectedTagForModal(tag);
    setIsTagModalOpen(true);
  };

  // Toggle tag into/out of crucible (for quick single clicks)
  const handleToggleCrucible = (tag: TagItem) => {
    if (crucibleTags.some((t) => t.id === tag.id)) {
      handleRemoveFromCrucible(tag.id);
    } else {
      setCrucibleTags((prev) => [...prev, tag]);
    }
  };

  // Isolate tag: clear other tags and set this one solo
  const handleIsolateTag = (tag: TagItem) => {
    setCrucibleTags([tag]);
  };

  // Slider Button Pointer Handlers (Universal Change 2)
  const handleSliderPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    sliderStartXRef.current = e.clientX - sliderDragX;
    isSliderDraggingRef.current = true;
    setIsSliderDragging(true);
  };

  const handleSliderPointerMove = useCallback((e: PointerEvent) => {
    if (!isSliderDraggingRef.current) return;
    const newX = Math.max(0, Math.min(MAX_SLIDER_TRAVEL, e.clientX - sliderStartXRef.current));
    setSliderDragX(newX);
  }, []);

  const handleSliderPointerUp = useCallback(() => {
    if (!isSliderDraggingRef.current) return;
    isSliderDraggingRef.current = false;
    setIsSliderDragging(false);

    // If slid at least 45% across, pop open the filter popup!
    if (sliderDragX >= MAX_SLIDER_TRAVEL * 0.45) {
      setSliderDragX(MAX_SLIDER_TRAVEL);
      setIsFilterModalOpen(true);
      setTimeout(() => {
        setSliderDragX(0);
      }, 400);
    } else {
      // Snap back
      setSliderDragX(0);
    }
  }, [sliderDragX]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => handleSliderPointerMove(e);
    const onUp = () => handleSliderPointerUp();

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [handleSliderPointerMove, handleSliderPointerUp]);

  // Click on slider track directly opens the popup
  const handleSliderTrackClick = () => {
    if (isSliderDragging) return;
    setSliderDragX(MAX_SLIDER_TRAVEL);
    setTimeout(() => {
      setIsFilterModalOpen(true);
      setSliderDragX(0);
    }, 200);
  };

  return (
    <section className="curated-graveyard-section">
      
      {/* Section Header */}
      <div className="graveyard-section-header">
        <div>
          <span className="section-pre-title">THE ARCHIVES // 518M+ REPOSITORIES CATALOGUED</span>
          <h2 className="section-main-title">EXHUME ORPHANED CODEBASES</h2>
          <p className="section-sub-title">
            Inspect forensic autopsies, explore architectural gap analyses, or resurrect fallen codebases with AI.
          </p>
        </div>

        {/* Search Bar */}
        <div className="graveyard-search-bar-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search relics by name, goal, stack..."
            className="graveyard-search-input"
          />
        </div>
      </div>

      {/* =========================================================================
          UNIVERSAL CHANGE 2: TACTILE SLIDER BUTTON NAMED AS "FILTER"
          (All old static buttons and tag pills removed; replaced by slider button)
          ========================================================================= */}
      <div className="graveyard-slider-filter-dock">
        
        {/* The Tactile Slider Button named "FILTER" */}
        <div className="filter-slider-control-group">
          <div
            className={`filter-tactile-slider-chassis ${crucibleTags.length > 0 ? 'has-active-tags' : ''}`}
            onClick={handleSliderTrackClick}
            role="slider"
            aria-label="Slide to open Filter Crucible"
            aria-valuenow={Math.round((sliderDragX / MAX_SLIDER_TRAVEL) * 100)}
          >
            <div
              className="filter-slider-track-fill"
              style={{ width: `${Math.max(16, (sliderDragX / MAX_SLIDER_TRAVEL) * 100)}%` }}
            />

            {/* Draggable Slider Thumb */}
            <div
              className="filter-slider-thumb"
              style={{
                transform: `translateX(${sliderDragX}px)`,
                transition: isSliderDragging ? 'none' : 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              onPointerDown={handleSliderPointerDown}
              title="Slide or click to open Filter Crucible"
            >
              <SlidersHorizontal size={14} className="slider-thumb-icon" />
              <span className="slider-thumb-label">FILTER</span>
            </div>

            {/* Track Background Guidance Text */}
            <span
              className="filter-slider-guide-text"
              style={{ opacity: Math.max(0, 1 - (sliderDragX / MAX_SLIDER_TRAVEL) * 1.5) }}
            >
              SLIDE TO FILTER ❯❯
            </span>
          </div>

          <span className="filter-hint-caption">
            {crucibleTags.length > 0 ? (
              <span className="active-tag-count-glow">
                ⚡ {crucibleTags.length} SPECIFICATION{crucibleTags.length > 1 ? 'S' : ''} ACTIVE IN CRUCIBLE
              </span>
            ) : (
              'Slide to open Drag-and-Drop Crucible & Tag Vault'
            )}
          </span>
        </div>

        {/* Active Crucible Tags Quick Strip (with ✕ removal & double-click) */}
        {crucibleTags.length > 0 && (
          <div className="crucible-active-pills-row">
            <span className="crucible-summary-label">ACTIVE CRUCIBLE:</span>
            {crucibleTags.map((tag) => (
              <span
                key={tag.id}
                className="crucible-active-pill"
                onDoubleClick={() => handleTagDoubleClick(tag)}
                title="Double-click to inspect specifications | Click ✕ to remove"
              >
                <span className="pill-dot"></span>
                <span className="pill-text">{tag.label}</span>
                <button
                  type="button"
                  className="pill-remove-btn"
                  onClick={() => handleRemoveFromCrucible(tag.id)}
                  aria-label={`Remove ${tag.label} from crucible`}
                >
                  <X size={11} />
                </button>
              </span>
            ))}
            <button
              type="button"
              className="crucible-clear-all-btn"
              onClick={handleClearCrucible}
              title="Clear all active tags"
            >
              Clear
            </button>
          </div>
        )}

        {/* Results Counter */}
        <div className="filter-registry-counter">
          <span>EXHUMING {filteredRepos.length} OF {MOCK_REPOS.length} RELICS</span>
        </div>

      </div>

      {/* =========================================================================
          UNIVERSAL CHANGE 2: THE COMPLETE SOLID OPAQUE CRUCIBLE & TAG VAULT POPUP
          (100% Solid Opaque, in our theme, with Specifications & Large Drop Box)
          ========================================================================= */}
      {isFilterModalOpen && (
        <div
          className="crucible-popup-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsFilterModalOpen(false);
          }}
          onDoubleClick={(e) => {
            if (e.target === e.currentTarget) setIsFilterModalOpen(false);
          }}
          title="Click or double-click background to close"
        >
          <div
            className="crucible-popup-window"
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="crucible-popup-title"
          >
            {/* Modal Header */}
            <div className="crucible-popup-header">
              <div className="crucible-popup-title-block">
                <span className="crucible-popup-cross">✝</span>
                <div>
                  <h3 id="crucible-popup-title" className="crucible-popup-title">
                    EXHUMATION FILTER CRUCIBLE & SPECIFICATION VAULT
                  </h3>
                  <p className="crucible-popup-subtitle">
                    Drag tags into the Crucible Box to isolate dormant codebases. Double-click any tag to open its specification control modal.
                  </p>
                </div>
              </div>

              <div className="crucible-header-actions">
                {crucibleTags.length > 0 && (
                  <button
                    type="button"
                    className="crucible-header-clear-btn"
                    onClick={handleClearCrucible}
                  >
                    Clear Crucible ({crucibleTags.length})
                  </button>
                )}
                <span className="text-[10px] font-mono text-slate-400">CLICK OUTSIDE TO CLOSE</span>
              </div>
            </div>

            {/* Modal Two-Column Main Content */}
            <div className="crucible-popup-body">
              
              {/* LEFT / UPPER SECTION: ALL TAGS WITH SPECIFICATIONS */}
              <div className="crucible-tags-library-panel">
                <div className="library-panel-header">
                  <Layers size={14} />
                  <span>SPECIFICATION TAGS LIBRARY (DRAG TO CRUCIBLE // DOUBLE-CLICK TO INSPECT)</span>
                </div>

                {/* Group 1: Curated Collections / Domains */}
                <div className="tag-spec-category-group">
                  <span className="spec-group-title">DOMAIN ARCHIVES</span>
                  <div className="spec-tags-grid">
                    {SPECIFICATION_TAGS.filter((t) => t.category === 'collection').map((tag) => {
                      const isIn = crucibleTags.some((t) => t.id === tag.id);
                      return (
                        <div
                          key={tag.id}
                          draggable
                          onDragStart={(e) => handleTagDragStart(e, tag)}
                          onDoubleClick={() => handleTagDoubleClick(tag)}
                          className={`spec-tag-card ${isIn ? 'in-crucible' : ''}`}
                          title="Drag into Crucible Box (Drag & Drop Only) · Double-click to inspect specifications"
                        >
                          <GripHorizontal size={13} className="spec-tag-grip" />
                          <div className="spec-tag-text-col">
                            <span className="spec-tag-name">{tag.label}</span>
                            <span className="spec-tag-subdesc">{tag.categoryLabel}</span>
                          </div>
                          {isIn && <Check size={13} className="tag-in-check" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Group 2: 5-Path Revival Strategy */}
                <div className="tag-spec-category-group">
                  <span className="spec-group-title">5-PATH REVIVAL STRATEGY ARCHETYPES</span>
                  <div className="spec-tags-grid">
                    {SPECIFICATION_TAGS.filter((t) => t.category === 'path').map((tag) => {
                      const isIn = crucibleTags.some((t) => t.id === tag.id);
                      return (
                        <div
                          key={tag.id}
                          draggable
                          onDragStart={(e) => handleTagDragStart(e, tag)}
                          onDoubleClick={() => handleTagDoubleClick(tag)}
                          className={`spec-tag-card path-spec-card ${isIn ? 'in-crucible' : ''}`}
                          title="Drag into Crucible Box (Drag & Drop Only) · Double-click to inspect specifications"
                        >
                          <GripHorizontal size={13} className="spec-tag-grip" />
                          <div className="spec-tag-text-col">
                            <span className="spec-tag-name">{tag.label}</span>
                            <span className="spec-tag-subdesc">{tag.description.slice(0, 42)}...</span>
                          </div>
                          {isIn && <Check size={13} className="tag-in-check" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Group 3: Health / Status & Tech Stack */}
                <div className="tag-spec-category-group">
                  <span className="spec-group-title">POST-MORTEM HEALTH & ENGINE STACKS</span>
                  <div className="spec-tags-grid">
                    {SPECIFICATION_TAGS.filter((t) => t.category === 'status' || t.category === 'stack').map((tag) => {
                      const isIn = crucibleTags.some((t) => t.id === tag.id);
                      return (
                        <div
                          key={tag.id}
                          draggable
                          onDragStart={(e) => handleTagDragStart(e, tag)}
                          onDoubleClick={() => handleTagDoubleClick(tag)}
                          className={`spec-tag-card ${isIn ? 'in-crucible' : ''}`}
                          title="Drag into Crucible Box (Drag & Drop Only) · Double-click to inspect specifications"
                        >
                          <GripHorizontal size={13} className="spec-tag-grip" />
                          <div className="spec-tag-text-col">
                            <span className="spec-tag-name">{tag.label}</span>
                            <span className="spec-tag-subdesc">{tag.categoryLabel}</span>
                          </div>
                          {isIn && <Check size={13} className="tag-in-check" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* RIGHT / LOWER SECTION: THE LARGE CRUCIBLE DROP BOX (SOLID OPAQUE, OUR THEME) */}
              <div className="crucible-drop-zone-section">
                <div className="drop-zone-title-bar">
                  <Sparkles size={15} />
                  <span>ACTIVE CRUCIBLE BOX // DRAG & DROP CHAMBER</span>
                </div>

                <div
                  className={`crucible-large-drop-box ${isDragOverCrucible ? 'drag-over-active' : ''} ${crucibleTags.length > 0 ? 'has-contents' : 'is-empty'}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOverCrucible(true);
                  }}
                  onDragLeave={() => setIsDragOverCrucible(false)}
                  onDrop={handleCrucibleDrop}
                  title="Drop specification tags here to filter codebases"
                >
                  {crucibleTags.length === 0 ? (
                    <div className="crucible-empty-prompt">
                      <Inbox size={42} className="crucible-empty-icon" />
                      <h4 className="empty-prompt-title">DRAG SPECIFICATION TAGS HERE</h4>
                      <p className="empty-prompt-desc">
                        Drag any tag from the library and release it inside this Crucible Box to isolate matching codebases.
                      </p>
                      <span className="empty-prompt-hint">Drag & drop only // Tags cannot be clicked to add</span>
                    </div>
                  ) : (
                    <div className="crucible-contents-flow">
                      <div className="crucible-contents-header">
                        <span className="crucible-chamber-badge">CRUCIBLE ENGAGED</span>
                        <span className="crucible-chamber-count">
                          {crucibleTags.length} TAG{crucibleTags.length > 1 ? 'S' : ''} CONSECRATED
                        </span>
                      </div>

                      <div className="crucible-dropped-tags-grid">
                        {crucibleTags.map((tag) => (
                          <div
                            key={tag.id}
                            className="crucible-dropped-tag-card"
                            onDoubleClick={() => handleTagDoubleClick(tag)}
                            title="Double-click to inspect | Click ✕ to remove"
                          >
                            <GripHorizontal size={12} className="dropped-tag-grip" />
                            <div className="dropped-tag-info">
                              <span className="dropped-tag-title">{tag.label}</span>
                              <span className="dropped-tag-cat">{tag.categoryLabel}</span>
                            </div>
                            <button
                              type="button"
                              className="dropped-tag-remove-btn"
                              onClick={() => handleRemoveFromCrucible(tag.id)}
                              aria-label={`Remove ${tag.label} from crucible`}
                            >
                              <X size={13} />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="crucible-chamber-footer">
                        <span className="crucible-match-readout">
                          🔥 {filteredRepos.length} of {MOCK_REPOS.length} Repositories match this Crucible configuration
                        </span>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Modal Bottom Footer */}
            <div className="crucible-popup-footer">
              <span className="popup-footer-note">
                ✝ Tip: Double-click any tag badge to inspect full forensic autopsy. Click outside box to cancel.
              </span>
              <div style={{ width: 150 }}>
                <TactileSliderButton
                  label="DONE"
                  guideText="SLIDE ❯❯"
                  onComplete={() => setIsFilterModalOpen(false)}
                  colorTheme="crimson"
                />
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          UNIVERSAL CHANGE 5: DOUBLE-CLICK TAG SPECIFICATION MODAL
          ========================================================================= */}
      <TagDetailModal
        tag={selectedTagForModal}
        isOpen={isTagModalOpen}
        isInCrucible={selectedTagForModal ? crucibleTags.some((t) => t.id === selectedTagForModal.id) : false}
        onClose={() => setIsTagModalOpen(false)}
        onToggleCrucible={handleToggleCrucible}
        onIsolateTag={handleIsolateTag}
      />

      {/* =========================================================================
          REPOSITORY CARDS GRID (100% Solid Opaque Tomb Cards)
          ========================================================================= */}
      <div className="graveyard-cards-grid">
        {filteredRepos.length === 0 ? (
          <div className="graveyard-empty-state-card">
            <span className="empty-cross">✝</span>
            <h3 className="empty-title">NO DORMANT RELICS MATCH THIS CRUCIBLE</h3>
            <p className="empty-desc">
              The active specification tags in your Crucible Box did not match any exhumed codebases. Try removing tags or resetting the Crucible.
            </p>
            <button
              type="button"
              className="empty-reset-crucible-btn"
              onClick={handleClearCrucible}
            >
              Reset Crucible Filters
            </button>
          </div>
        ) : (
          filteredRepos.map((repo: OrphanedProject) => (
            <div
              key={repo.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('application/json', JSON.stringify(repo));
                onDragStartProject(repo);
              }}
              onDoubleClick={() => onSelectProject(repo)}
              className="graveyard-tomb-card"
              title="Double-click to open autopsy popup // Click outside to close"
            >
              {/* Top Bar with Status and Path Pill */}
              <div className="tomb-card-top-row">
                <div className="tomb-drag-handle" title="Exhumed Archive Record">
                  <GripHorizontal size={14} />
                  <span>EXHUMED RELIC</span>
                </div>
                <span className={`tomb-path-pill path-${repo.recommendedPath.toLowerCase()}`}>
                  {repo.recommendedPath.toUpperCase()}
                </span>
              </div>

              {/* Name & Owner */}
              <h3 className="tomb-repo-name">{repo.name}</h3>
              <span className="tomb-repo-owner">by {repo.owner}</span>

              {/* Documented Goal */}
              <p className="tomb-repo-goal">{repo.documentedGoal}</p>

              {/* Cause of Death Banner */}
              <div className="tomb-death-banner">
                <span className="death-lead">CAUSE OF DEATH:</span>
                <span className="death-reason">{repo.abandonmentReason || 'Reason Unknown (System Guardrail Triggered)'}</span>
              </div>

              {/* Tech Stack Chips */}
              <div className="tomb-tech-row">
                <span className="tomb-lang-badge" style={{ borderColor: repo.languageColor || '#3178C6' }}>
                  {repo.primaryLanguage}
                </span>
                {repo.techStack.slice(0, 3).map((tech: string, i: number) => (
                  <span key={i} className="tomb-tech-chip">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Card Footer with Forensics Meta & Quick Actions */}
              <div className="tomb-card-footer">
                <div className="tomb-meta-stat">
                  <Calendar size={12} />
                  <span>{repo.lastCommitDate}</span>
                </div>
                <div className="tomb-meta-stat">
                  <Star size={12} />
                  <span>{repo.stars} stars</span>
                </div>

                {/* Quick Actions with Tactile Slider */}
                <div className="tomb-action-buttons">
                  <button
                    type="button"
                    className="tomb-vault-save-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSaveToVault(repo);
                    }}
                    title="Bookmark to Personal Vault"
                  >
                    <Bookmark size={12} />
                  </button>
                  <div
                    className="card-mini-slider-dock"
                    onClick={(e) => e.stopPropagation()}
                    title="Slide to exhume codebase"
                  >
                    <TactileSliderButton
                      label="EXHUME"
                      guideText="SLIDE ❯❯"
                      icon={<Zap size={12} />}
                      onComplete={() => onQuickResurrect(repo)}
                      colorTheme="crimson"
                    />
                  </div>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

    </section>
  );
};
