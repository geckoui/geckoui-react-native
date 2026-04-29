import type { StyleProp, TextInputProps, TextStyle } from 'react-native';

export interface TextareaProps extends Omit<TextInputProps, 'style'> {
  /** Visible row count (drives min height). Default `4`. */
  rows?: number;

  className?: string;
  style?: StyleProp<TextStyle>;
}
