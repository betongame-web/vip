import { Link } from 'react-router-dom';
import { useSportsbook } from '@/contexts/SportsbookContext';
import {
  formatMatchDate,
  getStatusTone,
  initials,
} from '@/pages/Sport/sportsUtils';

export default function SportCompactCard({ event, rightSlot = null }) {
  const { toggleFavorite, isFavorite } = useSportsbook();

  const favorite = isFavorite(event.id);

  return (
    <article className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-gray-300">
              {event.leagueCountry}
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-gray-300">
              {event.leagueName}
            </span>

            <span
              className={`text-[11px] font-semibold ${getStatusTone(
                event.statusLong,
              )}`}
            >
              {event.statusLong}
            </span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">
                {initials(event.teamHomeName)}
              </div>

              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.16em] text-gray-400">
                  Home
                </p>
                <h3 className="truncate text-base font-semibold text-white">
                  {event.teamHomeName}
                </h3>
              </div>
            </div>

            <div className="text-center">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                  Score
                </p>
                <p className="mt-1 text-lg font-bold text-white">
                  {event.goalsHome} - {event.goalsAway}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-start gap-3 md:justify-end">
              <div className="min-w-0 text-right">
                <p className="text-xs uppercase tracking-[0.16em] text-gray-400">
                  Away
                </p>
                <h3 className="truncate text-base font-semibold text-white">
                  {event.teamAwayName}
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">
                {initials(event.teamAwayName)}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-400">
            <span>{formatMatchDate(event.date)}</span>
            <span>•</span>
            <span>{event.leagueRound}</span>
            <span>•</span>
            <span>{event.leagueSeason}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          {rightSlot}

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => toggleFavorite(event.id)}
              className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                favorite
                  ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                  : 'border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10'
              }`}
            >
              {favorite ? 'Saved' : 'Favorite'}
            </button>

            <Link
              to={`/sports/event/${event.id}`}
              className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Open Match
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}