import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import WalletSideMenu from '@/components/profile/WalletSideMenu';

const recentItems = [
  {
    title: 'Fortune Tiger',
    provider: 'Original',
    category: 'Slots',
    lastPlayed: '2 minutes ago',
    status: 'Hot',
  },
  {
    title: 'Treasures of Aztec',
    provider: 'Original',
    category: 'Featured',
    lastPlayed: '15 minutes ago',
    status: 'Recent',
  },
  {
    title: 'Phoenix Rises',
    provider: 'Original',
    category: 'Casino',
    lastPlayed: '1 hour ago',
    status: 'Played',
  },
  {
    title: 'Fortune Rabbit',
    provider: 'Original',
    category: 'Slots',
    lastPlayed: 'Today',
    status: 'Recent',
  },
];

const recentNotes = [
  'This page should help users quickly reopen recently played games.',
  'Recent activity should later come from backend history data.',
  'Sorting by latest played time can be added later.',
  'A clear replay action improves the player experience.',
];

function badgeClasses(status) {
  if (status === 'Hot') {
    return 'border-rose-500/30 bg-rose-500/10 text-rose-300';
  }
  if (status === 'Recent') {
    return 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300';
  }
  return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
}

export default function RecentsPage() {
  return (
    <BaseLayout>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-6">
          <WalletSideMenu />

          <div className="card-surface p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Recent Summary</p>
            <div className="mt-4 space-y-3">
              {[
                { label: 'Recently Played', value: '16' },
                { label: 'Today', value: '5' },
                { label: 'Top Category', value: 'Slots' },
                { label: 'Replay Ready', value: 'Yes' },
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
                <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  Recent Activity
                </span>

                <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Reopen your recently played games without searching again
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                  This page works as a recently played section where users can quickly continue
                  from their latest game activity and reopen titles they accessed before.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/casinos"
                    className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Browse Games
                  </Link>

                  <Link
                    to="/profile/favorite"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    Open Favorites
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Recent Purpose</p>
                  <ul className="mt-4 space-y-3 text-sm text-gray-300">
                    <li>• Fast replay access</li>
                    <li>• Better activity continuity</li>
                    <li>• Cleaner personal history</li>
                    <li>• Quick reopen experience</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Replay Status</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-white">Ready</p>
                      <p className="text-sm text-gray-300">Recent list UI active</p>
                    </div>
                    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
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
                <h2 className="text-2xl font-bold text-white">Recently played</h2>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  This is a styled preview list. Later it can be powered by real recent play data.
                </p>
              </div>

              <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                Latest session history
              </span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {recentItems.map((item) => (
                <div
                  key={`${item.title}-${item.lastPlayed}`}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm text-gray-400">{item.provider}</p>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${badgeClasses(
                        item.status,
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-gray-300">
                    <p>Category: {item.category}</p>
                    <p>Last played: {item.lastPlayed}</p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      to="/casinos"
                      className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                      Play Again
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
            <h2 className="text-2xl font-bold text-white">Recent activity notes</h2>

            <div className="mt-5 space-y-4">
              {recentNotes.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold text-slate-950">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-gray-300">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
              <h3 className="text-base font-semibold text-amber-200">Later integration</h3>
              <p className="mt-2 text-sm leading-7 text-amber-100/90">
                Later this page can show real recently played history, replay links, last session
                timestamps, and backend-driven user activity records.
              </p>
            </div>
          </section>
        </div>
      </div>
    </BaseLayout>
  );
}