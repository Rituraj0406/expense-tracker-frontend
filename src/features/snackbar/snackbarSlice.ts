import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    open: false,
    message: '',
    severity: 'info', // 'success' | 'error' | 'warning' | 'info'
};

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        showSnackbar: (state, action) => {
            const { message, severity = 'info' } = action.payload;
            state.open = true;
            state.message = message;
            state.severity = severity;
        },
        hideSnackbar: (state) => {
            state.open = false;
        },
    },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;