
import { Box, Typography, Paper, useTheme } from "@mui/material";

interface InfoCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    color?: string;
    sub?: string;
}

const InfoCards = ({icon, label, value, color, sub}: InfoCardProps) => {
    const theme = useTheme();
    const accent = color || theme.palette.primary.main;

    return (
        <Paper
            sx={{
                borderRadius: 3,
                p: 2.5,
                display: "flex",
                alignItems: "center",
                gap: 2,
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: theme.palette.background.paper,

                // ✨ Animation
                transition: "all 0.25s ease",
                position: "relative",
                overflow: "hidden",

                "&:hover": {
                    transform: "translateY(-6px) scale(1.02)",
                    boxShadow: `0 10px 30px ${theme.palette.primary.main}20`,
                },
                // ✨ Gradient Glow
                "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    // background: `linear-gradient(135deg, ${c.color}20, transparent)`,
                    opacity: 0,
                    transition: "0.3s",
                },
                "&:hover::before": {
                    opacity: 1,
                },
            }}
        >
            <Box
                sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 2,
                    bgcolor: `${accent}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    flexShrink: 0,
                }}
            >
                {icon || "💰"}
            </Box>

            <Box>
                <Typography
                    sx={(theme) => ({
                        ...theme.typography.formLabel,
                        color: theme.palette.text.secondary,
                    })}
                >
                    {label || "N/A"}
                </Typography>

                <Typography
                    sx={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: accent,
                        mt: 0.5,
                    }}
                >
                    {value || "--"}
                </Typography>

                {sub && (
                    <Typography
                        sx={{
                            fontSize: 11,
                            color: "text.secondary",
                            mt: 0.5,
                        }}
                    >
                        {sub || "N/A"}
                    </Typography>
                )}
            </Box>
        </Paper>
    )
}

export default InfoCards;