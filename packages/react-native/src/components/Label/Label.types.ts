import type { StyleProp, TextProps, TextStyle } from 'react-native';

export interface LabelProps extends Omit<TextProps, 'style' | 'children'> {
  children?: React.ReactNode;
  /** Adds a red asterisk after the label text. Visual only, no validation. */
  required?: boolean;
  className?: string;
  style?: StyleProp<TextStyle>;
}
