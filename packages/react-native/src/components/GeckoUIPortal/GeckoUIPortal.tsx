import type React from 'react';

import { DialogHost } from '../Dialog/Dialog';
import { DrawerHost } from '../Drawer/Drawer';
import { SelectMenuHost } from '../Select/SelectMenu/SelectMenuHost';
import { ToastHost } from '../Toast/Toast';

export const GeckoUIPortal = (): React.ReactElement => (
  <>
    <DialogHost />
    <DrawerHost />
    <SelectMenuHost />
    <ToastHost />
  </>
);

GeckoUIPortal.displayName = 'GeckoUIPortal';
