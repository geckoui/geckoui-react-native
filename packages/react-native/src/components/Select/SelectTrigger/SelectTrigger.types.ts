import type { ReactNode } from 'react';

import type { SelectOptionConfig } from '../SelectOption/SelectOption.types';

export interface SelectTriggerBaseRenderProps<T> {
  keyword: string;
  hasValue: boolean;
  filteredOptions: SelectOptionConfig<T>[];
  options: SelectOptionConfig<T>[];
  handleSearchChange: (text: string) => void;
  handleChange: (v: T) => void;
  toggleMenu: () => void;
  open: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

export interface SingleSelectTriggerRenderProps<T>
  extends SelectTriggerBaseRenderProps<T> {
  selectedOptions: Pick<SelectOptionConfig<T>, 'label' | 'value'>;
}

export interface MultiSelectTriggerRenderProps<T>
  extends SelectTriggerBaseRenderProps<T> {
  selectedOptions: Pick<SelectOptionConfig<T>, 'label' | 'value'>[];
}

export interface SingleSelectTriggerProps<T> {
  multiple?: false;
  children: (props: SingleSelectTriggerRenderProps<T>) => ReactNode;
}

export interface MultiSelectTriggerProps<T> {
  multiple: true;
  children: (props: MultiSelectTriggerRenderProps<T>) => ReactNode;
}

export interface SelectTriggerProps<T> {
  multiple?: boolean;
  children:
    | SingleSelectTriggerProps<T>['children']
    | MultiSelectTriggerProps<T>['children'];
}

export interface SelectTriggerOverload {
  <T>(props: SingleSelectTriggerProps<T>): ReactNode;
  <T>(props: MultiSelectTriggerProps<T>): ReactNode;
  <T>(props: SelectTriggerProps<T>): ReactNode;
  displayName: string;
}
