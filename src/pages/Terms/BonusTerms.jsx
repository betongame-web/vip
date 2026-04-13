import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';

const bonusSections = [
  {
    title: 'Bonus Eligibility',
    points: [
      'Some rewards may only apply to specific users, account levels, or campaign periods.',
      'Verification status, region, or account activity may affect whether a user can receive a bonus.',
      'The platform may reject bonus access if eligibility conditions are not met.',
    ],
  },
  {
    title: 'Usage Conditions',
    points: [
      'Bonus funds may be separated from the main withdrawable wallet balance.',
      'Certain campaigns may require activity, turnover, or participation before rewards are fully usable.',
      'A reward may expire if the user does not activate or use it within the allowed period.',
    ],
  },
  {
    title: 'Campaign Changes',
    points: [
      'Promotions and bonus campaigns may be updated, paused, or removed without keeping old offers permanently active.',
      'The platform may revise limits, percentages, or claim conditions for future campaign periods.',
      'Expired campaigns should not be assumed to remain available after the listed period.',
    ],
  },
  {
    title: 'Review & Abuse Prevention',
    points: [
      'The platform may investigate bonus misuse, duplicate claims, or suspicious account behavior.',
      'Abusive activity may lead to bonus removal, account limitation, or further verification review.',
      'Final bonus approval may depend on internal review and operational checks.',
    ],
  },
];

const bonusNotes = [
  'This page should clearly explain how bonuses work before users claim them.',
  'Users should quickly understand eligibility, usage conditions, and review rules.',
  'Later this page can be connected with backend-managed campaign data.',
  'Related promotion and welcome bonus pages should stay easy to access from here.',
];

export default function BonusTerms() {
  return (
    <BaseLayout>
      <div className="space-y-6">
        <section className="card-surface overflow-hidden">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
            <div>
              <span className="inline-flex rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-300">
                Bonus Terms
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Understand how bonus rewards, usage rules, and campaign conditions may apply
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                This page provides a cleaner overview of bonus-related rules so users can understand
                how eligibility, usage conditions, reward expiration, and review checks may affect
                promotional balances and special offers.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/terms/bonus-welcome"
                  className="rounded-xl bg-fuchsia-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-fuchsia-600"
                >
                  Welcome Bonus
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
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Bonus Areas</p>
                <ul className="mt-4 space-y-3 text-sm text-gray-300">
                  <li>• Eligibility rules</li>
                  <li>• Usage and expiry conditions</li>
                  <li>• Campaign updates</li>
                  <li>• Abuse prevention and review</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Page Status</p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">Ready</p>
                    <p className="text-sm text-gray-300">Bonus terms content active</p>
                  </div>
                  <span className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold text-fuchsia-300">
                    Visible
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {bonusSections.map((section) => (
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
          <h2 className="text-2xl font-bold text-white">Bonus term notes</h2>

          <div className="mt-5 space-y-4">
            {bonusNotes.map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-fuchsia-500 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="pt-1 text-sm leading-7 text-gray-300">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
            <h3 className="text-base font-semibold text-amber-200">Later integration</h3>
            <p className="mt-2 text-sm leading-7 text-amber-100/90">
              Later this page can read real campaign rules, bonus descriptions, and admin-managed
              promotional conditions directly from backend or CMS content.
            </p>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}