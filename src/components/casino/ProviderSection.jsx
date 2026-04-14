import { Link } from 'react-router-dom';
import CasinoGameCard from '@/components/casino/CasinoGameCard';

function providerLabel(provider) {
  return provider?.name || provider?.title || 'Provider';
}

function providerSlug(provider) {
  return provider?.slug || provider?.id || 'all';
}

function providerGames(provider) {
  if (Array.isArray(provider?.games)) return provider.games;
  if (Array.isArray(provider?.items)) return provider.items;
  return [];
}

export default function ProviderSection({ provider }) {
  const games = providerGames(provider).slice(0, 12);

  return (
    <section className="card-surface p-5">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{providerLabel(provider)}</h2>
          <p className="mt-2 text-sm leading-7 text-gray-300">
            Browse games from this provider and open the full listing page.
          </p>
        </div>

        <Link
          to={`/casino/provider/${providerSlug(provider)}/category/all`}
          className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10"
        >
          View all
        </Link>
      </div>

      {games.length ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
          {games.map((game) => (
            <CasinoGameCard key={game.id || game.game_code} game={game} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-gray-300">
          No games were returned for this provider.
        </div>
      )}
    </section>
  );
}