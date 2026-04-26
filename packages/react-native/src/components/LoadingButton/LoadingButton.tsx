import type React from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { View } from 'react-native';

import { Button, labelCva } from '../Button/Button';
import { DynamicComponentRenderer } from '../DynamicComponentRenderer';
import { Spinner } from '../Spinner';
import type { LoadingButtonProps } from './LoadingButton.types';

const spinnerCva = cva('', {
  variants: {
    variant: { filled: '', outlined: '', ghost: '', icon: '' },
    color: { primary: '' },
  },
  compoundVariants: [
    {
      variant: 'filled',
      color: 'primary',
      class: 'GeckoLoadingButton__spinner--filled-primary',
    },
    {
      variant: 'outlined',
      color: 'primary',
      class: 'GeckoLoadingButton__spinner--outlined-primary',
    },
    {
      variant: 'ghost',
      color: 'primary',
      class: 'GeckoLoadingButton__spinner--ghost-primary',
    },
    {
      variant: 'icon',
      color: 'primary',
      class: 'GeckoLoadingButton__spinner--icon-primary',
    },
  ],
  defaultVariants: { variant: 'filled', color: 'primary' },
});

export const LoadingButton = ({
  loading,
  spinnerPosition = 'start',
  loadingText,
  spinnerClassName,
  disabled,
  children,
  variant = 'filled',
  size = 'md',
  color = 'primary',
  ...rest
}: LoadingButtonProps): React.ReactElement => {
  if (!loading) {
    return (
      <Button
        variant={variant}
        size={size}
        color={color}
        disabled={disabled}
        {...rest}
      >
        {children}
      </Button>
    );
  }

  const spinner = (
    <Spinner
      size="small"
      className={twMerge(spinnerCva({ variant, color }), spinnerClassName)}
    />
  );

  return (
    <Button variant={variant} size={size} color={color} disabled {...rest}>
      <View className="flex-row items-center gap-1.5">
        {spinnerPosition === 'start' ? spinner : null}
        <DynamicComponentRenderer
          component={loadingText ?? children}
          className={labelCva({ variant, size, color })}
        />
        {spinnerPosition === 'end' ? spinner : null}
      </View>
    </Button>
  );
};

LoadingButton.displayName = 'LoadingButton';
