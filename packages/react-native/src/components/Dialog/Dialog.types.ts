import type { FC, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface DialogContentProps {
  dismiss: () => void;
}

export interface DialogOptions {
  content?: ReactNode | FC<DialogContentProps>;
  className?: string;
  style?: StyleProp<ViewStyle>;
  dismissOnEsc?: boolean;
  dismissOnOutsideClick?: boolean;
}

export interface DialogState {
  visible: boolean;
  options: DialogOptions | null;
}
