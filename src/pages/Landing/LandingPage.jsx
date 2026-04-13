import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import LandingLayout from '@/components/layouts/LandingLayout';
import http from '@/services/http';

function getPrizeLabel(item) {
  return item?.name || item?.title || item?.prize_name || 'Prize';
}

function getWinnerLabel(item) {
  return item?.name || item?.username || item?.user_name || 'Player';
}

export default function LandingPage() {
  const [prizes, setPrizes] = useState([]);
  const [winners, setWinners] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      setLoading(true);

      try {
        const [prizesRes, winnersRes] = await Promise.all([
          http.get('/spin/prizes').catch(() => ({ data: [] })),
          http.get('/spin/winners').catch(() => ({ data: [] })),
        ]);

        if (ignore) return;

        setPrizes(prizesRes.data?.prizes || prizesRes.data || []);
        setWinners(winnersRes.data?.winners || winnersRes.data || []);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  async function spin() {
    setSpinning(true);
    setMessage('');

    try {
      const { data } = await http.post('/spin/result', {});
      setMessage(data?.message || data?.msg || 'Spin completed.');
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Spin failed.');
    } finally {
      setSpinning(false);
    }
  }

  const topPrizes = useMemo(() => prizes.slice(0, 6), [prizes]);
  const recentWinners = useMemo(() => winners.slice(0, 6), [winners]);

  return (
    <LandingLayout>
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="card-surface overflow-hidden">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
            <div>
              <span className="inline-flex rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-300">
                Landing Spin
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
                Spin the reward wheel and explore featured prizes
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                This page is designed as a premium landing reward area where users can try a spin,
                review prize highlights, and see recent winners in a cleaner React layout.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={spin}
                  disabled={spinning}
                  className="rounded-xl bg-fuchsia-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-fuchsia-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {spinning ? 'Spinning...' : 'Spin Now'}
                </button>

                <Link
                  to="/promotion"
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                >
                  View Promotions
                </Link>
              </div>

              {message ? (
                <div className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm leading-7 text-amber-100">
                  {message}
                </div>
              ) : null}
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Spin Highlights</p>
                <ul className="mt-4 space-y-3 text-sm text-gray-300">
                  <li>• Reward-based landing experience</li>
                  <li>• Prize preview cards</li>
                  <li>• Recent winner showcase</li>
                  <li>• Easy backend connection later</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Page Status</p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">Ready</p>
                    <p className="text-sm text-gray-300">Landing spin UI active</p>
                  </div>
                  <span className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold text-fuchsia-300">
                    Live UI
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Quick Reward Entry',
              description:
                'Keep the spin action visible so users immediately understand what the landing page offers.',
            },
            {
              title: 'Prize Visibility',
              description:
                'Show a short preview of possible rewards instead of hiding everything behind the wheel.',
            },
            {
              title: 'Winner Trust Signal',
              description:
                'Recent winner blocks help the page feel active, social, and more engaging for users.',
            },
          ].map((item) => (
            <div key={item.title} className="card-surface p-5">
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-gray-300">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="card-surface p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-white">Prize preview</h2>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                {prizes.length} total
              </span>
            </div>

            {loading ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="h-4 animate-pulse rounded bg-white/10" />
                    <div className="mt-3 h-3 w-2/3 animate-pulse rounded bg-white/10" />
                  </div>
                ))}
              </div>
            ) : topPrizes.length > 0 ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {topPrizes.map((item, index) => (
                  <div
                    key={item.id || `${getPrizeLabel(item)}-${index}`}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-white">{getPrizeLabel(item)}</h3>
                      <span className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-300">
                        Prize
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-7 text-gray-300">
                      {item?.description || 'Reward item available in the landing spin pool.'}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-gray-300">
                No prize data returned from the backend.
              </div>
            )}
          </div>

          <div className="card-surface p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-white">Recent winners</h2>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                {winners.length} records
              </span>
            </div>

            {loading ? (
              <div className="mt-5 space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="h-4 animate-pulse rounded bg-white/10" />
                    <div className="mt-3 h-3 w-1/2 animate-pulse rounded bg-white/10" />
                  </div>
                ))}
              </div>
            ) : recentWinners.length > 0 ? (
              <div className="mt-5 space-y-4">
                {recentWinners.map((item, index) => (
                  <div
                    key={item.id || `${getWinnerLabel(item)}-${index}`}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-semibold text-white">{getWinnerLabel(item)}</h3>
                        <p className="mt-2 text-sm leading-7 text-gray-300">
                          Won: {item?.prize || item?.award || item?.title || 'Reward item'}
                        </p>
                      </div>

                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                        Winner
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-gray-300">
                No recent winner data returned from the backend.
              </div>
            )}
          </div>
        </section>

        <section className="card-surface p-6">
          <h2 className="text-2xl font-bold text-white">Landing page notes</h2>

          <div className="mt-5 space-y-4">
            {[
              'This page should stay visually strong even when prize data is temporarily unavailable.',
              'The spin button can later be connected to login checks, claim rules, and user eligibility.',
              'Prize cards and winner lists should come from backend-managed settings when ready.',
              'You can later add a proper wheel animation component without changing the whole layout.',
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-fuchsia-500 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="pt-1 text-sm leading-7 text-gray-300">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}