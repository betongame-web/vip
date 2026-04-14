import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import LoadingComponent from '@/components/common/LoadingComponent';
import EmptyState from '@/components/common/EmptyState';
import CasinoGameCard from '@/components/casino/CasinoGameCard';
import ShowCarousel from '@/pages/Home/components/ShowCarousel';
import ShowProviders from '@/pages/Home/components/ShowProviders';
import MissionDaily from '@/pages/Home/components/MissionDaily';
import MissionWeekly from '@/pages/Home/components/MissionWeekly';
import MissionModal from '@/components/missions/MissionModal';
import CounterComponent from '@/components/ui/CounterComponent';
import MakeDeposit from '@/components/ui/MakeDeposit';
import FootballGameWidget from '@/components/widgets/FootballGameWidget';
import http from '@/services/http';

const dailyMissions = [
  {
    id: 'd1',
    title: 'Open 3 featured games',
    description: 'Browse the highlighted casino section and open at least three featured titles.',
    reward: '$5 Bonus',
  },
  {
    id: 'd2',
    title: 'Visit live sports',
    description: 'Check the live sportsbook page and open one match detail screen.',
    reward: '10 Loyalty Points',
  },
  {
    id: 'd3',
    title: 'Complete wallet review',
    description: 'Open wallet, deposit, and transactions pages to review the payment flow.',
    reward: 'Profile Badge',
  },
];

const weeklyMissions = [
  {
    id: 'w1',
    title: 'Return 5 days this week',
    description: 'Come back to the platform regularly and keep your account active this week.',
    reward: '$20 Weekly Bonus',
  },
  {
    id: 'w2',
    title: 'Save favorite sports matches',
    description: 'Mark important matches as favorite from the sportsbook pages.',
    reward: '25 Loyalty Points',
  },
  {
    id: 'w3',
    title: 'Explore provider sections',
    description: 'Open multiple provider blocks from the homepage and review game availability.',
    reward: 'Mystery Reward',
  },
];

export default function HomePage() {
  const { action } = useParams();

  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);
  const [homeBanners, setHomeBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredGames, setFeaturedGames] = useState([]);
  const [providers, setProviders] = useState([]);
  const [errors, setErrors] = useState([]);
  const [activeMission, setActiveMission] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setErrors([]);

      try {
        const [categoriesRes, bannersRes, gamesRes, featuredRes] = await Promise.all([
          http.get('/categories').catch(() => ({ data: { categories: [] } })),
          http.get('/settings/banners').catch(() => ({ data: { banners: [] } })),
          http.get('/games/all').catch(() => ({ data: { providers: [] } })),
          http.get('/featured/games').catch(() => ({ data: { featured_games: [] } })),
        ]);

        if (ignore) return;

        const allBanners = bannersRes.data?.banners || [];
        setCategories(categoriesRes.data?.categories || []);
        setBanners(allBanners.filter((item) => item.type === 'carousel'));
        setHomeBanners(allBanners.filter((item) => item.type === 'home'));
        setProviders(gamesRes.data?.providers || []);
        setFeaturedGames(featuredRes.data?.featured_games || []);
      } catch (error) {
        if (!ignore) {
          setErrors([error?.response?.data?.message || 'Failed to load homepage data.']);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [action]);

  const visibleBanners = useMemo(() => {
    const merged = banners.length ? banners : homeBanners;
    return merged.slice(0, 4);
  }, [banners, homeBanners]);

  const providerCount = providers.length;
  const categoryCount = categories.length;
  const featuredCount = featuredGames.length;

  return (
    <BaseLayout>
      <LoadingComponent isLoading={loading} message="Loading platform data..." />

      {!loading ? (
        <div className="space-y-8">
          {errors.length > 0 ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              {errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}

          <section className="card-surface overflow-hidden">
            <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
              <div>
                <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Platform Overview
                </span>

                <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl">
                  Casino, sportsbook, wallet, promotions, missions, and user account flow in one frontend
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                  This homepage acts as the central entry point for casino browsing, sports
                  navigation, wallet actions, promotions, profile access, and mission-style engagement blocks.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/casinos"
                    className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                  >
                    Browse Casino
                  </Link>

                  <Link
                    to="/sports"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    Open Sports
                  </Link>

                  <Link
                    to="/promotion"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    Promotions
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <CounterComponent label="Categories" value={categoryCount} />
                <CounterComponent label="Featured Games" value={featuredCount} />
                <CounterComponent label="Providers" value={providerCount} />
                <CounterComponent label="Daily Missions" value={dailyMissions.length} />
              </div>
            </div>
          </section>

          <ShowCarousel banners={visibleBanners} />

          <section className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Casino Access',
                description:
                  'Users can jump directly into categories, providers, and featured games from the homepage.',
              },
              {
                title: 'Sports Shortcut',
                description:
                  'The homepage also works as a fast route into live matches and sportsbook pages.',
              },
              {
                title: 'Mission Visibility',
                description:
                  'Daily and weekly mission sections can now be surfaced directly on the homepage.',
              },
            ].map((item) => (
              <div key={item.title} className="card-surface p-5">
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-300">{item.description}</p>
              </div>
            ))}
          </section>

          <MakeDeposit />

          <section className="card-surface p-5">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Categories</h2>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  Use categories to enter the casino catalog more quickly.
                </p>
              </div>

              <Link
                to="/casino/search"
                className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
              >
                Search games
              </Link>
            </div>

            {categories.length > 0 ? (
              <div className="grid grid-cols-3 gap-4 md:grid-cols-6 xl:grid-cols-8">
                {categories.map((category) => (
                  <Link
                    key={category.id || category.slug}
                    to={`/casino/provider/all/category/${category.slug}`}
                    className="rounded-2xl border border-white/10 bg-black/20 p-3 text-center transition hover:bg-white/5"
                  >
                    <img
                      src={category.image ? `${import.meta.env.VITE_STORAGE_URL || ''}${String(category.image).startsWith('http') ? '' : '/'}${category.image}` : ''}
                      alt={category.name}
                      className="mx-auto h-10 w-10 object-contain"
                    />
                    <p className="mt-3 text-xs text-gray-300">{category.name}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No categories"
                description="The categories endpoint returned no category list."
              />
            )}
          </section>

          <section className="card-surface p-5">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Featured games</h2>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  Highlighted titles users are most likely to open first.
                </p>
              </div>

              <Link
                to="/casinos"
                className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
              >
                Browse all
              </Link>
            </div>

            {featuredGames.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
                {featuredGames.map((game) => (
                  <CasinoGameCard key={game.id || game.game_code} game={game} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No featured games"
                description="The featured games endpoint returned an empty payload."
              />
            )}
          </section>

          <MissionDaily missions={dailyMissions} onOpen={setActiveMission} />
          <MissionWeekly missions={weeklyMissions} onOpen={setActiveMission} />

          <FootballGameWidget />

          <ShowProviders providers={providers} />

          {!providers.length && !featuredGames.length ? (
            <EmptyState
              title="Homepage data is empty"
              description="The API did not return providers or featured games for this homepage."
            />
          ) : null}
        </div>
      ) : null}

      <MissionModal open={Boolean(activeMission)} mission={activeMission} onClose={() => setActiveMission(null)} />
    </BaseLayout>
  );
}
