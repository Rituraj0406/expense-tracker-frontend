import { Box, Button, Chip, FormControl, FormHelperText, FormLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import type { BudgetItem } from "../../features/categories/categoriesTypes";
import { PRESET_CATEGORIES } from "../../utils/constants";
import { getIcon } from "../../utils/helper";
import * as Yup from 'yup';
import { useAppDispatch } from "../../hooks/reduxHooks";
import { createCategory, updateCategory } from "../../features/categories/categoriesSlice";
import { showSnackbar } from "../../features/snackbar/snackbarSlice";

type BudgetFormValues = {
    name: string;
    type: "expense" | "income" | "";
    description: string;
    amount: string;
    month: string;
};

interface BudgetFormProps {
    mode: "create" | "edit";
    onCancel?: () => void;
    initialData?: BudgetItem | null;
}

const BudgetForm = ({ mode, onCancel, initialData }: BudgetFormProps) => {
    const dispatch = useAppDispatch();
    const formik = useFormik<BudgetFormValues>({
        initialValues: {
            name: initialData?.name ?? "",
            type: initialData?.type ?? "",
            description: initialData?.description ?? "",
            amount: initialData?.limit ? String(initialData.limit) : "",
            month: initialData?.month ?? new Date().toISOString().slice(0, 7),
        },
        validationSchema: Yup.object({
            type: Yup.string()
                .oneOf(["income", "expense"], "Type must be either income or expense")
                .required("Type is required"),
            name: Yup.string()
                .required("Category name is required"),
            amount: Yup.number()
                .typeError("Please enter a valid amount")
                .moreThan(0, "Budget amount must be greater than 0")
                .required("Budget amount is required"),
            description: Yup.string()
                .required("Description is required"),
            month: Yup.string()
                .required("Month is required")
        }),
        onSubmit: async (values, {setSubmitting}) => {
            try{
                const payload = {
                    ...values,
                    type: values.type as "income" | "expense",
                    amount: Number(values.amount)
                }
                if(mode === "edit" && initialData){
                    await dispatch(updateCategory({
                        id: initialData._id,
                        data: payload
                    })).unwrap();
                    dispatch(showSnackbar({message: "Budget updated successfully", severity: "success"}))
                } else {
                    await dispatch(createCategory(payload)).unwrap();
                    dispatch(showSnackbar({message: "Budget created successfully", severity: "success"}));
                }
                onCancel?.();
            } catch (error) {
                console.log('print error:-', error);
                const message =
                    typeof error === "string"
                        ? error
                        : (error as { message?: string })?.message ||
                        "Something went wrong";
                dispatch(showSnackbar({message: message, severity: 'error'}))
            } finally {
                setSubmitting(false);
            }
        }
    })
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
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <FormLabel
                                sx={(theme) => ({
                                    ...theme.typography.formLabel,
                                    color: theme.palette.text.secondary,
                                    mb: 1,
                                })}
                            >
                                Category Name
                            </FormLabel>

                            {/* Preset Categories */}
                            <Stack direction="row" flexWrap="wrap" gap={1} mb={1}>
                                {PRESET_CATEGORIES.map((c) => (
                                    <Chip
                                        key={c}
                                        label={`${getIcon(c)} ${c}`}
                                        clickable
                                        onClick={() => formik.setFieldValue("name", c)}
                                        sx={(theme) => {
                                            const primary = theme.palette.primary.main;
                                            const isActive = formik.values.name === c;
                                            return {
                                                fontSize: 12,
                                                fontWeight: 600,
                                                backgroundColor: isActive
                                                    ? `${primary}40`
                                                    : theme.palette.mode === "dark"
                                                        ? "rgba(255,255,255,0.06)"
                                                        : theme.palette.action.hover,
                                                border: isActive
                                                    ? `1px solid ${primary}`
                                                    : `1px solid ${theme.palette.divider}`,
                                                color: isActive
                                                    ? primary
                                                    : theme.palette.text.secondary,
                                            };
                                        }}
                                    />
                                ))}
                            </Stack>

                            {/* Custom Category Input */}
                            <TextField
                                name="name"
                                placeholder="Or type custom name..."
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <Typography 
                            sx={(theme) => ({
                                ...theme.typography.formLabel,
                                color: theme.palette.text.secondary,
                                mb: 1,
                            })}
                        >
                            Budget Limit (₹)
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
                        <Typography 
                            sx={(theme) => ({
                                ...theme.typography.formLabel,
                                color: theme.palette.text.secondary,
                                mb: 1,
                            })}
                        >
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
                        <Typography 
                            sx={(theme) => ({
                                ...theme.typography.formLabel,
                                color: theme.palette.text.secondary,
                                mb: 1,
                            })}
                        >
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
                        <Typography
                            sx={(theme) => ({
                                ...theme.typography.formLabel,
                                color: theme.palette.text.secondary,
                                mb: 1,
                            })}
                        >
                            Date
                        </Typography>
                        <TextField
                            name="month"
                            type="month"
                            placeholder="Select month"
                            value={formik.values.month || ""}
                            onChange={(e) => {
                                const value = e.target.value.slice(0, 7);
                                formik.setFieldValue("month", value);
                            }}
                            onBlur={formik.handleBlur}
                            fullWidth
                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                }, 
                            }}
                            error={formik.touched.month && Boolean(formik.errors.month)}
                            helperText={formik.touched.month && formik.errors.month}
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

export default BudgetForm;