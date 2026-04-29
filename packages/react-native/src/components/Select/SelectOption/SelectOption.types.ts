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

  /** Hide the trailing ✓ check icon when this option is selected. */
  hideCheckIcon?: boolean;

  /** Class for the option row. May be a function for state-dependent styling. */
  className?: string | ((props: CustomSelectOptionBaseArgs<T>) => string);

  /** Custom row content. Function form receives state + helpers. */
  children?:
    | ReactNode
    | ((props: Omit<CustomSelectOptionArgs<T>, 'preventDefault'>) => ReactNode);

  /** Single-select tap handler. Call `preventDefault()` to skip the default selection behavior. */
  onClick?: (args: CustomSelectOptionArgs<T>) => void;

  /** Multi-select removal handler. Fires when tapping an already-selected option. */
  onRemove?: (args: CustomSelectOptionArgs<T>) => void;

  disabled?: boolean;

  /**
   * Visibility under search:
   * - `'default'` — hide when keyword filters it out (standard option)
   * - `'always'` — always visible
   * - `'empty'` — visible only when no other options match
   * - `'filtered-and-empty'` — visible when filtered out AND no other matches
   */
  visibility?: 'default' | 'always' | 'empty' | 'filtered-and-empty';
}
