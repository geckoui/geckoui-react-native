import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface CounterInputSizeMap {
  sm: unknown;
  md: unknown;
  lg: unknown;
}

export interface CounterInputProps {
  value: number;
  onChange: (value: number) => void;

  /** Minimum allowed value. Disables the `−` button at this floor. */
  min?: number;

  /** Maximum allowed value. Disables the `+` button at this ceiling. */
  max?: number;

  /** Increment / decrement step. Default `1`. */
  step?: number;

  size?: keyof CounterInputSizeMap;

  /** Disables both buttons and the input entirely. */
  disabled?: boolean;

  /** Show the value but block all interaction (no greyed-out look). */
  readOnly?: boolean;

  /** Allow typing into the value field directly (otherwise only +/- adjust). */
  editable?: boolean;

  className?: string;
  style?: StyleProp<ViewStyle>;

  /** NativeWind class applied to the value TextInput. */
  inputClassName?: string;

  /** RN style applied to the value TextInput. */
  inputStyle?: StyleProp<TextStyle>;

  /** NativeWind class applied to the +/− buttons. */
  buttonClassName?: string;

  /** RN style applied to the +/− buttons. */
  buttonStyle?: StyleProp<ViewStyle>;
}
