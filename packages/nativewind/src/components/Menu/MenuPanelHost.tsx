import type React from 'react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type MenuPanelHostOptions = {
  content: ReactNode;
  onClose: () => void;
};

type HostEntry = {
  show: (opts: MenuPanelHostOptions) => void;
  dismiss: () => void;
};

const _hostStack: HostEntry[] = [];

export const showMenuPanel = (opts: MenuPanelHostOptions): void => {
  _hostStack[_hostStack.length - 1]?.show(opts);
};

export const dismissMenuPanel = (): void => {
  _hostStack[_hostStack.length - 1]?.dismiss();
};

export function MenuPanelHost(): React.ReactElement | null {
  const [state, setState] = useState<{
    visible: boolean;
    opts: MenuPanelHostOptions | null;
  }>({ visible: false, opts: null });

  useEffect(() => {
    const entry: HostEntry = {
      show: (opts) => setState({ visible: true, opts }),
      dismiss: () => setState({ visible: false, opts: null }),
    };
    _hostStack.push(entry);
    return () => {
      const idx = _hostStack.indexOf(entry);
      if (idx !== -1) _hostStack.splice(idx, 1);
    };
  }, []);

  if (!state.visible || !state.opts) return null;

  const { content, onClose } = state.opts;

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
      <Pressable style={StyleSheet.absoluteFillObject} onPress={onClose} />
      {content}
    </View>
  );
}

MenuPanelHost.displayName = 'MenuPanelHost';
