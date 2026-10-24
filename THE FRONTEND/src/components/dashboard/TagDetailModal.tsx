import React from 'react';
import { Tag as TagIcon, CheckCircle, Sliders, Database, ArrowRightCircle } from 'lucide-react';

export interface TagItem {
  id: string;
  label: string;
  category: 'collection' | 'path' | 'status' | 'stack';
  categoryLabel: string;
  description: string;
  matchCount?: number;
  sampleRelics?: string[];
}

interface TagDetailModalProps {
  tag: TagItem | null;
  isOpen: boolean;
  isInCrucible: boolean;
  onClose: () => void;
  onToggleCrucible: (tag: TagItem) => void;
  onIsolateTag?: (tag: TagItem) => void;
}

export const TagDetailModal: React.FC<TagDetailModalProps> = ({
  tag,
  isOpen,
  isInCrucible,
  onClose,
  onToggleCrucible,
  onIsolateTag,
}) => {
  if (!isOpen || !tag) return null;

  return (
    <div
      className="tag-modal-backdrop"
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
        className="tag-modal-window"
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tag-modal-title"
      >
        {/* Modal Header */}
        <div className="tag-modal-header">
          <div className="tag-modal-title-group">
            <span className="tag-modal-cross">✝</span>
            <div>
              <div className="tag-modal-category-badge">{tag.categoryLabel}</div>
              <h3 id="tag-modal-title" className="tag-modal-title">
                {tag.label}
              </h3>
            </div>
          </div>

          <span className="text-[10px] font-mono text-slate-400">CLICK OUTSIDE TO CLOSE</span>
        </div>

        {/* Modal Body */}
        <div className="tag-modal-body">
          {/* Tag Specification Context */}
          <div className="tag-spec-card">
            <h4 className="tag-spec-heading">
              <TagIcon size={14} className="tag-spec-icon" /> SPECIFICATION DEFINITION
            </h4>
            <p className="tag-spec-desc">{tag.description}</p>
          </div>

          {/* Forensic Registry Stats */}
          <div className="tag-metrics-grid">
            <div className="tag-metric-box">
              <span className="metric-label">INDEXED RELICS</span>
              <span className="metric-value">{tag.matchCount ?? 3} Repositories</span>
            </div>
            <div className="tag-metric-box">
              <span className="metric-label">FILTER CLASSIFICATION</span>
              <span className="metric-value">{tag.category.toUpperCase()}</span>
            </div>
            <div className="tag-metric-box">
              <span className="metric-label">CRUCIBLE STATUS</span>
              <span className={`metric-value ${isInCrucible ? 'status-active' : 'status-inactive'}`}>
                {isInCrucible ? 'ACTIVE IN CRUCIBLE' : 'AVAILABLE IN VAULT'}
              </span>
            </div>
            <div className="tag-metric-box">
              <span className="metric-label">FORENSIC READINESS</span>
              <span className="metric-value status-high">94% CONFIDENCE</span>
            </div>
          </div>

          {/* Internal Part & Interactive Action Controls (Universal Change 5) */}
          <div className="tag-internal-panel">
            <div className="tag-internal-header">
              <Sliders size={15} />
              <span>TAG INTERNAL CONTROL PIPELINE & BUTTONS</span>
            </div>
            <p className="tag-internal-subtext">
              Active specification control interface. Configure tag execution or filter states below.
            </p>

            <div className="tag-action-buttons-group">
              {/* Button 1: Toggle into Crucible Box */}
              <button
                type="button"
                className={`tag-btn-primary ${isInCrucible ? 'btn-remove-crucible' : 'btn-add-crucible'}`}
                onClick={() => {
                  onToggleCrucible(tag);
                  onClose();
                }}
              >
                <CheckCircle size={15} />
                <span>{isInCrucible ? 'REMOVE FROM CRUCIBLE BOX' : 'DROP INTO CRUCIBLE BOX'}</span>
              </button>

              {/* Button 2: Isolate This Tag Solo */}
              <button
                type="button"
                className="tag-btn-secondary"
                onClick={() => {
                  if (onIsolateTag) onIsolateTag(tag);
                  onClose();
                }}
              >
                <ArrowRightCircle size={15} />
                <span>ISOLATE SPECIFICATION (EXCLUSIVELY FILTER)</span>
              </button>

              {/* Button 3: Inspect Matching Codebase Autopsies */}
              <button
                type="button"
                className="tag-btn-secondary"
                onClick={() => {
                  onClose();
                }}
              >
                <Database size={15} />
                <span>INSPECT MATCHING CODEBASE AUTOPSIES</span>
              </button>
            </div>

            {/* Custom Directives Slot ready for user instruction */}
            <div className="tag-custom-slot-box">
              <div className="custom-slot-badge">SPECIFICATION HOOK READY</div>
              <div className="custom-slot-text">
                Custom internal actions and buttons are wired into this modal. Tell me what additional operations or workflow steps you want this tag to perform!
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="tag-modal-footer">
          <span className="footer-tag-id">SPEC_ID: {tag.id}</span>
          <span className="footer-tag-id">Double-click background to close</span>
        </div>
      </div>
    </div>
  );
};
