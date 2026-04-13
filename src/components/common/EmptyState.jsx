export default function EmptyState({ title = 'No data to show', description = 'Nothing was returned by the API for this screen.' }) {
  return (
    <div className="card-surface flex min-h-[240px] flex-col items-center justify-center px-6 py-10 text-center">
      <div className="mb-4 text-4xl">∅</div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="max-w-xl text-sm text-gray-400">{description}</p>
    </div>
  );
}
