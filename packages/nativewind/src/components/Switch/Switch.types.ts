import type { PressableProps, StyleProp, ViewStyle } from 'react-native';

export interface SwitchSizeMap {
  sm: unknown;
  md: unknown;
}

export interface SwitchProps
  extends Omit<PressableProps, 'style' | 'children' | 'onPress'> {
  checked?: boolean;
  onChange?: (value: boolean) => void;
  size?: keyof SwitchSizeMap;
  disabled?: boolean;
  className?: string;

  /** NativeWind classes for the inner thumb. */
  thumbClassName?: string;

  style?: StyleProp<ViewStyle>;

  /** RN style applied to the inner thumb. */
  thumbStyle?: StyleProp<ViewStyle>;
}
