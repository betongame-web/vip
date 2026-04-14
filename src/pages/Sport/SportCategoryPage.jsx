import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import { useSportsbook } from '@/contexts/SportsbookContext';
import SportsHeaderNav from '@/pages/Sport/components/SportsHeaderNav';
import SportsHeaderOptions from '@/pages/Sport/components/SportsHeaderOptions';
import SportCardList from '@/pages/Sport/components/SportCardList';
import BettingBulletin from '@/pages/Sport/components/BettingBulletin';

function slugify(value = '') {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export default function SportCategoryPage() {
  const { category } = useParams();
  const { events } = useSportsbook();

  const filtered = useMemo(() => {
    if (!category || category === 'all') return events;
    return events.filter((event) => {
      return (
        slugify(event.category) === slugify(category) ||
        slugify(event.leagueName) === slugify(category)
      );
    });
  }, [events, category]);

  return (
    <BaseLayout>
      <SportsHeaderNav />
      <SportsHeaderOptions />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="card-surface p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Sports Category</p>
                <h1 className="mt-2 text-3xl font-bold text-white">{category || 'All sports'}</h1>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  Category-based sports listing from the current local sportsbook feed.
                </p>
              </div>
              <Link to="/sports" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10">Sports Overview</Link>
            </div>
          </section>
          <SportCardList title="Category events" subtitle="Filtered events for this sports category." events={filtered} />
        </div>
        <BettingBulletin />
      </div>
    </BaseLayout>
  );
}
