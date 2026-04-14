import { useEffect, useState } from 'react';

const STORAGE_KEY = 'viperpro_cookie_notice_closed_v1';

export default function CookiesComponent() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setHidden(saved === 'true');
    } catch {
      setHidden(false);
    }
  }, []);

  function closeNotice() {
    setHidden(true);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // ignore storage errors
    }
  }

  if (hidden) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:bottom-6 md:left-auto md:right-6 md:max-w-md">
      <div className="rounded-3xl border border-white/10 bg-brandgray-900/95 p-5 shadow-2xl backdrop-blur">
        <p className="text-sm font-semibold text-white">Cookie Notice</p>
        <p className="mt-2 text-sm leading-7 text-gray-300">
          This frontend uses local storage for session helpers, sportsbook local betslip,
          favorites, and small UI preferences.
        </p>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={closeNotice}
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            Accept
          </button>

          <button
            type="button"
            onClick={closeNotice}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-white/10"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}