import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type {
  ToastHostProps,
  ToastInstance,
  ToastOptions,
  ToastVariant,
} from './Toast.types';
import { generateToastId } from './Toast.utils';
import { ToastItem } from './ToastItem';

type ToastHostEntry = {
  show: (options: ToastOptions) => string;
  dismiss: (id?: string) => void;
};

const _hostStack: ToastHostEntry[] = [];

const show = (options: ToastOptions): string => {
  const top = _hostStack[_hostStack.length - 1];
  if (!top) {
    console.warn(
      'ToastHost is not mounted. Add <ToastHost /> (e.g. inside <GeckoUIPortal />) to your app root.',
    );
    return options.id ?? generateToastId();
  }
  return top.show(options);
};

const dismiss = (id?: string): void => {
  _hostStack[_hostStack.length - 1]?.dismiss(id);
};

const variantHelper =
  (variant: ToastVariant) =>
  (title: string, options?: Omit<ToastOptions, 'title' | 'variant'>): string =>
    show({ ...options, title, variant });

const Toast = {
  show,
  dismiss,
  success: variantHelper('success'),
  error: variantHelper('error'),
  warning: variantHelper('warning'),
  info: variantHelper('info'),
};

export function ToastHost({
  position = 'top',
  renderToast,
}: ToastHostProps = {}): React.ReactElement {
  const [toasts, setToasts] = useState<ToastInstance[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );
  const insets = useSafeAreaInsets();

  const clearTimer = useCallback((id: string) => {
    const t = timersRef.current.get(id);
    if (t) {
      clearTimeout(t);
      timersRef.current.delete(id);
    }
  }, []);

  const dismissToast = useCallback(
    (id?: string) => {
      if (!id) {
        setToasts((prev) => {
          for (const t of prev) {
            clearTimer(t.id);
            t.onDismiss?.();
          }
          return [];
        });
        return;
      }
      setToasts((prev) => {
        const toast = prev.find((t) => t.id === id);
        if (!toast) return prev;
        clearTimer(id);
        toast.onDismiss?.();
        return prev.filter((t) => t.id !== id);
      });
    },
    [clearTimer],
  );

  const addToast = useCallback(
    (options: ToastOptions): string => {
      const id = options.id ?? generateToastId();
      clearTimer(id);
      setToasts((prev) => [
        ...prev.filter((t) => t.id !== id),
        { ...options, id },
      ]);
      const duration = options.duration ?? 3000;
      if (duration > 0 && Number.isFinite(duration)) {
        const timer = setTimeout(() => dismissToast(id), duration);
        timersRef.current.set(id, timer);
      }
      return id;
    },
    [clearTimer, dismissToast],
  );

  useEffect(() => {
    const entry: ToastHostEntry = { show: addToast, dismiss: dismissToast };
    _hostStack.push(entry);
    return () => {
      for (const t of timersRef.current.values()) clearTimeout(t);
      timersRef.current.clear();
      const idx = _hostStack.indexOf(entry);
      if (idx !== -1) _hostStack.splice(idx, 1);
    };
  }, [addToast, dismissToast]);

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        top: position === 'top' ? insets.top + 8 : undefined,
        bottom: position === 'bottom' ? insets.bottom + 8 : undefined,
        left: 0,
        right: 0,
        zIndex: 9999,
        elevation: 9999,
      }}
    >
      {toasts.map((toast) =>
        renderToast ? (
          <View key={toast.id}>
            {renderToast(toast, () => dismissToast(toast.id))}
          </View>
        ) : (
          <ToastItem
            key={toast.id}
            toast={toast}
            position={position}
            onDismiss={() => dismissToast(toast.id)}
          />
        ),
      )}
    </View>
  );
}

ToastHost.displayName = 'ToastHost';

export default Toast;
