import {
  AppBar, 
  Toolbar, 
  IconButton, 
  Box,
  Typography, 
  // InputBase, 
  Avatar, 
  // Badge
} from "@mui/material";
import { 
  // alpha, 
  useTheme 
} from "@mui/material/styles";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import useThemeMode from '../../theme/useThemeMode';
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
// import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
// import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useLocation } from "react-router-dom";
import navConfig from "./navConfig";
import { useAppSelector } from "../../hooks/reduxHooks";

interface TopBarProps {
  onToggleSidebar: () => void;
}

export default function TopBar({ onToggleSidebar }: TopBarProps) {
  const location = useLocation();
  const currentPage = navConfig.find(n => n.path === location.pathname);

  const user = useAppSelector(state => state.auth.user);

  const userName = user?.name ?? (user as { user?: { name?: string } })?.user?.name

  const theme = useTheme();
  const { mode, toggleMode } = useThemeMode();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.default,
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: 1,
      }}
    >
      <Toolbar sx={{ gap: 2, minHeight: "64px !important" }}>

        {/* Hamburger */}
        <IconButton size="small" onClick={onToggleSidebar} sx={{ color: theme.palette.text.secondary }}>
          <MenuRoundedIcon />
        </IconButton>

        {/* Breadcrumb */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography
            variant="body2"
            color={mode === 'light' ? theme.palette.text.primary : theme.palette.text.secondary}
          >
            Spendly
          </Typography>
          <ChevronRightRoundedIcon
            sx={{ fontSize: 16, color: theme.palette.text.primary }}
          />
          <Typography
            variant="body2"
            fontWeight={700}
            color={theme.palette.text.primary}
          >
            {currentPage?.label}
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Theme toggle */}
        <IconButton
          size="small"
          onClick={() => toggleMode()}
          sx={{ color: theme.palette.text.secondary }}
        >
          {mode === 'light' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
        </IconButton>

        {/* Search */}
        {/* <Box
          sx={{
            display: "flex", alignItems: "center", gap: 1,
            bgcolor: theme.palette.background.paper,
            border: "1px solid", borderColor: theme.palette.divider,
            borderRadius: 2, px: 1.5, py: 0.8, width: 200,
          }}
        >
          <SearchRoundedIcon sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
          <InputBase
            placeholder="Search..."
            sx={{ fontSize: 13, "& input": { p: 0, color: "text.primary" } }}
          />
        </Box> */}

        {/* Notifications */}
        {/* <IconButton
          size="small"
          sx={{
            bgcolor: theme.palette.background.paper,
            border: "1px solid", borderColor: theme.palette.divider,
            borderRadius: 2, p: 1, color: theme.palette.text.secondary,
            "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.08) },
          }}
        >
          <Badge
            variant="dot"
            sx={{
              "& .MuiBadge-dot": {
                bgcolor: theme.palette.primary.main,
                border: "1.5px solid",
                borderColor: theme.palette.background.default,
              },
            }}
          >
            <NotificationsRoundedIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
          </Badge>
        </IconButton> */}

        {/* Avatar */}
        <Avatar
          sx={{
            width: 34,
            height: 34,
            background: theme.palette.primary.main,
            fontSize: 13,
            fontWeight: 700,
            border: "2px solid",
            borderColor: theme.palette.divider,
            cursor: "pointer",
          }}
        >
          {userName ? userName.charAt(0).toUpperCase() : 'U'}
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}