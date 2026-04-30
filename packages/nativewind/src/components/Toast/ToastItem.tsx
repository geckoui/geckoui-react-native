import { cva } from 'class-variance-authority';
import { useEffect, useRef } from 'react';
import type React from 'react';
import { Animated, PanResponder, Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { ToastInstance, ToastPosition } from './Toast.types';
import { variantGlyph } from './Toast.utils';

interface ToastItemProps {
  toast: ToastInstance;
  position: ToastPosition;
  onDismiss: () => void;
}

const ENTER_OFFSET = 120;
const SWIPE_DISMISS_THRESHOLD = 40;

const iconCva = cva('GeckoUIToast__icon', {
  variants: {
    variant: {
      default: 'GeckoUIToast__icon--default',
      success: 'GeckoUIToast__icon--success',
      error: 'GeckoUIToast__icon--error',
      warning: 'GeckoUIToast__icon--warning',
      info: 'GeckoUIToast__icon--info',
    },
  },
  defaultVariants: { variant: 'default' },
});

export const ToastItem = ({
  toast,
  position,
  onDismiss,
}: ToastItemProps): React.ReactElement => {
  const variant = toast.variant ?? 'default';
  const enterFrom = position === 'top' ? -ENTER_OFFSET : ENTER_OFFSET;

  const translateY = useRef(new Animated.Value(enterFrom)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const dragY = useRef(new Animated.Value(0)).current;
  const dismissedRef = useRef(false);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 12,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY, opacity]);

  const animateOut = (after: () => void) => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: enterFrom,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(after);
  };

  const handleDismiss = () => animateOut(onDismiss);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 6,
      onPanResponderMove: (_, g) => {
        const clamped =
          position === 'top' ? Math.min(0, g.dy) : Math.max(0, g.dy);
        dragY.setValue(clamped);
      },
      onPanResponderRelease: (_, g) => {
        const shouldDismiss =
          position === 'top'
            ? g.dy < -SWIPE_DISMISS_THRESHOLD
            : g.dy > SWIPE_DISMISS_THRESHOLD;
        if (shouldDismiss) {
          handleDismiss();
        } else {
          Animated.spring(dragY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(dragY, { toValue: 0, useNativeDriver: true }).start();
      },
    }),
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        opacity,
        transform: [{ translateY: Animated.add(translateY, dragY) }],
      }}
    >
      <View
        className={twMerge('GeckoUIToast', toast.className)}
        style={toast.style}
      >
        {!toast.hideIcon && (
          <View className={iconCva({ variant })}>
            <Text className="GeckoUIToast__icon-glyph">
              {variantGlyph(variant)}
            </Text>
          </View>
        )}
        <View className="GeckoUIToast__body">
          {toast.title && (
            <Text className="GeckoUIToast__title">{toast.title}</Text>
          )}
          {toast.description && (
            <Text className="GeckoUIToast__description">
              {toast.description}
            </Text>
          )}
        </View>
        {toast.action && (
          <Pressable
            className="GeckoUIToast__action"
            onPress={() => {
              toast.action?.onPress();
              handleDismiss();
            }}
            hitSlop={12}
          >
            <Text className="GeckoUIToast__action-label">
              {toast.action.label}
            </Text>
          </Pressable>
        )}
        {(toast.closable ?? true) && (
          <Pressable
            className="GeckoUIToast__dismiss"
            onPress={handleDismiss}
            hitSlop={12}
          >
            <Text className="GeckoUIToast__dismiss-icon">✕</Text>
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
};

ToastItem.displayName = 'ToastItem';
