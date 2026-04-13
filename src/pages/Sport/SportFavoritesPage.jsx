import BaseLayout from '@/components/layouts/BaseLayout';
import { useSportsbook } from '@/contexts/SportsbookContext';
import SportsHeaderNav from '@/pages/Sport/components/SportsHeaderNav';
import SportsHeaderOptions from '@/pages/Sport/components/SportsHeaderOptions';
import SportEventCard from '@/pages/Sport/components/SportEventCard';
import BettingBulletin from '@/pages/Sport/components/BettingBulletin';
import EmptyState from '@/components/common/EmptyState';

export default function SportFavoritesPage() {
  const { favoriteEvents } = useSportsbook();

  return (
    <BaseLayout>
      <SportsHeaderNav />
      <SportsHeaderOptions />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <div className="mb-5 card-surface p-5">
            <h1 className="text-3xl font-bold">Favorite matches</h1>
            <p className="mt-2 text-sm text-slate-400">Saved events stay here for quick access.</p>
          </div>
          {favoriteEvents.length ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {favoriteEvents.map((event) => <SportEventCard key={event.id} event={event} />)}
            </div>
          ) : (
            <EmptyState title="No favorite matches yet" description="Use the Save button on any match to keep it here." />
          )}
        </div>
        <BettingBulletin />
      </div>
    </BaseLayout>
  );
}
