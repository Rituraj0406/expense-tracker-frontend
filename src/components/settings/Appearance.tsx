import { Box, FormControlLabel, Radio, RadioGroup, Switch, Typography } from "@mui/material";
import type { AccentColor } from "../../utils/constants";
import { useAccent } from "../../theme/AccentContext";
// import { useState } from "react";

interface AppearanceProps {
  mode: "light" | "dark";
  toggleMode: () => void;
  accentColors: AccentColor[];
}
const Appearance = ({mode, toggleMode, accentColors}: AppearanceProps) => {
    const {accent, setAccent} = useAccent();

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: 480 }}>
            <Box>
                <Typography
                    sx={(theme) => ({
                        ...theme.typography.formLabel,
                        color: theme.palette.text.secondary,
                        mb: 1,
                    })}
                >
                    Theme mode
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            color="primary"
                            checked={mode === "dark"}
                            onChange={toggleMode}
                        />
                    }
                    label={mode === "dark" ? "Dark mode" : "Light mode"}
                />
            </Box>

            <Box>
                <Typography
                    sx={(theme) => ({
                        ...theme.typography.formLabel,
                        color: theme.palette.text.secondary,
                        mb: 1,
                    })}
                >
                    Accent color
                </Typography>
                <RadioGroup row defaultValue="default" value={accent} onChange={(e) => setAccent(e.target.value)}>
                    {accentColors.map((c) => (
                        <FormControlLabel
                            key={c.value}
                            value={c.value}
                            control={<Radio />}
                            label={c.label}
                        />
                    ))}
                </RadioGroup>
            </Box>

            {/* <Box>
                <Typography
                    sx={(theme) => ({
                        ...theme.typography.formLabel,
                        color: theme.palette.text.secondary,
                        mb: 1,
                    })}
                >
                    Density
                </Typography>
                <RadioGroup row defaultValue="comfortable">
                    <FormControlLabel value="comfortable" control={<Radio />} label="Comfortable" />
                    <FormControlLabel value="compact" control={<Radio />} label="Compact" />
                </RadioGroup>
            </Box> */}
        </Box>
    )
}

export default Appearance;