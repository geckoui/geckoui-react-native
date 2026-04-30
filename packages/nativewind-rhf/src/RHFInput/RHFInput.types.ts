import type { ReactNode } from 'react';

import type { InputProps } from '@geckoui/nativewind';

import type { RHFBaseProps, RHFRenderArgs } from '../RHF.types';

interface InputTransformer {
  input?: (value: string) => string;
  output?: (value: string) => string;
}

export interface RHFInputProps
  extends RHFBaseProps,
    Omit<
      InputProps,
      | 'name'
      | 'value'
      | 'onChange'
      | 'onChangeText'
      | 'onBlur'
      | 'prefix'
      | 'suffix'
    > {
  /**
   * Transform input/output values between the form state and the displayed input.
   *
   * - `input(value)`: form state → displayed value
   * - `output(value)`: typed value → form state
   *
   * See https://react-hook-form.com/advanced-usage#TransformandParse
   */
  transform?: InputTransformer;

  /**
   * Rendered before the input. Pass a node, or a function that receives the
   * RHF render args and returns a node (useful for showing dynamic content
   * based on field state).
   */
  // biome-ignore lint/suspicious/noExplicitAny: matches RHF's generic-erased renderProps shape
  prefix?: ReactNode | string | ((args: RHFRenderArgs<any>) => ReactNode);

  /** Rendered after the input. Same shape as `prefix`. */
  // biome-ignore lint/suspicious/noExplicitAny: matches RHF's generic-erased renderProps shape
  suffix?: ReactNode | string | ((args: RHFRenderArgs<any>) => ReactNode);

  /** Called with the (post-transform) value whenever it changes. */
  onChange?: (value: string) => void;

  /** Called with the current value when the input loses focus. */
  onBlur?: (value: string) => void;
}
