import { useEffect, useMemo, useState } from "react";
import CustomToggleButtonGroup from "../../components/common/CustomToggleButtonGroup";
import Button from "@mui/material/Button";
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CustomTable from "../../components/common/CustomTable";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { deleteTransaction, exportTransactionsCSV, fetchTransactions } from "../../features/transactions/transactionSlice";
import CustomDialog from "../../components/common/CustomDialog";
import TransactionForm from "../../components/transactions/TransactionForm";
import type { Transaction } from "../../features/transactions/transactionTypes";
import { showSnackbar } from "../../features/snackbar/snackbarSlice";

export default function Transactions() {
    const dispatch = useAppDispatch();
    const { transactions, pages } = useAppSelector((state) => state.transaction);

    const [category, setCategory] = useState<string | null>("all");

    const [dialogMode, setDialogMode] = useState<"create" | "edit">("create")
    const [openDialog, setOpenDialog] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

    const options = [
        { value: "all", label: "All" },
        { value: "income", label: "Income" },
        { value: "expense", label: "Expenses" },
    ];

    const columns = [
        { id: "description", label: "Description" },
        // { id: "type", label: "Type" },
        { id: "category", label: "Category" },
        { id: "date", label: "Date" },
        { id: "amount", label: "Amount" },
    ];

    useEffect(() => {
        dispatch(fetchTransactions({page, limit: 10}));
    }, [dispatch, page]);

    const filteredTransactions = useMemo(() => {
        if (category === "all") return transactions;
        return transactions.filter((t) => t.type === category);
    }, [category, transactions]);

    const rows = useMemo(() => {
        return filteredTransactions.map((txn) => ({
            id: txn._id,
            icon: txn.type === "income" ? "💰" : "💸",
            description: txn.description || "-",
            type: txn.type,
            category: txn.category,
            date: new Date(txn.date).toLocaleDateString(),
            amount: txn.amount,
        }));
    }, [filteredTransactions]);

    const handleAddTransactionModal = () => {
        setDialogMode('create');
        setSelectedTransaction(null);
        setOpenDialog(true);
    }

    const handleEditTransaction = (id: string) => {
        const txn = transactions.find(t => t._id === id);
        if(!txn) return;
        setDialogMode('edit');
        setSelectedTransaction(txn);
        setOpenDialog(true);
    }

    const handleDelete = (id: string) => {
        const txn = transactions.find(t => t._id === id);
        if(!txn) return;
        setSelectedTransaction(txn);
        setConfirmDialog(true);
    }

    const handleDeleteTransaction = async () => {
        if(!selectedTransaction) return;

        try{
            await dispatch(deleteTransaction(selectedTransaction?._id)).unwrap();
            dispatch(showSnackbar({message: "Transaction deleted successfully", severity: "success"}));

            setConfirmDialog(false);
            setSelectedTransaction(null);
        } catch (err){
            const errorMessage = err instanceof Error ? err.message : "Failed to delete transaction";
            dispatch(showSnackbar({message: errorMessage, severity: "error"}));
        }
    }

    const handleExportCSV = async () => {
        try {
            const blob = await dispatch(exportTransactionsCSV()).unwrap();

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "transactions.csv";
            document.body.appendChild(a);
            a.click();
            a.remove();

            dispatch(
                showSnackbar({ message: "CSV downloaded successfully", severity: "success" })
            );
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Export failed";

            dispatch(
                showSnackbar({ message: errorMessage, severity: "error" })
            );
        }
    };

    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex justify-end gap-4">
                <Button variant="outlined" startIcon={<FileDownloadRoundedIcon />} onClick={handleExportCSV}>
                    Export CSV
                </Button>
                <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={handleAddTransactionModal}>
                    Add Transaction
                </Button>
            </div>
            <CustomToggleButtonGroup value={category} onChange={setCategory} options={options} />
            <div className="mt-10">
                <CustomTable
                    columns={columns}
                    rows={rows}
                    page={page}
                    totalPages={pages}
                    onPageChange={setPage}
                    onEdit={handleEditTransaction}
                    onDelete={handleDelete}
                />
            </div>
            {openDialog && (
                <CustomDialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    title={dialogMode ==="create" ? "New Transaction" : "Update Transaction" }
                    showActions={false}
                >
                    <TransactionForm 
                        mode={dialogMode}
                        initialData={selectedTransaction} 
                        onCancel={() => {
                            setOpenDialog(false); 
                            setSelectedTransaction(null)
                            }
                        }
                    />
                </CustomDialog>
            )}
            {confirmDialog && (
                <CustomDialog
                    open={confirmDialog}
                    onClose={() => setConfirmDialog(false)}
                    title="Delete Transaction"
                    description="Are you sure you want to delete this transaction?"
                    confirmText="Delete"
                    cancelText="Cancel"
                    showActions={true}
                    onConfirm={handleDeleteTransaction}
                />
            )}
        </div>
        
    )
}