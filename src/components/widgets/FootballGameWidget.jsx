import { Link } from 'react-router-dom';
import { useSportsbook } from '@/contexts/SportsbookContext';

export default function FootballGameWidget() {
  const { liveEvents, upcomingEvents } = useSportsbook();
  const items = [...liveEvents, ...upcomingEvents].slice(0, 4);

  return (
    <section className="card-surface p-5">
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">Football Widget</h2>
          <p className="mt-2 text-sm leading-7 text-gray-300">
            Quick football preview from the current sports context.
          </p>
        </div>
        <Link
          to="/sports"
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
        >
          Open Sports
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((event) => (
          <div key={event.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs text-gray-400">{event.leagueName}</p>
            <h3 className="mt-2 text-sm font-semibold text-white">
              {event.teamHomeName} vs {event.teamAwayName}
            </h3>
            <p className="mt-2 text-xs text-gray-400">{event.statusLong}</p>
            <Link
              to={`/sports/event/${event.id}`}
              className="mt-4 inline-flex rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Open Match
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
