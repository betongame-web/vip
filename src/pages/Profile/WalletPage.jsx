import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import WalletSideMenu from '@/components/profile/WalletSideMenu';
import WalletBalance from '@/components/ui/WalletBalance';
import EmptyState from '@/components/common/EmptyState';
import http from '@/services/http';
import { currencyFormat } from '@/utils/formatters';

function walletTitle(item) {
  return item?.name || item?.currency || `Wallet #${item?.id || '—'}`;
}

export default function WalletPage() {
  const [wallet, setWallet] = useState(null);
  const [myWallets, setMyWallets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadWallet() {
      setLoading(true);

      try {
        const [walletRes, myWalletRes] = await Promise.all([
          http.get('/profile/wallet').catch(() => ({ data: {} })),
          http.get('/profile/mywallet').catch(() => ({ data: { wallets: [] } })),
        ]);

        if (ignore) return;

        setWallet(walletRes.data?.wallet || walletRes.data || null);
        setMyWallets(myWalletRes.data?.wallets || myWalletRes.data?.data || []);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadWallet();

    return () => {
      ignore = true;
    };
  }, []);

  const currency = useMemo(() => wallet?.currency || 'USD', [wallet?.currency]);

  return (
    <BaseLayout>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-6">
          <WalletSideMenu />

          <div className="card-surface p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Wallet Summary</p>
            <div className="mt-4 space-y-3">
              {[
                {
                  label: 'Main Balance',
                  value: currencyFormat(wallet?.balance || 0, currency),
                },
                {
                  label: 'Withdrawal Balance',
                  value: currencyFormat(wallet?.balance_withdrawal || 0, currency),
                },
                {
                  label: 'Bonus Balance',
                  value: currencyFormat(wallet?.balance_bonus || 0, currency),
                },
                {
                  label: 'Currency',
                  value: wallet?.currency || '—',
                },
              ].map((item) => (
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
                  Wallet Center
                </span>

                <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Review your wallet balances, account funds, and available payment access
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                  This page works as the user wallet hub where players can check main balance,
                  withdrawal balance, bonus funds, and quickly move to deposit or withdraw actions.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/profile/deposit"
                    className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                  >
                    Make Deposit
                  </Link>

                  <Link
                    to="/profile/withdraw"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    Withdraw Funds
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Wallet Purpose</p>
                  <ul className="mt-4 space-y-3 text-sm text-gray-300">
                    <li>• Balance overview</li>
                    <li>• Deposit and withdraw shortcuts</li>
                    <li>• Bonus visibility</li>
                    <li>• Personal wallet access</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Wallet Status</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-white">
                        {loading ? '...' : wallet ? 'Ready' : 'Empty'}
                      </p>
                      <p className="text-sm text-gray-300">Wallet overview area</p>
                    </div>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {loading ? (
            <div className="card-surface p-6">
              <div className="space-y-3">
                <div className="h-5 w-40 animate-pulse rounded bg-white/10" />
                <div className="h-28 animate-pulse rounded-2xl bg-white/5" />
              </div>
            </div>
          ) : null}

          {!loading && wallet ? (
            <>
              <WalletBalance wallet={wallet} />

              <section className="card-surface p-6">
                <h2 className="text-2xl font-bold text-white">Wallet details</h2>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm text-gray-400">Currency</p>
                    <p className="mt-2 text-lg font-semibold text-white">{wallet?.currency || '—'}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm text-gray-400">Symbol</p>
                    <p className="mt-2 text-lg font-semibold text-white">{wallet?.symbol || '—'}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm text-gray-400">Main balance</p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {currencyFormat(wallet?.balance || 0, currency)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm text-gray-400">Withdrawal balance</p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {currencyFormat(wallet?.balance_withdrawal || 0, currency)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 md:col-span-2">
                    <p className="text-sm text-gray-400">Bonus balance</p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {currencyFormat(wallet?.balance_bonus || 0, currency)}
                    </p>
                  </div>
                </div>
              </section>

              {myWallets.length > 0 ? (
                <section className="card-surface p-6">
                  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Selectable wallets</h2>
                      <p className="mt-2 text-sm leading-7 text-gray-300">
                        This list comes from your wallet endpoint and can later support switching
                        or multi-wallet actions.
                      </p>
                    </div>

                    <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                      {myWallets.length} wallet items
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {myWallets.map((item) => (
                      <div
                        key={item.id || item.currency || item.name}
                        className="rounded-2xl border border-white/10 bg-black/20 p-5"
                      >
                        <h3 className="text-lg font-semibold text-white">{walletTitle(item)}</h3>
                        <div className="mt-3 space-y-2 text-sm text-gray-300">
                          <p>Currency: {item?.currency || '—'}</p>
                          <p>Symbol: {item?.symbol || '—'}</p>
                          <p>
                            Balance:{' '}
                            {currencyFormat(item?.balance || 0, item?.currency || currency)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}
            </>
          ) : null}

          {!loading && !wallet ? (
            <EmptyState
              title="Wallet not found"
              description="The backend did not return profile wallet data."
            />
          ) : null}
        </div>
      </div>
    </BaseLayout>
  );
}