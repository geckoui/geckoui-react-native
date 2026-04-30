import type { ReactNode } from 'react';

export interface MenuItemProps {
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}
