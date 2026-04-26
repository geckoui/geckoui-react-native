import type { StyleProp, TextInputProps, TextStyle } from 'react-native';

export interface TextareaProps extends Omit<TextInputProps, 'style'> {
  rows?: number;
  className?: string;
  style?: StyleProp<TextStyle>;
}
