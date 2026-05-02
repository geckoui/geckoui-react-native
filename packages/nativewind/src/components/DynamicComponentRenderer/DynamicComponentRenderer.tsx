import type { FC, ReactNode } from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { Text } from 'react-native';

type DynamicComponentRendererProps<T = Record<string, unknown>> = T & {
  component?: FC<T> | ReactNode;
  className?: string;
  style?: StyleProp<TextStyle>;
};

export const DynamicComponentRenderer = <T extends Record<string, unknown>>({
  component,
  className,
  style,
  ...props
}: DynamicComponentRendererProps<T>): ReactNode => {
  if (component === null || component === undefined || component === '')
    return null;

  if (typeof component === 'function') {
    const Component = component as FC<T>;
    return <Component {...(props as T)} />;
  }

  if (typeof component === 'string' || typeof component === 'number') {
    return (
      <Text className={className} style={style}>
        {component}
      </Text>
    );
  }

  if (
    Array.isArray(component) &&
    component.every(
      (item) => typeof item === 'string' || typeof item === 'number',
    )
  ) {
    return (
      <Text className={className} style={style}>
        {(component as (string | number)[]).join('')}
      </Text>
    );
  }

  return component as ReactNode;
};
