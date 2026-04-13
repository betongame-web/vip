import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import WalletSideMenu from '@/components/profile/WalletSideMenu';

const favoriteGames = [
  {
    title: 'Fortune Tiger',
    provider: 'Original',
    category: 'Slots',
    status: 'Active',
  },
  {
    title: 'Fortune Rabbit',
    provider: 'Original',
    category: 'Slots',
    status: 'Active',
  },
  {
    title: 'Treasures of Aztec',
    provider: 'Original',
    category: 'Featured',
    status: 'Popular',
  },
  {
    title: 'Phoenix Rises',
    provider: 'Original',
    category: 'Casino',
    status: 'New',
  },
];

const favoriteNotes = [
  'This page should help users quickly reopen saved games.',
  'Favorite items should later come from backend user preference data.',
  'Filters such as provider, category, and last played can be added later.',
  'A remove-from-favorites action can be connected after backend integration.',
];

function badgeClasses(status) {
  if (status === 'Active') {
    return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
  }
  if (status === 'Popular') {
    return 'border-amber-500/30 bg-amber-500/10 text-amber-300';
  }
  return 'border-sky-500/30 bg-sky-500/10 text-sky-300';
}

export default function FavoritePage() {
  return (
    <BaseLayout>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-6">
          <WalletSideMenu />

          <div className="card-surface p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Saved Games</p>
            <div className="mt-4 space-y-3">
              {[
                { label: 'Total Favorites', value: '24' },
                { label: 'Active Games', value: '18' },
                { label: 'Recently Opened', value: '7' },
                { label: 'Preferred Category', value: 'Slots' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3"
                >
                  <span className="text-sm text-gray-300">{item.label}</span>
                  <span className="text-sm font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <section className="card-surface overflow-hidden">
            <div className="grid gap-6 p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
              <div>
                <span className="inline-flex rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-pink-300">
                  Favorites
                </span>

                <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Open your saved games, preferred titles, and most-loved picks quickly
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                  This page works as the player’s favorites area, where selected games can be
                  reopened quickly without searching again through the full casino catalog.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/casinos"
                    className="rounded-xl bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
                  >
                    Browse Games
                  </Link>

                  <Link
                    to="/profile/recents"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    Open Recents
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Favorite Purpose</p>
                  <ul className="mt-4 space-y-3 text-sm text-gray-300">
                    <li>• Fast access to saved games</li>
                    <li>• Better replay experience</li>
                    <li>• User preference visibility</li>
                    <li>• Cleaner personal game list</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Collection Status</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-white">Ready</p>
                      <p className="text-sm text-gray-300">Favorite list UI active</p>
                    </div>
                    <span className="rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-300">
                      Visible
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="card-surface p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Favorite games</h2>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  This is a styled preview list. Later it can be powered by real user favorite data.
                </p>
              </div>

              <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                Saved collection
              </span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {favoriteGames.map((game) => (
                <div
                  key={game.title}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{game.title}</h3>
                      <p className="mt-2 text-sm text-gray-400">{game.provider}</p>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${badgeClasses(
                        game.status,
                      )}`}
                    >
                      {game.status}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm text-gray-300">
                    <span>Category: {game.category}</span>
                    <span>Saved</span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      to="/casinos"
                      className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-600"
                    >
                      Open Game
                    </Link>

                    <button
                      type="button"
                      className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">Favorite notes</h2>

            <div className="mt-5 space-y-4">
              {favoriteNotes.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-gray-300">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
              <h3 className="text-base font-semibold text-amber-200">Later integration</h3>
              <p className="mt-2 text-sm leading-7 text-amber-100/90">
                Later this page can show real saved games, add or remove favorite actions,
                provider filters, and backend-driven user preference data.
              </p>
            </div>
          </section>
        </div>
      </div>
    </BaseLayout>
  );
}