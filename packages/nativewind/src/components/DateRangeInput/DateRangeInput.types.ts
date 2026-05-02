import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { DateRange } from '../Calendar';
import type { DateFormat } from '../DateInput/DateInput.types';

export interface DateRangeInputProps {
  /** Currently selected range. `null` or `undefined` for empty. */
  value?: DateRange | null;

  /** Fired with the full range once both dates are picked, or `null` when cleared. */
  onChange?: (range: DateRange | null) => void;

  placeholder?: string;

  /** Placeholder shown for the "to" half when only "from" is selected. */
  placeholderTo?: string;

  /** Separator between formatted dates. Default `" — "`. */
  separator?: string;

  disabled?: boolean;

  /** Display format for both dates in the trigger. Default `DD/MM/YYYY`. */
  format?: DateFormat;

  /** Show a clear button when a value is selected. Default `true`. */
  clearable?: boolean;

  /** Hide the clear icon even when `clearable`. */
  hideClearIcon?: boolean;

  /** Hide the trailing calendar/chevron icon. */
  hideCalendarIcon?: boolean;

  className?: string;
  style?: StyleProp<ViewStyle>;
  placeholderClassName?: string;

  /** Class applied to the `<Calendar>` rendered inside the picker. */
  calendarClassName?: string;

  /** Class applied to the bottom-sheet picker panel. */
  pickerClassName?: string;

  prefix?: ReactNode;
  suffix?: ReactNode;

  /** Forwarded to `<Calendar>` — return `true` to mark a date as unselectable. */
  disableDate?: (date: string) => boolean;
}
