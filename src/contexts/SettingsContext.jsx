import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import http from '@/services/http';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const raw = localStorage.getItem('setting');
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(false);

  const refreshSettings = async () => {
    setLoading(true);
    try {
      const { data } = await http.get('/settings/data');
      const nextSettings = data?.setting || data || null;
      if (nextSettings) {
        localStorage.setItem('setting', JSON.stringify(nextSettings));
      }
      setSettings(nextSettings);
      return nextSettings;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!settings) {
      refreshSettings().catch(() => undefined);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const value = useMemo(() => ({
    settings,
    setSettings,
    loading,
    refreshSettings,
  }), [settings, loading]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const value = useContext(SettingsContext);
  if (!value) {
    throw new Error('useSettings must be used inside SettingsProvider');
  }
  return value;
}
