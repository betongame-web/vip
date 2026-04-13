import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import GameLayout from '@/components/layouts/GameLayout';
import EmptyState from '@/components/common/EmptyState';
import http from '@/services/http';

function getProviderName(game) {
  if (!game) return '—';
  if (typeof game.provider === 'string') return game.provider;
  return game?.provider?.name || '—';
}

function getGameName(game) {
  return game?.game_name || game?.name || 'Game';
}

export default function CasinoPlayPage() {
  const navigate = useNavigate();
  const { id, slug } = useParams();

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

        setGame(data?.game || null);
        setGameUrl(data?.gameUrl || data?.game_url || '');
      } catch (error) {
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

  const title = useMemo(() => getGameName(game), [game]);
  const providerName = useMemo(() => getProviderName(game), [game]);

  return (
    <GameLayout>
      <div className="space-y-6">
        <section className="card-surface p-4 md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
                  Game Play
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                  ID: {id}
                </span>
                {slug ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                    {slug}
                  </span>
                ) : null}
              </div>

              <h1 className="mt-4 text-2xl font-bold text-white md:text-3xl">{title}</h1>
              <p className="mt-2 text-sm text-gray-400">
                Provider: {providerName} {game?.game_type ? `• ${game.game_type}` : ''}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-white/10"
              >
                Go Back
              </button>

              <Link
                to="/casinos"
                className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
              >
                Browse Games
              </Link>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="card-surface p-6">
            <div className="space-y-3">
              <div className="h-6 w-40 animate-pulse rounded bg-white/10" />
              <div className="h-[60vh] animate-pulse rounded-2xl bg-white/5" />
            </div>
          </div>
        ) : null}

        {!loading && underMaintenance ? (
          <EmptyState
            title="Game under maintenance"
            description="This game is temporarily unavailable or the backend did not return a valid launch response."
          />
        ) : null}

        {!loading && !underMaintenance && game ? (
          <div className="grid gap-6 lg:grid-cols-[1.5fr_360px]">
            <section className="card-surface p-4">
              {gameUrl ? (
                <iframe
                  src={gameUrl}
                  title={title}
                  className="h-[75vh] w-full rounded-2xl border border-white/10 bg-black"
                  allowFullScreen
                />
              ) : (
                <EmptyState
                  title="Game URL missing"
                  description="The backend returned game information, but no playable launch URL was found."
                />
              )}
            </section>

            <aside className="space-y-4">
              <div className="card-surface p-4">
                <h2 className="mb-4 text-lg font-semibold text-white">Game info</h2>

                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex justify-between gap-4">
                    <span>Name</span>
                    <span className="text-right text-white">{title}</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>Provider</span>
                    <span className="text-right text-white">{providerName}</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>Type</span>
                    <span className="text-right text-white">{game?.game_type || '—'}</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>Distribution</span>
                    <span className="text-right text-white">{game?.distribution || '—'}</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>Status</span>
                    <span className="text-right text-emerald-300">Available</span>
                  </div>
                </div>
              </div>

              <div className="card-surface p-4">
                <h2 className="mb-3 text-lg font-semibold text-white">Quick actions</h2>

                <div className="space-y-3">
                  <Link
                    to="/profile/deposit"
                    className="block rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-600"
                  >
                    Make Deposit
                  </Link>

                  <Link
                    to="/profile/favorite"
                    className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium text-gray-200 transition hover:bg-white/10"
                  >
                    View Favorites
                  </Link>

                  <Link
                    to="/profile/recents"
                    className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium text-gray-200 transition hover:bg-white/10"
                  >
                    View Recents
                  </Link>
                </div>
              </div>

              <div className="card-surface p-4 text-sm text-gray-300">
                <p className="font-semibold text-white">Note</p>
                <p className="mt-2 leading-7">
                  This page is designed to keep the launch flow simple. The actual playable game
                  still depends on your backend returning a valid game URL and session response.
                </p>
              </div>
            </aside>
          </div>
        ) : null}
      </div>
    </GameLayout>
  );
}