import { Box, Grid } from "@mui/material";
import OverviewCards from "../../components/home/OverviewCards";
import QuickActions from "../../components/home/QuickActions";
import BudgetStatus from "../../components/home/BudgetStatus";
import MiniAnalytics from "../../components/home/MiniAnalytics";
import RecentTransactions from "../../components/home/RecentTransactions";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect } from "react";
import { fetchAnalytics } from "../../features/analytics/analyticsSlice";
import { fetchBudgetSummary } from "../../features/categories/categoriesSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.analytics);
  const {summary} = useAppSelector((state) => state.categories);

  const month = new Date().toISOString().slice(0, 7);

  useEffect(() => {
    dispatch(fetchAnalytics(month));
    dispatch(fetchBudgetSummary(month));
  }, [dispatch, month]);

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      
      {/* 🟢 Overview */}
      <OverviewCards data={data?.overview} loading={loading} />

      {/* 🟡 Middle Section */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <RecentTransactions
            data={data?.topTransactions || []}
            loading={loading}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <MiniAnalytics
            data={data?.incomeExpense || []}
            loading={loading}
          />
        </Grid>
      </Grid>

      {/* 🔵 Bottom Section */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <BudgetStatus budgets={summary?.summary || []} loading={loading} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <QuickActions />
        </Grid>
      </Grid>
    </Box>
  );
}