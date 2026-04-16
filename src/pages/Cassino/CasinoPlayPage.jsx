import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import http from '@/services/http';

export default function CasinoPlayPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(null);
  const [gameUrl, setGameUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadGame() {
      setLoading(true);
      setError('');

      try {
        const { data } = await http.get(`/games/single/${id}`);

        if (ignore) return;

        setGame(data?.game || null);
        setGameUrl(data?.gameUrl || '');
      } catch (err) {
        if (!ignore) {
          setError('Unable to load game.');
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
  }, [id]);

  const title = useMemo(() => {
    return game?.game_name || 'Game';
  }, [game]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f1a] text-white p-4">
        <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/5 p-6">
          Loading game...
        </div>
      </div>
    );
  }

  if (error || !gameUrl) {
    return (
      <div className="min-h-screen bg-[#0b0f1a] text-white p-4">
        <div className="mx-auto max-w-6xl rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
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
    <div className="min-h-screen bg-[#0b0f1a] text-white p-3 md:p-4">
      <div className="mx-auto max-w-7xl space-y-3">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <div>
            <div className="text-lg font-semibold">{title}</div>
            <div className="text-xs text-white/60">
              {game?.provider?.name || 'Original Game'}
            </div>
          </div>

          <button
            onClick={() => navigate('/casinos')}
            className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
          >
            Back
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
          <iframe
            src={gameUrl}
            title={title}
            className="h-[80vh] w-full"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}