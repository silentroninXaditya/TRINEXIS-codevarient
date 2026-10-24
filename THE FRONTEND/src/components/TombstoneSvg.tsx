import React from 'react';

interface TombstoneProps {
  className?: string;
  size?: number;
  isReached?: boolean;
}

export const TombstoneSvg: React.FC<TombstoneProps> = ({
  className = '',
  size = 64,
  isReached = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`tombstone-figure ${isReached ? 'tombstone-active' : ''} ${className}`}
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* White Marble / Stone Gradient */}
        <linearGradient id="whiteMarble" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#F8FAFC" />
          <stop offset="75%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>

        {/* Stone Shadow / Crevice Gradient */}
        <linearGradient id="tombShadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        {/* Ethereal Glow Filter */}
        <filter id="tombGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation={isReached ? "5" : "2"} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ground Mound / Earth Soil Base */}
      <ellipse cx="50" cy="112" rx="42" ry="7" fill="#091124" />
      <path
        d="M 12 112 Q 50 105 88 112 Q 50 116 12 112 Z"
        fill="#0F172A"
        stroke="#1E293B"
        strokeWidth="1"
      />

      {/* Stone Pedestal / Plinth */}
      <rect
        x="20"
        y="98"
        width="60"
        height="12"
        rx="2"
        fill="url(#whiteMarble)"
        stroke="#94A3B8"
        strokeWidth="1.2"
        filter="url(#tombGlow)"
      />

      {/* Main Gothic Headstone Body (Arched top) */}
      <path
        d="M 28 98 L 28 42 C 28 20, 40 10, 50 10 C 60 10, 72 20, 72 42 L 72 98 Z"
        fill="url(#whiteMarble)"
        stroke="#94A3B8"
        strokeWidth="1.5"
        filter="url(#tombGlow)"
      />

      {/* Beveled Edge Highlight */}
      <path
        d="M 32 96 L 32 44 C 32 25, 42 16, 50 16 C 58 16, 68 25, 68 44 L 68 96"
        stroke="#FFFFFF"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Carved Latin Cross on Headstone */}
      <g className="tomb-cross" stroke="url(#tombShadow)" strokeWidth="3" strokeLinecap="square">
        {/* Vertical Cross Stem */}
        <line x1="50" y1="30" x2="50" y2="72" />
        {/* Horizontal Cross Arm */}
        <line x1="38" y1="42" x2="62" y2="42" />
      </g>
      {/* Sharp Inner Cross Accent */}
      <g stroke="#FFFFFF" strokeWidth="1" strokeLinecap="square" opacity="0.9">
        <line x1="49.5" y1="31" x2="49.5" y2="71" />
        <line x1="39" y1="41.5" x2="61" y2="41.5" />
      </g>

      {/* Weathered Stone Cracks */}
      <path
        d="M 68 55 L 62 60 L 64 68"
        stroke="#94A3B8"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M 33 75 L 38 78 L 36 84"
        stroke="#94A3B8"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* R.I.P. Inscription */}
      <text
        x="50"
        y="86"
        textAnchor="middle"
        fontFamily="'Cinzel', serif"
        fontSize="7.5"
        fontWeight="700"
        fill="#334155"
        letterSpacing="2"
      >
        R • I • P
      </text>
    </svg>
  );
};
