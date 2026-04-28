import type { JSX, ReactNode, Ref } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type SelectionMode = 'single' | 'range';

export interface DateRange {
  from: string | null;
  to?: string | null;
}

export interface DayCellRenderProps {
  day: number;
  month: number;
  year: number;
  date: string;
  isDisabled: boolean;
  isSelected: boolean;
  isFocusedMonth: boolean;
}

export interface CalendarActiveProps {
  activeYear: number;
  activeMonth: number;
}

export interface CalendarRef {
  moveTo: (month: number, year: number) => void;
  clearSelection: () => void;
}

export enum CalendarType {
  Day = 'day',
  Month = 'month',
  Year = 'year',
}

interface BaseCalendarProps {
  calendarRef?: Ref<CalendarRef>;
  style?: StyleProp<ViewStyle>;
  className?: string;
  disableDate?: (date: string) => boolean;
  renderDayCell?: (props: DayCellRenderProps) => ReactNode;
}

export interface CalendarSingleModeProps extends BaseCalendarProps {
  mode?: 'single';
  selectedDate?: string | null;
  onSelectDate?: (date: string) => void;
}

export interface CalendarRangeModeProps extends BaseCalendarProps {
  mode: 'range';
  selectedRange?: DateRange;
  onSelectRange?: (range: DateRange | null) => void;
}

export type CalendarProps = CalendarSingleModeProps | CalendarRangeModeProps;

export interface CalendarOverload {
  (props: CalendarSingleModeProps): JSX.Element;
  (props: CalendarRangeModeProps): JSX.Element;
  (props: CalendarProps): JSX.Element;
  displayName: string;
}
