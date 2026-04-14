import { Link } from 'react-router-dom';
import { getStorageUrl } from '@/utils/url';

function gameId(game) {
  return game?._id || game?.id || game?.game_code || 'game';
}

function gameSlug(game) {
  const raw = game?.slug || game?.game_name || game?.name || 'game';
  return String(raw)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function gameName(game) {
  return game?.game_name || game?.name || 'Game';
}

function providerName(game) {
  if (typeof game?.provider === 'string') return game.provider;
  return game?.provider?.name || 'Provider';
}

function imageUrl(game) {
  const image =
    game?.cover ||
    game?.image ||
    game?.img ||
    game?.banner ||
    game?.game_cover ||
    '';

  return image ? getStorageUrl(image) : '';
}

export default function CasinoGameCard({ game }) {
  const id = gameId(game);
  const slug = gameSlug(game);
  const title = gameName(game);
  const provider = providerName(game);
  const image = imageUrl(game);

  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-brandgray-800/80 transition hover:-translate-y-0.5 hover:bg-brandgray-800">
      <Link to={`/games/play/${id}/${slug}`} className="block">
        <div className="aspect-[4/5] overflow-hidden bg-black/20">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center text-sm text-gray-400">
              No image available
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="truncate text-sm font-semibold text-white">{title}</h3>
          <p className="mt-1 truncate text-xs text-gray-400">{provider}</p>

          <div className="mt-3 flex items-center justify-between">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-gray-300">
              Casino
            </span>

            <span className="text-xs font-semibold text-emerald-300">Play now</span>
          </div>
        </div>
      </Link>
    </article>
  );
}