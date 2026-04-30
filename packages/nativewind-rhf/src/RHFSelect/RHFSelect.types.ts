import type { ReactElement } from 'react';

import type { MultiSelectProps, SingleSelectProps } from '@geckoui/nativewind';

import type { RHFBaseProps } from '../RHF.types';

interface RHFSingleSelectProps<T>
  extends Omit<SingleSelectProps<T>, 'value' | 'onChange'>,
    RHFBaseProps {
  /** Called with the selected value whenever it changes. */
  onChange?: (value: T) => void;
}

interface RHFMultiSelectProps<T>
  extends Omit<MultiSelectProps<T>, 'value' | 'onChange'>,
    RHFBaseProps {
  /** Called with the selected values whenever they change. */
  onChange?: (value: T[]) => void;
}

export type RHFSelectProps<T> =
  | RHFSingleSelectProps<T>
  | RHFMultiSelectProps<T>;

export interface RHFSelectOverload {
  displayName: string;
  <T>(props: RHFSingleSelectProps<T>): ReactElement;
  <T>(props: RHFMultiSelectProps<T>): ReactElement;
}
