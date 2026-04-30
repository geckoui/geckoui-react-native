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

  /** Allow tapping the backdrop to close. Default `false`. */
  allowClickOutside?: boolean;

  /** Called when the drawer requests close (backdrop tap, hardware back, etc.). */
  handleClose?: () => void;

  /** Render the drawer without the dimmed backdrop. */
  hideBackdrop?: boolean;

  children?: ReactNode;

  /** Edge to slide in from. Default `'right'`. */
  placement?: keyof DrawerPlacementMap;

  backdropClassName?: string;
  backdropStyle?: StyleProp<ViewStyle>;
  className?: string;
  style?: StyleProp<ViewStyle>;

  /** Close on hardware back / Esc key. Default `true`. */
  dismissOnEscape?: boolean;
}
