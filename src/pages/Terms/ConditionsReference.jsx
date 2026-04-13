import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';

const referenceBlocks = [
  {
    title: 'Account Eligibility',
    items: [
      'Users must provide valid registration details.',
      'Duplicate, fake, or misleading accounts may be limited or removed.',
      'Account access may depend on verification status and platform rules.',
    ],
  },
  {
    title: 'Wallet & Payments',
    items: [
      'Deposits and withdrawals may be reviewed before final approval.',
      'Payment methods can depend on enabled gateway settings.',
      'Bonus funds may be separated from withdrawable balance.',
    ],
  },
  {
    title: 'Game & Platform Use',
    items: [
      'Game access may be restricted during maintenance or provider downtime.',
      'Users are responsible for reviewing their own session and balance activity.',
      'Technical interruptions may require support review before adjustment.',
    ],
  },
  {
    title: 'Support & Review',
    items: [
      'The platform may request extra information during account or payment review.',
      'Support requests should include clear details for faster resolution.',
      'Final review actions may depend on internal compliance or operational checks.',
    ],
  },
];

const conditionNotes = [
  'This page should serve as a simple conditions overview, not only a long wall of text.',
  'Users should quickly understand the main rules before reading detailed legal pages.',
  'Later this page can be connected with backend CMS or admin-managed legal content.',
  'The design should remain readable on both desktop and mobile screens.',
];

export default function ConditionsReference() {
  return (
    <BaseLayout>
      <div className="space-y-6">
        <section className="card-surface overflow-hidden">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
            <div>
              <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Conditions Reference
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Review the core platform rules, payment conditions, and account usage guidelines
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                This page is designed as a readable conditions overview where users can quickly
                understand the main rules related to account use, wallet activity, gameplay access,
                and support review procedures.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/terms/service"
                  className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Open Service Terms
                </Link>

                <Link
                  to="/terms/privacy-policy"
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Reference Areas</p>
                <ul className="mt-4 space-y-3 text-sm text-gray-300">
                  <li>• Account conditions</li>
                  <li>• Wallet and payment rules</li>
                  <li>• Platform and gameplay use</li>
                  <li>• Support and review actions</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Page Status</p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">Ready</p>
                    <p className="text-sm text-gray-300">Reference content active</p>
                  </div>
                  <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                    Visible
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {referenceBlocks.map((block) => (
            <div key={block.title} className="card-surface p-5">
              <h2 className="text-lg font-semibold text-white">{block.title}</h2>

              <div className="mt-4 space-y-3">
                {block.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-gray-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="card-surface p-6">
          <h2 className="text-2xl font-bold text-white">Conditions notes</h2>

          <div className="mt-5 space-y-4">
            {conditionNotes.map((item, index) => (
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
              Later this page can read legal text, dynamic rule sections, and admin-managed
              content from backend settings or CMS tables.
            </p>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}