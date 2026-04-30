import { Textarea } from '@geckoui/nativewind';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

import { RHFController } from '../RHFController';
import type { RHFTextareaProps } from './RHFTextarea.types';

/**
 * `Textarea` wired to React Hook Form. Reflects validation errors via
 * `GeckoUIRHFTextarea--error` class hooks so consumers can style error states
 * from `global.css`.
 */
export const RHFTextarea = ({
  control,
  name,
  rules,
  className,
  transform,
  onChange,
  onBlur,
  ...rest
}: RHFTextareaProps): React.ReactElement => (
  <RHFController
    control={control}
    name={name}
    rules={rules}
    render={({ field, fieldState }) => {
      const raw = (field.value ?? '') as string;
      const display = transform?.input ? transform.input(raw) : raw;
      const disabled = (rest as { disabled?: boolean }).disabled;

      return (
        <Textarea
          {...rest}
          className={twMerge(
            'GeckoUIRHFTextarea',
            !disabled && fieldState.error && 'GeckoUIRHFTextarea--error',
            className,
          )}
          value={display}
          onChangeText={(text) => {
            const next = transform?.output ? transform.output(text) : text;
            field.onChange(next);
            onChange?.(next);
          }}
          onBlur={() => {
            field.onBlur();
            onBlur?.(raw);
          }}
        />
      );
    }}
  />
);

RHFTextarea.displayName = 'RHFTextarea';
