import { Box, Typography, useTheme } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface TrendPoint {
  month: string;
  amount: number;
}

interface MonthlyTrendChartProps {
  data: TrendPoint[];
}

export default function MonthlyTrendChart({ data }: MonthlyTrendChartProps) {
  const theme = useTheme();
  const isEmpty = !data || data.length === 0;

  return (
    <Box
      sx={(theme) => ({
        borderRadius: 3,
        p: 3,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        height: 320,
      })}
    >
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 0.8,
          mb: 2,
        }}
      >
        Monthly Spending Trend
      </Typography>
      {isEmpty ? (
        <Box sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 1,
        }}>
          <Typography fontSize={28}>📈</Typography>
          <Typography fontWeight={600}>No Trend Data</Typography>
          <Typography variant="caption" color="text.secondary">
            Your spending trend will appear here
          </Typography>
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              stroke={theme.palette.divider}
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke={theme.palette.text.secondary}
              tickLine={false}
            />
            <YAxis
              stroke={theme.palette.text.secondary}
              tickLine={false}
              tickFormatter={(v) => `₹${v / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                background: theme.palette.background.paper,
                borderRadius: 12,
                border: `1px solid ${theme.palette.divider}`,
              }}
              formatter={(value: number | undefined) => [`₹${(value ?? 0).toLocaleString()}`, "Spending"]}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke={theme.palette.primary.main}
              strokeWidth={2.2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
}

