import type React from 'react';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { Calendar } from '../Calendar';
import type { DateRange } from '../Calendar';
import { Dialog } from '../Dialog';
import { DynamicComponentRenderer } from '../DynamicComponentRenderer/DynamicComponentRenderer';
import type { DateRangeInputProps } from './DateRangeInput.types';
import { formatRangeForDisplay } from './DateRangeInput.utils';

interface RangePickerProps {
  initialValue?: DateRange | null;
  className?: string;
  disableDate?: (date: string) => boolean;
  onComplete: (range: DateRange) => void;
}

const RangePicker = ({
  initialValue,
  className,
  disableDate,
  onComplete,
}: RangePickerProps): React.ReactElement => {
  const [range, setRange] = useState<DateRange | null>(initialValue ?? null);
  return (
    <Calendar
      className={className}
      mode="range"
      selectedRange={range ?? undefined}
      onSelectRange={(r) => {
        setRange(r);
        if (r?.from && r.to) onComplete(r);
      }}
      disableDate={disableDate}
    />
  );
};

export const DateRangeInput = ({
  value,
  onChange,
  placeholder = 'Select date range',
  placeholderTo = 'End date',
  separator = ' — ',
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
}: DateRangeInputProps): React.ReactElement => {
  const display = formatRangeForDisplay(
    value,
    format,
    separator,
    placeholderTo,
  );
  const hasValue = display !== null;

  const openCalendar = () => {
    if (disabled) return;
    Dialog.show({
      className: twMerge('GeckoUIDateRangeInput__dialog', dialogClassName),
      content: ({ dismiss }) => (
        <RangePicker
          initialValue={value}
          className={twMerge(
            'GeckoUIDateRangeInput__calendar',
            calendarClassName,
          )}
          disableDate={disableDate}
          onComplete={(range) => {
            onChange?.(range);
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
        'GeckoUIDateRangeInput',
        disabled && 'GeckoUIDateRangeInput--disabled',
        className,
      )}
      style={style}
    >
      {prefix ? <DynamicComponentRenderer component={prefix} /> : null}
      <View className="GeckoUIDateRangeInput__content">
        {hasValue ? (
          <Text className="GeckoUIDateRangeInput__value">{display}</Text>
        ) : (
          <Text
            className={twMerge(
              'GeckoUIDateRangeInput__placeholder',
              placeholderClassName,
            )}
          >
            {placeholder}
          </Text>
        )}
      </View>
      <View className="GeckoUIDateRangeInput__icons">
        {hasValue && clearable && !hideClearIcon && !disabled && (
          <Pressable
            className="GeckoUIDateRangeInput__clear-button"
            onPress={handleClear}
            hitSlop={8}
          >
            <Text className="GeckoUIDateRangeInput__clear-icon">✕</Text>
          </Pressable>
        )}
        {!hideCalendarIcon &&
          (suffix ? (
            <DynamicComponentRenderer component={suffix} />
          ) : (
            <Text className="GeckoUIDateRangeInput__calendar-icon">▾</Text>
          ))}
      </View>
    </Pressable>
  );
};

DateRangeInput.displayName = 'DateRangeInput';

export type { DateRange };
