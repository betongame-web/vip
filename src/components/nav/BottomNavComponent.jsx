import { NavLink } from 'react-router-dom';

const items = [
  ['/', 'Home'],
  ['/casinos', 'Casino'],
  ['/sports', 'Sports'],
  ['/profile/wallet', 'Wallet'],
];

export default function BottomNavComponent() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/5 bg-brandgray-900/95 px-3 py-2 md:hidden">
      <div className="grid grid-cols-4 gap-2">
        {items.map(([to, label]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-center text-xs ${isActive ? 'bg-white/10 text-white' : 'text-gray-400'}`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
