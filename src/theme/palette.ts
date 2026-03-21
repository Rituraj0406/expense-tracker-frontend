import type { PaletteOptions, PaletteMode } from "@mui/material/styles";

// generate palette options based on light/dark mode
export default function getPalette(mode: PaletteMode, accent?: string): PaletteOptions {
  const isLight = mode === "light";
  const primaryColor = accent && accent !== "default" ? accent : isLight ? "#1976d2" : "#90caf9"
  return {
    mode,
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: isLight ? "#dc004e" : "#f48fb1",
    },
    background: {
      default: isLight ? "#f5f5f5" : "#121212",
      paper: isLight ? "#ffffff" : "#1e1e1e",
    },
    divider: isLight ? "#e0e0e0" : "#333",
    text: {
      primary: isLight ? "#000000" : "#ffffff",
      secondary: isLight ? "#666666" : "#bbbbbb",
    },
  };
}
