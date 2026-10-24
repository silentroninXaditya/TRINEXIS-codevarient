import React, { useEffect, useRef } from 'react';

interface TitleParticleAnimationProps {
  theme: 'dark' | 'light';
  onReplayRequest?: () => void;
  className?: string;
}

export const TitleParticleAnimation: React.FC<TitleParticleAnimationProps> = ({
  theme,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const TXT = 'The Project Graveyard';
    let animId: number;
    let W = container.clientWidth || window.innerWidth;
    let H = Math.max(160, Math.min(260, window.innerHeight * 0.28));
    let D = Math.min(window.devicePixelRatio || 1, 2.5);

    let P: any[] = [];
    let B: any[][] = [[], [], [], []];
    let t0 = performance.now() / 1000;
    let last = 0;
    let mouse = { x: -9999, y: -9999 };
    let ready = false;

    const LIGHT = ['#7a0f3a', '#8c1042', '#c4102f', '#b8862b'];
    const DARK = ['#2b6bff', '#00b3ff', '#1f51ff', '#5aa9ff'];

    const rb = () => {
      B = [[], [], [], []];
      for (let i = 0; i < P.length; i++) {
        const p = P[i];
        B[isDark ? p.cd : p.cl].push(p);
      }
    };

    const build = () => {
      if (!canvas || !container) return;
      D = Math.min(window.devicePixelRatio || 1, 2.5);
      W = container.clientWidth || window.innerWidth;
      H = Math.max(160, Math.min(260, window.innerHeight * 0.28));

      canvas.width = Math.round(W * D);
      canvas.height = Math.round(H * D);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      ctx.font = '800 100px Cinzel, Georgia, serif';
      const measured = ctx.measureText(TXT).width || 800;
      const fs = Math.min(100 * (W * 0.88) / measured, H * 0.44);
      const ow = Math.ceil(W * D);
      const oh = Math.ceil(fs * D * 1.8);

      const o = document.createElement('canvas');
      o.width = ow;
      o.height = oh;
      const c = o.getContext('2d', { willReadFrequently: true });
      if (!c) return;

      c.font = `800 ${fs * D}px Cinzel, Georgia, serif`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillStyle = '#000';
      c.fillText(TXT, ow / 2, oh / 2);

      const data = c.getImageData(0, 0, ow, oh).data;
      let gap = Math.max(2, Math.round((fs * D) / 46));
      let pts: number[] = [];

      for (;;) {
        pts = [];
        for (let y = 0; y < oh; y += gap) {
          for (let x = 0; x < ow; x += gap) {
            if (data[(y * ow + x) * 4 + 3] > 128) {
              pts.push(x + (Math.random() - 0.5) * gap * 0.5, y + (Math.random() - 0.5) * gap * 0.5);
            }
          }
        }
        if (pts.length / 2 <= 6500) break;
        gap++;
      }

      const oy = (H * D) / 2 - oh / 2;
      const cx = (W * D) / 2;
      const cy = (H * D) / 2;
      const R = Math.max(W, H) * D;

      P = [];
      for (let i = 0; i < pts.length; i += 2) {
        const tx = pts[i];
        const ty = pts[i + 1] + oy;
        const a = Math.random() * 6.283;
        const r = R * (0.55 + Math.random() * 0.6);
        const sp = (2 + Math.random() * 5) * D;
        const fr = tx / (W * D);
        const cd = Math.max(0, Math.min(3, Math.floor(fr * 4 + (Math.random() - 0.5) * 1.7)));

        P.push({
          tx,
          ty,
          x: cx + Math.cos(a) * r,
          y: cy + Math.sin(a) * r,
          vx: -Math.sin(a) * sp,
          vy: Math.cos(a) * sp,
          d: Math.random() * 1.4,
          cd,
          cl: Math.floor(Math.random() * 4),
          ph: Math.random() * 6.283,
          s: gap * 0.9,
          f: 0,
        });
      }

      rb();
      t0 = performance.now() / 1000;
      ready = true;
    };

    const replay = () => {
      const cx = (W * D) / 2;
      const cy = (H * D) / 2;
      t0 = performance.now() / 1000;
      for (let i = 0; i < P.length; i++) {
        const p = P[i];
        const a = Math.atan2(p.y - cy, p.x - cx) + (Math.random() - 0.5) * 1.2;
        const sp = (6 + Math.random() * 16) * D;
        p.vx = Math.cos(a) * sp;
        p.vy = Math.sin(a) * sp;
        p.d = 0.25 + Math.random() * 1.1;
      }
    };

    const frame = (ts: number) => {
      animId = requestAnimationFrame(frame);
      if (!ready) return;

      const now = ts / 1000;
      const dt = Math.min(0.05, now - (last || now)) * 60;
      last = now;

      const t = now - t0;
      const cx = (W * D) / 2;
      const cy = (H * D) / 2;
      const mr = 95 * D;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Physics
      for (let i = 0; i < P.length; i++) {
        const p = P[i];
        const e = t - p.d;
        if (e < 0) {
          p.vx += -(p.y - cy) * 0.00007 * dt;
          p.vy += (p.x - cx) * 0.00007 * dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vx *= 0.99;
          p.vy *= 0.99;
          p.f = 0;
          continue;
        }

        const k = 0.032 * Math.min(1, e / 1.1);
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const curl = Math.min(1, dist / (260 * D)) * 0.55;

        p.vx += (dx * k - dy * k * curl) * dt;
        p.vy += (dy * k + dx * k * curl) * dt;

        const mx = p.x - mouse.x;
        const my = p.y - mouse.y;
        const md = Math.sqrt(mx * mx + my * my);
        if (md < mr && md > 0.1) {
          let fo = 1 - md / mr;
          fo *= fo * 3.2 * D;
          p.vx += (mx / md) * fo * dt;
          p.vy += (my / md) * fo * dt;
        }

        const dm = Math.pow(0.84, dt);
        p.vx *= dm;
        p.vy *= dm;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.f = Math.max(0, 1 - dist / (240 * D));
      }

      // Draw
      const cols = isDark ? DARK : LIGHT;
      ctx.globalCompositeOperation = isDark ? 'lighter' : 'source-over';

      for (let b = 0; b < 4; b++) {
        ctx.fillStyle = cols[b];
        const arr = B[b];
        for (let i = 0; i < arr.length; i++) {
          const p = arr[i];
          const wave = 0.8 + 0.2 * Math.sin((p.tx / D) * 0.018 - now * 2.4);
          const al = (0.45 + 0.55 * p.f) * wave;
          const jx = Math.sin(now * 1.3 + p.ph) * 0.5 * D * p.f;
          const jy = Math.cos(now * 1.1 + p.ph) * 0.5 * D * p.f;

          if (isDark) {
            ctx.globalAlpha = al * 0.12;
            ctx.fillRect(p.x + jx - p.s * 1.4, p.y + jy - p.s * 1.4, p.s * 3.8, p.s * 3.8);
            ctx.globalAlpha = Math.min(1, al * 1.1);
          } else {
            ctx.globalAlpha = Math.min(1, al * 1.05);
          }
          ctx.fillRect(p.x + jx, p.y + jy, p.s, p.s);
        }
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    const updateMouse = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e && e.touches[0] ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e && e.touches[0] ? e.touches[0].clientY : (e as MouseEvent).clientY;
      mouse.x = (clientX - rect.left) * D;
      mouse.y = (clientY - rect.top) * D;
    };

    const onPointerMove = (e: MouseEvent) => updateMouse(e);
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      updateMouse(e);
      replay();
    };
    const onPointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('mousedown', onPointerDown);
    canvas.addEventListener('mouseleave', onPointerLeave);
    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    canvas.addEventListener('touchmove', updateMouse as any, { passive: true });

    let rt: any;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(build, 180);
    };
    window.addEventListener('resize', onResize);

    build();
    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onPointerMove);
      canvas.removeEventListener('mousedown', onPointerDown);
      canvas.removeEventListener('mouseleave', onPointerLeave);
      canvas.removeEventListener('touchstart', onPointerDown);
      canvas.removeEventListener('touchmove', updateMouse as any);
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className={`title-particle-animation-container ${className}`}
      title="Click or tap to burst & replay particle necromancy"
    >
      <canvas ref={canvasRef} className="title-particle-canvas" />
    </div>
  );
};
