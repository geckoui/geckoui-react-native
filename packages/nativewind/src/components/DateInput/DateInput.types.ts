import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';

export interface DateInputProps {
  /** ISO 8601 date string (YYYY-MM-DD) or null/empty when unset. */
  value?: string | null;

  /** Fired when the user picks a date or clears the field. `null` when cleared. */
  onChange?: (date: string | null) => void;

  placeholder?: string;
  disabled?: boolean;

  /** Display format for the date in the trigger. Default `DD/MM/YYYY`. */
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
