import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';

const serviceSections = [
  {
    title: 'Account Use',
    points: [
      'Users are responsible for keeping login information secure.',
      'Providing misleading, false, or duplicate registration data may lead to review or restriction.',
      'The platform may request additional verification before allowing full account use.',
    ],
  },
  {
    title: 'Deposits & Withdrawals',
    points: [
      'Deposits and withdrawals can be delayed by verification, gateway review, or operational checks.',
      'Users should ensure submitted payment details are correct before confirming requests.',
      'The platform may reject or hold a transaction if unusual activity is detected.',
    ],
  },
  {
    title: 'Bonuses & Promotions',
    points: [
      'Campaigns may carry separate usage rules, time limits, or wagering-style conditions.',
      'Bonus-linked amounts may not be treated the same as withdrawable cash balance.',
      'The platform may update, pause, or remove promotions without keeping all offers permanently active.',
    ],
  },
  {
    title: 'Platform Availability',
    points: [
      'Games, services, or payment methods may become temporarily unavailable during maintenance.',
      'Technical interruptions may require investigation before account adjustments are made.',
      'Third-party provider delays can affect gameplay, records, or settlement visibility.',
    ],
  },
];

const serviceNotes = [
  'This page should act as a readable service terms overview, not just a dense legal wall.',
  'Users should understand the most important operational rules at a glance.',
  'Later this page can be connected to admin-managed legal text from backend.',
  'Related legal pages should stay easy to access from here.',
];

export default function ServiceTerms() {
  return (
    <BaseLayout>
      <div className="space-y-6">
        <section className="card-surface overflow-hidden">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
            <div>
              <span className="inline-flex rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                Service Terms
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Understand the main service rules for account access, payments, and platform use
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                This page gives users a cleaner overview of the core service rules that may apply
                to account usage, deposit and withdrawal handling, bonus campaigns, and platform availability.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/terms/privacy-policy"
                  className="rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
                >
                  Open Privacy Policy
                </Link>

                <Link
                  to="/terms/bonus"
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                >
                  Bonus Terms
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Key Areas</p>
                <ul className="mt-4 space-y-3 text-sm text-gray-300">
                  <li>• Account use rules</li>
                  <li>• Deposit and withdrawal handling</li>
                  <li>• Bonus and promotion conditions</li>
                  <li>• Platform availability and service interruptions</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Page Status</p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">Ready</p>
                    <p className="text-sm text-gray-300">Service rules content active</p>
                  </div>
                  <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-300">
                    Visible
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {serviceSections.map((section) => (
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
          <h2 className="text-2xl font-bold text-white">Service term notes</h2>

          <div className="mt-5 space-y-4">
            {serviceNotes.map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-slate-950">
                  {index + 1}
                </div>
                <p className="pt-1 text-sm leading-7 text-gray-300">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
            <h3 className="text-base font-semibold text-amber-200">Later integration</h3>
            <p className="mt-2 text-sm leading-7 text-amber-100/90">
              Later this page can read full legal text, versioned policy content, and admin-managed
              service rules from backend settings or a CMS section.
            </p>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}