import type React from 'react';
import { TextInput } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { TextareaProps } from './Textarea.types';

const LINE_HEIGHT = 20;

export const Textarea = ({
  rows = 2,
  className,
  style,
  ...rest
}: TextareaProps): React.ReactElement => {
  const height = rows * LINE_HEIGHT + 12;

  return (
    <TextInput
      multiline
      textAlignVertical="top"
      className={twMerge('GeckoTextarea', className)}
      placeholderTextColor="#a3a3a3"
      style={[{ height }, style]}
      {...rest}
    />
  );
};

Textarea.displayName = 'Textarea';
