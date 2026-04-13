import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';

const bonusCards = [
  {
    title: 'First Deposit Bonus',
    tag: 'Starter',
    description:
      'A dedicated offer block for new users after their first successful deposit. Good for onboarding and early retention.',
  },
  {
    title: 'Reload Bonus',
    tag: 'Recurring',
    description:
      'Use this section for second deposit, weekend reload, or periodic wallet top-up campaigns.',
  },
  {
    title: 'VIP Bonus',
    tag: 'Loyalty',
    description:
      'Reserved rewards for loyal users, higher-level members, or users with stronger account activity.',
  },
  {
    title: 'Referral Reward',
    tag: 'Invite',
    description:
      'A place to show invite-based rewards, referral commission, or friend activation bonuses.',
  },
];

const bonusConditions = [
  'Bonus funds may be separated from withdrawable cash balance.',
  'Some rewards may require verification or minimum activity.',
  'A campaign can expire after a fixed time or number of claims.',
  'Admin-controlled rules should later come from backend settings.',
];

export default function BonusPage() {
  return (
    <BaseLayout>
      <div className="space-y-6">
        <section className="card-surface overflow-hidden">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
            <div>
              <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
                Bonus Center
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Explore player rewards, campaign offers, and bonus opportunities
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                This page gives a premium bonus overview where users can understand available
                reward types, how campaigns work, and what conditions may apply before using
                or withdrawing bonus-linked amounts.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/promotion"
                  className="rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
                >
                  Open Promotions
                </Link>

                <Link
                  to="/vip"
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                >
                  View VIP Benefits
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Reward Types</p>
                <ul className="mt-4 space-y-3 text-sm text-gray-300">
                  <li>• Welcome rewards</li>
                  <li>• Deposit and reload bonuses</li>
                  <li>• VIP and loyalty perks</li>
                  <li>• Referral-linked incentives</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Visibility</p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">4+</p>
                    <p className="text-sm text-gray-300">Bonus categories highlighted</p>
                  </div>
                  <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
                    Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {bonusCards.map((item) => (
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

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">How bonus sections should guide users</h2>

            <div className="mt-5 space-y-4">
              {[
                'Keep reward names clear and easy to understand.',
                'Separate deposit bonuses, referral rewards, and VIP benefits.',
                'Show short campaign details first, then mention conditions.',
                'Use backend later to control availability, limits, and activation.',
              ].map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-gray-300">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">Important conditions</h2>

            <div className="mt-5 space-y-4">
              {bonusConditions.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-gray-300"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
              <h3 className="text-base font-semibold text-amber-200">Future backend connection</h3>
              <p className="mt-2 text-sm leading-7 text-amber-100/90">
                Later this page can read real bonus data from your backend so active offers,
                VIP benefits, and reward conditions are manageable from admin settings.
              </p>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}