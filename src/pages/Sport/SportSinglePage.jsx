import { Link, useParams } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import EmptyState from '@/components/common/EmptyState';
import { useSportsbook } from '@/contexts/SportsbookContext';
import SportsHeaderNav from '@/pages/Sport/components/SportsHeaderNav';
import SportsHeaderOptions from '@/pages/Sport/components/SportsHeaderOptions';
import BettingBulletin from '@/pages/Sport/components/BettingBulletin';
import { formatMatchDate, initials } from '@/pages/Sport/sportsUtils';

export default function SportSinglePage() {
  const { id } = useParams();
  const { events, toggleBet, isSelectionActive, toggleFavorite, isFavorite } = useSportsbook();
  const event = events.find((item) => String(item.id) === String(id));

  if (!event) {
    return (
      <BaseLayout>
        <SportsHeaderNav />
        <SportsHeaderOptions />
        <EmptyState title="Match not found" description="This event is missing from the current sportsbook data." />
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <SportsHeaderNav />
      <SportsHeaderOptions />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <div className="card-surface mb-5 p-6">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">{event.leagueCountry} • {event.leagueName}</p>
                <h1 className="mt-2 text-3xl font-bold">{event.teamHomeName} vs {event.teamAwayName}</h1>
                <p className="mt-2 text-sm text-slate-400">{event.statusLong} • {formatMatchDate(event.date)} • {event.stadium}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleFavorite(event.id)}
                className={`rounded-full px-4 py-2 text-sm ${isFavorite(event.id) ? 'bg-amber-400/20 text-amber-300' : 'bg-white/6 text-slate-300'}`}
              >
                {isFavorite(event.id) ? 'Saved to favorites' : 'Save to favorites'}
              </button>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-3xl bg-slate-950/70 p-6 text-center">
              <div>
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/8 text-lg font-bold">{initials(event.teamHomeName)}</div>
                <p className="font-semibold">{event.teamHomeName}</p>
              </div>
              <div>
                <div className="text-4xl font-bold">{event.goalsHome} : {event.goalsAway}</div>
                <div className="mt-2 text-xs uppercase tracking-wide text-slate-400">{event.leagueRound}</div>
              </div>
              <div>
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/8 text-lg font-bold">{initials(event.teamAwayName)}</div>
                <p className="font-semibold">{event.teamAwayName}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {event.markets.map((market, marketIndex) => (
              <div key={market.id} className="card-surface p-5">
                <h2 className="mb-4 text-xl font-bold">{market.name}</h2>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {market.values.map((selection, selectionIndex) => (
                    <button
                      key={selection.id}
                      type="button"
                      onClick={() => toggleBet(event, marketIndex, selectionIndex)}
                      className={`rounded-2xl border p-4 text-left transition ${isSelectionActive(event.id, market.id, selection.id) ? 'border-emerald-400 bg-emerald-500/15 text-emerald-200' : 'border-white/10 bg-white/5 text-white hover:bg-white/10'}`}
                    >
                      <div className="text-sm text-slate-400">{selection.value}</div>
                      <div className="mt-2 text-2xl font-bold">{selection.odd}</div>
                      <div className="mt-2 text-xs text-slate-500">Tap to add or remove from betslip</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 card-surface p-5 text-sm text-slate-300">
            <p>{event.description}</p>
            <Link to="/sports/calendar" className="mt-3 inline-block text-emerald-300">See more scheduled fixtures</Link>
          </div>
        </div>
        <BettingBulletin />
      </div>
    </BaseLayout>
  );
}
