import { Input } from '@geckoui/nativewind';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

import type { RHFRenderArgs } from '../RHF.types';
import { RHFController } from '../RHFController';
import type { RHFInputProps } from './RHFInput.types';

const renderSlot = (
  slot: RHFInputProps['prefix'],
  // biome-ignore lint/suspicious/noExplicitAny: slot fn receives generic-erased render args
  args: RHFRenderArgs<any>,
): React.ReactNode => {
  if (typeof slot === 'function') return slot(args);
  return slot ?? null;
};

/**
 * `Input` wired to React Hook Form. Reflects validation errors via
 * `data-error`-style class hooks (`GeckoUIRHFInput`) so consumers can style
 * error states from `global.css`.
 */
export const RHFInput = ({
  control,
  name,
  rules,
  className,
  prefix,
  suffix,
  transform,
  onChange,
  onBlur,
  ...rest
}: RHFInputProps): React.ReactElement => (
  <RHFController
    control={control}
    name={name}
    rules={rules}
    render={(renderArgs) => {
      const { field, fieldState } = renderArgs;
      const raw = (field.value ?? '') as string;
      const display = transform?.input ? transform.input(raw) : raw;

      return (
        <Input
          {...rest}
          className={twMerge(
            'GeckoUIRHFInput',
            fieldState.error && 'GeckoUIRHFInput--error',
            className,
          )}
          value={display}
          prefix={renderSlot(prefix, renderArgs)}
          suffix={renderSlot(suffix, renderArgs)}
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

RHFInput.displayName = 'RHFInput';
