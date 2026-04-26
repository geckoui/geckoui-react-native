import type React from 'react';
import { cva } from 'class-variance-authority';
import { remapProps } from 'nativewind';
import { Pressable, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { SwitchProps } from './Switch.types';

const trackCva = cva('GeckoSwitch', {
  variants: {
    size: {
      sm: 'GeckoSwitch--sm',
      md: 'GeckoSwitch--md',
    },
    on: {
      true: 'GeckoSwitch--on',
      false: '',
    },
    disabled: {
      true: 'GeckoSwitch--disabled',
      false: '',
    },
  },
  defaultVariants: { size: 'md', on: false, disabled: false },
});

const thumbCva = cva('GeckoSwitch__thumb', {
  variants: {
    size: {
      sm: 'GeckoSwitch__thumb--sm',
      md: 'GeckoSwitch__thumb--md',
    },
    on: {
      true: 'GeckoSwitch__thumb--on',
      false: '',
    },
  },
  defaultVariants: { size: 'md', on: false },
});

const SwitchImpl = ({
  value = false,
  onChange,
  size = 'md',
  disabled,
  className,
  thumbClassName: _thumbClassName,
  style,
  thumbStyle,
  ...rest
}: SwitchProps): React.ReactElement => (
  <Pressable
    accessibilityRole="switch"
    accessibilityState={{ checked: value, disabled: !!disabled }}
    disabled={disabled}
    onPress={() => onChange?.(!value)}
    className={twMerge(
      trackCva({ size, on: value, disabled: !!disabled }),
      className,
    )}
    style={style}
    {...rest}
  >
    <View className={thumbCva({ size, on: value })} style={thumbStyle} />
  </Pressable>
);

export const Switch = remapProps(SwitchImpl, {
  thumbClassName: 'thumbStyle',
});

Switch.displayName = 'Switch';
