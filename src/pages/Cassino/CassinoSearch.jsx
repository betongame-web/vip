import { useState } from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import CasinoGameCard from '@/components/casino/CasinoGameCard';
import EmptyState from '@/components/common/EmptyState';
import http from '@/services/http';

export default function CassinoSearch() {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    setLoading(true);
    try {
      const { data } = await http.get(`/search/games?search=${encodeURIComponent(query)}`);
      setGames(data.games || data.data || []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <BaseLayout>
      <div className="card-surface p-5">
        <h1 className="mb-4 text-2xl font-bold">Casino Search</h1>
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            className="input"
            placeholder="Search game or provider"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="button" onClick={search} className="ui-button-blue md:w-48">
            Search
          </button>
        </div>
      </div>

      {loading ? <div className="mt-6 card-surface p-6">Searching...</div> : null}

      {!loading && games.length ? (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
          {games.map((game) => (
            <CasinoGameCard key={game.id || game.game_code} game={game} />
          ))}
        </div>
      ) : null}

      {!loading && !games.length ? (
        <div className="mt-6">
          <EmptyState title="Search for a game" description="Enter a term to query the original Laravel search endpoint." />
        </div>
      ) : null}
    </BaseLayout>
  );
}
