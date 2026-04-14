export function extractErrorMessages(error) {
  const fallback = ['Something went wrong. Please try again.'];

  if (!error) return fallback;

  const data = error?.response?.data;

  if (Array.isArray(data?.errors)) {
    return data.errors.filter(Boolean).map(String);
  }

  if (data?.errors && typeof data.errors === 'object') {
    return Object.values(data.errors)
      .flat()
      .filter(Boolean)
      .map(String);
  }

  if (typeof data?.message === 'string' && data.message.trim()) {
    return [data.message];
  }

  if (typeof error?.message === 'string' && error.message.trim()) {
    return [error.message];
  }

  return fallback;
}