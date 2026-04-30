import type { TextareaProps } from '@geckoui/nativewind';

import type { RHFBaseProps } from '../RHF.types';

interface TextareaTransformer {
  input?: (value: string) => string;
  output?: (value: string) => string;
}

export interface RHFTextareaProps
  extends RHFBaseProps,
    Omit<TextareaProps, 'value' | 'onChange' | 'onChangeText' | 'onBlur'> {
  /**
   * Transform input/output values between the form state and the displayed textarea.
   *
   * - `input(value)`: form state → displayed value
   * - `output(value)`: typed value → form state
   *
   * See https://react-hook-form.com/advanced-usage#TransformandParse
   */
  transform?: TextareaTransformer;

  /** Called with the (post-transform) value whenever it changes. */
  onChange?: (value: string) => void;

  /** Called with the current value when the textarea loses focus. */
  onBlur?: (value: string) => void;
}
