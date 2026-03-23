import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { showSnackbar } from "../../features/snackbar/snackbarSlice";
import { forgotPassword } from "../../features/auth/authSlice";
// import your API call (you’ll create this)
// import { forgotPassword } from "../../features/auth/authSlice";

const ForgetPassword = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // 👉 Call your backend API here
        await dispatch(forgotPassword(values.email)).unwrap();

        // TEMP success (remove later)
        console.log("Sending reset link to:", values.email);

        dispatch(
          showSnackbar({
            message: "Password reset link sent to your email",
            severity: "success",
          })
        );

        resetForm();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        dispatch(
          showSnackbar({
            message: error?.message || "Something went wrong",
            severity: "error",
          })
        );
      }
    },
  });

  return (
    <Box className="w-full flex justify-center items-center min-h-[60vh]">
      <Box
        className="flex flex-col gap-6 w-full max-w-md p-6 shadow-lg rounded-xl bg-white"
        component="form"
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        {/* Title */}
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Forgot Password
        </Typography>

        <Typography variant="body2" textAlign="center" color="text.secondary">
          Enter your email to receive a reset link
        </Typography>

        {/* Email Field */}
        <TextField
          label="Email"
          variant="standard"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          required
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
        >
          Send Reset Link
        </Button>

        {/* Back to Login */}
        <Typography variant="body2" textAlign="center">
          Remember your password?{" "}
          <Link to="/login" style={{ color: "#1976d2" }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgetPassword;