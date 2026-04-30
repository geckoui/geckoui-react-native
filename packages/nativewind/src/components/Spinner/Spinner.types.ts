import type {
  ActivityIndicatorProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface SpinnerProps
  extends Omit<ActivityIndicatorProps, 'style' | 'size'> {
  size?: 'small' | 'large' | number;
  className?: string;
  style?: StyleProp<ViewStyle>;
}
