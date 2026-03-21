import { Box, Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { loginUser } from '../../features/auth/authSlice';
import { showSnackbar } from '../../features/snackbar/snackbarSlice';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(loginUser(values)).unwrap();
        dispatch(showSnackbar({ message: 'Login Successful', severity: 'success' }));
        // redirect to the dashboard route (home is nested under /dashboard)
        navigate('/dashboard');
      } catch {
        dispatch(showSnackbar({ message: 'Login failed. Please check your credentials and try again.', severity: 'error' }));
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box className="w-full">
      <Box
        className='flex flex-col gap-4 w-full'
        component="form"
        autoComplete='off'
        onSubmit={formik.handleSubmit}
      >
        <TextField 
          label="Email" 
          variant='standard' 
          name='email' 
          value={formik.values.email}  
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth 
          required 
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField 
          label="Password" 
          variant='standard' 
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth 
          required 
          type='password' 
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button variant='contained' type='submit' disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </Box>
    </Box>
  )
}

export default LoginForm;
