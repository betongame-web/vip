import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import http from '@/services/http';
import { useAuth } from '@/contexts/AuthContext';

export default function CasinoPlayPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, booting } = useAuth();

  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(null);
  const [gameUrl, setGameUrl] = useState('');
  const [error, setError] = useState('');

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

      try {
        const { data } = await http.get(`/games/single/${id}`);

        if (ignore) return;

        if (data?.action === 'deposit') {
          navigate('/profile/deposit', { replace: true });
          return;
        }

        setGame(data?.game || null);
        setGameUrl(data?.gameUrl || '');
      } catch (err) {
        if (!ignore) {
          const message =
            err?.response?.data?.error ||
            err?.response?.data?.message ||
            'Unable to load game.';
          setError(message);
        }
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
  }, [id, booting, isAuthenticated, navigate]);

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
      <div className="fixed inset-0 bg-[#0b0f1a] text-white p-4">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-500/20 bg-red-500/10 p-6 mt-6">
          <div className="text-lg font-semibold mb-2">Game unavailable</div>
          <div className="text-sm text-white/80 mb-4">
            {error || 'Game URL not found.'}
          </div>
          <button
            onClick={() => navigate('/casinos')}
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white"
          >
            Back to Casino
          </button>
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