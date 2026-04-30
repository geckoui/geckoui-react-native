import type { DateRange, DateRangeInputProps } from '@geckoui/nativewind';

import type { RHFBaseProps } from '../RHF.types';

export interface RHFDateRangeInputProps
  extends RHFBaseProps,
    Omit<DateRangeInputProps, 'value' | 'onChange'> {
  /** Called with the selected range (or `null` when cleared) alongside RHF's field update. */
  onChange?: (range: DateRange | null) => void;
}
