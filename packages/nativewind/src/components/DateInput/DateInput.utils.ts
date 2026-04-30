import type { DateFormat } from './DateInput.types';

export const formatDateForDisplay = (
  iso: string,
  format: DateFormat,
): string => {
  const parts = iso.split('-');
  if (parts.length !== 3) return iso;
  const [year, month, day] = parts;
  if (!year || !month || !day) return iso;
  switch (format) {
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'YYYY-MM-DD':
    default:
      return `${year}-${month}-${day}`;
  }
};
