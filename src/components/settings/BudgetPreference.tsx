import { Box, Button, FormControlLabel, Slider, Switch, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import type { Preference } from "../../features/auth/authTypes";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { updateBudgetPreferences } from "../../features/auth/authSlice";
import { showSnackbar } from "../../features/snackbar/snackbarSlice";

interface BudgetPreferenceProps {
    preferences: Preference | null;
}

type formValues = {
    budget: number;
    rollover: boolean;
    threshold: number;
};
const BudgetPreference = ({ preferences }: BudgetPreferenceProps) => {
    const dispatch = useAppDispatch();
    const [form, setForm] = useState<formValues>({
        budget: 0,
        rollover: true,
        threshold: 80,
    });
    const [isDirty, setIsDirty] = useState(false);

    const initialized = useRef(false);
    // ✅ Initialize form from backend
    useEffect(() => {
        if (preferences && !initialized.current) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setForm({
                budget: preferences.defaultBudget ?? 0,
                rollover: preferences.rollover ?? true,
                threshold: preferences.warningThreshold ?? 80,
            });
            initialized.current = true;
        }
    }, [preferences]);


    // ✅ Handlers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (key: string, value: any) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
        setIsDirty(true);
    };

    const handleSave = async () => {
        try {
            await dispatch(updateBudgetPreferences({
                defaultBudget: form.budget,
                rollover: form.rollover,
                warningThreshold: form.threshold
            })).unwrap();
            dispatch(showSnackbar({message: "Preference save successfully", severity: "success"}));
            setIsDirty(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const message =
                    typeof error === "string"
                        ? error
                        : (error as { message?: string })?.message ||
                        "Something went wrong";
            dispatch(
                showSnackbar({
                    message: message || "Failed to save preferences",
                    severity: "error",
                })
      );
        }
    }
    return (
        <Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: 480 }}>
                <Box>
                    <Typography
                        sx={(theme) => ({
                            ...theme.typography.formLabel,
                            color: theme.palette.text.secondary,
                            mb: 1,
                        })}
                    >
                        Default monthly budget
                    </Typography>
                    <TextField
                        name="defaultBudget"
                        type="number"
                        variant="outlined"
                        value={form.budget}
                        placeholder="Enter default monthly budget"
                        fullWidth
                        onChange={(e) => handleChange("budget", Number(e.target.value))}
                    />
                </Box>

                <FormControlLabel
                    control={
                        <Switch
                            checked={form.rollover}
                            onChange={(e) => handleChange("rollover", e.target.checked)}
                            sx={(theme) => ({
                                "& .MuiSwitch-switchBase.Mui-checked": {
                                    color: theme.palette.primary.main,
                                },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                    backgroundColor: theme.palette.primary.main,
                                },
                            })}
                        />
                    }
                    label={
                        <Typography
                            sx={(theme) => ({
                                ...theme.typography.formLabel, // 👈 your custom style
                                color: theme.palette.text.secondary,
                            })}
                        >
                            Enable budget rollover to next month
                        </Typography>
                    }
                />

                <Box>
                    <Typography
                        sx={(theme) => ({
                            ...theme.typography.formLabel,
                            color: theme.palette.text.secondary,
                            mb: 1,
                        })}
                    >
                        Budget warning threshold
                    </Typography>
                    <Slider
                        value={form.threshold}
                        onChange={(_, value) => handleChange("threshold", value as number)}
                        defaultValue={80}
                        step={5}
                        min={50}
                        max={100}
                        valueLabelDisplay="auto"
                        marks={[
                            { value: 50, label: "50%" },
                            { value: 80, label: "80%" },
                            { value: 100, label: "100%" },
                        ]}
                    />
                </Box>
            </Box>

            <Box sx={{ mt: 1 }}>
                <Button variant="contained" disabled={!isDirty} onClick={handleSave}>Save preferences</Button>
            </Box>
        </Box>
    )
}

export default BudgetPreference;