export function formatMatchDate(dateString) {
  if (!dateString) return 'Date unavailable';

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return String(dateString);

  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDayLabel(dateString) {
  if (!dateString) return 'Upcoming';

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return String(dateString);

  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });
}

export function formatMoney(amount, currency = 'USD') {
  const numeric = Number(amount || 0);

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(numeric);
  } catch {
    return `${numeric.toFixed(2)} ${currency}`;
  }
}

export function initials(name = '') {
  return String(name)
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function getStatusTone(status = '') {
  const value = String(status).toLowerCase();

  if (
    value.includes('first half') ||
    value.includes('second half') ||
    value.includes('halftime') ||
    value.includes('in progress') ||
    value.includes('kick off') ||
    value.includes('live')
  ) {
    return 'text-red-400';
  }

  if (value.includes('full time') || value.includes('finished')) {
    return 'text-emerald-400';
  }

  if (value.includes('not started') || value.includes('scheduled')) {
    return 'text-amber-300';
  }

  return 'text-slate-300';
}