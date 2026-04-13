export function platformName() {
  return 'VIPERPRO';
}

export function dateFormatServer(date) {
  const currentDate = new Date(date);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDate(dateTimeString, locale = 'en-US') {
  const date = new Date(dateTimeString);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function generateSlug(text = '') {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function currencyFormat(value, currency = 'USD', locale = 'en-US') {
  const numeric = typeof value === 'number' ? value : parseFloat(value || 0);
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(numeric);
  } catch {
    return `${numeric.toFixed(2)} ${currency}`;
  }
}

export function currencyUSD(value) {
  const numeric = typeof value === 'number' ? value : parseFloat(value || 0);
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numeric);
}

export function limitCharacters(value = '', limit = 80) {
  if (value.length <= limit) return value;
  return `${value.slice(0, limit)}...`;
}

export function statusLabel(status) {
  if (status === 1) return 'Concluded';
  if (status === 0) return 'Pending';
  return 'Unknown';
}
