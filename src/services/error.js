export function extractErrorMessages(error) {
  const data = error?.response?.data;
  if (!data) return ['Something went wrong.'];
  if (typeof data === 'string') return [data];
  if (Array.isArray(data)) return data;
  if (data.message && typeof data.message === 'string') return [data.message];

  const values = Object.values(data).flatMap((value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];
    return [];
  });

  return values.length ? values : ['Something went wrong.'];
}
