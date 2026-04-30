import type { CalendarActiveProps } from '../Calendar/Calendar.types';
import type { CalendarHeaderProps } from '../CalendarHeader/CalendarHeader.types';

export interface MonthPickerProps
  extends CalendarHeaderProps,
    CalendarActiveProps {
  onSelectMonth?: (month: number) => void;
}
