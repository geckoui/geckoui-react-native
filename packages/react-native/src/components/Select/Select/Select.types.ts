import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { SelectOptionConfig } from '../SelectOption/SelectOption.types';

export interface BaseSelectProps {
  placeholder?: string;
  wrapperClassName?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
  menuClassName?: string;
  menuStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  filterable?: boolean;
  closeMenuOnSelect?: boolean;
  clearable?: boolean;
  hideDefaultEmptyUI?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  placeholderClassName?: string;
  children?: ReactNode;
}

export interface SingleSelectProps<T> extends BaseSelectProps {
  value: T;
  onChange: (value: T) => void;
  multiple?: false;
}

export interface MultiSelectProps<T> extends BaseSelectProps {
  value: T[];
  onChange: (value: T[]) => void;
  multiple: true;
}

export type SelectProps<T> = SingleSelectProps<T> | MultiSelectProps<T>;

export interface SelectOverload {
  <T>(props: SingleSelectProps<T>): ReactNode;
  <T>(props: MultiSelectProps<T>): ReactNode;
  displayName: string;
}

export interface SelectContextProps<T> extends BaseSelectProps {
  value: T | T[];
  multiple?: boolean;
  open: boolean;
  options: SelectOptionConfig<T>[];
  keyword: string;
  setKeyword: (k: string) => void;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  isSelected: (v: T) => boolean;
  handleChange: (v: T) => void;
  isEmpty: boolean;
  onChange?: (value: T | T[]) => void;
}
