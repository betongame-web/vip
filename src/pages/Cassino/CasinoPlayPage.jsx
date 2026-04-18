import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import http from '@/services/http';
import { useAuth } from '@/contexts/AuthContext';

export default function CasinoPlayPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, booting, token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(null);
  const [gameUrl, setGameUrl] = useState('');
  const [error, setError] = useState('');
  const [debug, setDebug] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadGame() {
      if (booting) return;

      if (!isAuthenticated) {
        navigate('/login', { replace: true });
        return;
      }

      setLoading(true);
      setError('');
      setDebug(null);

      try {
        const response = await http.get(`/games/single/${id}`);
        const data = response?.data || {};

        if (ignore) return;

        setDebug({
          ok: true,
          status: response?.status,
          tokenExists: Boolean(token),
          response: data,
        });

        if (data?.action === 'deposit') {
          setError('Insufficient balance');
          setLoading(false);
          return;
        }

        setGame(data?.game || null);
        setGameUrl(data?.gameUrl || '');

        if (!data?.gameUrl) {
          setError('Game URL not found.');
        }
      } catch (err) {
        if (ignore) return;

        const payload = err?.response?.data || null;
        const message =
          payload?.error ||
          payload?.message ||
          'Unable to load game.';

        setDebug({
          ok: false,
          status: err?.response?.status || null,
          tokenExists: Boolean(token),
          response: payload,
        });

        setError(message);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    if (id) {
      loadGame();
    }

    return () => {
      ignore = true;
    };
  }, [id, booting, isAuthenticated, navigate, token]);

  if (booting || loading) {
    return (
      <div className="fixed inset-0 bg-black text-white flex items-center justify-center">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm">
          Loading game...
        </div>
      </div>
    );
  }

  if (error || !gameUrl) {
    return (
      <div className="min-h-screen bg-[#050b18] p-4 text-white">
        <div className="mx-auto max-w-4xl space-y-4">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
            <div className="mb-2 text-xl font-semibold">Game unavailable</div>
            <div className="text-sm text-white/80">{error || 'Game URL not found.'}</div>

            <button
              onClick={() => navigate('/casinos')}
              className="mt-4 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white"
            >
              Back to Casino
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <div className="mb-3 text-sm font-semibold text-white">Debug info</div>
            <pre className="overflow-auto whitespace-pre-wrap break-words text-xs text-green-300">
              {JSON.stringify(debug, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black">
      <iframe
        src={gameUrl}
        title={game?.game_name || 'Game'}
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="pointer-events-auto rounded-2xl border border-white/10 bg-black/45 px-3 py-2 text-white backdrop-blur">
            <div className="text-sm font-semibold leading-tight">
              {game?.game_name || 'Game'}
            </div>
            <div className="text-[11px] text-white/65 leading-tight">
              {game?.provider?.name || 'Original Game'}
            </div>
          </div>

          <button
            onClick={() => navigate('/casinos')}
            className="pointer-events-auto rounded-xl bg-white/12 px-4 py-2 text-sm font-medium text-white backdrop-blur hover:bg-white/20"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}