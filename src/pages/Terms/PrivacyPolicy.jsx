import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';

const privacySections = [
  {
    title: 'Information Collected',
    points: [
      'The platform may collect registration details, login data, wallet activity, and transaction-related information.',
      'Technical data such as device, browser, IP, and session logs may be used for security and platform stability.',
      'Support conversations or submitted documents may be reviewed when account verification is required.',
    ],
  },
  {
    title: 'How Information Is Used',
    points: [
      'User information may be used to provide account access, payment support, and platform-related services.',
      'Operational data may help with fraud prevention, risk review, and service improvement.',
      'Profile and transaction data may be used to investigate technical problems or support requests.',
    ],
  },
  {
    title: 'Security & Review',
    points: [
      'Reasonable security measures should be used to reduce unauthorized access or misuse.',
      'Some information may be reviewed during compliance, support, or suspicious activity checks.',
      'Access to sensitive information should be limited to authorized system or operational handling.',
    ],
  },
  {
    title: 'User Rights & Updates',
    points: [
      'Users may request clarification about stored account or support-related information where applicable.',
      'Privacy practices may be updated when platform operations, legal needs, or internal rules change.',
      'Major privacy-related updates should remain visible through policy or terms pages.',
    ],
  },
];

const privacyNotes = [
  'This page should explain privacy practices in a readable way, not only with dense legal text.',
  'Users should quickly understand what data may be collected and why it is used.',
  'Later this page can be connected with backend-managed policy content.',
  'Related legal pages should stay easy to access from here.',
];

export default function PrivacyPolicy() {
  return (
    <BaseLayout>
      <div className="space-y-6">
        <section className="card-surface overflow-hidden">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
            <div>
              <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
                Privacy Policy
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Understand how account, platform, and transaction-related information may be handled
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                This page gives users a cleaner overview of privacy-related practices, including
                what information may be collected, how it may be used, and how security and review
                processes can apply to account activity.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/terms/service"
                  className="rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
                >
                  Open Service Terms
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
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Privacy Areas</p>
                <ul className="mt-4 space-y-3 text-sm text-gray-300">
                  <li>• Data collection overview</li>
                  <li>• Information usage purpose</li>
                  <li>• Security and review handling</li>
                  <li>• User rights and updates</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Page Status</p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">Ready</p>
                    <p className="text-sm text-gray-300">Privacy content active</p>
                  </div>
                  <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
                    Visible
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {privacySections.map((section) => (
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
          <h2 className="text-2xl font-bold text-white">Privacy notes</h2>

          <div className="mt-5 space-y-4">
            {privacyNotes.map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="pt-1 text-sm leading-7 text-gray-300">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
            <h3 className="text-base font-semibold text-amber-200">Later integration</h3>
            <p className="mt-2 text-sm leading-7 text-amber-100/90">
              Later this page can read versioned privacy policy text, admin-managed legal content,
              and updated compliance notes from backend settings or CMS data.
            </p>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}