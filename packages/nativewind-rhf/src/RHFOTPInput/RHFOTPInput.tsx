import { OTPInput } from '@geckoui/nativewind';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

import { RHFController } from '../RHFController';
import type { RHFOTPInputProps } from './RHFOTPInput.types';

/**
 * `OTPInput` wired to React Hook Form. Reflects validation errors via
 * `GeckoUIRHFOTPInput--error` class hooks so consumers can style error states
 * from `global.css`.
 */
export const RHFOTPInput = ({
  control,
  name,
  rules,
  className,
  disabled,
  onChange,
  onBlur,
  onOTPComplete,
  ...rest
}: RHFOTPInputProps): React.ReactElement => (
  <RHFController
    control={control}
    name={name}
    rules={rules}
    render={({ field, fieldState }) => {
      const value = (field.value ?? '') as string;

      return (
        <OTPInput
          {...rest}
          disabled={disabled}
          className={twMerge(
            'GeckoUIRHFOTPInput',
            fieldState.error && 'GeckoUIRHFOTPInput--error',
            className,
          )}
          error={!disabled && !!fieldState.error}
          value={value}
          onChange={(next) => {
            field.onChange(next);
            onChange?.(next);
          }}
          onBlur={() => {
            field.onBlur();
            onBlur?.(value);
          }}
          onOTPComplete={onOTPComplete}
        />
      );
    }}
  />
);

RHFOTPInput.displayName = 'RHFOTPInput';
