import type { StyleProp, TextProps, TextStyle } from 'react-native';

export interface InputErrorProps extends Omit<TextProps, 'style' | 'children'> {
  children?: React.ReactNode;
  className?: string;
  style?: StyleProp<TextStyle>;
}
