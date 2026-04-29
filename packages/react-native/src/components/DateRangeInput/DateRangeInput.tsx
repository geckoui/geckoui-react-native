import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { Calendar } from '../Calendar';
import type { DateRange } from '../Calendar';
import { Dialog } from '../Dialog';
import { DynamicComponentRenderer } from '../DynamicComponentRenderer/DynamicComponentRenderer';
import type { DateRangeInputProps } from './DateRangeInput.types';
import { formatRangeForDisplay } from './DateRangeInput.utils';

// Hold the dialog open briefly after the second date is picked so the user sees the
// final range bar settle BEFORE the dialog scale-out begins. The range underlay is
// percentage-positioned, so it shimmies if it re-layouts while the dialog is shrinking.
const COMPLETION_PAUSE_MS = 100;

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
      mode="range"
      selectedRange={range ?? undefined}
      onSelectRange={(r) => {
        if (completingRef.current) return;
        setRange(r);
        if (r?.from && r.to) {
          completingRef.current = true;
          timerRef.current = setTimeout(() => {
            onComplete(r);
          }, COMPLETION_PAUSE_MS);
        }
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
