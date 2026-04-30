import { useEffect, useState } from 'react';
import type React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { TooltipState } from './Tooltip.types';

let _setActive: ((state: TooltipState | null) => void) | null = null;
let _activeId: number | null = null;

export const showTooltip = (state: TooltipState): void => {
  _activeId = state.id;
  _setActive?.(state);
};

export const hideTooltip = (id?: number): void => {
  if (id !== undefined && _activeId !== id) return;
  _activeId = null;
  _setActive?.(null);
};

export const getActiveTooltipId = (): number | null => _activeId;

const ARROW_SIZE = 6;
const OFFSET = 8;
const SCREEN_PADDING = 8;
const MAX_WIDTH = 260;

interface Layout {
  bubbleStyle: { left: number; top?: number; bottom?: number };
  arrowStyle: { left: number; top?: number; bottom?: number };
  resolvedPlacement: 'top' | 'bottom';
}

const computeLayout = (state: TooltipState, bubbleWidth: number): Layout => {
  const screen = Dimensions.get('window');
  const anchorCenter = state.anchor.x + state.anchor.width / 2;
  const spaceAbove = state.anchor.y;
  const resolvedPlacement: 'top' | 'bottom' =
    state.placement === 'auto'
      ? spaceAbove > 120
        ? 'top'
        : 'bottom'
      : state.placement;

  const left = Math.max(
    SCREEN_PADDING,
    Math.min(
      screen.width - bubbleWidth - SCREEN_PADDING,
      anchorCenter - bubbleWidth / 2,
    ),
  );

  const arrowLeft = anchorCenter - left - ARROW_SIZE;

  if (resolvedPlacement === 'top') {
    return {
      bubbleStyle: {
        left,
        bottom: screen.height - state.anchor.y + OFFSET,
      },
      arrowStyle: { left: arrowLeft, bottom: -ARROW_SIZE },
      resolvedPlacement,
    };
  }
  return {
    bubbleStyle: {
      left,
      top: state.anchor.y + state.anchor.height + OFFSET,
    },
    arrowStyle: { left: arrowLeft, top: -ARROW_SIZE },
    resolvedPlacement,
  };
};

export function TooltipHost(): React.ReactElement | null {
  const [state, setState] = useState<TooltipState | null>(null);
  const [bubbleWidth, setBubbleWidth] = useState<number | null>(null);

  useEffect(() => {
    _setActive = setState;
    return () => {
      _setActive = null;
    };
  }, []);

  // Reset measured width whenever the active tooltip changes (different content).
  useEffect(() => {
    setBubbleWidth(null);
  }, [state?.id]);

  if (!state) return null;

  const layout =
    bubbleWidth !== null ? computeLayout(state, bubbleWidth) : null;

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
      <Pressable
        style={StyleSheet.absoluteFillObject}
        onPress={() => hideTooltip()}
      />
      <View
        className={twMerge('GeckoUITooltip', state.contentClassName)}
        onLayout={(e) => {
          if (bubbleWidth === null) {
            setBubbleWidth(e.nativeEvent.layout.width);
          }
        }}
        style={[
          { position: 'absolute', maxWidth: MAX_WIDTH },
          // Hide off-screen + transparent during the measurement frame to avoid a flash.
          layout ? layout.bubbleStyle : { left: -9999, top: 0, opacity: 0 },
          state.contentStyle,
        ]}
      >
        {typeof state.content === 'string' ? (
          <Text className="GeckoUITooltip__text">{state.content}</Text>
        ) : (
          state.content
        )}
        {layout && (
          <View
            className={twMerge(
              'GeckoUITooltip__arrow',
              layout.resolvedPlacement === 'top'
                ? 'GeckoUITooltip__arrow--down'
                : 'GeckoUITooltip__arrow--up',
            )}
            style={[{ position: 'absolute' }, layout.arrowStyle]}
          />
        )}
      </View>
    </View>
  );
}

TooltipHost.displayName = 'TooltipHost';
