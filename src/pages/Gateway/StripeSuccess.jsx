import { Link, useSearchParams } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';

export default function StripeSuccess() {
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get('session_id') || '';
  const paymentIntent = searchParams.get('payment_intent') || '';

  return (
    <BaseLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <section className="card-surface overflow-hidden">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
            <div>
              <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Payment Success
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Your Stripe payment flow completed successfully
              </h1>

              <p className="mt-4 text-sm leading-7 text-gray-300 md:text-base">
                This page confirms that the card checkout flow returned successfully.
                You can now go back to your wallet, review transactions, or continue browsing the platform.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/profile/wallet"
                  className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                  Open Wallet
                </Link>

                <Link
                  to="/profile/transactions"
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                >
                  View Transactions
                </Link>

                <Link
                  to="/"
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                >
                  Go Home
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Checkout Result</p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">Success</p>
                    <p className="text-sm text-gray-300">Stripe redirect completed</p>
                  </div>

                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    Confirmed
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
              'Open the wallet page and verify whether your balance updated.',
              'If the balance does not update immediately, check the transactions page.',
              'Later this page can be connected to backend payment verification logic.',
              'You can also keep the Stripe session ID for debugging during testing.',
            ].map((item, index) => (
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
        </section>
      </div>
    </BaseLayout>
  );
}