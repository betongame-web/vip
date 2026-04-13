import BaseLayout from '@/components/layouts/BaseLayout';
import { useSportsbook } from '@/contexts/SportsbookContext';
import SportsHeaderNav from '@/pages/Sport/components/SportsHeaderNav';
import SportsHeaderOptions from '@/pages/Sport/components/SportsHeaderOptions';
import SportCompactCard from '@/pages/Sport/components/SportCompactCard';
import BettingBulletin from '@/pages/Sport/components/BettingBulletin';

export default function SportBettingFeedPage() {
  const { betHistory, events } = useSportsbook();
  const feedItems = [
    ...betHistory.slice(0, 4).map((ticket) => ({
      id: ticket.ticketId,
      label: `${ticket.type} ticket ${ticket.ticketId} was placed`,
      detail: `${ticket.selections.length} selection(s) • ${ticket.status}`,
    })),
    ...events.slice(0, 6).map((event) => ({
      id: `event-${event.id}`,
      label: `${event.teamHomeName} vs ${event.teamAwayName}`,
      detail: `${event.leagueName} • ${event.statusLong}`,
    })),
  ];

  return (
    <BaseLayout>
      <SportsHeaderNav />
      <SportsHeaderOptions />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <div className="mb-5 card-surface p-5">
            <h1 className="text-3xl font-bold">Betting feed</h1>
            <p className="mt-2 text-sm text-slate-400">Recent ticket activity and highlighted fixtures.</p>
          </div>
          <div className="space-y-4">
            {feedItems.map((item, index) => (
              <div key={item.id} className="card-surface p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{item.label}</p>
                    <p className="text-sm text-slate-400">{item.detail}</p>
                  </div>
                  <span className="rounded-full bg-white/6 px-3 py-1 text-xs text-slate-300">#{index + 1}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {events.slice(0, 3).map((event) => (
              <SportCompactCard key={event.id} event={event} rightSlot={<span className="text-sm text-slate-300">{event.markets[0].values[0].odd} • {event.markets[0].values[1].odd} • {event.markets[0].values[2].odd}</span>} />
            ))}
          </div>
        </div>
        <BettingBulletin />
      </div>
    </BaseLayout>
  );
}
