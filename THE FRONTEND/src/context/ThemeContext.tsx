import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const STORAGE_KEYS = ['gw-theme', 'trinexis_theme', 'graveyard_theme'];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    for (const key of STORAGE_KEYS) {
      try {
        const saved = localStorage.getItem(key);
        if (saved === 'light' || saved === 'dark') {
          return saved;
        }
      } catch (e) {}
    }
    return 'dark';
  });

  useEffect(() => {
    STORAGE_KEYS.forEach((key) => {
      try {
        localStorage.setItem(key, theme);
      } catch (e) {}
    });

    const root = document.documentElement;
    root.dataset.theme = theme;
    root.setAttribute('data-theme', theme);

    if (theme === 'dark') {
      root.classList.add('dark', 'theme-dark');
      root.classList.remove('light', 'theme-light');
    } else {
      root.classList.add('light', 'theme-light');
      root.classList.remove('dark', 'theme-dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === 'dark',
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
};
