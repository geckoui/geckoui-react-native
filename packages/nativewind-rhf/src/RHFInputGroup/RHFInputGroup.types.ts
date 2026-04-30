import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { LabelProps } from '@geckoui/nativewind';

export interface RHFInputGroupProps
  extends Omit<LabelProps, 'className' | 'style'> {
  /** Label text rendered above the child input. */
  label?: string;

  /** Children — typically a single RHF wrapper (RHFInput, RHFSelect, etc.). */
  children: ReactNode;

  /** Class applied to the outer wrapper View. */
  className?: string;

  /** Class applied to the inner Label. */
  labelClassName?: string;

  /** Class applied to the RHFError below the input. */
  errorClassName?: string;

  /** Style applied to the outer wrapper View. */
  style?: StyleProp<ViewStyle>;
}
