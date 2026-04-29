import type { FC, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface DialogContentProps {
  dismiss: () => void;
}

export interface DialogOptions {
  /** Body content. May be a node or a render function that receives `dismiss`. */
  content?: ReactNode | FC<DialogContentProps>;

  className?: string;
  style?: StyleProp<ViewStyle>;

  /** Close on hardware back / Esc key. Default `true`. */
  dismissOnEsc?: boolean;

  /** Close on backdrop tap. Default `true`. */
  dismissOnOutsideClick?: boolean;
}

export interface DialogState {
  visible: boolean;
  options: DialogOptions | null;
}
