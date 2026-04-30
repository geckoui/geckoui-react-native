import React, { Children, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { SelectContext } from '../Select.context';
import { findSelectOptions, isEqual, isTextIncludes } from '../Select.utils';
import { SelectButton } from '../SelectButton';
import { SelectMenu } from '../SelectMenu';
import type { SelectOptionConfig } from '../SelectOption/SelectOption.types';
import type {
  SelectContextProps,
  SelectOverload,
  SelectProps,
} from './Select.types';

const Select = <T,>(props: SelectProps<T>): ReactNode => {
  const {
    value,
    onChange,
    children,
    multiple,
    disabled,
    filterable,
    closeMenuOnSelect = !multiple,
    clearable = false,
    wrapperClassName,
    wrapperStyle,
    menuClassName,
    menuStyle,
    ...rest
  } = props;

  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const options = useMemo(() => {
    const result = Children.toArray(children)
      .map(findSelectOptions<T>)
      .filter(Boolean)
      .flat() as SelectOptionConfig<T>[];
    return result ?? [];
  }, [children]);

  const isEmpty = !options.some((e) => isTextIncludes(e.label, keyword));

  const openMenu = () => {
    if (!disabled) setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
    setKeyword('');
  };
  const toggleMenu = () => (open ? closeMenu() : openMenu());

  const isSelected = (v: T) => {
    if (!multiple) return isEqual(v, value);
    return Array.isArray(value) && value.some((e) => isEqual(e, v));
  };

  const handleChange = (v: T) => {
    if (!multiple) {
      (onChange as (val: T) => void)(v);
      if (closeMenuOnSelect) closeMenu();
      return;
    }
    const prev = Array.isArray(value) ? value : [];
    if (isSelected(v)) {
      (onChange as (val: T[]) => void)(prev.filter((e) => !isEqual(e, v)));
    } else {
      (onChange as (val: T[]) => void)([...prev, v]);
    }
  };

  return (
    <SelectContext.Provider
      value={
        {
          open,
          openMenu,
          closeMenu,
          toggleMenu,
          options,
          keyword,
          setKeyword,
          isSelected: isSelected as (v: unknown) => boolean,
          handleChange: handleChange as (v: unknown) => void,
          value: value as unknown,
          multiple,
          disabled,
          filterable,
          closeMenuOnSelect,
          isEmpty,
          clearable,
          children,
          onChange: onChange as (v: unknown | unknown[]) => void,
          ...rest,
        } as SelectContextProps<unknown>
      }
    >
      <View
        className={twMerge('GeckoUISelect', wrapperClassName)}
        style={wrapperStyle}
      >
        <SelectButton />
        <SelectMenu className={menuClassName} style={menuStyle}>
          {children}
        </SelectMenu>
      </View>
    </SelectContext.Provider>
  );
};

Select.displayName = 'Select';

export default Select as SelectOverload;

export type { SelectProps } from './Select.types';
