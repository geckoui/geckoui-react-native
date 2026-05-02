import type React from 'react';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Animated, Modal, Pressable, StyleSheet } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { GeckoUIOverlayHosts } from '../GeckoUIPortal/GeckoUIOverlayHosts';
import type { DialogOptions, DialogState } from './Dialog.types';

type HostEntry = {
  setState: (s: DialogState) => void;
  animatedDismiss: () => void;
};

const _hostStack: HostEntry[] = [];

const show = (options: DialogOptions) => {
  const top = _hostStack[_hostStack.length - 1];
  if (!top) {
    console.warn(
      'DialogHost is not mounted. Add <DialogHost /> to your app root.',
    );
    return;
  }
  top.setState({ visible: true, options });
};

const dismiss = () => {
  const top = _hostStack[_hostStack.length - 1];
  top?.animatedDismiss();
};

export function DialogHost(): React.ReactElement | null {
  const [state, setState] = useState<DialogState>({
    visible: false,
    options: null,
  });
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const entry: HostEntry = {
      setState,
      animatedDismiss: () => {
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0.95,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setState({ visible: false, options: null });
        });
      },
    };
    _hostStack.push(entry);
    return () => {
      const idx = _hostStack.indexOf(entry);
      if (idx !== -1) _hostStack.splice(idx, 1);
    };
  }, [scaleAnim, opacityAnim]);

  useEffect(() => {
    if (state.visible) {
      scaleAnim.setValue(0.95);
      opacityAnim.setValue(0);
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 120,
          friction: 10,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [state.visible, scaleAnim, opacityAnim]);

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
      animationType="none"
      statusBarTranslucent
      onRequestClose={dismissOnEsc ? dismiss : undefined}
    >
      <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
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
      </Animated.View>
      <GeckoUIOverlayHosts />
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
