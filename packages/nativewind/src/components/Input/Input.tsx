import { forwardRef, useState } from 'react';
import type React from 'react';
import { remapProps } from 'nativewind';
import { TextInput, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { InputProps } from './Input.types';

type InputImplProps = InputProps;

const InputImpl = forwardRef<TextInput, InputImplProps>(
  (
    {
      prefix,
      suffix,
      className,
      inputClassName: _inputClassName,
      style,
      inputStyle,
      editable = true,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ): React.ReactElement => {
    const [focused, setFocused] = useState(false);
    const disabled = editable === false;

    return (
      <View
        className={twMerge(
          'group GeckoUIInput',
          disabled && 'GeckoUIInput--disabled',
          focused && !disabled && 'GeckoUIInput--focused',
          className,
        )}
        style={style}
      >
        {prefix}
        <TextInput
          ref={ref}
          className="GeckoUIInput__input"
          style={inputStyle}
          editable={editable}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
        {suffix}
      </View>
    );
  },
);

InputImpl.displayName = 'InputImpl';

export const Input = remapProps(InputImpl, {
  inputClassName: 'inputStyle',
});

Input.displayName = 'Input';
