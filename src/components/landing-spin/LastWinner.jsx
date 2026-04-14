export default function LastWinner({ winner }) {
  if (!winner) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-sm font-semibold text-white">{winner.name || winner.username || 'Player'}</p>
      <p className="mt-1 text-sm text-gray-300">
        Won {winner.prize || winner.title || 'Reward'}
      </p>
    </div>
  );
}
