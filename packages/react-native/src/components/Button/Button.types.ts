import type {
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface ButtonVariantMap {
  filled: unknown;
  outlined: unknown;
  ghost: unknown;
  icon: unknown;
}

export interface ButtonColorMap {
  primary: unknown;
}

export interface ButtonSizeMap {
  xs: unknown;
  sm: unknown;
  md: unknown;
  lg: unknown;
  xl: unknown;
}

export interface ButtonProps
  extends Omit<PressableProps, 'style' | 'children'> {
  variant?: keyof ButtonVariantMap;
  color?: keyof ButtonColorMap;
  size?: keyof ButtonSizeMap;
  children?: React.ReactNode;

  /** NativeWind class overrides for the container (wins over component defaults). */
  className?: string;

  /** NativeWind class overrides for the label text. */
  labelClassName?: string;

  /** One-off RN style overrides for the container. */
  style?: StyleProp<ViewStyle>;

  /** One-off RN style overrides for the label text. */
  labelStyle?: StyleProp<TextStyle>;
}
