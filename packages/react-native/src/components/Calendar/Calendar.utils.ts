function daysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function firstDayOfMonth(month: number, year: number): number {
  return new Date(year, month, 1).getDay();
}

export function generateCalendarDates(
  month: number,
  year: number,
): { day: number; month: number; year: number }[] {
  const dates = [];
  const currentMonthDays = daysInMonth(month, year);
  const prevMonthDays =
    month === 0 ? daysInMonth(11, year - 1) : daysInMonth(month - 1, year);
  let firstDay = firstDayOfMonth(month, year);
  firstDay = firstDay === 0 ? 7 : firstDay;
  for (let i = firstDay - 1; i >= 0; i--) {
    dates.push({
      day: prevMonthDays - i,
      month: month === 0 ? 11 : month - 1,
      year: month === 0 ? year - 1 : year,
    });
  }
  for (let i = 1; i <= currentMonthDays; i++) {
    dates.push({ day: i, month, year });
  }
  let nextMonthDay = 1;
  while (dates.length < 42) {
    dates.push({
      day: nextMonthDay,
      month: month === 11 ? 0 : month + 1,
      year: month === 11 ? year + 1 : year,
    });
    nextMonthDay++;
  }
  return dates;
}

export function generateMonthNames(locale = 'en-US'): {
  months: string[];
  shortMonths: string[];
} {
  const months = [];
  const shortMonths = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(2024, i, 1);
    months.push(date.toLocaleString(locale, { month: 'long' }));
    shortMonths.push(date.toLocaleString(locale, { month: 'short' }));
  }
  return { months, shortMonths };
}

export function getTodayDate(): string {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function isValidISOFormat(
  date: string | null | undefined = '',
): boolean {
  if (!date) return false;
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

export function isDateInRange(
  date: string,
  range: { from: string | null; to?: string | null },
): boolean {
  if (!range.from || !range.to) return false;
  return date >= range.from && date <= range.to;
}

export function isDateBetween(
  date: string,
  start: string | null,
  end: string | null,
): boolean {
  if (!start || !end) return false;
  return date >= start && date <= end;
}

export function formatDateRange(range: {
  from: string | null;
  to?: string | null;
}): string {
  if (!range.from) return '';
  if (!range.to) return range.from;
  return `${range.from} → ${range.to}`;
}

export function shouldSwapDates(
  start?: string | null,
  end?: string | null,
): boolean {
  if (!start || !end) return false;
  return end < start;
}
