import { Link } from 'react-router-dom';
import { useSportsbook } from '@/contexts/SportsbookContext';
import { formatMatchDate, getStatusTone, initials } from '@/pages/Sport/sportsUtils';

function TeamBadge({ name }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
        {initials(name)}
      </div>
      <span className="text-sm font-medium text-white">{name}</span>
    </div>
  );
}

export default function SportEventCard({ event }) {
  const { toggleBet, isSelectionActive, toggleFavorite, isFavorite } = useSportsbook();
  const resultMarket = event.markets[0];

  return (
    <div className="card-surface flex h-full flex-col p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">{event.leagueCountry} • {event.leagueName}</p>
          <p className={`mt-1 text-sm font-semibold ${getStatusTone(event.statusLong)}`}>{event.statusLong} • {formatMatchDate(event.date)}</p>
        </div>
        <button
          type="button"
          onClick={() => toggleFavorite(event.id)}
          className={`rounded-full px-2 py-1 text-xs ${isFavorite(event.id) ? 'bg-amber-400/20 text-amber-300' : 'bg-white/5 text-slate-300'}`}
        >
          {isFavorite(event.id) ? '★ Saved' : '☆ Save'}
        </button>
      </div>

      <Link to={`/sports/event/${event.id}`} className="mb-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <TeamBadge name={event.teamHomeName} />
          <span className="rounded-lg bg-white/6 px-2 py-1 text-sm text-slate-200">{event.goalsHome}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <TeamBadge name={event.teamAwayName} />
          <span className="rounded-lg bg-white/6 px-2 py-1 text-sm text-slate-200">{event.goalsAway}</span>
        </div>
      </Link>

      <div className="mt-auto grid grid-cols-3 gap-2">
        {resultMarket.values.map((selection, selectionIndex) => (
          <button
            key={selection.id}
            type="button"
            onClick={() => toggleBet(event, 0, selectionIndex)}
            className={`rounded-xl border px-2 py-2 text-left transition ${isSelectionActive(event.id, resultMarket.id, selection.id) ? 'border-emerald-400 bg-emerald-400/20 text-emerald-200' : 'border-white/8 bg-white/5 text-slate-200 hover:bg-white/10'}`}
          >
            <div className="truncate text-[11px] text-slate-400">{selection.value}</div>
            <div className="mt-1 text-base font-bold">{selection.odd}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
