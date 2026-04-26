import type { PressableProps, StyleProp, ViewStyle } from 'react-native';

export interface CheckboxProps
  extends Omit<PressableProps, 'style' | 'children' | 'onPress'> {
  checked?: boolean | 'indeterminate';
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}
