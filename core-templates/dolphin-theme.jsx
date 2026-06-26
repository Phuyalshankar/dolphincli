import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// 🐬 DolphinCSS — dolphin-theme
// Runtime theme switcher — supports light, dark, dolphin, ocean, sunset
// Usage:
//   import { useTheme } from './dolphin-theme';
//   const { theme, setTheme, toggleDark } = useTheme();
//   <button onClick={toggleDark}>Toggle Dark</button>

const ThemeContext = createContext(null);

const THEMES = ['dolphin', 'light', 'dark', 'ocean', 'sunset'];  // ✏️ Add your themes
const STORAGE_KEY = 'dolphin_theme';
const DEFAULT_THEME = 'dolphin';

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <DolphinThemeProvider>');
  return ctx;
}

export function DolphinThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
  });

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const applyTheme = useCallback((newTheme) => {
    // Remove all theme classes
    THEMES.forEach(t => document.documentElement.classList.remove(`theme-${t}`));
    document.documentElement.classList.remove('dark', 'light');

    // Apply new theme
    document.documentElement.classList.add(`theme-${newTheme}`);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.add('light');
      setIsDark(false);
    }

    // Set CSS data attribute for DolphinCSS variables
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  const setTheme = useCallback((newTheme) => {
    if (!THEMES.includes(newTheme)) return;
    setThemeState(newTheme);
  }, []);

  const toggleDark = useCallback(() => {
    setTheme(isDark ? DEFAULT_THEME : 'dark');
  }, [isDark, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleDark, isDark, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 🎨 Ready-to-use Theme Switcher UI component
export function DolphinThemeSwitcher() {
  const { theme, setTheme, toggleDark, isDark, themes } = useTheme();

  return (
    <div className="flex items-center gap-2 p-2 card rounded-full">
      <button
        onClick={toggleDark}
        className="btn icon-btn rounded-full w-8 h-8 flex items-center justify-center"
        title={isDark ? 'Switch to Light' : 'Switch to Dark'}
      >
        {isDark ? '☀️' : '🌙'}
      </button>
      <div className="flex gap-1">
        {themes.filter(t => t !== 'dark' && t !== 'light').map(t => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`w-6 h-6 rounded-full border-2 capitalize text-xs transition-all ${theme === t ? 'border-primary scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`}
            style={{ background: `var(--color-primary, #3b82f6)` }}
            title={t}
          />
        ))}
      </div>
    </div>
  );
}

export default DolphinThemeProvider;
