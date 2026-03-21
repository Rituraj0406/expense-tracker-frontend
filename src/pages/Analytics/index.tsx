import { Box, Skeleton, useMediaQuery, useTheme } from "@mui/material";
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
        md: "repeat(4, 1fr)",
      },
      gap: { xs: 2, md: 3 },
    }}
  >
    {[...Array(4)].map((_, i) => (
      <Skeleton key={i} variant="rounded" animation="wave" height={100} />
    ))}
  </Box>
);


// 🔹 Chart Skeleton
const ChartSkeleton = ({ height }: { height: number }) => (
  <Skeleton variant="rounded" animation="wave" height={height} />
);

// 🔹 Table Skeleton
const TableSkeleton = ({ height }: { height: number }) => (
  <Skeleton variant="rounded" animation="wave" height={height} />
);

export default function Analytics() {
  const dispatch = useAppDispatch();
  const {data, loading} = useAppSelector((state) => state.analytics);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const month = new Date().toISOString().slice(0, 7);

  useEffect(() => {
    dispatch(fetchAnalytics(month));
  }, [dispatch, month]);

  const chartHeight = isMobile ? 220 : isTablet ? 260 : 300;

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
        gap: { xs: 2, md: 3 },
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
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr",
            md: "2fr 1fr",
            lg: "7fr 5fr",
          },
          gap: { xs: 2, md: 3 },
        }}
      >
        {loading ? (
          <>
            <ChartSkeleton height={chartHeight}/>
            <ChartSkeleton height={chartHeight}/>
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
          gridTemplateColumns: "1fr", // 🔥 always vertical
          gap: { xs: 2, md: 3 },
        }}
      >
        {loading ? (
          <>
            <ChartSkeleton height={chartHeight}/>
            <TableSkeleton height={chartHeight}/>
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

