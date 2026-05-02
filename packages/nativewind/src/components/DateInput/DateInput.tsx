import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { Calendar } from '../Calendar';
import { CalendarPicker } from '../CalendarPicker';
import { DynamicComponentRenderer } from '../DynamicComponentRenderer/DynamicComponentRenderer';
import type { DateInputProps } from './DateInput.types';
import { formatDateForDisplay } from './DateInput.utils';

interface DatePickerProps {
  initialValue?: string | null;
  className?: string;
  disableDate?: (date: string) => boolean;
  onComplete: (date: string | null) => void;
}

const DatePicker = ({
  initialValue,
  className,
  disableDate,
  onComplete,
}: DatePickerProps): React.ReactElement => {
  const [selected, setSelected] = useState<string | null>(initialValue ?? null);
  const completingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <Calendar
      className={className}
      selectedDate={selected}
      onSelectDate={(date) => {
        if (completingRef.current) return;
        const next = date || null;
        setSelected(next);
        completingRef.current = true;
        timerRef.current = setTimeout(() => {
          onComplete(next);
        }, 0);
      }}
      disableDate={disableDate}
    />
  );
};

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
  pickerClassName,
  prefix,
  suffix,
  disableDate,
}: DateInputProps): React.ReactElement => {
  const display = value ? formatDateForDisplay(value, format) : null;
  const hasValue = display !== null;

  const openCalendar = () => {
    if (disabled) return;
    CalendarPicker.show({
      className: twMerge('GeckoUIDateInput__picker', pickerClassName),
      content: ({ dismiss }) => (
        <DatePicker
          initialValue={value}
          className={twMerge('GeckoUIDateInput__calendar', calendarClassName)}
          disableDate={disableDate}
          onComplete={(date) => {
            onChange?.(date);
            dismiss();
          }}
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
            hitSlop={12}
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
