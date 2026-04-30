import { Checkbox } from '@geckoui/nativewind';
import type React from 'react';
import { Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { RHFController } from '../RHFController';
import type { RHFCheckboxProps } from './RHFCheckbox.types';

const isEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
};

export const RHFCheckbox = ({
  control,
  name,
  rules,
  className,
  value,
  uncheckedValue,
  single,
  partial,
  disabled,
  label,
  labelClassName,
  onChange,
  onBlur,
  ...rest
}: RHFCheckboxProps): React.ReactElement => (
  <RHFController
    control={control}
    name={name}
    rules={rules}
    render={(renderProps) => {
      const { field, fieldState } = renderProps;

      const isChecked = (): boolean => {
        if (value === undefined) return Boolean(field.value);
        if (single) return isEqual(field.value, value);
        if (!Array.isArray(field.value)) return false;
        return field.value.some((e: unknown) => isEqual(e, value));
      };

      const checked = isChecked();
      const partialValue =
        typeof partial === 'function' ? partial(renderProps) : partial;
      const checkedState: boolean | 'indeterminate' = partialValue
        ? 'indeterminate'
        : checked;

      const handleChange = () => {
        let next: unknown;

        if (value === undefined) {
          next = !checked;
        } else if (single) {
          next = isEqual(field.value, value) ? (uncheckedValue ?? null) : value;
        } else {
          let arr: unknown[] = Array.isArray(field.value)
            ? [...field.value]
            : [];
          if (checked) {
            arr = arr.filter((e) => !isEqual(e, value));
          } else {
            arr.push(value);
          }
          next = arr;
        }

        field.onChange(next);
        onChange?.(next);
      };

      const checkboxNode = (
        <Checkbox
          {...rest}
          checked={checkedState}
          disabled={disabled}
          onChange={handleChange}
          onBlur={(e) => {
            field.onBlur();
            onBlur?.(e);
          }}
          className={twMerge(
            'GeckoUIRHFCheckbox',
            fieldState.error && 'GeckoUIRHFCheckbox--error',
            className,
          )}
        />
      );

      if (label === undefined) return checkboxNode;

      return (
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{
            checked: checkedState === 'indeterminate' ? 'mixed' : checkedState,
            disabled: !!disabled,
          }}
          disabled={disabled}
          onPress={handleChange}
          className={twMerge(
            'GeckoUIRHFCheckbox__row flex-row items-center gap-2',
          )}
        >
          <View pointerEvents="none">{checkboxNode}</View>
          <Text
            className={twMerge('GeckoUIRHFCheckbox__label', labelClassName)}
          >
            {label}
          </Text>
        </Pressable>
      );
    }}
  />
);

RHFCheckbox.displayName = 'RHFCheckbox';
