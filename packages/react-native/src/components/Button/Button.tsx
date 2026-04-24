import type React from 'react';
import { remapProps } from 'nativewind';
import { Pressable, Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { ButtonProps } from './Button.types';

const VARIANT_COLOR_CLS = {
  filled: { primary: 'GeckoButton--filled-primary' },
  outlined: { primary: 'GeckoButton--outlined-primary' },
  ghost: { primary: 'GeckoButton--ghost-primary' },
  icon: { primary: 'GeckoButton--icon-primary' },
} as const;

const SIZE_CLS = {
  xs: 'GeckoButton--xs',
  sm: 'GeckoButton--sm',
  md: 'GeckoButton--md',
  lg: 'GeckoButton--lg',
  xl: 'GeckoButton--xl',
} as const;

const LABEL_VARIANT_COLOR_CLS = {
  filled: { primary: 'GeckoButton__label--filled-primary' },
  outlined: { primary: 'GeckoButton__label--outlined-primary' },
  ghost: { primary: 'GeckoButton__label--ghost-primary' },
  icon: { primary: 'GeckoButton__label--icon-primary' },
} as const;

const LABEL_SIZE_CLS = {
  xs: 'GeckoButton__label--xs',
  sm: 'GeckoButton__label--sm',
  md: 'GeckoButton__label--md',
  lg: 'GeckoButton__label--lg',
  xl: 'GeckoButton__label--xl',
} as const;

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
      className={twMerge(
        'GeckoButton',
        VARIANT_COLOR_CLS[variant][color],
        SIZE_CLS[size],
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
