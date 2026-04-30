import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { useSelect } from '../Select.context';
import type { SelectEmptyProps } from './SelectEmpty.types';

const SelectEmpty = ({ children, className }: SelectEmptyProps): ReactNode => {
  const { isEmpty } = useSelect();
  if (!isEmpty) return null;
  return (
    <View className={twMerge('GeckoUISelectEmpty', className)}>
      <Text className="GeckoUISelectEmpty__text">
        {children ?? 'No options'}
      </Text>
    </View>
  );
};

SelectEmpty.displayName = 'SelectEmpty';

export { SelectEmpty };
