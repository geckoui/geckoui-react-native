import type React from 'react';
import { Pressable, Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { useMenu } from '../useMenu';
import type { MenuItemProps } from './MenuItem.types';

export const MenuItem = ({
  disabled,
  className,
  onClick,
  children,
}: MenuItemProps): React.ReactElement => {
  const { closeMenu } = useMenu();

  const handlePress = () => {
    if (disabled) return;
    onClick?.();
    closeMenu();
  };

  return (
    <Pressable
      accessibilityRole="menuitem"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={handlePress}
      className={twMerge(
        'GeckoUIMenu__item',
        disabled && 'GeckoUIMenu__item--disabled',
        className,
      )}
    >
      <Text
        className={twMerge(
          'GeckoUIMenu__item-text',
          disabled && 'GeckoUIMenu__item-text--disabled',
        )}
      >
        {children}
      </Text>
    </Pressable>
  );
};

MenuItem.displayName = 'MenuItem';
