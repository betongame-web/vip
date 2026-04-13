import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import HeaderComponent from '@/components/common/HeaderComponent';
import Pagination from '@/components/common/Pagination';
import EmptyState from '@/components/common/EmptyState';
import CasinoGameCard from '@/components/casino/CasinoGameCard';
import http from '@/services/http';

export default function CassinoListPage() {
  const { provider = 'all', category = 'all' } = useParams();
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  async function loadGames(page = 1) {
    setLoading(true);
    try {
      const { data } = await http.get(`/casinos/games?page=${page}&searchTerm=${encodeURIComponent(searchTerm)}&category=${category}&provider=${provider}`);
      setGames(data.games || data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGames(1).catch(() => setGames(null));
  }, [provider, category]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BaseLayout>
      <HeaderComponent
        title="Games"
        subtitle={`Provider: ${provider} • Category: ${category}`}
        right={<p className="text-sm text-gray-400">Total: {games?.total || 0}</p>}
      />

      <div className="mb-5">
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyUp={(event) => {
            if (event.key === 'Enter') loadGames(1);
          }}
          className="input"
          placeholder="Search by name or provider"
        />
        <button type="button" onClick={() => loadGames(1)} className="ui-button-blue mt-3">
          Search
        </button>
      </div>

      {loading ? <div className="card-surface p-6">Loading games...</div> : null}

      {!loading && games?.data?.length ? (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
            {games.data.map((game) => (
              <CasinoGameCard key={game.id || game.game_code} game={game} />
            ))}
          </div>
          <Pagination pagination={games} onPageChange={loadGames} />
        </>
      ) : null}

      {!loading && !games?.data?.length ? (
        <EmptyState title="No games found" description="The casino list endpoint returned no games for the selected provider/category." />
      ) : null}
    </BaseLayout>
  );
}
