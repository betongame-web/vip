import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import WalletSideMenu from '@/components/profile/WalletSideMenu';
import DepositWidget from '@/components/widgets/DepositWidget';

const depositNotes = [
  'Users should clearly see available deposit methods before making payment.',
  'Minimum and maximum deposit rules should stay visible near the form.',
  'Payment instructions should remain simple on both mobile and desktop.',
  'Later this page can show backend-driven gateway status and transaction history.',
];

export default function DepositPage() {
  return (
    <BaseLayout>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-6">
          <WalletSideMenu />

          <div className="card-surface p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Deposit Shortcuts</p>
            <div className="mt-4 space-y-3">
              {[
                { label: 'Wallet Page', to: '/profile/wallet' },
                { label: 'Withdraw Page', to: '/profile/withdraw' },
                { label: 'Transactions', to: '/profile/transactions' },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <section className="card-surface overflow-hidden">
            <div className="grid gap-6 p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
              <div>
                <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Deposit Center
                </span>

                <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Add funds to your account using the available payment methods
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                  This page is the main deposit area where users can choose a payment method,
                  enter deposit information, and continue with wallet funding in a cleaner layout.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/profile/wallet"
                    className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                  >
                    Back to Wallet
                  </Link>

                  <Link
                    to="/support"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    Need Help
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Deposit Purpose</p>
                  <ul className="mt-4 space-y-3 text-sm text-gray-300">
                    <li>• Choose a gateway</li>
                    <li>• Enter amount safely</li>
                    <li>• Follow payment instructions</li>
                    <li>• Complete wallet funding</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Page Status</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-white">Ready</p>
                      <p className="text-sm text-gray-300">Deposit form area active</p>
                    </div>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <DepositWidget />

          <section className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">Deposit notes</h2>

            <div className="mt-5 space-y-4">
              {depositNotes.map((item, index) => (
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
                Later you can connect this section with real gateway status, deposit records,
                transaction polling, and backend-managed payment instructions.
              </p>
            </div>
          </section>
        </div>
      </div>
    </BaseLayout>
  );
}