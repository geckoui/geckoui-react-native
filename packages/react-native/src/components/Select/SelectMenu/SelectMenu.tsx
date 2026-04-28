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
import { isHideSelectOption, isSelectEmpty } from '../Select.utils';
import { SelectDropdownSearch } from '../SelectDropdownSearch';
import { SelectEmpty } from '../SelectEmpty';
import { SelectOption } from '../SelectOption';
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
  const { open, closeMenu, filterable, options, keyword, isEmpty } = ctx;
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

  const visibleOptions = useMemo(
    () =>
      options.filter(
        (opt) =>
          !isHideSelectOption({
            keyword: keyword ?? '',
            label: opt.label,
            visibility: opt.visibility,
            isEmpty,
          }),
      ),
    [options, keyword, isEmpty],
  );

  const renderItem = useCallback(
    ({ item }: { item: (typeof visibleOptions)[number] }) => (
      <SelectOption {...item.props} value={item.value} label={item.label} />
    ),
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
                data={visibleOptions}
                keyExtractor={(item, index) =>
                  `${index}-${JSON.stringify(item.value)}`
                }
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="none"
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
    visibleOptions,
    renderItem,
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
