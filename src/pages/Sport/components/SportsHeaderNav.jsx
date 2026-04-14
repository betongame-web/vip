import { NavLink } from 'react-router-dom';

const items = [
  { to: '/sports', label: 'Overview' },
  { to: '/sports/live', label: 'Live' },
  { to: '/sports/calendar', label: 'Calendar' },
  { to: '/sports/search', label: 'Search' },
  { to: '/sports/favorites', label: 'Favorites' },
  { to: '/sports/bets', label: 'My Bets' },
  { to: '/sports/feed', label: 'Feed' },
];

function itemClass(isActive) {
  return [
    'whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition',
    isActive
      ? 'bg-emerald-500 text-slate-950'
      : 'border border-white/10 bg-white/[0.03] text-gray-200 hover:bg-white/10',
  ].join(' ');
}

export default function SportsHeaderNav() {
  return (
    <div className="mb-4 overflow-x-auto">
      <div className="flex min-w-max items-center gap-2 rounded-2xl border border-white/10 bg-brandgray-800/70 p-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/sports'}
            className={({ isActive }) => itemClass(isActive)}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}