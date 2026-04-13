import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import WalletSideMenu from '@/components/profile/WalletSideMenu';
import EmptyState from '@/components/common/EmptyState';
import http from '@/services/http';
import { currencyFormat, statusLabel } from '@/utils/formatters';
import { extractErrorMessages } from '@/services/error';

function statusClasses(status) {
  if (status === 1) {
    return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
  }
  if (status === 0) {
    return 'border-amber-500/30 bg-amber-500/10 text-amber-300';
  }
  return 'border-sky-500/30 bg-sky-500/10 text-sky-300';
}

function normalizeRows(payload) {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;
  return [];
}

export default function TransactionPage() {
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState(null);
  const [withdraws, setWithdraws] = useState(null);
  const [deposits, setDeposits] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      setLoading(true);
      setMessages([]);

      try {
        const [walletRes, withdrawRes, depositRes] = await Promise.all([
          http.get('/profile/wallet'),
          http.get('/wallet/withdraw'),
          http.get('/wallet/deposit'),
        ]);

        if (!ignore) {
          setWallet(walletRes.data?.wallet || walletRes.data || null);
          setWithdraws(withdrawRes.data?.withdraws || withdrawRes.data?.data || withdrawRes.data || null);
          setDeposits(depositRes.data?.deposits || depositRes.data?.data || depositRes.data || null);
        }
      } catch (error) {
        if (!ignore) {
          setMessages(extractErrorMessages(error));
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  const withdrawRows = useMemo(() => normalizeRows(withdraws), [withdraws]);
  const depositRows = useMemo(() => normalizeRows(deposits), [deposits]);

  const summaryCards = useMemo(
    () => [
      { label: 'Total Withdrawals', value: String(withdrawRows.length) },
      { label: 'Total Deposits', value: String(depositRows.length) },
      {
        label: 'Wallet Currency',
        value: wallet?.currency || '—',
      },
      {
        label: 'Main Balance',
        value: wallet ? currencyFormat(wallet?.balance || 0, wallet?.currency || 'USD') : '—',
      },
    ],
    [wallet, withdrawRows.length, depositRows.length],
  );

  return (
    <BaseLayout>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-6">
          <WalletSideMenu />

          <div className="card-surface p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Transaction Summary</p>
            <div className="mt-4 space-y-3">
              {summaryCards.map((item) => (
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

          <div className="card-surface p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Quick Access</p>
            <div className="mt-4 space-y-3">
              {[
                { label: 'Wallet Page', to: '/profile/wallet' },
                { label: 'Deposit Page', to: '/profile/deposit' },
                { label: 'Withdraw Page', to: '/profile/withdraw' },
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
                <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  Transactions
                </span>

                <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Review your deposit records, withdrawal requests, and wallet-linked history
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                  This page works as the main transaction history area where users can review
                  deposit and withdrawal activity in a cleaner and more readable layout.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/profile/deposit"
                    className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Make Deposit
                  </Link>

                  <Link
                    to="/profile/withdraw"
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                  >
                    Request Withdraw
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">History Purpose</p>
                  <ul className="mt-4 space-y-3 text-sm text-gray-300">
                    <li>• Deposit tracking</li>
                    <li>• Withdrawal review</li>
                    <li>• Status visibility</li>
                    <li>• Wallet-linked history</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Page Status</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-white">
                        {loading ? '...' : wallet ? 'Ready' : 'Empty'}
                      </p>
                      <p className="text-sm text-gray-300">Transaction history area</p>
                    </div>
                    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {messages.length ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              {messages.map((message) => (
                <p key={message}>{message}</p>
              ))}
            </div>
          ) : null}

          {loading ? (
            <div className="card-surface p-6">
              <div className="space-y-3">
                <div className="h-5 w-40 animate-pulse rounded bg-white/10" />
                <div className="h-28 animate-pulse rounded-2xl bg-white/5" />
              </div>
            </div>
          ) : null}

          {!loading && !wallet ? (
            <EmptyState
              title="Wallet missing"
              description="Could not load wallet-linked transaction data."
            />
          ) : null}

          {!loading && wallet ? (
            <>
              <section className="card-surface p-6">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Withdrawal records</h2>
                    <p className="mt-2 text-sm leading-7 text-gray-300">
                      Below is the list of requested withdrawals returned by your backend.
                    </p>
                  </div>

                  <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                    {withdrawRows.length} records
                  </span>
                </div>

                {withdrawRows.length ? (
                  <div className="space-y-4">
                    {withdrawRows.map((item, index) => (
                      <div
                        key={item.id || `${item.created_at || 'withdraw'}-${index}`}
                        className="rounded-2xl border border-white/10 bg-black/20 p-4"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="text-base font-semibold text-white">
                                {String(item.type || 'withdraw').toUpperCase()}
                              </h3>

                              <span
                                className={`rounded-full border px-3 py-1 text-xs font-medium ${statusClasses(
                                  item.status,
                                )}`}
                              >
                                {statusLabel(item.status)}
                              </span>
                            </div>

                            <div className="mt-3 space-y-2 text-sm text-gray-300">
                              <p>
                                Amount:{' '}
                                {currencyFormat(item.amount || 0, item.currency || wallet.currency)}
                              </p>
                              <p>Date: {item.dateHumanReadable || item.created_at || '—'}</p>
                              <p>Proof: {item.proof ? 'Available' : 'Processing'}</p>
                              {item.pix_key ? <p>PIX Key: {item.pix_key}</p> : null}
                            </div>
                          </div>

                          <div className="text-left md:text-right">
                            <p className="text-lg font-semibold text-white">
                              {currencyFormat(item.amount || 0, item.currency || wallet.currency)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="No withdrawals"
                    description="No withdrawal records were returned."
                  />
                )}
              </section>

              <section className="card-surface p-6">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Deposit records</h2>
                    <p className="mt-2 text-sm leading-7 text-gray-300">
                      Below is the list of deposits returned by your backend.
                    </p>
                  </div>

                  <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                    {depositRows.length} records
                  </span>
                </div>

                {depositRows.length ? (
                  <div className="space-y-4">
                    {depositRows.map((item, index) => (
                      <div
                        key={item.id || `${item.created_at || 'deposit'}-${index}`}
                        className="rounded-2xl border border-white/10 bg-black/20 p-4"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="text-base font-semibold text-white">
                                {String(item.type || 'deposit').toUpperCase()}
                              </h3>

                              <span
                                className={`rounded-full border px-3 py-1 text-xs font-medium ${statusClasses(
                                  item.status,
                                )}`}
                              >
                                {statusLabel(item.status)}
                              </span>
                            </div>

                            <div className="mt-3 space-y-2 text-sm text-gray-300">
                              <p>
                                Amount:{' '}
                                {currencyFormat(item.amount || 0, item.currency || wallet.currency)}
                              </p>
                              <p>Date: {item.dateHumanReadable || item.created_at || '—'}</p>
                              {item.idTransaction ? <p>Transaction ID: {item.idTransaction}</p> : null}
                            </div>
                          </div>

                          <div className="text-left md:text-right">
                            <p className="text-lg font-semibold text-white">
                              {currencyFormat(item.amount || 0, item.currency || wallet.currency)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="No deposits"
                    description="No deposit records were returned."
                  />
                )}
              </section>
            </>
          ) : null}
        </div>
      </div>
    </BaseLayout>
  );
}