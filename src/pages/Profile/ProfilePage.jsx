import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import WalletSideMenu from '@/components/profile/WalletSideMenu';

const profileStats = [
  { label: 'Account Status', value: 'Active' },
  { label: 'Verification', value: 'Basic Level' },
  { label: 'Reward Tier', value: 'VIP Preview' },
  { label: 'Support Access', value: 'Standard' },
];

const quickActions = [
  { title: 'Open Wallet', to: '/profile/wallet', description: 'Check your main balance, wallet summary, and current account funds.' },
  { title: 'Make Deposit', to: '/profile/deposit', description: 'Go to the deposit area to add funds and review deposit options.' },
  { title: 'Request Withdraw', to: '/profile/withdraw', description: 'Open the withdraw page and review payout-related details.' },
  { title: 'Transactions', to: '/profile/transactions', description: 'Track your account activity, wallet history, and payment records.' },
];

const accountNotes = [
  'This page should become the main user account center.',
  'Wallet, favorites, affiliate, and recent activity should stay easy to access.',
  'Later, real account information can come from backend profile APIs.',
  'Security, verification, and reward widgets can be added step by step.',
];

export default function Profile() {
  return (
    <BaseLayout>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-6">
          <WalletSideMenu />

          <div className="card-surface p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Account Snapshot</p>
            <div className="mt-4 space-y-3">
              {profileStats.map((item) => (
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
                <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  My Profile
                </span>

                <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Manage your account, wallet access, and personal activity in one place
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                  This page acts as the user account center. From here, players should be able to
                  reach wallet pages, payment records, favorites, affiliate tools, and personal
                  account settings without confusion.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/profile/wallet"
                    className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                  >
                    Open Wallet
                  </Link>

                  <Link
                    to="/support"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Profile Purpose</p>
                  <ul className="mt-4 space-y-3 text-sm text-gray-300">
                    <li>• Central account overview</li>
                    <li>• Quick wallet access</li>
                    <li>• Favorites and recent activity</li>
                    <li>• Affiliate and support shortcuts</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Profile Status</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-white">Ready</p>
                      <p className="text-sm text-gray-300">Main profile hub active</p>
                    </div>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                      Live UI
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            {quickActions.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="card-surface p-5 transition hover:bg-white/[0.04]"
              >
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-300">{item.description}</p>
              </Link>
            ))}
          </section>

          <section className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">Account notes</h2>

            <div className="mt-5 space-y-4">
              {accountNotes.map((item, index) => (
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
                Later this page can display real user name, email, verification status, VIP level,
                affiliate summary, and backend-driven profile information.
              </p>
            </div>
          </section>
        </div>
      </div>
    </BaseLayout>
  );
}