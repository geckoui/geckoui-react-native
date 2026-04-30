import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { DrawerProps } from './Drawer.types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function getInitialTranslate(placement: string): number {
  switch (placement) {
    case 'right':
      return SCREEN_WIDTH;
    case 'left':
      return -SCREEN_WIDTH;
    case 'bottom':
      return SCREEN_HEIGHT;
    case 'top':
      return -SCREEN_HEIGHT;
    default:
      return SCREEN_WIDTH;
  }
}

function DrawerComponent({
  open = false,
  allowClickOutside,
  handleClose,
  hideBackdrop = false,
  placement = 'right',
  backdropClassName,
  backdropStyle,
  className,
  style,
  children,
  dismissOnEscape = true,
}: DrawerProps): React.ReactElement {
  const [modalVisible, setModalVisible] = useState(false);
  const translateAnim = useRef(
    new Animated.Value(getInitialTranslate(placement)),
  ).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (open) {
      setModalVisible(true);
      Animated.parallel([
        Animated.timing(translateAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateAnim, {
          toValue: getInitialTranslate(placement),
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => setModalVisible(false));
    }
  }, [open, translateAnim, placement, backdropOpacity]);

  const isHorizontal = placement === 'left' || placement === 'right';
  const transformStyle = isHorizontal
    ? { transform: [{ translateX: translateAnim }] }
    : { transform: [{ translateY: translateAnim }] };

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={dismissOnEscape ? handleClose : undefined}
    >
      {!hideBackdrop && (
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            styles.backdrop,
            { opacity: backdropOpacity },
            backdropStyle,
          ]}
          className={backdropClassName}
          pointerEvents={allowClickOutside ? 'auto' : 'none'}
        >
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={handleClose}
          />
        </Animated.View>
      )}
      <Animated.View
        className={twMerge(
          'GeckoUIDrawer__drawer',
          `GeckoUIDrawer__drawer--${placement}`,
          className,
        )}
        style={[drawerPositions[placement], transformStyle, style]}
      >
        {children}
      </Animated.View>
    </Modal>
  );
}

let _imperativeOpen:
  | ((
      node: React.ReactNode,
      props: Omit<DrawerProps, 'open' | 'children'>,
    ) => void)
  | null = null;
let _imperativeDismiss: (() => void) | null = null;

export function DrawerHost(): React.ReactElement | null {
  const [state, setState] = useState<{
    open: boolean;
    node: React.ReactNode;
    props: Omit<DrawerProps, 'open' | 'children'>;
  } | null>(null);

  useEffect(() => {
    _imperativeOpen = (node, props) => setState({ open: true, node, props });
    _imperativeDismiss = () =>
      setState((s) => (s ? { ...s, open: false } : null));
    return () => {
      _imperativeOpen = null;
      _imperativeDismiss = null;
    };
  }, []);

  if (!state) return null;

  return (
    <DrawerComponent
      {...state.props}
      open={state.open}
      handleClose={() => _imperativeDismiss?.()}
    >
      {state.node}
    </DrawerComponent>
  );
}

const drawerPositions: Record<string, object> = {
  right: { position: 'absolute', top: 0, bottom: 0, right: 0 },
  left: { position: 'absolute', top: 0, bottom: 0, left: 0 },
  bottom: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  top: { position: 'absolute', left: 0, right: 0, top: 0 },
};

const styles = StyleSheet.create({
  backdrop: { backgroundColor: 'rgba(0,0,0,0.5)' },
});

DrawerComponent.show = (
  node: React.ReactNode,
  options: Omit<DrawerProps, 'open' | 'children'> = {},
) => {
  _imperativeOpen?.(node, options);
};

DrawerComponent.dismiss = () => {
  _imperativeDismiss?.();
};

export const Drawer = DrawerComponent;
