import type React from 'react';
import { Children, isValidElement } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { Label } from '@geckoui/nativewind';
import type { Control } from 'react-hook-form';

import { RHFError } from '../RHFError';
import type { RHFInputGroupProps } from './RHFInputGroup.types';

interface RHFChildProps {
  name?: string;
  control?: Control;
}

const findRHFChild = (node: React.ReactNode): React.ReactElement | null => {
  if (Array.isArray(node)) {
    for (const child of node) {
      const found = findRHFChild(child);
      if (found) return found;
    }
    return null;
  }
  if (!isValidElement(node)) return null;
  const type = node.type as { displayName?: string };
  if (type?.displayName?.toLowerCase().startsWith('rhf')) {
    return node;
  }
  const childProps = node.props as { children?: React.ReactNode };
  if (childProps?.children) return findRHFChild(childProps.children);
  return null;
};

/**
 * Convenience layout that renders a Label, the wrapped RHF input, and the
 * matching RHFError beneath it. Auto-detects the inner RHF component (by
 * `displayName` starting with "RHF") to pull `name` and `control`.
 */
export const RHFInputGroup = ({
  label,
  required,
  tooltip,
  tooltipIcon,
  tooltipClassName,
  children,
  className,
  labelClassName,
  errorClassName,
  style,
  ...labelRest
}: RHFInputGroupProps): React.ReactElement => {
  const rhfChild = Children.toArray(children).reduce<React.ReactElement | null>(
    (acc, child) => acc ?? findRHFChild(child),
    null,
  );
  const { name, control } = (rhfChild?.props ?? {}) as RHFChildProps;

  return (
    <View className={twMerge('GeckoUIRHFInputGroup', className)} style={style}>
      {label ? (
        <Label
          className={labelClassName}
          required={required}
          tooltip={tooltip}
          tooltipIcon={tooltipIcon}
          tooltipClassName={tooltipClassName}
          {...labelRest}
        >
          {label}
        </Label>
      ) : null}
      {children}
      {name ? (
        <RHFError control={control} name={name} className={errorClassName} />
      ) : null}
    </View>
  );
};

RHFInputGroup.displayName = 'RHFInputGroup';
