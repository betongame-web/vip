import { useMemo } from 'react';

export default function Spinner({ prizes = [], spinning = false, activeIndex = 0 }) {
  const visible = useMemo(() => prizes.slice(0, 8), [prizes]);

  return (
    <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
      <div
        className={`grid grid-cols-2 gap-3 md:grid-cols-4 ${spinning ? 'animate-pulse' : ''}`}
      >
        {visible.map((item, index) => (
          <div
            key={item.id || `${item.name || 'prize'}-${index}`}
            className={`rounded-2xl border p-4 text-center transition ${
              index === activeIndex
                ? 'border-fuchsia-400 bg-fuchsia-500/20 text-white'
                : 'border-white/10 bg-white/[0.03] text-gray-300'
            }`}
          >
            {item.name || item.title || item.prize_name || 'Prize'}
          </div>
        ))}
      </div>
    </div>
  );
}
