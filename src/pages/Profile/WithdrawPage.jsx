import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';
import WalletSideMenu from '@/components/profile/WalletSideMenu';
import http from '@/services/http';
import { extractErrorMessages } from '@/services/error';
import { useSettings } from '@/contexts/SettingsContext';
import { currencyFormat } from '@/utils/formatters';

export default function WithdrawPage() {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
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
      try {
        const { data } = await http.get('/profile/wallet');
        if (!ignore) {
          const nextWallet = data.wallet || null;
          setWallet(nextWallet);
          setForm((prev) => ({
            ...prev,
            currency: nextWallet?.currency || '',
            symbol: nextWallet?.symbol || '',
            amount: settings?.min_withdrawal || prev.amount,
          }));
        }
      } catch (error) {
        if (!ignore) setMessages(extractErrorMessages(error));
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadWallet();
    return () => {
      ignore = true;
    };
  }, [settings]);

  const quickValues = useMemo(() => {
    const values = [
      settings?.min_withdrawal,
      wallet?.balance_withdrawal ? Number(wallet.balance_withdrawal) * 0.25 : null,
      wallet?.balance_withdrawal ? Number(wallet.balance_withdrawal) * 0.5 : null,
      wallet?.balance_withdrawal,
    ].filter((value) => Number.isFinite(Number(value)) && Number(value) > 0);
    return [...new Set(values.map((value) => Math.round(Number(value) * 100) / 100))];
  }, [settings, wallet]);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setMessages([]);
    try {
      await http.post('/wallet/withdraw/request', form);
      navigate('/profile/transactions');
    } catch (error) {
      setMessages(extractErrorMessages(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <BaseLayout>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="hidden md:block">
          <WalletSideMenu />
        </div>

        <div className="md:col-span-2">
          <div className="card-surface p-5">
            <h1 className="mb-4 text-2xl font-bold">Withdraw</h1>

            {messages.length ? (
              <div className="mb-4 rounded-xl bg-red-500/10 p-4 text-sm text-red-200">
                {messages.map((message) => (
                  <p key={message}>{message}</p>
                ))}
              </div>
            ) : null}

            {wallet ? (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-gray-400">Full name</label>
                    <input
                      className="input"
                      value={form.name}
                      onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-400">PIX type</label>
                    <select
                      className="input"
                      value={form.pix_type}
                      onChange={(event) => setForm((prev) => ({ ...prev, pix_type: event.target.value }))}
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
                    onChange={(event) => setForm((prev) => ({ ...prev, pix_key: event.target.value }))}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-400">Amount</label>
                  <input
                    type="number"
                    className="input"
                    value={form.amount}
                    onChange={(event) => setForm((prev) => ({ ...prev, amount: event.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {quickValues.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, amount: value }))}
                      className="rounded-xl border border-white/10 px-3 py-3 text-sm"
                    >
                      {currencyFormat(value, wallet.currency)}
                    </button>
                  ))}
                </div>

                <div className="rounded-xl border border-white/10 p-4 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Available</span>
                    <span>{currencyFormat(wallet.balance_withdrawal || 0, wallet.currency)}</span>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span>Bonus rollback</span>
                    <span>{currencyFormat(wallet.balance_bonus || 0, wallet.currency)}</span>
                  </div>
                </div>

                <label className="flex items-center gap-3 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={form.accept_terms}
                    onChange={(event) => setForm((prev) => ({ ...prev, accept_terms: event.target.checked }))}
                  />
                  I accept the transfer terms
                </label>

                <button type="submit" disabled={loading} className="ui-button-blue w-full disabled:opacity-60">
                  {loading ? 'Submitting...' : 'Request withdrawal'}
                </button>
              </form>
            ) : null}

            {!wallet && !loading ? <p className="text-sm text-gray-400">Wallet data is missing.</p> : null}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
