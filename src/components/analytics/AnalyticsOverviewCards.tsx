import { Box } from "@mui/material";
import InfoCard from "../budgets/InfoCard";

interface AnalyticsOverviewCardsProps {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  totalTransactions: number;
}

export default function AnalyticsOverviewCards({
  totalIncome,
  totalExpenses,
  netSavings,
  totalTransactions,
}: AnalyticsOverviewCardsProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          lg: "repeat(4, minmax(0, 1fr))",
        },
        gap: 2,
      }}
    >
      <InfoCard
        icon="💰"
        label="Total Income"
        value={totalIncome.toLocaleString()}
        sub="This month"
      />
      <InfoCard
        icon="💸"
        label="Total Expenses"
        value={totalExpenses.toLocaleString()}
        sub="This month"
      />
      <InfoCard
        icon="🏦"
        label="Net Savings"
        value={netSavings.toLocaleString()}
        color={netSavings >= 0 ? "#10b981" : "#ef4444"}
        sub={netSavings >= 0 ? "Positive cash flow" : "Overspending"}
      />
      <InfoCard
        icon="📊"
        label="Total Transactions"
        value={totalTransactions}
        sub="Entries recorded"
      />
    </Box>
  );
}

