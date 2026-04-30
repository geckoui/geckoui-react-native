import type { PressableProps, StyleProp, ViewStyle } from 'react-native';

export interface CheckboxProps
  extends Omit<PressableProps, 'style' | 'children' | 'onPress'> {
  /** Current state. `'indeterminate'` shows a dash instead of the check. */
  checked?: boolean | 'indeterminate';

  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}
