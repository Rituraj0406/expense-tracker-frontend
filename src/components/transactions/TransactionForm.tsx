import { Box, Button, FormControl, FormHelperText, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { createTransactions, updateTransaction } from "../../features/transactions/transactionSlice";
import { showSnackbar } from "../../features/snackbar/snackbarSlice";
import type { Transaction } from "../../features/transactions/transactionTypes";
import { useEffect } from "react";
import { getCategoryOptions } from "../../features/categories/categoriesSlice";


type TransactionFormValues = {
  type: "income" | "expense" | "";
  category: string;
  description: string;
  date: string;
  amount: string;
};

interface TransactionFormProps {
    mode: "create" | "edit";
    onCancel?: () => void;
    initialData?: Transaction | null;
}

const TransactionForm = ({ mode, onCancel, initialData }: TransactionFormProps) => {
    const dispatch = useAppDispatch();
    const {categoryOptions} = useAppSelector((state) => state.categories);

    useEffect(() => {
        dispatch(getCategoryOptions());
    }, [dispatch])
    
    const formik = useFormik<TransactionFormValues>({
        initialValues: {
            type: initialData?.type || '',
            category: initialData?.category || '',
            description: initialData?.description || '',
            date: initialData?.date ? initialData.date.split("T")[0] : '',
            amount: initialData?.amount?.toString() || '',
        },
        validationSchema: Yup.object({
            type: Yup.string()
                .oneOf(["income", "expense"], "Type must be either income or expense")
                .required("Transaction type is required"),

            category: Yup.string()
                .required("Category is required"),

            description: Yup.string()
                .required("Description is required"),

            date: Yup.string()
                .required("Date is required"),

            amount: Yup.number()
                .typeError("Please enter a valid amount")
                .moreThan(0, "Amount must be greater than 0")
                .required("Amount is required")
        }),
        onSubmit: async (values, {setSubmitting}) => {
            try {
                const payload = {
                    ...values,
                    type: values.type as "income" | "expense",
                    amount: Number(values.amount)
                }
                if(mode === "edit" && initialData){
                    await dispatch(updateTransaction({
                        id: initialData._id,
                        data: payload
                    })).unwrap();

                    dispatch(showSnackbar({message: "Transaction updated successfully", severity: "success",}));
                } else {
                    await dispatch(createTransactions(payload)).unwrap();
                    dispatch(showSnackbar({message: "Transaction created successfully", severity: 'success'}));
                }
                onCancel?.();
            } catch (error) {
                dispatch(showSnackbar({message: {error}, severity: 'error'}))
            } finally {
                setSubmitting(false);
            }
        }
    });
    return (
        <Box className="w-full pt-3">
            <Paper sx={{ bgcolor: 'background.paper', border: "none", boxShadow: "none" }}>
                <Box 
                    className="flex flex-col gap-4 w-full"
                    component="form"
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}
                >
                    <Box>
                        <Typography variant="body2" mb={1}>
                            Type
                        </Typography>
                        <FormControl 
                            fullWidth 
                            error={formik.touched.type && Boolean(formik.errors.type)}
                        >
                            <Select
                                labelId="transaction-type-label"
                                id="transaction-type"
                                name="type"
                                value={formik.values.type}
                                displayEmpty
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <MenuItem value="" disabled>
                                    Select type
                                </MenuItem>
                                <MenuItem value="income">Income</MenuItem>
                                <MenuItem value="expense">Expense</MenuItem>
                            </Select>
                            {formik.touched.type && formik.errors.type && (
                                <FormHelperText>{formik.errors.type}</FormHelperText>
                            )}
                        </FormControl>
                    </Box>
                    <Box>
                        <Typography variant="body2" mb={1}>
                            Category
                        </Typography>
                        <FormControl
                            fullWidth
                            error={formik.touched.category && Boolean(formik.errors.category)}
                        >
                            <Select
                                labelId="transaction-category-label"
                                id="transaction-category"
                                name="category"
                                value={formik.values.category}
                                displayEmpty
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <MenuItem value="" disabled>
                                    Select category
                                </MenuItem>
                                {categoryOptions?.length > 0 ? (
                                    categoryOptions.map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No categories</MenuItem>
                                )}
                            </Select>
                            {formik.touched.category && formik.errors.category && (
                                <FormHelperText>{formik.errors.category}</FormHelperText>
                            )}
                        </FormControl>
                    </Box>
                    <Box>
                        <Typography variant="body2" mb={1}>
                            Description
                        </Typography>
                        <TextField
                            name="description"
                            variant="outlined"
                            value={formik.values.description}
                            fullWidth
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            placeholder="e.g. Grocery Shopping"
                        />
                    </Box>
                    <Box>
                        <Typography variant="body2" mb={1}>
                            Amount (₹)
                        </Typography>
                        <TextField
                            name="amount"
                            type="number"
                            variant="outlined"
                            value={formik.values.amount}
                            placeholder="0"
                            fullWidth
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                            error={formik.touched.amount && Boolean(formik.errors.amount)}
                            helperText={formik.touched.amount && formik.errors.amount}
                        />
                    </Box>
                    <Box>
                        <Typography variant="body2" mb={1}>
                            Date
                        </Typography>
                        <TextField
                            name="date"
                            type="date"
                            variant="outlined"
                            value={formik.values.date}
                            fullWidth
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                            error={formik.touched.date && Boolean(formik.errors.date)}
                            helperText={formik.touched.date && formik.errors.date}
                            slotProps={{ 
                                inputLabel: {
                                    shrink: true 
                                }
                            }}
                        />
                    </Box>
                    <Stack direction="row" spacing={2} justifyContent="flex-end" mt={1}>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                if (onCancel) {
                                    onCancel();
                                } else {
                                    formik.resetForm();
                                }
                            }}
                            disabled={formik.isSubmitting}
                            className="w-full"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={formik.isSubmitting}
                            className="w-full"
                        >
                            {formik.isSubmitting ? "Submitting…" : "Submit"}
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    )
}

export default TransactionForm;