import type { StyleProp, ViewStyle } from 'react-native';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}
