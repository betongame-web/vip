import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import { useSportsbook } from '@/contexts/SportsbookContext';
import SportsHeaderNav from '@/pages/Sport/components/SportsHeaderNav';
import SportsHeaderOptions from '@/pages/Sport/components/SportsHeaderOptions';
import SportEventCard from '@/pages/Sport/components/SportEventCard';
import SportLiveHeroCard from '@/pages/Sport/components/SportLiveHeroCard';
import BettingBulletin from '@/pages/Sport/components/BettingBulletin';

export default function SportPage() {
  const { featuredEvents, liveEvents, upcomingEvents, favoriteEvents, bets } = useSportsbook();

  const leagues = [...new Set(upcomingEvents.map((event) => event.leagueName))].slice(0, 8);
  const topFeatured = featuredEvents.slice(0, 6);
  const topUpcoming = upcomingEvents.slice(0, 8);

  return (
    <BaseLayout>
      <SportsHeaderNav />
      <SportsHeaderOptions />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="card-surface overflow-hidden">
            <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
              <div>
                <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Sportsbook Overview
                </span>

                <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Explore live football, upcoming matches, saved events, and a working local betslip
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                  This sports section is now structured like a usable sportsbook frontend. Users can
                  browse live matches, inspect featured events, open event detail pages, save favorites,
                  and build a local betslip from match odds.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/sports/live"
                    className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                  >
                    Open Live Matches
                  </Link>

                  <Link
                    to="/sports/calendar"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    Match Calendar
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
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Sports Summary</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Live</p>
                      <p className="mt-2 text-2xl font-bold text-white">{liveEvents.length}</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Featured</p>
                      <p className="mt-2 text-2xl font-bold text-white">{featuredEvents.length}</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Favorites</p>
                      <p className="mt-2 text-2xl font-bold text-white">{favoriteEvents.length}</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Betslip</p>
                      <p className="mt-2 text-2xl font-bold text-white">{bets.length}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Section Status</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-white">Ready</p>
                      <p className="text-sm text-gray-300">Sports UI active</p>
                    </div>

                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                      Local Feed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Live Match Access',
                description:
                  'Users can jump into live events quickly and select odds directly from active markets.',
              },
              {
                title: 'Favorites & Search',
                description:
                  'Saved events and searchable match lists make the sportsbook easier to use.',
              },
              {
                title: 'Local Betslip',
                description:
                  'Selections are stored locally so the interface behaves like a working sportsbook frontend.',
              },
            ].map((item) => (
              <div key={item.title} className="card-surface p-5">
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-300">{item.description}</p>
              </div>
            ))}
          </section>

          {liveEvents.length > 0 ? (
            <section>
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Live now</h2>
                  <p className="mt-2 text-sm leading-7 text-gray-300">
                    Live events with dynamic odds and quick entry into the event page.
                  </p>
                </div>

                <Link
                  to="/sports/live"
                  className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
                >
                  View all live
                </Link>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-2">
                {liveEvents.slice(0, 4).map((event) => (
                  <SportLiveHeroCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          ) : null}

          <section className="card-surface p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Main leagues</h2>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  Top league categories currently available in the local sports feed.
                </p>
              </div>

              <Link
                to="/sports/search"
                className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
              >
                Search events
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {leagues.map((league) => (
                <div
                  key={league}
                  className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-gray-200"
                >
                  {league}
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Featured matches</h2>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  Highlighted events users are most likely to interact with first.
                </p>
              </div>

              <Link
                to="/sports/feed"
                className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
              >
                Open betting feed
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {topFeatured.map((event) => (
                <SportEventCard key={event.id} event={event} />
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Upcoming matches</h2>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  More matches available for quick browsing and selection building.
                </p>
              </div>

              <Link
                to="/sports/calendar"
                className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
              >
                Open calendar
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {topUpcoming.map((event) => (
                <SportEventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        </div>

        <BettingBulletin />
      </div>
    </BaseLayout>
  );
}