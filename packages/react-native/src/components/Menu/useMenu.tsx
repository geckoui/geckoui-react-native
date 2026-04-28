import { createContext, useContext } from 'react';

import type { MenuContextProps } from './Menu/Menu.types';

export const MenuContext = createContext<MenuContextProps | undefined>(
  undefined,
);

export const useMenu = (): MenuContextProps => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within a Menu');
  return context;
};
