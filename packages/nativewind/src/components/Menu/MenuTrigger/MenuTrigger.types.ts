import type { ReactNode } from 'react';

export interface MenuTriggerRenderProps {
  open: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  disabled: boolean;
}

export interface MenuTriggerProps {
  children: (props: MenuTriggerRenderProps) => ReactNode;
}
