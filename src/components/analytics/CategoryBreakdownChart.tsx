import { Box, Typography, useTheme } from "@mui/material";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface CategoryPoint {
  name: string;
  value: number;
}

interface CategoryBreakdownChartProps {
  data: CategoryPoint[];
}

const DEFAULT_COLORS = ["#0ea5e9", "#a855f7", "#22c55e", "#f97316", "#ef4444"];

export default function CategoryBreakdownChart({
  data,
}: CategoryBreakdownChartProps) {
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
        Category Breakdown
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={
                  DEFAULT_COLORS[index % DEFAULT_COLORS.length] ||
                  theme.palette.primary.main
                }
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: theme.palette.background.paper,
              borderRadius: 12,
              border: `1px solid ${theme.palette.divider}`,
              color: theme.palette.text.primary, // ✅ FIX
            }}
            itemStyle={{
              color: theme.palette.text.primary, // ✅ FIX
            }}
            labelStyle={{
              color: theme.palette.text.secondary, // ✅ FIX
            }}
            formatter={(value: number | undefined, name: string | undefined) => [
              `₹${(value ?? 0).toLocaleString()}`,
              name,
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}

