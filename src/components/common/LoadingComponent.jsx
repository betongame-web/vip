export default function LoadingComponent({ isLoading, children, message = 'Loading...' }) {
  if (!isLoading) return children;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="card-surface w-full max-w-sm p-6 text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
        <p className="text-sm text-gray-300">{message}</p>
      </div>
    </div>
  );
}
