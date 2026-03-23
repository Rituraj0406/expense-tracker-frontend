import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material';
import RequireAuth from './components/auth/RequireAuth'
import CustomSnackbar from './components/common/Snackbar'
import { lazy, Suspense } from 'react';
import DashboardLayout from './layouts/DashboardLayout'
import ForgetPassword from './components/auth/ForgetPassword';
import ResetPassword from './components/auth/ResetPassword';
// import Transactions from './pages/Transactions';
// import Budgets from './pages/Budgets';
// import Settings from './pages/Settings';
// import Analytics from './pages/Analytics';

// 🔥 Lazy loaded pages
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/SignUp'));
const Home = lazy(() => import('./pages/Home'));
const Transactions = lazy(() => import('./pages/Transactions'));
const Budgets = lazy(() => import('./pages/Budgets'));
const Settings = lazy(() => import('./pages/Settings'));
const Analytics = lazy(() => import('./pages/Analytics'));


function App() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgetPassword/>}/>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Home />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="budget" element={<Budgets />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
      <CustomSnackbar/>
    </Box>
  )
}

export default App
