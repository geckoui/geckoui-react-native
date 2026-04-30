import type { DateInputProps } from '@geckoui/nativewind';

import type { RHFBaseProps } from '../RHF.types';

export interface RHFDateInputProps
  extends RHFBaseProps,
    Omit<DateInputProps, 'value' | 'onChange'> {
  /** Called with the selected date (or `null` when cleared) alongside RHF's field update. */
  onChange?: (date: string | null) => void;
}
