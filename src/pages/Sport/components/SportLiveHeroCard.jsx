import { Link } from 'react-router-dom';
import { useSportsbook } from '@/contexts/SportsbookContext';
import { formatMatchDate, initials } from '@/pages/Sport/sportsUtils';

export default function SportLiveHeroCard({ event }) {
  const { toggleBet, isSelectionActive } = useSportsbook();
  const market = event.markets[0];

  return (
    <div className="card-surface min-w-[320px] flex-1 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">{event.leagueCountry} • {event.leagueName}</p>
          <p className="mt-1 text-sm font-semibold text-red-400">LIVE • {event.statusLong}</p>
        </div>
        <Link to={`/sports/event/${event.id}`} className="text-sm text-emerald-300">Open match</Link>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-sm font-bold">{initials(event.teamHomeName)}</div>
          <div className="text-sm font-semibold">{event.teamHomeName}</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">{event.goalsHome} : {event.goalsAway}</div>
          <div className="mt-1 text-xs text-slate-400">{formatMatchDate(event.date)}</div>
        </div>
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-sm font-bold">{initials(event.teamAwayName)}</div>
          <div className="text-sm font-semibold">{event.teamAwayName}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {market.values.map((selection, index) => (
          <button
            key={selection.id}
            type="button"
            onClick={() => toggleBet(event, 0, index)}
            className={`rounded-xl px-3 py-3 text-left ${isSelectionActive(event.id, market.id, selection.id) ? 'bg-emerald-500/20 text-emerald-200' : 'bg-white/6 text-slate-200 hover:bg-white/10'}`}
          >
            <div className="text-xs text-slate-400">{selection.value}</div>
            <div className="mt-1 text-lg font-bold">{selection.odd}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
