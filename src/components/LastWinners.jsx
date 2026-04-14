import LastWinner from '@/components/landing-spin/LastWinner';

export default function LastWinners({ winners = [] }) {
  return (
    <section className="card-surface p-5">
      <h2 className="text-2xl font-bold text-white">Last winners</h2>
      <div className="mt-5 space-y-3">
        {winners.length ? (
          winners.map((winner, index) => (
            <LastWinner key={winner.id || `${winner.name || 'winner'}-${index}`} winner={winner} />
          ))
        ) : (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-gray-300">
            No winners yet.
          </div>
        )}
      </div>
    </section>
  );
}
