import { Box, Button, TextField, Typography } from "@mui/material";
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import InfoCards from "../../components/budgets/InfoCard";
import BudgetCard from "../../components/budgets/BudgetCard";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect, useState } from "react";
import { deleteCategory, fetchBudgetSummary, syncBudget } from "../../features/categories/categoriesSlice";
import CustomLinearProgress from "../../components/common/CustomLinearProgress";
import { showSnackbar } from "../../features/snackbar/snackbarSlice";
import { fmt } from "../../utils/helper";
import CustomDialog from "../../components/common/CustomDialog";
import BudgetForm from "../../components/budgets/BudgetForm";
import type { BudgetItem } from "../../features/categories/categoriesTypes";

export default function Budgets() {
  const dispatch = useAppDispatch();
  const { summary } = useAppSelector((state) => state.categories);

  const totalLimit = summary?.totals?.totalLimit ?? 0;
  const totalSpent = summary?.totals?.totalSpent ?? 0;
  const totalSaved = summary?.totals?.totalSaved ?? 0;
  // const alerts = summary?.alerts ?? 0;
  const overBudgetCount = summary?.alerts?.overBudgetCount ?? 0;
  const overBudgetItems = summary?.alerts?.overBudgetItems ?? [];
  const warningCount = summary?.alerts?.warningCount ?? 0;

  const overAllSpentPercentage = totalLimit > 0
    ? Math.round((totalSpent / totalLimit) * 100)
    : 0;
  const progressColor =
    overAllSpentPercentage >= 100
      ? "#ef4444"
      : overAllSpentPercentage >= 80
      ? "#f59e0b"
      : "#10b981";

  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [syncing, setSyncing] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create")
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<BudgetItem | null>(null);
  const [confirmDialog, setConfirmDialog] = useState(false);


  useEffect(() => {
    dispatch(fetchBudgetSummary(month))
  }, [dispatch, month]);

  const handleSyncBudget = async () => {
    try {
      setSyncing(true);
      const response = await dispatch(syncBudget(month)).unwrap();
      dispatch(fetchBudgetSummary(month));
      dispatch(showSnackbar({message: response.message, severity: "success"}));
    } catch (error) {
      dispatch(showSnackbar({message: "Sync failed", severity: "error"}));
      console.error("Sync failed:", error);
    } finally {
      setSyncing(false);
    }
  }

  const handleAddBudgetModal = () => {
    setDialogMode('create');
    setSelectedBudget(null);
    setOpenDialog(true);
  }

  const handleEditBudget = (id: string) => {
    const budget = summary?.summary?.find(b => b._id === id);
    if(!budget) return;
    setDialogMode('edit');
    setSelectedBudget(budget);
    setOpenDialog(true);
  }

  const handleDeleteBudget = (id: string) => {
    const budget = summary?.summary.find(b => b._id === id);
    if(!budget) return;
    setSelectedBudget(budget);
    setConfirmDialog(true)
  }

  const handleDelete = async () => {
    if(!selectedBudget) return;

    try{
      await dispatch(deleteCategory(selectedBudget?._id)).unwrap();
      dispatch(showSnackbar({message: "Budget deleted successfully", severity: "success"}));

      setConfirmDialog(false);
      setSelectedBudget(null);
    } catch (err) {
      const error = err instanceof Error ? err.message : "Failed to delete budget";
      dispatch(showSnackbar({message: error, severity: "error"}));
    } 
  }

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
        <Box>
          <Typography  
            sx={(theme) =>({
              ...theme.typography.body2,
              color: theme.palette.text.secondary,
            })}
          >
            Track spending limits vs actual expenses
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, justifyContent: "flex-end" }}>
          <TextField
            placeholder="Select date"
            name="month"
            type="month"
            value={month}
            onChange={(e) => {
              const value = e.target.value.slice(0, 7);
              setMonth(value);
            }}
            variant="outlined"
            slotProps={{
              inputLabel: {
                shrink: true
              }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 42
              }
            }}
          />
          <Button
            variant="outlined"
            onClick={handleSyncBudget}
            startIcon={<RefreshOutlinedIcon />}
          >
            {syncing ? "Syncing..." : "Sync"}
          </Button>
          <Button 
            variant="contained" 
            startIcon={<AddRoundedIcon />} 
            onClick={handleAddBudgetModal}
          >
            Add Budget
          </Button>
        </Box>
      </Box>
      {/* Alert Bars */}
      {(overBudgetCount > 0 || warningCount> 0) && (
        <Box
          sx={(theme) => ({
            bgcolor: theme.palette.error.main + "14",
            borderRadius: 2,
            border: `1px solid ${theme.palette.error.main}40`,
            px: 2.25,
            py: 1.5,
            mb: 3,
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            fontSize: 13,
          })}
        >
          <Box component="span" sx={{ fontSize: 18 }}>🚨</Box>
          {overBudgetCount > 0 && (
            <Box component="span" sx={{ color: "error.main", fontWeight: 600 }}>
              {overBudgetCount} budget
              {overBudgetCount > 1 ? "s" : ""} exceeded (
              {overBudgetItems.join(", ")})
            </Box>
          )}
          {warningCount > 0 && (
            <Box
              component="span"
              sx={{ color: "warning.main", fontWeight: 600, ml: 1 }}
            >
              · {warningCount} approaching limit
            </Box>
          )}
        </Box>
      )}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" }, gap: 2 }}>
          <InfoCards icon={"🎯"} label={"Total Budget"} value={fmt(summary?.totals?.totalLimit || 0)} color={""} sub={`${month}`}/>
          <InfoCards icon={"💸"} label={"Total Spent"} value={fmt(summary?.totals?.totalSpent || 0)} color={""} sub={`${overAllSpentPercentage}% used`} />
          <InfoCards icon={"🏦"} label={"Remaining"} value={fmt(summary?.totals?.totalSaved || 0)} color={""} sub={totalSaved >= 0 ? "Under budget" : "Over budget"} />
          <InfoCards icon={"📊"} label={"Categories"} value={summary?.summary?.length || 0} color={""} sub={`${summary?.alerts?.overBudgetCount} exceeded`}/>
        </Box>
        <Box
          sx={(theme) => ({
            borderRadius: 3,
            px: 3,
            py: 3,
            mb: 4,
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.background.paper,
          })}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 0.8,
              }}
            >
              Overall Spending Progress
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                color:
                  overAllSpentPercentage >= 100
                    ? "error.main"
                    : overAllSpentPercentage >= 80
                    ? "warning.main"
                    : "success.main",
              }}
            >
              {overAllSpentPercentage}%
            </Typography>
          </Box>
          <CustomLinearProgress
            variant="determinate"
            value={Math.min(overAllSpentPercentage, 100)}
            barColor={progressColor}
            height={8}
          />
        </Box>
        {summary?.summary?.length !== 0 ? (
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" }, gap: 3 }}>
            {summary?.summary?.map((item) => (
              <BudgetCard key={item._id} item={item} onEdit={() => {handleEditBudget(item._id)}} onDelete={() => {handleDeleteBudget(item._id)}} />
            ))}
          </Box>
        ) : (
          <Box>
            <Box
              sx={(theme) => ({
                textAlign: "center",
                px: 5,
                py: 8,
                bgcolor: theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.02)"
                  : "background.paper",
                borderRadius: 3,
                border: `2px dashed ${theme.palette.divider}`,
              })}
            >
              <Box sx={{ fontSize: 48, mb: 2 }}>📋</Box>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                No budgets for month
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  mb: 3,
                }}
              >
                Create budgets to track your spending limits
              </Typography>
              <Button
                variant="contained"
                onClick={handleAddBudgetModal}
              >
                + Create First Budget
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      {openDialog && (
        <CustomDialog
          open={openDialog}
          onClose={() => {setOpenDialog(false)}}
          title={dialogMode === "create" ? "New Category" : "Update Category"}
          showActions={false}
        >
          <BudgetForm
            mode={dialogMode}
            initialData={selectedBudget}
            onCancel={() => {
              setOpenDialog(false);
            }}
          />
        </CustomDialog>
      )}
      {confirmDialog && (
        <CustomDialog
          open={confirmDialog}
          onClose={() => setConfirmDialog(false)}
          title={"Delete Budget"}
          description="Are you sure you want to delete this budget?"
          confirmText="Delete"
          cancelText="Cancel"
          showActions={true}
          onConfirm={handleDelete}
        />
      )}
    </Box>
  )
}

