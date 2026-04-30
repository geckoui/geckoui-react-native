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
  /** Default trigger button label. Ignored when `<MenuTrigger>` is provided. */
  label?: string;

  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;

  /** Class applied to the dropdown panel. */
  menuClassName?: string;

  /** Class applied to the default trigger button (ignored when `<MenuTrigger>` is provided). */
  buttonClassName?: string;

  children?: ReactNode;
}
