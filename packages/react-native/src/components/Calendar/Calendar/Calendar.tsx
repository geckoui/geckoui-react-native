import type React from 'react';
import { useImperativeHandle, useState } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import {
  getTodayDate,
  isValidISOFormat,
  shouldSwapDates,
} from '../Calendar.utils';
import { CalendarDayPicker } from '../CalendarDayPicker/CalendarDayPicker';
import { CalendarMonthPicker } from '../CalendarMonthPicker/CalendarMonthPicker';
import { CalendarYearPicker } from '../CalendarYearPicker/CalendarYearPicker';
import type {
  CalendarProps,
  CalendarRangeModeProps,
  CalendarSingleModeProps,
} from './Calendar.types';
import { CalendarType } from './Calendar.types';

export const Calendar = (props: CalendarProps): React.ReactElement => {
  const {
    className,
    style,
    calendarRef,
    disableDate,
    renderDayCell,
    mode = 'single',
  } = props;

  const [view, setView] = useState<CalendarType>(CalendarType.Day);
  const [rangeSelectionStart, setRangeSelectionStart] = useState<string | null>(
    null,
  );

  const selectedDate =
    mode === 'single'
      ? (props as CalendarSingleModeProps).selectedDate
      : undefined;
  const onSelectDate =
    mode === 'single'
      ? (props as CalendarSingleModeProps).onSelectDate
      : undefined;
  const selectedRange =
    mode === 'range'
      ? (props as CalendarRangeModeProps).selectedRange
      : undefined;
  const onSelectRange =
    mode === 'range'
      ? (props as CalendarRangeModeProps).onSelectRange
      : undefined;
  const numberOfMonths =
    mode === 'range'
      ? ((props as CalendarRangeModeProps).numberOfMonths ?? 2)
      : 1;

  const today = getTodayDate();
  const initialDate =
    mode === 'range'
      ? selectedRange?.from || selectedRange?.to || today
      : selectedDate || today;

  const [year, month] = (isValidISOFormat(initialDate) ? initialDate : today)
    .split('-')
    .map(Number);
  const [activeMonth, setActiveMonth] = useState(month - 1);
  const [activeYear, setActiveYear] = useState(year);

  const increaseYear = () => setActiveYear((p) => p + 1);
  const decreaseYear = () => setActiveYear((p) => p - 1);

  const onSelectMonth = (m: number) => {
    setActiveMonth(m);
    setView(CalendarType.Day);
  };

  const onSelectYear = (y: number) => {
    setActiveYear(y);
    setView(CalendarType.Month);
  };

  const clearSelection = () => {
    if (mode === 'range') {
      setRangeSelectionStart(null);
      onSelectRange?.(null);
    } else {
      onSelectDate?.('');
    }
  };

  useImperativeHandle(calendarRef, () => ({
    moveTo: (m: number, y: number) => {
      setActiveMonth(m - 1);
      setActiveYear(y);
      setView(CalendarType.Day);
    },
    clearSelection,
  }));

  const handleSingleDateClick = (date: string) => onSelectDate?.(date);

  const handleRangeDateClick = (date: string) => {
    if (!rangeSelectionStart) {
      setRangeSelectionStart(date);
      onSelectRange?.({ from: date, to: undefined });
    } else {
      const [from, to] = shouldSwapDates(rangeSelectionStart, date)
        ? [date, rangeSelectionStart]
        : [rangeSelectionStart, date];
      onSelectRange?.({ from, to });
      setRangeSelectionStart(null);
    }
  };

  const renderContent = () => {
    const decreaseMonth = () => {
      if (activeMonth - 1 < 0) {
        setActiveMonth(11);
        decreaseYear();
      } else {
        setActiveMonth((p) => p - 1);
      }
    };

    const increaseMonth = () => {
      if (activeMonth + 1 > 11) {
        setActiveMonth(0);
        increaseYear();
      } else {
        setActiveMonth((p) => p + 1);
      }
    };

    if (view === CalendarType.Day) {
      if (mode === 'range') {
        const secondMonth = activeMonth === 11 ? 0 : activeMonth + 1;
        const secondYear = activeMonth === 11 ? activeYear + 1 : activeYear;
        return (
          <View className="GeckoUICalendar__dual">
            <CalendarDayPicker
              mode="range"
              activeMonth={activeMonth}
              activeYear={activeYear}
              onClickLeftArrow={decreaseMonth}
              onClickRightArrow={increaseMonth}
              onClickHeader={() => setView(CalendarType.Month)}
              onSelectRange={handleRangeDateClick}
              selectedRange={selectedRange}
              disableDate={disableDate}
              renderDayCell={renderDayCell}
            />
            {numberOfMonths === 2 && (
              <CalendarDayPicker
                mode="range"
                activeMonth={secondMonth}
                activeYear={secondYear}
                onClickLeftArrow={decreaseMonth}
                onClickRightArrow={increaseMonth}
                onSelectRange={handleRangeDateClick}
                selectedRange={selectedRange}
                disableDate={disableDate}
                renderDayCell={renderDayCell}
              />
            )}
          </View>
        );
      }

      return (
        <CalendarDayPicker
          mode="single"
          activeMonth={activeMonth}
          activeYear={activeYear}
          onClickLeftArrow={decreaseMonth}
          onClickRightArrow={increaseMonth}
          onClickHeader={() => setView(CalendarType.Month)}
          onSelectDate={handleSingleDateClick}
          selectedDate={selectedDate}
          disableDate={disableDate}
          renderDayCell={renderDayCell}
        />
      );
    }

    if (view === CalendarType.Month) {
      return (
        <CalendarMonthPicker
          activeMonth={activeMonth}
          activeYear={activeYear}
          onClickHeader={() => setView(CalendarType.Year)}
          onClickLeftArrow={decreaseYear}
          onClickRightArrow={increaseYear}
          onSelectMonth={onSelectMonth}
        />
      );
    }

    return (
      <CalendarYearPicker activeYear={activeYear} onSelectYear={onSelectYear} />
    );
  };

  return (
    <View className={twMerge('GeckoUICalendar', className)} style={style}>
      {renderContent()}
    </View>
  );
};

Calendar.displayName = 'Calendar';
