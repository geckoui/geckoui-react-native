import React, {
  Children,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactElement, ReactNode } from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  Platform,
  Pressable,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { twMerge } from 'tailwind-merge';

import { SelectContext, useSelect } from '../Select.context';
import {
  isHideSelectOption,
  isSelectEmpty,
  isSelectTrigger,
} from '../Select.utils';
import { SelectDropdownSearch } from '../SelectDropdownSearch';
import { SelectEmpty } from '../SelectEmpty';
import type { SelectOptionProps } from '../SelectOption/SelectOption.types';
import type { SelectContextProps } from '../Select/Select.types';
import { createSelectMenuSlot, setSelectMenuNode } from './SelectMenuHost';
import type { SelectMenuProps } from './SelectMenu.types';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const SelectMenu = ({
  children,
  className,
  style,
}: SelectMenuProps): ReactNode => {
  const ctx = useSelect();
  const { open, closeMenu, filterable, keyword, isEmpty } = ctx;
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [slotId] = useState(() => createSelectMenuSlot());
  const insets = useSafeAreaInsets();
  const isKeyboardOpen = keyboardHeight > 0;
  const maxMenuHeight = isKeyboardOpen
    ? SCREEN_HEIGHT - keyboardHeight - insets.top - 16
    : SCREEN_HEIGHT * 0.6;

  useEffect(() => {
    return () => setSelectMenuNode(slotId, null);
  }, [slotId]);

  useEffect(() => {
    const showEvt =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvt =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const showSub = Keyboard.addListener(showEvt, (e) =>
      setKeyboardHeight(e.endCoordinates?.height ?? 0),
    );
    const hideSub = Keyboard.addListener(hideEvt, () => setKeyboardHeight(0));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const customEmpty = useMemo(
    () =>
      Children.toArray(children).find(isSelectEmpty) as
        | ReactElement
        | undefined,
    [children],
  );

  const customSearch = useMemo(
    () =>
      Children.toArray(children).find(
        (el) =>
          React.isValidElement(el) &&
          (el.type as { displayName?: string })?.displayName ===
            'SelectDropdownSearch',
      ) as ReactElement | undefined,
    [children],
  );

  const showSearch = filterable || !!customSearch;

  const items = useMemo(() => {
    const arr: ReactElement[] = [];
    Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;
      const displayName = (child.type as { displayName?: string })?.displayName;
      if (displayName === 'SelectDropdownSearch') return;
      if (displayName === 'SelectEmpty') return;
      if (isSelectTrigger(child)) return;
      if (displayName === 'SelectOption') {
        const props = child.props as SelectOptionProps<unknown>;
        if (
          isHideSelectOption({
            keyword,
            label: props.label,
            visibility: props.visibility,
            isEmpty,
          })
        ) {
          return;
        }
      }
      arr.push(child as ReactElement);
    });
    return arr;
  }, [children, keyword, isEmpty]);

  const renderItem = useCallback(
    ({ item }: { item: ReactElement }) => item,
    [],
  );

  const keyExtractor = useCallback(
    (item: ReactElement, index: number) =>
      item.key != null ? `${index}-${item.key}` : `${index}`,
    [],
  );

  useEffect(() => {
    if (!open) {
      setSelectMenuNode(slotId, null);
      return;
    }

    setSelectMenuNode(
      slotId,
      <SelectContext.Provider value={ctx as SelectContextProps<unknown>}>
        <View
          className="GeckoUISelectMenu__overlay"
          style={{ elevation: 1000 }}
        >
          <Pressable
            className="GeckoUISelectMenu__backdrop"
            onPress={closeMenu}
          />
          <View
            className="GeckoUISelectMenu__container"
            pointerEvents="box-none"
            style={{
              paddingBottom: isKeyboardOpen
                ? Math.max(0, keyboardHeight - 20)
                : 0,
            }}
          >
            <View
              className={twMerge('GeckoUISelectMenu', className)}
              style={[{ maxHeight: maxMenuHeight }, style]}
            >
              {showSearch && (customSearch ?? <SelectDropdownSearch />)}
              <FlatList
                className="GeckoUISelectMenu__list"
                contentContainerClassName="GeckoUISelectMenu__items"
                contentContainerStyle={{
                  paddingBottom: 16 + (isKeyboardOpen ? 16 : insets.bottom),
                  gap: 2,
                }}
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="none"
                data={items}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ListEmptyComponent={customEmpty ?? <SelectEmpty />}
              />
            </View>
          </View>
        </View>
      </SelectContext.Provider>,
    );
  }, [
    slotId,
    open,
    ctx,
    className,
    style,
    showSearch,
    customSearch,
    customEmpty,
    items,
    renderItem,
    keyExtractor,
    closeMenu,
    keyboardHeight,
    isKeyboardOpen,
    maxMenuHeight,
    insets.bottom,
  ]);

  return null;
};

SelectMenu.displayName = 'SelectMenu';

export { SelectMenu };
