import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AnalyticsResponse } from "./analyticsTypes";
import API from "../../services/api";

interface AnalyticsState {
    data: AnalyticsResponse | null;
    loading: boolean;
    error: string | null;
}

const initialState: AnalyticsState = {
    data: null,
    loading: false,
    error: null
}

export const fetchAnalytics = createAsyncThunk(
    'analytics/fetch',
    async(month: string, {rejectWithValue}) => {
        try {
            const res = await API.get(`/analytics?month=${month}`);
            return res.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return rejectWithValue(err?.response?.data?.message || "Failed to fetch analytics")
        }
    }
)

const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnalytics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAnalytics.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAnalytics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export default analyticsSlice.reducer;