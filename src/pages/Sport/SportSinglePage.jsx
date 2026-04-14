import { Link, useParams } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import EmptyState from '@/components/common/EmptyState';
import { useSportsbook } from '@/contexts/SportsbookContext';
import SportsHeaderNav from '@/pages/Sport/components/SportsHeaderNav';
import SportsHeaderOptions from '@/pages/Sport/components/SportsHeaderOptions';
import SportCompactCard from '@/pages/Sport/components/SportCompactCard';
import BettingBulletin from '@/pages/Sport/components/BettingBulletin';
import { formatMatchDate, formatMoney, getStatusTone, initials } from '@/pages/Sport/sportsUtils';

function TeamPanel({ name, score, side }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-lg font-bold text-white">
          {initials(name)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.18em] text-gray-400">{side}</p>
          <h3 className="mt-1 truncate text-xl font-bold text-white">{name}</h3>
        </div>

        <div className="rounded-2xl bg-white/5 px-4 py-3 text-2xl font-bold text-white">
          {score}
        </div>
      </div>
    </div>
  );
}

export default function SportSinglePage() {
  const { id } = useParams();
  const {
    events,
    toggleFavorite,
    isFavorite,
    toggleBet,
    isSelectionActive,
    featuredEvents,
  } = useSportsbook();

  const event = events.find((item) => String(item.id) === String(id));
  const relatedEvents = featuredEvents.filter((item) => item.id !== event?.id).slice(0, 4);

  if (!event) {
    return (
      <BaseLayout>
        <SportsHeaderNav />
        <SportsHeaderOptions />
        <EmptyState
          title="Match not found"
          description="This sports event could not be found in the current local sportsbook feed."
        />
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <SportsHeaderNav />
      <SportsHeaderOptions />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="card-surface overflow-hidden">
            <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    Match Detail
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                    {event.leagueCountry} • {event.leagueName}
                  </span>
                </div>

                <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {event.teamHomeName} vs {event.teamAwayName}
                </h1>

                <p className={`mt-3 text-sm font-semibold ${getStatusTone(event.statusLong)}`}>
                  {event.statusLong} • {formatMatchDate(event.date)}
                </p>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                  This page gives a cleaner single-event view with match overview, live score,
                  available betting markets, favorite toggle, and selection actions for the local betslip.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(event.id)}
                    className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                      isFavorite(event.id)
                        ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                        : 'bg-white/5 text-gray-200 hover:bg-white/10'
                    }`}
                  >
                    {isFavorite(event.id) ? 'Saved to Favorites' : 'Save Match'}
                  </button>

                  <Link
                    to="/sports/live"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    Live Matches
                  </Link>

                  <Link
                    to="/sports/favorites"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    Favorite Matches
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Match Summary</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Home Goals</p>
                      <p className="mt-2 text-2xl font-bold text-white">{event.goalsHome}</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Away Goals</p>
                      <p className="mt-2 text-2xl font-bold text-white">{event.goalsAway}</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Round</p>
                      <p className="mt-2 text-lg font-bold text-white">{event.leagueRound}</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-gray-400">Season</p>
                      <p className="mt-2 text-lg font-bold text-white">{event.leagueSeason}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Venue</p>
                  <p className="mt-3 text-lg font-semibold text-white">{event.stadium || '—'}</p>
                  <p className="mt-2 text-sm text-gray-300">{event.description}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <TeamPanel name={event.teamHomeName} score={event.goalsHome} side="Home Team" />
            <TeamPanel name={event.teamAwayName} score={event.goalsAway} side="Away Team" />
          </section>

          <section className="card-surface p-6">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Available markets</h2>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  Click any selection below to add or remove it from the local betslip.
                </p>
              </div>

              <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                {event.markets.length} markets
              </span>
            </div>

            <div className="space-y-5">
              {event.markets.map((market, marketIndex) => (
                <div
                  key={market.id}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white">{market.name}</h3>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                      {market.values.length} selections
                    </span>
                  </div>

                  <div
                    className={`grid gap-3 ${
                      market.values.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
                    }`}
                  >
                    {market.values.map((selection, selectionIndex) => {
                      const active = isSelectionActive(event.id, market.id, selection.id);

                      return (
                        <button
                          key={selection.id}
                          type="button"
                          onClick={() => toggleBet(event, marketIndex, selectionIndex)}
                          className={`rounded-2xl border p-4 text-left transition ${
                            active
                              ? 'border-emerald-400 bg-emerald-400/20 text-emerald-200'
                              : 'border-white/10 bg-white/[0.03] text-gray-200 hover:bg-white/10'
                          }`}
                        >
                          <div className="text-sm text-gray-300">{selection.value}</div>
                          <div className="mt-2 text-2xl font-bold">{selection.odd}</div>
                          <div className="mt-3 text-xs">
                            {active ? 'Added to betslip' : 'Tap to add'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <div className="card-surface p-5">
              <h2 className="text-lg font-semibold text-white">Live Match Use</h2>
              <p className="mt-3 text-sm leading-7 text-gray-300">
                Users can inspect one match deeply instead of scanning the full sportsbook page.
              </p>
            </div>

            <div className="card-surface p-5">
              <h2 className="text-lg font-semibold text-white">Market Clarity</h2>
              <p className="mt-3 text-sm leading-7 text-gray-300">
                Each betting market is separated cleanly so selections feel easier to understand.
              </p>
            </div>

            <div className="card-surface p-5">
              <h2 className="text-lg font-semibold text-white">Betslip Ready</h2>
              <p className="mt-3 text-sm leading-7 text-gray-300">
                Every active selection here still works directly with the local sportsbook context.
              </p>
            </div>
          </section>

          {relatedEvents.length ? (
            <section className="card-surface p-6">
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Related featured matches</h2>
                  <p className="mt-2 text-sm leading-7 text-gray-300">
                    Other highlighted matches users may also want to explore.
                  </p>
                </div>

                <Link
                  to="/sports"
                  className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
                >
                  Sports Overview
                </Link>
              </div>

              <div className="space-y-4">
                {relatedEvents.map((item) => (
                  <SportCompactCard
                    key={item.id}
                    event={item}
                    rightSlot={
                      <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-200">
                        {formatMoney(item.markets?.[0]?.values?.[0]?.odd || 0).replace('$', 'Odd ')}
                      </div>
                    }
                  />
                ))}
              </div>
            </section>
          ) : null}

          <section className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">Match notes</h2>

            <div className="mt-5 space-y-4">
              {[
                'This page is fully frontend-usable with your local sportsbook context.',
                'Selections added here appear immediately inside the betting bulletin.',
                'Later this page can be connected to real event statistics and provider data.',
                'Favorite state and betslip interactions already work through the sports context.',
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
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