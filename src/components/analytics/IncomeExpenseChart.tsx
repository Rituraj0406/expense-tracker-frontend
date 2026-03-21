import { Box, Typography, useTheme } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

interface IncomeExpensePoint {
  month: string;
  income: number;
  expense: number;
}

interface IncomeExpenseChartProps {
  data: IncomeExpensePoint[];
}

export default function IncomeExpenseChart({ data }: IncomeExpenseChartProps) {
  const theme = useTheme();

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
        Income vs Expense
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap={24}>
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
            formatter={(value: number | undefined) => [`₹${(value ?? 0).toLocaleString()}`, ""]}
          />
          <Legend />
          <Bar
            dataKey="income"
            name="Income"
            fill={theme.palette.success.main}
            radius={[8, 8, 0, 0]}
          />
          <Bar
            dataKey="expense"
            name="Expense"
            fill={theme.palette.error.main}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}

