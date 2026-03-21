import {
  Box, Drawer, List, ListItemButton, ListItemIcon,
  ListItemText, Avatar, Typography, Divider, Tooltip,
} from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { logout } from "../../features/auth/authSlice";
import { useTheme } from "@mui/material/styles";
import navConfig from "./navConfig";

const SIDEBAR_FULL = 230;
const SIDEBAR_MINI = 68;

interface SidebarProps {
    collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const sidebarWidth = collapsed ? SIDEBAR_MINI : SIDEBAR_FULL;

  // grab authenticated user from redux; backend shape may vary
  const user = useAppSelector(state => state.auth.user);
  console.debug('sidebar auth user', user);
  // user could be the object itself or wrapped in a `user` field
  const userName = user?.name ?? (user as any)?.user?.name;  // eslint-disable-line @typescript-eslint/no-explicit-any

  console.log('print user:-', user);
  
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        transition: "width 0.28s cubic-bezier(0.4,0,0.2,1)",
        "& .MuiDrawer-paper": {
          width: sidebarWidth,
          overflowX: "hidden",
          bgcolor: "background.default",
          borderRight: "1px solid",
          borderColor: "divider",
          transition: "width 0.28s cubic-bezier(0.4,0,0.2,1)",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* ── Logo ── */}
      <Box
        sx={{
          px: 2, py: 2.5,
          display: "flex", alignItems: "center", gap: 1.5,
          borderBottom: "1px solid", borderColor: "divider",
          minHeight: 64, overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: 34, height: 34, flexShrink: 0,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}
        >
          💸
        </Box>
        {!collapsed && (
          <Typography
            sx={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800, fontSize: "1.1rem",
              letterSpacing: "-0.5px", whiteSpace: "nowrap",
            }}
          >
            Spendly
          </Typography>
        )}
      </Box>

      {/* ── User ── */}
      <Box
        sx={{
          px: 1.5, py: 2,
          display: "flex", alignItems: "center", gap: 1.5,
          borderBottom: "1px solid", borderColor: "divider",
          overflow: "hidden",
        }}
      >
        <Avatar
          sx={{
            width: 36, height: 36, flexShrink: 0,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            fontSize: 14, fontWeight: 700,
            border: "2px solid", borderColor: "divider",
          }}
        >
          {/** show first character of user name if available */}
          {userName ? userName.charAt(0).toUpperCase() : 'U'}
        </Avatar>
        {!collapsed && (
          <Box sx={{ overflow: "hidden" }}>
            <Typography variant="body2" fontWeight={700} noWrap>{userName || 'User'}</Typography>
            <Typography variant="caption" color="text.secondary" noWrap>Personal</Typography>
          </Box>
        )}
      </Box>

      {/* ── Nav items ── */}
      <List sx={{ flex: 1, px: 1, pt: 1.5 }}>
        {navConfig.map(({ id, label, path, Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Tooltip key={id} title={collapsed ? label : ""} placement="right">
              <ListItemButton
                selected={isActive}
                onClick={() => navigate(path)}
                sx={{
                  justifyContent: collapsed ? "center" : "flex-start",
                  px: collapsed ? 1 : 1.5,
                  position: "relative",
                }}
              >
                {isActive && (
                  <Box
                    sx={{
                      position: "absolute", left: 0,
                      top: "20%", bottom: "20%",
                      width: 3, bgcolor: "primary.main",
                      borderRadius: "0 3px 3px 0",
                    }}
                  />
                )}
                <ListItemIcon sx={{ minWidth: collapsed ? "auto" : 38, justifyContent: "center" }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: isActive ? 700 : 500 }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      <Divider />

      {/* ── Logout ── */}
      <List sx={{ px: 1, pb: 2, pt: 1 }}>
        <Tooltip title={collapsed ? "Logout" : ""} placement="right">
          <ListItemButton
            onClick={() => {
              dispatch(logout());
              navigate("/login", { replace: true });
            }}
            sx={{ justifyContent: collapsed ? "center" : "flex-start", px: collapsed ? 1 : 1.5 }}
          >
            <ListItemIcon sx={{ minWidth: collapsed ? "auto" : 38, justifyContent: "center" }}>
              <LogoutRoundedIcon fontSize="small" />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
            )}
          </ListItemButton>
        </Tooltip>
      </List>
    </Drawer>
  );
}