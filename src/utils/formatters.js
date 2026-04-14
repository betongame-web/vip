export function currencyFormat(amount, currency = 'USD') {
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

export function statusLabel(status) {
  const value = Number(status);

  if (value === 1) return 'Completed';
  if (value === 0) return 'Pending';
  if (value === 2) return 'Cancelled';
  if (value === 3) return 'Rejected';

  return 'Unknown';
}

export function numberFormat(value) {
  const numeric = Number(value || 0);

  try {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
    }).format(numeric);
  } catch {
    return String(numeric);
  }
}

export function shortDate(value) {
  if (!value) return '—';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function fullDateTime(value) {
  if (!value) return '—';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}