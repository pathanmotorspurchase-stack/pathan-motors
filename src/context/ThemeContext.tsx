import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeColor = 'amber' | 'crimson' | 'cyan' | 'emerald' | 'cobalt';

export interface ThemeOption {
  id: ThemeColor;
  name: string;
  badge: string;
  hex: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  { id: 'amber', name: 'Pathan Gold / Amber', badge: 'Signature', hex: '#f59e0b' },
  { id: 'crimson', name: 'Racing Crimson', badge: 'Motorsport', hex: '#ef4444' },
  { id: 'cyan', name: 'Cyber Cyan', badge: 'Vision', hex: '#06b6d4' },
  { id: 'emerald', name: 'Emerald GT', badge: 'Classic', hex: '#10b981' },
  { id: 'cobalt', name: 'Royal Cobalt', badge: 'M-Power', hex: '#3b82f6' },
];

interface ThemeContextType {
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'amber',
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeColor>('amber');

  useEffect(() => {
    const saved = localStorage.getItem('pathan_motors_theme') as ThemeColor;
    if (saved && THEME_OPTIONS.some((t) => t.id === saved)) {
      setThemeState(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      // Default to Pathan Motors Amber
      document.documentElement.setAttribute('data-theme', 'amber');
    }
  }, []);

  const setTheme = (newTheme: ThemeColor) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('pathan_motors_theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
