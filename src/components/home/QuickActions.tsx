import { Box, Button } from "@mui/material";
import { useState } from "react";
import CustomDialog from "../common/CustomDialog";
import TransactionForm from "../transactions/TransactionForm";
import BudgetForm from "../budgets/BudgetForm";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { fetchBudgetSummary, syncBudget } from "../../features/categories/categoriesSlice";
import { showSnackbar } from "../../features/snackbar/snackbarSlice";

export default function QuickActions() {
    const dispatch = useAppDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [budgetModal, setBudgetModal] = useState(false);
    const [syncing, setSyncing] = useState(false);
    const month = new Date().toISOString().slice(0, 7);

    const handleAddTransactionModal = () => {
        setOpenDialog(true);
    }

    const handleAddBudgetModal = () => {
        setBudgetModal(true);
    }

    const handleSyncBudget = async () => {
        try {
            setSyncing(true);
            const response = await dispatch(syncBudget(month)).unwrap();
            dispatch(fetchBudgetSummary(month));
            dispatch(showSnackbar({ message: response.message, severity: "success" }));
        } catch (error) {
            dispatch(showSnackbar({ message: "Sync failed", severity: "error" }));
            console.error("Sync failed:", error);
        } finally {
            setSyncing(false);
        }
    }
    return (
        <>
            <Box
                p={3}
                borderRadius={3}
                border="1px solid"
                borderColor="divider"
                display="flex"
                flexDirection="column"
                gap={2}
            >
                <Button variant="contained" onClick={handleAddTransactionModal}>+ Add Transaction</Button>
                <Button variant="outlined" onClick={handleAddBudgetModal}>+ Create Budget</Button>
                <Button variant="outlined" onClick={handleSyncBudget}>{syncing ? "Syncing..." : "Sync"} Budget</Button>
            </Box>
            {openDialog && (
                <CustomDialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    title={"New Transaction"}
                    showActions={false}
                >
                    <TransactionForm
                        mode={"create"}
                        initialData={null}
                        onCancel={() => {
                            setOpenDialog(false);
                        }
                        }
                    />
                </CustomDialog>
            )}
            {budgetModal && (
                <CustomDialog
                    open={budgetModal}
                    onClose={() => { setBudgetModal(false) }}
                    title={"New Category"}
                    showActions={false}
                >
                    <BudgetForm
                        mode={"create"}
                        initialData={null}
                        onCancel={() => {
                            setBudgetModal(false);
                        }}
                    />
                </CustomDialog>
            )}
        </>
    );
}