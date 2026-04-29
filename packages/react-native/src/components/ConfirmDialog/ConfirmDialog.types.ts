import type { FC, ReactNode } from 'react';

export interface ConfirmDialogContentProps extends ConfirmDialogOptions {
  dismiss: () => void;
}

export interface ConfirmDialogOptions {
  title?: string;

  /** Body content. May be a node or a render function that receives `dismiss`. */
  content?: ReactNode | FC<ConfirmDialogContentProps>;

  /** Label for the confirm (right) button. Default `'Confirm'`. */
  confirmButtonLabel?: string;

  /** Label for the cancel (left) button. Default `'Cancel'`. */
  cancelButtonLabel?: string;

  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;

  /** Close on hardware back / Esc key. Default `true`. */
  dismissOnEsc?: boolean;

  /** Close on backdrop tap. Default `true`. */
  dismissOnOutsideClick?: boolean;

  /** Called with `dismiss` when the user confirms. May return a Promise to defer dismiss. */
  onConfirm?: (args: { dismiss: () => void }) => void | Promise<void>;

  /** Called with `dismiss` when the user cancels. */
  onCancel?: (args: { dismiss: () => void }) => void | Promise<void>;
}
