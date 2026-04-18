const trimSlash = (value = '') => value.replace(/\/+$/, '');

export function getApiBaseUrl() {
  return trimSlash(
    import.meta.env.VITE_API_BASE_URL || 'https://vip-back.onrender.com/api'
  );
}

export function getAppBaseUrl() {
  return trimSlash(
    import.meta.env.VITE_APP_BASE_URL || 'https://vip-back.onrender.com'
  );
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