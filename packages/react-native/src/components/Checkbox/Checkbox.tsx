import type React from 'react';
import { Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { CheckboxProps } from './Checkbox.types';

export const Checkbox = ({
  checked = false,
  onChange,
  disabled,
  className,
  style,
  ...rest
}: CheckboxProps): React.ReactElement => {
  const indeterminate = checked === 'indeterminate';
  const active = checked === true || indeterminate;

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{
        checked: indeterminate ? 'mixed' : checked,
        disabled: !!disabled,
      }}
      disabled={disabled}
      onPress={() => onChange?.(checked !== true)}
      className={twMerge(
        'GeckoCheckbox',
        active && 'GeckoCheckbox--checked',
        disabled && 'GeckoCheckbox--disabled',
        className,
      )}
      style={style}
      {...rest}
    >
      {indeterminate ? (
        <View className="GeckoCheckbox__dash" />
      ) : checked ? (
        <Text className="GeckoCheckbox__check">✓</Text>
      ) : null}
    </Pressable>
  );
};

Checkbox.displayName = 'Checkbox';
