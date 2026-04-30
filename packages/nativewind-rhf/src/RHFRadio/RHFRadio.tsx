import { Radio } from '@geckoui/nativewind';
import type React from 'react';
import { Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { RHFController } from '../RHFController';
import type { RHFRadioProps } from './RHFRadio.types';

const isEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
};

export const RHFRadio = ({
  control,
  name,
  rules,
  className,
  disabled,
  value,
  label,
  labelClassName,
  onChange,
  onBlur,
  ...rest
}: RHFRadioProps): React.ReactElement => {
  if (value === undefined || value === null) {
    throw new Error('RHFRadio: value cannot be undefined or null');
  }

  return (
    <RHFController
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => {
        const checked = isEqual(field.value, value);

        const handleChange = () => {
          field.onChange(value);
          onChange?.(value);
        };

        const radioNode = (
          <Radio
            {...rest}
            checked={checked}
            disabled={disabled}
            onChange={handleChange}
            onBlur={(e) => {
              field.onBlur();
              onBlur?.(e);
            }}
            className={twMerge(
              'GeckoUIRHFRadio',
              fieldState.error && 'GeckoUIRHFRadio--error',
              className,
            )}
          />
        );

        if (label === undefined) return radioNode;

        return (
          <Pressable
            accessibilityRole="radio"
            accessibilityState={{ checked, disabled: !!disabled }}
            disabled={disabled}
            onPress={handleChange}
            className={twMerge(
              'GeckoUIRHFRadio__row flex-row items-center gap-2',
            )}
          >
            <View pointerEvents="none">{radioNode}</View>
            <Text className={twMerge('GeckoUIRHFRadio__label', labelClassName)}>
              {label}
            </Text>
          </Pressable>
        );
      }}
    />
  );
};

RHFRadio.displayName = 'RHFRadio';
