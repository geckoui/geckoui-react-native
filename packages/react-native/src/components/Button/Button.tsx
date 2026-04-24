import React from 'react';
import { Pressable, Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { ButtonProps } from './Button.types';

// Static maps so Tailwind's content scanner sees every class as a literal string.
// react-native-css-interop does not support compound selectors (.foo.bar),
// so variant+color is encoded as a single combined class (e.g. --filled-primary).
const VARIANT_COLOR_CLS = {
  filled:   { primary: 'GeckoButton--filled-primary' },
  outlined: { primary: 'GeckoButton--outlined-primary' },
  ghost:    { primary: 'GeckoButton--ghost-primary' },
  icon:     { primary: 'GeckoButton--icon-primary' },
} as const;

const SIZE_CLS = {
  xs: 'GeckoButton--xs',
  sm: 'GeckoButton--sm',
  md: 'GeckoButton--md',
  lg: 'GeckoButton--lg',
  xl: 'GeckoButton--xl',
} as const;

const LABEL_VARIANT_COLOR_CLS = {
  filled:   { primary: 'GeckoButton__label--filled-primary' },
  outlined: { primary: 'GeckoButton__label--outlined-primary' },
  ghost:    { primary: 'GeckoButton__label--ghost-primary' },
  icon:     { primary: 'GeckoButton__label--icon-primary' },
} as const;

const LABEL_SIZE_CLS = {
  xs: 'GeckoButton__label--xs',
  sm: 'GeckoButton__label--sm',
  md: 'GeckoButton__label--md',
  lg: 'GeckoButton__label--lg',
  xl: 'GeckoButton__label--xl',
} as const;

export const Button = ({
  children,
  variant = 'filled',
  size = 'md',
  color = 'primary',
  className,
  labelClassName,
  style,
  labelStyle,
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <Pressable
      className={twMerge(
        'GeckoButton',
        VARIANT_COLOR_CLS[variant][color],
        SIZE_CLS[size],
        className,
      )}
      style={style}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      {...rest}
    >
      {typeof children === 'string' ? (
        <Text
          className={twMerge(
            'GeckoButton__label',
            LABEL_VARIANT_COLOR_CLS[variant][color],
            LABEL_SIZE_CLS[size],
            disabled && 'GeckoButton__label--disabled',
            labelClassName,
          )}
          style={labelStyle}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

Button.displayName = 'Button';
