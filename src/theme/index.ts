import { createTheme } from "@mui/material/styles";
import getPalette from "./palette";
import typography from "./typography";
import components from "./components";
import type { PaletteMode } from '@mui/material';

export default function createAppTheme(mode: PaletteMode, accent?: string) {
  return createTheme({
    palette: getPalette(mode, accent),
    typography,
    components,
    shape: { borderRadius: 12 },
  });
}
