import type React from 'react';
import { Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { DynamicComponentRenderer } from '../DynamicComponentRenderer';
import { Tooltip } from '../Tooltip';
import type { LabelProps } from './Label.types';

export const Label = ({
  children,
  required,
  tooltip,
  tooltipIcon,
  tooltipClassName,
  textClassName,
  textStyle,
  className,
  style,
  ...rest
}: LabelProps): React.ReactElement => (
  <View className={twMerge('GeckoUILabel', className)} style={style}>
    <Text
      className={twMerge('GeckoUILabel__text', textClassName)}
      style={textStyle}
      {...rest}
    >
      {children}
    </Text>

    {required && <Text className="GeckoUILabel__required-indicator">*</Text>}

    {tooltip ? (
      <Tooltip
        content={tooltip}
        contentClassName={tooltipClassName}
        hitSlop={12}
      >
        {tooltipIcon ? (
          <DynamicComponentRenderer component={tooltipIcon} />
        ) : (
          <View className="GeckoUILabel__tooltip-icon">
            <Text className="GeckoUILabel__tooltip-icon-glyph">!</Text>
          </View>
        )}
      </Tooltip>
    ) : null}
  </View>
);

Label.displayName = 'Label';
