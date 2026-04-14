import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import { useSportsbook } from '@/contexts/SportsbookContext';
import SportsHeaderNav from '@/pages/Sport/components/SportsHeaderNav';
import SportsHeaderOptions from '@/pages/Sport/components/SportsHeaderOptions';
import SportEventCard from '@/pages/Sport/components/SportEventCard';
import BettingBulletin from '@/pages/Sport/components/BettingBulletin';

function getEventDate(event) {
  return (
    event?.matchDate ||
    event?.eventDate ||
    event?.date ||
    event?.startsAt ||
    event?.startTime ||
    ''
  );
}

function formatDateLabel(value) {
  if (!value) return 'Upcoming';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function SportCalendarPage() {
  const { upcomingEvents, liveEvents, favoriteEvents, bets } = useSportsbook();

  const groupedEvents = useMemo(() => {
    const map = new Map();

    upcomingEvents.forEach((event) => {
      const rawDate = getEventDate(event);
      const key = rawDate ? String(rawDate).slice(0, 10) : 'upcoming';

      if (!map.has(key)) {
        map.set(key, []);
      }

      map.get(key).push(event);
    });

    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, items]) => ({
        date,
        label: formatDateLabel(date),
        items,
      }));
  }, [upcomingEvents]);

  return (
    <BaseLayout>
      <SportsHeaderNav />
      <SportsHeaderOptions />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="card-surface overflow-hidden">
            <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
              <div>
                <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  Match Calendar
                </span>

                <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Browse upcoming matches by date and plan selections more clearly
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                  This page groups upcoming events by day so users can scan the sportsbook schedule,
                  open event details, save favorites, and build a local betslip more easily.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/sports/live"
                    className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Open Live Matches
                  </Link>

                  <Link
                    to="/sports/search"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    Search Events
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
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Calendar Summary</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Upcoming</p>
                      <p className="mt-2 text-2xl font-bold text-white">{upcomingEvents.length}</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Dates</p>
                      <p className="mt-2 text-2xl font-bold text-white">{groupedEvents.length}</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Live</p>
                      <p className="mt-2 text-2xl font-bold text-white">{liveEvents.length}</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Favorites</p>
                      <p className="mt-2 text-2xl font-bold text-white">{favoriteEvents.length}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Betslip Status</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-white">{bets.length}</p>
                      <p className="text-sm text-gray-300">Selections in current slip</p>
                    </div>

                    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                      Local Slip
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Date-Based Browsing',
                description:
                  'Users can view matches grouped by day instead of scanning one long mixed list.',
              },
              {
                title: 'Cleaner Planning',
                description:
                  'A calendar-style layout helps users plan multiple selections ahead of live kickoff.',
              },
              {
                title: 'Better Navigation',
                description:
                  'Users can move from upcoming schedules into search, live view, or bet history quickly.',
              },
            ].map((item) => (
              <div key={item.title} className="card-surface p-5">
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-300">{item.description}</p>
              </div>
            ))}
          </section>

          {groupedEvents.length ? (
            groupedEvents.map((group) => (
              <section key={group.date} className="card-surface p-6">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{group.label}</h2>
                    <p className="mt-2 text-sm leading-7 text-gray-300">
                      Matches scheduled for this day from the local sportsbook feed.
                    </p>
                  </div>

                  <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                    {group.items.length} matches
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {group.items.map((event) => (
                    <SportEventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="card-surface p-6 text-sm text-gray-300">
              No upcoming matches are available right now in the local sports feed.
            </div>
          )}

          <section className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">Calendar notes</h2>

            <div className="mt-5 space-y-4">
              {[
                'This page is currently powered by local sportsbook context data.',
                'Matches are grouped by date so the schedule feels more organized.',
                'Later this calendar can be connected to a real sports API or backend schedule feed.',
                'Users can still add selections from event cards directly into the local betslip.',
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold text-slate-950">
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