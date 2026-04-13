import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import LoadingComponent from '@/components/common/LoadingComponent';
import EmptyState from '@/components/common/EmptyState';
import CasinoGameCard from '@/components/casino/CasinoGameCard';
import ProviderSection from '@/components/casino/ProviderSection';
import http from '@/services/http';
import { getStorageUrl } from '@/utils/url';

export default function HomePage() {
  const { action } = useParams();
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);
  const [homeBanners, setHomeBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredGames, setFeaturedGames] = useState([]);
  const [providers, setProviders] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      setErrors([]);
      try {
        const [categoriesRes, bannersRes, gamesRes, featuredRes] = await Promise.all([
          http.get('/categories'),
          http.get('/settings/banners'),
          http.get('/games/all'),
          http.get('/featured/games'),
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

  return (
    <BaseLayout>
      <LoadingComponent isLoading={loading} message="Loading platform data..." />
      {!loading ? (
        <div className="space-y-8">
          {errors.length > 0 ? (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              {errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}

          <section className="grid gap-4 lg:grid-cols-2">
            {(banners.length ? banners : homeBanners).slice(0, 4).map((banner) => (
              <a
                key={`${banner.id}-${banner.image}`}
                href={banner.link || '#'}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <img
                  src={getStorageUrl(banner.image)}
                  alt={banner.title || 'Banner'}
                  className="h-[220px] w-full object-cover"
                />
              </a>
            ))}
          </section>

          <section className="card-surface p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Categories</h2>
              <Link to="/casino/search" className="rounded-lg border border-white/10 px-3 py-2 text-sm">
                Search games
              </Link>
            </div>

            {categories.length > 0 ? (
              <div className="grid grid-cols-3 gap-4 md:grid-cols-6 xl:grid-cols-8">
                {categories.map((category) => (
                  <Link
                    key={category.id || category.slug}
                    to={`/casino/provider/all/category/${category.slug}`}
                    className="rounded-xl border border-white/10 bg-black/10 p-3 text-center hover:bg-white/5"
                  >
                    <img
                      src={getStorageUrl(category.image)}
                      alt={category.name}
                      className="mx-auto h-10 w-10 object-contain"
                    />
                    <p className="mt-3 text-xs text-gray-300">{category.name}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState title="No categories" description="The categories endpoint returned no category list." />
            )}
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Featured</h2>
              <Link to="/casinos" className="rounded-lg border border-white/10 px-3 py-2 text-sm">
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
              <EmptyState title="No featured games" description="The featured games endpoint returned an empty payload." />
            )}
          </section>

          {providers.map((provider) => (
            <ProviderSection key={provider.id || provider.name} provider={provider} />
          ))}

          {!providers.length && !featuredGames.length ? (
            <EmptyState
              title="Homepage data is empty"
              description="The React app is wired to the same Laravel API, but this backend instance did not return providers or games."
            />
          ) : null}
        </div>
      ) : null}
    </BaseLayout>
  );
}
