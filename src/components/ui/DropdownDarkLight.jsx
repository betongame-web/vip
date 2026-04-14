import { useEffect, useState } from 'react';

const STORAGE_KEY = 'frontend_theme_mode_v1';

export default function DropdownDarkLight() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
    setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-gray-400">
        Theme mode
      </label>
      <select
        value={theme}
        onChange={(event) => setTheme(event.target.value)}
        className="input"
      >
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  );
}
