import type { CalendarActiveProps } from '../Calendar/Calendar.types';
import type { CalendarHeaderProps } from '../CalendarHeader/CalendarHeader.types';

export interface CalendarYearPickerProps
  extends CalendarHeaderProps,
    Omit<CalendarActiveProps, 'activeMonth'> {
  onSelectYear?: (year: number) => void;
}
