import { useEffect, useState } from 'react';
import type React from 'react';
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

let _setToasts: ((items: ToastInstance[]) => void) | null = null;
let _toasts: ToastInstance[] = [];
const _timers = new Map<string, ReturnType<typeof setTimeout>>();

const flush = () => {
  _setToasts?.([..._toasts]);
};

const clearTimer = (id: string) => {
  const t = _timers.get(id);
  if (t) {
    clearTimeout(t);
    _timers.delete(id);
  }
};

const show = (options: ToastOptions): string => {
  if (!_setToasts) {
    console.warn(
      'ToastHost is not mounted. Add <ToastHost /> (e.g. inside <GeckoUIPortal />) to your app root.',
    );
  }
  const id = options.id ?? generateToastId();
  // Replace existing toast with same id
  clearTimer(id);
  _toasts = _toasts.filter((t) => t.id !== id);
  _toasts.push({ ...options, id });
  flush();

  const duration = options.duration ?? 3000;
  if (duration > 0 && Number.isFinite(duration)) {
    const timer = setTimeout(() => dismiss(id), duration);
    _timers.set(id, timer);
  }
  return id;
};

function dismiss(id?: string): void {
  if (!id) {
    _toasts.forEach((t) => {
      clearTimer(t.id);
      t.onDismiss?.();
    });
    _toasts = [];
    flush();
    return;
  }
  const toast = _toasts.find((t) => t.id === id);
  if (!toast) return;
  clearTimer(id);
  _toasts = _toasts.filter((t) => t.id !== id);
  toast.onDismiss?.();
  flush();
}

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
  const insets = useSafeAreaInsets();

  useEffect(() => {
    _setToasts = setToasts;
    setToasts([..._toasts]);
    return () => {
      _setToasts = null;
    };
  }, []);

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
            {renderToast(toast, () => dismiss(toast.id))}
          </View>
        ) : (
          <ToastItem
            key={toast.id}
            toast={toast}
            position={position}
            onDismiss={() => dismiss(toast.id)}
          />
        ),
      )}
    </View>
  );
}

ToastHost.displayName = 'ToastHost';

export default Toast;
