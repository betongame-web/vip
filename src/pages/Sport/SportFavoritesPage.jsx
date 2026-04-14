import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import { useSportsbook } from '@/contexts/SportsbookContext';
import SportsHeaderNav from '@/pages/Sport/components/SportsHeaderNav';
import SportsHeaderOptions from '@/pages/Sport/components/SportsHeaderOptions';
import SportEventCard from '@/pages/Sport/components/SportEventCard';
import BettingBulletin from '@/pages/Sport/components/BettingBulletin';

export default function SportFavoritesPage() {
  const { favoriteEvents, liveEvents, upcomingEvents, bets } = useSportsbook();

  return (
    <BaseLayout>
      <SportsHeaderNav />
      <SportsHeaderOptions />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="card-surface overflow-hidden">
            <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
              <div>
                <span className="inline-flex rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-pink-300">
                  Favorite Matches
                </span>

                <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Keep your saved matches in one place and reopen them quickly
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                  This page shows all events the user marked as favorite from the local sportsbook
                  feed. It gives fast access to saved matches, live events, and future selections
                  without searching again.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/sports/search"
                    className="rounded-xl bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
                  >
                    Search Matches
                  </Link>

                  <Link
                    to="/sports/live"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    Live Matches
                  </Link>

                  <Link
                    to="/sports/bets"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    My Bets
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Favorites Summary</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Saved</p>
                      <p className="mt-2 text-2xl font-bold text-white">{favoriteEvents.length}</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Live</p>
                      <p className="mt-2 text-2xl font-bold text-white">{liveEvents.length}</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Upcoming</p>
                      <p className="mt-2 text-2xl font-bold text-white">{upcomingEvents.length}</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Betslip</p>
                      <p className="mt-2 text-2xl font-bold text-white">{bets.length}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Saved Match Notes</p>
                  <div className="mt-3 space-y-3 text-sm text-gray-300">
                    <p>• Favorites stay available across local sessions.</p>
                    <p>• Users can reopen event pages quickly.</p>
                    <p>• Selections can still be added from saved events.</p>
                    <p>• Later this can connect to a backend favorites API.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Quick Reopen',
                description:
                  'Saved matches remain easy to access without browsing the full sportsbook again.',
              },
              {
                title: 'Better Tracking',
                description:
                  'Users can keep important leagues or teams visible in one personal section.',
              },
              {
                title: 'Local Persistence',
                description:
                  'Favorites are currently stored through the sportsbook context for a usable frontend flow.',
              },
            ].map((item) => (
              <div key={item.title} className="card-surface p-5">
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-300">{item.description}</p>
              </div>
            ))}
          </section>

          <section>
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Saved events</h2>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  Your current favorite matches from the local sports feed.
                </p>
              </div>

              <Link
                to="/sports/calendar"
                className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
              >
                Open calendar
              </Link>
            </div>

            {favoriteEvents.length ? (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {favoriteEvents.map((event) => (
                  <SportEventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="card-surface p-6 text-sm text-gray-300">
                No favorite matches saved yet. Open any event and use the favorite action first.
              </div>
            )}
          </section>

          <section className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">Favorites notes</h2>

            <div className="mt-5 space-y-4">
              {[
                'This page uses your sportsbook context favorite list.',
                'Users can keep important matches visible in one dedicated section.',
                'Later this page can sync saved matches with a backend account profile.',
                'Event cards still support the same interactions as the rest of the sportsbook.',
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <BettingBulletin />
      </div>
    </BaseLayout>
  );
}