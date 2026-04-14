import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import { useSportsbook } from '@/contexts/SportsbookContext';
import SportsHeaderNav from '@/pages/Sport/components/SportsHeaderNav';
import SportsHeaderOptions from '@/pages/Sport/components/SportsHeaderOptions';
import BettingBulletin from '@/pages/Sport/components/BettingBulletin';
import { formatMoney } from '@/pages/Sport/sportsUtils';

function statusTone(status) {
  if (status === 'won') {
    return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
  }
  if (status === 'lost') {
    return 'border-red-500/30 bg-red-500/10 text-red-300';
  }
  return 'border-amber-500/30 bg-amber-500/10 text-amber-300';
}

function typeTone(type) {
  return type === 'multiple'
    ? 'border-violet-500/30 bg-violet-500/10 text-violet-300'
    : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300';
}

export default function SportBetsPage() {
  const { bets, pendingBets, settledBets } = useSportsbook();

  const totalStake = pendingBets.reduce((sum, bet) => sum + Number(bet.stake || 0), 0);
  const totalPotential = pendingBets.reduce(
    (sum, bet) => sum + Number(bet.potentialReturn || 0),
    0,
  );

  return (
    <BaseLayout>
      <SportsHeaderNav />
      <SportsHeaderOptions />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="card-surface overflow-hidden">
            <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
              <div>
                <span className="inline-flex rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                  My Bets
                </span>

                <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Review pending slips, settled results, and your local sportsbook bet history
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                  This page shows the current local sportsbook history, including pending slips,
                  settled bet results, stake totals, and potential returns from selections already placed.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/sports"
                    className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
                  >
                    Sports Overview
                  </Link>

                  <Link
                    to="/sports/live"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    Live Matches
                  </Link>

                  <Link
                    to="/sports/feed"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    Betting Feed
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Bet Summary</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Pending</p>
                      <p className="mt-2 text-2xl font-bold text-white">{pendingBets.length}</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Settled</p>
                      <p className="mt-2 text-2xl font-bold text-white">{settledBets.length}</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Stake</p>
                      <p className="mt-2 text-2xl font-bold text-white">{formatMoney(totalStake)}</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Potential</p>
                      <p className="mt-2 text-2xl font-bold text-white">
                        {formatMoney(totalPotential)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Slip Status</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-white">{bets.length}</p>
                      <p className="text-sm text-gray-300">Total recorded slips</p>
                    </div>

                    <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                      Local History
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Pending Visibility',
                description:
                  'Users can clearly see which slips are still awaiting result or settlement.',
              },
              {
                title: 'Result History',
                description:
                  'Settled bets stay visible so win or loss records are easier to review later.',
              },
              {
                title: 'Stake Tracking',
                description:
                  'Potential return and stake totals help make the sportsbook feel more complete.',
              },
            ].map((item) => (
              <div key={item.title} className="card-surface p-5">
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-300">{item.description}</p>
              </div>
            ))}
          </section>

          <section className="card-surface p-6">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Pending bets</h2>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  Slips that are still open and waiting for final result.
                </p>
              </div>

              <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                {pendingBets.length} open
              </span>
            </div>

            {pendingBets.length ? (
              <div className="space-y-4">
                {pendingBets.map((bet) => (
                  <div
                    key={bet.id}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-semibold text-white">
                            {bet.type === 'multiple' ? 'Multiple Bet' : 'Single Bet'}
                          </h3>

                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${typeTone(
                              bet.type,
                            )}`}
                          >
                            {bet.type}
                          </span>

                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${statusTone(
                              bet.status,
                            )}`}
                          >
                            {bet.status}
                          </span>
                        </div>

                        <div className="mt-4 space-y-3">
                          {bet.selections.map((selection) => (
                            <div
                              key={selection.id}
                              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                            >
                              <p className="text-sm font-medium text-white">
                                {selection.homeTeam} vs {selection.awayTeam}
                              </p>
                              <p className="mt-1 text-sm text-gray-300">
                                {selection.marketName} • {selection.selectionValue}
                              </p>
                              <p className="mt-1 text-xs text-gray-400">
                                Odd: {selection.odd}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="min-w-[180px] rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-gray-300">
                        <div className="flex justify-between gap-4">
                          <span>Stake</span>
                          <span className="font-semibold text-white">
                            {formatMoney(bet.stake)}
                          </span>
                        </div>

                        <div className="mt-2 flex justify-between gap-4">
                          <span>Total Odds</span>
                          <span className="font-semibold text-white">{bet.totalOdds.toFixed(2)}</span>
                        </div>

                        <div className="mt-2 flex justify-between gap-4">
                          <span>Potential</span>
                          <span className="font-semibold text-emerald-300">
                            {formatMoney(bet.potentialReturn)}
                          </span>
                        </div>

                        <div className="mt-2 flex justify-between gap-4">
                          <span>Placed</span>
                          <span className="font-semibold text-white">{bet.placedAtLabel}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-gray-300">
                No pending bets yet. Add selections in the sportsbook and place a local slip first.
              </div>
            )}
          </section>

          <section className="card-surface p-6">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Settled bets</h2>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  Historical slips that already received a win or loss result.
                </p>
              </div>

              <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                {settledBets.length} settled
              </span>
            </div>

            {settledBets.length ? (
              <div className="space-y-4">
                {settledBets.map((bet) => (
                  <div
                    key={bet.id}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-semibold text-white">
                            {bet.type === 'multiple' ? 'Multiple Bet' : 'Single Bet'}
                          </h3>

                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${typeTone(
                              bet.type,
                            )}`}
                          >
                            {bet.type}
                          </span>

                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${statusTone(
                              bet.status,
                            )}`}
                          >
                            {bet.status}
                          </span>
                        </div>

                        <div className="mt-4 space-y-3">
                          {bet.selections.map((selection) => (
                            <div
                              key={selection.id}
                              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                            >
                              <p className="text-sm font-medium text-white">
                                {selection.homeTeam} vs {selection.awayTeam}
                              </p>
                              <p className="mt-1 text-sm text-gray-300">
                                {selection.marketName} • {selection.selectionValue}
                              </p>
                              <p className="mt-1 text-xs text-gray-400">
                                Odd: {selection.odd}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="min-w-[180px] rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-gray-300">
                        <div className="flex justify-between gap-4">
                          <span>Stake</span>
                          <span className="font-semibold text-white">
                            {formatMoney(bet.stake)}
                          </span>
                        </div>

                        <div className="mt-2 flex justify-between gap-4">
                          <span>Total Odds</span>
                          <span className="font-semibold text-white">{bet.totalOdds.toFixed(2)}</span>
                        </div>

                        <div className="mt-2 flex justify-between gap-4">
                          <span>Result</span>
                          <span
                            className={
                              bet.status === 'won' ? 'font-semibold text-emerald-300' : 'font-semibold text-red-300'
                            }
                          >
                            {bet.status === 'won'
                              ? formatMoney(bet.potentialReturn)
                              : formatMoney(0)}
                          </span>
                        </div>

                        <div className="mt-2 flex justify-between gap-4">
                          <span>Placed</span>
                          <span className="font-semibold text-white">{bet.placedAtLabel}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-gray-300">
                No settled bets yet. Place and settle some local slips first.
              </div>
            )}
          </section>

          <section className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">Bet history notes</h2>

            <div className="mt-5 space-y-4">
              {[
                'This page is connected to the local sportsbook context, not a real settlement API yet.',
                'Pending and settled slips are separated so the history is easier to read.',
                'Later this page can be connected to a backend bet history endpoint.',
                'Stake, odds, and potential return calculations are already shown clearly.',
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-slate-950">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <BettingBulletin />
      </div>
    </BaseLayout>
  );
}