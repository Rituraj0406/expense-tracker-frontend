import { useMemo, useState, type ReactNode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createAppTheme from './index';
import type { PaletteMode } from '@mui/material';
import ThemeModeContext from './ThemeModeContext';
import { useAccent } from './AccentContext';

interface ThemeModeProviderProps { children: ReactNode }

export default function ThemeModeProvider({ children }: ThemeModeProviderProps) {
  const {accent} = useAccent();

  const [mode, setMode] = useState<PaletteMode>(() => {
    const saved = localStorage.getItem('paletteMode') as PaletteMode | null;
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    return 'light';
  });

  const toggleMode = () => {
    setMode(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('paletteMode', next);
      return next;
    });
  };

  // const value = useMemo(() => ({ mode, toggleMode }), [mode]);
  const theme = useMemo(() => createAppTheme(mode, accent), [mode, accent]);

  return (
    <ThemeModeContext.Provider value={{mode, toggleMode}}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
