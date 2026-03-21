import React from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SignupForm from '../../components/auth/SignupForm';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';

const Signup = () => {
  const user = useAppSelector(state => state.auth.user);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="flex items-center gap-2 mb-6">
        <AccountBalanceWalletIcon fontSize="large" />
        <h1 className="font-mono text-black font-extrabold text-2xl">Expense.io</h1>
      </div>
      <div className="w-full max-w-md shadow-lg shadow-blue-400 p-6 rounded-xl flex flex-col gap-4">
        <SignupForm />
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
