import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from "../../services/api";
import type { Transaction, TransactionPayload } from './transactionTypes';

interface TransactionState {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
    page: number;
    pages: number;
};

const initialState: TransactionState = {
    transactions: [],
    loading: false,
    error: null,
    page: 1,
    pages: 1
};

// fetch all
export const fetchTransactions = createAsyncThunk(
    'transactions/fetch',
    async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
        const response = await API.get(`/transactions?page=${page}&limit=${limit}`);
        return response.data;
    }
);

// create
export const createTransactions = createAsyncThunk(
    'transaction/create',
    async (data: TransactionPayload, { rejectWithValue }) => {
        try {
            const response = await API.post('/transactions', data);
            return response.data;
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message || 'Failed to create');
        }
    }
);

// update
export const updateTransaction = createAsyncThunk(
    'transactions/update',
    async ({ id, data }: { id: string; data: Partial<TransactionPayload> }, { rejectWithValue }) => {
        try {
            const response = await API.put(`/transactions/${id}`, data);
            return response.data;
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message || 'Failed to update');
        }
    }
);

// delete
export const deleteTransaction = createAsyncThunk(
    'transactions/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            await API.delete(`/transactions/${id}`);
            return id;
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message || 'Failed to delete');
        }
    }
);

export const exportTransactionsCSV = createAsyncThunk(
    'transaction/exportCSV',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get("/transactions/export", {
                responseType: "blob", // 🔥 VERY IMPORTANT
            });

            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to export CSV"
            );
        }
    }
)

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload.transactions;
                state.page = action.payload.page;
                state.pages = action.payload.pages;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Create - prepend to the list so it appears at top
            .addCase(createTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions.unshift(action.payload);
            })
            .addCase(createTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update - replace the matching transaction in the list
            .addCase(updateTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.transactions.findIndex(t => t._id === action.payload._id);
                if (index !== -1) state.transactions[index] = action.payload;
            })
            .addCase(updateTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            //Delete - filter out by id
            .addCase(deleteTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = state.transactions.filter(t => t._id !== action.payload);
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default transactionSlice.reducer;