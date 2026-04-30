import { createContext, useContext } from 'react';
import type React from 'react';

import type { SelectContextProps } from './Select/Select.types';

export const SelectContext = createContext<
  SelectContextProps<unknown> | undefined
>(undefined);

export function useSelect<T = unknown>(): SelectContextProps<T> {
  const context = useContext(
    SelectContext as React.Context<SelectContextProps<T> | undefined>,
  );
  if (!context) throw new Error('useSelect must be used within a Select');
  return context;
}
