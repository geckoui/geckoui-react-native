import type React from 'react';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { twMerge } from 'tailwind-merge';

type PickerOptions = {
  content: (props: { dismiss: () => void }) => ReactNode;
  className?: string;
};

type HostEntry = {
  show: (opts: PickerOptions) => void;
  dismiss: () => void;
};

const _hostStack: HostEntry[] = [];

const show = (opts: PickerOptions): void => {
  const top = _hostStack[_hostStack.length - 1];
  if (!top) {
    console.warn(
      'CalendarPickerHost is not mounted. Add <CalendarPickerHost /> to your app root.',
    );
    return;
  }
  top.show(opts);
};

const dismiss = (): void => {
  _hostStack[_hostStack.length - 1]?.dismiss();
};

export const CalendarPicker = { show, dismiss };

export function CalendarPickerHost(): React.ReactElement | null {
  const [state, setState] = useState<{
    visible: boolean;
    opts: PickerOptions | null;
  }>({ visible: false, opts: null });
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDismiss = () => {
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
      ]).start(() => setState({ visible: false, opts: null }));
    };

    const entry: HostEntry = {
      show: (opts) => setState({ visible: true, opts }),
      dismiss: animateDismiss,
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

  if (!state.visible || !state.opts) return null;

  const { content, className } = state.opts;
  const handleDismiss = () => _hostStack[_hostStack.length - 1]?.dismiss();

  return (
    <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
      <Pressable
        style={StyleSheet.absoluteFillObject}
        onPress={handleDismiss}
      />
      <Animated.View
        className={twMerge('GeckoUICalendarPicker', className)}
        style={{ transform: [{ scale: scaleAnim }] }}
      >
        {content({ dismiss: handleDismiss })}
      </Animated.View>
    </Animated.View>
  );
}

CalendarPickerHost.displayName = 'CalendarPickerHost';

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});
