import { Link } from 'react-router-dom';
import { formatMatchDate } from '@/pages/Sport/sportsUtils';

export default function SportCompactCard({ event, rightSlot }) {
  return (
    <div className="card-surface p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">{event.leagueCountry} • {event.leagueName}</p>
          <Link to={`/sports/event/${event.id}`} className="mt-1 block text-lg font-semibold text-white">
            {event.teamHomeName} vs {event.teamAwayName}
          </Link>
          <p className="mt-1 text-sm text-slate-400">{event.statusLong} • {formatMatchDate(event.date)}</p>
        </div>
        <div>{rightSlot}</div>
      </div>
    </div>
  );
}
