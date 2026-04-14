export default function MissionCard({ mission, onOpen }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Mission</p>
      <h3 className="mt-2 text-lg font-semibold text-white">{mission.title}</h3>
      <p className="mt-3 text-sm leading-7 text-gray-300">{mission.description}</p>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
          {mission.reward || 'Reward'}
        </span>
        <button
          type="button"
          onClick={() => onOpen?.(mission)}
          className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
        >
          Open
        </button>
      </div>
    </div>
  );
}
