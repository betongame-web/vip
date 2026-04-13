export default function HeaderComponent({ title, subtitle, right }) {
  return (
    <div className="card-surface mb-6 p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-gray-400">{subtitle}</p> : null}
        </div>
        {right ? <div>{right}</div> : null}
      </div>
    </div>
  );
}
