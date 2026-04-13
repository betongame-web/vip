import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import WalletSideMenu from '@/components/profile/WalletSideMenu';

const affiliateStats = [
  { label: 'Referral Code', value: 'VIP-2026' },
  { label: 'Total Referrals', value: '18' },
  { label: 'Active Users', value: '11' },
  { label: 'Estimated Earnings', value: '$420.00' },
];

const affiliateCards = [
  {
    title: 'Invite Friends',
    description:
      'Share your referral code or link so new users can register through your account.',
  },
  {
    title: 'Track Activity',
    description:
      'Review how many users joined, became active, and generated affiliate-related activity.',
  },
  {
    title: 'Earn Rewards',
    description:
      'Show referral-based bonus, commission, or cashback-style partner incentives.',
  },
  {
    title: 'Monitor Progress',
    description:
      'Keep the affiliate area simple so users understand results without confusion.',
  },
];

const referralRows = [
  { name: 'User A', joined: '2026-04-10', status: 'Active', value: '$120.00' },
  { name: 'User B', joined: '2026-04-09', status: 'Pending', value: '$40.00' },
  { name: 'User C', joined: '2026-04-07', status: 'Active', value: '$180.00' },
  { name: 'User D', joined: '2026-04-05', status: 'Review', value: '$80.00' },
];

const affiliateNotes = [
  'This page should work as the main referral and partner activity area.',
  'Later the referral code, earnings, and users should come from backend APIs.',
  'Filters for date, status, and commission period can be added later.',
  'A copy-link action can be connected later with real referral URLs.',
];

function badgeClasses(status) {
  if (status === 'Active') {
    return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
  }
  if (status === 'Pending') {
    return 'border-amber-500/30 bg-amber-500/10 text-amber-300';
  }
  return 'border-sky-500/30 bg-sky-500/10 text-sky-300';
}

export default function AffiliatePage() {
  return (
    <BaseLayout>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-6">
          <WalletSideMenu />

          <div className="card-surface p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Affiliate Summary</p>
            <div className="mt-4 space-y-3">
              {affiliateStats.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3"
                >
                  <span className="text-sm text-gray-300">{item.label}</span>
                  <span className="text-sm font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <section className="card-surface overflow-hidden">
            <div className="grid gap-6 p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
              <div>
                <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
                  Affiliate Center
                </span>

                <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Track referrals, partner activity, and affiliate reward progress
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                  This page works as the affiliate dashboard where users can view referral
                  performance, joined members, activity status, and estimated rewards.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
                  >
                    Copy Referral Code
                  </button>

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
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Affiliate Purpose</p>
                  <ul className="mt-4 space-y-3 text-sm text-gray-300">
                    <li>• Referral growth tracking</li>
                    <li>• Reward visibility</li>
                    <li>• Activity monitoring</li>
                    <li>• Cleaner partner dashboard</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Program Status</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-white">Ready</p>
                      <p className="text-sm text-gray-300">Affiliate UI active</p>
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
            {affiliateCards.map((item) => (
              <div key={item.title} className="card-surface p-5">
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-300">{item.description}</p>
              </div>
            ))}
          </section>

          <section className="card-surface p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Referral activity</h2>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  This is a styled preview list. Later it can be powered by real affiliate data.
                </p>
              </div>

              <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                Partner records
              </span>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full overflow-hidden rounded-2xl border border-white/10">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-gray-300">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-gray-300">
                      Joined
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-gray-300">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-gray-300">
                      Value
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {referralRows.map((row, index) => (
                    <tr
                      key={`${row.name}-${row.joined}`}
                      className={index % 2 === 0 ? 'bg-black/20' : 'bg-white/[0.03]'}
                    >
                      <td className="px-4 py-4 text-sm font-semibold text-white">{row.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-300">{row.joined}</td>
                      <td className="px-4 py-4 text-sm">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${badgeClasses(
                            row.status,
                          )}`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-300">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">Affiliate notes</h2>

            <div className="mt-5 space-y-4">
              {affiliateNotes.map((item, index) => (
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
                Later this page can show real referral links, active members, commission history,
                earnings summary, and backend-driven affiliate analytics.
              </p>
            </div>
          </section>
        </div>
      </div>
    </BaseLayout>
  );
}