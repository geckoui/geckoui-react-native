import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type TooltipPlacement = 'top' | 'bottom' | 'auto';

export interface TooltipAnchor {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TooltipState {
  id: number;
  content: ReactNode;
  anchor: TooltipAnchor;
  placement: TooltipPlacement;
  contentClassName?: string;
  contentStyle?: StyleProp<ViewStyle>;
}

export interface TooltipProps {
  /** Tooltip body. Plain string is wrapped in `<Text>` automatically; node is rendered as-is. */
  content: ReactNode;
  /** Element that triggers the tooltip on tap (or long-press). */
  children: ReactNode;
  placement?: TooltipPlacement;
  /** Disable interaction; trigger still renders normally. */
  disabled?: boolean;
  /** Show on long-press instead of tap. Default `false`. */
  longPress?: boolean;
  /** Auto-dismiss after ms. `0` (default) = manual dismiss only. */
  duration?: number;
  /**
   * If `true`, clone the child element and inject the press handler + ref into it
   * directly instead of wrapping it in a `<Pressable>`. Use this when the child is
   * already a Pressable (e.g. `<Button>`) to avoid nested-Pressable touch capture.
   * Default `false`.
   */
  triggerAsChild?: boolean;
  /** Class applied to the tooltip body. */
  contentClassName?: string;
  /** Style applied to the tooltip body. */
  contentStyle?: StyleProp<ViewStyle>;
  /** Class applied to the trigger wrapper Pressable. */
  className?: string;
  style?: StyleProp<ViewStyle>;
}
