import React from 'react';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LoginForm from '../../components/auth/LoginForm';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import GoogleIcon from '@mui/icons-material/Google';
import { useGoogleLogin } from '@react-oauth/google';
import { googleLogin } from '../../features/auth/authSlice';
import { showSnackbar } from '../../features/snackbar/snackbarSlice';
import SpendlyLogo from '../../assets/Gemini_Generated_Image_fbrgafbrgafbrgaf-removebg-preview.png';

const Login = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const navigate = useNavigate();

  // if already logged in, send to dashboard
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async(tokenResponse) => {
      try {
        await dispatch(googleLogin(tokenResponse.access_token)).unwrap();
        dispatch(showSnackbar({ message: 'Login Successful', severity: 'success' }));
        navigate('/dashboard')
      } catch (error) {
        console.log('error', error);
        dispatch(showSnackbar({ message: error, severity: 'error' }));
      }
    },
    onError: () => {
      console.log("Google login failed");
    }
  })
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="flex items-center gap-2 mb-6 justify-center">
        <img alt='logo' src={SpendlyLogo} className='w-[30%]'/>
      </div>
      <div className="w-full max-w-md shadow-lg shadow-blue-500 p-6 rounded-xl flex flex-col gap-4">
        <LoginForm />
        <Divider variant="middle" sx={{ margin: 0, color: 'gray' }}>Or</Divider>
        <div className="flex gap-2">
          <Button 
            variant="outlined" 
            color="primary" 
            fullWidth 
            sx={{ 
              borderRadius: 20, 
              textTransform: 'none', 
              display: 'flex', 
              gap: 1 
            }}
            onClick={() => handleGoogleLogin()}
          >
            <GoogleIcon sx={{ fontSize: 20 }} /> Sign in with Google
          </Button>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login;
