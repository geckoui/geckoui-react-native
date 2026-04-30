import type React from 'react';
import type { ControllerProps } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

/**
 * Wrapper around RHF's `Controller` that auto-injects `control` from
 * `useFormContext()`. Pass `control` explicitly only when you have nested
 * `FormProvider`s and need to bind to a specific form instance.
 */
export const RHFController = ({
  control: customControl,
  ...rest
}: ControllerProps): React.ReactElement => {
  const formContext = useFormContext();
  const control = formContext?.control;

  if (!formContext && !customControl) {
    throw new Error(
      'RHFController must be wrapped in a FormProvider, or be given a control prop.',
    );
  }

  return <Controller control={customControl ?? control} {...rest} />;
};

RHFController.displayName = 'RHFController';
