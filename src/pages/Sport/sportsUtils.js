export function formatMatchDate(dateString) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
}

export function formatDayLabel(dateString) {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  }).format(new Date(dateString));
}

export function formatMoney(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function getStatusTone(status = '') {
  const liveStates = ['First Half', 'Second Half', 'Halftime', 'In Progress', 'Kick Off'];
  if (liveStates.includes(status)) return 'text-red-400';
  if (status === 'Full Time') return 'text-emerald-400';
  return 'text-slate-300';
}
