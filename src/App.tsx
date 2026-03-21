import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material';
import Login from './pages/Login'
import RequireAuth from './components/auth/RequireAuth'
import Signup from './pages/SignUp'
// import Dashboard from './components/Dashboard'
import CustomSnackbar from './components/common/Snackbar'
import Home from './pages/Home';
import DashboardLayout from './layouts/DashboardLayout'
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
      <CustomSnackbar/>
    </Box>
  )
}

export default App
