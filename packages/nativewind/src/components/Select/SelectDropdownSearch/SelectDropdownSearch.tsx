import { forwardRef } from 'react';
import { Text, TextInput, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { Input } from '../../Input/Input';
import { useSelect } from '../Select.context';

interface SelectDropdownSearchProps {
  placeholder?: string;
  className?: string;
  wrapperClassName?: string;
}

const SelectDropdownSearch = forwardRef<TextInput, SelectDropdownSearchProps>(
  ({ placeholder = 'Search options...', className, wrapperClassName }, ref) => {
    const { keyword, setKeyword } = useSelect();

    return (
      <View
        className={twMerge(
          'GeckoUISelectDropdownSearch__wrapper',
          wrapperClassName,
        )}
      >
        <Input
          ref={ref}
          value={keyword}
          onChangeText={setKeyword}
          placeholder={placeholder}
          className={twMerge('GeckoUISelectDropdownSearch', className)}
          prefix={<Text className="GeckoUISelectDropdownSearch__icon">⌕</Text>}
          autoFocus={false}
        />
      </View>
    );
  },
);

SelectDropdownSearch.displayName = 'SelectDropdownSearch';

export { SelectDropdownSearch };
export type { SelectDropdownSearchProps };
