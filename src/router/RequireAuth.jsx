import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function RequireAuth({ children }) {
  const { isAuthenticated, booting } = useAuth();
  const location = useLocation();

  if (booting) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="rounded-2xl border border-white/10 bg-black/20 px-6 py-5 text-center">
          <p className="text-lg font-semibold text-white">Checking session...</p>
          <p className="mt-2 text-sm text-gray-400">Please wait while your account is verified.</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}