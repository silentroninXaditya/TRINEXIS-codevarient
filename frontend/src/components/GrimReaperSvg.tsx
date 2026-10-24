import React from 'react';

interface GrimReaperProps {
  className?: string;
  size?: number;
}

export const GrimReaperSvg: React.FC<GrimReaperProps> = ({ className = '', size = 70 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`grim-reaper-figure ${className}`}
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Spectral Scythe Blade Gradient */}
        <linearGradient id="scytheBlade" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#E2E8F0" />
          <stop offset="80%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>

        {/* Hood Shadow Gradient */}
        <linearGradient id="hoodShade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="45%" stopColor="#0B132B" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>

        {/* Cloak Gradient */}
        <linearGradient id="cloakGradient" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="30%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>

        {/* Scythe Staff Wood/Iron */}
        <linearGradient id="staffGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#64748B" />
          <stop offset="50%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        {/* Spectral Blue Glow Filter */}
        <filter id="spectralGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Trailing Spectral Mist Particles */}
      <circle cx="28" cy="75" r="2.5" fill="#38BDF8" opacity="0.6" className="mist-orb mist-1" />
      <circle cx="20" cy="82" r="3.5" fill="#FFFFFF" opacity="0.4" className="mist-orb mist-2" />
      <circle cx="15" cy="70" r="2" fill="#60A5FA" opacity="0.7" className="mist-orb mist-3" />

      {/* Scythe Staff (long angled bar) */}
      <line
        x1="76"
        y1="12"
        x2="32"
        y2="92"
        stroke="url(#staffGradient)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Scythe Blade (Curved, Brutal & Razor Sharp) */}
      <path
        d="M 75 14 C 74 6, 68 0, 52 2 C 38 4, 25 12, 19 23 C 27 20, 42 16, 58 16 C 68 16, 73 17, 75 14 Z"
        fill="url(#scytheBlade)"
        filter="url(#spectralGlow)"
      />
      {/* Blade Edge Highlight line */}
      <path
        d="M 75 13 C 68 3, 50 1, 23 20"
        stroke="#FFFFFF"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.95"
      />

      {/* Tattered Back Cloak Tendrils */}
      <path
        d="M 32 60 C 25 68, 20 78, 16 88 C 22 84, 28 83, 31 77 C 34 84, 39 88, 43 83 C 44 75, 41 68, 38 60 Z"
        fill="#080E1E"
        opacity="0.9"
      />

      {/* Main Flowing Hood and Cloak Body */}
      <path
        d="M 48 30 C 44 32, 40 37, 38 45 C 35 55, 34 70, 35 84 C 38 88, 43 87, 46 82 C 49 86, 54 86, 58 80 C 62 85, 67 84, 70 78 C 68 66, 67 52, 63 42 C 60 35, 54 31, 48 30 Z"
        fill="url(#cloakGradient)"
        stroke="#1E293B"
        strokeWidth="1"
      />

      {/* Deep Hood Cowl Void */}
      <path
        d="M 44 32 C 42 35, 41 40, 43 45 C 45 49, 52 50, 56 46 C 58 42, 57 36, 54 33 C 51 31, 47 31, 44 32 Z"
        fill="url(#hoodShade)"
      />

      {/* Glowing Eerie Pinprick Eyes */}
      <circle cx="46" cy="40" r="1.3" fill="#E0F2FE" filter="url(#spectralGlow)" />
      <circle cx="52" cy="40" r="1.3" fill="#E0F2FE" filter="url(#spectralGlow)" />
      <circle cx="46" cy="40" r="0.6" fill="#FFFFFF" />
      <circle cx="52" cy="40" r="0.6" fill="#FFFFFF" />

      {/* Skeletal Left Hand gripping staff */}
      <ellipse cx="64" cy="38" rx="2.5" ry="3.5" transform="rotate(-30 64 38)" fill="#E2E8F0" />
      <path d="M 62 36 L 66 38 M 62 38 L 66 40 M 62 40 L 65 42" stroke="#475569" strokeWidth="0.8" />

      {/* Lower Cloak Folds & Creases */}
      <path
        d="M 45 52 C 47 62, 49 72, 46 80"
        stroke="#1E293B"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M 55 50 C 56 60, 58 70, 57 77"
        stroke="#1E293B"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};
