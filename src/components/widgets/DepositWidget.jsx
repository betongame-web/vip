import { useEffect, useMemo, useState } from 'react';
import http from '@/services/http';
import { extractErrorMessages } from '@/services/error';
import { useSettings } from '@/contexts/SettingsContext';
import { currencyFormat } from '@/utils/formatters';
import { getAssetUrl } from '@/utils/url';
import EmptyState from '@/components/common/EmptyState';

export default function DepositWidget() {
  const { settings } = useSettings();
  const [wallet, setWallet] = useState(null);
  const [paymentType, setPaymentType] = useState('');
  const [loading, setLoading] = useState(true);
  const [deposit, setDeposit] = useState({ amount: '', cpf: '', gateway: 'suitpay' });
  const [pixData, setPixData] = useState(null);
  const [sessionInfo, setSessionInfo] = useState({ amount: '', currency: 'USD', sessionId: '', publishableKey: '' });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let ignore = false;
    async function loadWallet() {
      try {
        const { data } = await http.get('/profile/wallet');
        if (!ignore) {
          setWallet(data.wallet);
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
  }, []);

  const minDeposit = Number(settings?.min_deposit || 0);
  const maxDeposit = Number(settings?.max_deposit || 0);
  const canUsePix = Boolean(settings?.suitpay_is_enable);
  const canUseStripe = Boolean(settings?.stripe_is_enable);

  const quickAmounts = useMemo(() => {
    const values = [minDeposit, 50, 200].filter((value) => Number.isFinite(value) && value > 0);
    return [...new Set(values)];
  }, [minDeposit]);

  async function requestStripeSession() {
    try {
      const { data: keyData } = await http.post('/stripe/publickey', {});
      const { data: sessionData } = await http.post('/stripe/session', {
        amount: sessionInfo.amount || maxDeposit || 10,
        currency: sessionInfo.currency || 'USD',
      });
      setSessionInfo((prev) => ({
        ...prev,
        publishableKey: keyData?.stripe_public_key || '',
        sessionId: sessionData?.id || '',
      }));
    } catch (error) {
      setMessages(extractErrorMessages(error));
    }
  }

  async function submitPix(event) {
    event.preventDefault();
    setMessages([]);

    const amount = Number(deposit.amount);
    if (!amount) {
      setMessages(['Enter a deposit value.']);
      return;
    }
    if (amount < minDeposit) {
      setMessages([`Minimum deposit is ${minDeposit}.`]);
      return;
    }
    if (amount > maxDeposit) {
      setMessages([`Maximum deposit is ${maxDeposit}.`]);
      return;
    }

    try {
      const { data } = await http.post('/wallet/deposit/payment', {
        ...deposit,
        gateway: 'suitpay',
      });
      setPixData({
        idTransaction: data.idTransaction,
        qrcode: data.qrcode,
      });
    } catch (error) {
      setMessages(extractErrorMessages(error));
    }
  }

  function copyPixCode() {
    if (!pixData?.qrcode) return;
    navigator.clipboard.writeText(pixData.qrcode).catch(() => undefined);
  }

  if (loading) {
    return <div className="card-surface p-6">Loading deposit methods...</div>;
  }

  if (!wallet || !settings) {
    return <EmptyState title="Deposit unavailable" description="Wallet or settings data was not returned by the backend." />;
  }

  return (
    <div className="card-surface p-5">
      <h2 className="mb-4 text-2xl font-bold">Deposit</h2>

      {messages.length > 0 ? (
        <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
          {messages.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </div>
      ) : null}

      {!paymentType ? (
        <div className="space-y-3">
          {canUsePix ? (
            <button
              type="button"
              onClick={() => setPaymentType('pix')}
              className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-black/10 px-4 py-4 hover:bg-white/5"
            >
              <img src={getAssetUrl('images/pix.png')} alt="PIX" className="h-8 object-contain" />
              <span>PIX</span>
            </button>
          ) : null}
          {canUseStripe ? (
            <button
              type="button"
              onClick={() => {
                setPaymentType('stripe');
                requestStripeSession();
              }}
              className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-black/10 px-4 py-4 hover:bg-white/5"
            >
              <img src={getAssetUrl('images/stripe.png')} alt="Stripe" className="h-8 object-contain" />
              <span>Stripe</span>
            </button>
          ) : null}
        </div>
      ) : null}

      {paymentType === 'pix' ? (
        <div className="mt-5">
          {!pixData ? (
            <form onSubmit={submitPix} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-gray-400">Deposit Currency</label>
                <div className="rounded-xl border border-white/10 bg-black/10 px-4 py-3">
                  {wallet.currency}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  {currencyFormat(minDeposit, wallet.currency)} - {currencyFormat(maxDeposit, wallet.currency)}
                </label>
                <input
                  type="number"
                  value={deposit.amount}
                  onChange={(event) => setDeposit((prev) => ({ ...prev, amount: event.target.value }))}
                  className="input"
                  placeholder="Enter amount"
                  min={minDeposit}
                  max={maxDeposit}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setDeposit((prev) => ({ ...prev, amount: amount }))}
                    className="rounded-xl border border-white/10 px-3 py-3 text-sm"
                  >
                    {currencyFormat(amount, wallet.currency)}
                  </button>
                ))}
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">CPF / CNPJ</label>
                <input
                  type="text"
                  value={deposit.cpf}
                  onChange={(event) => setDeposit((prev) => ({ ...prev, cpf: event.target.value }))}
                  className="input"
                  placeholder="Enter CPF or CNPJ"
                />
              </div>

              <button type="submit" className="ui-button-blue w-full">
                Generate PIX QR
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl bg-white p-4 text-brandgray-900">
                <h3 className="text-lg font-semibold">Scan the QR code or copy the payment code.</h3>
                <p className="mt-2 text-sm text-gray-700">
                  The original Vue code polls payment status every 5 seconds. This React migration keeps the QR flow and leaves polling as a safe manual extension.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 p-4">
                <p className="mb-2 text-sm text-gray-400">PIX copy-and-paste code</p>
                <textarea readOnly className="input min-h-28" value={pixData.qrcode} />
                <button type="button" onClick={copyPixCode} className="ui-button-blue mt-4 w-full">
                  Copy code
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {paymentType === 'stripe' ? (
        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-gray-400">Currency</label>
            <select
              value={sessionInfo.currency}
              onChange={(event) => setSessionInfo((prev) => ({ ...prev, currency: event.target.value }))}
              className="input"
            >
              <option value="USD">USD</option>
              <option value="BRL">BRL</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm text-gray-400">Amount</label>
            <input
              type="number"
              value={sessionInfo.amount}
              onChange={(event) => setSessionInfo((prev) => ({ ...prev, amount: event.target.value }))}
              className="input"
            />
          </div>
          <button type="button" onClick={requestStripeSession} className="ui-button-blue w-full">
            Refresh Stripe session
          </button>
          <div className="rounded-xl border border-white/10 p-4 text-sm text-gray-300">
            <p>Publishable key: {sessionInfo.publishableKey ? 'Loaded' : 'Not loaded'}</p>
            <p>Session ID: {sessionInfo.sessionId || 'Not generated'}</p>
            <p className="mt-2 text-gray-400">
              The original project used <code>@vue-stripe/vue-stripe</code>. In this React migration, session generation is wired, but redirect UI is intentionally left as a controlled integration step.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
