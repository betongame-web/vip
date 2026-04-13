import { NavLink } from 'react-router-dom';

const items = [
  { to: '/', label: 'Home' },
  { to: '/casinos', label: 'Casino' },
  { to: '/sports', label: 'Sports' },
  { to: '/profile/wallet', label: 'Wallet' },
  { to: '/profile', label: 'Profile' },
];

function itemClass(isActive) {
  return [
    'flex flex-1 flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px] font-medium transition',
    isActive ? 'bg-emerald-500/15 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white',
  ].join(' ');
}

export default function BottomNavComponent() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-brandgray-900/95 px-3 py-2 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-2xl items-center gap-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => itemClass(isActive)}
          >
            {({ isActive }) => (
              <>
                <span
                  className={[
                    'mb-1 h-2.5 w-2.5 rounded-full transition',
                    isActive ? 'bg-emerald-400' : 'bg-gray-600',
                  ].join(' ')}
                />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}