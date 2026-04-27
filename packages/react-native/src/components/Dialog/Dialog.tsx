import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Animated, Modal, Pressable, StyleSheet, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { DialogOptions, DialogState } from './Dialog.types';

let _setState: ((s: DialogState) => void) | null = null;

const show = (options: DialogOptions) => {
  if (!_setState) {
    console.warn(
      'DialogHost is not mounted. Add <DialogHost /> to your app root.',
    );
    return;
  }
  _setState({ visible: true, options });
};

const dismiss = () => {
  _setState?.({ visible: false, options: null });
};

export function DialogHost(): React.ReactElement | null {
  const [state, setState] = useState<DialogState>({
    visible: false,
    options: null,
  });
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    _setState = setState;
    return () => {
      _setState = null;
    };
  }, [setState]);

  useEffect(() => {
    if (state.visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 120,
        friction: 10,
      }).start();
    } else {
      scaleAnim.setValue(0.95);
    }
  }, [state.visible]);

  if (!state.visible || !state.options) return null;

  const {
    content,
    className,
    style,
    dismissOnEsc = true,
    dismissOnOutsideClick = true,
  } = state.options;

  return (
    <Modal
      visible
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={dismissOnEsc ? dismiss : undefined}
    >
      <View style={styles.overlay}>
        <Pressable
          style={StyleSheet.absoluteFillObject}
          onPress={dismissOnOutsideClick ? dismiss : undefined}
        />
        <Animated.View
          className={twMerge('GeckoUIDialog__dialog', className)}
          style={[{ transform: [{ scale: scaleAnim }] }, style]}
        >
          {
            (typeof content === 'function'
              ? content({ dismiss })
              : content) as ReactNode
          }
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});

const Dialog = { show, dismiss };

export default Dialog;
