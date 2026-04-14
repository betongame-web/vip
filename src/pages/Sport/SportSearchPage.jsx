import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import { useSportsbook } from '@/contexts/SportsbookContext';
import SportsHeaderNav from '@/pages/Sport/components/SportsHeaderNav';
import SportsHeaderOptions from '@/pages/Sport/components/SportsHeaderOptions';
import SportEventCard from '@/pages/Sport/components/SportEventCard';
import BettingBulletin from '@/pages/Sport/components/BettingBulletin';

function searchableText(event) {
  return [
    event?.leagueName,
    event?.homeTeam,
    event?.awayTeam,
    event?.country,
    event?.status,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

export default function SportSearchPage() {
  const { liveEvents, upcomingEvents, featuredEvents, favoriteEvents, bets } = useSportsbook();

  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  const allEvents = useMemo(() => {
    const merged = [...liveEvents, ...featuredEvents, ...upcomingEvents];
    const map = new Map();

    merged.forEach((event) => {
      if (!event?.id) return;
      if (!map.has(event.id)) {
        map.set(event.id, event);
      }
    });

    return Array.from(map.values());
  }, [liveEvents, featuredEvents, upcomingEvents]);

  const filteredEvents = useMemo(() => {
    const term = submittedQuery.trim().toLowerCase();
    if (!term) return allEvents;
    return allEvents.filter((event) => searchableText(event).includes(term));
  }, [allEvents, submittedQuery]);

  const leagueSuggestions = useMemo(() => {
    const leagues = [...new Set(allEvents.map((event) => event?.leagueName).filter(Boolean))];
    return leagues.slice(0, 8);
  }, [allEvents]);

  return (
    <BaseLayout>
      <SportsHeaderNav />
      <SportsHeaderOptions />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="card-surface overflow-hidden">
            <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
              <div>
                <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
                  Sports Search
                </span>

                <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Search matches by team, league, country, or event status
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                  This page helps users quickly find a match without scrolling through the whole
                  sportsbook. Search works across live, featured, and upcoming events from the local feed.
                </p>

                <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto]">
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        setSubmittedQuery(query);
                      }
                    }}
                    placeholder="Search team, league, or match"
                    className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-violet-500/40"
                  />

                  <button
                    type="button"
                    onClick={() => setSubmittedQuery(query)}
                    className="rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
                  >
                    Search
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      setSubmittedQuery('');
                    }}
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    Clear
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to="/sports"
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
                  >
                    Sports Overview
                  </Link>

                  <Link
                    to="/sports/live"
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
                  >
                    Live Matches
                  </Link>

                  <Link
                    to="/sports/calendar"
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
                  >
                    Calendar
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Search Summary</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">All Events</p>
                      <p className="mt-2 text-2xl font-bold text-white">{allEvents.length}</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Results</p>
                      <p className="mt-2 text-2xl font-bold text-white">{filteredEvents.length}</p>
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
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Active Query</p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    {submittedQuery?.trim() ? submittedQuery : 'All matches'}
                  </p>
                  <p className="mt-2 text-sm text-gray-300">
                    Search updates the event list below without breaking the sportsbook flow.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="card-surface p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Quick suggestions</h2>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  Tap a suggestion to search faster through common leagues.
                </p>
              </div>

              <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                Shortcut search
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {leagueSuggestions.map((league) => (
                <button
                  key={league}
                  type="button"
                  onClick={() => {
                    setQuery(league);
                    setSubmittedQuery(league);
                  }}
                  className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
                >
                  {league}
                </button>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Search results</h2>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  Matching events from live, featured, and upcoming match lists.
                </p>
              </div>

              <Link
                to="/sports/favorites"
                className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
              >
                Open favorites
              </Link>
            </div>

            {filteredEvents.length ? (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {filteredEvents.map((event) => (
                  <SportEventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="card-surface p-6 text-sm text-gray-300">
                No events matched your search query.
              </div>
            )}
          </section>

          <section className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">Search notes</h2>

            <div className="mt-5 space-y-4">
              {[
                'This search page works with the local sportsbook context you already added.',
                'Users can search team names, leagues, country names, and status text.',
                'Later this page can be connected to a real backend or live sports provider search endpoint.',
                'The result cards still keep full sportsbook interactions like favorites and betslip entry.',
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500 text-sm font-bold text-white">
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