import type { RadioProps } from '@geckoui/nativewind';

import type { RHFBaseProps } from '../RHF.types';

export interface RHFRadioProps
  extends RHFBaseProps,
    Omit<RadioProps, 'name' | 'value' | 'onChange' | 'checked'> {
  /**
   * Value written to the form data when this radio is selected.
   * Preserves the original data type (objects, arrays, booleans, etc.).
   */
  value?: unknown;

  /**
   * Called with the new form value whenever it changes.
   */
  onChange?: (value: unknown) => void;

  /** Display text rendered next to the radio. */
  label?: string;

  /** NativeWind class applied to the Text label rendered next to the radio. */
  labelClassName?: string;
}
