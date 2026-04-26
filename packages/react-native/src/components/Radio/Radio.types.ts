import type { PressableProps, StyleProp, ViewStyle } from 'react-native';

export interface RadioProps
  extends Omit<PressableProps, 'style' | 'children' | 'onPress'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}
