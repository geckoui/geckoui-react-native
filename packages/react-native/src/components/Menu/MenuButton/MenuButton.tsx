import type React from 'react';
import { Pressable, Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { useMenu } from '../useMenu';
import type { MenuButtonProps } from './MenuButton.types';

export const MenuButton = ({
  children,
  className,
}: MenuButtonProps): React.ReactElement => {
  const { toggleMenu, disabled } = useMenu();

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={toggleMenu}
      className={twMerge('GeckoUIMenu__button', className)}
    >
      <Text className="GeckoUIMenu__button-text">{children}</Text>
    </Pressable>
  );
};

MenuButton.displayName = 'MenuButton';
