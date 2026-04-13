import { NavLink } from 'react-router-dom';

const items = [
  ['/profile/wallet', 'Wallet'],
  ['/profile/deposit', 'Deposit'],
  ['/profile/withdraw', 'Withdraw'],
  ['/profile/transactions', 'Transactions'],
  ['/profile/favorite', 'Favorites'],
  ['/profile/recents', 'Recent'],
  ['/profile/affiliate', 'Affiliate'],
];

export default function WalletSideMenu() {
  return (
    <div className="card-surface space-y-2 p-3">
      {items.map(([to, label]) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 text-sm ${isActive ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5'}`
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
}
