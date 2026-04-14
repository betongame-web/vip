import { useEffect, useState } from 'react';

const STORAGE_KEY = 'frontend_language_v1';
const options = [
  { code: 'en', label: 'English' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'pt', label: 'Português' },
];

export default function LanguageSelector() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    setLanguage(localStorage.getItem(STORAGE_KEY) || 'en');
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-gray-400">
        Language
      </label>
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        className="input"
      >
        {options.map((item) => (
          <option key={item.code} value={item.code}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
