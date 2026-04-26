import type React from 'react';
import { Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { LabelProps } from './Label.types';

export const Label = ({
  children,
  required,
  className,
  style,
  ...rest
}: LabelProps): React.ReactElement => (
  <Text className={twMerge('GeckoLabel', className)} style={style} {...rest}>
    {children}
    {required ? (
      <Text className="GeckoLabel__required-indicator">*</Text>
    ) : null}
  </Text>
);

Label.displayName = 'Label';
