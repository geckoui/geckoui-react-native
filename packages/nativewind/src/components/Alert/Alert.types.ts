import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

export interface AlertVariantMap {
  error: unknown;
  warning: unknown;
  info: unknown;
  success: unknown;
  default: unknown;
}

export interface AlertProps extends Omit<ViewProps, 'style'> {
  /** Visual variant — controls icon dot color and emphasis. */
  variant?: keyof AlertVariantMap;

  title: React.ReactNode;
  description?: React.ReactNode;

  /** Custom icon node. If omitted, a default Unicode symbol is used. */
  icon?: React.ReactNode;

  iconClassName?: string;

  /** When set, a trailing ✕ button is rendered that fires this callback. */
  onRemove?: () => void;

  className?: string;
  style?: StyleProp<ViewStyle>;
}
