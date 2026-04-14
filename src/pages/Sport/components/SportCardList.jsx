import SportEventCard from '@/pages/Sport/components/SportEventCard';

export default function SportCardList({ title = 'Events', subtitle = '', events = [] }) {
  return (
    <section className="card-surface p-6">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {subtitle ? <p className="mt-2 text-sm leading-7 text-gray-300">{subtitle}</p> : null}
      </div>

      {events.length ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {events.map((event) => (
            <SportEventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-gray-300">
          No sports events available.
        </div>
      )}
    </section>
  );
}
