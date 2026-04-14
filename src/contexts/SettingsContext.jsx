import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import http from '@/services/http';

const SettingsContext = createContext(null);

const DEFAULT_SETTINGS = {
  min_deposit: 10,
  max_deposit: 10000,
  min_withdrawal: 20,
  suitpay_is_enable: true,
  stripe_is_enable: true,
};

function normalizeSettings(data) {
  if (!data) return DEFAULT_SETTINGS;

  if (data.settings && typeof data.settings === 'object') {
    return { ...DEFAULT_SETTINGS, ...data.settings };
  }

  if (data.data && typeof data.data === 'object' && !Array.isArray(data.data)) {
    return { ...DEFAULT_SETTINGS, ...data.data };
  }

  if (typeof data === 'object' && !Array.isArray(data)) {
    return { ...DEFAULT_SETTINGS, ...data };
  }

  return DEFAULT_SETTINGS;
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loadingSettings, setLoadingSettings] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadSettings() {
      setLoadingSettings(true);

      const endpoints = ['/settings', '/settings/all', '/settings/general'];

      for (const endpoint of endpoints) {
        try {
          const { data } = await http.get(endpoint);

          if (!ignore) {
            setSettings(normalizeSettings(data));
            setLoadingSettings(false);
          }
          return;
        } catch {
          // try next endpoint
        }
      }

      if (!ignore) {
        setSettings(DEFAULT_SETTINGS);
        setLoadingSettings(false);
      }
    }

    loadSettings();

    return () => {
      ignore = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      settings,
      loadingSettings,
      setSettings,
    }),
    [settings, loadingSettings],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const value = useContext(SettingsContext);

  if (!value) {
    throw new Error('useSettings must be used inside SettingsProvider');
  }

  return value;
}