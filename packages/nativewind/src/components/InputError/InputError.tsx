import type React from 'react';
import { Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { InputErrorProps } from './InputError.types';

export const InputError = ({
  children,
  className,
  style,
  ...rest
}: InputErrorProps): React.ReactElement => (
  <Text
    className={twMerge('GeckoUIInputError', className)}
    style={style}
    {...rest}
  >
    {children}
  </Text>
);

InputError.displayName = 'InputError';
