import { Link } from 'react-router-dom';
import { getAssetUrl, getStorageUrl } from '@/utils/url';

export default function CasinoGameCard({ game }) {
  if (!game) return null;
  const image = game.distribution === 'kagaming' ? game.cover : getStorageUrl(game.cover);
  return (
    <div className="item-game rounded-xl p-2">
      <Link to={`/games/play/${game.id}/${game.game_code}`}>
        <img
          src={image}
          alt={game.game_name}
          className="aspect-[4/5] w-full rounded-lg object-cover"
          loading="lazy"
        />
      </Link>
      <div className="flex items-center justify-between px-2 py-3">
        <div className="min-w-0">
          <p className="truncate text-xs">{game.game_name}</p>
          <p className="truncate text-[11px] text-gray-400">{game?.provider?.name || 'Provider'}</p>
        </div>
        <img src={getAssetUrl('images/icons/info-game.svg')} alt="Info" className="h-7 w-7 rounded-full bg-white/5 p-1" />
      </div>
    </div>
  );
}
