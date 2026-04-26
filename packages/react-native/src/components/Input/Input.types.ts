import type {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";

export interface InputProps extends Omit<TextInputProps, "style"> {
  /** Rendered before the input. */
  prefix?: React.ReactNode;

  /** Rendered after the input. */
  suffix?: React.ReactNode;

  /** NativeWind classes applied to the TextInput itself. */
  inputClassName?: string;

  /** NativeWind classes applied to the container wrapping prefix/input/suffix. */
  className?: string;

  style?: StyleProp<ViewStyle>;

  /** RN style applied directly to the TextInput. */
  inputStyle?: StyleProp<TextStyle>;
}
