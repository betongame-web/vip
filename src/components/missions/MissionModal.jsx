export default function MissionModal({ open = false, mission = null, onClose }) {
  if (!open || !mission) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-brandgray-900 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Mission Details</p>
            <h3 className="mt-2 text-2xl font-bold text-white">{mission.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-200 transition hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <p className="mt-4 text-sm leading-7 text-gray-300">{mission.description}</p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs text-gray-400">Reward</p>
            <p className="mt-2 text-lg font-bold text-white">{mission.reward || 'Reward item'}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs text-gray-400">Status</p>
            <p className="mt-2 text-lg font-bold text-white">{mission.status || 'Active'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
