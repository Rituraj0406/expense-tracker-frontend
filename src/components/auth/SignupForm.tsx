import { Box, Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { registerUser } from '../../features/auth/authSlice';

const SignupForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(registerUser(values)).unwrap();
        navigate('/login');
      } catch {
        // Basic error feedback; can be enhanced later
        // eslint-disable-next-line no-alert
        alert('Registration failed. Please try again.');
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
          label="Name" 
          variant='standard' 
          name='name' 
          value={formik.values.name}  
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth 
          required 
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
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
          {formik.isSubmitting ? 'Signing up...' : 'Sign Up'}
        </Button>
      </Box>
    </Box>
  )
}

export default SignupForm;
