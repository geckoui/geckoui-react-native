import type React from 'react';
import { Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { generateMonthNames } from '../Calendar.utils';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import type { MonthPickerProps } from './CalendarMonthPicker.types';

export const CalendarMonthPicker = ({
  activeYear,
  activeMonth,
  onSelectMonth,
  onClickLeftArrow,
  onClickRightArrow,
  onClickHeader,
}: MonthPickerProps): React.ReactElement => {
  const { shortMonths } = generateMonthNames();

  return (
    <>
      <CalendarHeader
        header={`${activeYear}`}
        onClickLeftArrow={onClickLeftArrow}
        onClickRightArrow={onClickRightArrow}
        onClickHeader={onClickHeader}
      />
      <View className="GeckoCalendar__month-picker">
        {[0, 1, 2].map((rowIndex) => (
          <View key={rowIndex} className="GeckoCalendar__month-picker-row">
            {shortMonths
              .slice(rowIndex * 4, rowIndex * 4 + 4)
              .map((monthName, colIndex) => {
                const index = rowIndex * 4 + colIndex;
                return (
                  <Pressable
                    key={monthName}
                    onPress={() => onSelectMonth?.(index)}
                    className={twMerge(
                      'GeckoCalendar__month-picker__button',
                      index === activeMonth &&
                        'GeckoCalendar__month-picker__button--selected',
                    )}
                  >
                    <Text className="GeckoCalendar__month-picker__button-text">
                      {monthName}
                    </Text>
                  </Pressable>
                );
              })}
          </View>
        ))}
      </View>
    </>
  );
};

CalendarMonthPicker.displayName = 'CalendarMonthPicker';
