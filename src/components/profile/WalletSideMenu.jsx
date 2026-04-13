import { NavLink } from 'react-router-dom';

const items = [
  { to: '/profile/wallet', label: 'Wallet' },
  { to: '/profile/deposit', label: 'Deposit' },
  { to: '/profile/withdraw', label: 'Withdraw' },
  { to: '/profile/transactions', label: 'Transactions' },
  { to: '/records', label: 'Records' },
  { to: '/profile/favorite', label: 'Favorites' },
  { to: '/profile/recents', label: 'Recents' },
  { to: '/profile/affiliate', label: 'Affiliate' },
];

export default function WalletSideMenu() {
  return (
    <aside className="card-surface p-4">
      <div className="mb-4 rounded-2xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Account Menu</p>
        <h2 className="mt-2 text-lg font-semibold text-white">Profile Navigation</h2>
        <p className="mt-2 text-sm leading-6 text-gray-300">
          Open wallet pages, records, favorites, affiliate tools, and payment sections from here.
        </p>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                'block rounded-xl border px-4 py-3 text-sm font-medium transition',
                isActive
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-white'
                  : 'border-white/10 bg-white/[0.03] text-gray-300 hover:bg-white/10 hover:text-white',
              ].join(' ')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}