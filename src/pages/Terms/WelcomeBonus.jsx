import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';

const welcomeSections = [
  {
    title: 'Who Can Claim',
    points: [
      'Welcome bonus offers are usually intended for newly registered or first-time eligible users.',
      'Account verification, region, payment method, or campaign timing may affect eligibility.',
      'Duplicate or previously rewarded accounts may not qualify for the same welcome campaign again.',
    ],
  },
  {
    title: 'Deposit Conditions',
    points: [
      'Some welcome offers require a first successful deposit before the reward becomes active.',
      'Minimum deposit rules may apply before a user can unlock the campaign.',
      'The platform may reject a claim if the deposit does not meet the required amount or method.',
    ],
  },
  {
    title: 'Usage & Expiry',
    points: [
      'Welcome rewards may have limited activation time and should be used before they expire.',
      'Bonus-linked amounts may remain separate from regular withdrawable balance.',
      'Certain platforms may require activity, turnover, or usage conditions before full reward access.',
    ],
  },
  {
    title: 'Review & Restrictions',
    points: [
      'The platform may investigate unusual activity, multi-account behavior, or abusive reward claims.',
      'A welcome bonus may be paused, reversed, or removed if account review fails.',
      'Final approval can depend on internal checks, operational rules, or anti-abuse controls.',
    ],
  },
];

const highlightCards = [
  {
    title: 'New User Focus',
    description:
      'This page should clearly explain that the welcome reward is mainly designed for early user onboarding.',
  },
  {
    title: 'Deposit Visibility',
    description:
      'Users should quickly understand whether a first deposit is required before claiming the offer.',
  },
  {
    title: 'Rule Clarity',
    description:
      'The bonus conditions should be easy to read so users know how activation and expiry work.',
  },
];

const welcomeNotes = [
  'This page should explain the welcome reward clearly before the user tries to claim it.',
  'Users should be able to understand eligibility, deposit requirements, and expiry in one view.',
  'Later this page can be connected with backend-managed welcome bonus campaigns.',
  'Related bonus and promotion pages should remain easy to access from here.',
];

export default function WelcomeBonus() {
  return (
    <BaseLayout>
      <div className="space-y-6">
        <section className="card-surface overflow-hidden">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
            <div>
              <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Welcome Bonus
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Understand the starter reward rules for newly eligible users
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                This page gives users a clear overview of how a welcome bonus may work, including
                who can claim it, whether a deposit is required, how long it stays active, and what
                review conditions may apply before final use.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/terms/bonus"
                  className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                  Open Bonus Terms
                </Link>

                <Link
                  to="/promotion"
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                >
                  Promotions Page
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Key Areas</p>
                <ul className="mt-4 space-y-3 text-sm text-gray-300">
                  <li>• Eligibility and first claim rules</li>
                  <li>• Deposit requirements</li>
                  <li>• Usage and expiry conditions</li>
                  <li>• Review and abuse prevention</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Page Status</p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">Ready</p>
                    <p className="text-sm text-gray-300">Welcome bonus content active</p>
                  </div>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    Visible
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {highlightCards.map((card) => (
            <div key={card.title} className="card-surface p-5">
              <h2 className="text-lg font-semibold text-white">{card.title}</h2>
              <p className="mt-3 text-sm leading-7 text-gray-300">{card.description}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {welcomeSections.map((section) => (
            <div key={section.title} className="card-surface p-5">
              <h2 className="text-lg font-semibold text-white">{section.title}</h2>

              <div className="mt-4 space-y-3">
                {section.points.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-gray-300"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="card-surface p-6">
          <h2 className="text-2xl font-bold text-white">Welcome bonus notes</h2>

          <div className="mt-5 space-y-4">
            {welcomeNotes.map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="pt-1 text-sm leading-7 text-gray-300">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
            <h3 className="text-base font-semibold text-amber-200">Later integration</h3>
            <p className="mt-2 text-sm leading-7 text-amber-100/90">
              Later this page can read real welcome campaign rules, eligibility switches, deposit
              requirements, and admin-managed promotional content from backend data.
            </p>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}