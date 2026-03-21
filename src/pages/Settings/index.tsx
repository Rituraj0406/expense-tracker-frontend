import {
  Box,
  Tabs,
  Tab,
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import useThemeMode from "../../theme/useThemeMode";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getPreferences, getProfile } from "../../features/auth/authSlice";
import ProfileForm from "../../components/settings/ProfileForm";
import UpdatePassword from "../../components/settings/UpdatePassword";
import BudgetPreference from "../../components/settings/BudgetPreference";
import Appearance from "../../components/settings/Appearance";
import { accentColors } from "../../utils/constants";


export default function Settings() {
  const [tab, setTab] = useState(0);
  const { mode, toggleMode } = useThemeMode();
  const dispatch = useAppDispatch();
  const { user, preferences } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getPreferences());
  }, [dispatch]);

  const handleTabChange = (_: React.SyntheticEvent, value: number) => {
    setTab(value);
  };
  

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
      <Paper sx={{ borderRadius: 3, p: 2, mb: 1 }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Profile" />
          <Tab label="Security" />
          <Tab label="Budget Preferences" />
          <Tab label="Appearance" />
        </Tabs>
      </Paper>

      {/* Profile */}
      {tab === 0 && (
        <Paper sx={{ borderRadius: 3, p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
          <Typography variant="h6">Profile</Typography>
          <Typography variant="body2" color="text.secondary">
            Basic information about your account.
          </Typography>

          {user && (
            <ProfileForm mode="edit" initialData={user} />
          )}
        </Paper>
      )}

      {/* Security */}
      {tab === 1 && (
        <Paper sx={{ borderRadius: 3, p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
          <Typography variant="h6">Security</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your password and account safety.
          </Typography>

          <UpdatePassword/>

          <Divider sx={{ my: 2 }} />

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Two-factor authentication
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              2FA coming soon. You&apos;ll be able to add an extra layer of security.
            </Typography>
            <FormControlLabel control={<Switch disabled />} label="Enable 2FA (coming soon)" />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Active sessions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              View and manage devices that are currently logged in. (placeholder)
            </Typography>
          </Box>
        </Paper>
      )}

      {/* Budget Preferences */}
      {tab === 2 && (
        <Paper sx={{ borderRadius: 3, p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
          <Typography variant="h6">Budget Preferences</Typography>
          <Typography variant="body2" color="text.secondary">
            Control how your monthly budgets behave.
          </Typography>
          <BudgetPreference preferences={preferences}/>
        </Paper>
      )}

      {/* Appearance */}
      {tab === 3 && (
        <Paper sx={{ borderRadius: 3, p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
          <Typography variant="h6">Appearance</Typography>
          <Typography variant="body2" color="text.secondary">
            Customize how Spendly looks on your device.
          </Typography>

          <Appearance mode={mode} toggleMode={toggleMode} accentColors={accentColors}/>
        </Paper>
      )}
    </Box>
  );
}

