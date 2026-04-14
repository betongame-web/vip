import { currencyFormat } from '@/utils/formatters';

export default function WalletBalance({ wallet }) {
  if (!wallet) return null;

  const currency = wallet?.currency || 'USD';

  const cards = [
    {
      label: 'Main Balance',
      value: currencyFormat(wallet?.balance || 0, currency),
      tone: 'text-white',
    },
    {
      label: 'Withdrawable',
      value: currencyFormat(wallet?.balance_withdrawal || 0, currency),
      tone: 'text-emerald-300',
    },
    {
      label: 'Bonus Balance',
      value: currencyFormat(wallet?.balance_bonus || 0, currency),
      tone: 'text-amber-300',
    },
    {
      label: 'Currency',
      value: wallet?.currency || '—',
      tone: 'text-cyan-300',
    },
  ];

  return (
    <section className="card-surface p-6">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white">Wallet balances</h2>
        <p className="mt-2 text-sm leading-7 text-gray-300">
          Main balance, withdrawable amount, and bonus funds in one place.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-white/10 bg-black/20 p-5"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-gray-400">{card.label}</p>
            <p className={`mt-3 text-2xl font-bold ${card.tone}`}>{card.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}