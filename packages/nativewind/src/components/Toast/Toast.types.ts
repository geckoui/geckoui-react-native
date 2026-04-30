import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export type ToastPosition = 'top' | 'bottom';

export interface ToastAction {
  label: string;
  onPress: () => void;
}

export interface ToastOptions {
  /** Optional explicit ID. If a toast with the same ID exists, it's replaced. */
  id?: string;

  /** Bold first line of the toast. */
  title?: string;

  /** Smaller, secondary line below the title. */
  description?: string;

  /** Visual variant — controls icon color and glyph. */
  variant?: ToastVariant;

  /** Auto-dismiss duration in ms. Default 3000. Pass 0 or Infinity to make it sticky. */
  duration?: number;

  /** Right-aligned action button (e.g. "Undo"). Tapping it also dismisses the toast. */
  action?: ToastAction;

  /** Show the trailing close (✕) button. Default true. */
  closable?: boolean;

  /** Hide the leading icon. Default false. */
  hideIcon?: boolean;

  /** Fired when the toast leaves for any reason (timeout, swipe, ✕, action). */
  onDismiss?: () => void;

  className?: string;
  style?: StyleProp<ViewStyle>;
}

export interface ToastInstance extends ToastOptions {
  id: string;
}

export interface ToastHostProps {
  /** Anchor edge for the stack. `'top'` is the iOS banner position; `'bottom'` is Material/Snackbar. */
  position?: ToastPosition;

  /**
   * Custom renderer for a toast. Receives the toast and a `dismiss` fn.
   * Falls back to default rendering when not provided.
   */
  renderToast?: (toast: ToastInstance, dismiss: () => void) => ReactNode;
}
