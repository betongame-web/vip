import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import TableVip from './Vip/TableVip';

const vipHighlights = [
  {
    title: 'Priority Support',
    description:
      'Higher-tier members can receive faster assistance for account, wallet, and platform issues.',
  },
  {
    title: 'Exclusive Rewards',
    description:
      'VIP levels can unlock custom bonus offers, loyalty gifts, and limited premium campaigns.',
  },
  {
    title: 'Higher Limits',
    description:
      'Top-level accounts may access higher withdrawal flexibility and premium account handling.',
  },
  {
    title: 'Special Events',
    description:
      'VIP-only tournaments, invite campaigns, and member-exclusive event participation areas.',
  },
];

const vipSteps = [
  'Users become eligible through activity, loyalty, or admin-defined conditions.',
  'Each level can unlock better rewards, support access, and campaign opportunities.',
  'The benefits table should stay visible so users understand how progression works.',
  'Later this page can be connected with real backend VIP progress and requirements.',
];

export default function VIP() {
  return (
    <BaseLayout>
      <div className="space-y-6">
        <section className="card-surface overflow-hidden">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
            <div>
              <span className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-yellow-300">
                VIP Program
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Premium member tiers, exclusive benefits, and loyalty-based rewards
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                This page is designed to present VIP levels in a premium way so users can
                understand reward progression, member privileges, and the value of staying active.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/bonus"
                  className="rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-400"
                >
                  View Bonus Page
                </Link>

                <Link
                  to="/promotion"
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                >
                  Open Promotions
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Member Benefits</p>
                <ul className="mt-4 space-y-3 text-sm text-gray-300">
                  <li>• Loyalty rewards</li>
                  <li>• VIP-only events</li>
                  <li>• Premium support access</li>
                  <li>• Higher-value campaign offers</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Program Status</p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">10</p>
                    <p className="text-sm text-gray-300">Illustrated VIP levels</p>
                  </div>
                  <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-300">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {vipHighlights.map((item) => (
            <div key={item.title} className="card-surface p-5">
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-gray-300">{item.description}</p>
            </div>
          ))}
        </section>

        <TableVip />

        <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">How VIP progression should work</h2>

            <div className="mt-5 space-y-4">
              {vipSteps.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-500 text-sm font-bold text-slate-950">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">VIP notes</h2>

            <div className="mt-5 space-y-4">
              {[
                'Each level should clearly show benefit differences.',
                'Support priority and reward visibility should improve with level growth.',
                'Progress bars and real member data can later come from backend.',
                'The page should remain easy to read on both desktop and mobile.',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-gray-300"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
              <h3 className="text-base font-semibold text-amber-200">Later integration</h3>
              <p className="mt-2 text-sm leading-7 text-amber-100/90">
                Later this page can display real VIP progress, upgrade requirements,
                claimed benefits, and current tier data from backend.
              </p>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}