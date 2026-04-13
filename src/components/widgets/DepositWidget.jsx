import { useEffect, useMemo, useState } from 'react';
import http from '@/services/http';
import { extractErrorMessages } from '@/services/error';
import { useSettings } from '@/contexts/SettingsContext';
import { currencyFormat } from '@/utils/formatters';
import { getAssetUrl } from '@/utils/url';
import EmptyState from '@/components/common/EmptyState';

function MessageBox({ messages }) {
  if (!messages.length) return null;

  return (
    <div className="mb-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
      {messages.map((message) => (
        <p key={message}>{message}</p>
      ))}
    </div>
  );
}

export default function DepositWidget() {
  const { settings } = useSettings();

  const [wallet, setWallet] = useState(null);
  const [paymentType, setPaymentType] = useState('');
  const [loading, setLoading] = useState(true);
  const [deposit, setDeposit] = useState({
    amount: '',
    cpf: '',
    gateway: 'suitpay',
  });
  const [pixData, setPixData] = useState(null);
  const [sessionInfo, setSessionInfo] = useState({
    amount: '',
    currency: 'USD',
    sessionId: '',
    publishableKey: '',
  });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function loadWallet() {
      try {
        const { data } = await http.get('/profile/wallet');
        if (!ignore) {
          setWallet(data?.wallet || data || null);
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
    const values = [minDeposit, 50, 100, 200].filter(
      (value) => Number.isFinite(value) && value > 0,
    );
    return [...new Set(values)];
  }, [minDeposit]);

  async function requestStripeSession(amountOverride = '') {
    setMessages([]);

    try {
      const amount = Number(amountOverride || sessionInfo.amount || maxDeposit || 10);

      const { data: keyData } = await http.post('/stripe/publickey', {});
      const { data: sessionData } = await http.post('/stripe/session', {
        amount,
        currency: sessionInfo.currency || 'USD',
      });

      setSessionInfo((prev) => ({
        ...prev,
        amount: String(amount),
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
      setMessages(['Enter a deposit amount.']);
      return;
    }

    if (minDeposit && amount < minDeposit) {
      setMessages([`Minimum deposit is ${currencyFormat(minDeposit, wallet?.currency || 'USD')}.`]);
      return;
    }

    if (maxDeposit && amount > maxDeposit) {
      setMessages([`Maximum deposit is ${currencyFormat(maxDeposit, wallet?.currency || 'USD')}.`]);
      return;
    }

    try {
      const { data } = await http.post('/wallet/deposit/payment', {
        ...deposit,
        amount,
        gateway: 'suitpay',
      });

      setPixData({
        idTransaction: data?.idTransaction || '',
        qrcode: data?.qrcode || '',
      });
    } catch (error) {
      setMessages(extractErrorMessages(error));
    }
  }

  function copyPixCode() {
    if (!pixData?.qrcode) return;
    navigator.clipboard.writeText(pixData.qrcode).catch(() => undefined);
  }

  function resetFlow() {
    setPaymentType('');
    setPixData(null);
    setMessages([]);
    setSessionInfo((prev) => ({
      ...prev,
      sessionId: '',
      publishableKey: '',
    }));
  }

  if (loading) {
    return (
      <div className="card-surface p-6">
        <div className="space-y-3">
          <div className="h-5 w-40 animate-pulse rounded bg-white/10" />
          <div className="h-28 animate-pulse rounded-2xl bg-white/5" />
        </div>
      </div>
    );
  }

  if (!wallet || !settings) {
    return (
      <EmptyState
        title="Deposit unavailable"
        description="Wallet or settings data was not returned by the backend."
      />
    );
  }

  return (
    <div className="card-surface p-5">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Deposit methods</h2>
          <p className="mt-2 text-sm leading-7 text-gray-300">
            Choose a gateway and continue with your wallet funding process.
          </p>
        </div>

        {paymentType ? (
          <button
            type="button"
            onClick={resetFlow}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-white/10"
          >
            Change Method
          </button>
        ) : null}
      </div>

      <MessageBox messages={messages} />

      {!paymentType ? (
        <div className="grid gap-4 md:grid-cols-2">
          {canUsePix ? (
            <button
              type="button"
              onClick={() => setPaymentType('pix')}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-5 py-5 text-left transition hover:bg-white/5"
            >
              <div>
                <p className="text-lg font-semibold text-white">PIX</p>
                <p className="mt-2 text-sm text-gray-300">Fast payment using QR or copy code.</p>
              </div>
              <img src={getAssetUrl('images/pix.png')} alt="PIX" className="h-8 object-contain" />
            </button>
          ) : null}

          {canUseStripe ? (
            <button
              type="button"
              onClick={() => {
                setPaymentType('stripe');
                requestStripeSession();
              }}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-5 py-5 text-left transition hover:bg-white/5"
            >
              <div>
                <p className="text-lg font-semibold text-white">Stripe</p>
                <p className="mt-2 text-sm text-gray-300">Generate a checkout session for card payment.</p>
              </div>
              <img
                src={getAssetUrl('images/stripe.png')}
                alt="Stripe"
                className="h-8 object-contain"
              />
            </button>
          ) : null}

          {!canUsePix && !canUseStripe ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-gray-300">
              No deposit methods are enabled in settings.
            </div>
          ) : null}
        </div>
      ) : null}

      {paymentType === 'pix' ? (
        <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_340px]">
          <form onSubmit={submitPix} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-gray-400">Deposit Currency</label>
              <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white">
                {wallet?.currency || 'USD'}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Amount Range:{' '}
                {currencyFormat(minDeposit, wallet?.currency || 'USD')} -{' '}
                {currencyFormat(maxDeposit, wallet?.currency || 'USD')}
              </label>

              <input
                type="number"
                value={deposit.amount}
                onChange={(event) =>
                  setDeposit((prev) => ({ ...prev, amount: event.target.value }))
                }
                className="input"
                placeholder="Enter amount"
                min={minDeposit || undefined}
                max={maxDeposit || undefined}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setDeposit((prev) => ({ ...prev, amount: String(amount) }))}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-gray-200 transition hover:bg-white/10"
                >
                  {currencyFormat(amount, wallet?.currency || 'USD')}
                </button>
              ))}
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">CPF / CNPJ</label>
              <input
                type="text"
                value={deposit.cpf}
                onChange={(event) =>
                  setDeposit((prev) => ({ ...prev, cpf: event.target.value }))
                }
                className="input"
                placeholder="Enter CPF or CNPJ"
              />
            </div>

            <button type="submit" className="ui-button-blue w-full">
              Generate PIX QR
            </button>
          </form>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <h3 className="text-lg font-semibold text-white">PIX instructions</h3>
            <div className="mt-4 space-y-3 text-sm leading-7 text-gray-300">
              <p>1. Enter a valid amount.</p>
              <p>2. Add CPF/CNPJ if your gateway requires it.</p>
              <p>3. Generate the QR or payment code.</p>
              <p>4. Complete payment using your supported banking app.</p>
            </div>
          </div>
        </div>
      ) : null}

      {paymentType === 'pix' && pixData ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <h3 className="text-lg font-semibold text-white">PIX payment code</h3>
            <p className="mt-2 text-sm leading-7 text-gray-300">
              Copy the code below or use the QR returned by your backend.
            </p>

            {pixData?.idTransaction ? (
              <p className="mt-3 text-sm text-gray-400">
                Transaction ID: <span className="text-white">{pixData.idTransaction}</span>
              </p>
            ) : null}

            <textarea readOnly className="input mt-4 min-h-32" value={pixData.qrcode || ''} />

            <button type="button" onClick={copyPixCode} className="ui-button-blue mt-4 w-full">
              Copy Code
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <h3 className="text-lg font-semibold text-white">After payment</h3>
            <div className="mt-4 space-y-3 text-sm leading-7 text-gray-300">
              <p>Keep this page open until your wallet updates.</p>
              <p>If your balance does not change, check the transactions page.</p>
              <p>You can later add automatic polling for payment confirmation.</p>
            </div>
          </div>
        </div>
      ) : null}

      {paymentType === 'stripe' ? (
        <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-gray-400">Currency</label>
              <select
                value={sessionInfo.currency}
                onChange={(event) =>
                  setSessionInfo((prev) => ({ ...prev, currency: event.target.value }))
                }
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
                onChange={(event) =>
                  setSessionInfo((prev) => ({ ...prev, amount: event.target.value }))
                }
                className="input"
                placeholder="Enter amount"
              />
            </div>

            <button
              type="button"
              onClick={() => requestStripeSession(sessionInfo.amount)}
              className="ui-button-blue w-full"
            >
              Generate Stripe Session
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <h3 className="text-lg font-semibold text-white">Stripe session info</h3>
            <div className="mt-4 space-y-3 text-sm leading-7 text-gray-300">
              <p>
                Publishable key:{' '}
                <span className="text-white">
                  {sessionInfo.publishableKey ? 'Loaded' : 'Not loaded'}
                </span>
              </p>
              <p>
                Session ID:{' '}
                <span className="break-all text-white">
                  {sessionInfo.sessionId || 'Not generated'}
                </span>
              </p>
              <p className="text-gray-400">
                Session creation is connected. Redirect-to-checkout can be added later as the next
                integration step.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}