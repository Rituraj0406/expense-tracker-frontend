import { Snackbar, Alert } from "@mui/material";
import type { SyntheticEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { hideSnackbar } from "../../features/snackbar/snackbarSlice";

interface SnackbarSlice {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
}


const CustomSnackbar = () => {
    const dispatch = useAppDispatch();
    const {open, message, severity} = useAppSelector((state) => state.snackbar) as SnackbarSlice;

    const handleClose = (
        _event?: SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") return;

        dispatch(hideSnackbar());
    };
    return (
        <Snackbar 
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert onClose={handleClose} severity={severity} variant="filled" sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default CustomSnackbar;