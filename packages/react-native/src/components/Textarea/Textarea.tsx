import type React from 'react';
import { TextInput } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { TextareaProps } from './Textarea.types';

const LINE_HEIGHT = 22;
const VERTICAL_PADDING = 16;

export const Textarea = ({
  rows = 2,
  className,
  style,
  ...rest
}: TextareaProps): React.ReactElement => {
  const height = rows * LINE_HEIGHT + VERTICAL_PADDING;

  return (
    <TextInput
      multiline
      textAlignVertical="top"
      className={twMerge('GeckoUITextarea', className)}
      style={[{ height }, style]}
      {...rest}
    />
  );
};

Textarea.displayName = 'Textarea';
