import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface MenuPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface MenuContextProps {
  open: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  disabled: boolean;
  menuPosition: MenuPosition;
}

export interface MenuProps {
  label?: string;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  menuClassName?: string;
  buttonClassName?: string;
  children?: ReactNode;
}
