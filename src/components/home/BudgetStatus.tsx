// import { useTheme } from "@emotion/react";
import { Box, Typography, Skeleton, LinearProgress } from "@mui/material";
import { type BudgetItem } from "../../features/categories/categoriesTypes";

type BudgetStatusProps = {
  loading: boolean;
  budgets: BudgetItem[];
};

export default function BudgetStatus({ loading, budgets }: BudgetStatusProps) {
    // const theme = useTheme();

    if (loading) {
        return (
            <Box p={3} borderRadius={3} border="1px solid" borderColor="divider">
                <Typography mb={2}>Budget Status</Typography>
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} height={30} sx={{ mb: 2 }} />
                ))}
            </Box>
        );
    }

    if (!budgets || budgets.length === 0) {
        return (
            <Box p={3} borderRadius={3} border="1px solid" borderColor="divider">
                <Typography>No budgets found</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={(theme) => ({
                p: 3,
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: theme.palette.background.paper,
                display: "flex",
                flexDirection: "column",
                gap: 2,
            })}
        >
            <Typography
                sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    color: "text.secondary",
                }}
            >
                Budget Status
            </Typography>

            {budgets.slice(0, 4).map((item) => {
                const percent = Math.min(item.percentage || 0, 100);

                const color =
                    item.status === "exceeded"
                        ? "#ef4444"
                        : item.status === "warning"
                            ? "#f59e0b"
                            : "#10b981";

                return (
                    <Box
                        key={item._id}
                        sx={{
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: "action.hover",
                            transition: "0.2s",
                            "&:hover": {
                                transform: "scale(1.02)",
                            },
                        }}
                    >
                        {/* Top Row */}
                        <Box display="flex" justifyContent="space-between" mb={0.5}>
                            <Typography fontSize={13} fontWeight={600}>
                                {item.name}
                            </Typography>

                            <Typography fontSize={12} color={color} fontWeight={600}>
                                {percent}%
                            </Typography>
                        </Box>

                        {/* Progress */}
                        <LinearProgress
                            variant="determinate"
                            value={percent}
                            sx={(theme) => ({
                                height: 6,
                                borderRadius: 5,
                                backgroundColor: theme.palette.action.disabledBackground,
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor: color,
                                },
                            })}
                        />

                        {/* Bottom Row */}
                        <Box display="flex" justifyContent="space-between" mt={0.5}>
                            <Typography variant="caption" color="text.secondary">
                                ₹{item.spent.toLocaleString()} spent
                            </Typography>

                            <Typography variant="caption" color="text.secondary">
                                of ₹{item.limit.toLocaleString()}
                            </Typography>
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
}