import type React from 'react';

import { CalendarPickerHost } from '../CalendarPicker';
import { MenuPanelHost } from '../Menu/MenuPanelHost';
import { SelectMenuHost } from '../Select/SelectMenu/SelectMenuHost';
import { ToastHost } from '../Toast/Toast';
import { TooltipHost } from '../Tooltip/TooltipHost';

export const GeckoUIOverlayHosts = (): React.ReactElement => (
  <>
    <CalendarPickerHost />
    <MenuPanelHost />
    <SelectMenuHost />
    <ToastHost />
    <TooltipHost />
  </>
);

GeckoUIOverlayHosts.displayName = 'GeckoUIOverlayHosts';
