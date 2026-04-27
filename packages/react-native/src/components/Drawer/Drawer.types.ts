import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface DrawerPlacementMap {
  top: unknown;
  bottom: unknown;
  left: unknown;
  right: unknown;
}

export interface DrawerProps {
  open: boolean;
  allowClickOutside?: boolean;
  handleClose?: () => void;
  hideBackdrop?: boolean;
  children?: ReactNode;
  placement?: keyof DrawerPlacementMap;
  backdropClassName?: string;
  backdropStyle?: StyleProp<ViewStyle>;
  className?: string;
  style?: StyleProp<ViewStyle>;
  dismissOnEscape?: boolean;
}
