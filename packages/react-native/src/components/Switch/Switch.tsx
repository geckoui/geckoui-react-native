import type React from 'react';
import { useEffect, useRef } from 'react';
import { cva } from 'class-variance-authority';
import { remapProps } from 'nativewind';
import { Animated, Pressable } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { SwitchProps } from './Switch.types';

const trackCva = cva('GeckoSwitch', {
  variants: {
    size: {
      sm: 'GeckoSwitch--sm',
      md: 'GeckoSwitch--md',
    },
    on: {
      true: 'GeckoSwitch--on',
      false: '',
    },
    disabled: {
      true: 'GeckoSwitch--disabled',
      false: '',
    },
  },
  defaultVariants: { size: 'md', on: false, disabled: false },
});

const thumbCva = cva('GeckoSwitch__thumb', {
  variants: {
    size: {
      sm: 'GeckoSwitch__thumb--sm',
      md: 'GeckoSwitch__thumb--md',
    },
  },
  defaultVariants: { size: 'md' },
});

const SwitchImpl = ({
  value = false,
  onChange,
  size = 'md',
  disabled,
  className,
  thumbClassName: _thumbClassName,
  style,
  thumbStyle,
  ...rest
}: SwitchProps): React.ReactElement => {
  const translateX = useRef(new Animated.Value(0)).current;
  const travel = useRef(0);
  const ready = useRef(false);

  useEffect(() => {
    if (!ready.current) return;
    Animated.timing(translateX, {
      toValue: value ? travel.current : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [value]);

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => onChange?.(!value)}
      className={twMerge(
        trackCva({ size, on: value, disabled: !!disabled }),
        className,
      )}
      style={style}
      onLayout={(e) => {
        const trackW = e.nativeEvent.layout.width;
        travel.current = trackW;
      }}
      {...rest}
    >
      <Animated.View
        className={thumbCva({ size })}
        style={[{ transform: [{ translateX }] }, thumbStyle]}
        onLayout={(e) => {
          if (ready.current) return;
          const thumbW = e.nativeEvent.layout.width;
          travel.current = travel.current - thumbW - 4;
          translateX.setValue(value ? travel.current : 0);
          ready.current = true;
        }}
      />
    </Pressable>
  );
};

export const Switch = remapProps(SwitchImpl, {
  thumbClassName: 'thumbStyle',
});

Switch.displayName = 'Switch';
