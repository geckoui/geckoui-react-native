import { cva } from 'class-variance-authority';
import type React from 'react';
import { Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { DynamicComponentRenderer } from '../DynamicComponentRenderer';
import type { AlertProps } from './Alert.types';

const alertCva = cva('GeckoUIAlert', {
  variants: {
    variant: {
      default: 'GeckoUIAlert--default',
      error: 'GeckoUIAlert--error',
      warning: 'GeckoUIAlert--warning',
      info: 'GeckoUIAlert--info',
      success: 'GeckoUIAlert--success',
    },
  },
  defaultVariants: { variant: 'default' },
});

const iconCva = cva('GeckoUIAlert__icon', {
  variants: {
    variant: {
      default: 'GeckoUIAlert__icon--default',
      error: 'GeckoUIAlert__icon--error',
      warning: 'GeckoUIAlert__icon--warning',
      info: 'GeckoUIAlert__icon--info',
      success: 'GeckoUIAlert__icon--success',
    },
  },
  defaultVariants: { variant: 'default' },
});

const titleCva = cva('GeckoUIAlert__title', {
  variants: {
    variant: {
      default: 'GeckoUIAlert--default',
      error: 'GeckoUIAlert--error',
      warning: 'GeckoUIAlert--warning',
      info: 'GeckoUIAlert--info',
      success: 'GeckoUIAlert--success',
    },
  },
  defaultVariants: { variant: 'default' },
});

const DEFAULT_GLYPH: Record<string, string> = {
  error: '✕',
  warning: '!',
  info: 'i',
  success: '✓',
  default: 'i',
};

export const Alert = ({
  variant = 'default',
  title,
  description,
  icon,
  iconClassName,
  onRemove,
  className,
  style,
  ...rest
}: AlertProps): React.ReactElement => (
  <View
    className={twMerge(alertCva({ variant }), className)}
    style={style}
    {...rest}
  >
    <View className="GeckoUIAlert__body">
      {icon ?? (
        <View className={twMerge(iconCva({ variant }), iconClassName)}>
          <Text className="GeckoUIAlert__icon-glyph">
            {DEFAULT_GLYPH[variant]}
          </Text>
        </View>
      )}
      <View className="GeckoUIAlert__title-wrap">
        <DynamicComponentRenderer
          component={title}
          className={titleCva({ variant })}
        />
      </View>
      {onRemove ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          onPress={onRemove}
          className="GeckoUIAlert__remove"
          hitSlop={12}
        >
          <Text className="GeckoUIAlert__remove-glyph">×</Text>
        </Pressable>
      ) : null}
    </View>
    {description ? (
      <View className="GeckoUIAlert__description">
        <DynamicComponentRenderer
          component={description}
          className="GeckoUIAlert__description-text"
        />
      </View>
    ) : null}
  </View>
);

Alert.displayName = 'Alert';
