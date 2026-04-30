import { InputError } from '@geckoui/nativewind';
import type React from 'react';
import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

import { RHFController } from '../RHFController';
import type { RHFErrorProps } from './RHFError.types';

/**
 * Renders the validation error message for an RHF field. Uses `InputError`
 * by default, or a custom `render` function for full control.
 */
export const RHFError = ({
  name,
  control,
  className,
  render,
}: RHFErrorProps): React.ReactElement => (
  <RHFController
    control={control}
    name={name}
    render={({ fieldState }) => {
      if (!fieldState.error?.message) return <Fragment key="rhf-error-empty" />;
      if (typeof render === 'function')
        return <Fragment key="rhf-error">{render(fieldState)}</Fragment>;
      if (render !== undefined)
        return <Fragment key="rhf-error">{render}</Fragment>;
      return (
        <InputError className={twMerge('GeckoUIRHFError', className)}>
          {fieldState.error.message}
        </InputError>
      );
    }}
  />
);

RHFError.displayName = 'RHFError';
