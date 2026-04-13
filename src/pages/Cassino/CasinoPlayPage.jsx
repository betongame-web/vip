import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GameLayout from '@/components/layouts/GameLayout';
import EmptyState from '@/components/common/EmptyState';
import http from '@/services/http';

export default function CasinoPlayPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(null);
  const [gameUrl, setGameUrl] = useState('');
  const [underMaintenance, setUnderMaintenance] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function loadGame() {
      setLoading(true);
      setUnderMaintenance(false);
      try {
        const { data } = await http.get(`/games/single/${id}`);
        if (ignore) return;

        if (data?.action === 'deposit') {
          navigate('/profile/deposit');
          return;
        }

        setGame(data.game || null);
        setGameUrl(data.gameUrl || '');
      } catch {
        if (!ignore) {
          setUnderMaintenance(true);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadGame();
    return () => {
      ignore = true;
    };
  }, [id, navigate]);

  return (
    <GameLayout>
      {loading ? <div className="card-surface p-6">Loading game...</div> : null}

      {!loading && underMaintenance ? (
        <EmptyState
          title="Game under maintenance"
          description="The original Vue page also fell back to a maintenance state when the game endpoint failed."
        />
      ) : null}

      {!loading && !underMaintenance && game ? (
        <div className="grid gap-6 lg:grid-cols-[1.5fr_360px]">
          <section className="card-surface p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{game.game_name}</h1>
                <p className="text-sm text-gray-400">{game?.provider?.name} • {game?.game_type}</p>
              </div>
              <div className="text-sm text-gray-400">ID: {game.id}</div>
            </div>

            {gameUrl ? (
              <iframe
                src={gameUrl}
                title={game.game_name}
                className="h-[75vh] w-full rounded-xl border border-white/10 bg-black"
                allowFullScreen
              />
            ) : (
              <EmptyState title="Game URL missing" description="The backend returned the game metadata but did not return a launch URL." />
            )}
          </section>

          <aside className="space-y-4">
            <div className="card-surface p-4">
              <h2 className="mb-3 text-lg font-semibold">Game info</h2>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Provider</span>
                  <span className="text-white">{game?.provider?.name || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Distribution</span>
                  <span className="text-white">{game.distribution || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type</span>
                  <span className="text-white">{game.game_type || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Max win</span>
                  <span className="text-white">1000x</span>
                </div>
              </div>
            </div>

            <div className="card-surface p-4 text-sm text-gray-300">
              <p className="font-semibold text-white">Migration note</p>
              <p className="mt-2">
                The original Vue component injected an obfuscated DOM-manipulation script on mount. This React version intentionally leaves that code out and keeps only the API-backed launch flow.
              </p>
            </div>
          </aside>
        </div>
      ) : null}
    </GameLayout>
  );
}
