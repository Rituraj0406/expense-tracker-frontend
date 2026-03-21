import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { BudgetSummary, Category, CategoryPayload } from "./categoriesTypes";
import API from "../../services/api";

interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
    summary: BudgetSummary | null;
    categoryOptions: string[];
    page: number;
    pages: number;
} 

const initialState: CategoryState = {
    categories: [],
    summary: null,
    categoryOptions: [],
    page: 1,
    pages: 1,
    loading: false,
    error: null
}

// fetch categories
export const fetchCategories = createAsyncThunk(
    'categories/fetch',
    async({page = 1, limit = 10, month}: {page?: number; limit?: number; month?: string}) => {
        const response = await API.get(`/categories?page=${page}&limit=${limit}&month=${month}`);
        return response.data;
    }
);

// create category
export const createCategory = createAsyncThunk(
    'categories/create',
    async(data: CategoryPayload, {rejectWithValue}) => {
        try {
            const response  = await API.post('/categories', data);
            return response.data;
        } catch (error: unknown) {
            const errorMessage = error as {response?: {data?: {message?: string}}};
            return rejectWithValue(errorMessage.response?.data?.message || 'Failed to create');
        }
    }
);

// update category
export const updateCategory = createAsyncThunk(
    'categories/update',
    async ({ id, data }: {id: string; data: Partial<CategoryPayload>}, {rejectWithValue}) => {
        try {
            const response = await API.put(`/categories/${id}`, data);
            return response.data;
        } catch (error: unknown) {
            const errorMessage = error as {response?: {data?: {message?: string}}};
            return rejectWithValue(errorMessage.response?.data?.message || 'Failed to update');
        }
    }
);

// delete category
export const deleteCategory = createAsyncThunk(
    'categories/delete',
    async (id: string, {rejectWithValue}) => {
        try {
            await API.delete(`/categories/${id}`);
            return id;
        } catch (error: unknown) {
            const errorMessage = error as {response?: {data?: {message?: string}}};
            return rejectWithValue(errorMessage.response?.data?.message || 'Failed to delete');
        }
    }
);

// fetch budget summary
export const fetchBudgetSummary = createAsyncThunk(
    'categories/summary',
    async(month?: string) => {
        const response = await API.get(`/categories/summary?month=${month}`);
        return response.data;
    }
);

// sync budget
export const syncBudget = createAsyncThunk(
    'categories/sync',
    async(month?: string) => {
        const response = await API.post("/categories/sync", {month});
        return response.data;
    }
);

// getCategory options
export const getCategoryOptions = createAsyncThunk(
    'category/categoryOptions',
    async() => {
        const response = await API.get(`/categories/options`);
        return response.data.categories;
    }
)

const categoriesSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload.categories;
                state.page = action.payload.page;
                state.pages = action.payload.pages;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Create
            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.unshift(action.payload);
                state.loading = false;
            })
            // Update
            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.categories.findIndex(c => c._id === action.payload._id);
                if(index !== -1) state.categories[index] = action.payload;
            })
            // Delete
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(c => c._id !== action.payload);
            })
            // Summary
            .addCase(fetchBudgetSummary.fulfilled, (state, action) => {
                state.summary = action.payload;
            })
            // getOptions
            .addCase(getCategoryOptions.fulfilled, (state, action) => {
                state.categoryOptions = action.payload;
            })
    }
});

export default categoriesSlice.reducer;