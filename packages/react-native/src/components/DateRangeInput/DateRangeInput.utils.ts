import type { DateRange } from '../Calendar';
import type { DateFormat } from '../DateInput/DateInput.types';
import { formatDateForDisplay } from '../DateInput/DateInput.utils';

export const formatRangeForDisplay = (
  range: DateRange | null | undefined,
  format: DateFormat,
  separator: string,
  placeholderTo: string,
): string | null => {
  if (!range || (!range.from && !range.to)) return null;
  const from = range.from ? formatDateForDisplay(range.from, format) : '';
  const to = range.to ? formatDateForDisplay(range.to, format) : placeholderTo;
  return `${from}${separator}${to}`;
};
