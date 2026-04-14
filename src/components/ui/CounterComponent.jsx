import { useEffect, useMemo, useState } from 'react';

export default function CounterComponent({
  label = 'Counter',
  value = 0,
  duration = 800,
  suffix = '',
  prefix = '',
}) {
  const target = useMemo(() => Number(value || 0), [value]);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(target * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-gray-400">{label}</p>
      <p className="mt-3 text-3xl font-bold text-white">
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </p>
    </div>
  );
}
