import type { SwitchProps } from '@geckoui/nativewind';

import type { RHFBaseProps } from '../RHF.types';

export interface RHFSwitchProps
  extends RHFBaseProps,
    Omit<SwitchProps, 'name' | 'value' | 'onChange'> {
  /**
   * Value written to the form data when the switch is on.
   * If omitted the field toggles between `true` and `false`.
   */
  value?: unknown;

  /**
   * Value written to the form data when the switch is off.
   * Only used when `value` is provided.
   */
  uncheckedValue?: unknown;

  /**
   * Called with the new form value whenever it changes.
   */
  onChange?: (value: unknown) => void;
}
