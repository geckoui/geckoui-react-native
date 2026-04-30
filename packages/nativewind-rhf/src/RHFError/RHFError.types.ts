import type { JSX, ReactNode } from 'react';
import type { ControllerFieldState } from 'react-hook-form';

import type { RHFBaseProps } from '../RHF.types';

export type RHFErrorRenderProps = ControllerFieldState;

export interface RHFErrorProps extends RHFBaseProps {
  /** Class applied to the default `InputError` (ignored when `render` is set). */
  className?: string;

  /**
   * Custom error renderer. Receives RHF's `fieldState` so you can read
   * `error.message`, `error.type`, etc. If omitted, uses the default
   * `InputError` look.
   */
  render?: (props: RHFErrorRenderProps) => JSX.Element | ReactNode;
}
