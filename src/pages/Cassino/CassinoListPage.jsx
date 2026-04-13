import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import HeaderComponent from '@/components/common/HeaderComponent';
import Pagination from '@/components/common/Pagination';
import EmptyState from '@/components/common/EmptyState';
import CasinoGameCard from '@/components/casino/CasinoGameCard';
import http from '@/services/http';

function formatLabel(value) {
  if (!value || value === 'all') return 'All';
  return String(value)
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function CassinoListPage() {
  const { provider = 'all', category = 'all' } = useParams();

  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [hasError, setHasError] = useState(false);

  async function loadGames(page = 1, currentSearch = appliedSearch) {
    setLoading(true);
    setHasError(false);

    try {
      const { data } = await http.get(
        `/casinos/games?page=${page}&searchTerm=${encodeURIComponent(
          currentSearch || '',
        )}&category=${category}&provider=${provider}`,
      );

      setGames(data?.games || data || null);
    } catch (error) {
      setGames(null);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGames(1, appliedSearch);
  }, [provider, category, appliedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  const items = useMemo(() => games?.data || [], [games]);
  const total = games?.total || items.length || 0;

  return (
    <BaseLayout>
      <HeaderComponent
        title="Casino Games"
        subtitle={`Provider: ${formatLabel(provider)} • Category: ${formatLabel(category)}`}
        right={
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
            Total Games: <span className="font-semibold text-white">{total}</span>
          </div>
        }
      />

      <section className="card-surface mb-6 p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Search & Filter</p>
            <h2 className="mt-2 text-xl font-bold text-white">Find games by name or keyword</h2>
            <p className="mt-2 text-sm leading-7 text-gray-300">
              This page lists games returned by your backend. You can search by keyword and browse
              by provider or category.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_auto]">
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    setAppliedSearch(searchTerm.trim());
                  }
                }}
                placeholder="Search by game name"
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-emerald-500/40"
              />

              <button
                type="button"
                onClick={() => setAppliedSearch(searchTerm.trim())}
                className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
              >
                Search
              </button>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setAppliedSearch('');
                }}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-gray-200 transition hover:bg-white/10"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Selected Provider</p>
              <p className="mt-2 text-lg font-semibold text-white">{formatLabel(provider)}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Selected Category</p>
              <p className="mt-2 text-lg font-semibold text-white">{formatLabel(category)}</p>
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
            to="/casino/search"
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
          >
            Advanced Search
          </Link>
        </div>
      </section>

      {loading ? (
        <div className="card-surface p-6">
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
        <EmptyState
          title="Unable to load games"
          description="The casino list endpoint could not be reached or did not return a valid response."
        />
      ) : null}

      {!loading && !hasError && items.length > 0 ? (
        <>
          <section className="card-surface p-5">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Available games</h2>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  Click any game card to open the play page.
                </p>
              </div>

              {appliedSearch ? (
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  Search: {appliedSearch}
                </span>
              ) : null}
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
              {items.map((game) => (
                <CasinoGameCard key={game.id || game.game_code} game={game} />
              ))}
            </div>

            <Pagination pagination={games} onPageChange={(page) => loadGames(page, appliedSearch)} />
          </section>
        </>
      ) : null}

      {!loading && !hasError && items.length === 0 ? (
        <EmptyState
          title="No games found"
          description="No games were returned for the selected provider, category, or search keyword."
        />
      ) : null}
    </BaseLayout>
  );
}