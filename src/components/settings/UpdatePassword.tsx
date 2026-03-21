import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useAppDispatch } from "../../hooks/reduxHooks";
import { showSnackbar } from "../../features/snackbar/snackbarSlice";
import { updatePassword } from "../../features/auth/authSlice";

type UpdatePasswordFormValues = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}


const UpdatePassword = () => {
    const dispatch = useAppDispatch();

    const formik = useFormik<UpdatePasswordFormValues>({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            currentPassword: Yup.string()
                .required("Current password is required"),

            newPassword: Yup.string()
                .min(8, "At least 8 characters")
                .matches(/[A-Z]/, "Must contain one uppercase letter")
                .matches(/[a-z]/, "Must contain one lowercase letter")
                .matches(/[0-9]/, "Must contain one number")
                .required("New password is required"),

            confirmPassword: Yup.string()
                .oneOf([Yup.ref("newPassword")], "Passwords must match")
                .required("Confirm password is required"),
        }),
        // enableReinitialize: true,
        onSubmit: async (values, {setSubmitting}) => {
            try {
                await dispatch(updatePassword({
                    currentPassword: values.currentPassword,
                    newPassword: values.newPassword,
                    confirmPassword: values.confirmPassword
                })).unwrap();
                dispatch(showSnackbar({message: "Password updated successfully", severity: "success"}))

                formik.resetForm();
            } catch (error) {
                const message =
                    typeof error === "string"
                        ? error
                        : (error as { message?: string })?.message ||
                        "Something went wrong";
                dispatch(showSnackbar({message: message || "Failed to update password", severity: "error"}))
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <Box
            className="flex flex-col gap-2 max-w-100"
            component="form"
            autoComplete="off"
            onSubmit={formik.handleSubmit}
        >
            <Box>
                <Typography
                    sx={(theme) => ({
                        ...theme.typography.formLabel,
                        color: theme.palette.text.secondary,
                        mb: 1,
                    })}
                >
                    Current Password
                </Typography>
                <TextField
                    name="currentPassword"
                    type="password"
                    variant="outlined"
                    value={formik.values.currentPassword}
                    placeholder="Enter current password"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                    helperText={formik.touched.currentPassword && formik.errors.currentPassword}
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
                    New Password
                </Typography>
                <TextField
                    name="newPassword"
                    type="password"
                    variant="outlined"
                    value={formik.values.newPassword}
                    placeholder="Enter new password"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                    helperText={formik.touched.newPassword && formik.errors.newPassword}
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
                    Confirm Password
                </Typography>
                <TextField
                    name="confirmPassword"
                    type="password"
                    variant="outlined"
                    value={formik.values.confirmPassword}
                    placeholder="Enter confirm password"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
            </Box>
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
                <Button 
                    variant="outlined"
                    onClick={() => {}}
                    disabled={formik.isSubmitting}
                    className="w-full"
                >
                    Clear
                </Button>
                <Button 
                    variant="contained" 
                    type="submit" 
                    disabled={formik.isSubmitting} 
                    className="w-full"
                >
                    {formik.isSubmitting ? "Saving...." : "Save changes"}
                </Button>
            </Stack>
        </Box>
    )
}

export default UpdatePassword;