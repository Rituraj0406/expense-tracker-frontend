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