import { Link } from 'react-router-dom';
import { useSportsbook } from '@/contexts/SportsbookContext';

export default function SportsHeaderOptions() {
  const { liveEvents, upcomingEvents, favoriteEvents, bets, featuredEvents } = useSportsbook();

  const statItems = [
    { label: 'Live', value: liveEvents.length },
    { label: 'Upcoming', value: upcomingEvents.length },
    { label: 'Featured', value: featuredEvents.length },
    { label: 'Favorites', value: favoriteEvents.length },
    { label: 'Betslip', value: bets.length },
  ];

  return (
    <div className="mb-6 space-y-4">
      <div className="rounded-2xl border border-white/10 bg-brandgray-800/60 p-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
              Sportsbook Tools
            </p>
            <h2 className="mt-2 text-lg font-semibold text-white">
              Quick access and live sportsbook overview
            </h2>
            <p className="mt-1 text-sm leading-7 text-gray-300">
              Use these shortcuts to jump between live matches, search, favorites, and your current bet history.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/sports/live"
              className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Live Now
            </Link>

            <Link
              to="/sports/search"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-white/10"
            >
              Search
            </Link>

            <Link
              to="/sports/favorites"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-white/10"
            >
              Favorites
            </Link>

            <Link
              to="/sports/bets"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-white/10"
            >
              My Bets
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-gray-400">{item.label}</p>
            <p className="mt-2 text-2xl font-bold text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}