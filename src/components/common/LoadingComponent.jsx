export default function LoadingComponent({
  isLoading = false,
  message = 'Loading...',
}) {
  if (!isLoading) return null;

  return (
    <div className="rounded-3xl border border-white/10 bg-brandgray-800/80 p-8">
      <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-emerald-400" />
        <div>
          <p className="text-lg font-semibold text-white">{message}</p>
          <p className="mt-2 text-sm text-gray-400">
            Please wait while the page data is being prepared.
          </p>
        </div>
      </div>
    </div>
  );
}