function buildPages(current, last) {
  const pages = [];

  for (let i = 1; i <= last; i += 1) {
    pages.push(i);
  }

  return pages;
}

export default function Pagination({ pagination, onPageChange }) {
  const currentPage = Number(
    pagination?.current_page || pagination?.currentPage || 1,
  );
  const lastPage = Number(
    pagination?.last_page || pagination?.lastPage || 1,
  );

  if (!pagination || lastPage <= 1) return null;

  const pages = buildPages(currentPage, lastPage);

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange?.(page)}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            page === currentPage
              ? 'bg-emerald-500 text-white'
              : 'border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage >= lastPage}
        onClick={() => onPageChange?.(currentPage + 1)}
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}