import { useMemo } from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';

export default function DataPage() {
  const { user, isAuthenticated, booting } = useAuth();
  const { settings, loadingSettings } = useSettings();

  const envRows = useMemo(
    () => [
      {
        label: 'VITE_API_URL',
        value: import.meta.env.VITE_API_URL || 'Not set',
      },
      {
        label: 'VITE_API_BASE_URL',
        value: import.meta.env.VITE_API_BASE_URL || 'Not set',
      },
      {
        label: 'VITE_STORAGE_URL',
        value: import.meta.env.VITE_STORAGE_URL || 'Not set',
      },
    ],
    [],
  );

  return (
    <BaseLayout>
      <div className="space-y-6">
        <section className="card-surface overflow-hidden">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
            <div>
              <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                API Debug Page
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Frontend context, auth, and environment preview
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                Use this page to quickly inspect your current auth state, loaded settings,
                and important frontend environment values while testing the React app.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Status Summary</p>
              <div className="mt-4 space-y-3 text-sm text-gray-300">
                <p>• Auth booting: {booting ? 'Yes' : 'No'}</p>
                <p>• Logged in: {isAuthenticated ? 'Yes' : 'No'}</p>
                <p>• Settings loading: {loadingSettings ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">Environment values</h2>

            <div className="mt-5 space-y-4">
              {envRows.map((row) => (
                <div
                  key={row.label}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-gray-400">{row.label}</p>
                  <p className="mt-2 break-all text-sm text-white">{row.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface p-6">
            <h2 className="text-2xl font-bold text-white">Auth preview</h2>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Authenticated</p>
                <p className="mt-2 text-sm text-white">{isAuthenticated ? 'True' : 'False'}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-gray-400">User</p>
                <pre className="mt-2 overflow-auto whitespace-pre-wrap text-xs text-gray-300">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section className="card-surface p-6">
          <h2 className="text-2xl font-bold text-white">Loaded settings</h2>

          <pre className="mt-5 overflow-auto rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-gray-300">
            {JSON.stringify(settings, null, 2)}
          </pre>
        </section>
      </div>
    </BaseLayout>
  );
}