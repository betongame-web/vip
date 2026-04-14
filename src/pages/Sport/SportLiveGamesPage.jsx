import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import { useSportsbook } from '@/contexts/SportsbookContext';
import SportsHeaderNav from '@/pages/Sport/components/SportsHeaderNav';
import SportsHeaderOptions from '@/pages/Sport/components/SportsHeaderOptions';
import SportCardList from '@/pages/Sport/components/SportCardList';
import BettingBulletin from '@/pages/Sport/components/BettingBulletin';

export default function SportLiveGamesPage() {
  const { liveEvents } = useSportsbook();

  return (
    <BaseLayout>
      <SportsHeaderNav />
      <SportsHeaderOptions />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="card-surface p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Live Games</p>
                <h1 className="mt-2 text-3xl font-bold text-white">Live sports games</h1>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  Alternative live games page for the sportsbook feed.
                </p>
              </div>
              <Link to="/sports/live" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10">Live Overview</Link>
            </div>
          </section>
          <SportCardList title="Live events" subtitle="Currently active local sportsbook events." events={liveEvents} />
        </div>
        <BettingBulletin />
      </div>
    </BaseLayout>
  );
}
