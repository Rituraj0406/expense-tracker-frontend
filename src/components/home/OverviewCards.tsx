import {
    Box,
    Typography,
    Skeleton,
    useTheme,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function OverviewCards({ data, loading }: any) {
    const theme = useTheme();

    const cards = [
        {
            label: "Income",
            value: data?.totalIncome,
            icon: <TrendingUpIcon />,
            color: theme.palette.success.main,
            isCurrency: true
        },
        {
            label: "Expenses",
            value: data?.totalExpenses,
            icon: <TrendingDownIcon />,
            color: theme.palette.error.main,
            isCurrency: true
        },
        {
            label: "Savings",
            value: data?.netSavings,
            icon: <AccountBalanceWalletIcon />,
            color: theme.palette.primary.main,
            isCurrency: true
        },
        {
            label: "Transactions",
            value: data?.totalTransactions,
            icon: <ReceiptLongIcon />,
            color: theme.palette.warning.main,
            isCurrency: false
        },
    ];

    return (
        <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(4,1fr)" }}
            gap={2}
        >
            {cards.map((c, i) => (
                <Box
                    key={i}
                    sx={{
                        p: 2,
                        borderRadius: 3,
                        border: `1px solid ${theme.palette.divider}`,
                        bgcolor: theme.palette.background.paper,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,

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
                            background: `linear-gradient(135deg, ${c.color}20, transparent)`,
                            opacity: 0,
                            transition: "0.3s",
                        },
                        "&:hover::before": {
                            opacity: 1,
                        },
                    }}
                >
                    {/* 🔹 Top Row */}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: 13,
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: 0.8,
                                color: "text.secondary",
                            }}
                        >
                            {c.label}
                        </Typography>

                        <Box
                            sx={{
                                p: 1,
                                borderRadius: "50%",
                                bgcolor: `${c.color}20`,
                                color: c.color,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {c.icon}
                        </Box>
                    </Box>

                    {/* 🔹 Value */}
                    {loading ? (
                        <Skeleton width={100} height={30} />
                    ) : (
                        <Typography
                            sx={{
                                fontSize: 24,
                                fontWeight: 700,
                                color: c.color,
                            }}
                        >
                            {c.isCurrency ? "₹" : ""}
                            {c.value?.toLocaleString() || 0}
                        </Typography>
                    )}

                    {/* 🔹 Optional Subtext (future ready) */}
                    {!loading && (
                        <Typography variant="caption" color="text.secondary">
                            Compared to last month
                        </Typography>
                    )}
                </Box>
            ))}
        </Box>
    );
}