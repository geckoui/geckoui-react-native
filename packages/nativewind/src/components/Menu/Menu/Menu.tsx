import { Children, useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { isMenuTrigger } from '../Menu.utils';
import { MenuButton } from '../MenuButton';
import { MenuPanel } from '../MenuPanel';
import { MenuContext } from '../useMenu';
import type { MenuPosition, MenuProps } from './Menu.types';

export const Menu = ({
  label,
  disabled = false,
  className,
  style,
  menuClassName,
  buttonClassName,
  children,
}: MenuProps): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<MenuPosition>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const wrapperRef = useRef<View>(null);

  const openMenu = useCallback(() => {
    if (disabled || open) return;
    wrapperRef.current?.measureInWindow((x, y, width, height) => {
      setMenuPosition({ x, y, width, height });
      setOpen(true);
    });
  }, [disabled, open]);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    if (open) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [open, openMenu, closeMenu]);

  const childArray = Children.toArray(children);
  const trigger = childArray.find(isMenuTrigger);
  const menuItems = childArray.filter((child) => !isMenuTrigger(child));

  return (
    <MenuContext.Provider
      value={{ open, openMenu, closeMenu, toggleMenu, disabled, menuPosition }}
    >
      <View
        ref={wrapperRef}
        className={twMerge('GeckoUIMenu', className)}
        style={style}
      >
        {trigger ?? (
          <MenuButton className={buttonClassName}>{label ?? 'Menu'}</MenuButton>
        )}
        <MenuPanel className={menuClassName}>{menuItems}</MenuPanel>
      </View>
    </MenuContext.Provider>
  );
};

Menu.displayName = 'Menu';
