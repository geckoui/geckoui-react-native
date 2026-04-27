import type React from 'react';
import { Pressable, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { RadioProps } from './Radio.types';

export const Radio = ({
  checked = false,
  onChange,
  disabled,
  className,
  style,
  ...rest
}: RadioProps): React.ReactElement => (
  <Pressable
    accessibilityRole="radio"
    accessibilityState={{ checked, disabled: !!disabled }}
    disabled={disabled}
    onPress={() => onChange?.(!checked)}
    className={twMerge(
      'GeckoUIRadio',
      checked && 'GeckoUIRadio--checked',
      disabled && 'GeckoUIRadio--disabled',
      className,
    )}
    style={style}
    {...rest}
  >
    {checked ? <View className="GeckoUIRadio__dot" /> : null}
  </Pressable>
);

Radio.displayName = 'Radio';
