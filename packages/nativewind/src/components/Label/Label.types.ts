import type { ReactNode } from 'react';
import type { StyleProp, TextProps, TextStyle, ViewStyle } from 'react-native';

export interface LabelProps extends Omit<TextProps, 'style' | 'children'> {
  children?: ReactNode;

  /** Adds a red asterisk after the label text. Visual only, no validation. */
  required?: boolean;

  /** Tooltip body shown when the user taps the info icon next to the label. String is wrapped in `<Text>`; node is rendered as-is. */
  tooltip?: string | ReactNode;

  /** Custom icon for the tooltip trigger. Defaults to a "ⓘ" glyph. */
  tooltipIcon?: string | ReactNode;

  /** Class applied to the tooltip body. */
  tooltipClassName?: string;

  /** Class applied to the inner Text element (label text). */
  textClassName?: string;

  /** Style applied to the inner Text element (label text). */
  textStyle?: StyleProp<TextStyle>;

  className?: string;
  style?: StyleProp<ViewStyle>;
}
