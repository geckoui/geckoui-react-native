import { DateInput } from '@geckoui/nativewind';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

import { RHFController } from '../RHFController';
import type { RHFDateInputProps } from './RHFDateInput.types';

export const RHFDateInput = ({
  control,
  name,
  rules,
  className,
  onChange,
  ...rest
}: RHFDateInputProps): React.ReactElement => (
  <RHFController
    control={control}
    name={name}
    rules={rules}
    render={({ field, fieldState }) => (
      <DateInput
        {...rest}
        className={twMerge(
          'GeckoUIRHFDateInput',
          fieldState.error && 'GeckoUIRHFDateInput--error',
          className,
        )}
        value={field.value ?? null}
        onChange={(date) => {
          field.onChange(date);
          onChange?.(date);
        }}
      />
    )}
  />
);

RHFDateInput.displayName = 'RHFDateInput';
