import { createContext } from 'react';
import type { PaletteMode } from '@mui/material';

interface ThemeModeContextValue {
  mode: PaletteMode;
  toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>({
  mode: "light",
  toggleMode: () => {}
});
export default ThemeModeContext;
