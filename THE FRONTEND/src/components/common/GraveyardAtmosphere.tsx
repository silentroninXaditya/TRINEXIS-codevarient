import React, { useEffect, useRef } from 'react';

interface GraveyardAtmosphereProps {
  theme: 'dark' | 'light';
}

export const GraveyardAtmosphere: React.FC<GraveyardAtmosphereProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let sw = window.innerWidth;
    let sh = window.innerHeight;
    let mx = -999;
    let my = -999;

    const starRGB = isDark ? '255,255,255' : '32,27,32';

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      sw = window.innerWidth;
      sh = window.innerHeight;
      canvas.width = Math.round(sw * dpr);
      canvas.height = Math.round(sh * dpr);
      canvas.style.width = `${sw}px`;
      canvas.style.height = `${sh}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles.forEach((p) => {
        if (p.x > sw) p.x = Math.random() * sw;
        if (p.y > sh) p.y = Math.random() * sh;
      });
    };

    const count = Math.round(Math.min(150, (sw * sh) / 10000));
    const particles = Array.from({ length: Math.max(70, count) }, () => ({
      x: Math.random() * sw,
      y: Math.random() * sh,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      r: 0.9 + Math.random() * 1.6,
      ph: Math.random() * 6.28,
    }));

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mx = e.touches[0].clientX;
        my = e.touches[0].clientY;
      }
    };
    const onMouseLeave = () => {
      mx = -999;
      my = -999;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseLeave);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    let t0 = performance.now();

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      if (document.hidden) return;

      const t = time - t0;
      ctx.clearRect(0, 0, sw, sh);

      for (const p of particles) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < 140) {
          p.vx += (dx / dist) * 0.05;
          p.vy += (dy / dist) * 0.05;
        }

        p.vx = p.vx * 0.99 + (Math.random() - 0.5) * 0.02;
        p.vy = p.vy * 0.99 + (Math.random() - 0.5) * 0.02;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = sw;
        if (p.x > sw) p.x = 0;
        if (p.y < 0) p.y = sh;
        if (p.y > sh) p.y = 0;
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const alpha = isDark ? 0.45 + 0.35 * Math.sin(t / 700 + a.ph) : 0.25 + 0.2 * Math.sin(t / 700 + a.ph);
        ctx.fillStyle = `rgba(${starRGB},${alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, 6.283);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            const lineAlpha = (isDark ? 0.22 : 0.12) * (1 - d / 120);
            ctx.strokeStyle = `rgba(${starRGB},${lineAlpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        const dm = Math.hypot(a.x - mx, a.y - my);
        if (dm < 180) {
          const mouseLineAlpha = (isDark ? 0.5 : 0.3) * (1 - dm / 180);
          ctx.strokeStyle = `rgba(${starRGB},${mouseLineAlpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseLeave);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isDark]);

  return (
    <div className="graveyard-atmosphere-container" aria-hidden="true">
      {/* Light Mode Architectural Grid Lines */}
      {!isDark && <div className="atmosphere-gridfx" />}

      {/* Light Mode Floating Embers */}
      {!isDark && (
        <div className="atmosphere-particles">
          {Array.from({ length: 18 }).map((_, i) => {
            const cols = ['142,22,56', '217,164,65', '199,182,217'];
            const col = cols[i % 3];
            const size = 4 + (i % 5) * 1.5;
            const left = `${(i * 5.6 + 2) % 100}%`;
            const dur = `${16 + (i % 7) * 3}s`;
            const delay = `-${(i * 1.7) % 20}s`;
            const sx = `${((i % 5) - 2) * 35}px`;

            return (
              <i
                key={i}
                style={{
                  left,
                  width: `${size}px`,
                  height: `${size}px`,
                  background: `rgba(${col}, 0.55)`,
                  boxShadow: `0 0 ${size * 2}px rgba(${col}, 0.6)`,
                  animationDuration: dur,
                  animationDelay: delay,
                  // @ts-ignore
                  '--sx': sx,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Dark Mode Drifting Aurora */}
      {isDark && (
        <div className="atmosphere-aurora">
          <i />
          <i />
          <i />
        </div>
      )}

      {/* Constellation Canvas (active in both themes with adaptive starRGB) */}
      <canvas ref={canvasRef} className="atmosphere-stars-canvas" />
    </div>
  );
};
