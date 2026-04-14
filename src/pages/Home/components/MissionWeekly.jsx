import MissionCard from '@/pages/Home/components/MissionCard';

export default function MissionWeekly({ missions = [], onOpen }) {
  return (
    <section className="card-surface p-5">
      <h2 className="text-2xl font-bold text-white">Weekly missions</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {missions.length ? (
          missions.map((mission) => (
            <MissionCard key={mission.id || mission.title} mission={mission} onOpen={onOpen} />
          ))
        ) : (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-gray-300">
            No weekly missions available.
          </div>
        )}
      </div>
    </section>
  );
}
