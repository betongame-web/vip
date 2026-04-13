import { Link } from 'react-router-dom';
import BaseLayout from '@/components/layouts/BaseLayout';

const eventCards = [
  {
    title: 'Weekly Tournament',
    tag: 'Recurring',
    description:
      'A featured event block for weekly competitions, point races, or leaderboard challenges.',
  },
  {
    title: 'Seasonal Festival Event',
    tag: 'Seasonal',
    description:
      'Use this area for special celebration campaigns, limited-time reward pools, and themed player events.',
  },
  {
    title: 'VIP Challenge',
    tag: 'VIP',
    description:
      'An exclusive section for premium members with higher-value tasks, rewards, and loyalty-based competitions.',
  },
  {
    title: 'Referral Race',
    tag: 'Community',
    description:
      'Highlight invite-based campaigns where users earn rewards through friend referrals and activation goals.',
  },
];

const eventSteps = [
  'Show the active event name and campaign period clearly.',
  'Explain how users join or qualify for the event.',
  'Display reward structure in a simple and visible format.',
  'Separate active, upcoming, and completed events for clarity.',
];

const eventTimeline = [
  { label: 'Registration Phase', detail: 'Users join the event and review the conditions.' },
  { label: 'Active Competition', detail: 'Players participate, collect points, or meet event targets.' },
  { label: 'Result Review', detail: 'System or admin verifies progress, ranking, or final qualification.' },
  { label: 'Reward Distribution', detail: 'Approved winners receive bonuses, gifts, or VIP upgrades.' },
];

export default function EventsPage() {
  return (
    <BaseLayout>
      <div className="space-y-6">
        <section className="card-surface overflow-hidden">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
            <div>
              <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Events & Campaigns
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Display active competitions, seasonal campaigns, and player event rewards
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                This page is designed to organize live events, upcoming campaigns, tournament
                highlights, and reward-based competitions in a premium and readable layout.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/awards"
                  className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  View Awards
                </Link>

                <Link
                  to="/promotion"
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                >
                  Open Promotions
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Event Types</p>
                <ul className="mt-4 space-y-3 text-sm text-gray-300">
                  <li>• Weekly tournaments</li>
                  <li>• Seasonal campaigns</li>
                  <li>• VIP-only competitions</li>
                  <li>• Referral-based challenges</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Campaign Slots</p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">4+</p>
                    <p className="text-sm text-gray-300">Event areas highlighted</p>
                  </div>
                  <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                    Live
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {eventCards.map((item) => (
            <div key={item.title} className="card-surface p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                  {item.tag}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-gray-300">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">How event pages should be organized</h2>

            <div className="mt-5 space-y-4">
              {eventSteps.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold text-slate-950">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-white">Event flow preview</h2>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                Sample
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {eventTimeline.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <h3 className="text-base font-semibold text-white">{item.label}</h3>
                  <p className="mt-2 text-sm leading-7 text-gray-300">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
              <h3 className="text-base font-semibold text-amber-200">Later integration</h3>
              <p className="mt-2 text-sm leading-7 text-amber-100/90">
                Later this page can be connected with backend event data, reward rules,
                registration status, countdowns, and winner announcements.
              </p>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}