import type { CheckboxProps } from '@geckoui/nativewind';

import type { RHFBaseProps, RHFRenderArgs } from '../RHF.types';

export interface RHFCheckboxProps
  extends RHFBaseProps,
    Omit<CheckboxProps, 'name' | 'value' | 'onChange' | 'checked'> {
  /**
   * Value written to the form data when the checkbox is toggled.
   * In multi mode (default) this is added to / removed from an array.
   * In `single` mode this is the value stored when checked.
   * If `value` is omitted the field toggles between `true` and `false`.
   */
  value?: unknown;

  /**
   * When true the checkbox behaves as a single-select binding (like a radio).
   * The form field stores `value` when checked and `uncheckedValue` (or null) when unchecked.
   * When false (default) the form field stores an array of selected values.
   */
  single?: boolean;

  /**
   * Value written to the form data when the checkbox is unchecked.
   * Only used when `single` is true.
   */
  uncheckedValue?: unknown;

  /**
   * Called with the new form value whenever it changes.
   */
  onChange?: (value: unknown) => void;

  /**
   * Marks the checkbox as partially checked (renders the indeterminate dash).
   * Pass a boolean or a function that receives the RHF render args and returns a boolean.
   */
  // biome-ignore lint/suspicious/noExplicitAny: matches RHF's generic-erased renderProps shape
  partial?: boolean | ((args: RHFRenderArgs<any>) => boolean);

  /** Display text rendered next to the checkbox. */
  label?: string;

  /** NativeWind class applied to the Text label rendered next to the checkbox. */
  labelClassName?: string;
}
