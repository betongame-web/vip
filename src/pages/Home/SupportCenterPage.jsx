import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';

const ticketTypes = [
  {
    title: 'Account Access',
    description: 'Login issue, password reset, verification problem, locked account, or session error.',
  },
  {
    title: 'Wallet & Payments',
    description: 'Deposit delay, withdrawal review, missing balance, payment mismatch, or gateway issue.',
  },
  {
    title: 'Game & Technical',
    description: 'Game loading issue, crash, lag, blank screen, mobile compatibility, or browser problem.',
  },
  {
    title: 'Bonus & Promotion',
    description: 'Promo claim issue, reward eligibility, mission condition, VIP bonus, or event rule question.',
  },
];

const responseFlow = [
  'Choose the support category that matches your problem.',
  'Prepare useful details like account email, transaction ID, game name, and device type.',
  'Submit the issue through the proper support channel.',
  'Wait for review, follow-up verification, or resolution update.',
];

const quickLinks = [
  { label: 'Open Support', to: '/support' },
  { label: 'Wallet Page', to: '/profile/wallet' },
  { label: 'Promotions', to: '/promotion' },
  { label: 'VIP Program', to: '/vip' },
];

export default function SupportCenterPage() {
  return (
    <BaseLayout>
      <div className="space-y-6">
        <section className="card-surface overflow-hidden">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.25fr_0.75fr] lg:p-8">
            <div>
              <span className="inline-flex rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                Help Desk
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Support Center for account, wallet, bonus, and technical assistance
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                This page gives users a central place to understand where to go for
                account recovery, payment issues, game problems, promotion questions,
                and general platform support.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/support"
                  className="rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
                >
                  Go to Support
                </Link>

                <Link
                  to="/profile"
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                >
                  Open Profile
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                  Estimated Handling
                </p>
                <div className="mt-3 space-y-3 text-sm text-gray-300">
                  <p>• Account issues: fast review</p>
                  <p>• Deposit/withdraw issues: priority check</p>
                  <p>• Game issues: technical investigation</p>
                  <p>• Promotions: rule verification</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Best Practice</p>
                <p className="mt-3 text-sm leading-7 text-gray-300">
                  Always send clear details. The more exact your report is, the faster the
                  support team can verify and solve the issue.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {ticketTypes.map((item) => (
            <div key={item.title} className="card-surface p-5">
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-gray-300">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">How to submit a good support request</h2>

            <div className="mt-5 space-y-4">
              {responseFlow.map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-gray-300">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-white">Quick navigation</h2>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                Useful links
              </span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {quickLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:bg-white/5"
                >
                  <div className="text-base font-semibold text-white">{item.label}</div>
                  <div className="mt-2 text-sm text-gray-400">{item.to}</div>
                </Link>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
              <h3 className="text-base font-semibold text-amber-200">Before contacting support</h3>
              <p className="mt-2 text-sm leading-7 text-amber-100/90">
                Double-check your registered email, transaction reference, wallet history,
                and the exact page where the issue happened. This reduces delay and helps
                faster verification.
              </p>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}