import type { StyleProp, TextInputProps, ViewStyle } from 'react-native';

export interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: TextInputProps['onBlur'];
  onOTPComplete?: (value: string) => void;
  numberOnly?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  cellClassName?: string;
  cellStyle?: StyleProp<ViewStyle>;
  inputClassName?: string;
  inputStyle?: StyleProp<ViewStyle>;
  length?: number;
  disabled?: boolean;
}
