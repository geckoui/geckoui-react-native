import { Children, useMemo } from 'react';
import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { DynamicComponentRenderer } from '../../DynamicComponentRenderer/DynamicComponentRenderer';
import { useSelect } from '../Select.context';
import { isEqual, isSelectTrigger } from '../Select.utils';
import type { SelectButtonProps } from './SelectButton.types';

const SelectButton = ({ className }: SelectButtonProps): ReactNode => {
  const {
    disabled,
    value,
    multiple,
    placeholder,
    placeholderClassName,
    openMenu,
    closeMenu,
    open,
    options,
    handleChange,
    onChange,
    clearable,
    prefix,
    suffix,
    children,
  } = useSelect();

  const customTrigger = useMemo(
    () => Children.toArray(children).find(isSelectTrigger),
    [children],
  );

  if (customTrigger) return customTrigger as ReactNode;

  const handleClear = () => {
    if (disabled) return;
    if (multiple) {
      onChange?.([]);
      return;
    }
    handleChange(undefined as unknown);
  };

  const selectedValues =
    multiple && Array.isArray(value) ? (value as unknown[]) : [];
  const hasMultiValues = multiple && selectedValues.length > 0;

  const singleDisplayLabel = (() => {
    if (multiple) return null;
    if (value === undefined || value === null || value === '') return null;
    return options.find((o) => isEqual(o.value, value))?.label ?? String(value);
  })();

  const hasValue = hasMultiValues || singleDisplayLabel !== null;

  return (
    <Pressable
      className={twMerge(
        'GeckoUISelectButton',
        disabled && 'GeckoUISelectButton--disabled',
        className,
      )}
      disabled={disabled}
      onPress={() => (open ? closeMenu() : openMenu())}
    >
      {prefix ? <DynamicComponentRenderer component={prefix} /> : null}
      <View className="GeckoUISelectButton__content">
        {hasMultiValues ? (
          selectedValues.map((v) => {
            const label =
              options.find((o) => isEqual(o.value, v))?.label ?? String(v);
            return (
              <View
                key={String(v)}
                className={twMerge(
                  'GeckoUISelectButton__multiselected-chip',
                  disabled &&
                    'GeckoUISelectButton__multiselected-chip--disabled',
                )}
              >
                <Text className="GeckoUISelectButton__multiselected-chip__label">
                  {label}
                </Text>
                {!disabled && (
                  <Pressable
                    className="GeckoUISelectButton__multiselected-chip__clear-button"
                    hitSlop={12}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleChange(v as never);
                    }}
                  >
                    <Text className="GeckoUISelectButton__multiselected-chip__clear-button__icon">
                      ✕
                    </Text>
                  </Pressable>
                )}
              </View>
            );
          })
        ) : singleDisplayLabel !== null ? (
          <Text className="GeckoUISelectButton__value">
            {singleDisplayLabel}
          </Text>
        ) : (
          <Text
            className={twMerge(
              'GeckoUISelectButton__placeholder',
              placeholderClassName,
            )}
          >
            {placeholder ?? 'Select option'}
          </Text>
        )}
      </View>
      <View className="GeckoUISelectButton__icons">
        {hasValue && clearable && !disabled && (
          <Pressable
            className="GeckoUISelectButton__clear-button"
            onPress={handleClear}
            hitSlop={12}
          >
            <Text className="GeckoUISelectButton__clear-icon">✕</Text>
          </Pressable>
        )}
        <DynamicComponentRenderer
          component={
            suffix ?? <Text className="GeckoUISelectButton__arrow">▾</Text>
          }
        />
      </View>
    </Pressable>
  );
};

SelectButton.displayName = 'SelectButton';

export { SelectButton };
