import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { SelectOptionConfig } from '../SelectOption/SelectOption.types';

export interface BaseSelectProps {
  placeholder?: string;

  /** Class applied to the outer wrapper around the trigger. */
  wrapperClassName?: string;

  /** Style applied to the outer wrapper around the trigger. */
  wrapperStyle?: StyleProp<ViewStyle>;

  /** Class applied to the bottom-sheet menu surface. */
  menuClassName?: string;

  /** Style applied to the bottom-sheet menu surface. */
  menuStyle?: StyleProp<ViewStyle>;

  disabled?: boolean;

  /** Show the search input above the option list. */
  filterable?: boolean;

  /** Close the menu after a selection. Default `true` for single, `false` for multi. */
  closeMenuOnSelect?: boolean;

  /** Show a clear (✕) button on the trigger when a value is selected. */
  clearable?: boolean;

  /** Skip the default `<SelectEmpty>` UI when no options match the search. */
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
