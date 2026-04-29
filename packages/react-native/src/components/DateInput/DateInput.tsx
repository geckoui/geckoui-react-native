import type React from 'react';
import { Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { Calendar } from '../Calendar';
import { Dialog } from '../Dialog';
import { DynamicComponentRenderer } from '../DynamicComponentRenderer/DynamicComponentRenderer';
import type { DateInputProps } from './DateInput.types';
import { formatDateForDisplay } from './DateInput.utils';

export const DateInput = ({
  value,
  onChange,
  placeholder = 'Select date',
  disabled,
  format = 'DD/MM/YYYY',
  clearable = true,
  hideClearIcon,
  hideCalendarIcon,
  className,
  style,
  placeholderClassName,
  calendarClassName,
  dialogClassName,
  prefix,
  suffix,
  disableDate,
}: DateInputProps): React.ReactElement => {
  const display = value ? formatDateForDisplay(value, format) : null;
  const hasValue = display !== null;

  const openCalendar = () => {
    if (disabled) return;
    Dialog.show({
      className: twMerge('GeckoUIDateInput__dialog', dialogClassName),
      content: ({ dismiss }) => (
        <Calendar
          className={twMerge('GeckoUIDateInput__calendar', calendarClassName)}
          selectedDate={value ?? null}
          onSelectDate={(date) => {
            onChange?.(date || null);
            dismiss();
          }}
          disableDate={disableDate}
        />
      ),
    });
  };

  const handleClear = () => {
    if (disabled) return;
    onChange?.(null);
  };

  return (
    <Pressable
      onPress={openCalendar}
      disabled={disabled}
      className={twMerge(
        'GeckoUIDateInput',
        disabled && 'GeckoUIDateInput--disabled',
        className,
      )}
      style={style}
    >
      {prefix ? <DynamicComponentRenderer component={prefix} /> : null}
      <View className="GeckoUIDateInput__content">
        {hasValue ? (
          <Text className="GeckoUIDateInput__value">{display}</Text>
        ) : (
          <Text
            className={twMerge(
              'GeckoUIDateInput__placeholder',
              placeholderClassName,
            )}
          >
            {placeholder}
          </Text>
        )}
      </View>
      <View className="GeckoUIDateInput__icons">
        {hasValue && clearable && !hideClearIcon && !disabled && (
          <Pressable
            className="GeckoUIDateInput__clear-button"
            onPress={handleClear}
            hitSlop={8}
          >
            <Text className="GeckoUIDateInput__clear-icon">✕</Text>
          </Pressable>
        )}
        {!hideCalendarIcon &&
          (suffix ? (
            <DynamicComponentRenderer component={suffix} />
          ) : (
            <Text className="GeckoUIDateInput__calendar-icon">▾</Text>
          ))}
      </View>
    </Pressable>
  );
};

DateInput.displayName = 'DateInput';
