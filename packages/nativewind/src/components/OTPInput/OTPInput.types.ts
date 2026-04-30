import type { StyleProp, TextInputProps, ViewStyle } from 'react-native';

export interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: TextInputProps['onBlur'];

  /** Fired exactly once when the user fills the final cell. */
  onOTPComplete?: (value: string) => void;

  /** Restrict input to numeric characters only. Default `false`. */
  numberOnly?: boolean;

  className?: string;
  style?: StyleProp<ViewStyle>;

  /** NativeWind class applied to each cell wrapper. */
  cellClassName?: string;

  /** RN style applied to each cell wrapper. */
  cellStyle?: StyleProp<ViewStyle>;

  /** NativeWind class applied to each cell's TextInput. */
  inputClassName?: string;

  /** RN style applied to each cell's TextInput. */
  inputStyle?: StyleProp<ViewStyle>;

  /** Number of cells. Default `6`. */
  length?: number;

  disabled?: boolean;

  /**
   * @internal Used by `RHFOTPInput` to opt cells into error styling. Prefer
   * `RHFOTPInput` for form integration; this prop is not part of the public API.
   */
  error?: boolean;
}
