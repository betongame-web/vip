import { Link } from 'react-router-dom';
import { useSportsbook } from '@/contexts/SportsbookContext';
import {
  formatMatchDate,
  getStatusTone,
  initials,
} from '@/pages/Sport/sportsUtils';

export default function SportLiveHeroCard({ event }) {
  const { toggleFavorite, isFavorite } = useSportsbook();

  const favorite = isFavorite(event.id);
  const primaryMarket = event?.markets?.[0];
  const primarySelections = primaryMarket?.values?.slice(0, 3) || [];

  return (
    <article className="min-w-[320px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brandgray-800 to-black shadow-xl md:min-w-[380px]">
      <div className="border-b border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-red-300">
                Live
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-gray-300">
                {event.leagueCountry}
              </span>
            </div>

            <p className="mt-3 text-sm font-semibold text-white">{event.leagueName}</p>
            <p className={`mt-1 text-xs font-medium ${getStatusTone(event.statusLong)}`}>
              {event.statusLong} • {formatMatchDate(event.date)}
            </p>
          </div>

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
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="min-w-0">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-base font-bold text-white">
              {initials(event.teamHomeName)}
            </div>

            <h3 className="mt-3 truncate text-center text-lg font-bold text-white">
              {event.teamHomeName}
            </h3>
          </div>

          <div className="text-center">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-500">Score</p>
              <p className="mt-1 text-3xl font-black text-white">
                {event.goalsHome} - {event.goalsAway}
              </p>
            </div>
          </div>

          <div className="min-w-0">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-base font-bold text-white">
              {initials(event.teamAwayName)}
            </div>

            <h3 className="mt-3 truncate text-center text-lg font-bold text-white">
              {event.teamAwayName}
            </h3>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-3 text-xs text-gray-400">
          <span>{event.leagueRound}</span>
          <span>•</span>
          <span>{event.leagueSeason}</span>
          {event.stadium ? (
            <>
              <span>•</span>
              <span>{event.stadium}</span>
            </>
          ) : null}
        </div>

        {primarySelections.length ? (
          <div className="mt-6">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-gray-400">
              {primaryMarket?.name || 'Main market'}
            </p>

            <div className="grid grid-cols-3 gap-3">
              {primarySelections.map((selection) => (
                <div
                  key={selection.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 text-center"
                >
                  <p className="text-xs text-gray-400">{selection.value}</p>
                  <p className="mt-1 text-lg font-bold text-white">{selection.odd}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to={`/sports/event/${event.id}`}
            className="flex-1 rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Open Match
          </Link>

          <Link
            to="/sports/bets"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-gray-200 transition hover:bg-white/10"
          >
            My Bets
          </Link>
        </div>
      </div>
    </article>
  );
}