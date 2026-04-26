import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface CounterInputSizeMap {
  sm: unknown;
  md: unknown;
  lg: unknown;
}

export interface CounterInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: keyof CounterInputSizeMap;
  disabled?: boolean;
  readOnly?: boolean;
  editable?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  inputClassName?: string;
  inputStyle?: StyleProp<TextStyle>;
  buttonClassName?: string;
  buttonStyle?: StyleProp<ViewStyle>;
}
