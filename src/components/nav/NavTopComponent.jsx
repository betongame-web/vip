import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function NavTopComponent() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/5 bg-brandgray-900/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="text-lg font-bold tracking-wide">
          VIPERPRO React
        </Link>
        <nav className="hidden gap-4 text-sm text-gray-300 md:flex">
          <Link to="/">Home</Link>
          <Link to="/casinos">Casinos</Link>
          <Link to="/sports">Sports</Link>
          <Link to="/promotion">Promotion</Link>
          <Link to="/support">Support</Link>
        </nav>
        <div className="flex items-center gap-3 text-sm">
          {isAuthenticated ? (
            <>
              <span className="hidden text-gray-300 md:inline">{user?.name || user?.email || 'Authenticated'}</span>
              <Link to="/profile/wallet" className="rounded-full border border-white/10 px-3 py-2">
                Wallet
              </Link>
              <button type="button" onClick={logout} className="rounded-full bg-red-600 px-3 py-2">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-full border border-white/10 px-3 py-2">
                Login
              </Link>
              <Link to="/register" className="rounded-full bg-blue-600 px-3 py-2">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
