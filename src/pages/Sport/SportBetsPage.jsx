import BaseLayout from '@/components/layouts/BaseLayout';
import EmptyState from '@/components/common/EmptyState';
import { useSportsbook } from '@/contexts/SportsbookContext';
import SportsHeaderNav from '@/pages/Sport/components/SportsHeaderNav';
import SportsHeaderOptions from '@/pages/Sport/components/SportsHeaderOptions';
import BettingBulletin from '@/pages/Sport/components/BettingBulletin';
import { formatMatchDate, formatMoney } from '@/pages/Sport/sportsUtils';

export default function SportBetsPage() {
  const { betHistory } = useSportsbook();

  return (
    <BaseLayout>
      <SportsHeaderNav />
      <SportsHeaderOptions />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <div className="mb-5 card-surface p-5">
            <h1 className="text-3xl font-bold">My bets</h1>
            <p className="mt-2 text-sm text-slate-400">Placed tickets are stored locally so this module works without a live backend.</p>
          </div>

          {betHistory.length ? (
            <div className="space-y-4">
              {betHistory.map((ticket) => (
                <div key={ticket.ticketId} className="card-surface p-5">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">{ticket.type} • {ticket.ticketId}</p>
                      <p className="mt-1 text-sm text-slate-300">Placed {formatMatchDate(ticket.placedAt)}</p>
                    </div>
                    <div className="rounded-full bg-amber-500/15 px-3 py-1 text-sm font-semibold text-amber-300">{ticket.status}</div>
                  </div>
                  <div className="space-y-3">
                    {ticket.selections.map((bet) => (
                      <div key={bet.betId} className="rounded-2xl bg-white/5 p-3 text-sm text-slate-300">
                        <div className="font-semibold text-white">{bet.homeTeam} vs {bet.awayTeam}</div>
                        <div className="mt-1">{bet.marketName} • {bet.selectionLabel}</div>
                        <div className="mt-1 text-slate-400">Stake {formatMoney(bet.stake)} • Odd {bet.odd}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-300 md:grid-cols-3">
                    <div className="rounded-2xl bg-slate-950/70 p-3">Stake: <strong className="text-white">{formatMoney(ticket.totalStake)}</strong></div>
                    <div className="rounded-2xl bg-slate-950/70 p-3">Odds: <strong className="text-white">{ticket.totalOdds}</strong></div>
                    <div className="rounded-2xl bg-slate-950/70 p-3">Possible win: <strong className="text-white">{formatMoney(ticket.possibleWin)}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="No tickets yet" description="Build a betslip and place a single or multiple ticket first." />
          )}
        </div>
        <BettingBulletin />
      </div>
    </BaseLayout>
  );
}
