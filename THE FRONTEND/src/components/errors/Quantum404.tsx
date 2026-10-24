import React, { useRef, useEffect, useState } from 'react';
import { Radio, ArrowLeft } from 'lucide-react';

interface Quantum404Props {
  onReturnHome: () => void;
}

export const Quantum404: React.FC<Quantum404Props> = ({ onReturnHome }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle starfield background
    const stars: { x: number; y: number; r: number; alpha: number; speed: number }[] = [];
    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.3 + 0.05,
      });
    }

    let angle = 0;

    const render = () => {
      ctx.fillStyle = '#04060D';
      ctx.fillRect(0, 0, width, height);

      // Render cosmic background stars
      for (const s of stars) {
        s.y -= s.speed;
        if (s.y < 0) s.y = height;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${s.alpha * 0.8})`;
        ctx.fill();
      }

      const centerX = width / 2;
      const centerY = height / 2;
      angle += 0.02;

      // 1. Central Nexus Star Corona Waves
      const pulse = Math.sin(angle * 2) * 12;
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        15,
        centerX,
        centerY,
        90 + pulse
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(168, 85, 247, 0.9)');
      gradient.addColorStop(0.6, 'rgba(99, 102, 241, 0.35)');
      gradient.addColorStop(1, 'rgba(4, 6, 13, 0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, 90 + pulse, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Pulsing geometric containment rings (TVA Loom style)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle * 0.5);
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-45, -45, 90, 90);

      ctx.rotate(-angle);
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.4)';
      ctx.strokeRect(-55, -55, 110, 110);
      ctx.restore();

      // 2. Interactive Branching Timeline Tendrils from Cursor to Nexus Star
      const cursorX = mousePos ? mousePos.x : centerX + Math.cos(angle * 0.8) * 220;
      const cursorY = mousePos ? mousePos.y : centerY + Math.sin(angle * 0.8) * 220;

      // Draw 6 organic branching strands connecting cursor to central Nexus Star
      const strands = 6;
      for (let i = 0; i < strands; i++) {
        ctx.beginPath();
        ctx.moveTo(cursorX, cursorY);

        const strandOffset = (i - strands / 2) * 26;
        const cp1X = cursorX + (centerX - cursorX) * 0.35 + Math.sin(angle * 3 + i) * 45;
        const cp1Y = cursorY + (centerY - cursorY) * 0.35 + strandOffset + Math.cos(angle * 2 + i) * 35;
        const cp2X = cursorX + (centerX - cursorX) * 0.75 + Math.cos(angle * 2.5 + i) * 35;
        const cp2Y = cursorY + (centerY - cursorY) * 0.75 - strandOffset;

        ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, centerX, centerY);
        ctx.strokeStyle = i % 2 === 0 ? 'rgba(168, 85, 247, 0.7)' : 'rgba(56, 189, 248, 0.8)';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#8B5CF6';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Sub-branches
        if (i % 2 === 0) {
          ctx.beginPath();
          ctx.moveTo(cp1X, cp1Y);
          ctx.lineTo(cp1X + Math.sin(angle + i) * 30, cp1Y + Math.cos(angle + i) * 30);
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Cursor Nexus Node
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#38BDF8';
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mousePos]);

  return (
    <div
      className="fixed inset-0 z-50 bg-[#04060D] text-white flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none"
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      {/* Three.js / Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Top Header Bar */}
      <header className="relative z-10 flex justify-between items-center max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600/30 border border-purple-500 flex items-center justify-center text-purple-300 font-mono font-bold text-sm">
            Ψ
          </div>
          <span className="font-mono text-xs tracking-widest text-slate-400 font-bold uppercase">
            TEMPORAL VAULT // CODE VARIANT B-01
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="font-mono text-xs tracking-wider text-red-400 font-bold uppercase">
            TIMELINE ANOMALY DETECTED
          </span>
        </div>
      </header>

      {/* Central TVA Monospace Banner (Section 5.9) */}
      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-red-950/60 text-red-300 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.4)] mb-6">
          <Radio size={12} className="animate-pulse" />
          <span>LOKI TVA // ERROR 404: TIMELINE PRUNED</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-wider uppercase mb-4 text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
          THIS REPOSITORY EXISTS BEYOND TIME
        </h2>

        <p className="font-serif text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-lg">
          The requested coordinate branch was pruned from the sacred codebase chronology. Move your cursor to calibrate timeline tendrils toward the central Nexus Star.
        </p>

        <button
          type="button"
          onClick={onReturnHome}
          className="px-8 py-3.5 rounded-xl font-mono text-xs uppercase tracking-widest font-bold bg-white text-black hover:bg-slate-200 transition-all flex items-center gap-2 shadow-[0_4px_24px_rgba(255,255,255,0.35)] hover:scale-105"
        >
          <ArrowLeft size={15} />
          <span>RESET TEMPORAL FREQUENCY (RETURN HOME)</span>
        </button>
      </div>

      {/* Footer Info */}
      <footer className="relative z-10 flex justify-between items-center max-w-6xl mx-auto w-full text-xs font-mono text-slate-500">
        <span>INTERACTIVE MOUSE-DRIVEN NEXUS CANVAS</span>
        <span>THE PROJECT GRAVEYARD • ROUND 2 FINALE</span>
      </footer>
    </div>
  );
};
