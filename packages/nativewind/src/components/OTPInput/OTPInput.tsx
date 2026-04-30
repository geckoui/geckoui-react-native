import { cva } from 'class-variance-authority';
import { remapProps } from 'nativewind';
import type React from 'react';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { OTPInputProps } from './OTPInput.types';

const containerCva = cva('GeckoUIOTPInput', {
  variants: {
    disabled: {
      true: 'GeckoUIOTPInput--disabled',
      false: '',
    },
  },
  defaultVariants: { disabled: false },
});

const cellCva = cva('GeckoUIOTPInput__cell', {
  variants: {
    focused: {
      true: 'GeckoUIOTPInput__cell--focused',
      false: '',
    },
    disabled: {
      true: 'GeckoUIOTPInput__cell--disabled',
      false: '',
    },
  },
  defaultVariants: { focused: false, disabled: false },
});

const OTPInputImpl = ({
  value = '',
  onChange,
  onBlur: onBlurProp,
  onOTPComplete,
  numberOnly = true,
  className,
  style,
  cellClassName: _cellClassName,
  cellStyle,
  inputClassName: _inputClassName,
  inputStyle,
  length = 6,
  disabled,
}: OTPInputProps): React.ReactElement => {
  const inputRef = useRef<TextInput | null>(null);
  const [focused, setFocused] = useState(false);

  const handleChangeText = (text: string) => {
    const cleaned = (numberOnly ? text.replace(/\D/g, '') : text).slice(
      0,
      length,
    );
    onChange(cleaned);
    if (cleaned.length === length) {
      onOTPComplete?.(cleaned);
    }
  };

  const focusInput = () => {
    if (disabled) return;
    inputRef.current?.focus();
  };

  const cursorIndex = Math.min(value.length, length - 1);

  return (
    <Pressable
      className={twMerge(containerCva({ disabled: !!disabled }), className)}
      style={style}
      onPress={focusInput}
      disabled={disabled}
    >
      {Array.from({ length }).map((_, index) => {
        const char = value[index] ?? '';
        const isCurrent = focused && index === cursorIndex;
        return (
          <View
            key={index}
            className={twMerge(
              cellCva({ focused: isCurrent, disabled: !!disabled }),
              _cellClassName,
            )}
            style={cellStyle}
          >
            <Text
              className={twMerge(
                'GeckoUIOTPInput__cell-text',
                !char && 'GeckoUIOTPInput__cell-text--placeholder',
              )}
            >
              {char || '•'}
            </Text>
          </View>
        );
      })}
      <TextInput
        ref={inputRef}
        className="GeckoUIOTPInput__input"
        style={[
          StyleSheet.absoluteFillObject,
          { color: 'transparent' },
          inputStyle,
        ]}
        value={value}
        onChangeText={handleChangeText}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          onBlurProp?.(e);
        }}
        keyboardType={numberOnly ? 'number-pad' : 'default'}
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        maxLength={length}
        editable={!disabled}
        caretHidden
        selectionColor="transparent"
        autoCorrect={false}
        autoCapitalize="none"
      />
    </Pressable>
  );
};

export const OTPInput = remapProps(OTPInputImpl, {
  cellClassName: 'cellStyle',
  inputClassName: 'inputStyle',
});

OTPInput.displayName = 'OTPInput';
