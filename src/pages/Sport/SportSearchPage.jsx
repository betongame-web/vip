import { useMemo, useState } from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import { useSportsbook } from '@/contexts/SportsbookContext';
import SportsHeaderNav from '@/pages/Sport/components/SportsHeaderNav';
import SportsHeaderOptions from '@/pages/Sport/components/SportsHeaderOptions';
import SportCompactCard from '@/pages/Sport/components/SportCompactCard';
import BettingBulletin from '@/pages/Sport/components/BettingBulletin';

export default function SportSearchPage() {
  const { events } = useSportsbook();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return events;
    return events.filter((event) => [event.teamHomeName, event.teamAwayName, event.leagueName, event.leagueCountry]
      .some((value) => value.toLowerCase().includes(q)));
  }, [events, query]);

  return (
    <BaseLayout>
      <SportsHeaderNav />
      <SportsHeaderOptions />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <div className="mb-5 card-surface p-5">
            <h1 className="text-3xl font-bold">Search events</h1>
            <p className="mt-2 text-sm text-slate-400">Find by team, league or country.</p>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Liverpool, La Liga, Brazil..."
              className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
            />
          </div>
          <div className="space-y-4">
            {results.map((event) => (
              <SportCompactCard
                key={event.id}
                event={event}
                rightSlot={<span className="rounded-full bg-white/6 px-3 py-2 text-sm text-slate-300">{event.statusLong}</span>}
              />
            ))}
          </div>
        </div>
        <BettingBulletin />
      </div>
    </BaseLayout>
  );
}
