import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleSwitchProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
  className?: string;
}

export const ThemeToggleSwitch: React.FC<ThemeToggleSwitchProps> = ({
  theme,
  onToggle,
  className = '',
}) => {
  const isDark = theme === 'dark';

  return (
    <div className={`physical-toggle-chassis ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={`Switch to ${isDark ? 'white mode' : 'dark mode'}`}
        title={`Switch to ${isDark ? 'White Mode (Crimson Parchment)' : 'Dark Mode (Obsidian Void)'}`}
        onClick={onToggle}
        className={`physical-theme-switch ${isDark ? 'switch-dark' : 'switch-light'}`}
      >
        <span className="switch-slot-track">
          {/* Embedded track icons */}
          <span className="track-glyph track-sun" aria-hidden="true">
            <Sun size={11} strokeWidth={2.5} />
          </span>
          <span className="track-glyph track-moon" aria-hidden="true">
            <Moon size={11} strokeWidth={2.5} />
          </span>

          {/* Physical Sliding Mechanical Thumb */}
          <span className="switch-sliding-thumb">
            {isDark ? (
              <Moon size={10} className="thumb-symbol thumb-moon" strokeWidth={2.6} />
            ) : (
              <Sun size={10} className="thumb-symbol thumb-sun" strokeWidth={2.6} />
            )}
          </span>
        </span>
      </button>
    </div>
  );
};
