import { Link, NavLink } from 'react-router-dom';
import { useSportsbook } from '@/contexts/SportsbookContext';

function tabClass({ isActive }) {
  return `rounded-full px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`;
}

export default function SportsHeaderNav() {
  const { bets } = useSportsbook();

  return (
    <div className="card-surface mb-4 flex flex-wrap items-center justify-between gap-3 p-3">
      <div className="flex flex-wrap gap-2">
        <NavLink to="/sports" end className={tabClass}>Overview</NavLink>
        <NavLink to="/sports/live" className={tabClass}>Live</NavLink>
        <NavLink to="/sports/favorites" className={tabClass}>Favorites</NavLink>
        <NavLink to="/sports/search" className={tabClass}>Search</NavLink>
        <NavLink to="/sports/bets" className={tabClass}>My Bets</NavLink>
      </div>

      <Link to="/sports/bets" className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
        Betslip {bets.length ? `(${bets.length})` : ''}
      </Link>
    </div>
  );
}
