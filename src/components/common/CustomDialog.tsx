import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, useMediaQuery, useTheme } from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";

interface CustomDialogProps {
    open: boolean;
    onClose: () => void;

    title?: string;
    children?: React.ReactNode;
    description?: string;

    showActions?: boolean;
    loading?: boolean;
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";

    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialog = ({
    open,
    onClose,
    onConfirm,
    title,
    children,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    showActions = true,
    loading = false,
    maxWidth = "sm"
}: CustomDialogProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if(loading) return;
                if(reason === "backdropClick" || reason === "escapeKeyDown"){
                    onClose();
                }
            }}
            fullWidth
            maxWidth={isMobile ? false : maxWidth}
            TransitionComponent={Transition}
            PaperProps={{
                sx: {
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    borderRadius: 2,
                    ...(isMobile && {
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        m: 0,
                        width: "100vw",
                        maxWidth: "100vw",
                        borderRadius: "16px 16px 0 0",
                    })
                },
            }}
            sx={{
                ...(isMobile && {
                    "& .MuiDialog-container": {
                        alignItems: "flex-end", // stick to bottom
                    },
                }),
            }}
        >
            {title && (<DialogTitle>{title}</DialogTitle>)}
            <DialogContent>
                {description && (
                    <DialogContentText sx={{mb: children ? 2 : 0}}>
                        {description}
                    </DialogContentText>
                )}  
                {children}     
            </DialogContent>
            {showActions && (
                <DialogActions>
                    <Button onClick={onClose} disabled={loading}>
                        {cancelText}
                    </Button>
                    {onConfirm && (
                        <Button onClick={onConfirm} variant="contained" disabled={loading}>
                            {loading ? <CircularProgress size={20}/> : confirmText}
                        </Button>
                    )}
                </DialogActions>
            )}
        </Dialog>
    )
}

export default CustomDialog;