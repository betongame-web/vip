import { Link } from 'react-router-dom';
import { useSportsbook } from '@/contexts/SportsbookContext';
import {
  formatMatchDate,
  getStatusTone,
  initials,
} from '@/pages/Sport/sportsUtils';

function SelectionButton({
  event,
  marketIndex,
  selectionIndex,
  selection,
  active,
  onToggle,
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(event, marketIndex, selectionIndex)}
      className={`rounded-xl border px-3 py-3 text-left transition ${
        active
          ? 'border-emerald-400 bg-emerald-400/20 text-emerald-200'
          : 'border-white/10 bg-white/[0.03] text-gray-200 hover:bg-white/10'
      }`}
    >
      <div className="text-xs text-gray-400">{selection.value}</div>
      <div className="mt-1 text-lg font-bold">{selection.odd}</div>
      <div className="mt-1 text-[11px]">
        {active ? 'Added' : 'Tap to add'}
      </div>
    </button>
  );
}

export default function SportEventCard({ event }) {
  const { toggleFavorite, isFavorite, toggleBet, isSelectionActive } =
    useSportsbook();

  const favorite = isFavorite(event.id);
  const markets = event?.markets || [];
  const visibleMarkets = markets.slice(0, 2);

  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-brandgray-800/80 shadow-lg">
      <div className="border-b border-white/10 bg-black/20 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
              {event.leagueCountry} • {event.leagueName}
            </p>
            <p className={`mt-2 text-sm font-semibold ${getStatusTone(event.statusLong)}`}>
              {event.statusLong} • {formatMatchDate(event.date)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => toggleFavorite(event.id)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              favorite
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                : 'border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10'
            }`}
          >
            {favorite ? 'Saved' : 'Favorite'}
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">
              {initials(event.teamHomeName)}
            </div>

            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-400">
                Home
              </p>
              <h3 className="truncate text-lg font-bold text-white">
                {event.teamHomeName}
              </h3>
            </div>
          </div>

          <div className="text-center">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                Score
              </p>
              <p className="mt-1 text-2xl font-bold text-white">
                {event.goalsHome} - {event.goalsAway}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-start gap-3 md:justify-end">
            <div className="min-w-0 text-right">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-400">
                Away
              </p>
              <h3 className="truncate text-lg font-bold text-white">
                {event.teamAwayName}
              </h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">
              {initials(event.teamAwayName)}
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-300">
          <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
            Round: {event.leagueRound}
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
            Season: {event.leagueSeason}
          </div>

          {event.stadium ? (
            <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
              {event.stadium}
            </div>
          ) : null}
        </div>

        <div className="mt-6 space-y-4">
          {visibleMarkets.length ? (
            visibleMarkets.map((market, marketIndex) => (
              <div
                key={market.id}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h4 className="text-sm font-semibold text-white">{market.name}</h4>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-gray-300">
                    {market.values.length} options
                  </span>
                </div>

                <div
                  className={`grid gap-3 ${
                    market.values.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
                  }`}
                >
                  {market.values.slice(0, 3).map((selection, selectionIndex) => (
                    <SelectionButton
                      key={selection.id}
                      event={event}
                      marketIndex={marketIndex}
                      selectionIndex={selectionIndex}
                      selection={selection}
                      active={isSelectionActive(event.id, market.id, selection.id)}
                      onToggle={toggleBet}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-gray-300">
              No betting market is available for this event right now.
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to={`/sports/event/${event.id}`}
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Open Match
          </Link>

          <Link
            to="/sports/bets"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-white/10"
          >
            My Bets
          </Link>
        </div>
      </div>
    </article>
  );
}