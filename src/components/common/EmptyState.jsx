import { Link } from 'react-router-dom';

export default function EmptyState({
  title = 'Nothing found',
  description = 'There is no data available right now.',
  actionLabel = '',
  actionTo = '/',
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-brandgray-800/80 p-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-2xl">
          📭
        </div>

        <h2 className="mt-5 text-2xl font-bold text-white">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-gray-300">{description}</p>

        {actionLabel ? (
          <div className="mt-6">
            <Link
              to={actionTo}
              className="inline-flex rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              {actionLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}