import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import WalletSideMenu from '@/components/profile/WalletSideMenu';
import EmptyState from '@/components/common/EmptyState';
import http from '@/services/http';
import { extractErrorMessages } from '@/services/error';
import { useSettings } from '@/contexts/SettingsContext';
import { currencyFormat } from '@/utils/formatters';

export default function WithdrawPage() {
  const navigate = useNavigate();
  const { settings } = useSettings();

  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [messages, setMessages] = useState([]);

  const [form, setForm] = useState({
    name: '',
    pix_key: '',
    pix_type: '',
    amount: '',
    type: 'pix',
    currency: '',
    symbol: '',
    accept_terms: false,
  });

  useEffect(() => {
    let ignore = false;

    async function loadWallet() {
      setLoading(true);

      try {
        const { data } = await http.get('/profile/wallet');

        if (!ignore) {
          const nextWallet = data?.wallet || data || null;

          setWallet(nextWallet);
          setForm((prev) => ({
            ...prev,
            currency: nextWallet?.currency || '',
            symbol: nextWallet?.symbol || '',
            amount: settings?.min_withdrawal || prev.amount || '',
          }));
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

    loadWallet();

    return () => {
      ignore = true;
    };
  }, [settings]);

  const minWithdrawal = Number(settings?.min_withdrawal || 0);
  const availableToWithdraw = Number(wallet?.balance_withdrawal || 0);
  const bonusRollback = Number(wallet?.balance_bonus || 0);

  const quickValues = useMemo(() => {
    const values = [
      minWithdrawal,
      availableToWithdraw ? availableToWithdraw * 0.25 : null,
      availableToWithdraw ? availableToWithdraw * 0.5 : null,
      availableToWithdraw || null,
    ].filter((value) => Number.isFinite(Number(value)) && Number(value) > 0);

    return [...new Set(values.map((value) => Math.round(Number(value) * 100) / 100))];
  }, [minWithdrawal, availableToWithdraw]);

  async function submit(event) {
    event.preventDefault();
    setMessages([]);

    const amount = Number(form.amount);

    if (!wallet) {
      setMessages(['Wallet data is missing.']);
      return;
    }

    if (!form.name.trim()) {
      setMessages(['Enter full name.']);
      return;
    }

    if (!form.pix_type) {
      setMessages(['Select a PIX type.']);
      return;
    }

    if (!form.pix_key.trim()) {
      setMessages(['Enter PIX key.']);
      return;
    }

    if (!amount || amount <= 0) {
      setMessages(['Enter a valid withdrawal amount.']);
      return;
    }

    if (minWithdrawal && amount < minWithdrawal) {
      setMessages([
        `Minimum withdrawal is ${currencyFormat(minWithdrawal, wallet?.currency || 'USD')}.`,
      ]);
      return;
    }

    if (availableToWithdraw && amount > availableToWithdraw) {
      setMessages([
        `Available withdrawal balance is ${currencyFormat(
          availableToWithdraw,
          wallet?.currency || 'USD',
        )}.`,
      ]);
      return;
    }

    if (!form.accept_terms) {
      setMessages(['You must accept the transfer terms.']);
      return;
    }

    setSubmitting(true);

    try {
      await http.post('/wallet/withdraw/request', {
        ...form,
        amount,
      });

      navigate('/profile/transactions');
    } catch (error) {
      setMessages(extractErrorMessages(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <BaseLayout>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-6">
          <WalletSideMenu />

          <div className="card-surface p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Withdraw Shortcuts</p>
            <div className="mt-4 space-y-3">
              {[
                { label: 'Wallet Page', to: '/profile/wallet' },
                { label: 'Deposit Page', to: '/profile/deposit' },
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

          {wallet ? (
            <div className="card-surface p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Balance Summary</p>
              <div className="mt-4 space-y-3">
                {[
                  {
                    label: 'Available Withdraw',
                    value: currencyFormat(availableToWithdraw, wallet?.currency || 'USD'),
                  },
                  {
                    label: 'Bonus Balance',
                    value: currencyFormat(bonusRollback, wallet?.currency || 'USD'),
                  },
                  {
                    label: 'Minimum Withdraw',
                    value: currencyFormat(minWithdrawal, wallet?.currency || 'USD'),
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
          ) : null}
        </div>

        <div className="space-y-6">
          <section className="card-surface overflow-hidden">
            <div className="grid gap-6 p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
              <div>
                <span className="inline-flex rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-300">
                  Withdraw Center
                </span>

                <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Request a payout from your available wallet balance
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                  This page is the main withdrawal area where users can enter payout details,
                  choose PIX information, and submit a withdrawal request in a cleaner layout.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/profile/wallet"
                    className="rounded-xl bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
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
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Withdraw Purpose</p>
                  <ul className="mt-4 space-y-3 text-sm text-gray-300">
                    <li>• Add payout details</li>
                    <li>• Choose PIX type</li>
                    <li>• Enter valid amount</li>
                    <li>• Submit withdrawal request</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Page Status</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-white">
                        {loading ? '...' : wallet ? 'Ready' : 'Empty'}
                      </p>
                      <p className="text-sm text-gray-300">Withdraw form area active</p>
                    </div>
                    <span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-300">
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
              title="Wallet data missing"
              description="The backend did not return wallet information for withdrawal."
            />
          ) : null}

          {!loading && wallet ? (
            <>
              <section className="card-surface p-6">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Withdrawal form</h2>
                    <p className="mt-2 text-sm leading-7 text-gray-300">
                      Fill the payout information below and submit your request.
                    </p>
                  </div>

                  <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                    PIX payout
                  </span>
                </div>

                <form onSubmit={submit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm text-gray-400">Full name</label>
                      <input
                        className="input"
                        value={form.name}
                        onChange={(event) =>
                          setForm((prev) => ({ ...prev, name: event.target.value }))
                        }
                        placeholder="Enter full name"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-gray-400">PIX type</label>
                      <select
                        className="input"
                        value={form.pix_type}
                        onChange={(event) =>
                          setForm((prev) => ({ ...prev, pix_type: event.target.value }))
                        }
                      >
                        <option value="">Select type</option>
                        <option value="cpf">CPF</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="random">Random key</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-400">PIX key</label>
                    <input
                      className="input"
                      value={form.pix_key}
                      onChange={(event) =>
                        setForm((prev) => ({ ...prev, pix_key: event.target.value }))
                      }
                      placeholder="Enter PIX key"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-400">
                      Amount{' '}
                      {minWithdrawal
                        ? `(Minimum ${currencyFormat(minWithdrawal, wallet?.currency || 'USD')})`
                        : ''}
                    </label>
                    <input
                      type="number"
                      className="input"
                      value={form.amount}
                      onChange={(event) =>
                        setForm((prev) => ({ ...prev, amount: event.target.value }))
                      }
                      placeholder="Enter withdrawal amount"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {quickValues.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, amount: String(value) }))}
                        className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-gray-200 transition hover:bg-white/10"
                      >
                        {currencyFormat(value, wallet?.currency || 'USD')}
                      </button>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-gray-300">
                    <div className="flex justify-between gap-4">
                      <span>Available to withdraw</span>
                      <span className="text-white">
                        {currencyFormat(availableToWithdraw, wallet?.currency || 'USD')}
                      </span>
                    </div>

                    <div className="mt-2 flex justify-between gap-4">
                      <span>Bonus balance</span>
                      <span className="text-white">
                        {currencyFormat(bonusRollback, wallet?.currency || 'USD')}
                      </span>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={form.accept_terms}
                      onChange={(event) =>
                        setForm((prev) => ({ ...prev, accept_terms: event.target.checked }))
                      }
                    />
                    <span>I accept the transfer terms and confirm that the payout information is correct.</span>
                  </label>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-xl bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? 'Submitting...' : 'Request Withdrawal'}
                  </button>
                </form>
              </section>

              <section className="card-surface p-6">
                <h2 className="text-2xl font-bold text-white">Withdraw notes</h2>

                <div className="mt-5 space-y-4">
                  {[
                    'Users should clearly understand the available withdrawal balance.',
                    'Payout details should be filled carefully to avoid failed transfer requests.',
                    'Minimum withdrawal rules should stay visible near the amount field.',
                    'Later this page can show backend-driven payout status and review steps.',
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-500 text-sm font-bold text-white">
                        {index + 1}
                      </div>
                      <p className="pt-1 text-sm leading-7 text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : null}
        </div>
      </div>
    </BaseLayout>
  );
}