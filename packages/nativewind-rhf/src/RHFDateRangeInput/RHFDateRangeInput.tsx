import { DateRangeInput } from '@geckoui/nativewind';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

import { RHFController } from '../RHFController';
import type { RHFDateRangeInputProps } from './RHFDateRangeInput.types';

export const RHFDateRangeInput = ({
  control,
  name,
  rules,
  className,
  onChange,
  ...rest
}: RHFDateRangeInputProps): React.ReactElement => (
  <RHFController
    control={control}
    name={name}
    rules={rules}
    render={({ field, fieldState }) => (
      <DateRangeInput
        {...rest}
        className={twMerge(
          'GeckoUIRHFDateRangeInput',
          fieldState.error && 'GeckoUIRHFDateRangeInput--error',
          className,
        )}
        value={field.value ?? null}
        onChange={(range) => {
          field.onChange(range);
          onChange?.(range);
        }}
      />
    )}
  />
);

RHFDateRangeInput.displayName = 'RHFDateRangeInput';
