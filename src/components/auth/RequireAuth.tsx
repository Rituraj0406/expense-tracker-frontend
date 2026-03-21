import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import type { ReactNode } from 'react';

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const user = useAppSelector(state => state.auth.user);
  const location = useLocation();

  if (!user) {
    // not logged in, redirect to login page with return location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
