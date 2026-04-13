export default function Pagination({ pagination, onPageChange }) {
  if (!pagination) return null;
  const currentPage = pagination.current_page || 1;
  const lastPage = pagination.last_page || 1;

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-gray-400">
        Page {currentPage} of {lastPage}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          className="rounded-lg border border-white/10 px-4 py-2 text-sm disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => onPageChange(Math.min(lastPage, currentPage + 1))}
          disabled={currentPage >= lastPage}
          className="rounded-lg border border-white/10 px-4 py-2 text-sm disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
