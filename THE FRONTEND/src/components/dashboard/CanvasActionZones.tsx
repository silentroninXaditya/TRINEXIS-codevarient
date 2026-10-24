import React, { useState } from 'react';
import { Bookmark, Zap, Layers, Skull, Sparkles } from 'lucide-react';
import type { OrphanedProject } from '../../types/project';

export type CanvasZoneType = 'vault' | 'resurrection' | 'transmutation' | 'crypt';

interface CanvasActionZonesProps {
  onDropProject: (zone: CanvasZoneType, project: OrphanedProject) => void;
  activeDraggedProject: OrphanedProject | null;
}

export const CanvasActionZones: React.FC<CanvasActionZonesProps> = ({
  onDropProject,
  activeDraggedProject,
}) => {
  const [hoveredZone, setHoveredZone] = useState<CanvasZoneType | null>(null);

  const handleDragOver = (e: React.DragEvent, zone: CanvasZoneType) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (hoveredZone !== zone) setHoveredZone(zone);
  };

  const handleDragLeave = (_e: React.DragEvent, zone: CanvasZoneType) => {
    if (hoveredZone === zone) setHoveredZone(null);
  };

  const handleDrop = (e: React.DragEvent, zone: CanvasZoneType) => {
    e.preventDefault();
    setHoveredZone(null);

    try {
      const dataStr = e.dataTransfer.getData('application/json');
      if (dataStr) {
        const project = JSON.parse(dataStr) as OrphanedProject;
        onDropProject(zone, project);
        return;
      }
    } catch (err) {
      console.warn('Drop parse fallback:', err);
    }

    if (activeDraggedProject) {
      onDropProject(zone, activeDraggedProject);
    }
  };

  return (
    <section className="canvas-protocol-shelf">
      
      {/* Banner / Instructions */}
      <div className="protocol-indicator-row">
        <div className="protocol-badge">
          <Sparkles size={12} className="protocol-sparkle" />
          <span>CANVAS PROTOCOL ACTIVE</span>
        </div>
        <span className="protocol-instruction">
          Drag any project card below into an Action Zone to execute primary commands
        </span>
      </div>

      {/* 4 Designated Action Zones */}
      <div className="canvas-zones-grid">
        
        {/* Zone 1: Vault Dock */}
        <div
          className={`action-zone-box zone-vault ${hoveredZone === 'vault' ? 'zone-active-hover' : ''}`}
          onDragOver={(e) => handleDragOver(e, 'vault')}
          onDragLeave={(e) => handleDragLeave(e, 'vault')}
          onDrop={(e) => handleDrop(e, 'vault')}
        >
          <div className="zone-icon-header">
            <div className="zone-icon-circle">
              <Bookmark size={20} />
            </div>
            <span className="zone-tag">ZONE // 01</span>
          </div>
          <h3 className="zone-title">VAULT DOCK</h3>
          <p className="zone-desc">Drop here to preserve in Personal Vault with local storage sync.</p>
          <div className="zone-target-crosshair">
            <span>[ DROP TO PRESERVE ]</span>
          </div>
        </div>

        {/* Zone 2: Resurrection Sanctuary */}
        <div
          className={`action-zone-box zone-resurrect ${hoveredZone === 'resurrection' ? 'zone-active-hover' : ''}`}
          onDragOver={(e) => handleDragOver(e, 'resurrection')}
          onDragLeave={(e) => handleDragLeave(e, 'resurrection')}
          onDrop={(e) => handleDrop(e, 'resurrection')}
        >
          <div className="zone-icon-header">
            <div className="zone-icon-circle">
              <Zap size={20} />
            </div>
            <span className="zone-tag">ZONE // 02</span>
          </div>
          <h3 className="zone-title">RESURRECTION SANCTUARY</h3>
          <p className="zone-desc">Drop here to run the Autonomous AI Engine &amp; compile live app preview.</p>
          <div className="zone-target-crosshair">
            <span>[ DROP TO RESURRECT ]</span>
          </div>
        </div>

        {/* Zone 3: Transmutation Forge */}
        <div
          className={`action-zone-box zone-transmute ${hoveredZone === 'transmutation' ? 'zone-active-hover' : ''}`}
          onDragOver={(e) => handleDragOver(e, 'transmutation')}
          onDragLeave={(e) => handleDragLeave(e, 'transmutation')}
          onDrop={(e) => handleDrop(e, 'transmutation')}
        >
          <div className="zone-icon-header">
            <div className="zone-icon-circle">
              <Layers size={20} />
            </div>
            <span className="zone-tag">ZONE // 03</span>
          </div>
          <h3 className="zone-title">TRANSMUTATION FORGE</h3>
          <p className="zone-desc">Drop here to migrate legacy frameworks (PHP/jQuery) to React 18 &amp; Vite.</p>
          <div className="zone-target-crosshair">
            <span>[ DROP TO TRANSMUTE ]</span>
          </div>
        </div>

        {/* Zone 4: The Crypt */}
        <div
          className={`action-zone-box zone-crypt ${hoveredZone === 'crypt' ? 'zone-active-hover' : ''}`}
          onDragOver={(e) => handleDragOver(e, 'crypt')}
          onDragLeave={(e) => handleDragLeave(e, 'crypt')}
          onDrop={(e) => handleDrop(e, 'crypt')}
        >
          <div className="zone-icon-header">
            <div className="zone-icon-circle">
              <Skull size={20} />
            </div>
            <span className="zone-tag">ZONE // 04</span>
          </div>
          <h3 className="zone-title">THE CRYPT</h3>
          <p className="zone-desc">Drop here to permanently bury code with a forensic eulogy &amp; post-mortem.</p>
          <div className="zone-target-crosshair">
            <span>[ DROP TO BURY ]</span>
          </div>
        </div>

      </div>

    </section>
  );
};
