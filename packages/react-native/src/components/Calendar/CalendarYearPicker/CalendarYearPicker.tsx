import type React from 'react';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import type { CalendarYearPickerProps } from './CalendarYearPicker.types';

export const CalendarYearPicker = ({
  activeYear,
  onSelectYear,
  onClickHeader,
}: CalendarYearPickerProps): React.ReactElement => {
  let start = parseInt((activeYear / 10).toFixed(0)) * 10;
  if (activeYear + 1 === start) start -= 10;

  const [years, setYears] = useState(() =>
    Array.from({ length: 12 }).map((_, i) => start - 1 + i),
  );

  const handleLeft = () => setYears((prev) => prev.map((y) => y - 10));
  const handleRight = () => setYears((prev) => prev.map((y) => y + 10));

  return (
    <>
      <CalendarHeader
        header={`${years[1]} - ${years[1] + 9}`}
        onClickLeftArrow={handleLeft}
        onClickRightArrow={handleRight}
        onClickHeader={onClickHeader}
      />
      <View className="GeckoUICalendar__year-picker">
        {[0, 1, 2].map((rowIndex) => (
          <View key={rowIndex} className="GeckoUICalendar__year-picker-row">
            {years
              .slice(rowIndex * 4, rowIndex * 4 + 4)
              .map((year, colIndex) => {
                const i = rowIndex * 4 + colIndex;
                return (
                  <Pressable
                    key={year}
                    onPress={() => onSelectYear?.(year)}
                    className={twMerge(
                      'GeckoUICalendar__year-picker__button',
                      activeYear === year &&
                        'GeckoUICalendar__year-picker__button--selected',
                      (i === 0 || i === 11) &&
                        'GeckoUICalendar__year-picker__button--prev-next',
                    )}
                  >
                    <Text className="GeckoUICalendar__year-picker__button-text">
                      {year}
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

CalendarYearPicker.displayName = 'CalendarYearPicker';
