const vipRows = [
  {
    level: 'VIP 1',
    deposit: '$100',
    withdrawal: '$500',
    cashback: '0.3%',
    reward: 'Starter gift',
  },
  {
    level: 'VIP 2',
    deposit: '$300',
    withdrawal: '$1,000',
    cashback: '0.5%',
    reward: 'Reload support',
  },
  {
    level: 'VIP 3',
    deposit: '$800',
    withdrawal: '$2,500',
    cashback: '0.8%',
    reward: 'Priority bonus',
  },
  {
    level: 'VIP 4',
    deposit: '$1,500',
    withdrawal: '$5,000',
    cashback: '1.0%',
    reward: 'Weekly gift pack',
  },
  {
    level: 'VIP 5',
    deposit: '$3,000',
    withdrawal: '$8,000',
    cashback: '1.2%',
    reward: 'Premium support',
  },
  {
    level: 'VIP 6',
    deposit: '$5,000',
    withdrawal: '$12,000',
    cashback: '1.5%',
    reward: 'Exclusive event access',
  },
  {
    level: 'VIP 7',
    deposit: '$8,000',
    withdrawal: '$20,000',
    cashback: '1.8%',
    reward: 'Higher campaign rewards',
  },
  {
    level: 'VIP 8',
    deposit: '$12,000',
    withdrawal: '$30,000',
    cashback: '2.0%',
    reward: 'Dedicated account handling',
  },
  {
    level: 'VIP 9',
    deposit: '$20,000',
    withdrawal: '$50,000',
    cashback: '2.3%',
    reward: 'Elite seasonal rewards',
  },
  {
    level: 'VIP 10',
    deposit: '$35,000',
    withdrawal: '$75,000',
    cashback: '2.5%',
    reward: 'Top-tier premium package',
  },
];

export default function TableVip() {
  return (
    <section className="card-surface p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">VIP level table</h2>
          <p className="mt-2 text-sm leading-7 text-gray-300">
            This table is currently illustrative. Later you can replace these values
            with backend-driven VIP requirements and benefits.
          </p>
        </div>

        <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
          Sample level structure
        </span>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-2xl border border-white/10">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-gray-300">
                Level
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-gray-300">
                Required Deposit
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-gray-300">
                Withdrawal Limit
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-gray-300">
                Cashback
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-gray-300">
                Reward
              </th>
            </tr>
          </thead>

          <tbody>
            {vipRows.map((row, index) => (
              <tr
                key={row.level}
                className={index % 2 === 0 ? 'bg-black/20' : 'bg-white/[0.03]'}
              >
                <td className="px-4 py-4 text-sm font-semibold text-white">{row.level}</td>
                <td className="px-4 py-4 text-sm text-gray-300">{row.deposit}</td>
                <td className="px-4 py-4 text-sm text-gray-300">{row.withdrawal}</td>
                <td className="px-4 py-4 text-sm text-yellow-300">{row.cashback}</td>
                <td className="px-4 py-4 text-sm text-gray-300">{row.reward}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}