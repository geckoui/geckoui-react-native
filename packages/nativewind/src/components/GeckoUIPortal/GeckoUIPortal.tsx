import type React from 'react';

import { DialogHost } from '../Dialog/Dialog';
import { DrawerHost } from '../Drawer/Drawer';
import { SelectMenuHost } from '../Select/SelectMenu/SelectMenuHost';
import { ToastHost } from '../Toast/Toast';
import { TooltipHost } from '../Tooltip/TooltipHost';

export const GeckoUIPortal = (): React.ReactElement => (
  <>
    <DialogHost />
    <DrawerHost />
    <SelectMenuHost />
    <ToastHost />
    <TooltipHost />
  </>
);

GeckoUIPortal.displayName = 'GeckoUIPortal';
