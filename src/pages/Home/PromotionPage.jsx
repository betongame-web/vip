import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';

const promoCards = [
  {
    title: 'Welcome Bonus',
    tag: 'New Players',
    description:
      'A starter promotion area for newly registered users. You can later connect this section with backend bonus settings.',
  },
  {
    title: 'Weekly Cashback',
    tag: 'Recurring',
    description:
      'Show weekly return offers, reload rewards, or balance-based cashback programs for active players.',
  },
  {
    title: 'VIP Reward Boost',
    tag: 'VIP',
    description:
      'Highlight loyalty rewards, level-based gifts, higher limits, and premium support access for VIP users.',
  },
  {
    title: 'Limited Event Offers',
    tag: 'Seasonal',
    description:
      'Use this area for short campaign promotions, tournament rewards, seasonal bonuses, or referral pushes.',
  },
];

const promoRules = [
  'Promotions may have wagering or usage conditions.',
  'Eligibility can depend on account level, region, or verification status.',
  'Bonus funds may be separated from withdrawable wallet balance.',
  'Expired campaigns should be removed or marked inactive.',
];

export default function PromotionPage() {
  return (
    <BaseLayout>
      <div className="space-y-6">
        <section className="card-surface overflow-hidden">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
            <div>
              <span className="inline-flex rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-300">
                Promotions
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Discover bonus campaigns, VIP rewards, and special player offers
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                This page is designed to present your active promotional offers in a clean
                and premium layout. Later, you can connect it with backend bonus, event,
                and VIP settings.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/bonus"
                  className="rounded-xl bg-fuchsia-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-fuchsia-600"
                >
                  View Bonus Page
                </Link>

                <Link
                  to="/vip"
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                >
                  Open VIP Page
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                  Promotion Focus
                </p>
                <ul className="mt-4 space-y-3 text-sm text-gray-300">
                  <li>• New user onboarding bonus</li>
                  <li>• Deposit and reload campaigns</li>
                  <li>• VIP and loyalty incentives</li>
                  <li>• Referral and event rewards</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Campaign Status</p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">4+</p>
                    <p className="text-sm text-gray-300">Featured promotion slots</p>
                  </div>
                  <span className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold text-fuchsia-300">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {promoCards.map((item) => (
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
            <h2 className="text-2xl font-bold text-white">How promotions should be displayed</h2>

            <div className="mt-5 space-y-4">
              {[
                'Keep featured offers visible at the top of the page.',
                'Group rewards by category such as welcome, cashback, VIP, and seasonal.',
                'Show short descriptions first and full conditions later on dedicated sections.',
                'Remove expired campaigns or mark them clearly to avoid confusion.',
              ].map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-fuchsia-500 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-gray-300">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">Important promotion notes</h2>

            <div className="mt-5 space-y-4">
              {promoRules.map((rule) => (
                <div
                  key={rule}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-gray-300"
                >
                  {rule}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
              <h3 className="text-base font-semibold text-amber-200">Admin note</h3>
              <p className="mt-2 text-sm leading-7 text-amber-100/90">
                Later you can connect this page with backend promotion tables, banner data,
                bonus conditions, or CMS-managed content blocks.
              </p>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}