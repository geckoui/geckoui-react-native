import type React from 'react';
import { Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import {
  generateCalendarDates,
  generateMonthNames,
  getTodayDate,
  isDateInRange,
  shouldSwapDates,
} from '../Calendar.utils';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import type { CalendarDayPickerProps } from './CalendarDayPicker.types';

export const CalendarDayPicker = (
  props: CalendarDayPickerProps,
): React.ReactElement => {
  const {
    activeMonth,
    activeYear,
    mode = 'single',
    disableDate,
    renderDayCell,
    onClickLeftArrow,
    onClickRightArrow,
    onClickHeader,
  } = props;

  const today = getTodayDate();
  const { months } = generateMonthNames();
  const dates = generateCalendarDates(activeMonth, activeYear);
  const isRangeMode = mode === 'range';

  const handleDateClick = (date: string) => {
    if (isRangeMode) {
      (props as { onSelectRange?: (date: string) => void }).onSelectRange?.(
        date,
      );
    } else {
      (props as { onSelectDate?: (date: string) => void }).onSelectDate?.(date);
    }
  };

  const weeks: (typeof dates)[number][][] = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  return (
    <>
      <CalendarHeader
        header={`${months[activeMonth]} ${activeYear}`}
        onClickLeftArrow={onClickLeftArrow}
        onClickRightArrow={onClickRightArrow}
        onClickHeader={onClickHeader}
      />
      <View className="GeckoUICalendar__day-picker-weekdays">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <Text key={i} className="GeckoUICalendar__day-picker-weekday">
            {d}
          </Text>
        ))}
      </View>
      <View className="GeckoUICalendar__day-picker">
        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} className="GeckoUICalendar__day-picker-row">
            {week.map((date, dayIndex) => {
              const isActiveMonth = activeMonth === date.month;

              if (isRangeMode && !isActiveMonth) {
                return (
                  <View
                    key={dayIndex}
                    className="GeckoUICalendar__day-picker__button"
                  />
                );
              }

              const formattedDate = `${date.year}-${String(date.month + 1).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
              const isToday = formattedDate === today;
              const isSelected =
                !isRangeMode &&
                formattedDate ===
                  (props as { selectedDate?: string | null }).selectedDate;

              let isRangeStart = false;
              let isRangeEnd = false;
              let isInRange = false;

              if (isRangeMode && isActiveMonth) {
                const selectedRange = (
                  props as {
                    selectedRange?: { from: string | null; to?: string | null };
                  }
                ).selectedRange;
                if (selectedRange) {
                  const needsSwap = shouldSwapDates(
                    selectedRange.from,
                    selectedRange.to,
                  );
                  const normalizedFrom = needsSwap
                    ? selectedRange.to
                    : selectedRange.from;
                  const normalizedTo = needsSwap
                    ? selectedRange.from
                    : selectedRange.to;
                  isRangeStart = formattedDate === normalizedFrom;
                  isRangeEnd = normalizedTo
                    ? formattedDate === normalizedTo
                    : false;
                  if (normalizedFrom && normalizedTo) {
                    isInRange = isDateInRange(formattedDate, {
                      from: normalizedFrom,
                      to: normalizedTo,
                    });
                  }
                }
              }

              const isDisable = disableDate?.(formattedDate);
              const isHighlighted =
                isSelected || isRangeStart || isRangeEnd || isInRange;

              return (
                <Pressable
                  key={dayIndex}
                  disabled={!!isDisable}
                  onPress={() => handleDateClick(formattedDate)}
                  className={twMerge(
                    'GeckoUICalendar__day-picker__button',
                    isSelected &&
                      'GeckoUICalendar__day-picker__button--selected',
                    isRangeStart &&
                      'GeckoUICalendar__day-picker__button--range-start',
                    isRangeEnd &&
                      'GeckoUICalendar__day-picker__button--range-end',
                    isInRange &&
                      'GeckoUICalendar__day-picker__button--in-range',
                    !isActiveMonth && 'opacity-40',
                    isDisable && 'opacity-30',
                  )}
                >
                  {renderDayCell ? (
                    renderDayCell({
                      ...date,
                      date: formattedDate,
                      isDisabled: !!isDisable,
                      isSelected: isHighlighted,
                      isFocusedMonth: isActiveMonth,
                    })
                  ) : (
                    <Text
                      className={twMerge(
                        'GeckoUICalendar__day-picker__button-text',
                        isToday && 'text-primary-600',
                        isHighlighted && 'text-text-on-primary',
                      )}
                    >
                      {date.day}
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </>
  );
};

CalendarDayPicker.displayName = 'CalendarDayPicker';
