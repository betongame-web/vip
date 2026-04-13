import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';

const supportChannels = [
  {
    title: 'Live Chat Support',
    description: 'Get help with login, account, bonus, game launch, and general platform questions.',
    badge: '24/7',
  },
  {
    title: 'Payment Assistance',
    description: 'For deposit, withdrawal, pending transaction, and wallet-related support requests.',
    badge: 'Fast Response',
  },
  {
    title: 'Technical Help',
    description: 'Report broken pages, loading issues, game errors, or device compatibility problems.',
    badge: 'Issue Tracking',
  },
];

const faqItems = [
  {
    question: 'How do I recover my account?',
    answer:
      'Use the forgot password page first. If you still cannot access the account, contact support with your registered email and recent account activity.',
  },
  {
    question: 'Why is my withdrawal still pending?',
    answer:
      'Withdrawals may remain pending during verification, gateway delays, or account security checks. Check your wallet history and contact support if it takes too long.',
  },
  {
    question: 'A game is not opening. What should I do?',
    answer:
      'Refresh the page, try another browser, and confirm your internet connection. If the issue continues, report the game name and device details to support.',
  },
  {
    question: 'Can I get help with promotions and bonus rules?',
    answer:
      'Yes. The support team can explain bonus conditions, wagering requirements, promotion availability, and reward eligibility.',
  },
];

export default function SupportPage() {
  return (
    <BaseLayout>
      <div className="space-y-6">
        <section className="card-surface overflow-hidden">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.3fr_0.7fr] lg:p-8">
            <div>
              <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Support Center
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Need help with your account, wallet, or platform activity?
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                This page gives players a clean place to find assistance for account recovery,
                transactions, technical issues, game access, and general platform questions.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/support-center"
                  className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                  Open Support Center
                </Link>

                <Link
                  to="/profile/wallet"
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                >
                  Check Wallet
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Priority Cases</p>
                <h3 className="mt-3 text-lg font-semibold text-white">Fast support for urgent issues</h3>
                <ul className="mt-4 space-y-3 text-sm text-gray-300">
                  <li>• Failed deposit or pending wallet balance</li>
                  <li>• Withdrawal review or verification problem</li>
                  <li>• Login or password reset issue</li>
                  <li>• Game launch or loading failure</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Availability</p>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">24/7</p>
                    <p className="text-sm text-gray-300">Customer assistance window</p>
                  </div>
                  <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    Online
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {supportChannels.map((item) => (
            <div key={item.title} className="card-surface p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                  {item.badge}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-gray-300">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">How support works</h2>

            <div className="mt-5 space-y-4">
              {[
                'Open the correct section for your issue.',
                'Describe the problem clearly with account details.',
                'Attach transaction or game details when needed.',
                'Wait for reply or follow-up verification.',
              ].map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-gray-300">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-white">Common questions</h2>
              <Link
                to="/support-center"
                className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-gray-300 hover:bg-white/5"
              >
                More help
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <h3 className="text-base font-semibold text-white">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-gray-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}