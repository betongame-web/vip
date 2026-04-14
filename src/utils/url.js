const API_BASE =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:8000/api';

function getOriginFromApi(base) {
  try {
    const url = new URL(base);
    return `${url.protocol}//${url.host}`;
  } catch {
    return '';
  }
}

const API_ORIGIN = getOriginFromApi(API_BASE);
const STORAGE_BASE =
  import.meta.env.VITE_STORAGE_URL ||
  (API_ORIGIN ? `${API_ORIGIN}/storage` : '/storage');

const ASSET_BASE =
  import.meta.env.VITE_ASSET_URL ||
  '/assets';

function isAbsolute(value) {
  return /^https?:\/\//i.test(String(value || ''));
}

function joinUrl(base, path) {
  const cleanBase = String(base || '').replace(/\/+$/, '');
  const cleanPath = String(path || '').replace(/^\/+/, '');
  return `${cleanBase}/${cleanPath}`;
}

export function getStorageUrl(path = '') {
  if (!path) return '';
  if (isAbsolute(path)) return path;

  const value = String(path);

  if (value.startsWith('/storage/')) {
    return API_ORIGIN ? `${API_ORIGIN}${value}` : value;
  }

  if (value.startsWith('storage/')) {
    return API_ORIGIN ? `${API_ORIGIN}/${value}` : `/${value}`;
  }

  return joinUrl(STORAGE_BASE, value);
}

export function getAssetUrl(path = '') {
  if (!path) return '';
  if (isAbsolute(path)) return path;

  const value = String(path);

  if (value.startsWith('/')) return value;
  return joinUrl(ASSET_BASE, value);
}