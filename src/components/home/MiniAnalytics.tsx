import { Box, Typography, Skeleton } from "@mui/material";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    Tooltip,
} from "recharts";

type MiniAnalyticsProps = {
    data: { expense: number }[];
    loading: boolean;
};

export default function MiniAnalytics({ data, loading }: MiniAnalyticsProps) {
    const isEmpty = !data || data.length === 0;

    return (
        <Box p={3} borderRadius={3} border="1px solid" borderColor="divider">
            <Typography
                sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    color: "text.secondary",
                    mb: 2
                }}
            >
                Monthly Trend
            </Typography>

            {loading ? (
                <Skeleton variant="rectangular" height={200} />
            ) : isEmpty ? (
                <Box
                    sx={{
                        height: 200,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: 1,
                        textAlign: "center",
                    }}
                >
                    <Typography fontSize={28}>📉</Typography>

                    <Typography fontSize={14} fontWeight={600}>
                        No Data Available
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                        Add transactions to see your monthly trend
                    </Typography>
                </Box>
            ) : (
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={data}>
                        <Line
                            type="monotone"
                            dataKey="expense"
                            stroke="#ef4444"
                            strokeWidth={2}
                        />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </Box>
    );
}