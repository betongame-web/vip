import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function RequireAuth({ children }) {
  const { isAuthenticated, booting } = useAuth();
  const location = useLocation();

  if (booting) {
    return <div className="p-6 text-center">Checking session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
