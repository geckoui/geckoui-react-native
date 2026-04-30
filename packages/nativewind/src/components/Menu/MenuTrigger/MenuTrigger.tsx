import type React from 'react';

import { useMenu } from '../useMenu';
import type { MenuTriggerProps } from './MenuTrigger.types';

export const MenuTrigger = ({
  children,
}: MenuTriggerProps): React.ReactNode => {
  const { open, openMenu, closeMenu, toggleMenu, disabled } = useMenu();
  return children({ open, openMenu, closeMenu, toggleMenu, disabled });
};

MenuTrigger.displayName = 'MenuTrigger';
