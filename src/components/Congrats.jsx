export default function Congrats({ prize = 'Reward', onClose }) {
  return (
    <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-center">
      <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">Congratulations</p>
      <h3 className="mt-3 text-3xl font-bold text-white">You won {prize}</h3>
      <p className="mt-3 text-sm leading-7 text-gray-200">
        This is a frontend-ready celebration block for the landing spin result.
      </p>
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="mt-5 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
        >
          Close
        </button>
      ) : null}
    </div>
  );
}
