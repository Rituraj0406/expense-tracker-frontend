import type { Theme } from "@mui/material/styles";

const components = {
  MuiCssBaseline: {
    styleOverrides: `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-thumb { background: #1A2232; border-radius: 4px; }
    `,
  },
  MuiPaper: {
    styleOverrides: {
      root: { backgroundImage: "none", border: "1px solid #1A2232" },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: { borderRadius: 10, padding: "8px 20px" },
      containedPrimary: {
        background: "linear-gradient(135deg, #00C9A7, #845EF7)",
        "&:hover": { opacity: 0.9 },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        "& input::-webkit-calendar-picker-indicator": {
          filter: theme.palette.mode === "dark" ? "invert(1)" : "none",
        },
      }),
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        marginBottom: 2,
        "&:hover": {
          background: "rgba(0,201,167,0.07)",
          color: "#00C9A7",
          "& .MuiListItemIcon-root": { color: "#00C9A7" },
        },
        "&.Mui-selected": {
          background: "rgba(0,201,167,0.1)",
          color: "#00C9A7",
          "& .MuiListItemIcon-root": { color: "#00C9A7" },
        },
      },
    },
  },
  MuiListItemIcon: {
    styleOverrides: { root: { minWidth: 38, color: "#4B6082" } },
  },
  MuiDivider: {
    styleOverrides: { root: { borderColor: "#1A2232" } },
  },
};

export default components;