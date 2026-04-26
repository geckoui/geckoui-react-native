import type React from "react";
import { useState } from "react";
import { remapProps } from "nativewind";
import { TextInput, View } from "react-native";
import { twMerge } from "tailwind-merge";

import type { InputProps } from "./Input.types";

type InputImplProps = InputProps;

const InputImpl = ({
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
}: InputImplProps): React.ReactElement => {
  const [focused, setFocused] = useState(false);
  const disabled = editable === false;

  return (
    <View
      className={twMerge(
        "GeckoInput",
        disabled && "GeckoInput--disabled",
        focused && !disabled && "GeckoInput--focused",
        className
      )}
      style={style}
    >
      {prefix}
      <TextInput
        className="GeckoInput__input"
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
};

export const Input = remapProps(InputImpl, {
  inputClassName: "inputStyle",
});

Input.displayName = "Input";
