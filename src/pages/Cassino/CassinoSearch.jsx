import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import HeaderComponent from '@/components/common/HeaderComponent';
import EmptyState from '@/components/common/EmptyState';
import CasinoGameCard from '@/components/casino/CasinoGameCard';
import http from '@/services/http';

export default function CassinoSearch() {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasError, setHasError] = useState(false);

  async function searchGames(term) {
    const cleaned = term.trim();

    setSubmittedQuery(cleaned);
    setHasSearched(true);
    setHasError(false);

    if (!cleaned) {
      setGames([]);
      return;
    }

    setLoading(true);

    try {
      const { data } = await http.get(`/search/games?search=${encodeURIComponent(cleaned)}`);
      setGames(data?.games || data?.data || []);
    } catch (error) {
      setGames([]);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  }

  const total = useMemo(() => games.length || 0, [games.length]);

  return (
    <BaseLayout>
      <HeaderComponent
        title="Casino Search"
        subtitle="Search games by title, provider, or keyword from your backend endpoint."
        right={
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
            Results: <span className="font-semibold text-white">{total}</span>
          </div>
        }
      />

      <section className="card-surface p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Search Games</p>
            <h2 className="mt-2 text-xl font-bold text-white">Find a game quickly</h2>
            <p className="mt-2 text-sm leading-7 text-gray-300">
              Use the search box below to find casino games by name or related keyword.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_auto]">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    searchGames(query);
                  }
                }}
                placeholder="Search game or provider"
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-emerald-500/40"
              />

              <button
                type="button"
                onClick={() => searchGames(query)}
                className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
              >
                Search
              </button>

              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSubmittedQuery('');
                  setGames([]);
                  setHasSearched(false);
                  setHasError(false);
                }}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-gray-200 transition hover:bg-white/10"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Search Status</p>
              <p className="mt-2 text-lg font-semibold text-white">
                {hasSearched ? 'Query Submitted' : 'Waiting'}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Current Query</p>
              <p className="mt-2 truncate text-lg font-semibold text-white">
                {submittedQuery || '—'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/casino/provider/all/category/all"
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
          >
            View All Games
          </Link>

          <Link
            to="/casinos"
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
          >
            Casino Home
          </Link>
        </div>
      </section>

      {loading ? (
        <div className="card-surface mt-6 p-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2"
              >
                <div className="aspect-[4/5] animate-pulse rounded-xl bg-white/10" />
                <div className="mt-3 h-3 animate-pulse rounded bg-white/10" />
                <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {!loading && hasError ? (
        <div className="mt-6">
          <EmptyState
            title="Search failed"
            description="The search endpoint could not be reached or did not return a valid response."
          />
        </div>
      ) : null}

      {!loading && !hasError && hasSearched && submittedQuery && games.length > 0 ? (
        <section className="card-surface mt-6 p-5">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Search results</h2>
              <p className="mt-2 text-sm leading-7 text-gray-300">
                Click any game card to open the play page.
              </p>
            </div>

            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              Query: {submittedQuery}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
            {games.map((game) => (
              <CasinoGameCard key={game.id || game.game_code} game={game} />
            ))}
          </div>
        </section>
      ) : null}

      {!loading && !hasError && hasSearched && submittedQuery && games.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No games found"
            description="No games matched your current search keyword."
          />
        </div>
      ) : null}

      {!loading && !hasError && !hasSearched ? (
        <div className="mt-6">
          <EmptyState
            title="Search for a game"
            description="Enter a keyword above to search the casino catalog."
          />
        </div>
      ) : null}
    </BaseLayout>
  );
}