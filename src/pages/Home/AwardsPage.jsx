import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';

const awardCards = [
  {
    title: 'Top Player Rewards',
    tag: 'Leaderboard',
    description:
      'A featured area for weekly or monthly top-performing users, ranking rewards, and special leaderboard recognition.',
  },
  {
    title: 'Loyalty Milestone Gifts',
    tag: 'Loyalty',
    description:
      'Display milestone-based reward achievements for long-term users, active members, or high-value participants.',
  },
  {
    title: 'Seasonal Event Awards',
    tag: 'Event',
    description:
      'Use this block for tournament prizes, seasonal campaigns, or limited-time celebration rewards.',
  },
  {
    title: 'VIP Exclusive Prizes',
    tag: 'VIP',
    description:
      'Show premium member rewards, private gift pools, exclusive campaigns, and high-tier account benefits.',
  },
];

const awardHighlights = [
  'Highlight winners clearly with category labels and campaign timing.',
  'Group awards by leaderboard, event, milestone, and VIP type.',
  'Keep active and expired reward sections separate for clarity.',
  'Later connect this page with backend-managed event and bonus data.',
];

const winnerPreview = [
  { name: 'Elite Player', reward: '$2,500 Campaign Reward', status: 'Claimed' },
  { name: 'Gold Member', reward: '$1,000 Loyalty Prize', status: 'Pending' },
  { name: 'Season Winner', reward: 'VIP Upgrade + Bonus Pack', status: 'Delivered' },
];

export default function AwardsPage() {
  return (
    <BaseLayout>
      <div className="space-y-6">
        <section className="card-surface overflow-hidden">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
            <div>
              <span className="inline-flex rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                Awards & Recognition
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Showcase player achievements, campaign prizes, and premium reward highlights
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                This page is designed to present awards, leaderboard prizes, seasonal gifts,
                and VIP recognition in a cleaner and more premium format.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/events"
                  className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
                >
                  View Event Page
                </Link>

                <Link
                  to="/vip"
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                >
                  Open VIP Benefits
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Award Areas</p>
                <ul className="mt-4 space-y-3 text-sm text-gray-300">
                  <li>• Top player campaigns</li>
                  <li>• Loyalty and milestone gifts</li>
                  <li>• Seasonal event prizes</li>
                  <li>• VIP recognition rewards</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Showcase Slots</p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">4+</p>
                    <p className="text-sm text-gray-300">Award sections featured</p>
                  </div>
                  <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                    Highlighted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {awardCards.map((item) => (
            <div key={item.title} className="card-surface p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                  {item.tag}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-gray-300">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">How award pages should be organized</h2>

            <div className="mt-5 space-y-4">
              {awardHighlights.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-slate-950">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-white">Winner preview</h2>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                Sample
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {winnerPreview.map((item) => (
                <div
                  key={`${item.name}-${item.reward}`}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-white">{item.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-gray-300">{item.reward}</p>
                    </div>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
              <h3 className="text-base font-semibold text-amber-200">Later integration</h3>
              <p className="mt-2 text-sm leading-7 text-amber-100/90">
                This page can later be connected with event results, VIP campaigns,
                leaderboard data, or admin-controlled reward records from backend.
              </p>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}