'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme } from './types';
import { defaultTheme, loadTheme, saveTheme } from './storage';

interface ThemeContextType {
  theme: Theme;
  updateTheme: (theme: Partial<Theme>) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loadedTheme = loadTheme();
    setTheme(loadedTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Apply theme as CSS variables
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--background-color', theme.backgroundColor);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--border-color', theme.borderColor);
    root.style.setProperty('--error-color', theme.errorColor);
    root.style.setProperty('--font-family', theme.fontFamily);
    root.style.setProperty('--base-font-size', theme.baseFontSize);
    root.style.setProperty('--heading-font-size', theme.headingFontSize);

    saveTheme(theme);
  }, [theme, mounted]);

  const updateTheme = (updates: Partial<Theme>) => {
    setTheme((prev) => ({ ...prev, ...updates }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
