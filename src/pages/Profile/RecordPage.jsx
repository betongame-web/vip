import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import WalletSideMenu from '@/components/profile/WalletSideMenu';

const recordSummary = [
  { label: 'Total Records', value: '128' },
  { label: 'Completed', value: '104' },
  { label: 'Pending', value: '14' },
  { label: 'Reviewed', value: '10' },
];

const recentRecords = [
  {
    title: 'Deposit Request',
    meta: 'Wallet funding review',
    status: 'Completed',
    amount: '+$250.00',
    date: '2026-04-10',
  },
  {
    title: 'Withdrawal Request',
    meta: 'Payout verification',
    status: 'Pending',
    amount: '-$120.00',
    date: '2026-04-09',
  },
  {
    title: 'Bonus Credit',
    meta: 'Campaign reward',
    status: 'Completed',
    amount: '+$35.00',
    date: '2026-04-08',
  },
  {
    title: 'Manual Review',
    meta: 'Security confirmation',
    status: 'Reviewed',
    amount: '--',
    date: '2026-04-07',
  },
];

const recordNotes = [
  'This page should give users a simple history overview.',
  'Deposit, withdrawal, bonus, and review items should be readable at a glance.',
  'Later it can be connected to backend transaction and activity APIs.',
  'Filters such as date, type, and status can be added later.',
];

function statusClasses(status) {
  if (status === 'Completed') {
    return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
  }
  if (status === 'Pending') {
    return 'border-amber-500/30 bg-amber-500/10 text-amber-300';
  }
  return 'border-sky-500/30 bg-sky-500/10 text-sky-300';
}

export default function RecordPage() {
  return (
    <BaseLayout>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-6">
          <WalletSideMenu />

          <div className="card-surface p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Record Summary</p>
            <div className="mt-4 space-y-3">
              {recordSummary.map((item) => (
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
                <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  Activity Records
                </span>

                <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Review your account activity, wallet records, and recent requests
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                  This page acts as a clean activity history area where users can review
                  deposits, withdrawals, bonus credits, and account-related actions.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/profile/transactions"
                    className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Open Transactions
                  </Link>

                  <Link
                    to="/profile/wallet"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    Go to Wallet
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Record Types</p>
                  <ul className="mt-4 space-y-3 text-sm text-gray-300">
                    <li>• Deposits and withdrawals</li>
                    <li>• Bonus and reward entries</li>
                    <li>• Manual review items</li>
                    <li>• Account status changes</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">History Status</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-white">Updated</p>
                      <p className="text-sm text-gray-300">Recent history preview active</p>
                    </div>
                    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                      Visible
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="card-surface p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Recent records</h2>
                <p className="mt-2 text-sm leading-7 text-gray-300">
                  This is a styled preview list. Later it can be powered by real backend data.
                </p>
              </div>

              <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                Latest activity
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {recentRecords.map((item) => (
                <div
                  key={`${item.title}-${item.date}-${item.amount}`}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-base font-semibold text-white">{item.title}</h3>
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${statusClasses(
                            item.status,
                          )}`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-gray-400">{item.meta}</p>
                      <p className="mt-2 text-sm text-gray-300">Date: {item.date}</p>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-lg font-semibold text-white">{item.amount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">Record notes</h2>

            <div className="mt-5 space-y-4">
              {recordNotes.map((item, index) => (
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
                Later this page can display real transaction logs, bonus history, review notes,
                and filtered user activity from backend APIs.
              </p>
            </div>
          </section>
        </div>
      </div>
    </BaseLayout>
  );
}