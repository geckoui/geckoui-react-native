import type React from 'react';
import { Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { CalendarHeaderProps } from './CalendarHeader.types';

export const CalendarHeader = ({
  onClickLeftArrow,
  onClickRightArrow,
  header,
  onClickHeader,
}: CalendarHeaderProps): React.ReactElement => (
  <View className="GeckoUICalendar__header">
    <Pressable
      className="GeckoUICalendar__header__arrow-button"
      onPress={onClickLeftArrow}
    >
      <Text className="GeckoUICalendar__header__arrow-icon">‹</Text>
    </Pressable>
    <Pressable
      className={twMerge(
        'GeckoUICalendar__header__title',
        onClickHeader ? 'GeckoUICalendar__header__title--clickable' : undefined,
      )}
      onPress={onClickHeader}
    >
      <Text className="GeckoUICalendar__header__title-text">{header}</Text>
    </Pressable>
    <Pressable
      className="GeckoUICalendar__header__arrow-button"
      onPress={onClickRightArrow}
    >
      <Text className="GeckoUICalendar__header__arrow-icon">›</Text>
    </Pressable>
  </View>
);

CalendarHeader.displayName = 'CalendarHeader';
