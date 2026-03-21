import { Box, Skeleton } from "@mui/material";
import AnalyticsOverviewCards from "../../components/analytics/AnalyticsOverviewCards";
import IncomeExpenseChart from "../../components/analytics/IncomeExpenseChart";
import CategoryBreakdownChart from "../../components/analytics/CategoryBreakdownChart";
import MonthlyTrendChart from "../../components/analytics/MonthlyTrendChart";
import TopTransactionsTable from "../../components/analytics/TopTransactionsTable";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect } from "react";
import { fetchAnalytics } from "../../features/analytics/analyticsSlice";
import { formatDate, getIcon } from "../../utils/helper";

// 🔹 Overview Skeleton
const OverviewSkeleton = () => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        sm: "1fr 1fr",
        md: "1fr 1fr 1fr 1fr",
      },
      gap: 2,
    }}
  >
    {[...Array(4)].map((_, i) => (
      <Skeleton key={i} variant="rounded" animation="wave" height={100} />
    ))}
  </Box>
);

// 🔹 Chart Skeleton
const ChartSkeleton = () => (
  <Skeleton variant="rounded" animation="wave" height={300} />
);

// 🔹 Table Skeleton
const TableSkeleton = () => (
  <Skeleton variant="rounded" animation="wave" height={300} />
);

// const MOCK_OVERVIEW = {
//   totalIncome: 82000,
//   totalExpenses: 61500,
//   netSavings: 20500,
//   totalTransactions: 42,
// };

// const MOCK_INCOME_EXPENSE = [
//   { month: "Jan", income: 70000, expense: 52000 },
//   { month: "Feb", income: 72000, expense: 48000 },
//   { month: "Mar", income: 68000, expense: 53000 },
//   { month: "Apr", income: 75000, expense: 60000 },
//   { month: "May", income: 80000, expense: 61000 },
//   { month: "Jun", income: 82000, expense: 61500 },
// ];

// const MOCK_CATEGORY_BREAKDOWN = [
//   { name: "Housing", value: 22000 },
//   { name: "Food", value: 12000 },
//   { name: "Transport", value: 6500 },
//   { name: "Entertainment", value: 4500 },
//   { name: "Others", value: 6500 },
// ];

// const MOCK_TREND = [
//   { month: "Jan", amount: 52000 },
//   { month: "Feb", amount: 48000 },
//   { month: "Mar", amount: 53000 },
//   { month: "Apr", amount: 60000 },
//   { month: "May", amount: 61000 },
//   { month: "Jun", amount: 61500 },
// ];

// const MOCK_TOP_TRANSACTIONS = [
//   {
//     id: "1",
//     icon: "🏠",
//     description: "Rent - June",
//     type: "expense" as const,
//     category: "Housing",
//     date: "01 Jun 2026",
//     amount: 20000,
//   },
//   {
//     id: "2",
//     icon: "🛒",
//     description: "Groceries",
//     type: "expense" as const,
//     category: "Food",
//     date: "06 Jun 2026",
//     amount: 6500,
//   },
//   {
//     id: "3",
//     icon: "🚗",
//     description: "Car EMI",
//     type: "expense" as const,
//     category: "Transport",
//     date: "10 Jun 2026",
//     amount: 9000,
//   },
//   {
//     id: "4",
//     icon: "🎬",
//     description: "Weekend outing",
//     type: "expense" as const,
//     category: "Entertainment",
//     date: "14 Jun 2026",
//     amount: 3500,
//   },
//   {
//     id: "5",
//     icon: "💊",
//     description: "Medical bills",
//     type: "expense" as const,
//     category: "Health",
//     date: "18 Jun 2026",
//     amount: 8000,
//   },
// ];

export default function Analytics() {
  const dispatch = useAppDispatch();
  const {data, loading} = useAppSelector((state) => state.analytics);

  const month = new Date().toISOString().slice(0, 7);

  useEffect(() => {
    dispatch(fetchAnalytics(month));
  }, [dispatch, month]);

  const topTransactionData = data?.topTransactions.map((item) => ({
    id: item?._id,
    icon: getIcon(item.category),
    description: item?.description,
    type: item?.type,
    category: item?.category,
    date: formatDate(item?.date),
    amount: item?.amount
  }));
  
  return (

    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {loading ? (
        <OverviewSkeleton/>
      ) : (
        <AnalyticsOverviewCards
          totalIncome={data?.overview?.totalIncome || 0}
          totalExpenses={data?.overview?.totalExpenses || 0}
          netSavings={data?.overview?.netSavings || 0}
          totalTransactions={data?.overview?.totalTransactions || 0}
        />
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
          gap: 3,
        }}
      >
        {loading ? (
          <>
            <ChartSkeleton/>
            <ChartSkeleton/>
          </>
        ) : (
          <>
            <IncomeExpenseChart data={data?.incomeExpense || []} />
            <CategoryBreakdownChart data={data?.categoryBreakdown || []} />
          </>
        )}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
          gap: 3,
        }}
      >
        {loading ? (
          <>
            <ChartSkeleton/>
            <TableSkeleton/>
          </>
        ) : (
          <>
            <MonthlyTrendChart data={data?.monthlyTrend || []} />
            <TopTransactionsTable rows={topTransactionData || []} />
          </>
        )}
      </Box>
    </Box>
  );
}

