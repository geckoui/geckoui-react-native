import { cva } from 'class-variance-authority';
import { remapProps } from 'nativewind';
import type React from 'react';
import { Pressable } from 'react-native';

import { DynamicComponentRenderer } from '../DynamicComponentRenderer';
import type { ButtonProps } from './Button.types';

const buttonCva = cva('GeckoUIButton', {
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
      xs: 'GeckoUIButton--xs',
      sm: 'GeckoUIButton--sm',
      md: 'GeckoUIButton--md',
      lg: 'GeckoUIButton--lg',
      xl: 'GeckoUIButton--xl',
    },
  },
  compoundVariants: [
    {
      variant: 'filled',
      color: 'primary',
      class: 'GeckoUIButton--filled-primary',
    },
    {
      variant: 'outlined',
      color: 'primary',
      class: 'GeckoUIButton--outlined-primary',
    },
    {
      variant: 'ghost',
      color: 'primary',
      class: 'GeckoUIButton--ghost-primary',
    },
    { variant: 'icon', color: 'primary', class: 'GeckoUIButton--icon-primary' },
  ],
  defaultVariants: { variant: 'filled', color: 'primary', size: 'md' },
});

export const labelCva = cva('GeckoUIButton__label', {
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
      xs: 'GeckoUIButton__label--xs',
      sm: 'GeckoUIButton__label--sm',
      md: 'GeckoUIButton__label--md',
      lg: 'GeckoUIButton__label--lg',
      xl: 'GeckoUIButton__label--xl',
    },
    disabled: {
      true: 'GeckoUIButton__label--disabled',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'filled',
      color: 'primary',
      class: 'GeckoUIButton__label--filled-primary',
    },
    {
      variant: 'outlined',
      color: 'primary',
      class: 'GeckoUIButton__label--outlined-primary',
    },
    {
      variant: 'ghost',
      color: 'primary',
      class: 'GeckoUIButton__label--ghost-primary',
    },
    {
      variant: 'icon',
      color: 'primary',
      class: 'GeckoUIButton__label--icon-primary',
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
}: ButtonProps): React.ReactElement | null => (
  <Pressable
    className={buttonCva({ variant, size, color })}
    style={style}
    disabled={disabled}
    accessibilityRole="button"
    accessibilityState={{ disabled: !!disabled }}
    {...rest}
  >
    <DynamicComponentRenderer
      component={children}
      className={labelCva({ variant, size, color, disabled: !!disabled })}
      style={labelStyle}
    />
  </Pressable>
);

export const Button = remapProps(ButtonImpl, {
  className: 'style',
  labelClassName: 'labelStyle',
});

Button.displayName = 'Button';
