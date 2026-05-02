import { useEffect, useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { dismissMenuPanel, showMenuPanel } from '../MenuPanelHost';
import { MenuContext, useMenu } from '../useMenu';
import type { MenuPanelProps } from './MenuPanel.types';

export const MenuPanel = ({ children, className }: MenuPanelProps): null => {
  const menuCtxValue = useMenu();
  const { open, closeMenu, menuPosition } = menuCtxValue;

  // Keep a fresh snapshot of the panel ReactNode so the effect always has
  // the latest layout position and context value without needing them as deps.
  const contentRef = useRef<React.ReactNode>(null);

  if (open) {
    const { height: screenHeight } = Dimensions.get('window');
    const spaceBelow = screenHeight - menuPosition.y - menuPosition.height;
    const showBelow = spaceBelow > 200;
    const panelStyle = showBelow
      ? { top: menuPosition.y + menuPosition.height + 4, left: menuPosition.x }
      : { bottom: screenHeight - menuPosition.y + 4, left: menuPosition.x };

    contentRef.current = (
      <MenuContext.Provider value={menuCtxValue}>
        <View
          className={twMerge('GeckoUIMenu__items', className)}
          style={[
            { position: 'absolute', minWidth: menuPosition.width },
            panelStyle,
          ]}
        >
          {children}
        </View>
      </MenuContext.Provider>
    );
  }

  useEffect(() => {
    if (!open) {
      dismissMenuPanel();
      return;
    }
    showMenuPanel({ content: contentRef.current, onClose: closeMenu });
  }, [open, closeMenu]);

  useEffect(() => {
    return () => dismissMenuPanel();
  }, []);

  return null;
};

MenuPanel.displayName = 'MenuPanel';
