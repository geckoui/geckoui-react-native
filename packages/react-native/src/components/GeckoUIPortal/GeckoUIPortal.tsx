import type React from 'react';

import { DialogHost } from '../Dialog/Dialog';
import { DrawerHost } from '../Drawer/Drawer';

export const GeckoUIPortal = (): React.ReactElement => (
  <>
    <DialogHost />
    <DrawerHost />
  </>
);

GeckoUIPortal.displayName = 'GeckoUIPortal';
