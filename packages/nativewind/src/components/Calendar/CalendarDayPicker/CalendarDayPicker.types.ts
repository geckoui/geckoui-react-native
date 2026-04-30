import type {
  CalendarActiveProps,
  CalendarProps,
  DateRange,
} from '../Calendar/Calendar.types';
import type { CalendarHeaderProps } from '../CalendarHeader/CalendarHeader.types';

interface CalendarDayPickerBaseProps
  extends CalendarHeaderProps,
    CalendarActiveProps,
    Pick<CalendarProps, 'disableDate' | 'renderDayCell'> {}

export interface CalendarDayPickerSingleProps
  extends CalendarDayPickerBaseProps {
  mode?: 'single';
  selectedDate?: string | null;
  onSelectDate?: (date: string) => void;
}

export interface CalendarDayPickerRangeProps
  extends CalendarDayPickerBaseProps {
  mode: 'range';
  selectedRange?: DateRange;
  onSelectRange?: (date: string) => void;
}

export type CalendarDayPickerProps =
  | CalendarDayPickerSingleProps
  | CalendarDayPickerRangeProps;
