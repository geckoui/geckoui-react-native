import type { PressableProps, StyleProp, ViewStyle } from 'react-native';

export interface SwitchSizeMap {
  sm: unknown;
  md: unknown;
}

export interface SwitchProps
  extends Omit<PressableProps, 'style' | 'children' | 'onPress'> {
  value?: boolean;
  onChange?: (value: boolean) => void;
  size?: keyof SwitchSizeMap;
  disabled?: boolean;
  className?: string;
  /** NativeWind classes for the inner thumb. */
  thumbClassName?: string;
  style?: StyleProp<ViewStyle>;
  thumbStyle?: StyleProp<ViewStyle>;
}
