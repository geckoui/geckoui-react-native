import { cssInterop } from 'nativewind';
import type React from 'react';
import { ActivityIndicator } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { SpinnerProps } from './Spinner.types';

cssInterop(ActivityIndicator, {
  className: {
    target: 'style',
    nativeStyleToProp: { color: true },
  },
});

export const Spinner = ({
  size = 'small',
  className,
  style,
  ...rest
}: SpinnerProps): React.ReactElement => (
  <ActivityIndicator
    size={size}
    className={twMerge('GeckoUISpinnerIcon', className)}
    style={style}
    {...rest}
  />
);

Spinner.displayName = 'Spinner';
