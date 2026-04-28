import { isValidElement, type ReactNode } from 'react';

import { MenuTrigger } from './MenuTrigger';

export function isMenuTrigger(child: ReactNode): boolean {
  return isValidElement(child) && child.type === MenuTrigger;
}
