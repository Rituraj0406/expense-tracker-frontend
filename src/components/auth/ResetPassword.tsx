import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { showSnackbar } from "../../features/snackbar/snackbarSlice";
import { resetPassword } from "../../features/auth/authSlice";

const ResetPassword = () => {
    const { token } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, "Minimum 6 characters")
                .required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords must match")
                .required("Confirm password is required"),
        }),
        onSubmit: async (values) => {
            try {
                await dispatch(resetPassword({
                    token: token!,
                    password: values.password,
                    confirmPassword: values.confirmPassword
                })).unwrap();

                dispatch(
                    showSnackbar({
                        message: "Password reset successful",
                        severity: "success",
                    })
                );

                navigate("/login");
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                dispatch(
                    showSnackbar({
                        message: error?.response?.data?.message || "Reset failed",
                        severity: "error",
                    })
                );
            }
        },
    });

    return (
        <Box className="flex justify-center items-center min-h-screen px-4">
            <Box
                component="form"
                onSubmit={formik.handleSubmit}
                className="w-full max-w-md p-6 shadow-lg rounded-xl bg-white flex flex-col gap-4"
            >
                <Typography variant="h5" fontWeight="bold" textAlign="center">
                    Reset Password
                </Typography>

                <TextField
                    label="New Password"
                    type="password"
                    name="password"
                    variant="standard"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                <TextField
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    variant="standard"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                    }
                />

                <Button type="submit" variant="contained" fullWidth disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? "Resetting..." : "Reset Password"}
                </Button>
            </Box>
        </Box>
    );
};

export default ResetPassword;