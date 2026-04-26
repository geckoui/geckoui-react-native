import type { ButtonProps } from '../Button/Button.types';

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  spinnerPosition?: 'start' | 'end';
  loadingText?: string;
  spinnerClassName?: string;
}
