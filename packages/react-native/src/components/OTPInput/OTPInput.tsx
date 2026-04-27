import type React from 'react';
import { useRef, useState } from 'react';
import { cva } from 'class-variance-authority';
import { remapProps } from 'nativewind';
import type {
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { TextInput, View } from 'react-native';
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

const inputCva = cva('GeckoUIOTPInput__input', {
  variants: {
    focused: {
      true: 'GeckoUIOTPInput__input--focused',
      false: '',
    },
    disabled: {
      true: 'GeckoUIOTPInput__input--disabled',
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
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const focusAt = (index: number) => {
    inputRefs.current[Math.min(Math.max(index, 0), length - 1)]?.focus();
  };

  const handleChangeText = (text: string, index: number) => {
    const filtered = numberOnly ? text.replace(/\D/g, '') : text;
    const char = filtered.slice(-1);
    if (!char) return;
    const chars = value.split('');
    chars[index] = char;
    const newValue = chars.join('').substring(0, length);
    onChange(newValue);
    if (index < length - 1) focusAt(index + 1);
    if (newValue.length === length) onOTPComplete?.(newValue);
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (event.nativeEvent.key === 'Backspace') {
      if (!value[index] && index > 0) {
        onChange(value.slice(0, -1));
        focusAt(index - 1);
      } else if (value[index]) {
        const chars = value.split('');
        chars[index] = '';
        onChange(chars.join(''));
      }
    }
  };

  return (
    <View
      className={twMerge(containerCva({ disabled: !!disabled }), className)}
      style={style}
    >
      {Array.from({ length }).map((_, index) => (
        <View key={index} className="GeckoUIOTPInput__cell" style={cellStyle}>
          <TextInput
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            className={inputCva({
              focused: focusedIndex === index,
              disabled: !!disabled,
            })}
            style={inputStyle}
            value={value[index] ?? ''}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            onFocus={() => {
              if (index > value.length) {
                focusAt(value.length);
              } else {
                setFocusedIndex(index);
              }
            }}
            onBlur={(e) => {
              setFocusedIndex(null);
              onBlurProp?.(e);
            }}
            editable={!disabled}
            keyboardType={numberOnly ? 'numeric' : 'default'}
            maxLength={1}
            placeholder="•"
            textAlign="center"
          />
        </View>
      ))}
    </View>
  );
};

export const OTPInput = remapProps(OTPInputImpl, {
  cellClassName: 'cellStyle',
  inputClassName: 'inputStyle',
});

OTPInput.displayName = 'OTPInput';
