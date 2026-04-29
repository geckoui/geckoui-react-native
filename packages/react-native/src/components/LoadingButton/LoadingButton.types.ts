import type { ButtonProps } from '../Button/Button.types';

export interface LoadingButtonProps extends ButtonProps {
  /** Show the spinner and disable interaction. */
  loading?: boolean;

  /** Side of the label the spinner appears on. Default `'start'`. */
  spinnerPosition?: 'start' | 'end';

  /** Replace the label while loading (e.g. "Saving…"). */
  loadingText?: string;

  /** NativeWind class applied to the spinner element. */
  spinnerClassName?: string;
}
