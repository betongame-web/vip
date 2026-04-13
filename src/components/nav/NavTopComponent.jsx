import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/casinos', label: 'Casino' },
  { to: '/sports', label: 'Sports' },
  { to: '/promotion', label: 'Promotions' },
  { to: '/support', label: 'Support' },
  { to: '/vip', label: 'VIP' },
];

function navClass(isActive) {
  return [
    'rounded-full px-3 py-2 text-sm font-medium transition',
    isActive ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
  ].join(' ');
}

export default function NavTopComponent() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/5 bg-brandgray-900/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-black text-white">
            7XBET 
          </div>

          <div className="hidden sm:block">
            <p className="text-base font-bold tracking-wide text-white">7XBET</p>
            <p className="text-xs text-gray-400">Casino • Sports • Wallet</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => navClass(isActive)}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          {isAuthenticated ? (
            <>
              <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-2 md:block">
                <p className="max-w-[180px] truncate text-sm font-medium text-white">
                  {user?.name || user?.email || 'Authenticated'}
                </p>
                <p className="text-xs text-gray-400">Signed in</p>
              </div>

              <Link
                to="/profile"
                className="hidden rounded-full border border-white/10 px-4 py-2 text-gray-200 transition hover:bg-white/10 md:inline-flex"
              >
                Profile
              </Link>

              <Link
                to="/profile/wallet"
                className="rounded-full border border-white/10 px-4 py-2 text-gray-200 transition hover:bg-white/10"
              >
                Wallet
              </Link>

              <button
                type="button"
                onClick={logout}
                className="rounded-full bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full border border-white/10 px-4 py-2 text-gray-200 transition hover:bg-white/10"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-emerald-500 px-4 py-2 font-medium text-white transition hover:bg-emerald-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}