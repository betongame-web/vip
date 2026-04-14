import { Link, useSearchParams } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';

export default function StripeCancel() {
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get('session_id') || '';
  const paymentIntent = searchParams.get('payment_intent') || '';

  return (
    <BaseLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <section className="card-surface overflow-hidden">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
            <div>
              <span className="inline-flex rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                Payment Cancelled
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                The Stripe checkout flow was cancelled before completion
              </h1>

              <p className="mt-4 text-sm leading-7 text-gray-300 md:text-base">
                This page appears when the card payment flow is closed or cancelled before final confirmation.
                No completed wallet funding should be assumed from this step alone.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/profile/deposit"
                  className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
                >
                  Try Deposit Again
                </Link>

                <Link
                  to="/profile/wallet"
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
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
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Checkout Result</p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">Cancelled</p>
                    <p className="text-sm text-gray-300">Payment was not completed</p>
                  </div>

                  <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                    Incomplete
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Reference Details</p>

                <div className="mt-4 space-y-3 text-sm text-gray-300">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <p className="text-xs text-gray-500">Session ID</p>
                    <p className="mt-1 break-all text-white">
                      {sessionId || 'Not returned in URL'}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <p className="text-xs text-gray-500">Payment Intent</p>
                    <p className="mt-1 break-all text-white">
                      {paymentIntent || 'Not returned in URL'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="card-surface p-6">
          <h2 className="text-2xl font-bold text-white">What to do next</h2>

          <div className="mt-5 space-y-4">
            {[
              'Return to the deposit page and start a new payment attempt if needed.',
              'Check your wallet and transactions page before retrying, to avoid confusion.',
              'If Stripe was closed accidentally, you can simply begin the deposit flow again.',
              'Later this page can be connected to backend payment state validation.',
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-slate-950">
                  {index + 1}
                </div>
                <p className="pt-1 text-sm leading-7 text-gray-300">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}