const trimSlash = (value = '') => String(value).replace(/\/+$/, '');

function getCurrentOrigin() {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return trimSlash(window.location.origin);
  }
  return '';
}

export function getApiBaseUrl() {
  const envBase = trimSlash(import.meta.env.VITE_API_BASE_URL || '');
  if (envBase) return envBase;

  const origin = getCurrentOrigin();
  if (origin) return `${origin}/api`;

  return 'https://vip-back.onrender.com/api';
}

export function getAppBaseUrl() {
  const envBase = trimSlash(import.meta.env.VITE_APP_BASE_URL || '');
  if (envBase) return envBase;

  const origin = getCurrentOrigin();
  if (origin) return origin;

  return 'https://vip-back.onrender.com';
}

export function getStorageUrl(path = '') {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const appBase = getAppBaseUrl();
  const normalized = path.startsWith('/storage/')
    ? path
    : `/storage/${String(path).replace(/^\/+/, '')}`;
  return `${appBase}${normalized}`;
}

export function getAssetUrl(path = '') {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const appBase = getAppBaseUrl();
  const normalized = path.startsWith('/assets/')
    ? path
    : `/assets/${String(path).replace(/^\/+/, '')}`;
  return `${appBase}${normalized}`;
}
