import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import { useSportsbook } from '@/contexts/SportsbookContext';
import SportsHeaderNav from '@/pages/Sport/components/SportsHeaderNav';
import SportsHeaderOptions from '@/pages/Sport/components/SportsHeaderOptions';
import SportCompactCard from '@/pages/Sport/components/SportCompactCard';
import BettingBulletin from '@/pages/Sport/components/BettingBulletin';
import { formatMoney } from '@/pages/Sport/sportsUtils';

export default function SportBettingFeedPage() {
  const { featuredEvents, liveEvents, upcomingEvents, bets } = useSportsbook();

  const feedSections = [
    {
      title: 'Live opportunities',
      subtitle: 'Matches that are currently active and ready for fast selection entry.',
      items: liveEvents.slice(0, 6),
    },
    {
      title: 'Featured markets',
      subtitle: 'Highlighted events that should stay visible near the top of the sportsbook.',
      items: featuredEvents.slice(0, 6),
    },
    {
      title: 'Upcoming opportunities',
      subtitle: 'Scheduled matches users may want to add before kickoff.',
      items: upcomingEvents.slice(0, 6),
    },
  ];

  return (
    <BaseLayout>
      <SportsHeaderNav />
      <SportsHeaderOptions />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="card-surface overflow-hidden">
            <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
              <div>
                <span className="inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                  Betting Feed
                </span>

                <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Browse a cleaner sportsbook feed with live, featured, and upcoming match access
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                  This page works like a sportsbook feed hub. It groups the main event flow into
                  clear sections so users can quickly jump between live opportunities, featured
                  matches, and upcoming selections without losing the betslip context.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/sports/live"
                    className="rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
                  >
                    Open Live Feed
                  </Link>

                  <Link
                    to="/sports/search"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    Search Matches
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
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Feed Summary</p>
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
                      <p className="text-xs text-gray-400">Upcoming</p>
                      <p className="mt-2 text-2xl font-bold text-white">{upcomingEvents.length}</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Recorded Bets</p>
                      <p className="mt-2 text-2xl font-bold text-white">{bets.length}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Feed Purpose</p>
                  <div className="mt-3 space-y-3 text-sm text-gray-300">
                    <p>• Cleaner sportsbook navigation</p>
                    <p>• More visible event grouping</p>
                    <p>• Faster selection discovery</p>
                    <p>• Better connection with local betslip flow</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Live Focus',
                description:
                  'Users can quickly see the most active opportunities without opening multiple sports pages.',
              },
              {
                title: 'Featured Visibility',
                description:
                  'Important matches stay surfaced so the sportsbook feels more curated and easier to use.',
              },
              {
                title: 'Upcoming Planning',
                description:
                  'Future matches remain visible so users can prepare single or multiple selections early.',
              },
            ].map((item) => (
              <div key={item.title} className="card-surface p-5">
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-300">{item.description}</p>
              </div>
            ))}
          </section>

          {feedSections.map((section) => (
            <section key={section.title} className="card-surface p-6">
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-gray-300">{section.subtitle}</p>
                </div>

                <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                  {section.items.length} matches
                </span>
              </div>

              {section.items.length ? (
                <div className="space-y-4">
                  {section.items.map((event) => (
                    <SportCompactCard
                      key={event.id}
                      event={event}
                      rightSlot={
                        <div className="min-w-[120px] rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-right">
                          <p className="text-xs text-gray-400">Top odd</p>
                          <p className="mt-1 text-lg font-bold text-white">
                            {formatMoney(event.markets?.[0]?.values?.[0]?.odd || 0).replace('$', '')}
                          </p>
                        </div>
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-gray-300">
                  No matches available in this section right now.
                </div>
              )}
            </section>
          ))}

          <section className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">Feed notes</h2>

            <div className="mt-5 space-y-4">
              {[
                'This page is useful as a grouped sportsbook hub rather than a plain event list.',
                'Users can still move into single event pages and add selections normally.',
                'Later this feed can be connected to a backend ranking, popularity, or provider feed.',
                'The right-side betting bulletin continues to work with the same sports context.',
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
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