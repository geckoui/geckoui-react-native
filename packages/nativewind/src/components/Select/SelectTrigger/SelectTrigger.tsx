import type { ReactNode } from 'react';

import { useSelect } from '../Select.context';
import { isTextIncludes } from '../Select.utils';
import type {
  SelectTriggerOverload,
  SelectTriggerProps,
} from './SelectTrigger.types';

const SelectTriggerImpl = <T,>({
  children,
  multiple,
}: SelectTriggerProps<T>): ReactNode => {
  const {
    keyword,
    setKeyword,
    toggleMenu,
    open,
    openMenu,
    options,
    closeMenu,
    isSelected,
    handleChange,
  } = useSelect<T>();

  const selectedOptions = options
    .filter((o) => isSelected(o.value))
    .map((o) => ({ label: o.label, value: o.value }));

  return (children as (props: unknown) => ReactNode)({
    keyword,
    selectedOptions: (multiple ? selectedOptions : selectedOptions[0]) as never,
    handleChange,
    options,
    toggleMenu,
    open,
    openMenu,
    closeMenu,
    hasValue: selectedOptions.length > 0,
    filteredOptions: options.filter((o) => isTextIncludes(o.label, keyword)),
    handleSearchChange: setKeyword,
  });
};

SelectTriggerImpl.displayName = 'SelectTrigger';

const SelectTrigger = SelectTriggerImpl as SelectTriggerOverload;

export { SelectTrigger };
