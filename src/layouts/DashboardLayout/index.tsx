import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import navConfig from "./navConfig";
import { useTheme, useMediaQuery } from "@mui/material";

export default function DashboardLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [collapsed, setCollapsed] = useState(isMobile);
  
  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);
  
  const location = useLocation();
  const currentPage = navConfig.find(n => n.path === location.pathname);

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "background.default", overflow: "hidden" }}>

      <Sidebar collapsed={collapsed} />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar onToggleSidebar={() => setCollapsed(c => !c)} />

        <Box component="main" sx={{ flex: 1, overflowY: "auto", p: {xs: 2, sm: 3, md: 3.5}, width: '100%', maxWidth: 1200, mx: 'auto' }}>
          {/* Page heading */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.5px" }}
            >
              {currentPage?.label}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </Typography>
          </Box>

          {/* Page content rendered here by React Router */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}