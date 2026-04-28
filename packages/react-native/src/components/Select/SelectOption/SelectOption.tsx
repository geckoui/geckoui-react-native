import type { ReactNode } from 'react';
import { Pressable, Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { useSelect } from '../Select.context';
import { isHideSelectOption } from '../Select.utils';
import type {
  CustomSelectOptionArgs,
  SelectOptionProps,
} from './SelectOption.types';

const SelectOption = <T,>({
  value,
  label,
  hideCheckIcon,
  className,
  onClick,
  disabled,
  visibility = 'default',
  children,
  onRemove,
}: SelectOptionProps<T>): ReactNode => {
  const {
    closeMenuOnSelect,
    multiple,
    keyword: filteredKeyword,
    handleChange,
    closeMenu,
    isSelected,
    isEmpty,
  } = useSelect<T>();

  const selected = isSelected(value);

  if (
    isHideSelectOption({ keyword: filteredKeyword, label, visibility, isEmpty })
  )
    return null;

  let prevented = false;
  const preventDefault = () => {
    prevented = true;
  };

  const selectCurrentOption = () => {
    handleChange(value);
    if (closeMenuOnSelect) closeMenu();
  };

  const customArgs: CustomSelectOptionArgs<T> = {
    preventDefault,
    value,
    selected,
    focused: false,
    selectCurrentOption,
    closeMenu,
    filteredKeyword,
  };

  const handlePress = () => {
    if (disabled) return;
    prevented = false;
    if (selected && multiple) {
      onRemove?.(customArgs);
    } else {
      onClick?.(customArgs);
    }
    if (!prevented) selectCurrentOption();
  };

  const resolvedClassName =
    typeof className === 'function'
      ? className({ value, selected, focused: false })
      : className;

  return (
    <Pressable
      className={twMerge(
        'GeckoUISelectOption',
        selected && 'GeckoUISelectOption--selected',
        disabled && 'GeckoUISelectOption--disabled',
        resolvedClassName,
      )}
      disabled={disabled}
      onPressIn={(e) => e.stopPropagation()}
      onPress={handlePress}
    >
      {typeof children === 'function'
        ? children({
            value,
            selected,
            focused: false,
            selectCurrentOption,
            closeMenu,
            filteredKeyword,
          })
        : (children ?? (
            <Text className="GeckoUISelectOption__label">{label}</Text>
          ))}
      {selected && !hideCheckIcon && (
        <Text className="GeckoUISelectOption__check-icon">✓</Text>
      )}
    </Pressable>
  );
};

SelectOption.displayName = 'SelectOption';

export { SelectOption };
