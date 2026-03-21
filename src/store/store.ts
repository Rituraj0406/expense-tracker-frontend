import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import transactionReducer from '../features/transactions/transactionSlice';
import snackbarReducer from '../features/snackbar/snackbarSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import analyticsReducer from '../features/analytics/analyticsSlice';

export const store = configureStore({
    reducer: {
        snackbar: snackbarReducer,
        auth: authReducer,
        transaction: transactionReducer,
        categories: categoriesReducer,
        analytics: analyticsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;