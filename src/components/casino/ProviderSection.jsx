import { Link } from 'react-router-dom';
import CasinoGameCard from '@/components/casino/CasinoGameCard';

export default function ProviderSection({ provider }) {
  if (!provider) return null;
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold">{provider.name}</h2>
        <Link
          to={`/casino/provider/${provider.id}/category/all`}
          className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300"
        >
          See all
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
        {(provider.games || []).slice(0, 12).map((game) => (
          <CasinoGameCard key={game.id || game.game_code} game={game} />
        ))}
      </div>
    </section>
  );
}
