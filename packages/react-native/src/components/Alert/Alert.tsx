import type React from 'react';
import { cva } from 'class-variance-authority';
import { Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { DynamicComponentRenderer } from '../DynamicComponentRenderer';
import type { AlertProps } from './Alert.types';

const alertCva = cva('GeckoAlert', {
  variants: {
    variant: {
      default: 'GeckoAlert--default',
      error: 'GeckoAlert--error',
      warning: 'GeckoAlert--warning',
      info: 'GeckoAlert--info',
      success: 'GeckoAlert--success',
    },
  },
  defaultVariants: { variant: 'default' },
});

const iconCva = cva('GeckoAlert__icon', {
  variants: {
    variant: {
      default: 'GeckoAlert__icon--default',
      error: 'GeckoAlert__icon--error',
      warning: 'GeckoAlert__icon--warning',
      info: 'GeckoAlert__icon--info',
      success: 'GeckoAlert__icon--success',
    },
  },
  defaultVariants: { variant: 'default' },
});

const titleCva = cva('GeckoAlert__title', {
  variants: {
    variant: {
      default: 'GeckoAlert--default',
      error: 'GeckoAlert--error',
      warning: 'GeckoAlert--warning',
      info: 'GeckoAlert--info',
      success: 'GeckoAlert--success',
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
    <View className="GeckoAlert__body">
      {icon ?? (
        <View className={twMerge(iconCva({ variant }), iconClassName)}>
          <Text className="GeckoAlert__icon-glyph">
            {DEFAULT_GLYPH[variant]}
          </Text>
        </View>
      )}
      <View className="GeckoAlert__title-wrap">
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
          className="GeckoAlert__remove"
        >
          <Text className="GeckoAlert__remove-glyph">×</Text>
        </Pressable>
      ) : null}
    </View>
    {description ? (
      <View className="GeckoAlert__description">
        <DynamicComponentRenderer
          component={description}
          className="GeckoAlert__description-text"
        />
      </View>
    ) : null}
  </View>
);

Alert.displayName = 'Alert';
