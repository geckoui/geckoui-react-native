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
  <View className="GeckoCalendar__header">
    <Pressable
      className="GeckoCalendar__header__arrow-button"
      onPress={onClickLeftArrow}
    >
      <Text className="GeckoCalendar__header__arrow-icon">‹</Text>
    </Pressable>
    <Pressable
      className={twMerge(
        'GeckoCalendar__header__title',
        onClickHeader ? 'GeckoCalendar__header__title--clickable' : undefined,
      )}
      onPress={onClickHeader}
    >
      <Text className="GeckoCalendar__header__title-text">{header}</Text>
    </Pressable>
    <Pressable
      className="GeckoCalendar__header__arrow-button"
      onPress={onClickRightArrow}
    >
      <Text className="GeckoCalendar__header__arrow-icon">›</Text>
    </Pressable>
  </View>
);

CalendarHeader.displayName = 'CalendarHeader';
