import type React from 'react';
import { Dimensions, Modal, Pressable, StyleSheet, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { useMenu } from '../useMenu';
import type { MenuPanelProps } from './MenuPanel.types';

export const MenuPanel = ({
  children,
  className,
}: MenuPanelProps): React.ReactElement | null => {
  const { open, closeMenu, menuPosition } = useMenu();

  if (!open) return null;

  const { height: screenHeight } = Dimensions.get('window');
  const spaceBelow = screenHeight - menuPosition.y - menuPosition.height;
  const showBelow = spaceBelow > 200;

  const panelStyle = showBelow
    ? { top: menuPosition.y + menuPosition.height + 4, left: menuPosition.x }
    : { bottom: screenHeight - menuPosition.y + 4, left: menuPosition.x };

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={closeMenu}
      statusBarTranslucent
    >
      <Pressable style={StyleSheet.absoluteFillObject} onPress={closeMenu} />
      <View
        className={twMerge('GeckoUIMenu__items', className)}
        style={[
          { position: 'absolute', minWidth: menuPosition.width },
          panelStyle,
        ]}
      >
        {children}
      </View>
    </Modal>
  );
};

MenuPanel.displayName = 'MenuPanel';
