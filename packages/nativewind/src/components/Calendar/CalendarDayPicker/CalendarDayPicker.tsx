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

const formatDate = (year: number, month: number, day: number) =>
  `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

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

  const selectedRange = (
    props as {
      selectedRange?: { from: string | null; to?: string | null };
    }
  ).selectedRange;

  const normalizedRange = (() => {
    if (!isRangeMode || !selectedRange) return null;
    const needsSwap = shouldSwapDates(selectedRange.from, selectedRange.to);
    return {
      from: needsSwap ? (selectedRange.to ?? null) : selectedRange.from,
      to: needsSwap ? selectedRange.from : (selectedRange.to ?? null),
    };
  })();

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
        {weeks.map((week, weekIndex) => {
          let firstRangeIdx = -1;
          let lastRangeIdx = -1;
          let rangeStartInRow = false;
          let rangeEndInRow = false;

          if (normalizedRange?.from && normalizedRange.to) {
            week.forEach((date, idx) => {
              const formatted = formatDate(date.year, date.month, date.day);
              if (
                !isDateInRange(formatted, {
                  from: normalizedRange.from,
                  to: normalizedRange.to,
                })
              )
                return;
              if (firstRangeIdx === -1) firstRangeIdx = idx;
              lastRangeIdx = idx;
              if (formatted === normalizedRange.from) rangeStartInRow = true;
              if (formatted === normalizedRange.to) rangeEndInRow = true;
            });
          }

          const hasRange = firstRangeIdx >= 0;
          const cornerRadius = 6; // matches rounded-md

          return (
            <View key={weekIndex} className="GeckoUICalendar__day-picker-row">
              {hasRange && (
                <View
                  className="GeckoUICalendar__day-picker__range-underlay"
                  style={{
                    left: `${(firstRangeIdx * 100) / 7}%`,
                    width: `${((lastRangeIdx - firstRangeIdx + 1) * 100) / 7}%`,
                    borderTopLeftRadius: rangeStartInRow ? cornerRadius : 0,
                    borderBottomLeftRadius: rangeStartInRow ? cornerRadius : 0,
                    borderTopRightRadius: rangeEndInRow ? cornerRadius : 0,
                    borderBottomRightRadius: rangeEndInRow ? cornerRadius : 0,
                  }}
                />
              )}
              {week.map((date, dayIndex) => {
                const isActiveMonth = activeMonth === date.month;

                const formattedDate = formatDate(
                  date.year,
                  date.month,
                  date.day,
                );
                const isToday = formattedDate === today;
                const isSelected =
                  !isRangeMode &&
                  formattedDate ===
                    (props as { selectedDate?: string | null }).selectedDate;

                let isRangeStart = false;
                let isRangeEnd = false;
                let isInRange = false;
                let isPartialRange = false;

                if (isRangeMode && normalizedRange?.from) {
                  if (normalizedRange.to) {
                    isRangeStart = formattedDate === normalizedRange.from;
                    isRangeEnd = formattedDate === normalizedRange.to;
                    isInRange = isDateInRange(formattedDate, {
                      from: normalizedRange.from,
                      to: normalizedRange.to,
                    });
                  } else {
                    isPartialRange = formattedDate === normalizedRange.from;
                  }
                }

                const isDisable = disableDate?.(formattedDate);
                const isHighlighted =
                  isSelected ||
                  isRangeStart ||
                  isRangeEnd ||
                  isInRange ||
                  isPartialRange;

                return (
                  <Pressable
                    key={dayIndex}
                    disabled={!!isDisable}
                    onPress={() => handleDateClick(formattedDate)}
                    className={twMerge(
                      'GeckoUICalendar__day-picker__button',
                      isSelected &&
                        'GeckoUICalendar__day-picker__button--selected',
                      isPartialRange &&
                        'GeckoUICalendar__day-picker__button--partial-range',
                      !isActiveMonth &&
                        'GeckoUICalendar__day-picker__button--prev-next',
                      isDisable &&
                        'GeckoUICalendar__day-picker__button--disabled',
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
                          isToday &&
                            'GeckoUICalendar__day-picker__button-text--today',
                          (isSelected ||
                            isRangeStart ||
                            isRangeEnd ||
                            isInRange) &&
                            'GeckoUICalendar__day-picker__button-text--selected',
                          isPartialRange &&
                            'GeckoUICalendar__day-picker__button-text--partial-range',
                        )}
                      >
                        {date.day}
                      </Text>
                    )}
                  </Pressable>
                );
              })}
            </View>
          );
        })}
      </View>
    </>
  );
};

CalendarDayPicker.displayName = 'CalendarDayPicker';
