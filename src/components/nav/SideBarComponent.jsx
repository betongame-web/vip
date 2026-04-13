import { NavLink } from 'react-router-dom';

const items = [
  ['/', 'Home'],
  ['/casinos', 'Casino'],
  ['/sports', 'Sports'],
  ['/profile/wallet', 'Wallet'],
  ['/profile/deposit', 'Deposit'],
  ['/profile/withdraw', 'Withdraw'],
  ['/profile/transactions', 'Transactions'],
  ['/profile/affiliate', 'Affiliate'],
];

export default function SideBarComponent() {
  return (
    <aside className="fixed left-0 top-[69px] hidden h-[calc(100vh-69px)] w-64 overflow-y-auto border-r border-white/5 bg-brandgray-800 px-3 py-4 md:block">
      <div className="space-y-2">
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
    </aside>
  );
}
