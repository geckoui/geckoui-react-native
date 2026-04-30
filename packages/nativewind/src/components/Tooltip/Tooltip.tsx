import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import type React from 'react';
import { Pressable, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { TooltipProps } from './Tooltip.types';
import { getActiveTooltipId, hideTooltip, showTooltip } from './TooltipHost';

let _idCounter = 0;
const nextId = () => ++_idCounter;

export const Tooltip = ({
  content,
  children,
  placement = 'auto',
  disabled,
  longPress = false,
  duration = 0,
  triggerAsChild = false,
  contentClassName,
  contentStyle,
  className,
  style,
  hitSlop,
}: TooltipProps): React.ReactElement => {
  const triggerRef = useRef<View>(null);
  const idRef = useRef<number>(0);
  if (idRef.current === 0) idRef.current = nextId();
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [, setOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
      hideTooltip(idRef.current);
    };
  }, []);

  const open = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      showTooltip({
        id: idRef.current,
        content,
        anchor: { x, y, width, height },
        placement,
        contentClassName,
        contentStyle,
      });
      setOpen(true);
      if (duration > 0) {
        if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
        dismissTimerRef.current = setTimeout(() => {
          hideTooltip(idRef.current);
          setOpen(false);
        }, duration);
      }
    });
  };

  const close = () => {
    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = null;
    }
    hideTooltip(idRef.current);
    setOpen(false);
  };

  const toggle = () => {
    if (disabled) return;
    if (getActiveTooltipId() === idRef.current) {
      close();
    } else {
      open();
    }
  };

  if (triggerAsChild) {
    const child = Children.only(children);
    if (isValidElement(child)) {
      const childProps = child.props as Record<string, unknown>;
      const childRef = (child as { ref?: React.Ref<unknown> }).ref;

      const setRef = (node: unknown) => {
        (triggerRef as React.MutableRefObject<unknown>).current = node;
        if (typeof childRef === 'function') childRef(node);
        else if (childRef && typeof childRef === 'object')
          (childRef as React.MutableRefObject<unknown>).current = node;
      };

      const childOnPress = childProps.onPress as
        | ((...args: unknown[]) => void)
        | undefined;
      const childOnLongPress = childProps.onLongPress as
        | ((...args: unknown[]) => void)
        | undefined;

      return cloneElement(
        child as React.ReactElement,
        {
          ref: setRef,
          onPress: longPress
            ? childOnPress
            : (...args: unknown[]) => {
                childOnPress?.(...args);
                toggle();
              },
          onLongPress: longPress
            ? (...args: unknown[]) => {
                childOnLongPress?.(...args);
                toggle();
              }
            : childOnLongPress,
        } as Record<string, unknown>,
      );
    }
  }

  return (
    <Pressable
      ref={triggerRef}
      className={twMerge('GeckoUITooltip__trigger', className)}
      style={style}
      disabled={disabled}
      hitSlop={hitSlop}
      onPress={longPress ? undefined : toggle}
      onLongPress={longPress ? toggle : undefined}
    >
      {children}
    </Pressable>
  );
};

Tooltip.displayName = 'Tooltip';
