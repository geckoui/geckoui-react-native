import type React from 'react';
import { useEffect, useState } from 'react';
import { cva } from 'class-variance-authority';
import { remapProps } from 'nativewind';
import { Pressable, Text, TextInput, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { CounterInputProps } from './CounterInput.types';

const containerCva = cva('GeckoCounterInput', {
  variants: {
    disabled: {
      true: 'GeckoCounterInput--disabled',
      false: '',
    },
  },
  defaultVariants: { disabled: false },
});

const buttonCva = cva('GeckoCounterInput__button', {
  variants: {
    size: {
      sm: 'GeckoCounterInput__button--sm',
      md: 'GeckoCounterInput__button--md',
      lg: 'GeckoCounterInput__button--lg',
    },
    action: {
      decrement: 'GeckoCounterInput__button--decrement',
      increment: 'GeckoCounterInput__button--increment',
    },
    focused: {
      true: 'GeckoCounterInput__button--focused',
      false: '',
    },
  },
  defaultVariants: { size: 'md', focused: false },
});

const inputCva = cva('GeckoCounterInput__input', {
  variants: {
    size: {
      sm: 'GeckoCounterInput__input--sm',
      md: 'GeckoCounterInput__input--md',
      lg: 'GeckoCounterInput__input--lg',
    },
    focused: {
      true: 'GeckoCounterInput__input--focused',
      false: '',
    },
    disabled: {
      true: 'GeckoCounterInput__input--disabled',
      false: '',
    },
  },
  defaultVariants: { size: 'md', focused: false, disabled: false },
});

const iconCva = cva('GeckoCounterInput__icon', {
  variants: {
    size: {
      sm: 'GeckoCounterInput__icon--sm',
      md: 'GeckoCounterInput__icon--md',
      lg: 'GeckoCounterInput__icon--lg',
    },
  },
  defaultVariants: { size: 'md' },
});

const CounterInputImpl = ({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  size = 'md',
  disabled,
  readOnly,
  editable = false,
  className,
  style,
  inputClassName: _inputClassName,
  inputStyle,
  buttonClassName: _buttonClassName,
  buttonStyle,
}: CounterInputProps): React.ReactElement => {
  const [inputValue, setInputValue] = useState(String(value));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const clamp = (val: number) => Math.min(Math.max(val, min), max);

  const handleDecrement = () => onChange(clamp(value - step));
  const handleIncrement = () => onChange(clamp(value + step));

  const handleChangeText = (text: string) => {
    if (text !== '' && !/^-?\d*\.?\d*$/.test(text)) return;
    setInputValue(text);
    const parsed = parseFloat(text);
    if (!isNaN(parsed)) onChange(clamp(parsed));
  };

  const handleBlur = () => {
    setFocused(false);
    setInputValue(String(value));
  };

  const isAtMin = value <= min;
  const isAtMax = value >= max;

  return (
    <View
      className={twMerge(containerCva({ disabled: !!disabled }), className)}
      style={style}
    >
      <Pressable
        className={twMerge(
          buttonCva({ size, action: 'decrement', focused }),
          isAtMin && !disabled && 'opacity-50',
        )}
        style={buttonStyle}
        onPress={handleDecrement}
        disabled={disabled || readOnly || isAtMin}
        accessibilityRole="button"
        accessibilityLabel="Decrement"
      >
        <Text className={iconCva({ size })}>−</Text>
      </Pressable>

      <TextInput
        className={inputCva({ size, focused, disabled: !!disabled })}
        style={inputStyle}
        value={editable ? inputValue : String(value)}
        onChangeText={editable ? handleChangeText : undefined}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        editable={editable && !disabled && !readOnly}
        keyboardType="numeric"
        textAlign="center"
      />

      <Pressable
        className={twMerge(
          buttonCva({ size, action: 'increment', focused }),
          isAtMax && !disabled && 'opacity-50',
        )}
        style={buttonStyle}
        onPress={handleIncrement}
        disabled={disabled || readOnly || isAtMax}
        accessibilityRole="button"
        accessibilityLabel="Increment"
      >
        <Text className={iconCva({ size })}>+</Text>
      </Pressable>
    </View>
  );
};

export const CounterInput = remapProps(CounterInputImpl, {
  inputClassName: 'inputStyle',
  buttonClassName: 'buttonStyle',
});

CounterInput.displayName = 'CounterInput';
