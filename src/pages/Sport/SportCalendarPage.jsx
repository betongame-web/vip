import { useMemo, useState } from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import { useSportsbook } from '@/contexts/SportsbookContext';
import SportsHeaderNav from '@/pages/Sport/components/SportsHeaderNav';
import SportsHeaderOptions from '@/pages/Sport/components/SportsHeaderOptions';
import SportCompactCard from '@/pages/Sport/components/SportCompactCard';
import BettingBulletin from '@/pages/Sport/components/BettingBulletin';
import { formatDayLabel } from '@/pages/Sport/sportsUtils';

export default function SportCalendarPage() {
  const { groupedByDate } = useSportsbook();
  const dayKeys = Object.keys(groupedByDate).sort();
  const [selectedDay, setSelectedDay] = useState(dayKeys[0] || '');

  const events = useMemo(() => groupedByDate[selectedDay] || [], [groupedByDate, selectedDay]);

  return (
    <BaseLayout>
      <SportsHeaderNav />
      <SportsHeaderOptions />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <div className="mb-5 card-surface p-5">
            <h1 className="text-3xl font-bold">Calendar</h1>
            <p className="mt-2 text-sm text-slate-400">Browse fixtures day by day.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {dayKeys.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`rounded-full px-3 py-2 text-sm ${selectedDay === day ? 'bg-emerald-500 text-slate-950' : 'bg-white/6 text-slate-300'}`}
                >
                  {formatDayLabel(day)}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {events.map((event) => (
              <SportCompactCard
                key={event.id}
                event={event}
                rightSlot={<div className="text-sm text-slate-300">{event.markets[0].values.map((value) => value.odd).join(' • ')}</div>}
              />
            ))}
          </div>
        </div>
        <BettingBulletin />
      </div>
    </BaseLayout>
  );
}
