import { useState } from 'react';
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

  const handlePlace = (mode) => {
    const result = placeBets(mode);
    setNotice(result.ok ? `${mode === 'single' ? 'Single' : 'Multiple'} ticket placed.` : result.message);
  };

  return (
    <aside className="card-surface sticky top-24 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">Betting Bulletin</h3>
          <p className="text-sm text-slate-400">Selections: {bets.length}</p>
        </div>
        {!!bets.length && (
          <button type="button" onClick={clearBets} className="text-sm text-red-300">Clear</button>
        )}
      </div>

      {notice ? <div className="mb-3 rounded-xl bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">{notice}</div> : null}

      {!bets.length ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-slate-400">
          Pick odds from any match to build your betslip.
        </div>
      ) : (
        <>
          <div className="mb-4 flex gap-2">
            <button type="button" onClick={() => updateAllStakes(10)} className="rounded-full bg-white/6 px-3 py-1 text-xs text-slate-300">Stake 10</button>
            <button type="button" onClick={() => updateAllStakes(25)} className="rounded-full bg-white/6 px-3 py-1 text-xs text-slate-300">Stake 25</button>
            <button type="button" onClick={() => updateAllStakes(50)} className="rounded-full bg-white/6 px-3 py-1 text-xs text-slate-300">Stake 50</button>
          </div>

          <div className="space-y-3">
            {bets.map((bet) => (
              <div key={bet.betId} className="rounded-2xl bg-white/5 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{bet.homeTeam} vs {bet.awayTeam}</p>
                    <p className="text-xs text-slate-400">{bet.marketName} • {bet.selectionLabel}</p>
                    <p className="mt-1 text-xs text-slate-500">{formatMatchDate(bet.eventDate)}</p>
                  </div>
                  <button type="button" onClick={() => removeBet(bet.betId)} className="text-xs text-red-300">Remove</button>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-sm font-semibold text-emerald-300">Odd {bet.odd}</span>
                  <input
                    type="number"
                    value={bet.stake}
                    min="0"
                    onChange={(event) => updateBetStake(bet.betId, event.target.value)}
                    className="w-24 rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 rounded-2xl bg-slate-950/70 p-4 text-sm">
            <div className="flex justify-between text-slate-300"><span>Total Stake</span><span>{formatMoney(totalStake)}</span></div>
            <div className="flex justify-between text-slate-300"><span>Total Odds</span><span>{totalOdds || 0}</span></div>
            <div className="flex justify-between font-semibold text-white"><span>Possible Win</span><span>{formatMoney(possiblePayout)}</span></div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => handlePlace('single')} className="rounded-xl bg-white/8 px-4 py-3 text-sm font-semibold text-white hover:bg-white/12">Place Single</button>
            <button type="button" onClick={() => handlePlace('multiple')} className="rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400">Place Multiple</button>
          </div>
        </>
      )}
    </aside>
  );
}
