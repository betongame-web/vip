import { NavLink } from 'react-router-dom';

function pill({ isActive }) {
  return `rounded-full px-3 py-2 text-sm transition ${isActive ? 'bg-slate-100 text-slate-900' : 'bg-white/6 text-slate-300 hover:bg-white/12'}`;
}

export default function SportsHeaderOptions() {
  return (
    <div className="mb-5 flex flex-wrap gap-2">
      <NavLink to="/sports" end className={pill}>Featured Games</NavLink>
      <NavLink to="/sports/calendar" className={pill}>Calendar</NavLink>
      <NavLink to="/sports/feed" className={pill}>Betting Feed</NavLink>
    </div>
  );
}
