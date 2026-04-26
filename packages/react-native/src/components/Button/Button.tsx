import type React from 'react';
import { cva } from 'class-variance-authority';
import { remapProps } from 'nativewind';
import { Pressable, Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { ButtonProps } from './Button.types';

const buttonCva = cva('GeckoButton', {
  variants: {
    variant: {
      filled: '',
      outlined: '',
      ghost: '',
      icon: '',
    },
    color: {
      primary: '',
    },
    size: {
      xs: 'GeckoButton--xs',
      sm: 'GeckoButton--sm',
      md: 'GeckoButton--md',
      lg: 'GeckoButton--lg',
      xl: 'GeckoButton--xl',
    },
  },
  compoundVariants: [
    {
      variant: 'filled',
      color: 'primary',
      class: 'GeckoButton--filled-primary',
    },
    {
      variant: 'outlined',
      color: 'primary',
      class: 'GeckoButton--outlined-primary',
    },
    { variant: 'ghost', color: 'primary', class: 'GeckoButton--ghost-primary' },
    { variant: 'icon', color: 'primary', class: 'GeckoButton--icon-primary' },
  ],
  defaultVariants: { variant: 'filled', color: 'primary', size: 'md' },
});

export const labelCva = cva('GeckoButton__label', {
  variants: {
    variant: {
      filled: '',
      outlined: '',
      ghost: '',
      icon: '',
    },
    color: {
      primary: '',
    },
    size: {
      xs: 'GeckoButton__label--xs',
      sm: 'GeckoButton__label--sm',
      md: 'GeckoButton__label--md',
      lg: 'GeckoButton__label--lg',
      xl: 'GeckoButton__label--xl',
    },
    disabled: {
      true: 'GeckoButton__label--disabled',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'filled',
      color: 'primary',
      class: 'GeckoButton__label--filled-primary',
    },
    {
      variant: 'outlined',
      color: 'primary',
      class: 'GeckoButton__label--outlined-primary',
    },
    {
      variant: 'ghost',
      color: 'primary',
      class: 'GeckoButton__label--ghost-primary',
    },
    {
      variant: 'icon',
      color: 'primary',
      class: 'GeckoButton__label--icon-primary',
    },
  ],
  defaultVariants: {
    variant: 'filled',
    color: 'primary',
    size: 'md',
    disabled: false,
  },
});

const ButtonImpl = ({
  children,
  variant = 'filled',
  size = 'md',
  color = 'primary',
  className: _className,
  labelClassName: _labelClassName,
  style,
  labelStyle,
  disabled,
  ...rest
}: ButtonProps): React.ReactElement | null => {
  return (
    <Pressable
      className={buttonCva({ variant, size, color })}
      style={style}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      {...rest}
    >
      {typeof children === 'string' ? (
        <Text
          className={twMerge(
            labelCva({ variant, size, color, disabled: !!disabled }),
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

export const Button = remapProps(ButtonImpl, {
  className: 'style',
  labelClassName: 'labelStyle',
});

Button.displayName = 'Button';
