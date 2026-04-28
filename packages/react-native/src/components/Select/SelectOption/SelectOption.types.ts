import type { ReactNode } from 'react';

export interface SelectOptionConfig<T> {
  value: T;
  label: string;
  visibility?: 'default' | 'always' | 'empty' | 'filtered-and-empty';
  props: Omit<SelectOptionProps<T>, 'children'>;
}

export interface CustomSelectOptionBaseArgs<T> {
  value: T;
  selected: boolean;
  focused: boolean;
}

export interface CustomSelectOptionArgs<T>
  extends CustomSelectOptionBaseArgs<T> {
  preventDefault: () => void;
  selectCurrentOption: () => void;
  closeMenu: () => void;
  filteredKeyword: string;
}

export interface SelectOptionProps<T> {
  value: T;
  label: string;
  hideCheckIcon?: boolean;
  className?: string | ((props: CustomSelectOptionBaseArgs<T>) => string);
  children?:
    | ReactNode
    | ((props: Omit<CustomSelectOptionArgs<T>, 'preventDefault'>) => ReactNode);
  onClick?: (args: CustomSelectOptionArgs<T>) => void;
  onRemove?: (args: CustomSelectOptionArgs<T>) => void;
  disabled?: boolean;
  visibility?: 'default' | 'always' | 'empty' | 'filtered-and-empty';
}
