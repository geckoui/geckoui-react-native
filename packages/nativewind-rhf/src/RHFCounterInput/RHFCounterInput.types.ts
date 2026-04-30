import type { CounterInputProps } from '@geckoui/nativewind';

import type { RHFBaseProps } from '../RHF.types';

export interface RHFCounterInputProps
  extends RHFBaseProps,
    Omit<CounterInputProps, 'value' | 'onChange'> {
  /** Called with the current numeric value whenever it changes. */
  onChange?: (value: number) => void;
}
