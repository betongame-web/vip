import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSportsbook } from '@/contexts/SportsbookContext';
import { formatMatchDate, formatMoney } from '@/pages/Sport/sportsUtils';

export default function BettingBulletin() {
  const {
    bets,
    totalStake,
    totalOdds,
    possiblePayout,
    updateBetStake,
    updateAllStakes,
    removeBet,
    clearBets,
    placeBets,
  } = useSportsbook();

  const [notice, setNotice] = useState('');

  function handlePlace(mode) {
    const result = placeBets(mode);
    setNotice(
      result.ok
        ? `${mode === 'single' ? 'Single' : 'Multiple'} ticket placed successfully.`
        : result.message,
    );
  }

  return (
    <aside className="card-surface sticky top-24 p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Sports Betslip</p>
          <h3 className="mt-2 text-xl font-bold text-white">Betting Bulletin</h3>
          <p className="mt-1 text-sm text-gray-400">Selections: {bets.length}</p>
        </div>

        {bets.length ? (
          <button
            type="button"
            onClick={clearBets}
            className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-300 transition hover:bg-red-500/20"
          >
            Clear All
          </button>
        ) : null}
      </div>

      {notice ? (
        <div className="mb-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {notice}
        </div>
      ) : null}

      {!bets.length ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-6 text-center">
          <p className="text-sm font-medium text-white">No selections yet</p>
          <p className="mt-2 text-sm leading-7 text-gray-400">
            Pick odds from any sports event to build your local betslip.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link
              to="/sports/live"
              className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              Open Live
            </Link>

            <Link
              to="/sports/search"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-white/10"
            >
              Search Match
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 grid grid-cols-3 gap-2">
            {[10, 25, 50].map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => updateAllStakes(amount)}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-gray-200 transition hover:bg-white/10"
              >
                Stake {amount}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {bets.map((bet) => (
              <div key={bet.betId} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {bet.homeTeam} vs {bet.awayTeam}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {bet.marketName} • {bet.selectionLabel}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">{formatMatchDate(bet.eventDate)}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeBet(bet.betId)}
                    className="rounded-full border border-red-500/20 bg-red-500/10 px-2 py-1 text-[11px] font-medium text-red-300 transition hover:bg-red-500/20"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-[1fr_96px] gap-3">
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-3">
                    <p className="text-xs text-emerald-200">Selected Odd</p>
                    <p className="mt-1 text-lg font-bold text-emerald-300">{bet.odd}</p>
                  </div>

                  <input
                    type="number"
                    value={bet.stake}
                    min="0"
                    onChange={(event) => updateBetStake(bet.betId, event.target.value)}
                    className="rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm text-white outline-none transition focus:border-emerald-500/40"
                    placeholder="Stake"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-4 text-gray-300">
                <span>Total Stake</span>
                <span className="font-semibold text-white">{formatMoney(totalStake)}</span>
              </div>

              <div className="flex justify-between gap-4 text-gray-300">
                <span>Total Odds</span>
                <span className="font-semibold text-white">{totalOdds || 0}</span>
              </div>

              <div className="flex justify-between gap-4 text-base font-semibold text-white">
                <span>Possible Win</span>
                <span className="text-emerald-300">{formatMoney(possiblePayout)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handlePlace('single')}
              className="rounded-xl bg-white/8 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
            >
              Place Single
            </button>

            <button
              type="button"
              onClick={() => handlePlace('multiple')}
              className="rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Place Multiple
            </button>
          </div>

          <p className="mt-4 text-xs leading-6 text-gray-500">
            This is a frontend/local sportsbook betslip. Later you can connect it to a real backend
            bet placement API.
          </p>
        </>
      )}
    </aside>
  );
}