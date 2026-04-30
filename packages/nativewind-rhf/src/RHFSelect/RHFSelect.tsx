import { Select } from '@geckoui/nativewind';
import type { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

import { RHFController } from '../RHFController';
import type { RHFSelectOverload, RHFSelectProps } from './RHFSelect.types';

// biome-ignore lint/suspicious/noExplicitAny: relax the overloaded Select to a single callable for the wrapper
const SelectAny = Select as (props: any) => ReactElement;

/**
 * `Select` wired to React Hook Form. Reflects validation errors via
 * `GeckoUIRHFSelect--error` class hook on the wrapper.
 *
 * Supports both single (`value: T`) and multiple (`multiple`, `value: T[]`)
 * selection modes, mirroring the base `Select` component.
 */
const RHFSelect: RHFSelectOverload = <T,>({
  name,
  control,
  rules,
  wrapperClassName,
  buttonClassName,
  ...rest
}: RHFSelectProps<T>) => {
  return (
    <RHFController
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <SelectAny
            {...rest}
            wrapperClassName={twMerge(
              'GeckoUIRHFSelect',
              error && 'GeckoUIRHFSelect--error',
              wrapperClassName,
            )}
            buttonClassName={twMerge(
              error && 'GeckoUIRHFSelect__button--error',
              buttonClassName,
            )}
            value={value}
            onChange={(v: unknown) => {
              onChange(v);
              rest.onChange?.(v as T & T[]);
            }}
          />
        );
      }}
    />
  );
};

RHFSelect.displayName = 'RHFSelect';

export { RHFSelect };
