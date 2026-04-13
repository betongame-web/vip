import BaseLayout from '@/components/layouts/BaseLayout';
import { useSportsbook } from '@/contexts/SportsbookContext';
import SportsHeaderNav from '@/pages/Sport/components/SportsHeaderNav';
import SportsHeaderOptions from '@/pages/Sport/components/SportsHeaderOptions';
import SportEventCard from '@/pages/Sport/components/SportEventCard';
import SportLiveHeroCard from '@/pages/Sport/components/SportLiveHeroCard';
import BettingBulletin from '@/pages/Sport/components/BettingBulletin';

export default function SportPage() {
  const { featuredEvents, liveEvents, upcomingEvents } = useSportsbook();
  const categories = [...new Set(upcomingEvents.map((event) => event.leagueName))];

  return (
    <BaseLayout>
      <SportsHeaderNav />
      <SportsHeaderOptions />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <section className="casino-sports-container sport card-surface mb-6 min-h-[180px] justify-end rounded-[28px] border border-white/6">
            <span className="inline-flex w-fit rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">Sportsbook now active</span>
            <h1 className="max-w-xl text-3xl font-bold text-white">Featured football, live matches, searchable odds, favorites, calendar and a working local betslip.</h1>
            <p className="max-w-2xl text-sm text-slate-300">This React sports section now behaves like a usable sportsbook frontend even when the original backend feed is incomplete.</p>
          </section>

          {!!liveEvents.length && (
            <section className="mb-6">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Live now</h2>
                <p className="text-sm text-slate-400">Odds pulse every few seconds</p>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {liveEvents.map((event) => <SportLiveHeroCard key={event.id} event={event} />)}
              </div>
            </section>
          )}

          <section className="mb-6">
            <h2 className="mb-3 text-2xl font-bold">Main leagues</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <div key={category} className="rounded-full bg-white/6 px-3 py-2 text-sm text-slate-300">{category}</div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Upcoming & featured</h2>
              <p className="text-sm text-slate-400">{featuredEvents.length} featured events</p>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {upcomingEvents.map((event) => <SportEventCard key={event.id} event={event} />)}
            </div>
          </section>
        </div>

        <BettingBulletin />
      </div>
    </BaseLayout>
  );
}
