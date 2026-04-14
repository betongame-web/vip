import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import { useSportsbook } from '@/contexts/SportsbookContext';
import SportsHeaderNav from '@/pages/Sport/components/SportsHeaderNav';
import SportsHeaderOptions from '@/pages/Sport/components/SportsHeaderOptions';
import SportEventCard from '@/pages/Sport/components/SportEventCard';
import SportLiveHeroCard from '@/pages/Sport/components/SportLiveHeroCard';
import BettingBulletin from '@/pages/Sport/components/BettingBulletin';

export default function SportLivePage() {
  const { liveEvents, featuredEvents, bets, favoriteEvents } = useSportsbook();

  const topLive = liveEvents.slice(0, 4);
  const moreLive = liveEvents.slice(4);

  return (
    <BaseLayout>
      <SportsHeaderNav />
      <SportsHeaderOptions />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="card-surface overflow-hidden">
            <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
              <div>
                <span className="inline-flex rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
                  Live Matches
                </span>

                <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Follow currently active matches and add live odds to your betslip
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                  This page highlights all live events from the local sportsbook feed. Users can open
                  match details, save live events, and build a working local betslip from live odds.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/sports"
                    className="rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                  >
                    Sports Overview
                  </Link>

                  <Link
                    to="/sports/bets"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    My Bets
                  </Link>

                  <Link
                    to="/sports/favorites"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    Favorites
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Live Summary</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Live Events</p>
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
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Feed Status</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-white">
                        {liveEvents.length ? 'Live' : 'Idle'}
                      </p>
                      <p className="text-sm text-gray-300">Dynamic local odds active</p>
                    </div>

                    <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300">
                      Updating
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {topLive.length > 0 ? (
            <section>
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Live hero matches</h2>
                  <p className="mt-2 text-sm leading-7 text-gray-300">
                    Bigger live cards for the most visible active matches.
                  </p>
                </div>

                <Link
                  to="/sports/search"
                  className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
                >
                  Search sports
                </Link>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-2">
                {topLive.map((event) => (
                  <SportLiveHeroCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          ) : null}

          <section>
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">All live events</h2>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  Every currently active match from the sportsbook feed.
                </p>
              </div>

              <Link
                to="/sports/calendar"
                className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
              >
                Match calendar
              </Link>
            </div>

            {liveEvents.length ? (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {moreLive.length ? moreLive.map((event) => (
                  <SportEventCard key={event.id} event={event} />
                )) : liveEvents.map((event) => (
                  <SportEventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="card-surface p-6 text-sm text-gray-300">
                No live matches are available right now in the local sports feed.
              </div>
            )}
          </section>

          <section className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">Live betting notes</h2>

            <div className="mt-5 space-y-4">
              {[
                'Live odds can change automatically in the local sportsbook context.',
                'Users can add selections directly from live cards into the betslip.',
                'This page is frontend-ready and can later be connected to a real sports API.',
                'Match detail pages can be used for deeper market exploration.',
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">
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