export default function HeaderComponent({ title, subtitle, right = null }) {
  return (
    <section className="mb-6 overflow-hidden rounded-3xl border border-white/10 bg-brandgray-800/80">
      <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
        <div>
          <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Section Header
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {title}
          </h1>

          {subtitle ? (
            <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="flex items-end justify-start lg:justify-end">
          {right ? (
            right
          ) : (
            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-gray-300">
              Ready
            </div>
          )}
        </div>
      </div>
    </section>
  );
}