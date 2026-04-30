import { CounterInput } from '@geckoui/nativewind';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

import { RHFController } from '../RHFController';
import type { RHFCounterInputProps } from './RHFCounterInput.types';

/**
 * `CounterInput` wired to React Hook Form. Reflects validation errors via
 * `GeckoUIRHFCounterInput--error` class hooks so consumers can style error
 * states from `global.css`.
 */
export const RHFCounterInput = ({
  control,
  name,
  rules,
  className,
  onChange,
  ...rest
}: RHFCounterInputProps): React.ReactElement => (
  <RHFController
    control={control}
    name={name}
    rules={rules}
    render={({ field, fieldState }) => {
      const value = (field.value ?? 0) as number;

      return (
        <CounterInput
          {...rest}
          className={twMerge(
            'GeckoUIRHFCounterInput',
            fieldState.error && 'GeckoUIRHFCounterInput--error',
            className,
          )}
          buttonClassName={twMerge(
            fieldState.error && 'GeckoUIRHFCounterInput__button--error',
            rest.buttonClassName,
          )}
          inputClassName={twMerge(
            fieldState.error && 'GeckoUIRHFCounterInput__input--error',
            rest.inputClassName,
          )}
          value={value}
          onChange={(next) => {
            field.onChange(next);
            onChange?.(next);
          }}
        />
      );
    }}
  />
);

RHFCounterInput.displayName = 'RHFCounterInput';
