import { Switch } from '@geckoui/nativewind';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

import { RHFController } from '../RHFController';
import type { RHFSwitchProps } from './RHFSwitch.types';

const isEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
};

export const RHFSwitch = ({
  name,
  control,
  rules,
  disabled,
  value,
  uncheckedValue,
  onChange,
  onBlur,
  className,
  thumbClassName,
  ...rest
}: RHFSwitchProps): React.ReactElement => (
  <RHFController
    control={control}
    name={name}
    rules={rules}
    render={({ field, fieldState }) => {
      const isOn =
        value === undefined
          ? Boolean(field.value)
          : isEqual(field.value, value);

      const handleChange = () => {
        let next: unknown;
        if (value === undefined) {
          next = !isOn;
        } else {
          next = !isOn ? value : uncheckedValue;
        }
        field.onChange(next);
        onChange?.(next);
      };

      return (
        <Switch
          {...rest}
          value={isOn}
          disabled={disabled}
          onChange={handleChange}
          onBlur={(e) => {
            field.onBlur();
            onBlur?.(e);
          }}
          className={twMerge(
            'GeckoUIRHFSwitch',
            fieldState.error && 'GeckoUIRHFSwitch--error',
            className,
          )}
          thumbClassName={twMerge('GeckoUIRHFSwitch__thumb', thumbClassName)}
        />
      );
    }}
  />
);

RHFSwitch.displayName = 'RHFSwitch';
