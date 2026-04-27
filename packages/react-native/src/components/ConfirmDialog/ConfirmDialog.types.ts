import type { FC, ReactNode } from 'react';

export interface ConfirmDialogContentProps extends ConfirmDialogOptions {
  dismiss: () => void;
}

export interface ConfirmDialogOptions {
  title?: string;
  content?: ReactNode | FC<ConfirmDialogContentProps>;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
  dismissOnEsc?: boolean;
  dismissOnOutsideClick?: boolean;
  onConfirm?: (args: { dismiss: () => void }) => void | Promise<void>;
  onCancel?: (args: { dismiss: () => void }) => void | Promise<void>;
}
