import type React from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { Text, View } from 'react-native';

import { Button, labelCva } from '../Button/Button';
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

  const labelText =
    loadingText ?? (typeof children === 'string' ? children : undefined);
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
        {labelText != null ? (
          <Text className={labelCva({ variant, size, color })}>
            {labelText}
          </Text>
        ) : typeof children !== 'string' ? (
          children
        ) : null}
        {spinnerPosition === 'end' ? spinner : null}
      </View>
    </Button>
  );
};

LoadingButton.displayName = 'LoadingButton';
